import{c as I,d as t}from"./VCheckboxBtn-DkWikg44.js";import{p as g,ax as B,ay as F,q as U,S as R,aG as q,aA as D,I as G,s as M,aB as N,aC as l,e as u,W as r}from"./index-D83WmEp4.js";const S=g({...B(),...F(I(),["inline"])},"VCheckbox"),j=U()({name:"VCheckbox",inheritAttrs:!1,props:S(),emits:{"update:modelValue":e=>!0,"update:focused":e=>!0},setup(e,d){let{attrs:c,slots:o}=d;const s=R(e,"modelValue"),{isFocused:n,focus:i,blur:m}=q(e),V=D(),p=G(()=>e.id||`checkbox-${V}`);return M(()=>{const[b,v]=N(c),f=l.filterProps(e),k=t.filterProps(e);return u(l,r({class:["v-checkbox",e.class]},b,f,{modelValue:s.value,"onUpdate:modelValue":a=>s.value=a,id:p.value,focused:n.value,style:e.style}),{...o,default:a=>{let{id:x,messagesId:h,isDisabled:P,isReadonly:C,isValid:y}=a;return u(t,r(k,{id:x.value,"aria-describedby":h.value,disabled:P.value,readonly:C.value},v,{error:y.value===!1,modelValue:s.value,"onUpdate:modelValue":A=>s.value=A,onFocus:i,onBlur:m}),o)}})}),{}}});export{j as V};
