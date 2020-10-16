///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////Frigga Core Contract/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

pragma solidity ^0.6.3;
contract Frigga {
	using SafeMath for uint256;
	struct User {
		uint id;
		address referrer;
		uint partnersCount;
		mapping(uint8 => bool) activeMatrixLevels;
		mapping(uint8 => Matrix) matrixes;
	}
	struct Matrix {
		address upperAddress;
		address[] lowerAddresses;
		bool blocked;
		bool missed;
		uint reinvestCount;
		uint partnersCount;
	}

	uint8 public constant LAST_LEVEL = 12;
	uint256 public constant decimals = 18;
	uint256 public constant entryAmount = 320000000000000000000; 
	uint16 public constant power2CoinRate = 640; 
	mapping(address => User) public users;
	mapping(uint => address) public idToAddress;
	mapping(address => uint256) public receivedCoins; 
	mapping(address => uint256) public receivedPowers; 
	uint public lastUserId = 2;
	address public root;
	address payable public constant blackhole = address(0);
	mapping(uint8 => uint256) public levelPrice;
	mapping(uint8 => uint256) public levelPower;
	
	event Registration(address indexed user, address indexed referrer, uint indexed userId, uint referrerId);
	event Reinvest(address indexed user, address indexed upperAddress, address indexed caller, uint8 matrix, uint8 level);
	event Upgrade(address indexed user, address indexed upperAddress, uint8 matrix, uint8 level);
	event NewUserPlace(address indexed user, address indexed upperAddress, uint8 matrix, uint8 level, uint8 place);
	event MissedReceive(address indexed receiver, address indexed from, uint8 matrix, uint8 level);
	event SentExtraCoinDividends(address indexed from, address indexed receiver, uint8 matrix, uint8 level);
	event SendPower(address indexed user, uint256 power, uint8 level, uint8 powerLine);
	event InternalTransfer(address indexed from, address indexed to, uint256 amount);
	
	constructor(address rootAddress) public {
		levelPrice[1] = entryAmount.div(2);
		for (uint8 i = 2; i <= LAST_LEVEL; i++) {
			levelPrice[i] = levelPrice[i-1] * 2;
		}
		levelPower[1] = levelPrice[1].div(power2CoinRate).mul(100).div(10 ** decimals);
		for (uint8 i = 2; i <= LAST_LEVEL; i++) {
			levelPower[i] = levelPower[i-1] * 2;
		}
		root = rootAddress;
		User memory user = User({
			id: 1,
			referrer: address(0),
			partnersCount: uint(0)
		});
		users[rootAddress] = user;
		idToAddress[1] = rootAddress;
		for (uint8 i = 1; i <= LAST_LEVEL; i++) {
			users[rootAddress].activeMatrixLevels[i] = true;
		}
	}
	
	receive() external payable {
		if(msg.data.length == 0) {
			return registration(msg.sender, root);
		}
		registration(msg.sender, bytesToAddress(msg.data));
	}

	function registrationExt(address referrerAddress) external payable {
		registration(msg.sender, referrerAddress);
	}
	
	function buyNewLevel(uint8 level) external payable {
		require(isUserExists(msg.sender), "user is not exists. Register first.");
		require(msg.value == levelPrice[level] * 2, "invalid price");
		require(level > 1 && level <= LAST_LEVEL, "invalid level");
		require(!users[msg.sender].activeMatrixLevels[level], "level already activated");
		if (users[msg.sender].matrixes[level-1].blocked) {
			users[msg.sender].matrixes[level-1].blocked = false;
			users[msg.sender].matrixes[level-1].missed = false;
		}
		address newUpperAddress = findActiveMatrixUpperAddress(msg.sender, level);
		users[msg.sender].matrixes[level].upperAddress = newUpperAddress;
		users[newUpperAddress].matrixes[level].partnersCount ++;
		users[msg.sender].activeMatrixLevels[level] = true;
		updateMatrix(msg.sender, newUpperAddress, level, 1);
		burnCoin(msg.sender, level);
		emit Upgrade(msg.sender, newUpperAddress, 1, level);        
	}    
	
	function registration(address userAddress, address referrerAddress) private {
		require(msg.value == entryAmount, "registration cost 320 odin");
		require(!isUserExists(userAddress), "user exists");
		require(isUserExists(referrerAddress), "referrer not exists");
		uint32 size;
		assembly {
			size := extcodesize(userAddress)
		}
		require(size == 0, "cannot be a contract");
		User memory user = User({
			id: lastUserId,
			referrer: referrerAddress,
			partnersCount: 0
		});
		users[userAddress] = user;
		idToAddress[lastUserId] = userAddress;
		users[userAddress].referrer = referrerAddress;
		users[userAddress].activeMatrixLevels[1] = true; 
		lastUserId++;
		users[referrerAddress].partnersCount++;
		users[referrerAddress].matrixes[1].partnersCount ++;
		address upperAddress = findActiveMatrixUpperAddress(userAddress, 1);
		users[userAddress].matrixes[1].upperAddress = upperAddress;
		updateMatrix(userAddress, upperAddress, 1, 1);
		burnCoin(userAddress, 1);
		emit Registration(userAddress, referrerAddress, users[userAddress].id, users[referrerAddress].id);
	}
	
	function updateMatrix(address userAddress, address upperAddress, uint8 level, uint8 powerLine) private {
		if (powerLine == 1 && !users[userAddress].matrixes[level].blocked) {
			sendPower(userAddress, level, powerLine++);
		}
		if (powerLine <= 4 && !users[upperAddress].matrixes[level].blocked) {
			sendPower(upperAddress, level, powerLine);
			upperAddress == root ? powerLine = 5 : powerLine = powerLine + 1;
		}        
		users[upperAddress].matrixes[level].lowerAddresses.push(userAddress);
		if (users[upperAddress].matrixes[level].lowerAddresses.length < 3) {
			emit NewUserPlace(userAddress, upperAddress, 1, level, uint8(users[upperAddress].matrixes[level].lowerAddresses.length));
			if (upperAddress != root){
				address nextUpperAddress = findUnblockedUpperAddress(upperAddress, level);
				while (powerLine <= 4) {
					if (!users[nextUpperAddress].matrixes[level].blocked){
						sendPower(nextUpperAddress, level, powerLine++);
						if (powerLine == 5) break;
					}
					if (nextUpperAddress == root) break;
					nextUpperAddress = findUnblockedUpperAddress(nextUpperAddress, level); 
				}
			}
			return sendCoin(upperAddress, userAddress, 1, level);
		}
		emit NewUserPlace(userAddress, upperAddress, 1, level, 3);
		users[upperAddress].matrixes[level].lowerAddresses = new address[](0);
		if (!users[upperAddress].activeMatrixLevels[level+1] && level != LAST_LEVEL) {
			users[upperAddress].matrixes[level].blocked = true;
		}
		if (upperAddress != root) {
			address nextUpperAddress = findActiveMatrixUpperAddress(upperAddress, level);
			if (users[upperAddress].matrixes[level].upperAddress != nextUpperAddress) {
				users[upperAddress].matrixes[level].upperAddress = nextUpperAddress;
			}
			users[upperAddress].matrixes[level].reinvestCount++;
			emit Reinvest(upperAddress, nextUpperAddress, userAddress, 1, level);
			updateMatrix(upperAddress, nextUpperAddress, level, powerLine);
		} else {
			if (powerLine <= 4) sendPower(root, level, powerLine);
			sendCoin(root, userAddress, 1, level);
			users[root].matrixes[level].reinvestCount++;
			emit Reinvest(root, address(0), userAddress, 1, level);
		}
	}
	
	function findUnblockedUpperAddress(address userAddress, uint8 level) private view returns(address) {
		if (userAddress == root) return address(0);
		address upperAddress = users[userAddress].matrixes[level].upperAddress;
		while (true) {
			if (users[upperAddress].matrixes[level].blocked) {
				upperAddress = users[upperAddress].matrixes[level].upperAddress;
			} else { 
				return upperAddress;
			}
		}
	}
	
	function sendPower(address userAddress, uint8 level, uint8 powerLine) private{
		uint256 powerToDispatch = levelPower[level];
		uint256 power = 0;
		if (userAddress == root){
			if (powerLine == 1){
				power = powerToDispatch;
			}
			else if (powerLine == 2){
				power = powerToDispatch.mul(20).div(100);
			}
			else if (powerLine == 3){
				power = powerToDispatch.mul(12).div(100);
			}
			else if (powerLine == 4){
				power = powerToDispatch.mul(6).div(100);
			}
		}
		else{
			if (powerLine == 1){
				power = powerToDispatch.mul(8).div(10);
			}
			else if (powerLine == 2){
				power = powerToDispatch.mul(8).div(100);
			}
			else if (powerLine == 3){
				power = powerToDispatch.mul(6).div(100);
			}
			else if (powerLine == 4){
				power = powerToDispatch.mul(6).div(100);
			}
		}       
		if (power > 0) {
			receivedPowers[userAddress] = receivedPowers[userAddress] + power;
			emit SendPower(userAddress, power, level, powerLine);
		}
		
	}
	
	function findActiveMatrixUpperAddress(address userAddress, uint8 level) private view returns(address) {
		while (true) {
			if (users[users[userAddress].referrer].activeMatrixLevels[level]) {
				return users[userAddress].referrer;
			}
			userAddress = users[userAddress].referrer;
		}
	}
	

	function userActiveMatrixLevel(address userAddress, uint8 level) public view returns(bool) {
		return users[userAddress].activeMatrixLevels[level];
	}

	function userMatrixReinvestCount(address userAddress) public view returns(uint256[] memory) {
		uint256[] memory counts = new uint256[](12);
		for (uint8 i = 1; i <= 12; i ++){
			counts[i - 1] = users[userAddress].matrixes[i].reinvestCount;
		}
		
		return counts;
	}
	
	function userMatrixPartnersCount(address userAddress) public view returns(uint256[] memory) {
		uint256[] memory counts = new uint256[](12);
		for (uint8 i = 1; i <= 12; i ++){
			counts[i - 1] = users[userAddress].matrixes[i].partnersCount;
		}
		return counts;
	}
	
	function userActiveMatrixLevels(address userAddress) public view returns(bool[] memory) {
		bool[] memory actives = new bool[](12);
		for (uint8 i = 1; i <= 12; i ++){
			actives[i - 1] = users[userAddress].activeMatrixLevels[i];
		}
		return actives;
	}
	
	
	function userMissedMatrixLevels(address userAddress) public view returns(bool[] memory) {
		bool[] memory misses = new bool[](12);
		for (uint8 i = 1; i <= 12; i ++){
			misses[i - 1] = users[userAddress].matrixes[i].missed;
		}
		return misses;
	}
	
	
	function userMatrix(address userAddress, uint8 level) public view returns(address, address[] memory, bool) {
		return (users[userAddress].matrixes[level].upperAddress,
				users[userAddress].matrixes[level].lowerAddresses,
				users[userAddress].matrixes[level].blocked);
	}
	
	function userLowerAddresses(address userAddress) public view returns(address[3][12] memory lowerAddresses) {
		for (uint8 level = 1; level <= 12; level ++){
			address[] memory lowers = users[userAddress].matrixes[level].lowerAddresses;
			if (lowers.length > 0){
				for (uint8 j = 0; j < lowers.length; j ++){
					lowerAddresses[level - 1][j] = lowers[j];
				}
			}
		}
	}
	
	function userMatrixInfo(address userAddress) public view returns(uint256[] memory, uint256[] memory, bool[] memory, bool[]memory, address[3][12] memory){
		uint256[] memory a = userMatrixReinvestCount(userAddress);
		uint256[] memory b = userMatrixPartnersCount(userAddress);
		bool[] memory c = userActiveMatrixLevels(userAddress);
		bool[] memory d = userMissedMatrixLevels(userAddress);
		address[3][12] memory e = userLowerAddresses(userAddress);
		return(a, b, c, d, e);
	}
	
	function isUserExists(address user) public view returns (bool) {
		return (users[user].id != 0);
	}

	function findCoinReceiver(address userAddress, address _from, uint8 level) private returns(address, bool) {
		address receiver = userAddress;
		bool isExtraDividends;
		while (true) {
			if (users[receiver].matrixes[level].blocked) {
				emit MissedReceive(receiver, _from, 1, level);
				users[receiver].matrixes[level].missed = true;
				isExtraDividends = true;
				receiver = users[receiver].matrixes[level].upperAddress;
			} else {
				return (receiver, isExtraDividends);
			}
		}
		
	}

	function sendCoin(address userAddress, address _from, uint8 matrix, uint8 level) private {
		(address receiver, bool isExtraDividends) = findCoinReceiver(userAddress, _from, level);
		emit InternalTransfer(_from, receiver, levelPrice[level]);
		if (!address(uint160(receiver)).send(levelPrice[level])) {
			receivedCoins[receiver] = receivedCoins[receiver].add(address(this).balance);
			return address(uint160(receiver)).transfer(address(this).balance);
		}
		receivedCoins[receiver] = receivedCoins[receiver].add(levelPrice[level]);
		
		if (isExtraDividends) {
			emit SentExtraCoinDividends(_from, receiver, matrix, level);
		}
	}
	
	function burnCoin(address _from, uint8 level) private {
		blackhole.transfer(levelPrice[level]);
		emit InternalTransfer(_from, blackhole, levelPrice[level]);
	}
	
	function bytesToAddress(bytes memory bys) private pure returns (address addr) {
		assembly {
			addr := mload(add(bys, 20))
		}
	}
	
	function time() public view returns (uint256) {
		return block.timestamp;
	}
}

