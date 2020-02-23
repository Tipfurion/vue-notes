<template>
<transition name="fade" >
     <div class="login-window" v-if="active">
                  <transition name="fade" mode="out-in" >
                  <div key="3" id="login" v-if="!loginNeed" >
                    
                      <div class="login_window_text">Email</div>
                      <input v-model="email" placeholder="e-mail" class="login_window_login"  >
                      <div class="login_window_text">password</div>
                      <input v-model="password" type="password" placeholder="password" class="login_window_password">
                      <input type="submit" @click="login" class="btn login-window-btn-login" value="login">
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
import * as firebase from 'firebase';

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
      console.log(firebase.auth.Auth);
      
      this.active=false;
      this.$root.$emit('remove-blur')
    },
    emitId:function(){
      this.$root.$emit('set-user-id',initFirebase.auth().currentUser.uid)
    },

    login:function(){ 
      initFirebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>
      {
       return initFirebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>
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
      })
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
  },
  created(){
    initFirebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.emitId()
      this.$root.$emit('set-nickname', user.email)
      this.$root.$emit('success-login'); 
    }
})
  }
}
</script>

<style scoped>
.login-window
{
    top: 10%;
    left: 0; 
    right: 0;
    margin: auto;
    width: 500px;
    height: 600px;
    padding: 40px;
    opacity: 1;
    position: absolute;
    z-index: 1000;
    border: 2px solid lightgrey;
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
}
.login_window_register
{
    margin-top: 80px;
    font-size: 22px;
    border-radius: 50px;
    padding: 10px;
    width: 80px;
    margin-left: 380px;
    text-align:center;
    cursor: default;
    user-select: none;
}
.login_window_register:hover
{
    background-color: gray;
}
.login_window_login
{
    width: 100%;
    padding: 0;
    border-bottom: 2px solid lightgrey;
    font-size: 20px;

}
.login_window_password
{
    width: 100%;
    padding: 0;
    border-bottom: 2px solid lightgrey;
    font-size: 20px;

}
.login_window_text
{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    font-size: 30px;
    cursor: default;
    user-select: none;
    color: darkgrey;
    
}
.login-window-btn-close
{
    margin-top: 80px;
    margin-left: 410px;
}
.login-window-btn-login
{
    position: relative;
    font-size: 18px;
    border-radius: 20px;
    width: 150px;
    height: 40px;
    margin-left: 170px;
    margin-top: 50px;
}
.login-window-btn-login:focus
{
  background-color: gray
}
.login-window-register-header
{
   

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    height: 42px;
    font-weight: bold;

}
.incorrect
{
    font-size: 20px;
    color: #ea4343;
    font-weight: bold;
    margin-top: 30px;
    position: absolute;
}
.after-reg-log
{
    margin-top: 38px;
}
</style>