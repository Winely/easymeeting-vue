import Vue from 'vue'
import Router from 'vue-router'
import Group from 'components/groupview'
import Calendar from 'components/calendarview'
import Setting from 'components/settingview'

Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/group', component: Group },
    { path: '/calendar', component: Calendar },
    { path: '/setting', component: Setting }
  ]
})

router.replace('/group')
export default router
