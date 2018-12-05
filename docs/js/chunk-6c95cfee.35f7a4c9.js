(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c95cfee"],{"12b2":function(t,e,i){"use strict";var a=i("2b0e");e["a"]=a["a"].extend({name:"v-card-title",functional:!0,props:{primaryTitle:Boolean},render:function(t,e){var i=e.data,a=e.props,r=e.children;return i.staticClass=("v-card__title "+(i.staticClass||"")).trim(),a.primaryTitle&&(i.staticClass+=" v-card__title--primary"),t("div",i,r)}})},"1fe6":function(t,e,i){"use strict";var a=i("4578"),r=i.n(a);r.a},"23bf":function(t,e,i){"use strict";var a=i("2b0e");e["a"]=a["a"].extend({name:"measurable",props:{height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],width:[Number,String]}})},"253d":function(t,e,i){},2677:function(t,e,i){"use strict";var a=i("8654"),r=(i("7e63"),i("d9bd")),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},s={name:"v-textarea",extends:a["a"],props:{autoGrow:Boolean,noResize:Boolean,outline:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return n({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},a["a"].computed.classes.call(this,null))},dynamicHeight:function(){return this.autoGrow?this.inputHeight:"auto"},isEnclosed:function(){return this.textarea||a["a"].computed.isEnclosed.call(this)},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){!this.internalChange&&this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout(function(){t.autoGrow&&t.calculateInputHeight()},0),this.autoGrow&&this.noResize&&Object(r["b"])('"no-resize" is now implied when using "auto-grow", and can be removed',this)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height=0;var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=a["a"].methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){a["a"].methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.internalChange=!0,this.$emit("keydown",t)}}},o=i("7cf7"),c=i("ab6d");i.d(e,"a",function(){return u});var u={functional:!0,$_wrapperFor:a["a"],props:{textarea:Boolean,multiLine:Boolean},render:function(t,e){var i=e.props,n=e.data,l=e.slots,d=e.parent;Object(c["a"])(n);var h=Object(o["a"])(l(),t);return i.textarea&&Object(r["d"])("<v-text-field textarea>","<v-textarea outline>",u,d),i.multiLine&&Object(r["d"])("<v-text-field multi-line>","<v-textarea>",u,d),i.textarea||i.multiLine?(n.attrs.outline=i.textarea,t(s,n,h)):t(a["a"],n,h)}}},"26e5":function(t,e,i){},"2a34":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",[i("v-img",{attrs:{height:"120px",src:"https://cdn.vuetifyjs.com/images/cards/plane.jpg"}},[i("v-container",{attrs:{"fill-height":"",fluid:""}},[i("v-layout",[i("v-flex",{attrs:{xs12:"","align-end":"","d-flex":""}},[i("span",{staticClass:"headline white--text"},[t._v("Sign up")])])],1)],1)],1),i("v-card-text",[i("div",{staticClass:"error",domProps:{innerHTML:t._s(t.error)}}),i("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-text-field",{attrs:{"prepend-icon":"title",type:"text",label:"Full Name",rules:t.nameRules,required:""},model:{value:t.fullname,callback:function(e){t.fullname=e},expression:"fullname"}}),i("v-text-field",{attrs:{"prepend-icon":"person",type:"text",label:"Username",rules:t.nameRules,required:""},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),i("v-text-field",{attrs:{"prepend-icon":"lock",type:"password",label:"Password",rules:t.passwordRules,required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),i("vue-recaptcha",{ref:"recaptcha",attrs:{sitekey:t.sitekey},on:{verify:t.onVerify}})],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"primary",disabled:!t.valid},on:{click:t.register}},[t._v("\n      Register\n    ")])],1)],1)},r=[],n=i("be94"),s=(i("cadf"),i("551c"),i("097d"),i("2f62")),o=i("5cac"),c={name:"SignupForm",components:{VueRecaptcha:function(){return i.e("chunk-2d2245be").then(i.bind(null,"e096"))}},data:function(){return{fullname:"",username:"",nameRules:[function(t){return!!t||"Name is required"}],password:"",passwordRules:[function(t){return!!t||"Password is required"},function(t){return t&&t.length>=8||"Password must be more than 8 characters"}],valid:!1,recaptchaResponse:null,sitekey:"6Lf4G2gUAAAAANVI2ndLFcJUrzGm7qXUGndJbT4r"}},mounted:function(){this.valid=!1},computed:Object(n["a"])({},Object(s["c"])({error:function(t){return t.auth.error}})),methods:{register:function(){var t=this,e={credential:{fullname:this.fullname,username:this.username,password:this.password},recaptcha:this.recaptchaResponse};this.recaptchaResponse=null,this.$refs.recaptcha.reset(),this.$store.dispatch(o["c"],e).then(function(){t.$refs.form.reset(),t.$emit("done")})},onVerify:function(t){this.recaptchaResponse=t}}},u=c,l=(i("1fe6"),i("2877")),d=i("6544"),h=i.n(d),m=i("8336"),p=i("b0af"),f=i("99d9"),g=i("a523"),v=i("0e8f"),b=i("4bd4"),w=i("adda"),y=i("a722"),S=i("9910"),x=i("2677"),_=Object(l["a"])(u,a,r,!1,null,"15590545",null);_.options.__file="SignUpForm.vue";e["default"]=_.exports;h()(_,{VBtn:m["a"],VCard:p["a"],VCardActions:f["a"],VCardText:f["b"],VContainer:g["a"],VFlex:v["a"],VForm:b["a"],VImg:w["a"],VLayout:y["a"],VSpacer:S["a"],VTextField:x["a"]})},4578:function(t,e,i){},"4bd4":function(t,e,i){"use strict";i("26e5");var a=i("94ab");e["a"]={name:"v-form",mixins:[Object(a["b"])("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",function(i){e.$set(e.errorBag,t._uid,i)},{immediate:!0})},a={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?a.shouldValidate=t.$watch("shouldValidate",function(r){r&&(e.errorBag.hasOwnProperty(t._uid)||(a.valid=i(t)))}):a.valid=i(t),a},validate:function(){var t=this.inputs.filter(function(t){return!t.validate(!0)}).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout(function(){t.errorBag={}},0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout(function(){t.errorBag={}},0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find(function(e){return e._uid===t._uid});if(e){var i=this.watchers.find(function(t){return t._uid===e._uid});i.valid&&i.valid(),i.shouldValidate&&i.shouldValidate(),this.watchers=this.watchers.filter(function(t){return t._uid!==e._uid}),this.inputs=this.inputs.filter(function(t){return t._uid!==e._uid}),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},"4c34":function(t,e,i){},"4c94":function(t,e,i){},"7e63":function(t,e,i){},"99d9":function(t,e,i){"use strict";var a=i("80d2"),r=i("b0af"),n=i("adda"),s=i("d9bd"),o=n["a"].extend({name:"v-card-media",mounted:function(){Object(s["d"])("v-card-media",this.src?"v-img":"v-responsive",this)}}),c=i("12b2"),u=i("2b0e");i.d(e,"a",function(){return l}),i.d(e,"b",function(){return d});var l=u["a"].extend(Object(a["d"])("v-card__actions")),d=u["a"].extend(Object(a["d"])("v-card__text"));r["a"],c["a"]},adda:function(t,e,i){"use strict";i("253d"),i("4c34");var a=i("23bf"),r=i("58df"),n=i("80d2"),s=Object(r["a"])(a["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number]},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content"},this.$slots.default)}},render:function(t){return t("div",{staticClass:"v-responsive",style:{height:Object(n["b"])(this.height),maxHeight:Object(n["b"])(this.maxHeight),maxWidth:Object(n["b"])(this.maxWidth),width:Object(n["b"])(this.width)},on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),o=s,c=i("d9bd");e["a"]=o.extend({name:"v-img",props:{alt:String,contain:Boolean,src:{type:[String,Object],default:""},gradient:String,lazySrc:String,srcset:String,sizes:String,position:{type:String,default:"center center"},transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0}},computed:{computedAspectRatio:function(){return this.normalisedSrc.aspect},normalisedSrc:function(){return"string"===typeof this.src?{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||this.calculatedAspectRatio)}:{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect||this.calculatedAspectRatio)}},__cachedImage:function(){if(!this.normalisedSrc.src&&!this.normalisedSrc.lazySrc)return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient("+this.gradient+")"),e&&t.push('url("'+e+'")');var i=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[i]):i}},watch:{src:function(){this.isLoading?this.loadImage():this.init()},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(){if(this.normalisedSrc.lazySrc){var t=new Image;t.src=this.normalisedSrc.lazySrc,this.pollForSize(t,null)}this.normalisedSrc.src&&this.loadImage()},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src)},onError:function(){Object(c["a"])("Image load failed\n\nsrc: "+this.normalisedSrc.src,this),this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,e=new Image;this.image=e,e.onload=function(){e.decode?e.decode().catch(function(e){Object(c["c"])("Failed to decode image, trying to render anyway\n\nsrc: "+t.normalisedSrc.src+(e.message?"\nOriginal error: "+e.message:""),t)}).then(t.onLoad):t.onLoad()},e.onerror=this.onError,e.src=this.normalisedSrc.src,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,a=function a(){var r=t.naturalHeight,n=t.naturalWidth;r||n?e.calculatedAspectRatio=n/r:null!=i&&setTimeout(a,i)};a()},__genPlaceholder:function(){if(this.$slots.placeholder){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{attrs:{name:this.transition}},t):t[0]}}},render:function(t){var e=o.options.render.call(this,t);return e.data.staticClass+=" v-image",e.data.attrs={role:this.alt?"img":void 0,"aria-label":this.alt},e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,e.data,e.children)}})},b0af:function(t,e,i){"use strict";i("4c94");var a=i("b64a"),r=i("23bf"),n=i("0d01"),s=i("6a18"),o=i("80d2"),c=i("58df"),u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t};e["a"]=Object(c["a"])(a["a"],r["a"],n["a"],s["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,raised:Boolean,tag:{type:String,default:"div"},tile:Boolean},computed:{classes:function(){return u({"v-card":!0,"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--raised":this.raised,"v-card--tile":this.tile},this.themeClasses)},styles:function(){var t={height:Object(o["b"])(this.height)};return this.img&&(t.background='url("'+this.img+'") center center / cover no-repeat'),this.height&&(t.height=Object(o["b"])(this.height)),this.maxHeight&&(t.maxHeight=Object(o["b"])(this.maxHeight)),this.maxWidth&&(t.maxWidth=Object(o["b"])(this.maxWidth)),this.width&&(t.width=Object(o["b"])(this.width)),t}},render:function(t){var e=this.generateRouteLink(this.classes),i=e.tag,a=e.data;return a.style=this.styles,t(i,this.setBackgroundColor(this.color,a),this.$slots.default)}})}}]);
//# sourceMappingURL=chunk-6c95cfee.35f7a4c9.js.map