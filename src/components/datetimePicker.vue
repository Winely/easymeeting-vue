<template>
  <date-picker type="datetime" :option="pickerOptions" v-model="time" format="yyyy-MM-dd HH:mm:ss"></date-picker>
</template>

<script type="text/ecmascript-6">
  import {DatePicker} from 'element-ui'
  export default {
    props: ['value'],
    components: {
      DatePicker
    },
    watch: {
      time (v) {
          this.$emit('input', v)
      }
    },
    data () {
      return {
        time: this.value,
        pickerOptions: {
          shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
