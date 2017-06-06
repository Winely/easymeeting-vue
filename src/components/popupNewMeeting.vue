<template>
  <popup ref="popup" :align="center" @finish="nextStep" @cancel="$emit('finish')">
    <div class="head" slot="popup-head">
      <color-picker v-model="meeting.color" class="color-picker"></color-picker>
      <input v-model="meeting.name" placeholder="输入会议主题……"/>
    </div>
    <div slot="popup-body" v-show="step1">
      <span>从</span>
      <datetime-picker v-model="meeting.start_time" slot="popup-body"></datetime-picker>
    </div>
    <div slot="popup-body" v-show="step1">
      <span>到</span>
      <datetime-picker v-model="meeting.end_time" slot="popup-body"></datetime-picker>
    </div>
    <div slot="popup-body" v-show="step2">
      <inputs v-model="meeting.introduction" label="会议简介" name="introduction"></inputs>
      <inputs v-model="meeting.outline" label="会议结构" name="outline"></inputs>
    </div>
  </popup>
</template>

<script type="text/ecmascript-6">
  import popup from 'components/popup'
  import datetimePicker from 'components/datetimePicker'
  import inputs from './inputGroup'
  import {ColorPicker} from 'element-ui'
  import urlconf from 'assets/url.conf'
  export default {
    props: ['team', 'token'],
    components: {
      popup,
      datetimePicker,
      ColorPicker,
      inputs
    },
    data () {
      return {
        meeting: {
          token: this.token,
          start_time: '',
          end_time: '',
          name: '',
          color: '#66ccff',
          outline: '',
          introduction: ''
        },
        step1: true,
        step2: false,
        center: 'center',
        uploadData: {}
      }
    },
    methods: {
      updateTime (value) {
        this.time = value
      },
      addZero (val) {
        return val<10?'0'+val:val
      },
      formatDateTime (date){
        var a = {
          year: date.getFullYear(),
          month: this.addZero(date.getMonth()+1),
          date: this.addZero(date.getDate()),
          hour: this.addZero(date.getHours()),
          minute: this.addZero(date.getMinutes()),
          second: this.addZero(date.getSeconds())
        }
        return `${a.year}-${a.month}-${a.date} ${a.hour}:${a.minute}:${a.second}`
      },
      nextStep () {
        if (this.step1 === true) {
          this.step1 = false
          this.step2 = true
          this.center = null
        }
        else {
          this.meeting.start_time = this.formatDateTime(this.meeting.start_time)
          this.meeting.end_time = this.formatDateTime(this.meeting.end_time)
          this.$http.post(urlconf.newMeeting(this.team), this.meeting).then(resp => {
            console.log('ok')
          })
//        console.log(this.meeting)
          this.$refs.popup.closePopup()
          this.$emit('finish')
        }
      }
    },
    created () {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "https://unpkg.com/element-ui/lib/theme-default/index.css"
</style>
