"use strict";

Vue.component('header-large', {
  props: ['JsonData'],
  template: "\n    <div class=\"intro-nav\">\n        <div class=\"cst-container\">\n            <div class=\"brand-inner clearfix\">\n                <div class=\"mck-brand\"><img width=\"150\" height=\"48\" \n                :src=\"JsonData.logo\"\n                alt=\"Mckinsey\" title=\"Mckinsey\"></div>          \n\n            </div> \n            <div class=\"intro-title-container\">\n                <div class=\"title-banner\"><img :src=\"JsonData.banner\"></div>\n                <div class=\"intro-title\" v-html=\"JsonData.title\">\n                    \n                </div>\n               </div>          \n\n        </div>\n    </div>    \n    "
});
Vue.component('module', {
  props: ['JsonData'],
  template: "\n    <div class=\"assessment-intro\">  \n    <div class=\"cst-container\">  \n     <div class=\"survey-intro\">\n         <div class=\"introduction-title\" v-html=\"JsonData.heading\">\n         </div>\n         <div class=\"intro-panel module\">\n            <div class=\"module-row m-thead mandatory\">\n                <div class=\"col\" v-for=\"manHeader in JsonData.mandatoryHeaders\">\n                <div class=\"title-head\"  v-html=\"manHeader\">  </div> \n                </div>                    \n            </div>\n            <div class=\"module-row catg-row mandatory\" v-for=\"(module,moduleIndex) in JsonData.mandatoryModules\">\n                <div class=\"col-4\">                   \n                    <div class=\"title-module\" v-html=\"module.cat\">                         \n                    </div>\n                </div>\n                 <div class=\"col-8 form-catg\">\n                  <div class=\"row-cst\" v-for=\"(subCat,subCatIndex) in module.subCat\">\n                    <div class=\"col-3\">\n                         <div class=\"title-module\" v-html=\"subCat.subCatTxt\">                          \n                         </div>\n                    </div>\n                    <div class=\"col-3 ctrl-sm\">\n                        <div class=\"input-module\">\n                            <input type=\"text\" disabled=\"disabled\" \n                            class=\"cst-form-control\" :value=\"subCat.subCatValue\">\n                        </div>\n                    </div>\n                    <div class=\"col-3 ctrl-sm-chk\">\n                        <div class=\"catg-selection\">\n                            <div class=\"pure-checkbox\">\n                               <input :id=\"subCat.checkId+'_cus'\" name=\"A6023\" type=\"checkbox\" \n                               :checked=\"subCat.isChecked\" :disabled=\"!subCat.isCheckable\"\n                               value=\"3\" class=\"radio\" />                               \n                               <label :for=\"subCat.checkId+'__cus'\" @click=\"subCat.isCheckable==true? handleSelect(moduleIndex,subCatIndex,subCat.checkId):''\"></label>\n                             </div>\n                          </div> \n                       </div>\n                    </div>\n                 </div>\n            </div>\n            <div class=\"module-row m-thead\">\n                <div class=\"col\" v-for=\"header in JsonData.headers\">\n                <div class=\"title-head\"  v-html=\"header\">  </div> \n                </div>                    \n            </div>\n            <div class=\"module-row catg-row\" v-for=\"(module,moduleIndex) in JsonData.Modules\">\n                <div class=\"col-4\">                   \n                    <div class=\"title-module\" v-html=\"module.cat\">                         \n                    </div>\n                </div>\n                 <div class=\"col-8 form-catg\">\n                  <div class=\"row-cst\" v-for=\"(subCat,subCatIndex) in module.subCat\">\n                    <div class=\"col-3\">\n                         <div class=\"title-module\" v-html=\"subCat.subCatTxt\">                          \n                         </div>\n                    </div>\n                    <div class=\"col-3 ctrl-sm\">\n                        <div class=\"input-module\">\n                            <input type=\"text\" disabled=\"disabled\" \n                            class=\"cst-form-control\" :value=\"subCat.subCatValue\">\n                        </div>\n                    </div>\n                    <div class=\"col-3 ctrl-sm-chk\">\n                        <div class=\"catg-selection\">\n                            <div class=\"pure-checkbox\">\n                               <input :id=\"subCat.checkId+'_cus'\" name=\"A6023\" type=\"checkbox\" \n                               :checked=\"subCat.isChecked\" :disabled=\"!subCat.isCheckable\"\n                               value=\"3\" class=\"radio\" />                               \n                               <label :for=\"subCat.checkId+'__cus'\" @click=\"subCat.isCheckable==true? handleSelect(moduleIndex,subCatIndex,subCat.checkId):''\"></label>\n                             </div>\n                          </div> \n                       </div>\n                    </div>\n                 </div>\n            </div>\n          </div>\n          <div class=\"survey-begin txt-center\">\n            <div class=\"btn-item frw\" @click=\"handleForward\" v-html=\"JsonData.frdBtnTxt\"></div>\n          </div>\n       </div>       \n     </div>\n </div>\n    ",
  methods: {
    handleSelect: function handleSelect(moduleIndex, subCatIndex, id) {
      this.JsonData.Modules[moduleIndex].subCat[subCatIndex].isChecked = !this.JsonData.Modules[moduleIndex].subCat[subCatIndex].isChecked;

      if (document.getElementById(id)) {
        document.getElementById(id).click();
      }
    },
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