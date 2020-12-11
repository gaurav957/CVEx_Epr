"use strict";

Vue.component('header-large', {
  props: ['JsonData'],
  template: "\n    <div class=\"intro-nav\">\n        <div class=\"cst-container\">\n            <div class=\"brand-inner clearfix\">\n                <div class=\"mck-brand\"><img width=\"150\" height=\"48\" \n                :src=\"JsonData.logo\"\n                alt=\"Mckinsey\" title=\"Mckinsey\"></div>          \n\n            </div> \n            <div class=\"intro-title-container\">\n                <div class=\"title-banner\"><img :src=\"JsonData.banner\"></div>\n                <div class=\"intro-title\" v-html=\"JsonData.title\">\n                    \n                </div>\n               </div>          \n\n        </div>\n    </div>    \n    "
});
Vue.component("registration", {
  props: ["JsonData"],
  data: function data() {
    return {
      isInvalid: false,
      isEmailValid: true
    };
  },
  template: "  <div class=\"assessment-intro\">  \n    <div class=\"cst-container\">  \n     <div class=\"survey-intro\">\n     <div class=\"introduction-title\" v-html=\"JsonData.heading\"></div>                       \n     <div :style=\"[isInvalid==true ?{'visibility':'visible'}:{'visibility':'hidden'}]\" class=\"validated-error\"  v-html=\"JsonData.Error\">There is an error</div>\n     <div :style=\"[isEmailValid==false ?{'visibility':'visible'}:{'visibility':'hidden'}]\" class=\"validated-error\" v-html=\"JsonData.emailError\">Email is invalid</div>\n     <div class=\"intro-panel\"> \n         \n             <div v-for=\"(input, index) in JsonData.inputFields\" class=\"col-50\">\n                 <div class=\"registration-inner\">\n                     <label class=\"lbl-control\" :for=\"'qual_'+ index\" v-html=\"input.label\"></label>                                        \n\n                     <input class=\"cst-form-control\" v-if=\"input.inputType=='text' || input.inputType=='email'\" :id=\"'qual_'+ index\"\n                      :value=\"input.inputVal\" @input=\"handleInput(input.inputId,index, $event)\" @blur=\"handleBlur(input,index, $event)\" \n                     :placeholder=\"input.placeholder\"/>                    \n                     </div>\n                </div>\n            </div>\n            <div class=\"survey-begin txt-center\">\n                <div class=\"btn-item frw\" @click=\"handleForward\" v-html=\"JsonData.frdBtnTxt\"></div>\n             </div>\n        </div>\n     </div>\n </div>",
  mounted: function mounted() {// console.log(this.isInvalid);
  },
  methods: {
    handleSelect: function handleSelect(index, e) {
      this.JsonData.inputFields[index].selectedId = e.target.value;
      document.querySelector("#" + e.target.value).click();
    },
    handleForward: function handleForward() {
      var _this = this;

      var isFormInvalid = false;
      this.JsonData.inputFields.forEach(function (input) {
        var val = input.inputType == "select" ? input.selectedId : input.inputType == "text" || input.inputType == "email" ? input.inputVal : "";

        if (!val) {
          isFormInvalid = true;
        }

        if (input.inputType === "email" && val && !/^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){1,}@([\w\-]+)((\.[a-zA-Z0-9_-]{2,})+)$/.test(val)) {
          _this.isEmailValid = false;
        }
      });

      if (!isFormInvalid && this.isEmailValid) {
        document.getElementById("forwardbutton").click();
      }

      this.isInvalid = isFormInvalid;
    },
    handleBlur: function handleBlur(input, index, e) {
      if (input.inputType === 'email') {
        if (!/^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){1,}@([\w\-]+)((\.[a-zA-Z0-9_-]{2,})+)$/.test(e.target.value)) {
          this.isEmailValid = false;
        } else {
          this.isEmailValid = true;
        }
      }

      var trimmedValue = e.target.value.trim();
      document.getElementById(input.inputId).value = trimmedValue;
    },
    handleInput: function handleInput(id, index, e) {
      var isFormInvalid = false;
      var value = e.target.value; // document.getElementById(id).value = value;
      // this.JsonData.inputFields[index].inputVal = value;

      var inputArr = value.split("");

      if (inputArr[0] === " ") {
        inputArr.splice(0, 1);
        value = inputArr.join("");
      }

      document.getElementById(id).value = value;
      e.target.value = value;
      this.JsonData.inputFields[index].inputVal = value;
      this.JsonData.inputFields.forEach(function (input) {
        var val = input.inputType == "select" ? input.selectedId : input.inputType == "text" || input.inputType == "email" ? input.inputVal : "";

        if (!val) {
          isFormInvalid = true;
        }
      });

      if (this.isInvalid) {
        this.isInvalid = isFormInvalid;
      }
    }
  }
});
Vue.component('intro-footer', {
  props: ['JsonData'],
  template: "<div class=\"footer-intro\">\t\t\t\n            <div class=\"copyright-block clearfix\">\n                <div class=\"footer-mck f-left\"><img :src=\"JsonData.footerLogo\" alt=\"Mckinsey\" title=\"Mckinsey\"></div>\n                <div class=\"copy-rt r-right\" v-html=\"JsonData.footerContent\"></div>\n            </div>\n        </div>"
});
document.addEventListener("DOMContentLoaded", function () {
  //The first argument are the elements to which the plugin shall be initialized
  //The second argument has to be at least a empty object or a object with your desired options
  OverlayScrollbars(document.querySelectorAll('.survey-intro'), {});
});
new Vue({
  el: '#main-wrapper',
  data: {
    jsondata: {}
  },
  methods: {},
  created: function created() {
    var dataHtml = document.getElementById("jsonData");

    if (dataHtml) {
      this.jsondata = JSON.parse(dataHtml.innerText);
    }
  }
});