<template>
    <transition name="slide" >
    
      <div class="notify" v-if="active" @click="changeActive">
        <p>{{message}}</p>
      </div>
      </transition>
</template>
<script>

export default {
    name:'notify',
    data:function(){
    return {
      message:'',
      active:false,
      }
    },
    methods:{
      changeActive:function()
      {
        this.active=false;
      },
  
    },
    watch:{
      active:function()
      {
      setTimeout(()=>{
        this.changeActive()
      }, 3000)
      }
    }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
.notify{
  font-family: 'Roboto', sans-serif;
  position: absolute;
  width: 400px;
  height: 100px;
  background-color: transparent;
  border: 2px solid lightgrey;
  border-radius: 10px;
  z-index: 10000000;
  right: 40px;
  bottom: 40px;
}
p{
  padding: 15px;
  font-size: 18px;
}
.slide-enter-active, .slide-leave-active
{
transition:  .4s
}
.slide-enter {
  transform: translate(100%, 0);
  opacity: 0;
}
.slide-leave-to {
  transform: translate(100%, 0);
  opacity: 0;

}
</style>