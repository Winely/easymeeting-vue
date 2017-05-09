<template>
  <date-picker type="datetime" :option="pickerOptions" v-model="time"></date-picker>
</template>

<script type="text/ecmascript-6">
  import {DatePicker} from 'element-ui'
  export default {
    components: {
      DatePicker
    },
    data () {
      return {
        time: '',
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
  @import "https://unpkg.com/element-ui/lib/theme-default/index.css"

</style>
