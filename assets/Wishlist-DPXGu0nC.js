import{b as d,a as c,r as u,c as n,A as p,j as t,m}from"./index-kuPgm23o.js";import{P as h}from"./LoginRequiredMessage-ChcW2L1u.js";import{P as g}from"./PageHeader-DojtT84v.js";import{L as f}from"./Loading-Dvm_kJQt.js";const x=()=>{let r=d();const{wishlistProductFullInfo:i,error:a,loading:o}=c(s=>s.wishlist),l=c(s=>s.cart.items);u.useEffect(()=>{const s=r(n("productFullInfo"));return()=>{s.abort(),r(p())}},[r]);let e=i.map(s=>({...s,quantity:l[s.id],isLiked:!0,isAuthorized:!0}));return{error:a,loading:o,fullData:e,wishlistProductFullInfo:i}},w=()=>{const{error:r,loading:i,fullData:a,wishlistProductFullInfo:o}=x();let l=a.map(e=>t.jsx(h,{...e},e.id));return t.jsxs(t.Fragment,{children:[t.jsx(g,{title:"My Wislist"}),o.length?t.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",children:t.jsx(f,{loading:i,error:r,type:"product",children:l})}):t.jsx("div",{className:"",children:t.jsx(m,{type:"empty",message:"Your wishlist is empty"})})]})};export{w as default};
