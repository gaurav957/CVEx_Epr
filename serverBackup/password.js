"use strict";

Vue.component('header-large', {
  props: ['JsonData'],
  template: "\n    <div class=\"intro-nav\">\n        <div class=\"cst-container\">\n            <div class=\"brand-inner clearfix\">\n                <div class=\"mck-brand\"><img width=\"150\" height=\"48\" \n                :src=\"JsonData.logo\"\n                alt=\"Mckinsey\" title=\"Mckinsey\"></div>          \n\n            </div> \n            <div class=\"intro-title-container\">\n                <div class=\"title-banner\"><img :src=\"JsonData.banner\"></div>\n                <div class=\"intro-title\" v-html=\"JsonData.title\">\n                    \n                </div>\n               </div>          \n\n        </div>\n    </div>    \n    "
});
Vue.component("password", {
  props: ["JsonData"],
  data: function data() {
    return {
      isInvalid: false,
      inputVal: ""
    };
  },
  template: "<div class=\"assessment-intro\">  \n  <div class=\"cst-container\">  \n   <div class=\"survey-intro center-align\">\n   <div class=\"introduction-title\" v-html=\"JsonData.heading\"></div>   \n        <div class=\"intro-panel\" v-html=\"JsonData.content\"></div>\n              <div class=\"password-inner clearfix\">\n              <div :style=\"[isInvalid==true ?{'visibility':'visible'}:{'visibility':'hidden'}]\" class=\"validated-error\"  v-html=\"JsonData.Error\">There is an error</div>\n                 <div v-for=\"(input, index) in JsonData.inputFields\" class=\"\">                \n                   <label class=\"lbl-control\" :for=\"'qual_'+ index\" v-html=\"input.label\"></label> \n                   <input class=\"cst-form-control\" v-if=\"input.inputType=='text'\" :id=\"'qual_'+ index\"\n                     @input=\"handleInput(input.inputId,index, $event)\" \n                   :placeholder=\"input.placeholder\" type=\"password\"/>                    \n                   </div>\n              </div>\n       \n          <div class=\"survey-begin txt-center\">\n              <div class=\"btn-item frw\" @click=\"handleForward\" v-html=\"JsonData.frdBtnTxt\"></div>\n           </div>\n           <div class=\"email-inner\">\n              <div class=\"email-instruction\" v-html=\"JsonData.emailInstruct\">  </div>                      \n              <div class=\"email-url\"> \n              <a :href=\"JsonData.emailUrl\" v-html=\"JsonData.emailUrlText\"></a>\n              </div> \n            </div>\n      </div>\n   </div>\n</div>",
  mounted: function mounted() {// console.log(this.isInvalid);
  },
  methods: {
    handleSelect: function handleSelect(index, e) {
      this.JsonData.inputFields[index].selectedId = e.target.value;
      document.querySelector("#" + e.target.value).click();
    },
    handleForward: function handleForward() {
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
      if (this.JsonData.inputFields[0].inputVal == this.inputVal) {
        this.isInvalid = false;
        console.log("filled");
        document.getElementById("forwardbutton").click();
      } else {
        this.isInvalid = true;
        console.log("error");
      }
    },
    handleInput: function handleInput(id, index, e) {
      // if (!/^[1-9]+[0-9]*$/.test(e.target.value)) {
      //   var valArr = e.target.value.split("");
      //   valArr.pop();
      //   e.target.value = valArr.join("");
      // }
      // document.getElementById(id).value = e.target.value;
      // this.JsonData.inputFields[index].inputVal = e.target.value;
      this.inputVal = e.target.value;
      console.log(this.inputVal);
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