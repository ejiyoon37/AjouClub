import{r as g,u as d,j as t}from"./index-DWArhSub.js";import{S as x}from"./icn_search_24-2-WrgszhQ_.js";const h=({className:a,value:e,disableFocusNavigate:o=!1,...n})=>{const[r,s]=g.useState(!1),l=d(),c=e&&String(e).length>0,i=()=>r?"bg-gray-50 border-2 border-blue-400":"bg-gray-50 border-2 border-transparent",u=r?"text-blue-400":"text-gray-500";return t.jsxs("div",{className:`
        flex items-center w-full h-12 px-2.5 py-2 gap-1 rounded-lg transition-colors
        ${i()} ${a}
      `,children:[t.jsx(x,{className:`w-6 h-6 ${u}`}),t.jsx("input",{value:e,onFocus:()=>{s(!0),o||l("/search")},onBlur:()=>s(!1),placeholder:"동아리를 검색해 보세요!",className:`
          w-full h-full bg-transparent text-base font-medium placeholder-gray-300
          focus:outline-none
          ${c?"text-gray-800":"text-gray-300"}
        `,...n})]})};export{h as S};
