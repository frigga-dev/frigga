<template>
  <div class="info page">
    <el-row v-if="mode>0">
   
    <!-- <el-row class="kuang">
      <el-col :span="20">
        <span>ID:</span>
        <span class="id-no">12</span>
      </el-col>
      </el-row> -->
    <el-row class="kuang">
          <el-col :span="12">
            {{copys.WalletAddress}}:
          </el-col>
          <el-col :span="12" class="right_show">
            <div class="copy-btn" @click="copyString($helper.showAddress(address))">{{copys.Copy}}</div>
            <div v-if="secretData" class="copy-btn" @click="onPrivateKey">{{copys.Privatekey}}</div>
          </el-col>
          <el-col :span="24"  class="link-text">
            {{$helper.showAddress(address)}}
          </el-col>
    
       <el-col :span="24" class="line-top">
        <el-col :span="7">
          {{copys.Balance}}: 
        </el-col>
        <el-col :span="12">
          <div class="coin-text"> {{ balance }}</div>
        </el-col>
        <el-col :span="5" class="right_show" v-if="!isSending">
          <div class="copy-btn" @click="onSend">{{copys.Send}}</div>
        </el-col>
        <el-col :span="5" class="small_show" v-if="isSending">
          {{copys.Confirming}}
        </el-col>
      </el-col>

    </el-row>
    
    <el-row class="kuang">
        <el-row class="line-bar2" v-if="referrerId">
          <el-col :span="24">
            {{copys.ReferrerID}}: <span >{{referrerId}}</span>
          </el-col>
           <el-col :span="24" class="link-text">
            {{$helper.showAddress(referrer)}}
          </el-col>
        </el-row>
        <el-col :span="12">
           {{copys.ContractAddress}}:
        </el-col>
        <el-col :span="12" class="right_show">
          <div class="copy-btn" @click="copyString($helper.showAddress(contractTxt))">{{copys.Copy}}</div>
        </el-col>
        <el-col :span="24" class="link-text">
          {{$helper.showAddress(contractTxt)}}
        </el-col>
      </el-row>

       <el-row class="kuang">
        <el-row v-if="referrerId">
           <el-col :span="24">
            <el-col :span="9">
              Frig: 
            </el-col>
            <el-col :span="10">
            </el-col>
            <el-col :span="5" class="right_show" v-if="!isTokenSending">
              <div class="copy-btn" @click="onTokenSend">{{copys.Send}}</div>
            </el-col>
            <el-col :span="5" class="small_show" v-if="isTokenSending">
              {{copys.Confirming}}
            </el-col>
          </el-col>
          </el-col>
           <el-col :span="24" class="line-top">
            <el-col :span="9">
              {{copys.Balance}}: 
            </el-col>
            <el-col :span="15">
              <div class="coin-text"> {{ tokenBalance }}</div>
            </el-col>
            <!-- <el-col :span="5" class="right_show" v-if="!isTokenSending">
              <div class="copy-btn" @click="onTokenSend">Send</div>
            </el-col>
            <el-col :span="5" class="small_show" v-if="isTokenSending">
              Confirming
            </el-col> -->
          </el-col>
          <el-col :span="24" class="">
            <el-col :span="9">
              {{copys.Power}}: 
            </el-col>
            <el-col :span="15">
              <div class="coin-text"> {{ tokenPower }}</div>
            </el-col>
          </el-col>

           <el-col :span="24" class="">
            <el-col :span="9">
              {{copys.TotalPower}}: 
            </el-col>
            <el-col :span="15">
              <div class="coin-text"> {{ totalPower }}</div>
            </el-col>
          </el-col>

        </el-row>
        <!-- <el-col :span="12">
          Contract Address:
        </el-col>
        <el-col :span="12" class="right_show">
          <div class="copy-btn" @click="copyString($helper.showAddress(tokenContractTxt))">Copy</div>
        </el-col>
        <el-col :span="24" class="link-text">
          {{$helper.showAddress(tokenContractTxt)}}
        </el-col> -->
      </el-row>

      <el-row class="kuang"  v-if="mode>1">
        <!-- <el-row class="line-bar"> -->
      <el-row class="line-bar">
          <el-col :span="24" class="big">
            {{copys.ID}}: {{userId}}
          </el-col>
        </el-row>
      <el-col :span="12">
        {{copys.InvitationCode}}:
      </el-col>
      <el-col :span="12" class="right_show">
        <div class="copy-btn" @click="copyString(userCode)">{{copys.Copy}}</div>
      </el-col>
      <el-col :span="24" class="link-text big">
        {{userCode}}
      </el-col>
        <!-- </el-row> -->
        <el-col :span="12">
          {{copys.AffiliateLink}}:
        </el-col>
        <el-col :span="12" class="right_show">
          <div class="copy-btn" @click="onCopyLink">{{copys.Copy}}</div>
        </el-col>
        <el-col :span="24" class="link-text">
          {{linkTxt}}
        </el-col>

         <el-col :span="12">
          {{copys.AndroidAPP}}:
        </el-col>
        <el-col :span="12" class="right_show">
          <div class="copy-btn" @click="copyString(Android_url+' ->Invitation Code '+userCode+' <-')">{{copys.Copy}}</div>
        </el-col>
        <el-col :span="24" class="link-text">
          {{Android_url}}
        </el-col>

        <el-col :span="12">
          {{copys.IosAPP}}:
        </el-col>
        <el-col :span="12" class="right_show">
          <div class="copy-btn" @click="copyString(IOS_url+' ->Invitation Code '+userCode+' <-')">{{copys.Copy}}</div>
        </el-col>
        <el-col :span="24" class="link-text">
          {{IOS_url}}
        </el-col>

      </el-row>
    
    <el-row class="kuang"  v-if="mode>1">
         <el-row class="line-bar">
       <el-col :span="24">
        <el-col :span="10">
          <div class="man-txt"> {{partnersCount}}</div>
        </el-col>
        <el-col :span="14">
         <img class="man-ico" src="../assets/man.png" />
        </el-col>
      </el-col>
      </el-row>
      
     <el-col :span="24">
        <el-col :span="12">
          {{copys.CoinReceived}}: 
        </el-col>
        <el-col :span="12">
          <div class="coin-text"> {{receivedCoins}}</div>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="12">
          {{copys.PowerReceived}}: 
        </el-col>
        <el-col :span="12">
          <div class="coin-text"> {{receivedPowers}}</div>
        </el-col>
      </el-col>
     
    </el-row>

      <el-row style="text-align: center;" v-if="mode==1 && referrer">
         <el-button type="primary" @click="onRegister" round>{{copys.register}}</el-button>
      </el-row>
      
    <el-row class="kuang" v-if="levelData && mode>1" >
      <div class="lable-text">{{copys.matrix}}<div class="line">>>>>>></div></div>
      <div class="list-bar">
 <node v-on:reLoad='reLoad' v-for="d in levelData" :copys="copys" :key="d.index" :can="d.can" :partners="d.partners" :reinvest="d.reinvest" :balanceWei="balanceWei" :balance="balance" :index="d.index" :lock="d.lock" :open="d.open" :price="d.price" :list="d.list" :level="d.level"></node>
   
      </div>
      </el-row>
     <!-- <el-row class="kuang" v-if="lowerList">
       <div class="lable-text">frigga<div class="line"><<<<<<</div></div>
      <node v-for="d in lowerList" :key="d.val" :val="d.val" :list="d.list"></node>
    </el-row> -->
 </el-row>
    <el-drawer
    :with-header="false"
    :visible.sync="drawer"
    size="16rem"
    direction="ttb" >
      <el-row :span="20">
          <!-- <el-col :span="12">
            Wallet Address:
          </el-col>
          <el-col :span="24" class="black-text">
            <div>
                {{ address }}
            </div>
          </el-col> -->
        <el-col :span="12">
            {{copys.Privatekey}}:
          </el-col>
          <el-col :span="24" class="black-text">
            <div>
                {{ secretData }}
            </div>
          </el-col>
        <el-col :span="24" class="pop-btn">
            <el-button type="success" @click="onCopySecret" round>{{copys.Copy}}</el-button>
            <el-button  @click="onClear" round>{{copys.Clear}}</el-button>
        </el-col>
      </el-row>
  </el-drawer>
  <el-drawer
    :with-header="false"
    :visible.sync="sender"
    size="20rem"
    direction="ttb" >
      <el-row :span="20">
        <el-form ref="form" label-position="top">
        <el-form-item :label="copys.Reciever">
          <el-input
                   maxlength="43"
                   show-word-limit
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 2}"
                  placeholder=""
                  v-model="reciever">
                </el-input>
        </el-form-item>
        <el-form-item :label="copys.Amount">
          <el-input v-model="amount" type="number">
            <template slot="append">ODIN</template>
                </el-input>
        </el-form-item>
        <el-form-item class="pop-btn">
          <el-button type="primary" @click="onSendSubmit" round>{{copys.Send}}</el-button>
        </el-form-item>
      </el-form>
      </el-row>
  </el-drawer>

  <el-drawer
    :with-header="false"
    :visible.sync="tokenSender"
    size="20rem"
    direction="ttb" >
      <el-row :span="20">
        <el-form ref="form" label-position="top">
         <el-form-item :label="copys.Reciever">
          <el-input
                   maxlength="43"
                   show-word-limit
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 2}"
                  placeholder=""
                  v-model="tokenReciever">
                </el-input>
        </el-form-item>
        <el-form-item :label="copys.Amount">
          <el-input v-model="tokenAmount" type="number">
            <template slot="append">{{copys.Token}}</template>
                </el-input>
        </el-form-item>
        <el-form-item class="pop-btn">
          <el-button type="primary" @click="onTokenSendSubmit" round>{{copys.Send}}</el-button>
        </el-form-item>
      </el-form>
      </el-row>
  </el-drawer>
  <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="50%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog> -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Main',
  props:['copys'],
  data () {
    return {
      IOS_url:"https://api.lianzhushou.net/HTyI",
      Android_url:"http://frigga.in/downloads/frigga.apk",
      isSending:false,
      isTokenSending:false,
      reciever:"",
      tokenReciever:"",
      amount:0,
      tokenAmount:0,
      totalPower:0,
      userId:0,
      userCode:0,
      referrer:this.$helper.rootAddress,
      referrerId:0,
      partnersCount:0,
      timer:0,
      mode:0,
      dialogVisible: false,
      secretData:null,
      address:null,
      drawer: false,
      sender:false,
      tokenSender:false,
      balance:0,
      balanceWei:"",
      tokenBalance:0,
      tokenBalanceWei:"",
      tokenPower:0,
      linkTxt:"",
      contractTxt:this.$helper.hash,
      tokenContractTxt:this.$helper.tokenHash,
      receivedCoins:0,
      receivedPowers:0,
      netLock:false,
      // activeList:[
        // {val:3.2,list:[true,true,false]},
        // {val:6.4,list:[true,false,false]},
        // {val:12.8,list:[true,false,false]},
        // {val:25.6,list:[true,false,false]},
      // ],
      levelData:null,
    }
  },
  methods: {
    clearTimer(){
      if(this.timer>0)
        clearTimeout(this.timer)
    },
    copyString(str) {
        let oInput = document.createElement('input'); //创建一个隐藏input（重要！）
        oInput.readOnly = "readOnly"
        oInput.value = str;    //赋值
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        if(str!=""){
            this.$msg("success",this.copys.Copied);
        }else{
          this.$msg("success",this.copys.Cleard);
          // this.$message.success('Cleard');
        }
        
    },
    onClear(){
      let _this=this
      // _this.$confirm('Clear private key will lost your wallet, please copy and store it first. Do you confirm to clear?')
       _this.$confirm(_this.copys.Clearprivate)
          .then(_ => {
            _this.copyString("")
            _this.$clear()
            _this.$router.push('/reg')
          })
          .catch(_ => {});
    },
    onSend(){
      this.sender=true
    },
     onTokenSend(){
      this.tokenSender=true
    },
    onTokenSendSubmit(){
      let _this=this
      _this.tokenSender=false
      let tokenAmount = Number(_this.tokenAmount)
      let tokenReciever=_this.$helper.realyAddress(_this.tokenReciever)
      let account = this.$getAddress()
      if(!_this.$helper.web3.utils.isAddress(tokenReciever)){
         _this.$msg("warning",_this.copys.correctaddress)
        return
      }
      if(isNaN(tokenAmount)){
         _this.$msg("warning",_this.copys.incorrect)
        return
      }
       _this.$global.onLoading(true,_this.copys.Send2)
       let data=_this.$helper.tokenContract.methods.transfer(tokenReciever,_this.$helper.web3.utils.toWei(tokenAmount.toString(), 'ether')).encodeABI()
      _this.$helper.getGas(_this.$getAddress(),_this.tokenBalanceWei,tokenAmount,"80000",
        (ok,gasPrie,timate,val)=>{
          if(tokenAmount > _this.tokenBalance){
              _this.$global.onLoading(false,"")
              _this.$msg("warning",_this.$copyAdd(_this.copys.friginsufficientlease,tokenAmount))
              return
          }
            _this.$confirm(_this.$copyAdd(_this.copys.frigsendingto,tokenAmount,tokenReciever))
                .then(_ => {
                    _this.onTokenSendSubmitDo(account,data,tokenAmount,gasPrie,timate)
                })
                .catch(_ => {
                  _this.$global.onLoading(false,"")
                });
      },(e)=>{
        _this.$global.onLoading(false,"")
         _this.$msg("warning",_this.copys.SendFailed)
        // _this.$message.warning('Register Failed');
      })
    },
    onTokenSendSubmitDo(account,data,amountStr,gasPrie,timate){
        let _this=this
        let contractAddress = this.$helper.tokenHash
        // let account = this.$getAddress() // Your account address 1
        let privateKey= this.$getKey().slice(2)
        let level=this.level
        // let price = this.$helper.price
        // this.$global.onLoading(true,"Register...")
        console.log('txCount....:', account)
        this.$helper.web3.eth.getTransactionCount(account).then((txCount)=> {
            console.log('txCount..ok:', txCount)
            // 创建交易对象
            let txObject = {
              nonce:    _this.$helper.web3.utils.toHex(txCount),
              gasLimit:_this.$helper.web3.utils.toHex(timate),
              gasPrice: _this.$helper.web3.utils.toHex(gasPrie),// _this.$helper.web3.utils.toHex(_this.$helper.web3.utils.toWei('10', 'gwei')),//ODIN
              to:contractAddress,
              from:account,
              data:data//_this.$helper.contract.methods.buyNewLevel(level).encodeABI(),
              // data:this.$helper.contract.methods.registrationExt("0x07E8Ee67ce9CDB32a08204125F75769b9b0EAACa").encodeABI(),
              // value:_this.$helper.web3.utils.toHex(_this.$helper.web3.utils.toWei('0', 'ether'))//web3.utils.toHex(web3.utils.toWei('3.2', 'ether'))//
            }
          //  console.log('privateKey:', privateKey)
            // 签署交易
          let tx = new _this.$helper.tx(txObject, { common: _this.$helper.custom })
          tx.sign(Buffer.from(privateKey, 'hex'))
          _this.$helper.web3.eth.sendSignedTransaction("0x" + tx.serialize().toString('hex'))
          .on('transactionHash', (hash) => {
              _this.isTokenSending=true
              _this.amount="0"
              // _this.loadOther()
              _this.$global.onLoading(false,"")
          })
          .on('receipt', (receipt) => {
            console.log("receipt:",receipt);
             _this.$global.onLoading(false,"")
            _this.isTokenSending=false
            if(receipt.status){
                // 
                _this.$message.success(_this.copys.SendSucceed);
                 _this.reLoad()
              }else{
                _this.$msg("warning",_this.copys.SendFailed)
                // _this.$message.warning('Register Failed');
              }
          })
          .catch((e)=>{
            console.log("catch2:",e);
            _this.$global.onLoading(false,"")
            _this.$msg("warning",_this.copys.SendFailed)
            // _this.$message.warning('Register Failed');
          })
                // .on('error', console.error)
      })
      .catch((e)=>{
        console.log("catch1:",e);
        _this.$global.onLoading(false,"")
        _this.$msg("warning",_this.copys.SendFailed)
        // _this.$message.warning('Register Failed');
      })
    },
    onSendSubmit(){
      let _this=this
      let amount = Number(_this.amount)
      let reciever=_this.$helper.realyAddress(_this.reciever)
      if(!_this.$helper.web3.utils.isAddress(reciever)){
         _this.$msg("warning",_this.copys.correctaddress)
        return
      }
      if(isNaN(amount)){
         _this.$msg("warning",_this.copys.Amountincorrect)
        return
      }
       _this.$global.onLoading(true,_this.copys.Send2)
      _this.$helper.getGas(_this.$getAddress(),_this.balanceWei,amount,"42000",
        (ok,gasPrie,timate,val)=>{
          if(!ok){
              _this.$global.onLoading(false,"")
               _this.$msg("warning",_this.$copyAdd(_this.copys.odininsufficientlease,val))
              // _this.$msg("warning",'insufficient balance to do, at lease '+val+' ODIN.')
              return
          }
          // _this.$confirm('You are sending to '+val+' ODIN to '+reciever+', continue?')
            _this.$confirm(_this.$copyAdd(_this.copys.odinsendingto,val,reciever))
                .then(_ => {
                    _this.onSendSubmitDo(reciever,amount.toString(),gasPrie,timate)
                })
                .catch(_ => {
                  _this.$global.onLoading(false,"")
                });
      },(e)=>{
        _this.$global.onLoading(false,"")
         _this.$msg("warning",_this.copys.SendFailed)
        // _this.$message.warning('Register Failed');
      })
    },
    onSendSubmitDo(reciever,amountStr,gasPrie,timate){
          let _this=this
          _this.sender=false
          let account = this.$getAddress() // Your account address 1
          let privateKey= this.$getKey().slice(2)
          this.$helper.web3.eth.getTransactionCount(account).then((txCount)=> {
            // console.log('txCount:', txCount)
            // 创建交易对象
          let txObject = {
            nonce:_this.$helper.web3.utils.toHex(txCount),
            gasLimit:_this.$helper.web3.utils.toHex(timate),
            gasPrice:_this.$helper.web3.utils.toHex(gasPrie),// _this.$helper.web3.utils.toHex(_this.$helper.web3.utils.toWei('10', 'gwei')),//ODIN
            to:reciever,
            from:account,
            // data:data,//_this.$helper.contract.methods.buyNewLevel(level).encodeABI(),
            // data:this.$helper.contract.methods.registrationExt("0x07E8Ee67ce9CDB32a08204125F75769b9b0EAACa").encodeABI(),
            value:_this.$helper.web3.utils.toHex(_this.$helper.web3.utils.toWei(amountStr.toString(), 'ether'))//web3.utils.toHex(web3.utils.toWei('3.2', 'ether'))//
          }
          let tx = new _this.$helper.tx(txObject, { common: _this.$helper.custom })
          tx.sign(Buffer.from(privateKey, 'hex'))
          _this.$helper.web3.eth.sendSignedTransaction("0x" + tx.serialize().toString('hex'))
          .on('transactionHash', (hash) => {
            _this.isSending=true
            _this.amount="0"
            // _this.loadOther()
            _this.$global.onLoading(false,"")
          })
          .on('receipt', (receipt) => {
            console.log("receipt:",receipt);
             _this.$global.onLoading(false,"")
            _this.isSending=false
              if(receipt.status){
                // 
                  _this.$message.success(_this.copys.SendSucceed);
                  _this.reLoad()
              }else{
                _this.$msg("warning",_this.copys.SendFailed)
                // _this.$message.warning('Register Failed');
              }
          })
          .catch((e)=>{
            console.log("catch2:",e);
            _this.$global.onLoading(false,"")
            _this.$msg("warning",_this.copys.SendFailed)
            // _this.$message.warning('Register Failed');
          })
                // .on('error', console.error)
      })
      .catch((e)=>{
        console.log("catch1:",e);
        _this.$global.onLoading(false,"")
        _this.$msg("warning",_this.copys.SendFailed)
        // _this.$message.warning('Register Failed');
		  })
    },
    onPrivateKey(){
      let _this=this
       _this.secretData=_this.$getKey()
        _this.address=_this.$getAddress()
        _this.drawer=true

    },
    loadOther(){
      //receivedCoins[address]拿币总收益
      //receivedPowers[address]拿算力总收益
      let address = this.address
      let _this=this
    
      this.$helper.web3.eth.getBalance(this.address).then((balance)=>{
        //_this.$helper.web3.utils.fromWei(price.toString(), 'ether')
        console.log("getBalance:",balance)
        _this.balanceWei=balance
        _this.balance = _this.$helper.web3.utils.fromWei(balance,"ether")
      })
      .catch((e)=>{
				console.log("getBalance:",e);
      })
      
      this.$helper.contract.methods.receivedCoins(address).call().then(
          function(coin){
                console.log("receivedCoins:",coin)
                _this.receivedCoins=_this.$helper.web3.utils.fromWei(coin,"ether")
          }
      )
      .catch((e)=>{
				console.log("receivedCoins:",e);
      })
      
      this.$helper.contract.methods.receivedPowers(address).call().then(
          function(powers){
              console.log("receivedPowers:",powers)
                _this.receivedPowers=powers
          }
      )
      .catch((e)=>{
				console.log("receivedPowers:",e);
      })
      
      this.$helper.tokenContract.methods.balanceOf(this.address).call().then(
        (balance)=>{
              //activeList
              console.log("balanceOf:",balance)
              _this.tokenBalanceWei= balance
              _this.tokenBalance = _this.$helper.web3.utils.fromWei(balance,"ether")
              // var arr=_this.levelData.concat()
        }
      )
      .catch((e)=>{
				console.log("userMissedMatrixLevels:",e);
      })

      this.$helper.tokenContract.methods.userFrigPowers(this.address).call().then(
        (power)=>{
              //activeList
              console.log("userFrigPowers:",power)
              _this.tokenPower= power
              // var arr=_this.levelData.concat()
        }
      )
      .catch((e)=>{
				console.log("userFrigPowers:",e);
      })

       this.$helper.tokenContract.methods._totalPower().call().then(
        (power)=>{
              //activeList
              console.log("_totalPower:",power)
              _this.totalPower= power
              // var arr=_this.levelData.concat()
        }
      ).catch((e)=>{
				console.log("_totalPower:",e);
      })

    },
    reLoad(){
      let _this=this
      if(_this.mode>0){
          try{
          _this.loadOther()
        }catch(e){
        
        }
      }
      if(_this.mode>1){
        try{
          _this.reLoadDo()
        }catch(e){
        
        }
      }
      _this.clearTimer()
      _this.timer=setTimeout(()=>{
          _this.reLoad()
        },30000)
    },
    reLoadDo(){
    // this.$setData("0x5FD13d8D98a5b055293284dB3fCe26d5505CC171","0xf8d0f4da7f6cdd589225bc8c9d5946610f4a3195e3c1f26233be702d47375c13",8)
  
      let _this=this
      let price=this.$helper.price
      this.secretData=this.$getKey()
      this.address=this.$getAddress()
    
      // this.loadOther()
      // let loadCount=5

      _this.$helper.getUser(_this.address,(user)=>{  
            if(user){
              _this.partnersCount=user.partnersCount
              console.log("partnersCount:",_this.address,user,_this.partnersCount,user.partnersCount)
                // _this.$setCode(user.code)
                // _this.$setId(user.id)
        
                  _this.userId=user.id
                  _this.userCode=user.code
                   _this.linkTxt=this.$getLink(_this.userCode)
                _this.referrer=user.referrer
                if(_this.referrerId==0){
                     _this.$helper.getUser(_this.referrer,(user)=>{  
                        if(user){
                            _this.referrerId=user.id
                        }
                    })
                }
            }
        })

      let arr=[]
      let val=price

      for(let i=0;i<12;i++){
        arr.push({index:i+1,level:i+1,lock:false,partners:0,reinvest:0,can:false,open:false,price:(val).toFixed(1),list:[false,false,false]})
        val=val*2
      }
      // this.levelData=this.levelData.concat()
      //userMatrixInfo(
       this.$helper.contract.methods.userMatrixInfo(this.address).call().then(
        (list)=>{
              let userMatrixReinvestCount = list[0]
              let userMatrixPartnersCount = list[1]
              let userActiveMatrixLevels = list[2]
              let userMissedMatrixLevels = list[3]
              let userLowerAddresses = list[4]
              //activeList
              console.log("userMatrixInfo:",userMatrixReinvestCount,
              userMatrixPartnersCount,userActiveMatrixLevels,userMissedMatrixLevels,
              userLowerAddresses)
              let i=0
              // var arr=_this.levelData.concat()
              for(i=0;i<userMatrixReinvestCount.length;i++){
                arr[i].reinvest=userMatrixReinvestCount[i]
              }
              for(i=0;i<userMatrixPartnersCount.length;i++){
                arr[i].partners=userMatrixPartnersCount[i]
              }
              for(i=0;i<userActiveMatrixLevels.length;i++){
                arr[i].open=userActiveMatrixLevels[i]
              }
              for(i=0;i<userMissedMatrixLevels.length;i++){
                arr[i].lock=userMissedMatrixLevels[i]
              }
              for(i=0;i<userLowerAddresses.length;i++){
                for(let n=0;n<userLowerAddresses[i].length;n++){
                  if(userLowerAddresses[i][n]=="0x0000000000000000000000000000000000000000"){
                    arr[i].list[n]=false
                  }else{
                    arr[i].list[n]=true
                  }
              }
            }
            _this.levelData=arr
            
            console.log("levelData:",_this.levelData)
        }
      )
      .catch((e)=>{
				console.log("userActiveMatrixLevels:",e);
      })
    },
    onCopyContract(){
      this.copyString(this.contractTxt)
    },
    onCopyLink(){
        this.copyString(this.linkTxt)
        // this.$global.onLoading(true,"copy")
    },
    onCopySecret(){
       this.copyString(this.secretData)
    },
    onRegister(){
      let _this=this
      let price = _this.$helper.price
      let data=_this.$helper.contract.methods.registrationExt(_this.referrer).encodeABI()
       _this.$global.onLoading(true,"Register...")
         console.log('onRegister: referrer:',_this.referrer)
   
      _this.$helper.getGas(_this.$getAddress(),_this.balanceWei,price,"8000000",
        (ok,gasPrie,timate,val)=>{
          if(!ok){
            _this.$global.onLoading(false,"")
              _this.$msg("warning",_this.$copyAdd(_this.copys.toregister,val))
              return
          }
            _this.$confirm(_this.$copyAdd(_this.copys.Registercost,val))
                .then(_ => {
                    _this.onRegisterDo(data,price,gasPrie,timate)
                })
                .catch(_ => {
                  _this.$global.onLoading(false,"")
                });
      },(e)=>{
        _this.$global.onLoading(false,"")
         _this.$msg("warning",_this.copys.RegisterFailed)
        // _this.$message.warning('Register Failed');
      })
      // if(Number(_this.balance)<Number(_this.$helper.price)){
      //     _this.$message.warning('insufficient balance to register, at lease '+_this.$helper.price+' ODIN');
      //     return
      // }
    },
    onRegisterDo(data,price,gasPrie,timate) {
        let _this=this
        let contractAddress = this.$helper.hash
        let account = this.$getAddress() // Your account address 1
        let privateKey= this.$getKey().slice(2)
        let level=this.level
        // let price = this.$helper.price
        // this.$global.onLoading(true,"Register...")
       if(_this.netLock){
         return
       }
       _this.netLock=true
        this.$helper.web3.eth.getTransactionCount(account).then((txCount)=> {
            // console.log('txCount:', txCount)
            // 创建交易对象
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
          //  console.log('privateKey:', privateKey)
            // 签署交易
          const tx = new this.$helper.tx(txObject, { common: _this.$helper.custom })
          tx.sign(Buffer.from(privateKey, 'hex'))
          _this.$helper.web3.eth.sendSignedTransaction("0x" + tx.serialize().toString('hex'))
          .on('transactionHash', (hash) => {
            _this.$global.onLoading(true,_this.copys.confirmation)
            // console.log("hash:",hash);//0xe52e95fd2f55f512545d2e358c08983044fae690c38694b33164747d3af655a4
          })
          .on('receipt', (receipt) => {
          //   console.log("receipt:",receipt);
             _this.$global.onLoading(false,"")
            if(receipt.status){
                // 
                  _this.$message.success(_this.copys.RegisterSucceed);
                  _this.mode=2
                  _this.reLoad()
              }else{
                _this.$msg("warning",_this.copys.RegisterFailed)
                // _this.$message.warning('Register Failed');
              }
           _this.netLock=false
          })
          // .on('confirmation', (confirmationNumber, receipt) => {
          //   // _this.$router.go(0)
          //   if(confirmationNumber==1){
          //     if(receipt.status){
          //       // 
          //         _this.$message.success('Register Succeed.');
          //         _this.mode=2
          //         _this.reLoad()
          //     }else{
          //       _this.$msg("warning",'Register Failed.')
          //       // _this.$message.warning('Register Failed');
          //     }
          //      _this.$global.onLoading(false,"")
          //      _this.netLock=false
          //   }
          //   return false
          // })
          .catch((e)=>{
            console.log("catch2:",e);
            _this.$global.onLoading(false,"")
            _this.$msg("warning",_this.copys.RegisterFailed)
            _this.netLock=false
            // _this.$message.warning('Register Failed');
          })
                // .on('error', console.error)
      })
      .catch((e)=>{
        console.log("catch1:",e);
        _this.$global.onLoading(false,"")
        _this.$msg("warning",_this.copys.RegisterFailed)
        _this.netLock=false
        // _this.$message.warning('Register Failed');
		  })
    }
  },
  mounted:function(){
    let _this=this
    let address = _this.$getAddress()
    let referrer = _this.$getReferrer()
    let referrerId = _this.$getReferrerId()
    console.log("mounted:",address,referrerId,referrer)

    if(!this.$helper.web3.utils.isAddress(address) || !this.$helper.checkPrivateKey(address,this.$getKey())){
      _this.$router.push('/reg')
      return
    }
    console.log("catch......");
    axios.get(_this.$helper.host + "/appver.json?v="+(new Date().getTime()))
      // axios.get("file:///jeff.yan/work/qq/odin/frigga/web/appver.json")
      .then(function(response){  
          let lan = ""
          // if(_this.$language == "korea"){
          //     lan = "_kr"
          // }else if(_this.$language == "russia"){
          //     lan = "_ru"
          // }
          let ver = response.data
           console.log("catch1:",ver,"ios"+lan);
           if(ver && ver["ios"+lan]){
             if(ver["ios"+lan].url){
               console.log("catch3:",ver,"ios"+lan);
               _this.IOS_url = ver["ios"+lan].url
             }
           }
            if(ver && ver["android"+lan]){
              console.log("android4:",ver,"ios"+lan);
             if(ver["android"+lan].url){
               console.log("android5:",ver,"ios"+lan);
               _this.Android_url = ver["android"+lan].url
             }
           }
      }) 
      .catch(function(err){   
            console.log(err)
      })

    this.address = address
    this.secretData=this.$getKey()
    console.log("address:",address,referrer)
   this.$helper.isUserExists(address,(exists)=>{
     if(exists){
        _this.mode=2
				_this.reLoad()
     }else{
        if(this.$helper.web3.utils.isAddress(referrer)){
          this.$helper.isUserExists(referrer,(exists)=>{
              if(exists){
                 _this.referrerId = referrerId
                _this.referrer=referrer
                  _this.mode=1
                  _this.reLoad()
              }else{
                this.$helper.getRoot((rootAddress)=>{
                    console.log("rootAddress:",rootAddress)
                     _this.referrerId = 1
                      _this.referrer=rootAddress
                      // this.$setReferrer(rootAddress)
                        _this.mode=1
                        _this.reLoad()
                  })
                }
              })
          }else{
                console.log("rootAddress1:")
                this.$helper.getRoot((rootAddress)=>{
                console.log("rootAddress:",rootAddress)
                    _this.referrerId=1
                      _this.referrer=rootAddress
                      // this.$setReferrer(rootAddress)
                    _this.mode=1
                    _this.reLoad()
                })
          }
        }
        })
      },
    destroyed() {
      this.clearTimer()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-col{
  margin: 0.1rem 0;
}
.right_show{
  text-align: right;
}
.copy-btn{
    display: inline-block;
    /* line-height: 1; */
    white-space: nowrap;
    cursor: pointer;
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    padding: 0.2rem 0.6rem;
    border-radius: 0.6rem;
    font-size: 0.8rem;
}

.link-text{
   background-color: #409EFF66;
   padding:0.1rem 0.6rem;
    word-break: break-all;
}
.coin-text{
  background-color: #409EFF66;
   padding:0.1rem 0.4rem;
   margin:0 0.2rem 0.2rem 0;
   overflow: hidden;
}
.line{
  display: inline-block;
  font-size: 0.1rem;
  padding: 0.2rem 0 0 0.2rem;
}
.m-text{
  word-break: break-all;
}
.black-text{
  background-color: #00000036;
  padding:1rem;
  margin:0.2rem 0 1rem;
  font-size: 1.2rem;
  word-break: break-all;
  border-radius: 0.5rem;
}
.pop-btn{
  text-align: right;
  /* margin: 0; */
}
.big{
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 1rem;
}
.man-txt{
  text-align: right;
  line-height: 3rem;
  font-size: 1.6rem;
}
.man-ico{
  margin-left:0.2rem ;
  width: 4rem;
  height: 3rem;
}
.line-bar{
  border-bottom:dotted rgb(11, 234, 235) 0.1rem;
  margin-bottom: 0.5rem;
}
.line-bar2{
  border-bottom:dotted rgb(11, 234, 235) 0.1rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}
.line-top{
  border-top:dotted rgb(11, 234, 235) 0.1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}
.list-bar{
  width: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-wrap:wrap;
  padding-top:1rem;
}
.small_show{
  font-size: 0.8rem;
    padding: 0.4rem 0rem 0.1rem 0.3rem;
    color: #ccff00;
}
</style>
