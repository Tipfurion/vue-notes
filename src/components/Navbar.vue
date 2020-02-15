<template>
    <div class="navbar grid_item" >
                    <div></div>
                    <div class="login-text" v-if="logged" ><div class="user-name">{{username}}</div></div>
                    <div class="login-text login-clickable" v-if="logged" @click="signOut"><div class="sign-out">sign out</div></div>
                    <div class="login-text login-clickable" v-else @click="login"><div class="login">login</div></div>
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
        this.logged=!this.logged
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