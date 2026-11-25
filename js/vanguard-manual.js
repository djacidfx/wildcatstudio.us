(() => {
  const search=document.getElementById('vf-search');
  if(!search)return;
  const sections=Array.from(document.querySelectorAll('.vf-chapters section'));
  const links=Array.from(document.querySelectorAll('.vf-contents nav a'));
  const index=sections.map(section=>({section,text:section.textContent.toLowerCase()}));
  const status=document.getElementById('vf-result');
  function filter(){
    const terms=search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count=0;
    index.forEach(({section,text},i)=>{const match=terms.every(t=>text.includes(t));section.hidden=!match;links[i].hidden=!match;if(match)count++});
    status.textContent=terms.length?count+' matching chapters':'';
  }
  search.addEventListener('input',filter);
  search.addEventListener('keydown',e=>{if(e.key==='Escape'){search.value='';filter()}});
  function reveal(){const section=sections.find(s=>'#'+s.id===location.hash);if(section&&section.hidden){search.value='';filter();section.scrollIntoView()}}
  window.addEventListener('hashchange',reveal);
})();