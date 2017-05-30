<template>
  <popup @cancel="$emit('cancel')" @finish="finish" ref="popup">
    <input slot="popup-head" v-model="name" placeholder="输入项目组名称……"/>
    <inputs slot="popup-body" label="项目简介" name="description" required="required"
            v-model="description" id="popup-description"></inputs>

    <inputs slot="popup-body" label="项目成员" name="member"
            v-model="member" id="popup-invite" @input="searchUser"></inputs>
    <ul slot="popup-body">
      <li v-for="member in members">
        {{ member.name }} {{ member.email }}
        <i class="iconfont">x</i>
      </li>
    </ul>
    <p v-if="this.nameError" style="color:red">请输入小组名称</p>
  </popup>
</template>

<script type="text/ecmascript-6">
  import popup from './popup'
  import inputs from './inputGroup'
  import urlconf from 'assets/url.conf'
  import memberInvite from './memberInvite'
  export default {
    data () {
      return {
        name: '',
        description: '',
        member: '',
        nameError: false,
        members: []
      }
    },
    props: ['token'],
    methods: {
      searchUser (val) {
        this.$http.get(urlconf.exist(val)).then(resp=>{
            this.members.push({name: resp.body.user_id, email: val})
        }, resp=>{

        })
      },
      finish () {
        if (this.name.length === 0) {
          this.nameError = true
          return
        }
        this.$http.post(urlconf.newGroup(),
          {name: this.name, description: this.description, token: this.token}
        ).then(resp => {
          // do something
        })
        this.$refs.popup.closePopup()
        setTimeout(() => {
          this.$emit('finishGroup')
        }, 300)
      }
    },
    components: {
      popup,
      inputs,
      memberInvite
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
