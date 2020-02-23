<template>
    <transition name="slide">
    <div class="card_editor " ref="editor"  v-bind:style="styleObject" v-click-outside="close" v-if="active">
              <textarea v-model="crdHeader" placeholder="Title" class="crd_header_edit" ref="crdHeader" ></textarea>
              <textarea v-model="crdContent"  placeholder="note text" class="crd_content_edit" @input="resizeDiv" ref="crdContent"></textarea>
              
              <div class="btnContainer">
                <div class="color-picker" v-if="colorActive">
                  <div class="color-circle" @click="changeColor('#fff')" style="background-color:#fff"> </div>
                  <div class="color-circle" @click="changeColor('#aecbfa')" style="background-color:#aecbfa"> </div>
                  <div class="color-circle" @click="changeColor('#f28b82')" style="background-color:#f28b82"> </div>
                  <div class="color-circle" @click="changeColor('#fff475')" style="background-color:#fff475"> </div>
                  <div class="color-circle" @click="changeColor('#ccff90')" style="background-color:#ccff90"> </div>
                  <div class="color-circle" @click="changeColor('#cbf0f8')" style="background-color:#cbf0f8"> </div>
                  <div class="color-circle" @click="changeColor('#d7aefb')" style="background-color:#d7aefb"> </div>
                  <div class="color-circle" @click="changeColor('#fdcfe8')" style="background-color:#fdcfe8"> </div>
                  <div class="color-circle" @click="changeColor('#e8eaed')" style="background-color:#e8eaed"> </div>
                </div>
                <button @click="close" class="btn closeBtn">close</button>
                <button @click="ColorCard()" class="btn settingsBtn"><img src="../icons/color.png"></button>
                <button @click="deleteCard()" class="btn deleteBtn"><img src="../icons/delete.png"></button>
              </div>
    </div>
    </transition>
        
</template>
<script>
export default {
    name:'editor',
    data: function () {
    return {
        crdHeader:null,
        crdContent:null,
        crdHeaderEl:null,
        crdContentEl:null,
        cardEl:null,
        active:false,
        colorActive:false,
        styleObject: {
            backgroundColor:'white',
            border:null
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
            this.$nextTick(function() 
            {
                this.$refs.crdHeader.style.height =this.$refs.crdHeader.scrollHeight + 'px';
                this.$refs.crdContent.style.height =this.$refs.crdContent.scrollHeight + 'px';
            })
            
            }
            },
        changeActive:function()
        {
        
            this.active=!this.active;
            this.$root.$emit('remove-blur');
            this.colorActive = false;
        },

        close:function()
        {
            
            this.$root.$emit('change-card-content', this.crdHeader, this.crdContent, this.cardEl.$el.getAttribute('data-index'));
            this.changeActive();
        },
        deleteCard:function()
        {
            let cardId = this.cardEl.$el.getAttribute('data-index') 
            this.$root.$emit('delete-card', cardId)
            this.changeActive();
        },
        changeColor: function(color){
            this.styleObject.backgroundColor = color;
            let cardId = this.cardEl.$el.getAttribute('data-index') 
            this.$root.$emit('change-card-color',color, cardId, this.cardEl)
            
            
        },
        ColorCard:function()
        {
            this.colorActive=!this.colorActive;
        }
    },
    watch: {
        active:function(){
            if(this.cardEl.styleObject.backgroundColor != '#fff')
            {
                this.styleObject.border = 'none';
            }
            else
            {
                this.styleObject.border=null;
            }
            
        }
    },
mounted() {
  this.crdContentEl = this.$refs.crdContent;
  this.crdHeaderEl = this.$refs.crdHeader;
  
},

}
</script>