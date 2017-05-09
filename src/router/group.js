/**
 * Created by ZHY on 2017/5/9.
 */
import Vue from 'vue'
import Router from 'vue-router'
import groupmanagement from 'components/groupmanagement'

Vue.use(Router)

var router = new Router({
  routes: [
    {path: '/groupmanagement', component: groupmanagement}
  ]
})

router.replace('/groupmanagement')
export default router
