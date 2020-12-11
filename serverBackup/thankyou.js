"use strict";

Vue.component('header-large', {
  props: ['JsonData'],
  template: "\n    <div class=\"intro-nav\">\n        <div class=\"cst-container\">\n            <div class=\"brand-inner clearfix\">\n                <div class=\"mck-brand\"><img width=\"150\" height=\"48\" \n                :src=\"JsonData.logo\"\n                alt=\"Mckinsey\" title=\"Mckinsey\"></div>          \n\n            </div> \n            <div class=\"intro-title-container\">\n                <div class=\"title-banner\"><img :src=\"JsonData.banner\"></div>\n                <div class=\"intro-title\" v-html=\"JsonData.title\">\n                    \n                </div>\n               </div>          \n\n        </div>\n    </div>    \n    "
});
Vue.component('thankyou-content', {
  props: ["JsonData"],
  template: "<div class=\"assessment-intro\">  \n               <div class=\"cst-container\">  \n                    <div class=\"survey-intro thnk-you\">\n                        <div class=\"thankyou-banner\">\n                            <div class=\"img\"></div>\n                            <div v-html=\"JsonData.content\" class=\"thankyou-content\"></div>\n                        </div>\n                    </div>\n                    <div class=\"survey-begin txt-center\" style=\"display: none;\">\n                        <div class=\"btn-item frw\" @click=\"handleForward\" v-html=\"JsonData.frdBtnTxt\"></div>\n                    </div>\n                </div>\n            </div>    \n    ",
  methods: {
    handleForward: function handleForward() {
      document.getElementById('forwardbutton').click();
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
  el: "#main-wrapper",
  data: {
    jsonData: {}
  },
  method: {},
  created: function created() {
    var jsonHtml = document.getElementById("jsonData");

    if (jsonHtml) {
      this.jsonData = JSON.parse(jsonHtml.innerText);
    }
  }
});