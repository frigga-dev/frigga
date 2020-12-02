import Common from 'ethereumjs-common';
import Web3 from 'web3'

const frigTokenAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "power",
				"type": "uint256"
			}
		],
		"name": "addFrigPower",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "users",
				"type": "address[]"
			}
		],
		"name": "airdrop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "power",
				"type": "uint256"
			}
		],
		"name": "AddFrigPower",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Mint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_frigWeiPerPowerDay",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_frigWeiPerPowerDayBase",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_nextHalveSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_totalPower",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_WEI",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "calcAirdropAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "dailyDroppedUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "day",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userFrigPowers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "rootAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "InternalTransfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "matrix",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "MissedReceive",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "upperAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "matrix",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "place",
				"type": "uint8"
			}
		],
		"name": "NewUserPlace",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "userId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "referrerId",
				"type": "uint256"
			}
		],
		"name": "Registration",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "upperAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "matrix",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "Reinvest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "power",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "powerLine",
				"type": "uint8"
			}
		],
		"name": "SendPower",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "matrix",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "SentExtraCoinDividends",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "upperAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "matrix",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "Upgrade",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "LAST_LEVEL",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "blackhole",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "buyNewLevel",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "entryAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "idToAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "isUserExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastUserId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "levelPower",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "levelPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "power2CoinRate",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "receivedCoins",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "receivedPowers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "referrerAddress",
				"type": "address"
			}
		],
		"name": "registrationExt",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "root",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "time",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "userActiveMatrixLevel",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "userActiveMatrixLevels",
		"outputs": [
			{
				"internalType": "bool[]",
				"name": "",
				"type": "bool[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "userLowerAddresses",
		"outputs": [
			{
				"internalType": "address[3][12]",
				"name": "lowerAddresses",
				"type": "address[3][12]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "userMatrix",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "userMatrixInfo",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "bool[]",
				"name": "",
				"type": "bool[]"
			},
			{
				"internalType": "bool[]",
				"name": "",
				"type": "bool[]"
			},
			{
				"internalType": "address[3][12]",
				"name": "",
				"type": "address[3][12]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "userMatrixPartnersCount",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "userMatrixReinvestCount",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "userMissedMatrixLevels",
		"outputs": [
			{
				"internalType": "bool[]",
				"name": "",
				"type": "bool[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "partnersCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

const host = "http://frigga.in" //   "https://o.n5.io"////测试服//
const rpcUrl =  host + ":24570" //"http://39.99.206.172:24570" //
const hash = "0x8687b62A55ac0B43f04d38571e3dA6d43a7A11C8"//正式////"0x5d74FfdC2b82DdF4b665fa3e0F559d79C2636A11" //测试服// 
const tokenHash =  "0xac0E801e08422889886Cd0b748ab76BFdcd223c4"//正式// //"0xc42C90065922736215509902f3320701770bA2d0" //测试服////
const price = 320

const web3 = new Web3(rpcUrl)//Web3.givenProvider || 
const contract = new web3.eth.Contract(abi, hash)
const tokenContract = new web3.eth.Contract(frigTokenAbi, tokenHash)
const tx = require('ethereumjs-tx').Transaction
let rootAddress = null
const custom = Common.forCustomChain(
	'mainnet',
	{
	  name: 'odin-network',
	  networkId: 666666,
	  chainId: 666666,
	},
	'petersburg',
  )

const privateKeyToAccount = (token)=>{
	let account
	try{
		account=web3.eth.accounts.privateKeyToAccount(token);
		return account
	}catch(e){
		return null
	}
	
}
const checkPrivateKey = (address,token)=>{
	let account = privateKeyToAccount(token)
	if(account==null){
		return false
	}
	console.log(account)
	if(account.address==address){
		return true
	}
	return false
}

const isUserExists = (address,cb)=>{
	contract.methods.isUserExists(address).call().then(cb)
	.catch((e)=>{
		console.log("isUserExists:",e)
		cb(false)
	})
}

const getUser = (address,cb)=>{
	console.log("getUser:ready:",address)
	contract.methods.users(address).call().then((user)=>{
		let oid=user.id
		user.code=id2Show(user.id)
		console.log("getUser:ok:",user)
		cb(user)
	})
	.catch((e)=>{
		console.log("getUser:",e)
		cb(null)
	})
}
const getRoot=(cb)=>{
	if(rootAddress){
		cb(rootAddress)
	}else{
		contract.methods.root().call().then((address)=>{
			rootAddress=address
			cb(address)
		})
		.catch((e)=>{
			console.log("getRoot:",e);
			cb("")
		})
	}
}

const codeToAddress = (code,cb,lost)=>{
	let sid=show2Id(code)
	console.log("idToAddress:",code,sid)
	if(sid<=0){
		if(lost)lost("err id")
		return
	}
	contract.methods.idToAddress(sid).call().then((address)=>{
		// getUser(address,(user)=>{
		// 	if(user){
		// 		cb(sid,address)
		// 	}else{
		// 		if(lost)lost("err id")
		// 	}
		// })
		cb(sid,address)
	})
	.catch((e)=>{
		if(lost)lost(e)
	})
}

const idToAddress = (id,cb,lost)=>{
	let sid=show2Id(id)
	console.log("idToAddress:",id,sid)
	if(sid<=0){
		if(lost)lost("err id")
		return
	}
	contract.methods.idToAddress(sid).call().then(cb)
	.catch((e)=>{
		if(lost)lost(e)
	})
}

const showAddress = (address)=>{
	return "odx"+address.slice(2)
}
const realyAddress = (address)=>{
	return "0x"+address.slice(3)
}


const getGas = (address,balanceWei,price,timateStr,cb,lost)=>{
	web3.eth.getGasPrice().then((gasPrie)=>{
		// console.log('gasPrie1:',price,price.toString())
		// let gasPrieN = Number(web3.utils.fromWei(gasPrie,"ether"))
		// let timateN=Number(web3.utils.fromWei(timateStr,"ether"))
		// let balanceN=Number(balance)
		// let priceN=Number(price)

		let gasPrieBN = web3.utils.toBN(gasPrie)
		let timateBN = web3.utils.toBN(timateStr)
		let balanceBN = web3.utils.toBN(balanceWei)
		let priceBN = web3.utils.toBN(web3.utils.toWei(price.toString(),"ether"))
		// let gasPrieBN = web3.utils.toBN(gasPrieStr)
		// let timateBN = web3.utils.toBN(timateStr)
		// let val=priceN+gasPrieN*timateN
		
		let val=gasPrieBN.mul(timateBN)
			val=val.add(priceBN)
		let ok=balanceBN.gte(val)
		// val=val.muln(1.2)
		// let balanceBN = web3.utils.toBN(balance)
		// let priceBN = web3.utils.toBN(price)
		// val=priceBN.add(val)
		// let ok=balanceN>=val
		// console.log('gasPrie:',ok,gasPrie,timateStr,val)
		cb(ok,gasPrie,timateStr,web3.utils.fromWei(val.toString(),"ether"))
	})
	.catch((e)=>{
		console.log('gaseee:',e)
		lost(e)
	})
}
const IdSeed = [0x8ff9bd,
				0x1a43ba3,
				0x13ea1b7,
				0x25e75b,
				0xcd7405,
				0x1c41992,
				0x16aa78d,
				0x168738c,
				0xc543d4,
				0x1438964,
				0xc12fd6,
				0x1b34f7f,
				0x1d07cd6,
				0x2287221,
				0x1215734,
				0x1cf6bd6,
				0x14dc42f,
				0x439e55,
				0xc68731,
				0x8fd32]
	
const id2Show = (iid)=>{
	let oid=parseInt(iid)
	let si=(oid&0xf)
	let ids=((IdSeed[si])&0xfff)
	let out = ((oid+ids) << 4)
	out = (out | si)
	return out
}
const show2Id = (oid)=>{
	let sid=parseInt(oid)
	let si=(sid&0xf)
	let ids=((IdSeed[si])&0xfff)
	let out = (sid >> 4)
	out = (out - ids)
	return out
}
// const getGas = (address,balance,priceHex,data,cb)=>{
// 	web3.eth.getGasPrice().then((gasPrie)=>{
// 		console.log("getGasPrice:",gasPrie,hash,priceHex,data)
// 		web3.eth.getTransactionCount(address, (err, txCount) => {
// 			console.log({
// 				to:hash,
// 				nonce:    web3.utils.toHex(txCount),
// 				from:address,
// 				data:data,
// 				value:priceHex,
// 				gas:web3.utils.toHex(8000000),
// 				gasLimit:web3.utils.toHex(8000000),
// 				gasPrice:web3.utils.toHex(gasPrie),//ODIN
			  
// 			})
// 		web3.eth.estimateGas({
// 			to:hash,
// 			nonce:    web3.utils.toHex(txCount),
// 			from:address,
// 			data:data,
// 			value:priceHex,
// 			gas:web3.utils.toHex(800000),
// 			gasLimit:web3.utils.toHex(8000000),
// 			gasPrice:web3.utils.toHex(web3.utils.toWei('10', 'gwei')),//ODIN
		  
// 		})
// 		.then((timateHex)=>{
// 			console.log("estimateGas:",timateHex,hash)
// 			let gasPrieStr = web3.utils.fromWei(gasPrie,"ether")
// 			let timateStr = web3.utils.hexToNumberString(timateHex)
// 			let gasPrieBN = web3.utils.toBN(gasPrieStr)
// 			let timateBN = web3.utils.toBN(timateStr)
// 			let val=gasPrieBN.mul(timateBN)
			
// 			val=val.muln(1.2)
// 			let balanceBN = web3.utils.toBN(balanceBN)
// 			let priceBN = web3.utils.toBN(price)
// 			val=priceBN.add(val)
// 			let ok=balanceBN.gte(val)
// 			cb(ok,gasPrie,timateHex,val.toNumber())
// 		})
// 	})
// 	})
// }


//this.$helper.contract.methods.users("0x5FD13d8D98a5b055293284dB3fCe26d5505CC171").call().then(console.log)
export default {host,hash,web3,contract,custom,tx,tokenHash,tokenContract,
				checkPrivateKey,
				isUserExists,price,getUser,privateKeyToAccount,
				getRoot,idToAddress,getGas,showAddress,id2Show,show2Id,codeToAddress,rootAddress,realyAddress}
