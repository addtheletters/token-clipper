(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a,r=n(0),s=n.n(r),o=n(7),l=n.n(o),i=(n(15),n(1)),c=n(2),u=n(4),f=n(3),d=n(5),p=(n(16),n(8));!function(e){e.BuiltIn="built-in",e.LocalFile="local-file",e.URL="url"}(a||(a={}));var h={"Mask Circle (radius 128px)":"assets/circle-alpha-512.png","Mask Square (side 256px)":"assets/square-alpha-512.png","Yuratzu of Pain (167 x 173px)":"assets/yuratzu.png"},m=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(f.a)(t).call(this,e))).handleURLInputChange=function(e){if(e.target.value&&e.target.value.length>0)try{n.props.onSourceChange(new URL(e.target.value).toString())}catch(t){console.log("SourceSelector: could not interpret URL")}},n.handleFileInputChange=function(e){null!=e.target.files&&e.target.files.length>0?n.props.onSourceChange(URL.createObjectURL(e.target.files[0])):console.error("SourceSelector: file invalid")},n.handleBuiltInChange=function(e){e.target.value in h?(n.setState({selectedBuiltIn:e.target.value}),n.props.onSourceChange(h[e.target.value])):console.error("SourceSelector: built-in doesn't exist: "+e.target.value)},n.handleSourceTypeChange=function(e){n.setState({selectedType:e.target.value}),e.target.value===a.BuiltIn&&n.props.onSourceChange(h[n.state.selectedBuiltIn])},n.state={selectedType:a.LocalFile,selectedBuiltIn:Object.keys(h)[0]},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e,t=Object.keys(a).map(function(e){var t=a[e];return r.createElement("option",{value:t,key:t},function(e){switch(e){case a.BuiltIn:return"Built-in";case a.LocalFile:return"Local file";case a.URL:return"URL";default:return"unknown source type"}}(t))});switch(this.state.selectedType){case a.LocalFile:e=r.createElement("input",{type:"file",accept:"image/*",name:"src-file",onChange:this.handleFileInputChange});break;case a.URL:e=r.createElement("input",{type:"url",name:"src-url",onChange:this.handleURLInputChange});break;case a.BuiltIn:var n=Object.keys(h).map(function(e){return r.createElement("option",{value:e,key:e},e)});e=r.createElement("select",{name:"src-builtin",value:this.state.selectedBuiltIn,onChange:this.handleBuiltInChange},n);break;default:e=r.createElement("div",null,"unknown source type ",this.state.selectedType)}return r.createElement("div",{className:"source-select"},r.createElement("div",{className:"source-select-type"},r.createElement("select",{value:this.state.selectedType,onChange:this.handleSourceTypeChange},t)),r.createElement("div",{className:"source-select-sub"},e))}}]),t}(r.Component),g=100,v=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).handleSliderChange=function(e){n.props.handlers.onSliderChange(e.target.name,parseFloat(e.target.value)/g)},n.handleSourceChange=n.props.handlers.onSourceChange,n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.control.xoffset*g,t=this.props.control.yoffset*g,n=this.props.control.scale*g;return r.createElement("div",{className:"controls"},r.createElement("div",{className:"controls-top"},r.createElement(m,{onSourceChange:this.handleSourceChange})),r.createElement("div",{className:"controls-bottom"},r.createElement("div",null,r.createElement("div",null,"X Offset"),r.createElement("input",{type:"range",name:"xoffset",value:e,min:-g,max:g,onChange:this.handleSliderChange})),r.createElement("div",null,r.createElement("div",null,"Y Offset"),r.createElement("input",{type:"range",name:"yoffset",value:t,min:-g,max:g,onChange:this.handleSliderChange})),r.createElement("div",null,r.createElement("div",null,"Scale"),r.createElement("input",{type:"range",name:"scale",value:n,min:1,max:5*g,onChange:this.handleSliderChange}))))}}],[{key:"getFreshState",value:function(){return{xoffset:0,yoffset:0,scale:1}}},{key:"getHandlers",value:function(e){return{onSliderChange:function(t,n){"xoffset"===t?e.setState({xoffset:n}):"yoffset"===t?e.setState({yoffset:n}):"scale"===t?e.setState({scale:n}):console.log("ImageEffect: unknown slider change "+t)},onSourceChange:function(t){e.setState({src:t})}}}},{key:"getControlState",value:function(e){return{xoffset:e.state.xoffset,yoffset:e.state.yoffset,scale:e.state.scale,src:e.state.src}}},{key:"controlFuncs",get:function(){return{getFreshState:t.getFreshState,getHandlers:t.getHandlers,getControlState:t.getControlState}}}]),t}(r.Component),y="https://cors-anywhere.herokuapp.com/",x={name:"Image",control:v.controlFuncs,preLoad:function(e){e.internal.text="no image"},preDraw:function(e){if(e.state.src&&e.state.src!==e.internal.src){e.internal.src=e.state.src,e.internal.img=null;var t=e.state.src.trim();e.loadImage(t,function(t){e.internal.img=t},function(n){e.internal.text="load failed\n   (CORS not allowed?)",console.log("ImageEffect: load failed, attempting via proxy "+y),e.loadImage(y+t,function(t){console.log("retreived image."),e.internal.img=t},function(e){console.warn("CORS proxy failed.")})})}e.clear()},draw:function(e){if(e.image(e.baseImg,0,0),e.internal.img){var t=e.internal.img.width,n=e.internal.img.height;e.image(e.internal.img,(e.props.size-e.state.scale*t)/2+e.state.xoffset*e.props.size,(e.props.size-e.state.scale*n)/2+e.state.yoffset*e.props.size,e.state.scale*t,e.state.scale*n)}else e.textSize(10*e.state.scale),e.text("\u300c"+e.internal.text+"\n   ("+e.state.xoffset+","+e.state.yoffset+")\n   x "+e.state.scale+"\t\u300d",e.props.size/2+e.state.xoffset*e.props.size,e.props.size/2+e.state.yoffset*e.props.size,200,100)}},C={name:"Mask",control:v.controlFuncs,preLoad:function(e){e.internal.mask=e.createImage(e.props.size,e.props.size),e.internal.text="no mask"},preDraw:function(e){if(e.clear(),x.preDraw(e),e.internal.img){var t=e.internal.img.width,n=e.internal.img.height;e.image(e.internal.img,(e.props.size-e.state.scale*t)/2+e.state.xoffset*e.props.size,(e.props.size-e.state.scale*n)/2+e.state.yoffset*e.props.size,e.state.scale*t,e.state.scale*n);var a=e.props.size*e.props.size*4;e.loadPixels(),e.internal.mask.loadPixels();for(var r=0;r<a;r++)e.internal.mask.pixels[r]=e.pixels[r];e.internal.mask.updatePixels()}e.clear()},draw:function(e){e.internal.img?(e.baseImg.mask(e.internal.mask),e.image(e.baseImg,0,0)):(e.image(e.baseImg,0,0),e.textSize(10*e.state.scale),e.text("\u300c"+e.internal.text+"\n   ("+e.state.xoffset+","+e.state.yoffset+")\n   x "+e.state.scale+"\t\u300d",e.props.size/2+e.state.xoffset*e.props.size,e.props.size/2+e.state.yoffset*e.props.size,200,100))}},E=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).handleTextFieldChanged=function(e){n.props.handlers.onCodeChanged(e.target.value)},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.createElement("div",{className:"controls"},r.createElement("div",{className:"controls-label"},"instance name: `",w,"`"),r.createElement("div",{className:"controls-info"},this.props.control.errorText),r.createElement("div",{className:"controls-area"},r.createElement("textarea",{className:"code-area",value:this.props.control.codeText,onChange:this.handleTextFieldChanged})))}}],[{key:"getFreshState",value:function(){return{codeText:"",errorText:"-"}}},{key:"getHandlers",value:function(e){return{onCodeChanged:function(t){e.setState({codeText:t})}}}},{key:"getControlState",value:function(e){return{codeText:e.state.codeText,errorText:e.state.errorText}}},{key:"controlFuncs",get:function(){return{getFreshState:t.getFreshState,getHandlers:t.getHandlers,getControlState:t.getControlState}}}]),t}(r.Component),b=500,w="pfive";function k(e,t){var n=function(e){var t={timeExpired:!1,timerHandle:0,proxy:void 0};return t.timerHandle=window.setTimeout(function(e){console.log("PaintEffect: Painting code execution time expired."),e.timeExpired=!0},b,t),t.proxy=new Proxy(e,{get:function(e,n,a){if(t.timeExpired)throw EvalError("Code execution time for painting expired ("+b+" ms).");return e[n]}}),t}(t);try{Function(w,'"use strict";{;'+e+";}")(n.proxy)}catch(a){throw window.clearTimeout(n.timerHandle),a}return n}var S,O={name:"Code",control:E.controlFuncs,preLoad:function(e,t){e.internal.oldCode="",e.internal.noError=!1,e.internal.handleError=function(e){t.setState({errorText:e})}},preDraw:function(e){e.clear()},draw:function(e){if(e.image(e.baseImg,0,0),e.state.codeText!==e.internal.oldCode||e.internal.codeValid){if(e.state.codeText&&e.state.codeText.length>0)try{var t=k(e.state.codeText,e);window.clearTimeout(t.timerHandle),e.internal.codeValid=!0,e.internal.handleError("no errors! :)")}catch(n){e.internal.codeValid=!1,e.internal.handleError(n.message)}else e.internal.handleError("-");e.internal.oldCode=e.state.codeText}}};function I(e,t){return function(n){n.props=e.props,n.state=e.state,n.internal={},n.preload=function(){n.baseImg=n.createImage(n.props.size,n.props.size),t.preLoad(n,e)},n.setup=function(){n.createCanvas(n.props.size,n.props.size)},n.draw=function(){!function(){if(n.state=e.state,n.state.basepixels){var a=n.props.size*n.props.size*4;n.baseImg.loadPixels();for(var r=0;r<a;r++)n.baseImg.pixels[r]=n.state.basepixels[r];n.baseImg.updatePixels()}t.preDraw(n)}(),t.draw(n),e.props.onNewOutput&&(n.loadPixels(),e.onOutput(Uint8ClampedArray.from(n.pixels)))}}}!function(e){e.Image="image",e.Mask="mask",e.Code="code"}(S||(S={}));var j=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(f.a)(t).call(this,e))).canvas=void 0,n.last_output=void 0,n.effect=void 0,n.handleBasePixelsChanged=function(e){n.setState({basepixels:e})},n.handleRemoveButtonPressed=function(e){n.props.onRemove&&n.props.onRemove(n.props.ind)},n.onOutput=function(e){if(n.props.onNewOutput){var t=!1;if(n.last_output&&e.length===n.last_output.length){for(var a=0;a<e.length;a++)if(n.last_output[a]!==e[a]){t=!0;break}}else t=!0;t&&(n.props.onNewOutput(n.props.ind,e),n.last_output=e)}},n.getCanvasID=function(){return"image-canvas-"+n.props.ind},n.props.callbackContainer.onNewBasePixels=n.handleBasePixelsChanged,n.effect=function(e){switch(e){case S.Image:return x;case S.Mask:return C;case S.Code:return O;default:return console.warn("tried to get unknown effect "+e+": defaulting to ImageEffect"),x}}(n.props.type),n.state=Object(p.a)({},n.effect.control.getFreshState()),n.canvas=void 0,n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.canvas=new window.p5(I(this,this.effect),document.getElementById(this.getCanvasID()));var e=this.props.callbackContainer.getLastResultPixels();e?this.setState({basepixels:e}):console.log("EffectLayer: no initial base pixels")}},{key:"componentWillUnmount",value:function(){this.canvas&&this.canvas.remove()}},{key:"render",value:function(){var e=r.createElement("div",{className:"controls"});switch(this.props.type){case S.Image:case S.Mask:e=r.createElement(v,{control:this.effect.control.getControlState(this),handlers:this.effect.control.getHandlers(this)});break;case S.Code:e=r.createElement(E,{control:this.effect.control.getControlState(this),handlers:this.effect.control.getHandlers(this)});break;default:console.error("EffectLayer: can't render controls for unknown effect type")}return r.createElement("div",{className:"effect-container",id:"effect-container"+this.props.ind},r.createElement("div",{className:"effect-title"},r.createElement("div",null,"[",this.props.ind+1,"]"),r.createElement("div",null,this.effect.name),r.createElement("button",{className:"effect-remove-button",onClick:this.handleRemoveButtonPressed},"remove")),r.createElement("div",{className:"effect-canvas"},r.createElement("div",{className:"canvas-container",id:this.getCanvasID()})),e)}}]),t}(r.Component),z=function(e){function t(e){var n;for(var a in Object(i.a)(this,t),(n=Object(u.a)(this,Object(f.a)(t).call(this,e))).effects=void 0,n.handleSelection=function(e){var t;for(t=0;t<n.effects.length;t++)n.effects[t]===e.target.value&&n.setState({selected:n.effects[t]})},n.handleAdd=function(){n.props.onAdd(n.state.selected)},n.effects=[],S)n.effects.push(S[a]);return n.state={selected:n.effects[0]},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.effects.map(function(e){return r.createElement("option",{value:e,key:e},e)});return r.createElement("div",null,r.createElement("div",null,"effects?"),r.createElement("select",{value:this.state.selected,onChange:this.handleSelection},e),r.createElement("button",{onClick:this.handleAdd},"add"))}}]),t}(r.Component),N=256,T=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(f.a)(t).call(this,e))).freeKey=0,n.results=[],n.newLayer=function(e){var t=function(){return null};if(n.state.layers.length>=1){var a=n.state.layers.length-1;t=function(){return n.results[a]}}var r=n.state.layers.concat({type:e,key:n.freeKey,onNewBasePixels:function(){},getLastResultPixels:t});n.freeKey++,n.results.push(new Uint8ClampedArray(N*N*4)),n.setState({layers:r})},n.handleNewOutput=function(e,t){n.results[e]=t,e<n.state.layers.length-1&&n.state.layers[e+1].onNewBasePixels(t)},n.handleAddEffect=function(e){n.newLayer(e)},n.handleRemoveEffect=function(e){if(e<0||e>=n.state.layers.length)console.error("can't remove effect at bad index "+e);else{e<n.state.layers.length-1&&(e>0?n.state.layers[e+1].onNewBasePixels(n.results[e-1]):n.state.layers[e+1].onNewBasePixels(new Uint8ClampedArray(N*N*4)));var t=n.state.layers.slice(0,e).concat(n.state.layers.slice(e+1));n.setState({layers:t})}},n.state={layers:[]},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.newLayer(S.Image)}},{key:"render",value:function(){var e=this,t=this.state.layers.map(function(t,n){return s.a.createElement(j,{key:t.key,type:t.type,size:N,ind:n,callbackContainer:t,onNewOutput:e.handleNewOutput,onRemove:e.handleRemoveEffect})});return s.a.createElement("div",{className:"App"},s.a.createElement("h1",null,"Token Clipper"),s.a.createElement("hr",null),s.a.createElement(z,{onAdd:this.handleAddEffect}),s.a.createElement("hr",null),s.a.createElement("div",{className:"effect-list"},t))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.1316e119.chunk.js.map