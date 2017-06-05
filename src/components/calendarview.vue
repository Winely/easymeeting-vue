<template>
  <div class="calendar-wrap">
    <header>
      <svg class="router-icon-s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.89 28.89">
        <title>icon</title>
        <g>
          <rect class="icon-s" x="10.29" y="1.73" width="8.35" height="8.35"
                transform="translate(8.41 -8.5) rotate(45)"></rect>
          <rect class="icon-s" x="18.81" y="10.25" width="8.35" height="8.35"
                transform="translate(16.93 -12.03) rotate(45)"></rect>
          <rect class="icon-s" x="10.25" y="18.81" width="8.35" height="8.35"
                transform="translate(20.48 -3.47) rotate(45)"></rect>
          <rect class="icon-s" x="1.73" y="10.29" width="8.35" height="8.35"
                transform="translate(11.96 0.06) rotate(45)"></rect>
        </g>
      </svg>
      <h2>个人设置</h2>
    </header>
    <full-calendar :events="fcEvents" lang="zh"></full-calendar>
  </div>
</template>

<script type="text/ecmascript-6">
  import urlconf from 'assets/url.conf'
  import fullCalendar from 'vue-fullcalendar'
  import thumbnail from './thumbnail'
  require('../assets/global.css')
  export default {
    props: ['token'],
    data () {
      return {
        fcEvents: [],
        meetings: []
      }
    },
    created() {
      if (this.token) {
        this.$http.get(urlconf.getUserMeetings(this.token)).then(resp => {
          this.meetings = resp.body
          for (var i = 0; i < this.meetings.length; i++) {
            this.fcEvents.push({
              title: this.meetings[i].name,
              start: this.meetings[i].start_time.replace('T', ' ').replace('.000Z', ''),
              end: this.meetings[i].end_time.replace('T', ' ').replace('.000Z', '')
            })
          }
        })
      }

    },
    components: {
      'full-calendar': fullCalendar,
      thumbnail
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  theme-color = #8ab537
  bg-color = rgba(255, 255, 255, 0.8)

  family
    background-color red
    color blue

  header
    display flex
    align-items center
    padding-left 30px
    svg
      margin-right 20px
    button
      color #fff
      background #FFCA4C
      border-radius 9px
      border none
      font-size 16px
      width 125px
      height 34px
      line-height 34px
      margin-left 50px
      cursor pointer
      transition-duration .3s
      &:hover
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.16)

  .router-icon-s
    width 30px
    height 30px

  .icon-s
    fill #a7c158
</style>
