Vue.component("password", {
  props: ["JsonData"],
  data: function () {
    return {
      isInvalid: false,
      inputVal : ""
    };
  },
  template: `<div class="assessment-intro">  
  <div class="cst-container">  
   <div class="survey-intro center-align">
   <div class="introduction-title" v-html="JsonData.heading"></div>   
        <div class="intro-panel" v-html="JsonData.content"></div>
              <div class="password-inner clearfix">
              <div :style="[isInvalid==true ?{'visibility':'visible'}:{'visibility':'hidden'}]" class="validated-error"  v-html="JsonData.Error">There is an error</div>
                 <div v-for="(input, index) in JsonData.inputFields" class="">                
                   <label class="lbl-control" :for="'qual_'+ index" v-html="input.label"></label> 
                   <input class="cst-form-control" v-if="input.inputType=='text'" :id="'qual_'+ index"
                     @input="handleInput(input.inputId,index, $event)" 
                   :placeholder="input.placeholder" type="password"/>                    
                   </div>
              </div>
       
          <div class="survey-begin txt-center">
              <div class="btn-item frw" @click="handleForward" v-html="JsonData.frdBtnTxt"></div>
           </div>
           <div class="email-inner">
              <div class="email-instruction" v-html="JsonData.emailInstruct">  </div>                      
              <div class="email-url"> 
              <a :href="JsonData.emailUrl" v-html="JsonData.emailUrlText"></a>
              </div> 
            </div>
      </div>
   </div>
</div>`,

  mounted: function () {
    // console.log(this.isInvalid);
  },
  methods: {
    handleSelect: function (index, e) {
      this.JsonData.inputFields[index].selectedId = e.target.value;
      document.querySelector("#" + e.target.value).click();
    },
    handleForward: function () {
      // this.isInvalid = false;
      // this.JsonData.inputFields.forEach((input) => {
      //   var val =
      //     input.inputType == "select"
      //       ? input.selectedId
      //       : input.inputType == "text"
      //       ? input.inputVal
      //       : "";
      //   if (!val) {
      //     this.isInvalid = true;
      //   }
      // });

      // if (this.isInvalid == false) {
      //   document.getElementById("forwardbutton").click();
      // }

      if(this.JsonData.inputFields[0].inputVal == this.inputVal){
        this.isInvalid = false;
        console.log("filled")
        document.getElementById("forwardbutton").click();
      }else{
        this.isInvalid = true;
        console.log("error")
      }

    },
    handleInput: function (id, index, e) {
      // if (!/^[1-9]+[0-9]*$/.test(e.target.value)) {
      //   var valArr = e.target.value.split("");
      //   valArr.pop();
      //   e.target.value = valArr.join("");
      // }
      // document.getElementById(id).value = e.target.value;
      // this.JsonData.inputFields[index].inputVal = e.target.value;

      this.inputVal = e.target.value;
      console.log(this.inputVal)
    },
  },
});
