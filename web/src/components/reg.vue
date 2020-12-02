<template>
  <div id="reg" class="reg page">
    <el-row :span="20">
      <el-form ref="form" :model="form" label-position="top" class="reg-bar">
         <!-- <el-form-item label="Private Key" prop="pkeyVal">
          <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 12}"
                  placeholder=""
                  v-model="form.pkeyVal">
                </el-input>
        </el-form-item> -->
          <el-form-item :label="copys.InvitationCode" class="id-label">
            <el-input type="number" :readonly='hasId' v-model="form.referrerId" class="id-input"></el-input>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="onReg" round>{{copys.CreateWallet}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  @click="drawer=true" round>{{copys.ImportWallet}}</el-button>
        </el-form-item>
      </el-form>

      <el-row class="down-bar" v-if="!isApp()">
        <el-col :span="24" class="big">
         <a :href="Android_url">{{copys.DownloadAndroid}}</a>
        </el-col>
      </el-row>
      <el-row class="down-bar" v-if="!isApp()">
        <el-col :span="24" class="big">
         <a :href="IOS_url" target="_blank">{{copys.DownloadIos}}</a>
        </el-col>
      </el-row>
<!--       
      <el-row class="down-bar" v-if="!isApp() && Android_url_kr">
        <el-col :span="24" class="big">
         <a :href="Android_url_kr">{{copys.DownloadAndroid_kr}}</a>
        </el-col>
      </el-row>
      <el-row class="down-bar" v-if="!isApp() && IOS_url_kr">
        <el-col :span="24" class="big">
         <a :href="IOS_url_kr" target="_blank">{{copys.DownloadIos_kr}}</a>
        </el-col>
      </el-row>

      <el-row class="down-bar" v-if="!isApp() && Android_url_su">
        <el-col :span="24" class="big">
         <a :href="Android_url_su">{{copys.DownloadAndroid_su}}</a>
        </el-col>
      </el-row>
      <el-row class="down-bar" v-if="!isApp() && IOS_url_su">
        <el-col :span="24" class="big">
         <a :href="IOS_url_su" target="_blank">{{copys.DownloadIos_su}}</a>
        </el-col>
      </el-row> -->
  </el-row>

  <el-drawer
    :with-header="false"
    :visible.sync="drawer"
    size="16rem"
    direction="ttb" >
      <el-row :span="20">
      <el-form ref="form"  :model="form" label-position="top">
         <el-form-item :label="copys.Privatekey">
          <el-input
                  maxlength="66"
                   show-word-limit
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 3}"
                  placeholder=""
                  v-model="form.pkeyVal">
                </el-input>
        </el-form-item>
        <el-form-item class="pop-btn">
          <el-button type="primary" @click="onSubmit" round>{{copys.Import}}</el-button>
        </el-form-item>
      </el-form>
       </el-row>
  </el-drawer>

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
      //  IOS_url_kr:"https://api.lianzhushou.net/HTyI",
      // Android_url_kr:"http://frigga.in/downloads/frigga.apk",
      //  IOS_url_su:"https://api.lianzhushou.net/HTyI",
      // Android_url_su:"http://frigga.in/downloads/frigga.apk",
      drawer: false,
      hasId:false,
     form: {
        referrerId: "",
        // pwd: '',
        pkeyVal:''
      }
    }
  },
  methods: {
    setReferrer(run){
      let _this=this
      _this.form.referrerId=_this.form.referrerId.toString().replace(/\s+/g,"")
      if(_this.form.referrerId!=""){
          let pid=parseInt(this.form.referrerId)
          if(!isNaN(pid) && pid>0){
              // console.log("setReferrer:",pid);
              this.$helper.codeToAddress(pid,(id,address)=>{
              // console.log("codeToAddress:",pid,id,address);
              if(address!="" && address!="0x0000000000000000000000000000000000000000"){
                  _this.$setReferrerId(id)
                  _this.$setReferrer(address)
                  run()
                }
              },(e)=>{
                // console.log("setReferrer:",e)
                _this.$msg("warning",_this.copys.IDincorrect)
              })
          }else{
            // console.log("setReferrer:",e)
            _this.$msg("warning",_this.copys.IDincorrect)
          }
      }else{
        run()
      }
      
    },
    onSubmit() {
      this.setReferrer(this.onSubmitDo)
    },
     onSubmitDo() {
       let _this=this
        this.$refs["form"].validate((valid) => {
          if (valid) {
            let account = _this.$helper.privateKeyToAccount(_this.form.pkeyVal)
              console.log("_this.pkeyVal",_this.form.pkeyVal,account)
             if(account==null){
               _this.$msg("warning",_this.copys.Privateincorrect)
                return false;
              }
              _this.$setData(account.address,account.privateKey)
              _this.$router.push('/')
          } else {
            console.log('error submit!!');
            _this.$msg("warning",_this.copys.Privateincorrect)
            return false;
          }
        });
      },
      onReg() {
         this.setReferrer(this.onRegDo)
      },
      onRegDo() {
         let account=this.$helper.web3.eth.accounts.create()
         this.$setData(account.address,account.privateKey)
         this.$router.push('/')
      }
  },
  mounted:function(){
    let _this=this
    let address = this.$getAddress()
    let referrerId = _this.$getReferrerId()

    if(referrerId>0){
      _this.form.referrerId = this.$helper.id2Show(referrerId)
      _this.hasId=true
    }
    try{
      if(this.$helper.checkPrivateKey(address,this.$getKey())){
        _this.$router.push('/')
      }
    }catch(e){}

    // axios.get("appver.json?v="+(new Date().getTime()))
    //   // axios.get("file:///jeff.yan/work/qq/odin/frigga/web/appver.json")
    //   .then(function(response){  
    //         console.log(response)
    //       let ver = response.data
    //        if(ver && ver.ios && ver.android){
    //          if(ver.ios.url){
    //            _this.IOS_url = ver.ios.url
    //          }
    //          if(ver.android.url){
    //            _this.Android_url = ver.android.url
    //          }
    //        }
    //   }) 
    //   .catch(function(err){   
    //         console.log(err)
    //   })
     axios.get(_this.$helper.host + "/appver.json?v="+(new Date().getTime()))
      // axios.get("file:///jeff.yan/work/qq/odin/frigga/web/appver.json")
      .then(function(response){  
          let ver = response.data
          if(ver){
            if(ver.ios && ver.ios.url){
               _this.IOS_url = ver.ios.url
             }
             if(ver.android && ver.android.url){
               _this.Android_url = ver.android.url
             }
            //  if(ver.ios_kr && ver.ios_kr.url){
            //    _this.IOS_url_kr = ver.ios_kr.url
            //  }
            //  if(ver.android_kr && ver.android_kr.url){
            //    _this.Android_url_kr = ver.android_kr.url
            //  }
            //  if(ver.ios_ru && ver.ios_ru.url){
            //    _this.IOS_url_su = ver.ios_ru.url
            //  }
            //  if(ver.android_ru && ver.android_ru.url){
            //    _this.Android_url_su = ver.android_ru.url
            //  }

          }
          //  console.log("catch1:",ver,"ios"+lan);
          //  if(ver && ver["ios"+lan]){
          //    if(ver["ios"+lan].url){
          //      console.log("catch3:",ver,"ios"+lan);
          //      _this.IOS_url = ver["ios"+lan].url
          //    }
          //  }
          //   if(ver && ver["android"+lan]){
          //     console.log("android4:",ver,"ios"+lan);
          //    if(ver["android"+lan].url){
          //      console.log("android5:",ver,"ios"+lan);
          //      _this.Android_url = ver["android"+lan].url
          //    }
          //  }
      }) 
      .catch(function(err){   
            console.log(err)
      })

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


.id-input{
  width: 88%;
  font-size: 1.6rem;
  margin-bottom: 2rem;
}

.pop-btn{
  text-align: right;
  /* margin: 0; */
}
.reg-bar{
  text-align: center;
  padding: 1rem 0 1rem;
}
.reg-bar .el-button{
  font-size: 1.2rem;
  width: 90%;
  margin: 0.6rem 0 0;
}
.down-bar{
  text-align: center;
  margin-bottom:0.2rem;
}
</style>
