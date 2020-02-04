<template>
<div class="card_constructor   grid_item" v-bind:style="{ gridRowEnd:styleObject.gridRowEnd}" >
    <textarea v-model="crdHeader" placeholder="Title" class="crd_header" @input="resizeDiv" ref="crdHeader" ></textarea>
    <textarea v-model="crdContent" placeholder="note text" class="crd_content" @input="resizeDiv" ref="crdContent"></textarea>
    <button @click="addCard()" class="btn addBtn">+</button>
</div>

</template>

<script>
export default{
    name:'creator',
    data: function () {
    return {
      crdHeader:'',
      crdContent:'',
      crdHeaderEl:null,
      crdContentEl:null,
      doit:0,
      styleObject: {

      },
    }
  },
  methods:{
  resizeDiv: function(event){
    if(event)
    {
      event.target.style.height = 'auto'
      event.target.style.height = event.target.scrollHeight + 'px';
    }
    else
    {
      this.$refs.crdHeader.style = 'auto';
      this.$refs.crdContent.style = 'auto';
    }
    },
    addCard:function(){
      this.$parent.crdHeader = this.crdHeader;
      this.$parent.crdContent = this.crdContent;
      this.$parent.cards.push({
      header:this.crdHeader,
      content:this.crdContent,
      time:Date.now(),
      });
      this.crdContentEl.value = '';
      this.crdHeaderEl.value = '';  
      this.crdHeader='';
      this.crdContent='';
      this.resizeDiv()
    },  
},
mounted() {
  this.crdContentEl = this.$refs.crdContent;
  this.crdHeaderEl = this.$refs.crdHeader;
},


}

</script>
