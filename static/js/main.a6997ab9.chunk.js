(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(18)},16:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n,s=a(0),r=a.n(s),o=a(8),l=a.n(o),c=(a(16),a(1)),i=a(2),u=a(4),p=a(3),h=a(5);a(17);!function(e){e.BuiltIn="built-in",e.LocalFile="local-file",e.URL="url"}(n||(n={}));var d={"Yuratzu of Pain (167 x 173px)":"assets/yuratzu.png","Circle Mask (radius 128px)":"assets/circle-alpha-512.png","Square Mask (side 256px)":"assets/square-alpha-512.png","Ring Mask (radius 128px\xb116px)":"assets/ring-alpha-512.png","Linear Gradient (512px)":"assets/linear-grad-512.png","Bi-linear Gradient (512px)":"assets/bilinear-grad-512.png","Square Gradient (512px)":"assets/square-grad-512.png","Radial Gradient (512px)":"assets/radial-grad-512.png","Spiral CW Gradient (512px)":"assets/spiral_cw-grad-512.png","Spiral CCW Gradient (512px)":"assets/spiral_ccw-grad-512.png"},m=function(e){function t(e){var a;Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).handleURLInputChange=function(e){if(e.target.value&&e.target.value.length>0)try{a.props.onSourceChange(new URL(e.target.value).toString())}catch(t){console.log("SourceSelector: could not interpret URL")}},a.handleFileInputChange=function(e){null!=e.target.files&&e.target.files.length>0?a.props.onSourceChange(URL.createObjectURL(e.target.files[0])):console.error("SourceSelector: file invalid")},a.handleBuiltInChange=function(e){e.target.value in d?(a.setState({selectedBuiltIn:e.target.value}),a.props.onSourceChange(d[e.target.value])):console.error("SourceSelector: built-in doesn't exist: "+e.target.value)},a.handleSourceTypeChange=function(e){a.setState({selectedType:e.target.value}),e.target.value===n.BuiltIn?a.props.onSourceChange(d[a.state.selectedBuiltIn]):a.props.onSourceChange("")};var s=n.BuiltIn,r=Object.keys(d)[0];switch(a.props.parentEffectType){case z.Mask:s=n.BuiltIn,r=Object.keys(d)[1];break;case z.Image:s=n.LocalFile}return a.state={selectedType:s,selectedBuiltIn:r},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){switch(this.state.selectedType){case n.BuiltIn:this.props.onSourceChange(d[this.state.selectedBuiltIn])}}},{key:"render",value:function(){var e,t=Object.keys(n).map(function(e){var t=n[e];return s.createElement("option",{value:t,key:t},function(e){switch(e){case n.BuiltIn:return"Built-in";case n.LocalFile:return"Local file";case n.URL:return"URL";default:return"unknown source type"}}(t))});switch(this.state.selectedType){case n.LocalFile:e=s.createElement("input",{type:"file",accept:"image/*",name:"src-file",onChange:this.handleFileInputChange});break;case n.URL:e=s.createElement("input",{type:"url",name:"src-url",onChange:this.handleURLInputChange});break;case n.BuiltIn:var a=Object.keys(d).map(function(e){return s.createElement("option",{value:e,key:e},e)});e=s.createElement("select",{name:"src-builtin",value:this.state.selectedBuiltIn,onChange:this.handleBuiltInChange},a);break;default:e=s.createElement("div",null,"unknown source type ",this.state.selectedType)}return s.createElement("div",{className:"controls-bar"},s.createElement("div",{className:"source-select-type"},s.createElement("select",{value:this.state.selectedType,onChange:this.handleSourceTypeChange},t)),s.createElement("div",{className:"source-select-sub"},e))}}]),t}(s.Component),f=1e3;function g(e,t,a){return function(n){var s=t+parseFloat(n.target.value)/f*(a-t);return e(n.target.name,s)}}var v,b=function(e){var t,a=f*(e.value-e.min)/(e.max-e.min),n=null;return e.units&&(n=s.createElement("div",{className:"controls-units"},e.units?e.units:"")),s.createElement("div",{className:"controls-bar"},s.createElement("div",{className:"controls-label"},e.label),s.createElement("input",{type:"number",name:e.name,className:"control control-number",value:e.value,onChange:(t=e.onChange,function(e){var a=parseFloat(e.target.value);return t(e.target.name,a)}),step:"any"}),n,s.createElement("input",{type:"range",name:e.name,value:a,className:"control control-slider",min:0,max:f,onChange:g(e.onChange,e.min,e.max)}))};!function(e){e.BLEND="source-over",e.LIGHTEST="lighten",e.DIFFERENCE="difference",e.MULTIPLY="multiply",e.EXCLUSION="exclusion",e.SCREEN="screen",e.REPLACE="copy",e.OVERLAY="overlay",e.HARD_LIGHT="hard-light",e.SOFT_LIGHT="soft-light",e.DODGE="color-dodge",e.BURN="color-burn",e.ADD="lighter"}(v||(v={}));var C=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).handleSliderChange=function(e,t){a.props.handlers.onSliderChange(e,t)},a.handleCheckboxChange=function(e){a.props.handlers.onInvertChange(e.target.checked)},a.handleSourceChange=a.props.handlers.onSourceChange,a.handleBlendModeChange=function(e){a.props.handlers.onBlendModeChange(e.target.value)},a.handleResetPress=function(){a.props.handlers.onSliderChange("xoffset",0),a.props.handlers.onSliderChange("yoffset",0),a.props.handlers.onSliderChange("scale",1)},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e="Invert";switch(this.props.parentEffectType){case z.Image:e="Draw Behind";break;case z.Mask:e="Inverse Alpha"}var t=Object.keys(v).map(function(e){var t=v[e];return s.createElement("option",{value:t,key:e},e)}),a=null;return this.props.parentEffectType===z.Image&&(a=s.createElement("label",{className:"controls-bar"},s.createElement("div",{className:"controls-label"},"Blend Mode"),s.createElement("select",{className:"controls-select",value:this.props.control.blendMode,onChange:this.handleBlendModeChange},t))),s.createElement("div",{className:"controls"},s.createElement("div",{className:"controls-top"},s.createElement(m,{onSourceChange:this.handleSourceChange,parentEffectType:this.props.parentEffectType}),a),s.createElement("div",{className:"controls-bottom"},s.createElement("label",{className:"controls-bar"},s.createElement("div",{className:"controls-label"},e),s.createElement("input",{type:"checkbox",className:"controls-toggle control",checked:this.props.control.invert,onChange:this.handleCheckboxChange})),s.createElement(b,{label:"X offset",name:"xoffset",value:this.props.control.xoffset,onChange:this.handleSliderChange,min:-1,max:1,units:"x"}),s.createElement(b,{label:"Y offset",name:"yoffset",value:this.props.control.yoffset,onChange:this.handleSliderChange,min:-1,max:1,units:"x"}),s.createElement(b,{label:"Scale",name:"scale",value:this.props.control.scale,onChange:this.handleSliderChange,min:1e-4,max:5,units:"x"}),s.createElement("button",{onClick:this.handleResetPress},"Reset")))}}],[{key:"getFreshState",value:function(){return{xoffset:0,yoffset:0,scale:1,invert:!1,blendMode:"source-over"}}},{key:"getHandlers",value:function(e){return{onSliderChange:function(t,a){"xoffset"===t?e.setState({xoffset:a}):"yoffset"===t?e.setState({yoffset:a}):"scale"===t?e.setState({scale:a}):console.log("ImageEffect: unknown slider change "+t)},onInvertChange:function(t){e.setState({invert:t})},onSourceChange:function(t){e.setState({src:t})},onBlendModeChange:function(t){e.setState({blendMode:t})}}}},{key:"getControlState",value:function(e){return{xoffset:e.state.xoffset,yoffset:e.state.yoffset,scale:e.state.scale,src:e.state.src,invert:e.state.invert,blendMode:e.state.blendMode}}},{key:"controlFuncs",get:function(){return{getFreshState:t.getFreshState,getHandlers:t.getHandlers,getControlState:t.getControlState}}}]),t}(s.Component),x="https://cors-anywhere.herokuapp.com/",y={name:"Image",control:C.controlFuncs,preLoad:function(e){e.internal.text="no image"},preDraw:function(e){if(e.state.src&&e.state.src!==e.internal.src){e.internal.src=e.state.src,e.internal.img=null;var t=e.state.src.trim();e.loadImage(t,function(t){e.internal.img=t},function(a){e.internal.text="load failed\n   (CORS not allowed?)",console.log("ImageEffect: load failed, attempting via proxy "+x),e.loadImage(x+t,function(t){console.log("retreived image."),e.internal.img=t},function(e){console.warn("CORS proxy failed.")})})}e.blendMode(e.BLEND),e.clear()},draw:function(e){if(e.internal.img){var t=e.baseImg,a=e.internal.img;e.state.invert&&(t=e.internal.img,a=e.baseImg);var n=function(t){if(t===e.internal.img){var a=t.width,n=t.height;e.image(t,(e.props.size-e.state.scale*a)/2+e.state.xoffset*e.props.size,(e.props.size-e.state.scale*n)/2+e.state.yoffset*e.props.size,e.state.scale*a,e.state.scale*n)}else e.image(t,0,0)};if(n(t),e.state.blendMode&&e.state.blendMode!==e.internal.badMode)try{e.blendMode(e.state.blendMode)}catch(s){e.internal.badMode=e.state.blendMode,console.error("Could not switch to blend mode "+e.state.blendMode),console.error(s)}n(a)}else e.image(e.baseImg,0,0),e.textSize(10*e.state.scale),e.text("\u300c"+e.internal.text+"\n   ("+e.state.xoffset.toFixed(2)+","+e.state.yoffset.toFixed(2)+")\n   x "+e.state.scale.toFixed(2)+"\t\u300d",e.props.size/2+e.state.xoffset*e.props.size,e.props.size/2+e.state.yoffset*e.props.size,200,100)},mouseDragged:function(e,t,a){var n=B(e,t);n&&a.setState({xoffset:e.state.xoffset+n[0]/e.props.size,yoffset:e.state.yoffset+n[1]/e.props.size})},mouseWheel:function(e,t,a){var n=t.delta;n||(n=t.deltaY),n&&a.setState({scale:e.state.scale-T(n,.05)})}},E={name:"Mask",control:C.controlFuncs,mouseDragged:y.mouseDragged,mouseWheel:y.mouseWheel,preLoad:function(e){e.internal.mask=e.createImage(e.props.size,e.props.size),e.internal.text="no mask"},preDraw:function(e){if(e.clear(),y.preDraw(e),e.internal.img){var t=e.internal.img.width,a=e.internal.img.height;e.image(e.internal.img,(e.props.size-e.state.scale*t)/2+e.state.xoffset*e.props.size,(e.props.size-e.state.scale*a)/2+e.state.yoffset*e.props.size,e.state.scale*t,e.state.scale*a);var n=e.props.size*e.props.size*4;if(e.loadPixels(),e.internal.mask.loadPixels(),e.state.invert)for(var s=0;s<n;s++)e.internal.mask.pixels[s]=255-e.pixels[s];else for(var r=0;r<n;r++)e.internal.mask.pixels[r]=e.pixels[r];e.internal.mask.updatePixels()}e.clear()},draw:function(e){e.internal.img?(e.baseImg.mask(e.internal.mask),e.image(e.baseImg,0,0)):(e.image(e.baseImg,0,0),e.textSize(10*e.state.scale),e.text("\u300c"+e.internal.text+"\n   ("+e.state.xoffset+","+e.state.yoffset+")\n   x "+e.state.scale+"\t\u300d",e.props.size/2+e.state.xoffset*e.props.size,e.props.size/2+e.state.yoffset*e.props.size,200,100))}},S=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).handleTextFieldChange=function(e){a.props.handlers.onCodeChange(e.target.value)},a.handleCheckboxChange=function(e){a.props.handlers.onShouldEvalChange(e.target.checked)},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.createElement("div",{className:"controls"},s.createElement("div",{className:"controls-top"},s.createElement("label",{className:"controls-bar"},s.createElement("div",{className:"controls-label"},"Run"),s.createElement("input",{type:"checkbox",className:"controls-toggle control",checked:this.props.control.shouldEval,onChange:this.handleCheckboxChange})),s.createElement("div",{className:"controls-bar controls-info"}," instance name: `",w,"`"),s.createElement("div",{className:"controls-bar controls-info"}," ",this.props.control.errorText," ")),s.createElement("div",{className:"controls-bottom"},s.createElement("div",{className:"controls-area"},s.createElement("textarea",{className:"code-area",value:this.props.control.codeText,onChange:this.handleTextFieldChange}))))}}],[{key:"getFreshState",value:function(){return{codeText:"",errorText:"[-------------]",shouldEval:!1}}},{key:"getHandlers",value:function(e){return{onCodeChange:function(t){e.setState({codeText:t})},onShouldEvalChange:function(t){e.setState({shouldEval:t})}}}},{key:"getControlState",value:function(e){return{codeText:e.state.codeText,errorText:e.state.errorText,shouldEval:e.state.shouldEval}}},{key:"controlFuncs",get:function(){return{getFreshState:t.getFreshState,getHandlers:t.getHandlers,getControlState:t.getControlState}}}]),t}(s.Component),k=500,w="pfive";function M(e,t){var a=function(e){var t={timeExpired:!1,timerHandle:0,proxy:void 0};return t.timerHandle=window.setTimeout(function(e){console.log("PaintEffect: Painting code execution time expired."),e.timeExpired=!0},k,t),t.proxy=new Proxy(e,{get:function(e,a,n){if(t.timeExpired)throw EvalError("Code execution time for painting expired ("+k+" ms).");return e[a]}}),t}(t);try{Function(w,'"use strict";{;'+e+";}")(a.proxy)}catch(n){throw window.clearTimeout(a.timerHandle),n}return a}var I={name:"Code",control:S.controlFuncs,preLoad:function(e,t){e.internal.oldCode="",e.internal.codeValid=!1,e.internal.handleError=function(e){t.setState({errorText:e})}},preDraw:function(e){e.clear()},draw:function(e){if(e.image(e.baseImg,0,0),e.state.codeText!==e.internal.oldCode||e.internal.codeValid)if(e.state.shouldEval&&e.state.codeText&&e.state.codeText.length>0){try{var t=M(e.state.codeText,e);window.clearTimeout(t.timerHandle),e.internal.codeValid=!0,e.internal.handleError("[no errors! :)]")}catch(a){e.internal.codeValid=!1,e.internal.handleError(a.message)}e.internal.oldCode=e.state.codeText}else e.internal.handleError("[-------------]")}};function N(e,t){return function(a){t(e,a.target.value)}}var z,O=function(e){if(e.values&&e.rows*e.cols!==e.values.length)return console.error("MatrixTable: table rows and columns don't match values"),console.error(e.values),s.createElement("div",null,"bad table.");function t(t){var a=Array.from(Array(e.cols).keys()).map(function(a){return s.createElement("td",{key:"col-"+a},function(t,a){var n=t*e.cols+a,r=null;return e.labels&&(r=s.createElement("div",{className:"controls-label"},e.labels[n])),e.showInput&&e.showInput[n]?s.createElement("div",{className:"matrix-cell"},r,s.createElement("input",{key:"cell-"+n,type:"number",value:e.values[n],onChange:N(n,e.onChange)})):s.createElement("div",null,r,e.values[n])}(t,a))});return s.createElement("tr",{key:"row-"+t},a)}var a=Array.from(Array(e.rows).keys()).map(function(e){return t(e)});return s.createElement("table",null,s.createElement("tbody",null,a))},Y=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).handleSliderChange=function(e,t){a.props.handlers.onSliderChange(e,t)},a.handleCheckboxChange=function(e){a.props.handlers.onUseMatrixChange(e.target.checked)},a.handleMatrixChange=function(e,t){var n=Array.from(a.props.control.matrix);n[e]=parseFloat(t);var s=Array.from(a.props.control.viewMatrix);s[e]=t,a.props.handlers.onViewMatrixChange(s),a.props.handlers.onInputMatrixChange(n)},a.handleResetPressed=function(){a.props.control.useMatrix?(a.props.handlers.onInputMatrixChange([1,0,0,0,1,0]),a.props.handlers.onViewMatrixChange(["1","0","0","0","1","0"])):(a.props.handlers.onSliderChange("translateX",0),a.props.handlers.onSliderChange("translateY",0),a.props.handlers.onSliderChange("scaleX",1),a.props.handlers.onSliderChange("scaleY",1),a.props.handlers.onSliderChange("rotate",0),a.props.handlers.onSliderChange("shearX",0),a.props.handlers.onSliderChange("shearY",0))},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e={},t=[];return t=this.props.control.viewMatrix?this.props.control.viewMatrix.concat(["0","0","1"]):this.props.control.matrix.map(function(e){return e.toString()}).concat(["0","0","1"]),e=this.props.control.useMatrix?s.createElement("div",null,s.createElement(O,{rows:3,cols:3,onChange:this.handleMatrixChange,values:t,labels:["a","c","e","b","d","f"],showInput:[!0,!0,!0,!0,!0,!0,!1,!1,!1]})):s.createElement("div",null,s.createElement(b,{label:"translate X",name:"translateX",value:this.props.control.translateX,onChange:this.handleSliderChange,min:-2,max:2,units:"x"}),s.createElement(b,{label:"translate Y",name:"translateY",value:this.props.control.translateY,onChange:this.handleSliderChange,min:-2,max:2,units:"x"}),s.createElement(b,{label:"scale X",name:"scaleX",value:this.props.control.scaleX,onChange:this.handleSliderChange,min:-5,max:5,units:"x"}),s.createElement(b,{label:"scale Y",name:"scaleY",value:this.props.control.scaleY,onChange:this.handleSliderChange,min:-5,max:5,units:"x"}),s.createElement(b,{label:"shear X",name:"shearX",value:this.props.control.shearX,onChange:this.handleSliderChange,min:-Math.PI/2,max:Math.PI/2,units:"rad"}),s.createElement(b,{label:"shear Y",name:"shearY",value:this.props.control.shearY,onChange:this.handleSliderChange,min:-Math.PI/2,max:Math.PI/2,units:"rad"}),s.createElement(b,{label:"rotate",name:"rotate",value:this.props.control.rotate,onChange:this.handleSliderChange,min:-Math.PI,max:Math.PI,units:"rad"})),s.createElement("div",{className:"controls"},s.createElement("div",{className:"controls-top"},s.createElement("label",{className:"controls-bar"},s.createElement("div",{className:"controls-label"},"Custom Matrix"),s.createElement("input",{type:"checkbox",className:"controls-toggle control",checked:this.props.control.useMatrix,onChange:this.handleCheckboxChange}))),s.createElement("div",{className:"controls-bottom"},e,s.createElement("button",{className:"controls-bar",onClick:this.handleResetPressed},"Reset")))}}],[{key:"getFreshState",value:function(){return{useMatrix:!1,translateX:0,translateY:0,scaleX:1,scaleY:1,rotate:0,shearX:0,shearY:0,matrix:[1,0,0,0,1,0],viewMatrix:["1","0","0","0","1","0"]}}},{key:"getHandlers",value:function(e){return{onSliderChange:function(t,a){switch(t){case"translateX":e.setState({translateX:a});break;case"translateY":e.setState({translateY:a});break;case"scaleX":e.setState({scaleX:a});break;case"scaleY":e.setState({scaleY:a});break;case"rotate":e.setState({rotate:a});break;case"shearX":e.setState({shearX:a});break;case"shearY":e.setState({shearY:a});break;default:return void console.log("TransformEffect: unknown slider change "+t)}},onUseMatrixChange:function(t){e.setState({useMatrix:t})},onInputMatrixChange:function(t){e.setState({matrix:t})},onViewMatrixChange:function(t){e.setState({viewMatrix:t})}}}},{key:"getControlState",value:function(e){return{useMatrix:e.state.useMatrix,translateX:e.state.translateX,translateY:e.state.translateY,scaleX:e.state.scaleX,scaleY:e.state.scaleY,rotate:e.state.rotate,shearX:e.state.shearX,shearY:e.state.shearY,matrix:e.state.matrix,viewMatrix:e.state.viewMatrix}}},{key:"controlFuncs",get:function(){return{getHandlers:t.getHandlers,getFreshState:t.getFreshState,getControlState:t.getControlState}}}]),t}(s.Component),X={name:"Transform",control:Y.controlFuncs,preLoad:function(e){},preDraw:function(e){e.clear(),e.resetMatrix()},draw:function(e){if(e.state.useMatrix){var t=e.state.matrix;e.applyMatrix(t[0],t[3],t[1],t[4],t[2],t[5]),e.image(e.baseImg,0,0)}else e.translate(e.props.size/2,e.props.size/2),e.scale(e.state.scaleX,e.state.scaleY),e.translate(e.state.translateX*e.props.size,e.state.translateY*e.props.size),e.shearX(e.state.shearX),e.shearY(e.state.shearY),e.rotate(e.state.rotate),e.image(e.baseImg,-e.props.size/2,-e.props.size/2)},mouseDragged:function(e,t,a){var n=B(e,t);n&&a.setState({translateX:e.state.translateX+n[0]/e.props.size,translateY:e.state.translateY+n[1]/e.props.size})},mouseWheel:function(e,t,a){var n=t.delta;n||(n=t.deltaY),t.deltaX?t.altKey?a.setState({shearY:e.state.shearY+T(t.deltaX,-.05)}):a.setState({shearX:e.state.shearX+T(t.deltaX,-.05)}):n&&(t.altKey?a.setState({rotate:e.state.rotate+T(n,-.025)}):a.setState({scaleX:e.state.scaleX-T(n,.05),scaleY:e.state.scaleX-T(n,.05)}))}},j=100;function T(e,t){return e>=j?Math.log10(e)*t:e<=-j?-1*Math.log10(-e)*t:e*t}function B(e,t){var a=null;return t.movementX||t.movementY||0===t.movementX&&0===t.movementY?a=[t.movementX,t.movementY]:(e.mouseX||e.mouseY||e.pmouseX||e.pmouseY||0===e.mouseX&&0===e.mouseY&&0===e.pmouseX&&0===e.pmouseY)&&(a=[e.mouseX-e.pmouseX,e.mouseY-e.pmouseY]),a}!function(e){e.Image="image",e.Mask="mask",e.Code="code",e.Transform="transform"}(z||(z={}));var P=function(e){function t(e){var a;for(var n in Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).effects=void 0,a.handleSelection=function(e){var t;for(t=0;t<a.effects.length;t++)a.effects[t]===e.target.value&&a.setState({selected:a.effects[t]})},a.handleAdd=function(){a.props.onAdd(a.state.selected)},a.effects=[],z)a.effects.push(z[n]);return a.state={selected:a.effects[0]},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.effects.map(function(e){return s.createElement("option",{value:e,key:e},e)});return s.createElement("div",null,s.createElement("div",null,"effects?"),s.createElement("select",{value:this.state.selected,onChange:this.handleSelection},e),s.createElement("button",{onClick:this.handleAdd},"add"))}}]),t}(s.Component),F=a(9),L=a(6),D="p2d";function R(e,t){return function(a){function n(){return a.mouseX>0&&a.mouseY>0&&a.mouseX<a.props.size&&a.mouseY<a.props.size}a.props=e.props,a.state=e.state,a.internal={},a.preload=function(){a.baseImg=a.createImage(a.props.size,a.props.size),t.preLoad(a,e)},a.setup=function(){a.pixelDensity(1),a.createCanvas(a.props.size,a.props.size,D)},a.draw=function(){!function(){a.state=e.state;var n=a.props.size*a.props.size*4;if(a.baseImg.loadPixels(),a.state.basepixels)for(var s=0;s<n;s++)a.baseImg.pixels[s]=a.state.basepixels[s];else for(var r=0;r<n;r++)a.baseImg.pixels[r]=0;a.baseImg.updatePixels(),t.preDraw(a)}(),t.draw(a),a.loadPixels(),e.onOutput(Uint8ClampedArray.from(a.pixels))},a.mouseDragged=function(s){if(n()&&t.mouseDragged){var r=s;t.mouseDragged(a,r,e),r.preventDefault()}},a.mouseWheel=function(s){if(n()&&t.mouseWheel){var r=s;t.mouseWheel(a,r,e),r.preventDefault()}}}}var A=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).EMPTY_BASE=void 0,a.canvas=void 0,a.effect=void 0,a.handleBasePixelsChanged=function(e){e?a.setState({basepixels:e}):a.setState({basepixels:a.EMPTY_BASE})},a.handleRemoveButtonPressed=function(e){a.props.onRemove&&a.props.onRemove(a.props.ind)},a.handleSaveButtonPressed=function(e){a.canvas&&a.canvas.saveCanvas("token-"+Object(L.a)(a).props.size+"px.png")},a.handleMoveUpPressed=function(e){a.props.onMove&&a.props.onMove(a.props.ind,1)},a.handleMoveDownPressed=function(e){a.props.onMove&&a.props.onMove(a.props.ind,-1)},a.onOutput=function(e){a.props.onNewOutput(a.props.ind,e)},a.getCanvasID=function(){return"image-canvas-"+a.props.callbackContainer.key},a.EMPTY_BASE=new Uint8ClampedArray(a.props.size*a.props.size*4),a.props.callbackContainer.onNewBasePixels=a.handleBasePixelsChanged,a.effect=function(e){switch(e){case z.Image:return y;case z.Mask:return E;case z.Code:return I;case z.Transform:return X;default:return console.warn("tried to get unknown effect "+e+": defaulting to ImageEffect"),y}}(a.props.type),a.state=Object(F.a)({},a.effect.control.getFreshState()),a.canvas=void 0,a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.canvas=new window.p5(R(this,this.effect),document.getElementById(this.getCanvasID()))}},{key:"componentWillUnmount",value:function(){this.canvas&&this.canvas.remove()}},{key:"render",value:function(){var e=s.createElement("div",{className:"controls"});switch(this.props.type){case z.Image:case z.Mask:e=s.createElement(C,{control:this.effect.control.getControlState(this),handlers:this.effect.control.getHandlers(this),parentEffectType:this.props.type});break;case z.Code:e=s.createElement(S,{control:this.effect.control.getControlState(this),handlers:this.effect.control.getHandlers(this)});break;case z.Transform:e=s.createElement(Y,{control:this.effect.control.getControlState(this),handlers:this.effect.control.getHandlers(this)});break;default:console.error("EffectLayer: can't render controls for unknown effect type")}return s.createElement("div",{className:"effect-container",id:"effect-container"+this.props.callbackContainer.key},s.createElement("div",{className:"effect-left-unit"},s.createElement("div",{className:"effect-title"},s.createElement("button",{className:"effect-move-up",onClick:this.handleMoveUpPressed,disabled:this.props.isLast},"\u25b2"),s.createElement("hr",null),s.createElement("div",null,"[",this.props.ind+1,"]"),s.createElement("div",null,this.effect.name),s.createElement("button",{className:"effect-save-button",onClick:this.handleSaveButtonPressed},"save"),s.createElement("button",{className:"effect-remove-button",onClick:this.handleRemoveButtonPressed},"remove"),s.createElement("hr",null),s.createElement("button",{className:"effect-move-down",onClick:this.handleMoveDownPressed,disabled:this.props.isFirst},"\u25bc")),s.createElement("div",{className:"effect-canvas"},s.createElement("div",{className:"canvas-container",id:this.getCanvasID()}))),e)}}]),t}(s.PureComponent),U=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).freeKey=0,a.results=[],a.newLayer=function(e){var t=a.state.layers.concat({type:e,key:a.freeKey,onNewBasePixels:function(){}});a.freeKey++,a.results.push(new Uint8ClampedArray(a.props.canvasSize*a.props.canvasSize*4)),a.setState({layers:t})},a.handleNewOutput=function(e,t){a.results[e]=t,e<a.state.layers.length-1&&a.state.layers[e+1].onNewBasePixels(t)},a.handleAddEffect=function(e){a.newLayer(e)},a.handleRemoveEffect=function(e){if(e<0||e>=a.state.layers.length)console.error("can't remove effect at bad index "+e);else{e<a.state.layers.length-1&&(e>0?a.state.layers[e+1].onNewBasePixels(a.results[e-1]):a.state.layers[e+1].onNewBasePixels()),a.results.splice(e,1);var t=a.state.layers.slice(0,e).concat(a.state.layers.slice(e+1));a.setState({layers:t})}},a.handleMoveEffect=function(e,t){var n=e+t;(n<0||n>=a.state.layers.length)&&console.error("can't move effect "+e+" to position "+n);var s=a.state.layers.slice(),r=s.splice(e,1)[0];return s.splice(n,0,r),a.setState({layers:s}),n},a.state={layers:[]},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.newLayer(z.Image)}},{key:"componentDidUpdate",value:function(){this.state.layers.length>0&&this.state.layers[0].onNewBasePixels()}},{key:"render",value:function(){var e=this,t=this.state.layers.map(function(t,a){return s.createElement(A,{key:t.key,type:t.type,size:e.props.canvasSize,ind:a,callbackContainer:t,onNewOutput:e.handleNewOutput,onRemove:e.handleRemoveEffect,onMove:e.handleMoveEffect,isFirst:0===a,isLast:a===e.state.layers.length-1})});return s.createElement("div",{key:this.props.canvasSize,className:"layer-stack"},s.createElement("hr",null),s.createElement(P,{onAdd:this.handleAddEffect}),s.createElement("hr",null),s.createElement("div",{className:"list-container"},s.createElement("div",{className:"list-side-spacer"}),s.createElement("div",{className:"effect-list"},t),s.createElement("div",{className:"list-side-spacer"})))}}]),t}(s.Component),H=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).handleSubmit=function(e){var t=parseInt(a.state.inputCanvasSize);t&&a.props.onSizeChange(t),e.preventDefault()},a.handleInputChanged=function(e){a.setState({inputCanvasSize:e.target.value})},a.state={inputCanvasSize:W.toString()},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.createElement("div",{className:"size-selector"},s.createElement("form",{onSubmit:this.handleSubmit},s.createElement("div",null,"Size (pixels):"),s.createElement("input",{type:"number",min:1,max:G,value:this.state.inputCanvasSize,onChange:this.handleInputChanged}),s.createElement("input",{type:"submit",value:"apply"})))}}]),t}(s.Component),W=Math.pow(2,8),G=Math.pow(2,10),V=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).handleSizeChange=function(e){e>0&&e<=G?a.setState({canvasSize:e}):console.error("Canvas size of "+e+" is not supported (max "+G+").")},a.state={canvasSize:W},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Token Clipper"),r.a.createElement(H,{onSizeChange:this.handleSizeChange}),r.a.createElement(U,{canvasSize:this.state.canvasSize}))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.a6997ab9.chunk.js.map