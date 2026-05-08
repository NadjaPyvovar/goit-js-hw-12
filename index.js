import{a as S,S as q,i as a}from"./assets/vendor-yX9q722l.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const R="https://pixabay.com/api/",$="55760556-ecccc072bd7fbf440194d3609";async function p(o,e=1){const s=new URLSearchParams({key:$,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15});return(await S.get(`${R}?${s}`)).data}const y=document.querySelector(".gallery"),f=document.querySelector(".loader"),m=document.querySelector(".load-btn"),A=new q(".gallery a",{captionsData:"alt",captionDelay:250});function h(o){const e=o.map(({largeImageURL:s,webformatURL:i,tags:t,likes:r,views:c,comments:v,downloads:P})=>`
    <li class="gallery-item">
     <a class="gallery-link" href="${s}">
      <img 
        class="gallery-image" 
        src="${i}"
        alt="${t}"
        />
     </a>
 
     <div class="info">
      <p><b>Likes</b><span>${r}</span></p>
      <p><b>Views</b><span>${c}</span></p>
      <p><b>Comments</b><span>${v}</span></p>
      <p><b>Downloads</b><span>${P}</span></p>
     </div>
    </li>  `).join("");y.insertAdjacentHTML("beforeend",e),A.refresh()}function B(){y.innerHTML=""}function g(){f.classList.add("is-visible")}function b(){f.classList.remove("is-visible")}function L(){m.style.display="block"}function l(){m.style.display="none"}const E=document.querySelector(".form"),M=document.querySelector(".load-btn");let n=1,u="",d=0;const w=15;l();E.addEventListener("submit",async o=>{if(o.preventDefault(),u=o.currentTarget.elements["search-text"].value.trim(),!u){a.error({position:"topRight",message:"Please enter a search query!"});return}n=1,d=0,B(),l(),g();try{const e=await p(u,n);if(!e||!Array.isArray(e.hits))throw new Error("Invalid API response");if(d=e.totalHits||0,e.hits.length===0){a.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}h(e.hits),n*w<d?L():(l(),a.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}catch{a.error({position:"topRight",message:"Something went wrong. Please try again later!"})}finally{b()}});M.addEventListener("click",async()=>{n+=1,g(),l();try{const o=await p(u,n);h(o.hits);const e=document.querySelector(".gallery-item");if(e){const s=e.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}if(n*w>=d){l(),a.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."});return}L()}catch{a.error({position:"topRight",message:"Failed to load more images."})}finally{b()}});
//# sourceMappingURL=index.js.map
