<template>
  <div id="app" v-loading="loading"
    :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-header height="5rem">
      FRIGGA
      <div>
        <div class="logo-left">>>>>>>>></div>
        <div class="logo-right"><<<<<<<<</div>
      </div>
     
    </el-header>
    <el-main>
      <router-view :copys="copys" />
    </el-main>
    <el-row class="footer">
        <el-col :span="8" class="footer-txt">
          <div @click="toLang(0)">
              English
          </div>
        </el-col>
        <el-col :span="8" class="footer-txt">
          <div @click="toLang(1)">
              한국어
          </div>
        </el-col>
        <el-col  :span="8" class="footer-txt">
          <div @click="toLang(2)">
            русский
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
    data () {
      return {
        copys:{},
        loading:false,
        loadingText:"拼命加载中",
      }
    },
    created:function(){
      let _this=this
      let ll= window.location.href.split("?")
      let idStr=""
      if(ll.length>1){
        idStr=ll[1].split("#")[0]
        idStr=idStr.split("/")[0]
      }
       idStr=idStr.replace(/\s+/g,"")
       let code=parseInt(idStr)
        console.log("created:",window.location.hash,idStr,code, _this.$getReferrerId())
       if(code>0){
         let referrerId = _this.$getReferrerId()
         if(referrerId!=_this.$helper.show2Id(code)){
           _this.$helper.codeToAddress(code,(id,address)=>{
            console.log("codeToAddress:",code,address);
            if(address!="" && address!="0x0000000000000000000000000000000000000000"){
              _this.$setReferrerId(id)
              _this.$setReferrer(address)
              // try{
              //   _this.$router.push('/')
              // }catch(e){
              // }
              this.$router.go(0)
            }
          },(e)=>{})
         }
          
       }
    },
    methods: {
      toLang(lang){
          console.log("lang::",lang)
         this.$tolang(lang)
         this.copys=this.$copy
      },
      showUpdate(url){
        this.$confirm('New version is available, update now?')
          .then(_ => {
            if(cordova){
              cordova.InAppBrowser.open(url,'_system',
              'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
            }
          })
          .catch(_ => {})
      }
    },
    mounted:function(){
      let _this=this
      this.copys=this.$copy
      this.$global.onLoading=(show,txt)=>{
            _this.loading=show
            _this.loadingText=txt
      }
      // let lan = ""
      // if(_this.$language == "korea"){
      //     lan = "_kr"
      // }else if(_this.$language == "russia"){
      //     lan = "_ru"
      // }
      // if(_this.isIos){
      //   axios.get(_this.$helper.host + "/appver.json?v="+(new Date().getTime()))
      //   .then(function(response){  
      //         // alert(response)
      //       let ver = response.data
      //       if(ver && ver["ios"+lan]){
      //         let v=ver["ios"+lan]
      //         if(v){
      //           if(v.ver>_this.ver){
      //             _this.showUpdate(v.url)
      //           }
      //         }
      //       }
      //   }) 
      //   .catch(function(err){   
      //         // console.log(err)
      //   })
      // }else if(window.device){
           axios.get(_this.$helper.host + "/appver.json?v="+(new Date().getTime()))
            .then(function(response){  
                  // console.log(response)
                let ver = response.data
                if(ver && ver[_this.platform]){
                  let v=ver[_this.platform]
                  if(v){
                    if(v.ver>_this.ver){
                      _this.showUpdate(v.url)
                    }
                  }
                }
            }) 
            .catch(function(err){   
                  console.log(err)
            })
      // }
     
    }
}
</script>

<style>
  body{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    position: relative;
    padding: 0;
    margin: 0;
    background: url(assets/bg.jpg) #409EFF66;
    background-size:100% auto;
    color: #fff;
    min-height: 100%;
    font-weight: bold;
  }
  
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}
#app .el-header{
    position: relative;
    text-align: center;
    font-size: 3rem;
    line-height: 5rem;
    color: #fff;
    padding: 1.2rem 0 0;
}

.logo-left{
  position: absolute;
  font-size: 1rem;
  top:22%;
  color:#42b98399;
}
.logo-right{
  position: absolute;
 font-size: 1rem;
 top:22%;
 right:0;
 color:#42b98399;
}

.lable-text{
   position: absolute;
   left: 0;
   top:0;
   background-color: #409EFF66;
   padding:0.1rem 0.6rem;
   border-top-left-radius: 0.5rem;
}
.kuang{
  border-radius: 0.5rem;box-shadow: rgb(11, 234, 235) 0px 0px 0.2rem inset;
  margin: 1rem 0;
  padding: 1rem;
}
#app .el-form-item__label {
  color: #fff;
  font-size: 1rem;
}
#app .el-drawer{
  background-color:rgba(1, 60, 60,0.9);
  border-bottom-left-radius: 1rem;box-shadow: rgb(11, 234, 235) 0px 0px 2px inset;
  border-bottom-right-radius: 1rem;box-shadow: rgb(11, 234, 235) 0px 0px 2px inset;
}
#app .el-drawer__body{
  padding: 1rem;
}
#app .node-header .el-button{
	background-color:#D3D3DF;
}
.el-form-item__label {
  color: #fff;
  font-size: 1rem;
}
#app  .el-drawer__body{
  padding: 2rem 1rem 0;
}
body .el-message,body .el-message-box{
  width: 100%;
  min-width:100%;
}
body .el-loading-spinner{

}
/* .el-badge__content:before{
  font-size: 2rem;
  content: '\e6c9';
} */

.oInput{
  -webkit-user-select :none;
}
#app #reg .el-form-item__label{
  font-size: 1.6rem;
  padding: 0 0 0.2rem;
}
#app #reg  .el-input__inner{
  text-align: center;
  color: black;
  background-color: #ffffff66;
}
#app{
  min-height: 100%;
}
#app .el-loading-mask{
  position: fixed;
}
.info .el-form-item{
  margin-bottom:1rem;
}
.info .el-form--label-top .el-form-item__label{
padding: 0;
}
#app input,#app textarea{
  font-size: 1.2rem;
}
#app .el-textarea .el-input__count {
    color: #909399;
    background:transparent;
    position: absolute;
    font-size: 0.6rem;
    bottom: -0.5rem;
    right: 0.5rem;
}

#app .footer{
  text-align: center;
  margin: 1rem 0;
  padding: 0 5rem;
}
#app .footer-txt{
   text-align: center;
}
/* #app .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
  color: #606266;
} */
</style>
