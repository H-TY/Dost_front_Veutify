import{_ as w,R as S,T as F,o as k,W as y,w as t,a as s,$ as U,U as e,aF as d,P as B,a0 as I,S as R,bQ as C,bR as M,af as _}from"./index-KatXK1x7.js";import{u as N,a as m}from"./vee-validate.esm-Dfof80Wa.js";import{c as P,a as p,V as T}from"./index.esm-CUEWjNkz.js";import{v as $}from"./index-Du2JsCfU.js";import{b as g,a as q,V as D}from"./VRow-CsUnQfxZ.js";import{V as A}from"./VDivider-DbK_Z1A0.js";const f=o=>(C("data-v-786c917c"),o=o(),M(),o),Q=f(()=>_("h1",{class:"text-spacing1"},"登入",-1)),W=f(()=>_("h4",{class:"text-spacing2"},"與狗狗歡度快樂時刻",-1)),j={__name:"login",setup(o){const V=R(),v=S(),u=F(),b=P({account:p().required("使用者帳號必填").min(4,"使用者帳號文字最少 4 個字").max(20,"使用者帳號文字最多 20 個字").test("驗證 account","使用者帳號格式錯誤",r=>$.isAlphanumeric(r)),password:p().required("密碼必填").min(4,"使用者密碼最少 4 個字").max(20,"使用者密碼最多 20 個字")}),{handleSubmit:x,isSubmitting:i}=N({validationSchema:b}),l=m("account"),n=m("password"),h=x(async r=>{const a=await v.login(r);if(a==="登入成功")return u({text:a,snackbarProps:{color:"green"}}),V.push("/");u({text:a,snackbarProps:{color:"red"}})});return(r,a)=>(k(),y(D,{class:"w-75"},{default:t(()=>[s(q,null,{default:t(()=>[s(g,{class:"text-center",cols:"12"},{default:t(()=>[Q,W]),_:1}),s(A,{class:"py-2"}),s(g,null,{default:t(()=>[s(T,{class:"text-center",onSubmit:U(e(h),["prevent"]),disabled:e(i)},{default:t(()=>[s(d,{type:"account",label:"帳號",minlength:"4",maxlength:"20",counter:"",modelValue:e(l).value.value,"onUpdate:modelValue":a[0]||(a[0]=c=>e(l).value.value=c),"error-messages":e(l).errorMessage.value},null,8,["modelValue","error-messages"]),s(d,{type:"password",label:"密碼",minlength:"4",maxlength:"20",counter:"",modelValue:e(n).value.value,"onUpdate:modelValue":a[1]||(a[1]=c=>e(n).value.value=c),"error-messages":e(n).errorMessage.value},null,8,["modelValue","error-messages"]),s(B,{class:"w-25",type:"submit",color:"green",loading:e(i)},{default:t(()=>[I("登入")]),_:1},8,["loading"])]),_:1},8,["onSubmit","disabled"])]),_:1})]),_:1})]),_:1}))}},L=w(j,[["__scopeId","data-v-786c917c"]]);export{L as default};