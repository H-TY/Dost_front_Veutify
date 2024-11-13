import{p as K,az as he,q as Z,I as D,s as te,e as l,k as E,aQ as sa,z as ra,aT as Ye,K as ye,aU as oa,aV as ia,r as A,aW as da,aX as ue,H as oe,O as Q,a2 as T,S as ie,aY as He,X as Ee,W as q,L as Ue,aZ as ua,P as qe,aq as Le,ay as de,a_ as ca,a$ as va,b0 as _e,F as ke,b1 as ma,b2 as pe,_ as fa,u as ha,a as pa,i as ga,as as ka,o as J,j as ge,w as b,d as we,h as Pe,f as M,a9 as De,V as U,a0 as Ce,a4 as ne,a1 as ya,a5 as G,g as ba,a3 as se,b3 as xa,b as Va,au as Sa,a6 as _a,a7 as wa,a8 as Re}from"./index-GkKAq0P2.js";import{u as Pa}from"./bookingOrder-DC2BRh7Y.js";import{_ as Da}from"./dogsCard-B6BpK8r-.js";import{c as Ca,a as ee,d as Ia,b as Ie,e as Na,u as Ma,f as H,V as Ne}from"./vee-validate.esm-nAJN_JDN.js";import{O as Ta}from"./orderInfoCard-DO186fQh.js";import{g as ae,b as Aa,e as $a,P as Ba,N as Oa,S as Ya,a as Ha}from"./pagination-Cdyik9Mt.js";import{V as re}from"./VCol-Cff998ZE.js";import{V as Ea}from"./VDivider-D6Em-n_p.js";import{a as Me,V as Ua}from"./VRow-D-dk2pW9.js";import{a as qa}from"./VList-CtvQTlCn.js";import{V as La}from"./VCheckbox-CN0OvO-9.js";import"./VCheckboxBtn-CeR9J-ei.js";const We=K({active:{type:[String,Array],default:void 0},disabled:{type:[Boolean,String,Array],default:!1},nextIcon:{type:he,default:"$next"},prevIcon:{type:he,default:"$prev"},modeIcon:{type:he,default:"$subgroup"},text:String,viewMode:{type:String,default:"month"}},"VDatePickerControls"),Te=Z()({name:"VDatePickerControls",props:We(),emits:{"click:year":()=>!0,"click:month":()=>!0,"click:prev":()=>!0,"click:next":()=>!0,"click:text":()=>!0},setup(e,a){let{emit:P}=a;const u=D(()=>Array.isArray(e.disabled)?e.disabled.includes("text"):!!e.disabled),t=D(()=>Array.isArray(e.disabled)?e.disabled.includes("mode"):!!e.disabled),m=D(()=>Array.isArray(e.disabled)?e.disabled.includes("prev"):!!e.disabled),i=D(()=>Array.isArray(e.disabled)?e.disabled.includes("next"):!!e.disabled);function c(){P("click:prev")}function r(){P("click:next")}function n(){P("click:year")}function o(){P("click:month")}return te(()=>l("div",{class:["v-date-picker-controls"]},[l(E,{class:"v-date-picker-controls__month-btn",disabled:u.value,text:e.text,variant:"text",rounded:!0,onClick:o},null),l(E,{key:"mode-btn",class:"v-date-picker-controls__mode-btn",disabled:t.value,density:"comfortable",icon:e.modeIcon,variant:"text",onClick:n},null),l(sa,{key:"mode-spacer"},null),l("div",{key:"month-buttons",class:"v-date-picker-controls__month"},[l(E,{disabled:m.value,icon:e.prevIcon,variant:"text",onClick:c},null),l(E,{disabled:i.value,icon:e.nextIcon,variant:"text",onClick:r},null)])])),{}}}),Ra=K({appendIcon:String,color:String,header:String,transition:String,onClick:oa()},"VDatePickerHeader"),Ae=Z()({name:"VDatePickerHeader",props:Ra(),emits:{click:()=>!0,"click:append":()=>!0},setup(e,a){let{emit:P,slots:u}=a;const{backgroundColorClasses:t,backgroundColorStyles:m}=ra(e,"color");function i(){P("click")}function c(){P("click:append")}return te(()=>{const r=!!(u.default||e.header),n=!!(u.append||e.appendIcon);return l("div",{class:["v-date-picker-header",{"v-date-picker-header--clickable":!!e.onClick},t.value],style:m.value,onClick:i},[u.prepend&&l("div",{key:"prepend",class:"v-date-picker-header__prepend"},[u.prepend()]),r&&l(Ye,{key:"content",name:e.transition},{default:()=>{var o;return[l("div",{key:e.header,class:"v-date-picker-header__content"},[((o=u.default)==null?void 0:o.call(u))??e.header])]}}),n&&l("div",{class:"v-date-picker-header__append"},[u.append?l(ye,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VBtn:{icon:e.appendIcon,variant:"text"}}},{default:()=>{var o;return[(o=u.append)==null?void 0:o.call(u)]}}):l(E,{key:"append-btn",icon:e.appendIcon,variant:"text",onClick:c},null)])])}),{}}}),je=K({color:String,hideWeekdays:Boolean,multiple:[Boolean,Number,String],showWeek:Boolean,transition:{type:String,default:"picker-transition"},reverseTransition:{type:String,default:"picker-reverse-transition"},...ia()},"VDatePickerMonth"),$e=Z()({name:"VDatePickerMonth",props:je(),emits:{"update:modelValue":e=>!0,"update:month":e=>!0,"update:year":e=>!0},setup(e,a){let{emit:P,slots:u}=a;const t=A(),{daysInMonth:m,model:i,weekNumbers:c}=da(e),r=ue(),n=oe(),o=oe(),k=oe(!1),S=D(()=>k.value?e.reverseTransition:e.transition);e.multiple==="range"&&i.value.length>0&&(n.value=i.value[0],i.value.length>1&&(o.value=i.value[i.value.length-1]));const f=D(()=>{const v=["number","string"].includes(typeof e.multiple)?Number(e.multiple):1/0;return i.value.length>=v});Q(m,(v,s)=>{s&&(k.value=r.isBefore(v[0].date,s[0].date))});function C(v){const s=r.startOfDay(v);if(i.value.length===0?n.value=void 0:i.value.length===1&&(n.value=i.value[0],o.value=void 0),!n.value)n.value=s,i.value=[n.value];else if(o.value)n.value=v,o.value=void 0,i.value=[n.value];else{if(r.isSameDay(s,n.value)){n.value=void 0,i.value=[];return}else r.isBefore(s,n.value)?(o.value=r.endOfDay(n.value),n.value=s):o.value=r.endOfDay(s);const _=r.getDiff(o.value,n.value,"days"),w=[n.value];for(let $=1;$<_;$++){const L=r.addDays(n.value,$);w.push(L)}w.push(o.value),i.value=w}}function x(v){const s=i.value.findIndex(_=>r.isSameDay(_,v));if(s===-1)i.value=[...i.value,v];else{const _=[...i.value];_.splice(s,1),i.value=_}}function V(v){e.multiple==="range"?C(v):e.multiple?x(v):i.value=[v]}return()=>l("div",{class:"v-date-picker-month"},[e.showWeek&&l("div",{key:"weeks",class:"v-date-picker-month__weeks"},[!e.hideWeekdays&&l("div",{key:"hide-week-days",class:"v-date-picker-month__day"},[T(" ")]),c.value.map(v=>l("div",{class:["v-date-picker-month__day","v-date-picker-month__day--adjacent"]},[v]))]),l(Ye,{name:S.value},{default:()=>{var v;return[l("div",{ref:t,key:(v=m.value[0].date)==null?void 0:v.toString(),class:"v-date-picker-month__days"},[!e.hideWeekdays&&r.getWeekdays(e.firstDayOfWeek).map(s=>l("div",{class:["v-date-picker-month__day","v-date-picker-month__weekday"]},[s])),m.value.map((s,_)=>{const w={props:{onClick:()=>V(s.date)},item:s,i:_};return f.value&&!s.isSelected&&(s.isDisabled=!0),l("div",{class:["v-date-picker-month__day",{"v-date-picker-month__day--adjacent":s.isAdjacent,"v-date-picker-month__day--hide-adjacent":s.isHidden,"v-date-picker-month__day--selected":s.isSelected,"v-date-picker-month__day--week-end":s.isWeekEnd,"v-date-picker-month__day--week-start":s.isWeekStart}],"data-v-date":s.isDisabled?void 0:s.isoDate},[(e.showAdjacentMonths||!s.isAdjacent)&&l(ye,{defaults:{VBtn:{class:"v-date-picker-month__day-btn",color:(s.isSelected||s.isToday)&&!s.isDisabled?e.color:void 0,disabled:s.isDisabled,icon:!0,ripple:!1,text:s.localized,variant:s.isDisabled?s.isToday?"outlined":"text":s.isToday&&!s.isSelected?"outlined":"flat",onClick:()=>V(s.date)}}},{default:()=>{var $;return[(($=u.day)==null?void 0:$.call(u,w))??l(E,w.props,null)]}})])})])]}})])}}),Fe=K({color:String,height:[String,Number],min:null,max:null,modelValue:Number,year:Number},"VDatePickerMonths"),Be=Z()({name:"VDatePickerMonths",props:Fe(),emits:{"update:modelValue":e=>!0},setup(e,a){let{emit:P,slots:u}=a;const t=ue(),m=ie(e,"modelValue"),i=D(()=>{let c=t.startOfYear(t.date());return e.year&&(c=t.setYear(c,e.year)),He(12).map(r=>{const n=t.format(c,"monthShort"),o=!!(e.min&&t.isAfter(t.startOfMonth(t.date(e.min)),c)||e.max&&t.isAfter(c,t.startOfMonth(t.date(e.max))));return c=t.getNextMonth(c),{isDisabled:o,text:n,value:r}})});return Ee(()=>{m.value=m.value??t.getMonth(t.date())}),te(()=>l("div",{class:"v-date-picker-months",style:{height:Ue(e.height)}},[l("div",{class:"v-date-picker-months__content"},[i.value.map((c,r)=>{var k;const n={active:m.value===r,color:m.value===r?e.color:void 0,disabled:c.isDisabled,rounded:!0,text:c.text,variant:m.value===c.value?"flat":"text",onClick:()=>o(r)};function o(S){if(m.value===S){P("update:modelValue",m.value);return}m.value=S}return((k=u.month)==null?void 0:k.call(u,{month:c,i:r,props:n}))??l(E,q({key:"month"},n),null)})])])),{}}}),ze=K({color:String,height:[String,Number],min:null,max:null,modelValue:Number},"VDatePickerYears"),Oe=Z()({name:"VDatePickerYears",props:ze(),emits:{"update:modelValue":e=>!0},setup(e,a){let{emit:P,slots:u}=a;const t=ue(),m=ie(e,"modelValue"),i=D(()=>{const r=t.getYear(t.date());let n=r-100,o=r+52;e.min&&(n=t.getYear(t.date(e.min))),e.max&&(o=t.getYear(t.date(e.max)));let k=t.startOfYear(t.date());return k=t.setYear(k,n),He(o-n+1,n).map(S=>{const f=t.format(k,"year");return k=t.setYear(k,t.getYear(k)+1),{text:f,value:S}})});Ee(()=>{m.value=m.value??t.getYear(t.date())});const c=ua();return qe(async()=>{var r;await Le(),(r=c.el)==null||r.scrollIntoView({block:"center"})}),te(()=>l("div",{class:"v-date-picker-years",style:{height:Ue(e.height)}},[l("div",{class:"v-date-picker-years__content"},[i.value.map((r,n)=>{var k;const o={ref:m.value===r.value?c:void 0,active:m.value===r.value,color:m.value===r.value?e.color:void 0,rounded:!0,text:r.text,variant:m.value===r.value?"flat":"text",onClick:()=>{if(m.value===r.value){P("update:modelValue",m.value);return}m.value=r.value}};return((k=u.year)==null?void 0:k.call(u,{year:r,i:n,props:o}))??l(E,q({key:"month"},o),null)})])])),{}}}),Wa=K({header:{type:String,default:"$vuetify.datePicker.header"},...We(),...je({weeksInMonth:"static"}),...de(Fe(),["modelValue"]),...de(ze(),["modelValue"]),...ca({title:"$vuetify.datePicker.title"}),modelValue:null},"VDatePicker"),ja=Z()({name:"VDatePicker",props:Wa(),emits:{"update:modelValue":e=>!0,"update:month":e=>!0,"update:year":e=>!0,"update:viewMode":e=>!0},setup(e,a){let{emit:P,slots:u}=a;const t=ue(),{t:m}=va(),i=ie(e,"modelValue",void 0,h=>pe(h),h=>e.multiple?h:h[0]),c=ie(e,"viewMode"),r=D(()=>{var N;const h=t.date((N=i.value)==null?void 0:N[0]);return h&&t.isValid(h)?h:t.date()}),n=A(Number(e.month??t.getMonth(t.startOfMonth(r.value)))),o=A(Number(e.year??t.getYear(t.startOfYear(t.setMonth(r.value,n.value))))),k=oe(!1),S=D(()=>e.multiple&&i.value.length>1?m("$vuetify.datePicker.itemsSelected",i.value.length):i.value[0]&&t.isValid(i.value[0])?t.format(t.date(i.value[0]),"normalDateWithWeekday"):m(e.header)),f=D(()=>{let h=t.date();return h=t.setDate(h,1),h=t.setMonth(h,n.value),h=t.setYear(h,o.value),t.format(h,"monthAndYear")}),C=D(()=>`date-picker-header${k.value?"-reverse":""}-transition`),x=D(()=>{const h=t.date(e.min);return e.min&&t.isValid(h)?h:null}),V=D(()=>{const h=t.date(e.max);return e.max&&t.isValid(h)?h:null}),v=D(()=>{if(e.disabled)return!0;const h=[];if(c.value!=="month")h.push("prev","next");else{let N=t.date();if(N=t.setYear(N,o.value),N=t.setMonth(N,n.value),x.value){const O=t.addDays(t.startOfMonth(N),-1);t.isAfter(x.value,O)&&h.push("prev")}if(V.value){const O=t.addDays(t.endOfMonth(N),1);t.isAfter(O,V.value)&&h.push("next")}}return h});function s(){n.value<11?n.value++:(o.value++,n.value=0,X(o.value)),B(n.value)}function _(){n.value>0?n.value--:(o.value--,n.value=11,X(o.value)),B(n.value)}function w(){c.value="month"}function $(){c.value=c.value==="months"?"month":"months"}function L(){c.value=c.value==="year"?"month":"year"}function B(h){c.value==="months"&&$(),P("update:month",h)}function X(h){c.value==="year"&&L(),P("update:year",h)}return Q(i,(h,N)=>{const O=pe(N),R=pe(h);if(!R.length)return;const W=t.date(O[O.length-1]),j=t.date(R[R.length-1]),F=t.getMonth(j),y=t.getYear(j);F!==n.value&&(n.value=F,B(n.value)),y!==o.value&&(o.value=y,X(o.value)),k.value=t.isBefore(W,j)}),te(()=>{const h=_e.filterProps(e),N=Te.filterProps(e),O=Ae.filterProps(e),R=$e.filterProps(e),W=de(Be.filterProps(e),["modelValue"]),j=de(Oe.filterProps(e),["modelValue"]),F={header:S.value,transition:C.value};return l(_e,q(h,{class:["v-date-picker",`v-date-picker--${c.value}`,{"v-date-picker--show-week":e.showWeek},e.class],style:e.style}),{title:()=>{var y;return((y=u.title)==null?void 0:y.call(u))??l("div",{class:"v-date-picker__title"},[m(e.title)])},header:()=>u.header?l(ye,{defaults:{VDatePickerHeader:{...F}}},{default:()=>{var y;return[(y=u.header)==null?void 0:y.call(u,F)]}}):l(Ae,q({key:"header"},O,F,{onClick:c.value!=="month"?w:void 0}),{...u,default:void 0}),default:()=>l(ke,null,[l(Te,q(N,{disabled:v.value,text:f.value,"onClick:next":s,"onClick:prev":_,"onClick:month":$,"onClick:year":L}),null),l(ma,{hideOnLeave:!0},{default:()=>[c.value==="months"?l(Be,q({key:"date-picker-months"},W,{modelValue:n.value,"onUpdate:modelValue":[y=>n.value=y,B],min:x.value,max:V.value,year:o.value}),null):c.value==="year"?l(Oe,q({key:"date-picker-years"},j,{modelValue:o.value,"onUpdate:modelValue":[y=>o.value=y,X],min:x.value,max:V.value}),null):l($e,q({key:"date-picker-month"},R,{modelValue:i.value,"onUpdate:modelValue":y=>i.value=y,month:n.value,"onUpdate:month":[y=>n.value=y,B],year:o.value,"onUpdate:year":[y=>o.value=y,X],min:x.value,max:V.value}),null)]})]),actions:u.actions})}),{}}});function Fa(e){let{swiper:a,extendParams:P,on:u}=e;P({history:{enabled:!1,root:"",replaceState:!1,key:"slides",keepQuery:!1}});let t=!1,m={};const i=f=>f.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,""),c=f=>{const C=ae();let x;f?x=new URL(f):x=C.location;const V=x.pathname.slice(1).split("/").filter(w=>w!==""),v=V.length,s=V[v-2],_=V[v-1];return{key:s,value:_}},r=(f,C)=>{const x=ae();if(!t||!a.params.history.enabled)return;let V;a.params.url?V=new URL(a.params.url):V=x.location;const v=a.virtual&&a.params.virtual.enabled?a.slidesEl.querySelector(`[data-swiper-slide-index="${C}"]`):a.slides[C];let s=i(v.getAttribute("data-history"));if(a.params.history.root.length>0){let w=a.params.history.root;w[w.length-1]==="/"&&(w=w.slice(0,w.length-1)),s=`${w}/${f?`${f}/`:""}${s}`}else V.pathname.includes(f)||(s=`${f?`${f}/`:""}${s}`);a.params.history.keepQuery&&(s+=V.search);const _=x.history.state;_&&_.value===s||(a.params.history.replaceState?x.history.replaceState({value:s},null,s):x.history.pushState({value:s},null,s))},n=(f,C,x)=>{if(C)for(let V=0,v=a.slides.length;V<v;V+=1){const s=a.slides[V];if(i(s.getAttribute("data-history"))===C){const w=a.getSlideIndex(s);a.slideTo(w,f,x)}}else a.slideTo(0,f,x)},o=()=>{m=c(a.params.url),n(a.params.speed,m.value,!1)},k=()=>{const f=ae();if(a.params.history){if(!f.history||!f.history.pushState){a.params.history.enabled=!1,a.params.hashNavigation.enabled=!0;return}if(t=!0,m=c(a.params.url),!m.key&&!m.value){a.params.history.replaceState||f.addEventListener("popstate",o);return}n(0,m.value,a.params.runCallbacksOnInit),a.params.history.replaceState||f.addEventListener("popstate",o)}},S=()=>{const f=ae();a.params.history.replaceState||f.removeEventListener("popstate",o)};u("init",()=>{a.params.history.enabled&&k()}),u("destroy",()=>{a.params.history.enabled&&S()}),u("transitionEnd _freeModeNoMomentumRelease",()=>{t&&r(a.params.history.key,a.activeIndex)}),u("slideChange",()=>{t&&a.params.cssMode&&r(a.params.history.key,a.activeIndex)})}function za(e){let{swiper:a,extendParams:P,emit:u,on:t}=e,m=!1;const i=Aa(),c=ae();P({hashNavigation:{enabled:!1,replaceState:!1,watchState:!1,getSlideIndex(S,f){if(a.virtual&&a.params.virtual.enabled){const C=a.slides.filter(V=>V.getAttribute("data-hash")===f)[0];return C?parseInt(C.getAttribute("data-swiper-slide-index"),10):0}return a.getSlideIndex($a(a.slidesEl,`.${a.params.slideClass}[data-hash="${f}"], swiper-slide[data-hash="${f}"]`)[0])}}});const r=()=>{u("hashChange");const S=i.location.hash.replace("#",""),f=a.virtual&&a.params.virtual.enabled?a.slidesEl.querySelector(`[data-swiper-slide-index="${a.activeIndex}"]`):a.slides[a.activeIndex],C=f?f.getAttribute("data-hash"):"";if(S!==C){const x=a.params.hashNavigation.getSlideIndex(a,S);if(typeof x>"u"||Number.isNaN(x))return;a.slideTo(x)}},n=()=>{if(!m||!a.params.hashNavigation.enabled)return;const S=a.virtual&&a.params.virtual.enabled?a.slidesEl.querySelector(`[data-swiper-slide-index="${a.activeIndex}"]`):a.slides[a.activeIndex],f=S?S.getAttribute("data-hash")||S.getAttribute("data-history"):"";a.params.hashNavigation.replaceState&&c.history&&c.history.replaceState?(c.history.replaceState(null,null,`#${f}`||""),u("hashSet")):(i.location.hash=f||"",u("hashSet"))},o=()=>{if(!a.params.hashNavigation.enabled||a.params.history&&a.params.history.enabled)return;m=!0;const S=i.location.hash.replace("#","");if(S){const C=a.params.hashNavigation.getSlideIndex(a,S);a.slideTo(C||0,0,a.params.runCallbacksOnInit,!0)}a.params.hashNavigation.watchState&&c.addEventListener("hashchange",r)},k=()=>{a.params.hashNavigation.watchState&&c.removeEventListener("hashchange",r)};t("init",()=>{a.params.hashNavigation.enabled&&o()}),t("destroy",()=>{a.params.hashNavigation.enabled&&k()}),t("transitionEnd _freeModeNoMomentumRelease",()=>{m&&n()}),t("slideChange",()=>{m&&a.params.cssMode&&n()})}const Qe=e=>(_a("data-v-87fea60c"),e=e(),wa(),e),Qa=Qe(()=>Re("h1",null,"預約狗狗時間",-1)),Xa=Qe(()=>Re("h3",null,"可預約時段",-1)),Ga={__name:"booking",setup(e){const a=xa(),P=Va(),{mobile:u}=ha(),{backApi:t,apiAuth:m}=Sa(),i=pa(),c=Pa(),r=ga(),n=[Ba,Oa,za,Fa],o=D(()=>i.isLogin?i.account:"Guest"),k=A(null),S=A(new Date),f=D(()=>k.value===null||isNaN(k.value.getTime())?"左側選擇日期":k.value.toLocaleDateString()),C=g=>g>S.value,x=A([]);(async()=>{var g,p;try{const{data:d}=await t.get("/dogs");x.value.splice(0,x.value.length,...d.result.data)}catch(d){console.log(d),r({text:((p=(g=d==null?void 0:d.response)==null?void 0:g.data)==null?void 0:p.message)||"發生錯誤",snackbarProps:{color:"red"}})}})();const v=A({_id:"",image:"",dogName:"",age:0,price:0,booking:!0,bookingTime:[],feature:"",sell:!0,counter:0}),s=D(()=>v.value.image),_=A(null);Q(_,(g,p)=>{if(g!==p)return y.value=[],k.value=null,be.value.value=v.value.image});const w=()=>{a.query.id?(_.value=a.query.id,window.location.hash=`booking#${a.query.id}`,a.query.id=""):_.value=window.location.hash.substring(10)},$=()=>{w(),L()};qe(()=>{setTimeout(()=>{w(),L()},500)});const L=async()=>{var g,p;if(_.value!==null)try{await Le();const{data:d}=await t.get("/dogs/"+_.value);v.value._id=d.result._id,v.value.image=d.result.image,v.value.dogName=d.result.dogName,v.value.age=d.result.age,v.value.price=d.result.price,v.value.booking=d.result.booking,v.value.bookingTime=d.result.bookingTime,v.value.feature=d.result.feature,v.value.sell=d.result.sell,v.value.counter=d.result.counter}catch(d){console.log(d),r({text:((p=(g=d==null?void 0:d.response)==null?void 0:g.data)==null?void 0:p.message)||"發生錯誤",snackbarProps:{color:"red"}})}};L();const B=A(!1),X=g=>{g.target.innerText==f.value.slice(-2).replace("/","")&&(B.value=!0)},h=ka({}),N=A(!1),O=()=>{N.value=!0},R=()=>{B.value=!1,N.value=!1},W=A(!1),j=()=>{W.value=!W.value},F=()=>{W.value=!1},y=A([]),ce=D(()=>y.value.length*2),ve=D(()=>v.value.price*y.value.length),Xe=Ca({name:ee().required("預約人名字必填"),phone:ee().required("預約人電話必填"),dogName:ee().required("狗狗名字必填"),bookingDate:ee().required("預約日期必填"),bookingTime:Ia().required("預約時段必填"),totalBookingTime:Ie().required("預約總時數必填").typeError("預約總時數格式錯誤").min(0,"預約總時數不能小於 0"),totalPrice:Ie().required("預約總金額必填").typeError("預約總金額格式錯誤").min(0,"預約總金額不能小於 0"),accountName:ee().required("帳戶名稱必填"),orderStatus:Na().required("訂單狀態必填")}),{handleSubmit:Ge,isSubmitting:me,resetForm:Ke}=Ma({validationSchema:Xe,initialValues:{name:o.value,phone:"",image:"",dogName:"",bookingDate:"",bookingTime:[],totalBookingTime:0,totalPrice:0,accountName:"",orderStatus:!0}}),le=H("name"),fe=H("phone"),be=H("image"),Ze=H("dogName"),Je=H("bookingDate"),ea=H("bookingTime"),aa=H("totalBookingTime"),ta=H("totalPrice"),la=H("accountName");H("orderStatus"),Q(f,(g,p)=>{if(g!==p)return la.value.value=o.value,Ze.value.value=v.value.dogName,be.value.value=v.value.image}),Q(f,async(g,p)=>{if(g!==p)return y.value=[],Je.value.value=f.value}),Q(y,(g,p)=>{if(g!==p)return ea.value.value=y.value.sort((d,Y)=>parseInt(d)-parseInt(Y))}),Q(ce,(g,p)=>{if(g!==p)return aa.value.value=ce.value}),Q(ve,(g,p)=>{if(g!==p)return ta.value.value=ve.value});const xe=Ge(async g=>{var p,d,Y,Se;try{if(!i.isLogin){console.log("User.isLogin",i.isLogin),r({text:"請先登入會員",snackbarProps:{color:"red"}}),P.push("/login");return}const I=new FormData;I.append("name",g.name),I.append("phone",g.phone),I.append("image",g.image),I.append("dogName",g.dogName),I.append("bookingDate",g.bookingDate),I.append("bookingTime",g.bookingTime),I.append("totalBookingTime",g.totalBookingTime),I.append("totalPrice",g.totalPrice),I.append("accountName",g.accountName),I.append("orderStatus",g.orderStatus);const z=await c.createBookingOrder(I),na={infor:[{title:"訂單編號",value:z.data.result.bookingOrderNumber},{title:"預約人",value:z.data.result.accountName},{title:"電話",value:z.data.result.phone},{title:"預約狗狗",value:z.data.result.dogName},{title:"預約日期",value:z.data.result.bookingDate},{title:"預約總金額",value:z.data.result.totalPrice+" 元"}],img:z.data.result.image};Object.assign(h,na),O(),r({text:z.text,snackbarProps:{color:"green"}}),Ke(),k.value=null,y.value=[]}catch(I){console.log("error",I),console.log("error?.response?.data?.message",(d=(p=I==null?void 0:I.response)==null?void 0:p.data)==null?void 0:d.message),r({text:((Se=(Y=I==null?void 0:I.response)==null?void 0:Y.data)==null?void 0:Se.message)||"發生錯誤",snackbarProps:{color:"red"}})}}),Ve=D(()=>({myClass:le.value.value.length>0}));return(g,p)=>(J(),ge(Ua,{class:"text-center mt-8"},{default:b(()=>[Qa,l(M(Ya),{slidesPerView:"auto",centeredSlides:!0,spaceBetween:30,pagination:{clickable:!0},navigation:!0,hashNavigation:{replaceState:!0,watchState:!0},modules:n,onSlideChangeTransitionEnd:$,class:"mySwiper my-10"},{default:b(()=>[(J(!0),we(ke,null,Pe(x.value,d=>(J(),ge(M(Ha),{"data-hash":`/booking#${d._id}`},{default:b(()=>[l(U,{style:{width:"100%"}},{default:b(()=>[l(Da,q({ref_for:!0},d),null,16)]),_:2},1024)]),_:2},1032,["data-hash"]))),256))]),_:1}),l(Me,{class:"my-7"},{default:b(()=>[l(re,{class:"d-flex flex-wrap justify-center",cols:"12",sm:"6"},{default:b(()=>[l(ja,{width:"400",color:"primary",modelValue:k.value,"onUpdate:modelValue":p[0]||(p[0]=d=>k.value=d),"show-adjacent-months":"","allowed-dates":C,onClick:p[1]||(p[1]=d=>X(d))},null,8,["modelValue"]),l(De,{modelValue:B.value,"onUpdate:modelValue":p[3]||(p[3]=d=>B.value=d)},{default:b(()=>[l(Ne,null,{default:b(()=>[l(U,{class:"bg-white d-flex flex-column text-center justify-self-center align-self-center pa-7",width:"350",height:"240"},{default:b(()=>[Xa,l(Ea,{class:"my-4"}),(J(!0),we(ke,null,Pe(v.value.bookingTime.join(" ").split(",").sort((d,Y)=>parseInt(d)-parseInt(Y)),d=>(J(),ge(La,{class:"d-flex justify-center",modelValue:y.value,"onUpdate:modelValue":p[2]||(p[2]=Y=>y.value=Y),label:d,value:d,"false-icon":"mdi-paw-outline","true-icon":"mdi-paw"},null,8,["modelValue","label","value"]))),256)),l(U,{class:"dialogClosePosition rounded-circle bg-transparent d-flex"},{default:b(()=>[l(E,{class:"rounded-circle d-flex pa-0 bg-white opacity-100","min-width":"60","min-height":"60",variant:"plain",onClick:R,flat:""},{default:b(()=>[l(Ce,{icon:W.value?"mdi-close-circle":"mdi-close-circle-outline",size:"48",color:"red-darken-4",onMouseover:j,onMouseout:j,onClick:F},null,8,["icon"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(U,{class:ne(["bg-transparent d-flex align-center",M(u)?"mt-5":""])},{default:b(()=>[l(Ce,{icon:"mdi-message-alert",class:"me-1",color:"orange-darken-2"}),T("當天日期無法預約，若有需求，請來電洽詢，謝謝！")]),_:1},8,["class"])]),_:1}),l(re,{class:ne(["d-flex justify-center",M(u)?"my-4":""])},{default:b(()=>[l(Ne,{class:"w-90",cols:"12",sm:"6",onSubmit:ya(M(xe),["prevent"]),disabled:M(me)},{default:b(()=>[l(G,{label:"預約人姓名",class:ne(Ve.value),modelValue:M(le).value.value,"onUpdate:modelValue":p[4]||(p[4]=d=>M(le).value.value=d),"error-messages":M(le).errorMessage.value},null,8,["class","modelValue","error-messages"]),l(G,{label:"預約人電話",class:ne(Ve.value),modelValue:M(fe).value.value,"onUpdate:modelValue":p[5]||(p[5]=d=>M(fe).value.value=d),"error-messages":M(fe).errorMessage.value},null,8,["class","modelValue","error-messages"]),l(Me,null,{default:b(()=>[l(re,{cols:"4",class:"pa-0 ps-3"},{default:b(()=>[l(U,{class:"bg-transparent my-2",elevation:"2",rounded:""},{default:b(()=>[l(ba,{src:s.value,height:"70",cover:""},null,8,["src"])]),_:1})]),_:1}),l(re,null,{default:b(()=>[l(G,{readonly:""},{default:b(()=>[T("預約狗狗： "),l(U,{class:"text-h6 font-weight-bold bg-transparent"},{default:b(()=>[T(se(v.value.dogName),1)]),_:1})]),_:1})]),_:1})]),_:1}),l(G,{readonly:""},{default:b(()=>[T("預約日期： "),l(U,{class:"text-h6 font-weight-bold bg-transparent"},{default:b(()=>[T(se(f.value),1)]),_:1})]),_:1}),l(G,{readonly:""},{default:b(()=>[T("預約時段： "),l(qa,{class:"my-0 pa-0 bg-transparent",items:y.value.sort((d,Y)=>parseInt(d)-parseInt(Y))},null,8,["items"])]),_:1}),l(G,{readonly:""},{default:b(()=>[T("預約總時數： "),l(U,{class:"text-h5 font-weight-bold bg-transparent"},{default:b(()=>[T(se(ce.value),1)]),_:1}),T(" 小時 ")]),_:1}),l(G,{readonly:""},{default:b(()=>[T("總計金額： "),l(U,{class:"text-h5 font-weight-bold bg-transparent"},{default:b(()=>[T(se(ve.value),1)]),_:1}),T(" 元 ")]),_:1}),l(E,{class:"w-40 mt-5",type:"submit",color:"green",loading:M(me)},{default:b(()=>[T("送出預約")]),_:1},8,["loading"])]),_:1},8,["onSubmit","disabled"])]),_:1},8,["class"])]),_:1}),l(De,{modelValue:N.value,"onUpdate:modelValue":p[6]||(p[6]=d=>N.value=d)},{default:b(()=>[l(M(Ta),{bigTitle:"已預約資訊",orderInfoData:h.infor,orderInfoDataImg:h.img,dialogClose:R,submit:M(xe),isSubmitting:M(me)},null,8,["orderInfoData","orderInfoDataImg","submit","isSubmitting"])]),_:1},8,["modelValue"])]),_:1}))}},dt=fa(Ga,[["__scopeId","data-v-87fea60c"]]);export{dt as default};
