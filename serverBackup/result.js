"use strict";

Vue.component("header-panel", {
  props: ["headerData"],
  template: "<div class=\"header-wrapper cst-chart-hd\">\n\t\t\t\t<div class=\"left-section\">\n\t\t\t\t\t<div class=\"burger-wrapper\" style=\"visibility:hidden\">\n\t\t\t\t\t\t<div id=\"nav-icon3\" :class=\"headerData.leftPanelOpen=='true' ?'open':''\" >\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"logo-wrapper\">\n\t\t\t\t\t\t<img width=150 height=48 :src=\"headerData.logo\" />\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"right-section\">\n\t\t\t\t\t<div><h3 v-html=\"headerData.headerTitle\">Contact Center Walkthrough</h3></div>\n\t\t\t\t</div>\n\t\t\t</div>"
});
Vue.component("data-panel", {
  props: ["tablesData", "btnData"],
  template: "\n  \n  <div class=\"cst-chart-wrapper \">\n  <div class=\"result-move clearfix\">\n\n  <div class=\"btn-item frw\" v-html=\"btnData.revTxt\" @click=\"gotToNext(btnData.revVal)\">Review</div>\n  <div v-if=\"btnData.readdOnly=='false'\" class=\"btn-item frw\" v-html=\"btnData.lockTxt\" @click=\"lockVal(btnData.islockClick),gotToNext(btnData.lockVal)\">Review</div>\n  <div v-else class=\"btn-item frw disabled-show\" v-html=\"btnData.lockTxt\">Review</div>\n  <div class=\"btn-item frw\" @click=\"printCmd\" v-html=\"btnData.printTxt\">Print</div>\n  <div class=\"btn-item frw\" @click=\"gotToNext(btnData.saveVal)\" v-html=\"btnData.saveTxt\">Print</div>\n  \n  </div>\n  <div class=\"significant\" v-html=\"btnData.lastLine\"></div>\n   <div class=\"result-info\">\n    <div v-for=\"(tabledata,index) in tablesData\" class=\"tw-key html2pdf__page-break\">\n      <div class=\"table-div half-fl\" :class=\"tabledata.type!='over'?'full':'half '\">\n        <div class=\"tabl-head\" v-html=\"tabledata.headingTxt\"></div>       \n        <div class=\"markings\"><div class=\"avg\"><span class=\"mark-clr\"></span><span class=\"mark-title\" v-html=\"tabledata.avgTxt\">Average</span></div><div class=\"sel\"><span class=\"mark-clr cg-clr\"></span><span class=\"mark-title\"  v-html=\"tabledata.youTxt\">You</span></div></div>\n        <div class=\"table-scroll\">\n        <table>\n          <thead>\n            <tr>\n            <th v-for=\"(thTxt,thIndex) in tabledata.theadTxts\" v-html=\"thTxt\" ></th>\n            </tr>\n          </thead>\n          <tbody>\n          <tr v-for=\"(trow,trowIn) in tabledata.trows\">\n            <td v-if=\"trow.cat != ''\" v-html=\"trow.cat\" :rowspan=\"trow.catLen ? trow.catLen:'1'\" class=\"td-cat col-wdth\"></td>\n            <td v-html=\"trow.subcri\" class=\"col-wdth\"></td>\n            <td class=\"bdr-lf w10\"><div class=\"nob\" :style=\"{width:getWidth(trow.avgVal)}\"></div><div class=\"nob\" :style=\"{width:getWidth(trow.youVal)}\"></div></td>\n            <td class=\"bdr-lf w10\">&nbsp;</td>\n            <td class=\"bdr-lf w10\">&nbsp;</td>\n            <td class=\"bdr-lf bdr-rt w10\">&nbsp;</td>\n            <td v-if=\"tabledata.type=='over'\"><textarea @input=\"InputText(trow.keyObId,$event)\" class=\"textarea\" :value=\"trow.keyOb\" ></textarea></td>\n            <td v-if=\"tabledata.type!='over'\" v-html=\"trow.keyOb\"></td>\n            <td v-if=\"tabledata.type!='over'\"><textarea @input=\"InputText(trow.raId,$event)\" class=\"textarea\" :value=\"trow.ra\"></textarea></td>\n        </tr>\n        </tbody>\n        </table>\n        <div class=\"significant\" v-html=\"tabledata.lastLine\"></div>\n        </div>       \n      </div>\n      <div class=\"kta-div half-fl\" v-if=\"tabledata.type=='over'\" ><div class=\"kta-inner key-rt-text\"><div class=\"lbl\" v-html=\"tabledata.kTAHead\"></div><div class=\"key-info\" ><textarea class=\"textarea\" :value=\"tabledata.kTATxt\" @input=\"InputText(tabledata.kTAId,$event)\" ></textarea></div></div></div>\n    </div>\n    </div>\n  </div>",
  methods: {
    getThHtml: function getThHtml(thTxt, thIndex) {
      return thIndex == 2 ? thTxt.split("-").map(function (el) {
        return '<span>' + el + '</span>';
      }).join(' ') : thTxt;
    },
    getWidth: function getWidth(widno) {
      return "calc(" + widno * 100 + "% + " + widno + "px)";
    },
    printCmd: function printCmd() {
      var mainElements = document.querySelectorAll(".result-info .significant"); // .map(el=>{el.style.display = "block"})

      for (var i = 0; i < mainElements.length; i++) {
        mainElements[i].style.display = "block";
      }

      var element = document.querySelector('.result-info');
      var opt = {
        margin: [0.1, 0, 0.1, 0],
        filename: 'result.pdf',
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 1
        },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['css', 'legacy']
        }
      };
      html2pdf().set(opt).from(element).save().then(function () {
        for (var j = 0; j < mainElements.length; j++) {
          mainElements[j].style.display = "none";
        }
      }); //document.querySelectorAll(".result-info .significant").forEach((el,index)=>{el.style.display = "none"});
      //   // usingjspdf
      //   var doc = new jsPDF();
      // // We'll make our own renderer to skip this editor
      // var specialElementHandlers = {
      //   '#editor': function(element, renderer){
      //     return true;
      //   }
      // };
      // doc.fromHTML($('.result-info').get(0), 15, 15, {
      //   'width': 170, 
      //   'elementHandlers': specialElementHandlers
      // });
      // doc.save('sample-file.pdf');
    },
    lockVal: function lockVal(forVal) {
      document.getElementById("islockClick").value = forVal;
    },
    gotToNext: function gotToNext(forVal) {
      document.getElementById("navText").value = forVal;
      document.getElementById("forwardbutton").click();
    },
    InputText: function InputText(id, event) {
      var inptText = event.target.value.replace(/\n/g, "\\n").replace(/'/g, "\'").replace(/"/g, '\\"');
      document.getElementById(id).value = inptText;
      this.updateHeight();
    },
    updateHeight: function updateHeight() {
      var allElmts = document.querySelectorAll(".table-div.half");

      for (var i = 0; i < allElmts.length; i++) {
        var ownHeight = allElmts[i].offsetHeight;
        var siblin = allElmts[i].nextElementSibling.children[0];
        var siblinHei = siblin.offsetHeight;

        if (ownHeight > siblinHei) {
          siblin.setAttribute("style", "height:" + ownHeight + "px");
        }
      }
    },
    inputSOmething: function inputSOmething(tableIndex, trowIn, id, event) {// var inputTxt = event.target.innerText;
      // console.log(inputTxt);
      // console.log(this.tablesData[tableIndex].trows[trowIn].["keyId"])
      // this.tablesData[tableIndex].trows[trowIn].["keyOb"] = inputTxt;
      // console.log(id);
      // document.getElementById(id).value = inputTxt;
    }
  },
  mounted: function mounted() {
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);
  }
});
document.addEventListener("DOMContentLoaded", function () {//The first argument are the elements to which the plugin shall be initialized
  //The second argument has to be at least a empty object or a object with your desired options
  //OverlayScrollbars(document.querySelectorAll('.result-info'), { });
});
document.addEventListener("DOMContentLoaded", function () {//OverlayScrollbars(document.querySelectorAll('.scrollable,.side-nav-scroll'), { });
});
var eventInputvueObj = new Vue({
  el: "#main-wrapper",
  data: {
    alldata: {},
    headerdata: {},
    tablesdata: {},
    btnData: {}
  },
  created: function created() {
    if (document.getElementById("jsonData")) {
      this.alldata = JSON.parse(document.getElementById("jsonData").innerText);
      this.headerdata = this.alldata.headerData;
      this.tablesdata = this.alldata.tablesData;
      this.btnData = this.alldata.btnData;
    }
  }
});