<template>
  <popup @cancel="$emit('cancel')" @finish="finish" ref="popup">
    <input slot="popup-head" v-model="name" placeholder="输入项目组名称……"/>
    <inputs slot="popup-body" label="项目简介" name="description" required="required"
            v-model="description" id="popup-description"></inputs>

    <inputs slot="popup-body" label="项目成员" name="member" class="invite"
            v-model="member" id="popup-invite" @input="searchUser"></inputs>
    <ul slot="popup-body">
      <li v-for="member, index in members">
        <span class="invite-username">{{ member.name }}</span>
        <span class="invite-email">{{ member.email }}</span>
        <i class="iconfont" @click="members.splice(index, 1)">×</i>
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
            this.members.push({name: resp.body.username, email: val, id: resp.body.user_id})
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
          let member_list = []
          for(let i in this.members){
              member_list.push(this.members[i].id)
          }
          return {id: resp.body.team_id, members: member_list}
        }, resp=>{})
          .then(resp=>{
              console.log('hi')
            return this.$http.post(urlconf.inviteMember(resp.id), {token: this.token, memberId: resp.members})
          })
          .then(resp=>{

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
.invite
  margin-bottom 5px!important
ul
  margin 0
li
  vertical-align middle
  line-height 24px
  padding 4px 28px
  margin 0
  cursor pointer
  &:hover
    background #eee
  i
    float right
    margin-right 10px
    font-size larger
    border-radius 99em
    padding 0 8px
    color #8AB537
    transition .3s
    &:hover
      background #fff
.invite-username
  font-weight 600
.invite-email
  font-size 14px
  color #999
</style>
