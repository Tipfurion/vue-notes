<template>
    <div class="navbar grid_item" >
                    <div></div>
                    <div class="login-text" v-if="logged" ><div class="user-name">username</div></div>
                    <div class="login-text login-clickable" v-if="logged" @click=" changeLogged"><div class="sign-out">sign out</div></div>
                    <div class="login-text login-clickable" v-else @click="login"><div class="login">login</div></div>
            </div>
</template>

<script>
export default {
    name:'navbar',
    data:function(){
    return {
      logged: false,

    }
  },
    methods:{
        changeLogged(){
        this.logged=!this.logged
        },
        login(){
        this.$root.$emit('login');
        this.$root.$emit('get-blur');
        }
  }

}
</script>