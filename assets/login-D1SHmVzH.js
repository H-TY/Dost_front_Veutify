import{_ as w,a as S,i as k,o as y,k as F,f as t,e as s,a1 as B,j as e,a5 as m,l as I,a2 as U,b as C,a6 as M,a7 as N,a8 as g}from"./index-C8Gimdpc.js";import{c as q,a as d,u as D,f as p,V as P}from"./vee-validate.esm-B1pgnu0H.js";import{v as R}from"./index-B-aWNUy1.js";import{V as f}from"./VCol-DOSgLDbZ.js";import{V as T}from"./VDivider-CkgvFL66.js";import{V as $}from"./VRow-C57ivwHW.js";import{V as j}from"./VContainer-BytFLAEg.js";const V=o=>(M("data-v-d5fbf787"),o=o(),N(),o),A=V(()=>g("h1",{class:"text-spacing1"},"登入",-1)),z=V(()=>g("h4",{class:"text-spacing2"},"與狗狗歡度快樂時刻",-1)),E={__name:"login",setup(o){const _=C(),b=S(),c=k(),v=q({account:d().required("使用者帳號必填").min(4,"使用者帳號文字最少 4 個字").max(20,"使用者帳號文字最多 20 個字").test("驗證 account","使用者帳號格式錯誤",r=>R.isAlphanumeric(r)),password:d().required("密碼必填").min(4,"使用者密碼最少 4 個字").max(20,"使用者密碼最多 20 個字")}),{handleSubmit:x,isSubmitting:i}=D({validationSchema:v}),l=p("account"),n=p("password"),h=x(async r=>{const a=await b.login(r);if(a==="登入成功")return c({text:a,snackbarProps:{color:"green"}}),_.push("/");c({text:a,snackbarProps:{color:"red"}})});return(r,a)=>(y(),F(j,{class:"w-75 mt-sm-12 mt-3 mb-7"},{default:t(()=>[s($,null,{default:t(()=>[s(f,{class:"text-center",cols:"12"},{default:t(()=>[A,z]),_:1}),s(T,{class:"py-2"}),s(f,null,{default:t(()=>[s(P,{class:"text-center",onSubmit:B(e(h),["prevent"]),disabled:e(i)},{default:t(()=>[s(m,{type:"account",label:"帳號",minlength:"4",maxlength:"20",counter:"",modelValue:e(l).value.value,"onUpdate:modelValue":a[0]||(a[0]=u=>e(l).value.value=u),"error-messages":e(l).errorMessage.value},null,8,["modelValue","error-messages"]),s(m,{type:"password",label:"密碼",minlength:"4",maxlength:"20",counter:"",modelValue:e(n).value.value,"onUpdate:modelValue":a[1]||(a[1]=u=>e(n).value.value=u),"error-messages":e(n).errorMessage.value},null,8,["modelValue","error-messages"]),s(I,{class:"w-25",type:"submit",color:"green",loading:e(i)},{default:t(()=>[U("登入")]),_:1},8,["loading"])]),_:1},8,["onSubmit","disabled"])]),_:1})]),_:1})]),_:1}))}},W=w(E,[["__scopeId","data-v-d5fbf787"]]);export{W as default};
