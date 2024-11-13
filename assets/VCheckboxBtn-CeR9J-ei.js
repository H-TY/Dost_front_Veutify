import{p as I,az as B,bv as N,m as q,bD as K,y as W,q as A,S as g,aA as E,I as o,aw as Q,ai as X,J as Y,A as i,s as F,e as d,bG as Z,H as R,r as p,aB as ee,W as P,aJ as le,aK as ae,F as te,a0 as ne,aD as oe,bc as ue,bE as ie,b2 as x,bH as ce,z as re,bs as se,aq as de,ay as ve}from"./index-GkKAq0P2.js";const H=Symbol.for("vuetify:selection-control-group"),O=I({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:B,trueIcon:B,ripple:{type:[Boolean,Object],default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:N},...q(),...K(),...W()},"SelectionControlGroup"),fe=I({...O({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup"),Ce=A()({name:"VSelectionControlGroup",props:fe(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:r}=u;const l=g(e,"modelValue"),t=E(),v=o(()=>e.id||`v-selection-control-group-${t}`),c=o(()=>e.name||v.value),a=new Set;return Q(H,{modelValue:l,forceUpdate:()=>{a.forEach(n=>n())},onForceUpdate:n=>{a.add(n),X(()=>{a.delete(n)})}}),Y({[e.defaultsTarget]:{color:i(e,"color"),disabled:i(e,"disabled"),density:i(e,"density"),error:i(e,"error"),inline:i(e,"inline"),modelValue:l,multiple:o(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),name:c,falseIcon:i(e,"falseIcon"),trueIcon:i(e,"trueIcon"),readonly:i(e,"readonly"),ripple:i(e,"ripple"),type:i(e,"type"),valueComparator:i(e,"valueComparator")}}),F(()=>{var n;return d("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(n=r.default)==null?void 0:n.call(r)])}),{}}}),j=I({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,...q(),...O()},"VSelectionControl");function me(e){const u=ue(H,void 0),{densityClasses:r}=ie(e),l=g(e,"modelValue"),t=o(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),v=o(()=>e.falseValue!==void 0?e.falseValue:!1),c=o(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),a=o({get(){const b=u?u.modelValue.value:l.value;return c.value?x(b).some(s=>e.valueComparator(s,t.value)):e.valueComparator(b,t.value)},set(b){if(e.readonly)return;const s=b?t.value:v.value;let y=s;c.value&&(y=b?[...x(l.value),s]:x(l.value).filter(f=>!e.valueComparator(f,t.value))),u?u.modelValue.value=y:l.value=y}}),{textColorClasses:n,textColorStyles:C}=ce(o(()=>{if(!(e.error||e.disabled))return a.value?e.color:e.baseColor})),{backgroundColorClasses:V,backgroundColorStyles:k}=re(o(()=>a.value&&!e.error&&!e.disabled?e.color:e.baseColor)),h=o(()=>a.value?e.trueIcon:e.falseIcon);return{group:u,densityClasses:r,trueValue:t,falseValue:v,model:a,textColorClasses:n,textColorStyles:C,backgroundColorClasses:V,backgroundColorStyles:k,icon:h}}const _=A()({name:"VSelectionControl",directives:{Ripple:Z},inheritAttrs:!1,props:j(),emits:{"update:modelValue":e=>!0},setup(e,u){let{attrs:r,slots:l}=u;const{group:t,densityClasses:v,icon:c,model:a,textColorClasses:n,textColorStyles:C,backgroundColorClasses:V,backgroundColorStyles:k,trueValue:h}=me(e),b=E(),s=R(!1),y=R(!1),f=p(),S=o(()=>e.id||`input-${b}`),D=o(()=>!e.disabled&&!e.readonly);t==null||t.onForceUpdate(()=>{f.value&&(f.value.checked=a.value)});function G(m){D.value&&(s.value=!0,se(m.target,":focus-visible")!==!1&&(y.value=!0))}function w(){s.value=!1,y.value=!1}function z(m){m.stopPropagation()}function J(m){if(!D.value){f.value&&(f.value.checked=a.value);return}e.readonly&&t&&de(()=>t.forceUpdate()),a.value=m.target.checked}return F(()=>{var U,$;const m=l.label?l.label({label:e.label,props:{for:S.value}}):e.label,[L,M]=ee(r),T=d("input",P({ref:f,checked:a.value,disabled:!!e.disabled,id:S.value,onBlur:w,onFocus:G,onInput:J,"aria-disabled":!!e.disabled,"aria-label":e.label,type:e.type,value:h.value,name:e.name,"aria-checked":e.type==="checkbox"?a.value:void 0},M),null);return d("div",P({class:["v-selection-control",{"v-selection-control--dirty":a.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":s.value,"v-selection-control--focus-visible":y.value,"v-selection-control--inline":e.inline},v.value,e.class]},L,{style:e.style}),[d("div",{class:["v-selection-control__wrapper",n.value],style:C.value},[(U=l.default)==null?void 0:U.call(l,{backgroundColorClasses:V,backgroundColorStyles:k}),le(d("div",{class:["v-selection-control__input"]},[(($=l.input)==null?void 0:$.call(l,{model:a,textColorClasses:n,textColorStyles:C,backgroundColorClasses:V,backgroundColorStyles:k,inputNode:T,icon:c.value,props:{onFocus:G,onBlur:w,id:S.value}}))??d(te,null,[c.value&&d(ne,{key:"icon",icon:c.value},null),T])]),[[ae("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),m&&d(oe,{for:S.value,onClick:z},{default:()=>[m]})])}),{isFocused:s,input:f}}}),be=I({indeterminate:Boolean,indeterminateIcon:{type:B,default:"$checkboxIndeterminate"},...j({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),Ve=A()({name:"VCheckboxBtn",props:be(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,u){let{slots:r}=u;const l=g(e,"indeterminate"),t=g(e,"modelValue");function v(n){l.value&&(l.value=!1)}const c=o(()=>l.value?e.indeterminateIcon:e.falseIcon),a=o(()=>l.value?e.indeterminateIcon:e.trueIcon);return F(()=>{const n=ve(_.filterProps(e),["modelValue"]);return d(_,P(n,{modelValue:t.value,"onUpdate:modelValue":[C=>t.value=C,v],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:c.value,trueIcon:a.value,"aria-checked":l.value?"mixed":void 0}),r)}),{}}});export{_ as V,O as a,Ce as b,be as c,Ve as d,j as m};