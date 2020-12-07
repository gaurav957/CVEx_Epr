Vue.component("right-panel", {
  props: ["rightData", "progressData", "leftData"],  
  template: `<div class="right-panel-wrapper">
  <div class="right-panel clearfix">
    <progress-panel ref="prsPanel" :right-data="rightData" :progress-data="progressData"></progress-panel>
    <div class="survey-wrapper"> 
      <div class="scrollable">   
      <div class="accordian-inner" v-for="(category,catIn) in rightData.categories">
        <h2 class="accordion" @click="openAccordion($event)" v-html='category.heading'></h2>
        <div class="accordion-panel" >
          <div class="accordion-resize" >
            <div v-for="(subCategory,subCatIn) in category.subCategories">
            <div class="survey-title"  v-if="subCategory.subHeading" v-html='subCategory.subHeading'></div>
            <div
              v-for="(question, quesInd) in subCategory.questions"
              class="question-resize"
            >
              <div class="survey-info">
                <span class="survey-info-messg" v-html='question.quesText'></span>:
                <span class="instruct-info"  v-if="question.quesDescription">                 
                  <span class="" v-html='question.quesDescription'></span>
                </span>
              </div>
              <div class="survey-type">
                <div class="survey-row" :data-id="catIn+'_'+subCatIn+'_'+quesInd">
                  <div
                    class="s-col"
                    v-for="(option, index) in question.options"
                  >
                    <div class="survey-card" :data_id="option.optionsId" 
                    :class="{selectedsurvey:question.selected==option.optionsId}" @click="handleAnswerSelect(option.optionsId,catIn,subCatIn, quesInd)">
                      <div class="s-crad-header" v-html='rightData.ratingTxt[index]'></div>
                      <div class="s-crad-body" v-html='option.optionText'></div>
                    </div>
                  </div>
                </div>
                <div class="ctrl-sm-chk">
                  <div class="catg-selection">
                      <div class="pure-radiobutton">
                        <input :checked="question.selected == question.naId" :id="'cus_'+question.naId" :name="'cus_'+question.naId" type="radio" value="3" class="radio" />                               
                        <label @click="handleAnswerSelect(question.naId,catIn,subCatIn, quesInd)" :for="'cus_'+question.naId" v-html="rightData.naText">Hello</label>
                     </div>
                  </div> 
               </div>
                <div class="other-type-row">
                  <div class="other-quest" v-html='rightData.cmntHeding'></div>
                  <div class="other-form">
                    <input
                      type="text"
                      class="other-form-ctrl"
                      :placeholder="rightData.cmntPlaceHolder"
                      :value="question.detailVal"
                      @input="handleKeyDown(catIn,subCatIn,quesInd,question.detailId,$event)"
                    />
                  </div>
                </div>
                <div class="survey-type-overlay" v-if="rightData.readdOnly"></div>
              </div>
            </div>
            </div>
          </div>

          </div>

        </div>
      </div>
      </div>
      </div>
    </div>
  </div>
</div>`,
  mounted:function(){
    this.setHeight();
    window.addEventListener("resize",this.setHeight);
    document.addEventListener("DOMContentLoaded", ()=> {
      //The first argument are the elements to which the plugin shall be initialized
      //The second argument has to be at least a empty object or a object with your desired options
      // OverlayScrollbars(document.querySelector('.side-nav-scroll'), { });

      var instance = OverlayScrollbars(document.querySelector('.scrollable'), { });
      // instance.scroll({ el: document.getElementById('hellomoto'), block : "center"}, 100);
      let scrollHeight = this.rightData.scrollPosition;
      if(scrollHeight == ""){
        scrollHeight = 0;
      }
      instance.scroll({ x : 0, y : scrollHeight }, 100);
    });
    
  },
  methods: {
    openAccordion: function(e){
      e.stopPropagation();
          
      if(e.target.className.split(' ').indexOf("active") == -1){
        e.target.className += " active";
        e.target.nextElementSibling.style.maxHeight =
        e.target.nextElementSibling.scrollHeight + "px";
      }
      else{
        e.target.className  = e.target.className.replace(" active","");
        e.target.nextElementSibling.style.maxHeight =null;
      }
      this.checkgroupUngroup();
    },
    handleKeyDown:function(catIn,subCatIn,quesInd,ques_id,e){
      this.rightData.categories[catIn].subCategories[subCatIn].questions[quesInd].detailVal = e.target.value;
      if(document.getElementById(ques_id)){
        document.getElementById(ques_id).value=e.target.value.replace(/\n/g,"\\n").replace(/'/g,"\'").replace(/"/g,'\\"');
      }
      
    },
    handleAnswerSelect: function(dataId,catIn,subCatIn,quesInd){
      this.rightData.categories[catIn].subCategories[subCatIn].questions[quesInd].selected = dataId;
      if(document.getElementById(dataId)){
        document.getElementById(dataId).click();
      }

      let ttlAttempt = 0;
      for(let category of this.rightData.categories){
        for(let subCat of category.subCategories){
          for(let question of subCat.questions){
            if(question.selected != ""){
              ttlAttempt++;
            }
          }
        }
      }
    
      this.$parent.updateLeftQuestionAttempt(ttlAttempt);//calling parent
      this.$parent.getTotalQuestions();//calling parent
      // this.$refs.prsPanel.updateProgresbar(ttlAttempt);//calling child component

    },
    setHeight:function(){

      if (!Object.entries) {
         Object.entries = function( obj ){
           var ownProps = Object.keys( obj ),
               i = ownProps.length,
               resArray = new Array(i); // preallocate the Array
           while (i--)
             resArray[i] = [ownProps[i], obj[ownProps[i]]];
           
           return resArray;
         };
       }

      var surRows = document.getElementsByClassName("survey-row");
      for(var i = 0; i < surRows.length; i++){ //var i = 0; i < surRows.length; i++ //let surRow of surRows
        var headHght = 0;
        var bodyHght = 0;
        for(var j = 0; j < surRows[i].children.length; j++){ //var i = 0; i < surRows.length; i++ //let rowChild of surRow.children
          let srvyCard =  surRows[i].children[j].children[0];
          srvyCard.children[0].setAttribute("style","height:auto");
          srvyCard.children[1].setAttribute("style","height:auto");

          let sCradHeaderHght = srvyCard.children[0].offsetHeight;
          let sCradBodyHght = srvyCard.children[1].offsetHeight;
          if(headHght<sCradHeaderHght){
            headHght = sCradHeaderHght;
          }

          if(bodyHght<sCradBodyHght){
            bodyHght = sCradBodyHght;
          }
          //srvyCard.children[0].setAttribute("style","height:"+headHght+"px");
          //srvyCard.children[1].setAttribute("style","height:"+bodyHght+"px");

        }

        let rowHeaders = surRows[i].getElementsByClassName("s-crad-header");
        let rowBodies = surRows[i].getElementsByClassName("s-crad-body");
        let rowHeadersArr = []; //[...rowHeaders];
        let rowBodiesArr = []; //[...rowBodies];
        for(var k = 0; k<rowHeaders.length; k++){
          rowHeadersArr.push(rowHeaders[k])
        }
        for(var l = 0; l<rowBodies.length; l++){
          rowBodiesArr.push(rowBodies[l])
        }
        
        rowHeadersArr.map((el)=>{ el.setAttribute("style","height:"+headHght+"px"); })
        rowBodiesArr.map((el)=>{ el.setAttribute("style","height:"+bodyHght+"px"); })
      }
    },
    enabDisSubmit:function(endis){
      this.$refs.prsPanel.enabDisSubmit(endis);//calling child component
    },
    toltiptoggle:(e)=>{
      //e.preventDefault();
      if(e.target.parentNode.classList.contains("tooltip-show")){
        e.target.parentNode.classList.remove("tooltip-show");
      }else{
        e.target.parentNode.classList.add("tooltip-show");
      }
    },
    setScrollHeight:()=>{
      let instance = OverlayScrollbars(document.querySelector('.scrollable'), { });
      let scrollHeight = instance.scroll().position.y
      document.getElementById("scroll-value").value = scrollHeight;

    },
    updateprsbar:function(totalAnswered,totalQuestions){
      this.$refs.prsPanel.updateProgresbar(totalAnswered,totalQuestions);//calling child component
    },
    groupQuestions:function(){
      document.querySelectorAll(".accordion").forEach((element, index) => {
        element.classList.remove("active");
        element.nextElementSibling.style.maxHeight =null;
        
      })
      this.checkgroupUngroup();
    },
    ungroupQuestions:function(){
      document.querySelectorAll(".accordion").forEach((element, index) => {
        element.classList.add("active");
        element.nextElementSibling.style.maxHeight =
        element.nextElementSibling.scrollHeight + "px";
        
      })
      this.checkgroupUngroup();
    },
    checkgroupUngroup:function(){
      let grouped = true;
      document.querySelectorAll(".accordion").forEach((element, index) => {
        if(element.classList.contains("active")){
          grouped = false;
        }
        this.$refs.prsPanel.udpdateGroupInfo(grouped);//calling child component
      })
    }
  }

  
 
});

Vue.component("progress-panel", {
  props: ["rightData","progressData"],
  data: function () {
    return {
      submitStatus: false,
      curGroup:true,
      totalAnserwed : 0,
      totalQuestions : 0,
      totalPercentage:0
    }
  },
  template: `<div class='progress-panel'>
        <div class='progress-panel-inner'>
            <div class='progress'>
                <div class='perc-data'>
                    <span v-html='progressData.answerTxt'>Answered</span> <span v-html='this.totalAnserwed'>1</span> <span v-html='progressData.of'>of</span> <span v-html='this.totalQuestions'>12</span> <span>(</span><span v-html='this.totalPercentage'>12</span><span>%</span><span>)</span>
                </div>
                <div class='progress-bar'>
                    <div id="myProgress">
                        <div id="myBar" :style="{ width: this.totalPercentage+'%'}"></div>
                    </div>
                </div>
            </div>
            <div class='btn-outer'>
            <!--save-->
              <div class='btn-item frw' v-if="this.curGroup==false" v-html='progressData.groupTxt' @click="groupit()">Save</div>
              <div class='btn-item frw' v-if="this.curGroup==true" v-html='progressData.unGroupTxt' @click="ungroupit()">Save</div>
              <div class='btn-item frw' :class="rightData.readdOnly == true ? 'disable':'null'" v-html='progressData.saveTxt' @click=savePage>Save</div>
              <!--save-->
              <!--submit-->
              <div class='btn-item frw' :class="this.submitStatus == false ? 'disable':'null'" @click=checkSubmitStatus(this.submitStatus) v-html='progressData.submitTxt' >Submit</div>
              <!--submit-->
            </div>
        </div>
    </div>`,

    mounted:function(){
      //document.querySelector("#ttl-attmpt").value = this.progressData.answrdQues;
      //document.querySelector("#cur-prcntge").value = this.progressData.percentge;
    },
  methods: {
    
    nextPage: function (forwardBtnVal) {
      document.getElementById("left-panel-menu-slctn").value = forwardBtnVal;
      document.getElementById("left-panel-subMenu-slctn").value = forwardBtnVal;
      document.getElementById("forwardbutton").click();
    },
    savePage: function () {
      this.$parent.setScrollHeight();//calling parent
      document.getElementById("forwardbutton").click();
    },
    // updateProgresbar:function(ttlAttempt){
    //   this.progressData.answrdQues = ttlAttempt;
    //   var percentage = parseInt((ttlAttempt/Number(this.progressData.totalQues))*100);
    //   this.progressData.percentge = percentage;

    //   document.querySelector("#ttl-attmpt").value = ttlAttempt;
    //   document.querySelector("#cur-prcntge").value = percentage;
    // },
    updateProgresbar:function(totalAnswered,totalQuestions){
      this.totalAnserwed = totalAnswered;
      this.totalQuestions = totalQuestions;
      var percentage = parseInt((totalAnswered/totalQuestions)*100);
      this.totalPercentage = percentage;

      //document.querySelector("#ttl-attmpt").value = totalAnswered;
      //document.querySelector("#cur-prcntge").value = percentage;
    },
    enabDisSubmit:function(endis){
      if(endis == 'enable'){
        this.submitStatus = true;
      }else{
        this.submitStatus = false;
      }
    },
    checkSubmitStatus:function(submitStatus){
      //v-on="this.submitStatus == false ? {} : {click:()=>nextPage(progressData.submitVal)}"
      if(submitStatus != false){
        this.nextPage(this.progressData.submitVal)
      }
    },
    ungroupit:function(){
      this.$parent.ungroupQuestions();
    },
    groupit:function(){
      this.$parent.groupQuestions();
    },
    udpdateGroupInfo:function(grouped){
      this.curGroup = grouped;
    }
  },
});
