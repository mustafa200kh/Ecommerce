import{a as l,b as c,r as d,c as o,B as n,A as x,z as m,j as s}from"./index-kuPgm23o.js";import"./LoginRequiredMessage-ChcW2L1u.js";import{P as p}from"./PageHeader-DojtT84v.js";const h="/Ecommerce/assets/profilePic-DL0YoLXE.jpg",N=()=>{const{user:e}=l(t=>t.auth),a=c();d.useEffect(()=>{a(o("productFullInfo"));const t=a(n());return()=>{t.abort(),a(x()),a(m())}},[a]);const r=l(t=>t.order.orders.length),i=l(t=>t.wishlist.wishlistProductFullInfo.length);return s.jsxs("div",{className:"w-full",children:[s.jsx(p,{title:"Hello, Sir"}),s.jsxs("div",{className:"mx-auto text-center",children:[s.jsx("div",{className:"relative h-[200px] mb-2",children:s.jsx("img",{src:h,alt:"Profile-Image",className:"w-[200px] h-[200px] rounded-full absolute left-1/2 -translate-x-1/2"})}),s.jsxs("div",{className:"w-full mb-5",children:[s.jsxs("p",{className:" text-2xl text-lighttext dark:text-white",children:[" ",e==null?void 0:e.firstname.toUpperCase()," ",e==null?void 0:e.lastname.toUpperCase()]}),s.jsxs("p",{className:"dark:text-slate-300",children:[" ",e==null?void 0:e.email]})]}),s.jsx("hr",{className:"w-1/2 relative left-1/2 -translate-x-1/2"}),s.jsxs("div",{className:"flex items-center justify-center p-3",children:[s.jsxs("div",{className:"border-r-[1px] border-solid border-r-[#ddd] font-semibold px-3",children:[s.jsx("p",{className:"dark:text-white",children:"Orders"}),s.jsx("p",{className:"dark:text-white",children:r})]}),s.jsxs("div",{className:"px-3 font-semibold",children:[s.jsx("p",{className:"dark:text-white",children:"Wishlist"}),s.jsx("p",{className:"dark:text-white",children:i})]})]})]})]})};export{N as default};
