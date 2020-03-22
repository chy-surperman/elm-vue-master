import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';
import user from '@/components/user/user';
import payGateWay from '@/components/payGateWay/payGateWay';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        path: '/goods',
        component: goods
      }
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/user',
      name:'user',
      component: user
    },
    {
      path: '/payGateWay',
      name:'payGateWay',
      component: payGateWay
    }
  ]
})
