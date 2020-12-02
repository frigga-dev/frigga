<template>
  <div class="node-bar">
	<div class="bg-line r1"></div>
	<div class="bg-line r2"></div>
	<div class="bg-line r3"></div>
	<div class="node-header">
		<div :class="lock?'waring':'hide'"><i class="el-alert__icon el-icon-warning"></i></div>
		<el-button class="header" :type="open?'primary':''" :disabled="open" @click="toBuy" round>
			<h2>{{index}}</h2>
			<h5>{{price}} ODIN</h5>
		</el-button>
	</div>
	<div class="node-body">
		<div class="node-one">
			<div :class="list[0]?'active':'no'" ></div>
			<!-- <el-button :disabled='true' :class="list[0]?'active':''"  circle></el-button> -->
		</div>
		<div class="node-one">
			<div :class="list[1]?'active':'no'" ></div>
			<!-- <el-button :disabled='true'  :class="list[1]?'active':''"  circle></el-button> -->
		</div>
		<div class="node-one">
			<div :class="list[2]?'active':'no'" ></div>
			<!-- <el-button :disabled='true'  :class="list[2]?'active':''" circle></el-button> -->
		</div>
	</div>
	<div :class="open?'':'not-show'">
		<div class="other">
			<span class="txt">{{partners}}</span>
			<span><img class="mini-ico" src="../assets/man.png" /></span>
		</div>
		<div class="other">
			<span class="txt">{{reinvest}}</span>
			<span><img class="mini-ico" src="../assets/flush.png" /></span>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'Main',
  props:['copys','price','list','open','level','lock','index','balance','balanceWei','partners','reinvest','can'],
  data () {
    return {
		netLock:false
		// val:3.2,
		// select:[true,false,false],
    }
  },
//    props:{
// 		val:{
// 			type:Number
// 		},
// 		list:{
// 			type:Array
// 		}
// 	},
  methods: {
	buyLevel(data,price,gasPrie,timate){
		let _this=this
		let contractAddress = _this.$helper.hash
		let account = _this.$getAddress() // Your account address 1
		let privateKey= _this.$getKey().slice(2)
		let level=_this.level
		if(_this.netLock){
         return
       }
       _this.netLock=true
		// let price = this.price
		_this.$global.onLoading(true,_this.$copyAdd(_this.copys.Upgrade,level))
      	_this.$helper.web3.eth.getTransactionCount(account).then((txCount)=> {
            const txObject = {
              nonce:    _this.$helper.web3.utils.toHex(txCount),
              gasLimit:_this.$helper.web3.utils.toHex(timate),
              gasPrice: _this.$helper.web3.utils.toHex(gasPrie),// _this.$helper.web3.utils.toHex(_this.$helper.web3.utils.toWei('10', 'gwei')),//ODIN
              to: contractAddress,
              from:account,
              data:data,//_this.$helper.contract.methods.buyNewLevel(level).encodeABI(),
              // data:this.$helper.contract.methods.registrationExt("0x07E8Ee67ce9CDB32a08204125F75769b9b0EAACa").encodeABI(),
              value:_this.$helper.web3.utils.toHex(_this.$helper.web3.utils.toWei(price.toString(), 'ether'))//web3.utils.toHex(web3.utils.toWei('3.2', 'ether'))//
			}
			// console.log('contractAddress:', contractAddress,_this)
           	// console.log('privateKey:', privateKey)
            // 签署交易
            const tx = new this.$helper.tx(txObject, { common: _this.$helper.custom })
			tx.sign(Buffer.from(privateKey, 'hex'))
			console.log("sendSignedTransaction:",(new Date()).getTime());
			_this.$helper.web3.eth.sendSignedTransaction("0x" + tx.serialize().toString('hex'))
			.on('transactionHash', (hash) => {
				_this.$global.onLoading(true,_this.copys.confirmation)
				// console.log("hash:",hash);//0xe52e95fd2f55f512545d2e358c08983044fae690c38694b33164747d3af655a4
			})
			.on('receipt', (receipt) => {
				_this.$global.onLoading(false,"")
					if(receipt.status){
						_this.$msg("success",_this.copys.UpgradeSucceed)
						_this.$emit('reLoad')
					}else{
						_this.$msg("warning",_this.copys.UpgradeFailed)
						// _this.$message.warning('Upgrade Failed');
					}
				console.log("receipt receipt:",receipt.status,(new Date()).getTime());
				 _this.lock=false
			})
			// .on('confirmation', (confirmationNumber, receipt) => {
			// 	if(confirmationNumber==1){
			// 		_this.$global.onLoading(false,"")
			// 		if(receipt.status){
			// 			_this.$msg("success",'Upgrade Succeed.')
			// 			_this.$emit('reLoad')
			// 		}else{
			// 			_this.$msg("warning",'Upgrade Failed.')
			// 			// _this.$message.warning('Upgrade Failed');
			// 		}
			// 		 _this.netLock=false
			// 	}
			// 	console.log("confirmationNumber:",confirmationNumber);
			// 	console.log("confirmation receipt:",receipt.status);
			// 	return false
			// })
			.catch((e)=>{
				console.log("catch2:",e);
				_this.$global.onLoading(false,"")
				_this.$msg("warning",_this.copys.UpgradeFailed)
				 _this.netLock=false
				// _this.$message.warning('Upgrade Failed');
			})
		  })
		  .catch((e)=>{
			console.log("catch1:",e);
			_this.$global.onLoading(false,"")
			_this.$msg("warning",_this.copys.UpgradeFailed)
			 _this.netLock=false
			// _this.$message.warning('Upgrade Failed');
		  })
	},
	toBuy(){
		let _this=this
	  // let ok=false
	  	let price = _this.price
		let data=_this.$helper.contract.methods.buyNewLevel(_this.level).encodeABI()
		_this.$global.onLoading(true,_this.$copyAdd(_this.copys.Upgrade,_this.level))
		// let priceHex = _this.$helper.web3.utils.toHex(_this.$helper.web3.utils.toWei(_this.$helper.price.toString(), 'ether'))
		_this.$helper.getGas(_this.$getAddress(),_this.balanceWei,price,"8000000",
		(ok,gasPrie,timate,val)=>{
			if(!ok){
				_this.$global.onLoading(false,"")
				_this.$msg("warning",_this.$copyAdd(_this.copys.Upgradelease,_this.level,val))
				// _this.$message.warning('Upgrade to level '+_this.level+', at lease '+val+' ODIN');
				return
			}
			_this.$confirm(_this.$copyAdd(_this.copys.Upgradecost,_this.level,val))
				.then(_ => {
						// console.log("toBuy:confirm")
						_this.buyLevel(data,price,gasPrie,timate)
				})
				.catch(_ => {
					_this.$global.onLoading(false,"")
					_this.$msg("warning",_this.copys.UpgradeFailed)
				});
		},(e)=>{
			_this.$global.onLoading(false,"")
			_this.$msg("warning",_this.copys.UpgradeFailed)
		})
	},
    handleClick(tab, event) {
        console.log(tab, event);
    }
  },
  computed: {}
}
</script>

