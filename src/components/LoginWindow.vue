<template>
<transition name="fade" >
     <div class="login-window" v-if="active">
                  <transition name="fade" mode="out-in" >
                  <div key="3" id="login" v-if="!loginNeed" >
                    
                      <div class="login_window_text">Email</div>
                      <input v-model="email" placeholder="e-mail" class="login_window_login"  >
                      <div class="login_window_text">password</div>
                      <input v-model="password" type="password" placeholder="password" class="login_window_password">
                      <button @click="login" class="btn login-window-btn-login">login</button>
                      <div class="incorrect" v-show="incorrect" >incorrect password or username! </div>
                      <div class="login_window_register" @click="changeLoginNeed" >register</div>
                      <button @click="close" class="btn closeBtn login-window-btn-close">close</button>
                  </div>
                  
                  <div key="4" id="register" v-if="loginNeed">
                      <div class="login-window-register-header" >registration</div>
                      <div class="login_window_text">Email</div>
                      <input v-model="email" placeholder="e-mail" class="login_window_login">
                      <div class="login_window_text">password</div>
                      <input v-model="password" type="password" placeholder="password" class="login_window_password">
                      <button @click="register" class="btn login-window-btn-login">register</button>
                      <div class="incorrect" v-show="incorrect" >incorrect password or username! </div>
                      <div class="login_window_register after-reg-log"  @click="changeLoginNeed">login</div>
                      <button @click="close" class="btn closeBtn login-window-btn-close ">close</button>
                  </div>
                  </transition>

            </div>
</transition>
</template>

<script>
import {initFirebase} from '../../fireconf'


export default {
    name:'login-window',
    data:function(){
    return {
      email:null,
      password:null,
      loginNeed: false,
      active: false,
      incorrect: false,
      userId:null
    }
    },
  methods:{
    close:function()
    {
      this.active=false;
      this.$root.$emit('remove-blur')
    },
    emitId:function(){
      this.$root.$emit('set-user-id',initFirebase.auth().currentUser.uid)
    },

    login:function(){ 
       initFirebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>
       {
          this.emitId()
          this.$root.$emit('success-login'); 
          this.close();
          console.log(initFirebase.auth().currentUser);
          this.setNickname(this.email)
          this.email=null;
          this.password=null;
          
       })
       .catch(function(error) {
      
          let errorCode = error.code;
          let errorMessage = error.message;
            
          if (errorCode === 'auth/wrong-password') {
             alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    setNickname:function(){
      this.$root.$emit('set-nickname', this.email)
    },
    changeLoginNeed:function()
    {
      this.loginNeed=!this.loginNeed;
    },
    register:function(){
      initFirebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(()=>{
        this.setNickname(this.email)
        this.emitId()
        this.email=null;
        this.password=null;
        console.log(initFirebase.auth().currentUser);
        this.changeLoginNeed()
        this.close();
        this.$root.$emit('success-login'); 
      })
      .catch(function(error) {
        if(error){
          let errorCode = error.code;
          let errorMessage = error.message;
        
          if (errorCode == 'auth/weak-password')
          {
            alert('The password is too weak.');
          } 
          else 
          {
            alert(errorMessage);
          }
          console.log(error);
        }
      });

      
    },
  }
}
</script>