library SafeMath {
	/**
	 * @dev Returns the addition of two unsigned integers, reverting on
	 * overflow.
	 *
	 * Counterpart to Solidity's `+` operator.
	 *
	 * Requirements:
	 * - Addition cannot overflow.
	 */
	function add(uint256 a, uint256 b) internal pure returns (uint256) {
		uint256 c = a + b;
		require(c >= a, "SafeMath: addition overflow");

		return c;
	}

	/**
	 * @dev Returns the subtraction of two unsigned integers, reverting on
	 * overflow (when the result is negative).
	 *
	 * Counterpart to Solidity's `-` operator.
	 *
	 * Requirements:
	 * - Subtraction cannot overflow.
	 */
	function sub(uint256 a, uint256 b) internal pure returns (uint256) {
		return sub(a, b, "SafeMath: subtraction overflow");
	}

	/**
	 * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
	 * overflow (when the result is negative).
	 *
	 * Counterpart to Solidity's `-` operator.
	 *
	 * Requirements:
	 * - Subtraction cannot overflow.
	 *
	 * _Available since v2.4.0._
	 */
	function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
		require(b <= a, errorMessage);
		uint256 c = a - b;

		return c;
	}

	/**
	 * @dev Returns the multiplication of two unsigned integers, reverting on
	 * overflow.
	 *
	 * Counterpart to Solidity's `*` operator.
	 *
	 * Requirements:
	 * - Multiplication cannot overflow.
	 */
	function mul(uint256 a, uint256 b) internal pure returns (uint256) {
		// Gas optimization: this is cheaper than requiring 'a' not being zero, but the
		// benefit is lost if 'b' is also tested.
		// See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
		if (a == 0) {
			return 0;
		}

		uint256 c = a * b;
		require(c / a == b, "SafeMath: multiplication overflow");

		return c;
	}

	/**
	 * @dev Returns the integer division of two unsigned integers. Reverts on
	 * division by zero. The result is rounded towards zero.
	 *
	 * Counterpart to Solidity's `/` operator. Note: this function uses a
	 * `revert` opcode (which leaves remaining gas untouched) while Solidity
	 * uses an invalid opcode to revert (consuming all remaining gas).
	 *
	 * Requirements:
	 * - The divisor cannot be zero.
	 */
	function div(uint256 a, uint256 b) internal pure returns (uint256) {
		return div(a, b, "SafeMath: division by zero");
	}

	/**
	 * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
	 * division by zero. The result is rounded towards zero.
	 *
	 * Counterpart to Solidity's `/` operator. Note: this function uses a
	 * `revert` opcode (which leaves remaining gas untouched) while Solidity
	 * uses an invalid opcode to revert (consuming all remaining gas).
	 *
	 * Requirements:
	 * - The divisor cannot be zero.
	 *
	 * _Available since v2.4.0._
	 */
	function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
		// Solidity only automatically asserts when dividing by 0
		require(b > 0, errorMessage);
		uint256 c = a / b;
		// assert(a == b * c + a % b); // There is no case in which this doesn't hold

		return c;
	}

	/**
	 * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
	 * Reverts when dividing by zero.
	 *
	 * Counterpart to Solidity's `%` operator. This function uses a `revert`
	 * opcode (which leaves remaining gas untouched) while Solidity uses an
	 * invalid opcode to revert (consuming all remaining gas).
	 *
	 * Requirements:
	 * - The divisor cannot be zero.
	 */
	function mod(uint256 a, uint256 b) internal pure returns (uint256) {
		return mod(a, b, "SafeMath: modulo by zero");
	}

	/**
	 * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
	 * Reverts with custom message when dividing by zero.
	 *
	 * Counterpart to Solidity's `%` operator. This function uses a `revert`
	 * opcode (which leaves remaining gas untouched) while Solidity uses an
	 * invalid opcode to revert (consuming all remaining gas).
	 *
	 * Requirements:
	 * - The divisor cannot be zero.
	 *
	 * _Available since v2.4.0._
	 */
	function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
		require(b != 0, errorMessage);
		return a % b;
	}
}