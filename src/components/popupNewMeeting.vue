<template>
  <popup ref="popup" align="center" @finish="nextStep" @cancel="$emit('finish')">
    <div class="head"  slot="popup-head">
      <color-picker v-model="meeting.color" class="color-picker"></color-picker>
      <input v-model="meeting.title" placeholder="输入会议主题……"/></div>
    <div slot="popup-body">
      <span>从</span>
      <datetime-picker v-model="meeting.fromTime" slot="popup-body"></datetime-picker>
    </div>
    <div slot="popup-body">
      <span>到</span>
      <datetime-picker v-model="meeting.toTime" slot="popup-body"></datetime-picker>
    </div>
  </popup>
</template>

<script type="text/ecmascript-6">
  import popup from 'components/popup'
  import datetimePicker from 'components/datetimePicker'
  import {ColorPicker} from 'element-ui'
  export default {
    components: {
      popup,
      datetimePicker,
      ColorPicker
    },
    data () {
      return {
        meeting: {
          fromTime: '',
          toTime: '',
          title: '',
          color: '#66ccff'
        }
      }
    },
    methods: {
      updateTime (value) {
        this.time = value
      },
      nextStep () {
        console.log(this.meeting)
        this.$refs.popup.closePopup()
        this.$emit('finish')
      }
    },
    created () {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "https://unpkg.com/element-ui/lib/theme-default/index.css"
</style>
