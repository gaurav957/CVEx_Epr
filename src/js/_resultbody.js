
Vue.component("data-panel", {
  props: ["tablesData","btnData"],
  template: `
  
  <div class="cst-chart-wrapper ">
  <div class="result-move clearfix">

  <div class="btn-item frw" v-html="btnData.revTxt" @click="gotToNext(btnData.revVal)">Review</div>
  <div v-if="btnData.readdOnly=='false'" class="btn-item frw" v-html="btnData.lockTxt" @click="lockVal(btnData.islockClick),gotToNext(btnData.lockVal)">Review</div>
  <div v-else class="btn-item frw disabled-show" v-html="btnData.lockTxt">Review</div>
  <div class="btn-item frw" @click="printCmd" v-html="btnData.printTxt">Print</div>
  <div class="btn-item frw" @click="gotToNext(btnData.saveVal)" v-html="btnData.saveTxt">Print</div>
  
  </div>
  <div class="significant" v-html="btnData.lastLine"></div>
   <div class="result-info">
    <div v-for="(tabledata,index) in tablesData" class="tw-key html2pdf__page-break">
      <div class="table-div half-fl" :class="tabledata.type!='over'?'full':'half '">
        <div class="tabl-head" v-html="tabledata.headingTxt"></div>       
        <div class="markings"><div class="avg"><span class="mark-clr"></span><span class="mark-title" v-html="tabledata.avgTxt">Average</span></div><div class="sel"><span class="mark-clr cg-clr"></span><span class="mark-title"  v-html="tabledata.youTxt">You</span></div></div>
        <div class="table-scroll">
        <table>
          <thead>
            <tr>
            <th v-for="(thTxt,thIndex) in tabledata.theadTxts" v-html="thTxt" ></th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(trow,trowIn) in tabledata.trows">
            <td v-if="trow.cat != ''" v-html="trow.cat" :rowspan="trow.catLen ? trow.catLen:'1'" class="td-cat col-wdth"></td>
            <td v-html="trow.subcri" class="col-wdth"></td>
            <td class="bdr-lf w10"><div class="nob" :style="{width:getWidth(trow.avgVal)}"></div><div class="nob" :style="{width:getWidth(trow.youVal)}"></div></td>
            <td class="bdr-lf w10">&nbsp;</td>
            <td class="bdr-lf w10">&nbsp;</td>
            <td class="bdr-lf bdr-rt w10">&nbsp;</td>
            <td v-if="tabledata.type=='over'"><textarea @input="InputText(trow.keyObId,$event)" class="textarea" :value="trow.keyOb" ></textarea></td>
            <td v-if="tabledata.type!='over'" v-html="trow.keyOb"></td>
            <td v-if="tabledata.type!='over'"><textarea @input="InputText(trow.raId,$event)" class="textarea" :value="trow.ra"></textarea></td>
        </tr>
        </tbody>
        </table>
        <div class="significant" v-html="tabledata.lastLine"></div>
        </div>       
      </div>
      <div class="kta-div half-fl" v-if="tabledata.type=='over'" ><div class="kta-inner key-rt-text"><div class="lbl" v-html="tabledata.kTAHead"></div><div class="key-info" ><textarea class="textarea" :value="tabledata.kTATxt" @input="InputText(tabledata.kTAId,$event)" ></textarea></div></div></div>
    </div>
    </div>
  </div>`,
  
  methods:{
    getThHtml:(thTxt,thIndex)=>thIndex==2? thTxt.split("-").map((el)=>'<span>'+el+'</span>').join(' '):thTxt,

    getWidth:(widno)=>("calc("+widno*100+"% + "+widno+"px)"),

    printCmd:()=>{
      var mainElements = document.querySelectorAll(".result-info .significant");
      // .map(el=>{el.style.display = "block"})
      for(var i = 0; i< mainElements.length; i++){
        mainElements[i].style.display = "block";
      }

      var element = document.querySelector('.result-info');
      var opt = {
          margin:       [0.1,0,0.1,0],
          filename:     'result.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 1 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak:{mode: ['css', 'legacy']}
      };
      html2pdf().set(opt).from(element).save().then(function(){
        for(var j = 0; j< mainElements.length; j++){
          mainElements[j].style.display = "none";
        }
      });
      //document.querySelectorAll(".result-info .significant").forEach((el,index)=>{el.style.display = "none"});

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

    lockVal:(forVal)=>{
      document.getElementById("islockClick").value = forVal;
    },
    gotToNext:(forVal)=>{
      document.getElementById("navText").value = forVal;
      document.getElementById("forwardbutton").click();
    },

    InputText:function(id,event){
      let inptText = event.target.value.replace(/\n/g,"\\n").replace(/'/g,"\'").replace(/"/g,'\\"');
      document.getElementById(id).value = inptText;
      this.updateHeight();
    },

    updateHeight:()=>{

      let allElmts =  document.querySelectorAll(".table-div.half");
      for(var i= 0; i<allElmts.length; i++){
        let ownHeight = allElmts[i].offsetHeight;
        let siblin = allElmts[i].nextElementSibling.children[0];
        let siblinHei = siblin.offsetHeight;
        if(ownHeight>siblinHei){
          siblin.setAttribute("style","height:"+ownHeight+"px");
        }
      }
    },
    inputSOmething:function(tableIndex,trowIn,id,event){
      // var inputTxt = event.target.innerText;
      // console.log(inputTxt);
      // console.log(this.tablesData[tableIndex].trows[trowIn].["keyId"])
      // this.tablesData[tableIndex].trows[trowIn].["keyOb"] = inputTxt;
      // console.log(id);
      // document.getElementById(id).value = inputTxt;
    }
  },
  mounted:function(){
    this.updateHeight();
    window.addEventListener("resize",this.updateHeight);

  }
});
