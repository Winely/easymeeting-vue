/**
 * Created by ZHY on 2017/5/9.
 */
import Vue from 'vue'
import Router from 'vue-router'
import groupManagement from 'components/groupManagement'

Vue.use(Router)

var router = new Router({
  routes: [
    {path: '/groupManagement/:id', component: groupManagement}
  ]
})

export default router
