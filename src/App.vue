<template>
        <div id="app">
        <editor ref="editor"></editor>
        <notify ref="notify"></notify>
        <login-window ref="login"></login-window>
            <div class="blur_block" ref="blur">
                <navbar ref="navbar"></navbar>
                <div class="main-wrapper">
                        <creator></creator>
                        <div class="content grid_item" ref="content">    
                                <card v-for="(card, i) in cards" :key="card.createdAt" :index=i></card>
                        </div> 
                </div> 
            </div>  
        </div>

</template>

<script>

import card from './components/Card.vue'
import creator from './components/CardCreator.vue'
import editor from './components/CardEditor.vue'
import navbar from './components/Navbar.vue'
import loginWindow from './components/LoginWindow.vue'
import notify from './components/Notify.vue'
//import 'firebase/firestore'
import  {db}  from '../fireconf'
//import { firestore } from 'firebase'




export default{
    name: 'app',
    components: {
        card,
        creator,
        editor,
        navbar,
        loginWindow,
        notify
    },
    data:function() { 
        return{
        cards: [],
        crdHeader:'',
        crdContent:'',
        editorOutsideClick:false,
        editorActive:false,
        userId:'start',
        }
    },
    firestore:{
      // cards: db.collection('notes').where('creator','==',userId).orderBy('createdAt')
    },
    watch:{
        userId:function(){
            this.$bind('cards', db.collection("notes").where("creator", "==", this.userId).orderBy('createdAt'))
        }
    },
    methods:{
      showEditor:function(index, el){
        
        this.$refs.editor.active = true;
        this.$refs.editor.crdHeader = this.cards[index].header;
        this.$refs.editor.crdContent = this.cards[index].content;
        this.$refs.editor.cardEl = el;
        //color      
        this.$refs.editor.styleObject.backgroundColor = el.styleObject.backgroundColor;
        
        this.$refs.editor.resizeDiv()
        this.getBlur()
      },
      changeCardContent:function(header, content, index){
        if( this.$refs.editor.cardEl.header != header ||this.$refs.editor.cardEl.content != content)
        {
            this.$refs.editor.cardEl.$refs.headerRef.innerText = header;
            this.$refs.editor.cardEl.$refs.contentRef.innerText = content;
            this.$refs.editor.crdHeader = header;
            this.$refs.editor.crdContent = content;      
            let changeId = this.cards[index].id;
            db.collection('notes').doc(changeId).update(
                {header:header,
                content:content})
        }
        this.$refs.editor.cardEl.styleObject.visibility = 'visible';
        this.removeBlur()
        


      },
      changeCardColor:function(color, index, cardEl){
        this.$refs.editor.cardEl.styleObject.backgroundColor = color;
        if(color != "#fff")
        {
            cardEl.styleObject.border = 'none'
        }
        else
        {
            cardEl.styleObject.border = null
        }
        let changeId = this.cards[index].id;
        db.collection('notes').doc(changeId).update(
            {color:color})
      },
      deleteCard:function(index){

        if(this.userId!='start')
        {
            let delId = this.cards[index].id
            db.collection('notes').doc(delId).delete();
        }
        else
        { 
            this.$root.$emit('notify','in order to delete notes log in to your account!');
        }
        
      },
      getBlur:function(){
        //not vue
        this.$refs.blur.classList.add('blur_block_active')
      },
      removeBlur:function(){
        //not vue
        this.$refs.blur.classList.remove('blur_block_active')
      },
      changeCardsArr:function(index, header, content){
        this.cards[index].header = header;
        this.cards[index].content = content;
      },
      showLoginWindow:function(){
        this.$refs.login.active=true;
      },
      changeNavbar:function(){
        this.$refs.navbar.logged=!this.$refs.navbar.logged;
      },
      addCard:function(header,content,time)
      {
        if(this.userId!='start')
        {
            db.collection('notes').add({
            header: header,
            content: content,
            createdAt:time,
            color:"#fff",
            creator:this.userId
            })   
        }
        else
        {
            this.$root.$emit('notify','in order to create notes log in to your account!');
        }
      },
      setNickname:function(nickname) {
            this.$refs.navbar.username = nickname;         
      },
      setUserId:function(id) {
            this.userId=id;      
      },
      notifyShow:function(message) {
            this.$refs.notify.message=message;
            this.$refs.notify.active=true;
            
      }               
    },
    created() {
        this.$bind('cards', db.collection("notes").where("creator", "==", this.userId).orderBy('createdAt'))
        

        this.$root.$on('show-editor', this.showEditor)
        this.$root.$on('change-card-content', this.changeCardContent)
        this.$root.$on('change-card-color', this.changeCardColor)
        this.$root.$on('delete-card', this.deleteCard)
        this.$root.$on('remove-blur', this.removeBlur)
        this.$root.$on('get-blur', this.getBlur)
        this.$root.$on('change-cards-arr', this.changeCardsArr)
        this.$root.$on('login-press', this.showLoginWindow)
        this.$root.$on('success-login', this.changeNavbar)
        this.$root.$on('add-card', this.addCard)
        this.$root.$on('set-nickname', this.setNickname)
        this.$root.$on('set-user-id', this.setUserId)
        this.$root.$on('notify', this.notifyShow)
    },
    mounted(){
    //   let a = 
    //   {
    //     content:"welcome on my github page \ngithub.com/Tipfurion",
    //     header:"Hello!",
    //     time:Date.now(),
    //   };
    //   this.cards.push(a)

    
      

 
      
    }
}
</script>

















