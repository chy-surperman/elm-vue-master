<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">云店之家</router-link>
      </div>
      <!--<div class="tab-item">-->
        <!--<router-link :to="{path:'/ratings'}">评论</router-link>-->
      <!--</div>-->
      <!--<div class="tab-item">-->
        <!--<router-link :to="{path:'/seller'}">商家</router-link>-->
      <!--</div>-->
    </div>
    <keep-alive>
      <router-view  :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header';
import {urlParse} from './common/js/util.js';
const code_OK =200;
export default {
  data() {
    return {
      seller: {
        id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
        })(),
      }
    };
  },
  provide(){
    return{

    }
  },

  created() {
    var _this = this;
    //this.$axios.get('https://www.easy-mock.com/mock/5b9e72822b292b0e9154c66a/elm/seller')
    //  this.$axios.get('/api/seller?id=')
    //  this.$axios.get('/api/seller?id=' + _this.seller.id)
     this.$axios.get('http://192.168.8.243:8080/smdc/seller/info/list')
    .then(function(response){
      if( response.data.code == code_OK){
        _this.seller = Object.assign({}, _this.seller, response.data.data);
      }
    })
      .catch(function(error){
      console.log(error)
    })
    .then(function(){

    })
  },
  components:{
    'v-header':header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77,85,93)
  .router-link-active
    color: rgb(240,20,20)
    
</style>
