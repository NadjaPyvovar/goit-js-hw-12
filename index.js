import{a as S,S as q,i as c}from"./assets/vendor-yX9q722l.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const $="https://pixabay.com/api/",R="55760556-ecccc072bd7fbf440194d3609";async function p(o,e=1){const s=new URLSearchParams({key:R,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15});return(await S.get(`${$}?${s}`)).data}const y=document.querySelector(".gallery"),f=document.querySelector(".loader"),m=document.querySelector(".load-btn"),A=new q(".gallery a",{captionsData:"alt",captionDelay:250});function g(o){const e=o.map(({largeImageURL:s,webformatURL:n,tags:t,likes:r,views:i,comments:v,downloads:P})=>`
    <li class="gallery-item">
     <a class="gallery-link" href="${s}">
      <img 
        class="gallery-image" 
        src="${n}"
        alt="${t}"
        />
     </a>
 
     <div class="info">
      <p><b>Likes</b><span>${r}</span></p>
      <p><b>Views</b><span>${i}</span></p>
      <p><b>Comments</b><span>${v}</span></p>
      <p><b>Downloads</b><span>${P}</span></p>
     </div>
    </li>  `).join("");y.insertAdjacentHTML("beforeend",e),A.refresh()}function B(){y.innerHTML=""}function h(){f.classList.add("is-visible")}function b(){f.classList.remove("is-visible")}function L(){m.style.display="block"}function d(){m.style.display="none"}const E=document.querySelector(".form"),M=document.querySelector(".load-btn");let a=1,l="",u=0;const w=15;d();E.addEventListener("submit",async o=>{if(o.preventDefault(),l=o.currentTarget.elements["search-text"].value.trim(),!l){c.error({position:"topRight",message:"Please enter a search query!"});return}a=1,u=0,B(),d(),h();try{const e=await p(l,a);if(!e||!Array.isArray(e.hits))throw new Error("Invalid API response");if(u=e.totalHits||0,e.hits.length===0){c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}g(e.hits),a*w<u?L():d()}catch{c.error({position:"topRight",message:"Something went wrong. Please try again later!"})}finally{b()}});M.addEventListener("click",async()=>{a+=1,h();try{const o=await p(l,a);g(o.hits);const e=document.querySelector(".gallery-item");if(e){const s=e.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}if(a*w>=u){d(),c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."});return}L()}catch{c.error({position:"topRight",message:"Failed to load more images."})}finally{b()}});
//# sourceMappingURL=index.js.map
