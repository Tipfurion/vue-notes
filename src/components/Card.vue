<template>
  <div v-bind:id=templateId v-bind:style="styleObject" v-on:click="editCard" class="content_block" ref="templateRef" :data-index="index" >
    <div class="content_nested_text" ref="content_nested_text">
    <h3 ref="headerRef">{{header}}</h3>
    <hr>
    <pre ref="contentRef">{{content}}</pre>
    </div>
</div>

</template>

<script>
import {db} from '../../fireconf'

const notes = db.collection('notes')
export default {
    name: 'card',
    data: function () {
        return {
          id:null,
          count: 0,
          content: '',
          templateId:null,
          item: null,
          header:'',
          grid:null,
          doit:0,
          templateRef:null,
          delay:1000,
          styleObject: {
            gridRowEnd : null,
            padding:null,
            margin:null,
            rowHeight:null,
            rowGap:null,
            rowSpan:null,
            display:'block',
            visibility:'visible',
            backgroundColor:'white',
            
          },
        }
      },
    props:['index'], 
    //{
    //index:String

    //},
    methods:{
      resizeCards: function(){  
        clearTimeout(this.doit);
        if(this.doit==0)
        {
          this.delay=0;
        }
        else
        {
          this.delay=0;
        }
        
        this.doit = setTimeout(this.calculateSize, this.delay);
      },
      calculateSize:function()
      {
        let rowSpan = Math.ceil((this.item.getBoundingClientRect().height+this.rowGap+this.margin+this.padding)/(this.rowHeight+this.rowGap));   
        this.styleObject.gridRowEnd = `span ${rowSpan}`;
      },
      editCard:function(){
        this.styleObject.visibility = 'hidden'
       // this.$root.$emit('show-editor', [this.header, this.content, this])
        this.$root.$emit('show-editor', this.index, this)

      },
    },
    watch: {

    },
    mounted: function () {
      this.item = this.$el.children[0];
      this.header = this.$parent.cards[this.index].header;
      this.content = this.$parent.cards[this.index].content;
      this.grid = this.$parent.$refs.content;
      this.padding = parseInt(window.getComputedStyle(this.$refs.content_nested_text).getPropertyValue('padding'))*2;
      this.margin = parseInt(window.getComputedStyle(this.$el).getPropertyValue('margin'))*2;
      this.rowHeight = parseInt(window.getComputedStyle(this.grid).getPropertyValue('grid-auto-rows'));
      this.rowGap = parseInt(window.getComputedStyle(this.grid).getPropertyValue('grid-row-gap'));
      this.$nextTick(function() {addEventListener('resize',this.resizeCards)});
      this.resizeCards();
     // this.id = this.index
    },
    updated() {
      this.resizeCards();
      this.header = this.$parent.cards[this.index].header;
      this.content = this.$parent.cards[this.index].content;
    },

}
</script>

