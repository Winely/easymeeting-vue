<template>
  <div class="member-invite">
    <inputs slot="popup-body" label="项目成员" name="member"
            v-model="member" id="popup-invite"></inputs>
  </div>
</template>

<script type="text/ecmascript-6">
  import inputs from './inputGroup'
  export default {
    data () {
      return {
        member: null
      }
    },
    components: {
      inputs
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
