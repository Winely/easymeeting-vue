/**
 * Created by ZHY on 2017/5/9.
 */
import Vue from 'vue'
import Router from 'vue-router'
import etherpad from 'components/etherpad'

Vue.use(Router)

var router = new Router({
  routes: [
    {path: '/:groupid', component: etherpad}
  ]
})

export default router
