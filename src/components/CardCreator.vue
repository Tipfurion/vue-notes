<template>
<div class="card_constructor   grid_item" v-bind:style="{ gridRowEnd:styleObject.gridRowEnd}" >
    <textarea v-model="crdHeader" :tabindex="blur"  placeholder="Title" class="crd_header" @input="resizeDiv" ref="crdHeader" ></textarea>
    <textarea v-model="crdContent" :tabindex="blur"  placeholder="note text" class="crd_content" @input="resizeDiv" ref="crdContent"></textarea>
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
      blur:0,
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
      this.$root.$emit('add-card', this.crdHeader, this.crdContent, Date.now())
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
