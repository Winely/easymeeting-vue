<template>
  <div class="inputs" :class="val.length>0?'unempty':''">
    <label :for="id" :required="required">{{this.label}}</label>
    <input :name="name"
           :placeholder="placeholder"
           v-model="val" :required="required"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['placeholder', 'name', 'id', 'label', 'value', 'required'],
    data () {
      return {
        val: this.value
      }
    },
    watch: {
      val: function (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .inputs
    margin 20px 0
  label
    font-size 18px
    color #aaa
    display: block
    position absolute
    z-index -1
    transition .3s

  .unempty
    label
      margin-top -1.1em
      font-size 14px
    input
      border-bottom solid 2px #8ab537

  label[required='required']:after
    content: ' *'
    color: #f00

  input
    border none
    border-bottom solid 2px transparent
    outline none
    background transparent
    color #333
    width 100%
    font-size 18px
    word-wrap break-word
    word-break break-all
    &:focus, &:active
      border-bottom solid 2px #8ab537
</style>
