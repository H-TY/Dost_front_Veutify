import{c as A,d as t}from"./VCheckboxBtn-DoIMKRBf.js";import{p as F,aj as I,ak as B,g as U,J as M,as as R,am as j,x as D,u as J,an as N,ao as l,a as u,M as r}from"./index-BeUQFjP5.js";const $=F({...I(),...B(A(),["inline"])},"VCheckbox"),z=U()({name:"VCheckbox",inheritAttrs:!1,props:$(),emits:{"update:modelValue":e=>!0,"update:focused":e=>!0},setup(e,d){let{attrs:c,slots:o}=d;const s=M(e,"modelValue"),{isFocused:n,focus:i,blur:m}=R(e),V=j(),p=D(()=>e.id||`checkbox-${V}`);return J(()=>{const[b,k]=N(c),v=l.filterProps(e),f=t.filterProps(e);return u(l,r({class:["v-checkbox",e.class]},b,v,{modelValue:s.value,"onUpdate:modelValue":a=>s.value=a,id:p.value,focused:n.value,style:e.style}),{...o,default:a=>{let{id:x,messagesId:h,isDisabled:P,isReadonly:C,isValid:y}=a;return u(t,r(f,{id:x.value,"aria-describedby":h.value,disabled:P.value,readonly:C.value},k,{error:y.value===!1,modelValue:s.value,"onUpdate:modelValue":g=>s.value=g,onFocus:i,onBlur:m}),o)}})}),{}}});export{z as V};
