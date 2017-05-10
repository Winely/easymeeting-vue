<template>
  <popup @cancel="$emit('cancel')" @finish="finish" ref="popup">
    <input slot="popup-head" v-model="name" placeholder="输入项目组名称……"/>
    <inputs slot="popup-body" label="项目简介" name="description" required="required"
            v-model="description" id="popup-description"></inputs>

    <inputs slot="popup-body" label="项目成员" name="member"
            v-model="member" id="popup-invite"></inputs>
  </popup>
</template>

<script type="text/ecmascript-6">
  import popup from './popup'
  import inputs from './inputGroup'
  export default {
    data () {
      return {
        name: '',
        description: '',
        member: ''
      }
    },
    methods: {
      finish () {
        this.$refs.popup.closePopup()
        setTimeout(()=>{this.$emit('finishGroup')}, 300)
      }
    },
    components: {
      popup,
      inputs
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
