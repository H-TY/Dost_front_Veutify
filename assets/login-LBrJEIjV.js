import{_ as w,a as S,i as k,o as y,k as F,f as t,e as s,a0 as B,j as e,aG as d,l as I,a1 as U,b as C,b1 as M,b2 as N,ah as g}from"./index-Bo41hmNo.js";import{c as q,a as m,u as D,f as p,V as P}from"./vee-validate.esm-DBxpqnGY.js";import{v as R}from"./index-CEDYaOhT.js";import{V as f}from"./VCol-Cz6DkMcF.js";import{V as T}from"./VDivider-Bbq3jSFh.js";import{V as $}from"./VRow-gZ5tCjm5.js";import{V as j}from"./VContainer-Bgf_6l1B.js";const V=o=>(M("data-v-a49c258d"),o=o(),N(),o),A=V(()=>g("h1",{class:"text-spacing1"},"登入",-1)),G=V(()=>g("h4",{class:"text-spacing2"},"與狗狗歡度快樂時刻",-1)),z={__name:"login",setup(o){const _=C(),v=S(),u=k(),b=q({account:m().required("使用者帳號必填").min(4,"使用者帳號文字最少 4 個字").max(20,"使用者帳號文字最多 20 個字").test("驗證 account","使用者帳號格式錯誤",r=>R.isAlphanumeric(r)),password:m().required("密碼必填").min(4,"使用者密碼最少 4 個字").max(20,"使用者密碼最多 20 個字")}),{handleSubmit:x,isSubmitting:i}=D({validationSchema:b}),l=p("account"),n=p("password"),h=x(async r=>{const a=await v.login(r);if(a==="登入成功")return u({text:a,snackbarProps:{color:"green"}}),_.push("/");u({text:a,snackbarProps:{color:"red"}})});return(r,a)=>(y(),F(j,{class:"w-75 mt-12"},{default:t(()=>[s($,null,{default:t(()=>[s(f,{class:"text-center",cols:"12"},{default:t(()=>[A,G]),_:1}),s(T,{class:"py-2"}),s(f,null,{default:t(()=>[s(P,{class:"text-center",onSubmit:B(e(h),["prevent"]),disabled:e(i)},{default:t(()=>[s(d,{type:"account",label:"帳號",minlength:"4",maxlength:"20",counter:"",modelValue:e(l).value.value,"onUpdate:modelValue":a[0]||(a[0]=c=>e(l).value.value=c),"error-messages":e(l).errorMessage.value},null,8,["modelValue","error-messages"]),s(d,{type:"password",label:"密碼",minlength:"4",maxlength:"20",counter:"",modelValue:e(n).value.value,"onUpdate:modelValue":a[1]||(a[1]=c=>e(n).value.value=c),"error-messages":e(n).errorMessage.value},null,8,["modelValue","error-messages"]),s(I,{class:"w-25",type:"submit",color:"green",loading:e(i)},{default:t(()=>[U("登入")]),_:1},8,["loading"])]),_:1},8,["onSubmit","disabled"])]),_:1})]),_:1})]),_:1}))}},W=w(z,[["__scopeId","data-v-a49c258d"]]);export{W as default};