<style scoped>
.node-bar {
	/* float: left; */
	position: relative;
	text-align: center;
	margin: 1rem;
}
.node-header {
	position: relative;
	display: inline-block;
  	text-align: center;
}
.waring{
	position: absolute;
	top:-0.3rem;
	right:0.2rem;
	color:#f56c6c;
	
}
.waring .el-alert__icon{
	font-size: 1.6rem;
}
.hide{
	display: none;
}
.node-body {
}
.node-one{
	display: inline-block;
	padding:0.6rem 0.2rem 0rem;
}
.active{
	border-color:#D3D3DF;
	background-color:#409EFF;
}
.not-show{
	visibility: hidden;
}
.bg-line{
	position: absolute;
	width: 1px;
	height: 5rem;
	/* background-color:#409EFF; */
	border-left:dashed #9393aF 0.15rem;
	z-index: -9;
	top:0;
	left:50%;
}
#app .header{
	padding: 0.2rem 0rem;
	border-radius: 0.6rem;
}

.r1{
	height:6rem;
	transform:rotate(52deg);
}
.r2{
	height: 6rem;
	transform:rotate(-52deg);
}
.other{
	line-height:1.5rem;
	clear: both;
}
.mini-ico{
	width: 2rem;
  	height: 1.5rem;
	  margin-left: 0.5rem;
}
span{
	float: left;
	display: block;
}
.txt{
	width: 4.5rem;
	text-align: right;
}
#app .el-button--primary.is-disabled{
	background-color:#409EFF;
}
h2{
	margin: 0.2rem;
	width: 6rem;
}
h5{
	margin: 0.2rem;
}
.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{

}
.active {
    border-radius: 50%;
    padding: 12px;
	display: inline-block;
	border: 0.1rem solid #fff;
	box-sizing: border-box;
    outline: 0;
    margin: 0;
	background-color: #409EFF;
	white-space: nowrap;
	font-size:1rem;
}
.no {
    border-radius: 50%;
    padding: 12px;
	display: inline-block;
	border: 0.1rem solid #fff;
	box-sizing: border-box;
    outline: 0;
    margin: 0;
	background-color: #D3D3DF;
	white-space: nowrap;
	font-size:1rem;
}
/* .header{
	display: inline-block;
    line-height: 1;
    white-space: nowrap;
	background-color: #409EFF;
	border: 1px solid #DCDFE6;
	text-align: center;
	box-sizing: border-box;
    outline: 0;
    margin: 0;
	transition: .1s;
    font-weight: 500;
	border-radius: 1.2rem;
	padding: 0.5rem 1.6rem;
}
.primary{
	background-color: #409EFF;
} */
</style>