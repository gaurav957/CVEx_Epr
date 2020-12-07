
Vue.component("footer-panel", {
  props: ["footerData"],
  data: function () {
    return {
      nextEnable: true,
      prevEnable: true,
    }
  },
  template: `<div class="footer clearfix">
  <div class="navigation-block clearfix">
    <div class="right">
      <span class="tt-ans"><span v-html="footerData.ttlCnt"></span> <span v-html="footerData.answrdQues"></span>/<span v-html="footerData.totalQues"></span></span>
		   <div class="btn-item frw" :class="prevEnable == true?'':'disable'" v-html=footerData.prevTxt @click="prevEnable == true?PrevPage():''" ></div>
		   <div class="btn-item frw" :class="nextEnable == true?'':'disable'" v-html=footerData.forwardTxt @click="nextEnable == true?nextPage(footerData.forwardVal):''"></div>
	  </div>
  </div>
  <div class="copyright-block clearfix"><div class="footer-mck f-left"><img :src="footerData.footerLogo" alt="" title=""></div><div class="copy-rt r-right" v-html=footerData.copyrghtTxt></div></div>
</div>`,
  mounted:function(){
    document.querySelector("#ttl-attmpt").value = this.footerData.answrdQues;
    // document.querySelector("#cur-prcntge").value = this.footerData.percentge;
  },
  methods: {
    nextPage:function(){
      // document.getElementById("navText").value = forwardBtnVal;
      // document.getElementById("forwardbutton").click();
      this.$parent.NextPageBtnClckParent();//calling parent
    },
    PrevPage:function(){
      this.$parent.PrevPageBtnClckParent();//calling parent
    },
    disablePrev:function(){
      this.prevEnable = false;
    },
    disableNext:function(ansdQues, ttlQues){
      this.nextEnable = false;
    },
    setSectionQuestions:function(sectionAnswered,sectionQuestions){
      document.querySelector("#ttl-attmpt").value = sectionAnswered;
      this.footerData.answrdQues = sectionAnswered;
      this.footerData.totalQues = sectionQuestions;
    }
    
  }
});
