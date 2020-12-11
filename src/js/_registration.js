Vue.component("registration", {
  props: ["JsonData"],
  data: function () {
    return {
      isInvalid: false,
      isEmailValid:true
    };
  },
  template: `  <div class="assessment-intro">  
    <div class="cst-container">  
     <div class="survey-intro">     
     <div class="introduction-title" v-html="JsonData.heading"></div>  
     <div class="registrationHint-text" v-html="JsonData.registrationHintText"></div>                     
     <div :style="[isInvalid==true ?{'visibility':'visible'}:{'visibility':'hidden'}]" class="validated-error"  v-html="JsonData.Error">There is an error</div>
     <div :style="[isEmailValid==false ?{'visibility':'visible'}:{'visibility':'hidden'}]" class="validated-error" v-html="JsonData.emailError">Email is invalid</div>
     <div class="intro-panel"> 
         
             <div v-for="(input, index) in JsonData.inputFields" class="col-50">
                 <div class="registration-inner">
                     <label class="lbl-control" :for="'qual_'+ index" v-html="input.label"></label>                                        

                     <input class="cst-form-control" v-if="input.inputType=='text' || input.inputType=='email'" :id="'qual_'+ index"
                      :value="input.inputVal" @input="handleInput(input.inputId,index, $event)" @blur="handleBlur(input,index, $event)" 
                     :placeholder="input.placeholder"/>                    
                     </div>
                </div>
            </div>
            <div class="survey-begin txt-center">
                <div class="btn-item frw" @click="handleForward" v-html="JsonData.frdBtnTxt"></div>
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

      let isFormInvalid = false;
      this.JsonData.inputFields.forEach((input) => {
        var val =
          input.inputType == "select"
            ? input.selectedId
            : input.inputType == "text" || input.inputType == "email"
             ? input.inputVal
            : "";
        if (!val) {         
          isFormInvalid= true;
        }
        if( input.inputType==="email" && val && !/^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){1,}@([\w\-]+)((\.[a-zA-Z0-9_-]{2,})+)$/.test(val)){
          this.isEmailValid = false
         
         }
      });

      if (!isFormInvalid && this.isEmailValid) {
        document.getElementById("forwardbutton").click();
     
      }
      this.isInvalid = isFormInvalid
    },
    handleBlur:function(input,index,e){
      if(input.inputType==='email'){
        if(!/^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){1,}@([\w\-]+)((\.[a-zA-Z0-9_-]{2,})+)$/.test(e.target.value)){
         this.isEmailValid = false
        }else{          
          this.isEmailValid = true
        }

      }
      let trimmedValue = e.target.value.trim();
      document.getElementById(input.inputId).value = trimmedValue;
          
  },
    handleInput: function (id, index, e) {
      let isFormInvalid = false;
      let value  = e.target.value;
      // document.getElementById(id).value = value;
      // this.JsonData.inputFields[index].inputVal = value;

      let inputArr = value.split("");
      if(inputArr[0] ===" "){
        inputArr.splice(0,1);
        value = inputArr.join("")
      }
      document.getElementById(id).value = value;
      e.target.value = value;
      this.JsonData.inputFields[index].inputVal = value;


      this.JsonData.inputFields.forEach((input) => {
        var val =
          input.inputType == "select"
            ? input.selectedId
            : input.inputType == "text" || input.inputType == "email"
             ? input.inputVal
            : "";
        if (!val) {
          isFormInvalid= true;
        }
      });

      if(this.isInvalid){
        this.isInvalid = isFormInvalid
      }
    },
  },
});
