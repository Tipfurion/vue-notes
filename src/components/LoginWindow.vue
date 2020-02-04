<template>
     <div class="login-window" v-if="active">
                  <div id="login" v-if="loginNeed">
                      <div class="login_window_text">user name</div>
                      <input  placeholder="user name" class="login_window_login"  >
                      <div class="login_window_text">password</div>
                      <input type="password" placeholder="password" class="login_window_password">
                      <button @click="login" class="btn login-window-btn-login">login</button>
                      <div class="incorrect" v-show="incorrect" >incorrect password or username! </div>
                      <div class="login_window_register" @click="chanheLoginNeed" >register</div>
                      <button @click="close" class="btn closeBtn login-window-btn-close">close</button>
                  </div>
                  
                  <div id="register" v-else>
                      <div class="login-window-register-header" >registration</div>
                      <div class="login_window_text">user name</div>
                      <input  placeholder="user name" class="login_window_login">
                      <div class="login_window_text">password</div>
                      <input type="password" placeholder="password" class="login_window_password">
                      <button @click="login" class="btn login-window-btn-login">register</button>
                      <div class="incorrect" v-show="incorrect" >incorrect password or username! </div>
                      <div class="login_window_register after-reg-log"  @click="chanheLoginNeed">login</div>
                      <button @click="close" class="btn closeBtn login-window-btn-close ">close</button>
                  </div>
            </div>
</template>

<script>
export default {
    name:'login-window',
    data:function(){
    return {
      loginNeed: false,
      active: false,
      incorrect: false
    }
    },
  methods:{
    close:function()
    {
      this.active=false;
      this.$root.$emit('remove-blur')
      //this.$root.$emit('success-login'); 
    },
    changeActive:function(){

    },
    login:function(){
      this.$root.$emit('success-login'); 
      this.close();
    },
    chanheLoginNeed:function()
    {
      this.loginNeed=!this.loginNeed;
    }
  }
}
</script>