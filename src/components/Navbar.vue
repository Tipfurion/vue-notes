<template>
    <div class="navbar grid_item" >
                    <div></div>
                    <div class="login-text" v-if="logged" ><div class="user-name">{{username}}</div></div>
                    <div class="login-text login-clickable" v-if="logged" @click="signOut"><div class="sign-out">sign out</div></div>
                    <div class="login-text login-clickable"  v-else @click="login"><div class="login">login</div></div>
            </div>
</template>

<script>
import {initFirebase} from '../../fireconf'
export default {
    name:'navbar',
    data:function(){
    return {
      logged: false,
      username:'',
    }
  },
    methods:{
      changeLogged(){
        this.logged=!this.logged;
        
      },
      login(){
        this.$root.$emit('login-press');
        this.$root.$emit('get-blur');
      },
      signOut:function(){
        initFirebase.auth().signOut().then(()=> {
            console.log('sign out')
            this.$root.$emit('set-nickname','');
            this.$root.$emit('set-user-id','start');
            this.$root.$emit('notify','Sign out');
          }).catch(function(error) {
            console.error(error);        
          });
        this.changeLogged()
      }
  }

}
</script>
<style scoped>
.login-text
{
    cursor: default;
    word-wrap: normal;
    width: 100%;
    height: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-clickable
{
    grid-area: 1/3/1/4
}
.login-clickable:hover
{
    background-color: lightgrey;
}
</style>