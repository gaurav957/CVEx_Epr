"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Vue.component("header-panel", {
  props: ["headerData"],
  template: "<div class=\"header-wrapper\">\n\t\t\t\t<div class=\"left-section\">\n\t\t\t\t\t<div class=\"burger-wrapper\">\n\t\t\t\t\t\t<div id=\"nav-icon3\" :class=\"headerData.leftPanelOpen=='true' ?'open':''\" @click=toggle>\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t<span></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"logo-wrapper\">\n\t\t\t\t\t\t<img width=150 height=48 :src=\"headerData.logo\" />\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"right-section\">\n\t\t\t\t\t<div><h3 v-html=\"headerData.headerTitle\">Contact Center Walkthrough</h3></div>\n\t\t\t\t</div>\n\t\t\t</div>",
  methods: {
    toggle: function toggle() {
      var _this = this;

      if (this.headerData.leftPanelOpen == 'false') {
        this.headerData.leftPanelOpen = 'true';
        document.getElementById("main-wrapper").classList.add("toggled");
      } else {
        this.headerData.leftPanelOpen = 'false';
        document.getElementById("main-wrapper").classList.remove("toggled");
      }

      document.querySelector(".left-panel-open").value = this.headerData.leftPanelOpen;
      setTimeout(function () {
        _this.$parent.updateRightHeight();
      }, 300); //calling parent
    }
  },
  mounted: function mounted() {
    //console.log(this.headerData.leftPanelOpen == 'true')
    if (this.headerData.leftPanelOpen == 'true') {
      document.getElementById("main-wrapper").classList.add("toggled");
    } else {
      document.getElementById("main-wrapper").classList.remove("toggled");
    }

    document.querySelector(".left-panel-open").value = this.headerData.leftPanelOpen;
  }
});
Vue.component("footer-panel", {
  props: ["footerData"],
  data: function data() {
    return {
      nextEnable: true,
      prevEnable: true,
      submitStatus: false
    };
  },
  template: "<div class=\"footer clearfix\">\n  <div class=\"navigation-block clearfix\">\n    <div class=\"right\">\n      <span class=\"tt-ans\" ><span v-html=\"footerData.ttlCnt\" ></span> <span v-html=\"footerData.answrdQues\"></span>/<span v-html=\"footerData.totalQues\"></span></span>\n\t\t   <div class=\"btn-item frw\" :class=\"prevEnable == true?'':'disable'\" v-html=footerData.prevTxt @click=\"prevEnable == true?PrevPage():''\" ></div>\n       <div class=\"btn-item frw\" :class=\"nextEnable == true?'':'disable'\" v-html=footerData.forwardTxt @click=\"nextEnable == true?nextPage(footerData.forwardVal):''\"></div>\n       <div class=\"btn-item frw\" :class=\"submitStatus == true?'':'disable'\" @click=\"submitStatus == true?checkSubmitStatus():''\"  v-html=footerData.submitTxt ></div>\n\t  </div>\n  </div>\n  <div class=\"copyright-block clearfix\"><div class=\"footer-mck f-left\"><img :src=\"footerData.footerLogo\" alt=\"\" title=\"\"></div><div class=\"copy-rt r-right\" v-html=footerData.copyrghtTxt></div></div>\n</div>",
  mounted: function mounted() {
    document.querySelector("#ttl-attmpt").value = this.footerData.answrdQues; // document.querySelector("#cur-prcntge").value = this.footerData.percentge;
  },
  methods: {
    nextPage: function nextPage() {
      // document.getElementById("navText").value = forwardBtnVal;
      // document.getElementById("forwardbutton").click();
      if (this.footerData.totalQues == this.footerData.answrdQues) {
        this.$parent.NextPageBtnClckParent(); //calling parent
      } else {
        document.getElementById("errorDiv").style.visibility = "visible";
      }
    },
    PrevPage: function PrevPage() {
      this.$parent.PrevPageBtnClckParent(); //calling parent
    },
    disablePrev: function disablePrev() {
      this.prevEnable = false;
    },
    disableNext: function disableNext(ansdQues, ttlQues) {
      this.nextEnable = false;
    },
    enableSubmit: function enableSubmit() {
      this.submitStatus = true;
    },
    disableSubmit: function disableSubmit() {
      this.submitStatus = false;
    },
    checkSubmitStatus: function checkSubmitStatus() {
      document.getElementById("left-panel-menu-slctn").value = this.footerData.submitVal;
      document.getElementById("left-panel-subMenu-slctn").value = this.footerData.submitVal;
      document.getElementById("forwardbutton").click();
    },
    updateSubmitinFooter: function updateSubmitinFooter(totalAnswered, totalQuestions) {
      if (totalAnswered == totalQuestions) {
        this.enableSubmit();
      } else {
        this.disableSubmit();
      }
    },
    setSectionQuestions: function setSectionQuestions(sectionAnswered, sectionQuestions) {
      document.querySelector("#ttl-attmpt").value = sectionAnswered;
      this.footerData.answrdQues = sectionAnswered;
      this.footerData.totalQues = sectionQuestions;
    }
  }
});
Vue.component("left-panel", {
  props: ["LeftData"],
  template: "\n              <div class='side-nav-wrapper'>\n              <div class='side-nav-scroll'>\n                <ul v-if=\"LeftData.links.length>0\" class=\"menu-list\">\n                  <li v-for=\"(item,index) in LeftData.links\" :key=\"item.menuVal\">\n                    <div class=\"nav-item\" :data-menuval = item.menuVal :id='\"menu_\"+index' :class=\"{selected:LeftData.seltdParentVal == item.menuVal,open:LeftData.seltdParentVal == item.menuVal}\"\n                    v-on:click.stop=\"item.sublinks.length ? openBelow(index, $event):navClick(item.menuVal,'')\">\n                      <span>{{item.menuTxt}}</span>\n                      <span class=\"rt-prgs\">\n                        <span v-if=\"item.initialQAnsd && item.totalQues\">\n                          {{item.initialQAnsd+\"\"+item.intialUponTtl+\"\"+item.totalQues}}\n                        </span>\n                        <span v-if=\"LeftData.seltdParentVal == item.menuVal && item.sublinks.length>0 \" class=\"plus-icon\"></span>\n                        <span v-if=\"item.sublinks.length>0 && LeftData.seltdParentVal != item.menuVal\" class=\"plus-icon\"></span>\n                      </span>\n                    </div>\n                    <ul v-if=\"item.sublinks.length>0\" class=\"submenu-list menuAnimate\">\n                      <li v-for=\"sublink of item.sublinks\" class=\"sub-links\" \n                      @click=\"navClick(item.menuVal,sublink.sublinkVal)\"\n                      :class=\"{selected:LeftData.seltdChildVal == sublink.sublinkVal}\"><div class=\"nav-item\">\n                      <span>{{sublink.sublinkTxt}}</span>\n                      <span class=\"rt-prgs\">\n                        <span v-if=\"sublink.initialSubQAnsd && sublink.totalSubQues\">\n                        <span class='attemptQues' v-html=\"sublink.initialSubQAnsd\"></span>{{sublink.intialUponTtl+\"\"+sublink.totalSubQues}}\n                        </span>\n                      </span>\n                      </div></li>\n                    </ul>\n                  </li>\n                </ul>\n                </div>\n              </div>\n    ",
  mounted: function mounted() {
    var _iterator = _createForOfIteratorHelper(this.LeftData.links),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var link = _step.value;

        if (this.LeftData.seltdParentVal == link.menuVal && link.sublinks.length > 0) {
          var el = document.querySelector("[data-menuVal='" + link.menuVal + "']").nextElementSibling;
          el.classList.add('open');
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    document.getElementById("left-panel-menu-slctn").value = this.LeftData.seltdParentVal;
    document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.seltdChildVal;
    var linksLen = this.LeftData.links.length;

    if (this.LeftData.links[0].sublinks.length == 0 && this.LeftData.seltdParentVal == this.LeftData.links[0].menuVal) {
      this.$parent.disPrevParent(); //calling parent
    } else if (this.LeftData.links[0].sublinks.length != 0 && this.LeftData.seltdParentVal == this.LeftData.links[0].menuVal && this.LeftData.seltdChildVal == this.LeftData.links[0].sublinks[0].sublinkVal) {
      this.$parent.disPrevParent(); //calling parent
    } else if (this.LeftData.links[linksLen - 1].sublinks.length == 0 && this.LeftData.seltdParentVal == this.LeftData.links[linksLen - 1].menuVal) {
      this.$parent.disNextParent(); //calling parent
    } else if (this.LeftData.links[linksLen - 1].sublinks.length != 0 && this.LeftData.seltdParentVal == this.LeftData.links[linksLen - 1].menuVal) {
      var subLinkLen = this.LeftData.links[linksLen - 1].sublinks.length;

      if (this.LeftData.seltdChildVal == this.LeftData.links[linksLen - 1].sublinks[subLinkLen - 1].sublinkVal) {
        this.$parent.disNextParent(); //calling parent
      }
    } //OverlayScrollbars(document.querySelector('.side-nav-scroll'), { });


    this.checkSubmitBtn();
    this.updatteAllQuestions();
    this.updateSectionQuestions();
    document.addEventListener("DOMContentLoaded", function () {
      //The first argument are the elements to which the plugin shall be initialized
      //The second argument has to be at least a empty object or a object with your desired options
      OverlayScrollbars(document.querySelector('.side-nav-scroll'), {});
    });
  },
  methods: {
    navClick: function navClick(menuVal, sublinkVal) {
      document.getElementById("left-panel-menu-slctn").value = menuVal;
      document.getElementById("left-panel-subMenu-slctn").value = sublinkVal;
      document.getElementById("forwardbutton").click();
    },
    openBelow: function openBelow(index, e) {
      var node = e.target;

      if (node.className.indexOf('nav-item') < 0) {
        while ((node = node.parentNode) && node.className.indexOf('nav-item') < 0) {
          ;
        }
      }

      if (node.classList.contains('open')) {
        node.classList.remove("open");
      } else {
        node.classList.add("open");
      }

      var id = 'menu_' + index;
      var el = document.getElementById(id).nextElementSibling;

      if (el.classList.contains('open')) {
        el.classList.remove("open");
      } else {
        el.classList.add("open");
      }
    },
    updateQuesAttempt: function updateQuesAttempt(ttlAttempt) {
      var totalCatQuestions = 0;

      var _iterator2 = _createForOfIteratorHelper(this.LeftData.links),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var link = _step2.value;

          if (this.LeftData.seltdParentVal == link.menuVal) {
            if (link.sublinks.length) {
              var _iterator3 = _createForOfIteratorHelper(link.sublinks),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var sublink = _step3.value;

                  if (sublink.sublinkVal == this.LeftData.seltdChildVal) {
                    sublink.initialSubQAnsd = ttlAttempt;
                    totalCatQuestions = sublink.totalSubQues;
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }

              var parentAttemp = 0;

              var _iterator4 = _createForOfIteratorHelper(link.sublinks),
                  _step4;

              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var _sublink = _step4.value;
                  parentAttemp += Number(_sublink.initialSubQAnsd);
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }

              link.initialQAnsd = parentAttemp;
            } else {
              link.initialQAnsd = ttlAttempt;
              totalCatQuestions = link.totalQues;
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.checkSubmitBtn();
    },
    checkSubmitBtn: function checkSubmitBtn() {
      if (!Object.entries) {
        Object.entries = function (obj) {
          var ownProps = Object.keys(obj),
              i = ownProps.length,
              resArray = new Array(i); // preallocate the Array

          while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
          }

          return resArray;
        };
      }

      var mandQuesVal = this.LeftData.mandatoryQuesVal;
      var ttlManAttempt = 0;
      var ttlManQues = 0;

      for (var _i = 0, _Object$entries = Object.entries(this.LeftData.links); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            linkIndex = _Object$entries$_i[0],
            link = _Object$entries$_i[1];

        linkIndex = Number(linkIndex);

        if (link.sublinks.length != 0) {
          for (var _i2 = 0, _Object$entries2 = Object.entries(this.LeftData.links[linkIndex].sublinks); _i2 < _Object$entries2.length; _i2++) {
            var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                subLinkIndex = _Object$entries2$_i[0],
                sublink = _Object$entries2$_i[1];

            subLinkIndex = Number(subLinkIndex);

            if (mandQuesVal.indexOf(sublink.sublinkVal) != -1) {
              ttlManAttempt += Number(sublink.initialSubQAnsd);
              ttlManQues += Number(sublink.totalSubQues);
            }
          }
        } else {
          if (mandQuesVal.indexOf(link.menuVal) != -1) {
            ttlManAttempt += Number(link.initialQAnsd);
            ttlManQues += Number(link.totalQues);
          }
        }
      }

      if (ttlManAttempt == ttlManQues) {
        this.$parent.updatePrgsSubmit('enable'); //calling parent
      } else {
        this.$parent.updatePrgsSubmit('disable'); //calling parent
      }
    },
    PrevbtnClick: function PrevbtnClick() {
      if (!Object.entries) {
        Object.entries = function (obj) {
          var ownProps = Object.keys(obj),
              i = ownProps.length,
              resArray = new Array(i); // preallocate the Array

          while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
          }

          return resArray;
        };
      }

      for (var _i3 = 0, _Object$entries3 = Object.entries(this.LeftData.links); _i3 < _Object$entries3.length; _i3++) {
        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
            linkIndex = _Object$entries3$_i[0],
            link = _Object$entries3$_i[1];

        linkIndex = Number(linkIndex);

        if (this.LeftData.seltdParentVal == link.menuVal) {
          if (link.sublinks.length) {
            for (var _i4 = 0, _Object$entries4 = Object.entries(link.sublinks); _i4 < _Object$entries4.length; _i4++) {
              var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
                  subIndex = _Object$entries4$_i[0],
                  sublink = _Object$entries4$_i[1];

              subIndex = Number(subIndex);

              if (sublink.sublinkVal == this.LeftData.seltdChildVal) {
                if (subIndex == 0) {
                  if (this.LeftData.links[linkIndex - 1].sublinks.length == 0) {
                    document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex - 1].menuVal;
                    document.getElementById("left-panel-subMenu-slctn").value = '';
                  } else {
                    var sublinkLen = this.LeftData.links[linkIndex - 1].sublinks.length;
                    document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex - 1].menuVal;
                    document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex - 1].sublinks[sublinkLen - 1].sublinkVal;
                  }
                } else {
                  document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex].menuVal;
                  document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex].sublinks[subIndex - 1].sublinkVal;
                }
              }
            }
          } else {
            if (this.LeftData.links[linkIndex - 1].sublinks.length == 0) {
              document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex - 1].menuVal;
              document.getElementById("left-panel-subMenu-slctn").value = '';
            } else {
              var _sublinkLen = this.LeftData.links[linkIndex - 1].sublinks.length;
              document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex - 1].menuVal;
              document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex - 1].sublinks[_sublinkLen - 1].sublinkVal;
            }
          }
        }
      } //alert(document.getElementById("left-panel-menu-slctn").value);
      //alert(document.getElementById("left-panel-subMenu-slctn").value);


      document.getElementById("forwardbutton").click();
    },
    NextbtnClick: function NextbtnClick() {
      if (!Object.entries) {
        Object.entries = function (obj) {
          var ownProps = Object.keys(obj),
              i = ownProps.length,
              resArray = new Array(i); // preallocate the Array

          while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
          }

          return resArray;
        };
      }

      for (var _i5 = 0, _Object$entries5 = Object.entries(this.LeftData.links); _i5 < _Object$entries5.length; _i5++) {
        var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i5], 2),
            linkIndex = _Object$entries5$_i[0],
            link = _Object$entries5$_i[1];

        linkIndex = Number(linkIndex);

        if (this.LeftData.seltdParentVal == link.menuVal) {
          if (link.sublinks.length) {
            for (var _i6 = 0, _Object$entries6 = Object.entries(link.sublinks); _i6 < _Object$entries6.length; _i6++) {
              var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i6], 2),
                  subIndex = _Object$entries6$_i[0],
                  sublink = _Object$entries6$_i[1];

              subIndex = Number(subIndex);

              if (sublink.sublinkVal == this.LeftData.seltdChildVal) {
                if (subIndex == link.sublinks.length - 1) {
                  if (this.LeftData.links[linkIndex + 1].sublinks.length == 0) {
                    document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex + 1].menuVal;
                    document.getElementById("left-panel-subMenu-slctn").value = '';
                  } else {
                    document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex + 1].menuVal;
                    document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex + 1].sublinks[0].sublinkVal;
                  }
                } else {
                  document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex].menuVal;
                  document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex].sublinks[subIndex + 1].sublinkVal;
                }
              }
            }
          } else {
            if (this.LeftData.links[linkIndex + 1].sublinks.length == 0) {
              document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex + 1].menuVal;
              document.getElementById("left-panel-subMenu-slctn").value = '';
            } else {
              document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex + 1].menuVal;
              document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex + 1].sublinks[0].sublinkVal;
            }
          }
        }
      } //alert(document.getElementById("left-panel-menu-slctn").value);
      //alert(document.getElementById("left-panel-subMenu-slctn").value);


      document.getElementById("forwardbutton").click();
    },
    updatteAllQuestions: function updatteAllQuestions() {
      if (!Object.entries) {
        Object.entries = function (obj) {
          var ownProps = Object.keys(obj),
              i = ownProps.length,
              resArray = new Array(i); // preallocate the Array

          while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
          }

          return resArray;
        };
      }

      var totalQuestions = 0;
      var totalAnswered = 0;

      for (var _i7 = 0, _Object$entries7 = Object.entries(this.LeftData.links); _i7 < _Object$entries7.length; _i7++) {
        var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i7], 2),
            linkIndex = _Object$entries7$_i[0],
            link = _Object$entries7$_i[1];

        linkIndex = Number(linkIndex);

        if (link.sublinks.length) {
          var _iterator5 = _createForOfIteratorHelper(link.sublinks),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var sublink = _step5.value;
              totalQuestions += Number(sublink.totalSubQues);
              totalAnswered += Number(sublink.initialSubQAnsd);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        } else {
          totalQuestions += Number(link.totalQues);
          totalAnswered += Number(link.initialQAnsd);
        }
      }

      this.$parent.setTotalQuestions(totalAnswered, totalQuestions); //calling parent
    },
    updateSectionQuestions: function updateSectionQuestions() {
      if (!Object.entries) {
        Object.entries = function (obj) {
          var ownProps = Object.keys(obj),
              i = ownProps.length,
              resArray = new Array(i); // preallocate the Array

          while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
          }

          return resArray;
        };
      }

      var sectionQuestions = 0;
      var sectionAnswered = 0;

      for (var _i8 = 0, _Object$entries8 = Object.entries(this.LeftData.links); _i8 < _Object$entries8.length; _i8++) {
        var _Object$entries8$_i = _slicedToArray(_Object$entries8[_i8], 2),
            linkIndex = _Object$entries8$_i[0],
            link = _Object$entries8$_i[1];

        linkIndex = Number(linkIndex);

        if (this.LeftData.seltdParentVal == link.menuVal) {
          if (link.sublinks.length) {
            for (var _i9 = 0, _Object$entries9 = Object.entries(link.sublinks); _i9 < _Object$entries9.length; _i9++) {
              var _Object$entries9$_i = _slicedToArray(_Object$entries9[_i9], 2),
                  subIndex = _Object$entries9$_i[0],
                  sublink = _Object$entries9$_i[1];

              subIndex = Number(subIndex);

              if (sublink.sublinkVal == this.LeftData.seltdChildVal) {
                sectionQuestions = sublink.totalSubQues;
                sectionAnswered = sublink.initialSubQAnsd;
              }
            }
          } else {
            sectionQuestions = link.totalQues;
            sectionAnswered = link.initialQAnsd;
          }
        }
      }

      this.$parent.setSecQuestions(sectionAnswered, sectionQuestions); //calling parent
    }
  }
});
Vue.component("right-panel", {
  props: ["rightData", "progressData", "leftData"],
  template: "<div class=\"right-panel-wrapper\">\n  <div class=\"right-panel clearfix\">\n    <progress-panel ref=\"prsPanel\" :right-data=\"rightData\" :progress-data=\"progressData\"></progress-panel>\n    <div class=\"survey-wrapper\"> \n      <div class=\"scrollable\">   \n      <div class=\"accordian-inner\" v-for=\"(category,catIn) in rightData.categories\">\n        <h2 class=\"accordion active\" @click=\"openAccordion($event)\" v-html='category.heading'></h2>\n        <div class=\"accordion-panel\" >\n          <div class=\"accordion-resize\" >\n            <div v-for=\"(subCategory,subCatIn) in category.subCategories\">\n            <div class=\"survey-title\"  v-if=\"subCategory.subHeading\" v-html='subCategory.subHeading'></div>\n            <div\n              v-for=\"(question, quesInd) in subCategory.questions\"\n              class=\"question-resize\"\n            >\n              <div class=\"survey-info\">\n                <span class=\"survey-info-messg\" v-html='question.quesText'></span>\n                <span class=\"instruct-info\"  v-if=\"question.quesDescription\">                 \n                  <span class=\"\" v-html='question.quesDescription'></span>\n                </span>\n              </div>\n              <div id=\"errorDiv\" class=\"error-message\" v-html=\"rightData.errorMessage\"></div>\n              <div class=\"survey-type\">\n                <div class=\"survey-row\" :data-id=\"catIn+'_'+subCatIn+'_'+quesInd\">\n                  <div\n                    class=\"s-col\"\n                    v-for=\"(option, index) in question.options\"\n                  >\n                    <div class=\"survey-card\" :data_id=\"option.optionsId\" \n                    :class=\"{selectedsurvey:question.selected==option.optionsId}\" @click=\"handleAnswerSelect(option.optionsId,catIn,subCatIn, quesInd)\">\n                      <div class=\"s-crad-header\" v-html='rightData.ratingTxt[index]'></div>\n                      <div class=\"s-crad-body\" v-html='option.optionText'></div>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"ctrl-sm-chk\">\n                  <div class=\"catg-selection\">\n                      <div class=\"pure-radiobutton\">\n                        <input :checked=\"question.selected == question.naId\" :id=\"'cus_'+question.naId\" :name=\"'cus_'+question.naId\" type=\"radio\" value=\"3\" class=\"radio\" />                               \n                        <label @click=\"handleAnswerSelect(question.naId,catIn,subCatIn, quesInd)\" :for=\"'cus_'+question.naId\" v-html=\"rightData.naText\">Hello</label>\n                     </div>\n                  </div> \n               </div>\n                <div class=\"other-type-row\">\n                  <div class=\"other-quest\" v-html='rightData.cmntHeding'></div>\n                  <div class=\"other-form\" style=\"display:none\">\n                    <input\n                      type=\"text\"\n                      class=\"other-form-ctrl\"\n                      :placeholder=\"rightData.cmntPlaceHolder\"\n                      :value=\"question.detailVal\"\n                      @input=\"handleKeyDown(catIn,subCatIn,quesInd,question.detailId,$event)\"\n                    />\n                  </div>\n                </div>\n                <div class=\"survey-type-overlay\" v-if=\"rightData.readdOnly\"></div>\n              </div>\n            </div>\n            </div>\n          </div>\n          </div>\n        </div>\n      </div>\n      </div>\n      </div>\n    </div>\n  </div>\n</div>",
  mounted: function mounted() {
    var _this2 = this;

    this.setHeight();
    window.addEventListener("resize", this.setHeight);
    document.addEventListener("DOMContentLoaded", function () {
      //The first argument are the elements to which the plugin shall be initialized
      //The second argument has to be at least a empty object or a object with your desired options
      // OverlayScrollbars(document.querySelector('.side-nav-scroll'), { });
      var instance = OverlayScrollbars(document.querySelector('.scrollable'), {}); // instance.scroll({ el: document.getElementById('hellomoto'), block : "center"}, 100);

      var scrollHeight = _this2.rightData.scrollPosition;

      if (scrollHeight == "") {
        scrollHeight = 0;
      }

      instance.scroll({
        x: 0,
        y: scrollHeight
      }, 100);
    });
  },
  methods: {
    openAccordion: function openAccordion(e) {
      e.stopPropagation();

      if (e.target.className.split(' ').indexOf("active") == -1) {
        e.target.className += " active";
        e.target.nextElementSibling.style.maxHeight = e.target.nextElementSibling.scrollHeight + "px";
      } else {
        e.target.className = e.target.className.replace(" active", "");
        e.target.nextElementSibling.style.maxHeight = null;
      }

      this.checkgroupUngroup();
    },
    handleKeyDown: function handleKeyDown(catIn, subCatIn, quesInd, ques_id, e) {
      this.rightData.categories[catIn].subCategories[subCatIn].questions[quesInd].detailVal = e.target.value;

      if (document.getElementById(ques_id)) {
        document.getElementById(ques_id).value = e.target.value.replace(/\n/g, "\\n").replace(/'/g, "\'").replace(/"/g, '\\"');
      }
    },
    handleAnswerSelect: function handleAnswerSelect(dataId, catIn, subCatIn, quesInd) {
      this.rightData.categories[catIn].subCategories[subCatIn].questions[quesInd].selected = dataId;
      document.getElementById("errorDiv").style.visibility = "hidden";

      if (document.getElementById(dataId)) {
        document.getElementById(dataId).click();
      }

      var ttlAttempt = 0;

      var _iterator6 = _createForOfIteratorHelper(this.rightData.categories),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var category = _step6.value;

          var _iterator7 = _createForOfIteratorHelper(category.subCategories),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var subCat = _step7.value;

              var _iterator8 = _createForOfIteratorHelper(subCat.questions),
                  _step8;

              try {
                for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                  var question = _step8.value;

                  if (question.selected != "") {
                    ttlAttempt++;
                  }
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      this.$parent.updateLeftQuestionAttempt(ttlAttempt); //calling parent

      this.$parent.getTotalQuestions(); //calling parent
      // this.$refs.prsPanel.updateProgresbar(ttlAttempt);//calling child component
    },
    setHeight: function setHeight() {
      if (!Object.entries) {
        Object.entries = function (obj) {
          var ownProps = Object.keys(obj),
              i = ownProps.length,
              resArray = new Array(i); // preallocate the Array

          while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
          }

          return resArray;
        };
      }

      var surRows = document.getElementsByClassName("survey-row");

      for (var i = 0; i < surRows.length; i++) {
        //var i = 0; i < surRows.length; i++ //let surRow of surRows
        var headHght = 0;
        var bodyHght = 0;

        for (var j = 0; j < surRows[i].children.length; j++) {
          //var i = 0; i < surRows.length; i++ //let rowChild of surRow.children
          var srvyCard = surRows[i].children[j].children[0];
          srvyCard.children[0].setAttribute("style", "height:auto");
          srvyCard.children[1].setAttribute("style", "height:auto");
          var sCradHeaderHght = srvyCard.children[0].offsetHeight;
          var sCradBodyHght = srvyCard.children[1].offsetHeight;

          if (headHght < sCradHeaderHght) {
            headHght = sCradHeaderHght;
          }

          if (bodyHght < sCradBodyHght) {
            bodyHght = sCradBodyHght;
          } //srvyCard.children[0].setAttribute("style","height:"+headHght+"px");
          //srvyCard.children[1].setAttribute("style","height:"+bodyHght+"px");

        }

        var rowHeaders = surRows[i].getElementsByClassName("s-crad-header");
        var rowBodies = surRows[i].getElementsByClassName("s-crad-body");
        var rowHeadersArr = []; //[...rowHeaders];

        var rowBodiesArr = []; //[...rowBodies];

        for (var k = 0; k < rowHeaders.length; k++) {
          rowHeadersArr.push(rowHeaders[k]);
        }

        for (var l = 0; l < rowBodies.length; l++) {
          rowBodiesArr.push(rowBodies[l]);
        }

        rowHeadersArr.map(function (el) {
          el.setAttribute("style", "height:" + headHght + "px");
        });
        rowBodiesArr.map(function (el) {
          el.setAttribute("style", "height:" + bodyHght + "px");
        });
      }
    },
    enabDisSubmit: function enabDisSubmit(endis) {
      this.$refs.prsPanel.enabDisSubmit(endis); //calling child component
    },
    toltiptoggle: function toltiptoggle(e) {
      //e.preventDefault();
      if (e.target.parentNode.classList.contains("tooltip-show")) {
        e.target.parentNode.classList.remove("tooltip-show");
      } else {
        e.target.parentNode.classList.add("tooltip-show");
      }
    },
    setScrollHeight: function setScrollHeight() {
      var instance = OverlayScrollbars(document.querySelector('.scrollable'), {});
      var scrollHeight = instance.scroll().position.y;
      document.getElementById("scroll-value").value = scrollHeight;
    },
    updateprsbar: function updateprsbar(totalAnswered, totalQuestions) {
      this.$refs.prsPanel.updateProgresbar(totalAnswered, totalQuestions); //calling child component
    },
    groupQuestions: function groupQuestions() {
      document.querySelectorAll(".accordion").forEach(function (element, index) {
        element.classList.remove("active");
        element.nextElementSibling.style.maxHeight = null;
      });
      this.checkgroupUngroup();
    },
    ungroupQuestions: function ungroupQuestions() {
      document.querySelectorAll(".accordion").forEach(function (element, index) {
        element.classList.add("active");
        element.nextElementSibling.style.maxHeight = element.nextElementSibling.scrollHeight + "px";
      });
      this.checkgroupUngroup();
    },
    checkgroupUngroup: function checkgroupUngroup() {
      var _this3 = this;

      var grouped = true;
      document.querySelectorAll(".accordion").forEach(function (element, index) {
        if (element.classList.contains("active")) {
          grouped = false;
        }

        _this3.$refs.prsPanel.udpdateGroupInfo(grouped); //calling child component

      });
    },
    updateSubmitinFooter: function updateSubmitinFooter(totalAnswered, totalQuestions) {
      this.$parent.updateSubmitinFooter(totalAnswered, totalQuestions); //calling parent
    }
  }
});
Vue.component("progress-panel", {
  props: ["rightData", "progressData"],
  data: function data() {
    return {
      submitStatus: false,
      curGroup: true,
      totalAnserwed: 0,
      totalQuestions: 0,
      totalPercentage: 0
    };
  },
  template: "<div class='progress-panel'>\n        <div class='progress-panel-inner'>\n            <div class='progress'>\n                <div class='perc-data'>\n                    <span v-html='progressData.answerTxt'>Answered</span> <span v-html='this.totalAnserwed'>1</span> <span v-html='progressData.of'>of</span> <span v-html='this.totalQuestions'>12</span> <span>(</span><span v-html='this.totalPercentage'>12</span><span>%</span><span>)</span>\n                </div>\n                <div class='progress-bar'>\n                    <div id=\"myProgress\">\n                        <div id=\"myBar\" :style=\"{ width: this.totalPercentage+'%'}\"></div>\n                    </div>\n                </div>\n            </div>\n            <div class='btn-outer'>\n            <!--save-->\n              <div class='btn-item frw' v-if=\"this.curGroup==false\" v-html='progressData.groupTxt' @click=\"groupit()\">Save</div>\n              <div class='btn-item frw' v-if=\"this.curGroup==true\" v-html='progressData.unGroupTxt' @click=\"ungroupit()\">Save</div>\n              <div class='btn-item frw' :class=\"rightData.readdOnly == true ? 'disable':'null'\" v-html='progressData.saveTxt' @click=savePage>Save</div>\n              <!--save-->\n              <!--submit-->\n              <div class='btn-item frw submit-hide' :class=\"this.submitStatus == false ? 'disable':'null'\" @click=checkSubmitStatus(this.submitStatus) v-html='progressData.submitTxt' >Submit</div>\n              <!--submit-->\n            </div>\n        </div>\n    </div>",
  mounted: function mounted() {//document.querySelector("#ttl-attmpt").value = this.progressData.answrdQues;
    //document.querySelector("#cur-prcntge").value = this.progressData.percentge;
  },
  methods: {
    nextPage: function nextPage(forwardBtnVal) {
      document.getElementById("left-panel-menu-slctn").value = forwardBtnVal;
      document.getElementById("left-panel-subMenu-slctn").value = forwardBtnVal;
      document.getElementById("forwardbutton").click();
    },
    savePage: function savePage() {
      this.$parent.setScrollHeight(); //calling parent

      document.getElementById("forwardbutton").click();
    },
    // updateProgresbar:function(ttlAttempt){
    //   this.progressData.answrdQues = ttlAttempt;
    //   var percentage = parseInt((ttlAttempt/Number(this.progressData.totalQues))*100);
    //   this.progressData.percentge = percentage;
    //   document.querySelector("#ttl-attmpt").value = ttlAttempt;
    //   document.querySelector("#cur-prcntge").value = percentage;
    // },
    updateProgresbar: function updateProgresbar(totalAnswered, totalQuestions) {
      this.totalAnserwed = totalAnswered;
      this.totalQuestions = totalQuestions;
      var percentage = parseInt(totalAnswered / totalQuestions * 100);
      this.totalPercentage = percentage;
      this.$parent.updateSubmitinFooter(totalAnswered, totalQuestions); //calling parent right-panel
      //document.querySelector("#ttl-attmpt").value = totalAnswered;
      //document.querySelector("#cur-prcntge").value = percentage;
    },
    enabDisSubmit: function enabDisSubmit(endis) {
      if (endis == 'enable') {
        this.submitStatus = true;
      } else {
        this.submitStatus = false;
      }
    },
    checkSubmitStatus: function checkSubmitStatus(submitStatus) {
      //v-on="this.submitStatus == false ? {} : {click:()=>nextPage(progressData.submitVal)}"
      if (submitStatus != false) {
        this.nextPage(this.progressData.submitVal);
      }
    },
    ungroupit: function ungroupit() {
      this.$parent.ungroupQuestions();
    },
    groupit: function groupit() {
      this.$parent.groupQuestions();
    },
    udpdateGroupInfo: function udpdateGroupInfo(grouped) {
      this.curGroup = grouped;
    }
  }
});
var eventInputvueObj = new Vue({
  el: "#main-wrapper",
  data: {
    alldata: {},
    headerdata: {},
    leftdata: {},
    rightdata: {},
    progressdata: {},
    footerdata: {}
  },
  methods: {
    handleSelect: function handleSelect() {
      var count = 0;
      this.rightdata.categories.forEach(function (cat) {
        cat.subCategories.forEach(function (subCat) {
          subCat.questions.forEach(function (ques) {
            if (ques.selected != "") {
              count++;
            }
          });
        });
      });
      this.progressdata.answrdQues = count;
      var percentage = count / Number(this.progressdata.totalQues) * 100;
      this.progressdata.percentge = percentage;
      document.getElementById("myBar").style.width = percentage + "%";
    },
    updateLeftQuestionAttempt: function updateLeftQuestionAttempt(ttlAttempt) {
      this.$refs.leftPanel.updateQuesAttempt(ttlAttempt);
    },
    PrevPageBtnClckParent: function PrevPageBtnClckParent() {
      this.$refs.leftPanel.PrevbtnClick();
    },
    NextPageBtnClckParent: function NextPageBtnClckParent() {
      this.$refs.leftPanel.NextbtnClick();
    },
    disPrevParent: function disPrevParent() {
      this.$refs.footerPanel.disablePrev();
    },
    disNextParent: function disNextParent() {
      this.$refs.footerPanel.disableNext();
    },
    updatePrgsSubmit: function updatePrgsSubmit(endis) {
      this.$refs.rightPanel.enabDisSubmit(endis);
    },
    updateRightHeight: function updateRightHeight() {
      this.$refs.rightPanel.setHeight();
    },
    getTotalQuestions: function getTotalQuestions() {
      this.$refs.leftPanel.updatteAllQuestions();
      this.$refs.leftPanel.updateSectionQuestions();
    },
    setTotalQuestions: function setTotalQuestions(totalAnswered, totalQuestions) {
      // this.$refs.footerPanel.setAllQuestions(totalAnswered,totalQuestions);
      this.$refs.rightPanel.updateprsbar(totalAnswered, totalQuestions);
    },
    setSecQuestions: function setSecQuestions(sectionAnswered, sectionQuestions) {
      this.$refs.footerPanel.setSectionQuestions(sectionAnswered, sectionQuestions);
    },
    setScrollHeight: function setScrollHeight() {
      this.$refs.rightPanel.setScrollHeight();
    },
    updateSubmitinFooter: function updateSubmitinFooter(totalAnswered, totalQuestions) {
      this.$refs.footerPanel.updateSubmitinFooter(totalAnswered, totalQuestions);
    }
  },
  created: function created() {
    if (document.getElementById("jsonData")) {
      this.alldata = JSON.parse(document.getElementById("jsonData").innerText);
      this.headerdata = this.alldata.headerData;
      this.leftdata = this.alldata.leftData;
      this.rightdata = this.alldata.rightData;
      this.progressdata = this.alldata.progressData;
      this.footerdata = this.alldata.footerData;
    }
  }
});