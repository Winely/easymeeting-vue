<template>
  <popup ref="popup" align="center" @finish="nextStep" @cancel="$emit('finish')">
    <input slot="popup-head" v-model="meeting.title" placeholder="输入会议主题……"/>
    <div slot="popup-body">
      <span>从</span>
      <datetime-picker ref="from" slot="popup-body"></datetime-picker>
    </div>
    <div slot="popup-body">
      <span>到</span>
      <datetime-picker ref="to" slot="popup-body"></datetime-picker>
    </div>
  </popup>
</template>

<script type="text/ecmascript-6">
  import popup from 'components/popup'
  import datetimePicker from 'components/datetimePicker'
  export default {
    components: {
      popup,
      datetimePicker
    },
    data () {
      return {
        meeting: {
          fromTime: '',
          toTime: '',
          title: '',
          color: ''
        }
      }
    },
    methods: {
      updateTime (value) {
        this.time = value
      },
      nextStep () {
        this.meeting.fromTime = this.$refs.from.time
        this.meeting.toTime = this.$refs.to.time
        this.$refs.popup.closePopup()
        this.$emit('finish')
      }
    },
    created () {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
