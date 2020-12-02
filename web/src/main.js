// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import helper from './tools/web3helper'
import copy from './tools/copy'
// // import './element-variables.scss'
// // import 'element-theme-chalk';
Vue.use(Element)

// console.log=()=>{}

import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage, {
  name: 'storage',
  bind: true //created computed members from your variable declarations
})
//.setItem('huo',JSON.stringify(info));
import node from '@/components/node'

Vue.component('node',node)

console.log(helper)
Vue.prototype.$helper = helper

Vue.prototype.platform="android"
Vue.prototype.ver = 2
Vue.prototype.$language = "en"
if(Vue.prototype.$storage.get('lang')){
  Vue.prototype.$language  = Vue.prototype.$storage.get('lang')
}
//android
Vue.prototype.$copy = copy[Vue.prototype.$language]

Vue.prototype.$tolang = function(lang){
  if(lang==0){
    Vue.prototype.$language = "en"
    //android
    Vue.prototype.$copy = copy[Vue.prototype.$language]
  }else if(lang==1){
    Vue.prototype.$language = "korea"
    //android
    Vue.prototype.$copy = copy[Vue.prototype.$language]
   }else if(lang==2){
    Vue.prototype.$language = "russia"
    //android
    Vue.prototype.$copy = copy[Vue.prototype.$language]
  }
  this.$storage.set('lang',Vue.prototype.$language)
  console.log("lang::",lang,Vue.prototype.$copy)
}

// if(Vue.prototype.$language=="korea"){
//   Vue.prototype.platform = Vue.prototype.platform +"_kr"
// }else if(Vue.prototype.$language=="russia"){
//   Vue.prototype.platform = Vue.prototype.platform +"_ru"
// }

Vue.prototype.$copyAdd = function(str){
  for(let i=1;i<arguments.length;i++){
    str = str.replace("***",arguments[i])
  }
  return str
}

//const global = {pKey:"0xf8d0f4da7f6cdd589225bc8c9d5946610f4a3195e3c1f26233be702d47375c13",address:"0x5FD13d8D98a5b055293284dB3fCe26d5505CC171"}
Vue.prototype.$global = {}


Vue.prototype.$clearReferrer=function(){
  this.$storage.remove('referrer')
  this.$storage.remove('referrer_id')
}

Vue.prototype.$getReferrer=function(){
  return this.$storage.get('referrer')
}
Vue.prototype.$setReferrer=function(referrer){
  this.$storage.set('referrer',referrer)
}
Vue.prototype.$getReferrerId=function(){
  let rid=parseInt(this.$storage.get('referrer_id'))
  if(isNaN(rid)){
    return 0
  }
  return rid
}
Vue.prototype.$setReferrerId=function(referrerId){
  this.$storage.set('referrer_id',referrerId.toString())
}

Vue.prototype.isApp=function(){
  if(window._cordovaNative) {
    return true
  }else{
    return false
  }
}

// Vue.prototype.$getId=function(){
//   return this.$storage.get('id')
// }
// Vue.prototype.$getCode=function(){
//   return this.$storage.get('code')
// }
Vue.prototype.$getLink=function(code){
  return helper.host + "?" + code
}

Vue.prototype.$getAddress=function(){
  return this.$storage.get('address')
}
Vue.prototype.$getKey=function(){
  return this.$storage.get('token')
}
Vue.prototype.$setData=function(address,token){
  this.$storage.set('address',address)
  this.$storage.set('token',token)
  // this.$storage.set('id',id)
}

Vue.prototype.$setCode=function(code){
  this.$storage.set('code',code)
}
Vue.prototype.$setId=function(id){
  this.$storage.set('id',id)
}
Vue.prototype.$clear=function(){
  // console.log(this.$storage)
  this.$storage.remove('address')
  // this.$storage.remove('id')
  // this.$storage.remove('code')
  this.$storage.remove('token')
  // this.$storage.remove('referrer')
  // this.$storage.remove('referrer_id')
  this.$clearReferrer()
}

Vue.prototype.$msg=function(icon,txt){
  // console.log(this.$storage)
  this.$message({
    type: icon,
    message:txt,
    center:true,
    offset:-1,
    duration:3000
  });
}

//message
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
