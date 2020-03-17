<template>
  <div class="split">
    <router-view v-if='isRouterAlive' />
    hello
    {{place}}
    --
    {{price}}

  </div>
</template>

<script>

export default {
    props:{
      reload:this.reload
    },
    name: "user",
    data(){
        return{
        price:this.$route.params.price,
        place:this.$route.params.place,
        isRouterAlive:true,
      },
    methods:{
        reload(){
          this.isRouterAlive = false ;
          this.$nextTick(function(){
            this.isRouterAlive = true ;
          })
        }
      }
    },


}


</script>

<style scoped>

</style>
