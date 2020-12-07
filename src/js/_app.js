
var eventInputvueObj = new Vue({
  el: "#main-wrapper",
  data: {
    alldata: {},
    headerdata: {},
    leftdata: {},
    rightdata: {},
    progressdata:{},
    footerdata:{}
  },

  methods:{
    handleSelect:function(){
      var count = 0;
      this.rightdata.categories.forEach(cat => {
        cat.subCategories.forEach(subCat=>{
          subCat.questions.forEach(ques=>{
            if(ques.selected!=""){ 
              count++;                 
            }
          })
        })
      });
      this.progressdata.answrdQues = count;
      var percentage = (count/Number(this.progressdata.totalQues))*100;
      this.progressdata.percentge = percentage;
      document.getElementById("myBar").style.width=percentage+"%";     
    },

    updateLeftQuestionAttempt:function(ttlAttempt){
      this.$refs.leftPanel.updateQuesAttempt(ttlAttempt);
    },

    PrevPageBtnClckParent:function(){
      this.$refs.leftPanel.PrevbtnClick();
    },
    NextPageBtnClckParent:function(){
      this.$refs.leftPanel.NextbtnClick();
    },
    disPrevParent:function(){
      this.$refs.footerPanel.disablePrev();
    },
    disNextParent:function(){
      this.$refs.footerPanel.disableNext();
    },
    updatePrgsSubmit:function(endis){
      this.$refs.rightPanel.enabDisSubmit(endis);
    },
    updateRightHeight:function(){
      this.$refs.rightPanel.setHeight();
    },
    getTotalQuestions:function(){
      this.$refs.leftPanel.updatteAllQuestions();
      this.$refs.leftPanel.updateSectionQuestions();
    },
    setTotalQuestions:function(totalAnswered,totalQuestions){
      // this.$refs.footerPanel.setAllQuestions(totalAnswered,totalQuestions);
      this.$refs.rightPanel.updateprsbar(totalAnswered,totalQuestions);
    },
    setSecQuestions:function(sectionAnswered,sectionQuestions){
      this.$refs.footerPanel.setSectionQuestions(sectionAnswered,sectionQuestions);
    },
    setScrollHeight:function(){
      this.$refs.rightPanel.setScrollHeight();
    }

  },
  
  created: function () {

    if (document.getElementById("jsonData")) {
      this.alldata = JSON.parse(document.getElementById("jsonData").innerText);
      this.headerdata = this.alldata.headerData;
      this.leftdata = this.alldata.leftData;
      this.rightdata = this.alldata.rightData;
      this.progressdata = this.alldata.progressData;      
      this.footerdata = this.alldata.footerData;
    }
  },
});
