import{a as m,S as d,i}from"./assets/vendor-73qhTu8_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const g="https://pixabay.com/api/",y="55760556-ecccc072bd7fbf440194d3609";async function h(o){const t=new URLSearchParams({key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});return(await m.get(`${g}?${t}`)).data}const l=document.querySelector(".gallery"),p=document.querySelector(".loader"),b=new d(".gallery a",{captionsData:"alt",captionDelay:250});function L(o){const t=o.map(({largeImageURL:s,webformatURL:n,tags:e,likes:r,views:a,comments:u,downloads:f})=>`
    <li class="gallery-item">
     <a class="gallery-link" href="${s}">
      <img 
        class="gallery-image" 
        src="${n}"
        alt="${e}"
        />
     </a>
 
     <div class="info">
      <p><b>Likes</b><span>${r}</span></p>
      <p><b>Views</b><span>${a}</span></p>
      <p><b>Comments</b><span>${u}</span></p>
      <p><b>Downloads</b><span>${f}</span></p>
     </div>
    </li>
  
  `).join("");l.insertAdjacentHTML("beforeend",t),b.refresh()}function S(){l.innerHTML=""}function v(){p.classList.add("is-visible")}function w(){p.classList.remove("is-visible")}const c=document.querySelector("form");c.addEventListener("submit",o=>{o.preventDefault();const t=o.currentTarget.elements["search-text"].value.trim();if(!t){i.error({position:"topRight",message:"Please enter a search query!"});return}S(),v(),h(t).then(s=>{if(s.hits.length===0){i.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}L(s.hits)}).catch(s=>{i.error({position:"topRight",message:"Something went wrong. Please try again later!"})}).finally(()=>{w(),c.reset()})});
//# sourceMappingURL=index.js.map