<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
body{
    font-family: 'Roboto', sans-serif;
}

:root 
{
    --btnColor1:lightgrey;
    --btnColor2:gray;
}
.grid
{
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    top: 0px;
    left: 0px;
    grid-template-columns:  1fr ;
    grid-template-rows: 1fr 1fr 12fr;
    
    }
.grid_item{
    display: flex;
    justify-content:center;
    align-items: auto;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: black;

    
}
.navbar
{
    font-size: 22px;
    height: 50px;
    width: 100%;
    background-color: white;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 5fr 200px 130px;
    border-bottom: 2px solid lightgrey;
  
    
}
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

.login-clickable:hover
{
    background-color: lightgrey;
}
.user-name
{
    overflow: hidden;
    font-weight: bold;
    text-overflow: ellipsis;
}
.login
{
    padding-right: 12px;
    font-weight: bold;
}
.sign-out
{
    margin: auto;
    text-align: right;
    padding: 10px;
    padding-right:  20px;
}
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
.left_panel
{
    grid-area:  2/2/4/1;
}
.card_constructor
{ 
    font-family: 'Roboto', sans-serif;
    border: 2px solid lightgrey;
    border-radius: 10px;
    padding: 5px;
    margin: auto;
    width: 40%;
    position: relative;
    display: grid;
    grid-template-columns:100px 1fr 1fr;
    grid-template-rows: repeat(minmax(50px,1fr),3);
    background-color: white;

    
}
.content
{
    
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px,1fr));
    grid-auto-rows: 30px;
    grid-gap: 0px;
    word-wrap: break-word;
    color:black;
    overflow-y: auto;
    font-size: 21px;   
}
.main-wrapper
{
    grid-area:  2/1/2/1; 
    overflow-y: auto;
    height: 90%;
    padding: 20px;
    
    
}

.content_block
{

    border: 2px solid lightgrey;
    border-radius: 10px;
    margin: 10px;
}
.content_block:hover
{
    box-shadow: 0 0 10px rgba(0,0,0,2);
    border: none;
}
.content_nested_text
{
    padding: 10px;
}

.left_panel{            
    background-color:darkgrey;
}
.crd_header
{
    grid-area: 1/1/1/4;
    border: none; 
    resize: none;
    max-height: 100px;
    font-weight: bold;
    font-size: 1.5rem;
}
.crd_content
{
    grid-area: 2/1/2/4;
    height: 50px; 
    max-height: 500px;
    font-size: 1rem;
}
.color-picker
{
    position: absolute;
    background-color: white;
    padding: 10px;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 180px;
    margin-bottom: 65px;
    margin-right: -8px;
    z-index: 10000;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
    border: 2px solid lightgrey;
    border-radius: 10px;
}
.color-circle
{
    margin: auto;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 2px solid lightgrey;
}
.color-circle:hover
{
    border: 2px solid black;
}
.btn
{
    background-color: var(--btnColor1);

    display: flex;
    border: none;
    cursor: pointer;
    outline:none;

    display: inline-block;
    text-align: center;
    align-items: flex-start;
    color: black;

    font-family: 'Roboto', sans-serif;
    user-select: none;   

}
.btn:hover
{
    background-color:var(--btnColor2);
}
.addBtn
{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    top: 20px;
    font-size:40px;
    font-family: 'Roboto', sans-serif;
}
.closeBtn
{
    position: relative;
    right:30px;
    font-size: 18px;
    border-radius: 100px;
    width: 120px;
    height: 60px;
}
.settingsBtn
{
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.deleteBtn
{
    position: relative; 
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.btnContainer
{
    position: relative;
    top:70px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 10fr 1fr 1fr;
    gap: 20px;
    
}

.blur_block
{
    opacity: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;


}
.blur_block_active
{
    opacity: 0.2;
    pointer-events: none;
    user-select: none;

}

.card_editor
{
    top: 10%;
    left: 0; 
    right: 0;
    margin: auto;
    width: 50%;
    padding: 40px;
    opacity: 1;
    position: absolute;
    z-index: 10;
    border: 2px solid lightgrey;
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    
}
.crd_header_edit
{
    width: 100%;
    min-height: 50px;
    max-height: 100px;
    font-size: 2rem;
    font-weight: bold;
    
}
.crd_content_edit
{

    min-height: 200px;
    max-height: 600px;
    border: none;
    resize: none;
    font-size: 1.5rem;
}
.non-white-card
{
    border:none
}
textarea
{
    border: none;
    resize: none;
    outline:none;
    font-family: 'Roboto', sans-serif;
    background-color:transparent;
    font-size: 1.3rem;
}
hr {
    clear:both;
    display:block;
    width: 100%;               
    background-color:gray;
    height: 0px;
    border-style: solid;
    border-color: lightgrey;
  }
pre {
    white-space: pre-wrap;      
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;     
    white-space: -o-pre-wrap;  
    word-wrap: break-word;      
    font-family: 'Roboto', sans-serif;
}
input
{
    border: none;
    resize: none;
    outline:none;
    font-family: 'Roboto', sans-serif;
    background-color:transparent;
}
.fade-enter-active, .fade-leave-active
{
  transition: .3s;
}
.fade-enter, .fade-leave-to 
{
  opacity: 0;
}
.slide-enter-active, .slide-leave-active
{
transition:  .1s;
}
.slide-enter {
  transform: translate(-100%, 0);
  sopacity: 0;
}
.slide-leave-to {
  transform: translate(100%, 0);
  sopacity: 0;

}
</style>
