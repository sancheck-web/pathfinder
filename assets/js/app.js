const app = document.getElementById('app');

const STEPS = {
  step1:{title:"1. 주제 잡기",desc:"어디에서 영감을 얻어볼까? 분야를 선택해보세요.",
    grid:[["humanities","인문과학"],["social","사회과학"],["natural","자연과학"],["art","조형예술"],
          ["education","사범"],["medical","의과"],["law","법학"],["business","경영"]]},
  step2:{title:"2. 자료조사 하기",desc:"어디에서 찾을까? — 참고자료원",
    list:[["ref_encyclopedia","백과사전"],["ref_academic","학술 정보원"],["ref_stats","통계 정보원"],
          ["ref_periodicals","정기간행물 정보원"],["ref_policy","정책 정보원"]]},
  step3:{title:"3. 활동 계획하기",desc:"어떤 활동을 할 수 있을까?",
    grid:[["act_humanities","인문과학 활동"],["act_social","사회과학 활동"],["act_natural","자연과학 활동"],
          ["act_art","조형예술 활동"],["act_education","사범 활동"],["act_medical","의과 활동"],
          ["act_law","법학 활동"],["act_business","경영 활동"]]},
  step4:{title:"4. 최종보고서 작성하기",desc:"모든 것을 아우르는 보고서를 만들어보자",
    list:[["rep_intro","서론"],["rep_prior","선행연구"],["rep_method","연구방법"],
          ["rep_body","본론"],["rep_conclusion","결론"],["rep_refs","참고문헌 작성법"]]},
  step5:{title:"5. 후속 활동 계획하기",
    html:"<p>이 단계에서는 활동을 마무리하고 느낀 부족한 점이나 흥미로웠던 점을 시작으로 다시 새로운 활동을 계획합니다. 교과서 내용을 참고해 연결하면 더욱 좋습니다.</p>"}
};

const STUBS = {
  act_humanities:"인문과학 활동", act_social:"사회과학 활동", act_natural:"자연과학 활동",
  act_art:"조형예술 활동", act_education:"사범 활동", act_medical:"의과 활동",
  act_law:"법학 활동", act_business:"경영 활동",
  rep_intro:"서론: 보고서의 얼굴", rep_prior:"선행연구", rep_method:"연구방법: 어떻게 탐구했나",
  rep_body:"본론: 무엇을 알아냈나", rep_conclusion:"결론: 마무리이자 새로운 시작",
  rep_refs:"참고문헌: 꼼꼼히 살펴주세요"
};

function backBtn(target){return `<a class="back" href="#${target||'home'}">⬅ 이전 화면으로</a>`}

function renderHome(){
  app.innerHTML = `
    <h1>연구 및 보고서 작성 가이드</h1>
    <p class="subtitle">연구 및 보고서 작성 단계</p>
    <ul class="nav-list">
      <li><a href="#step1">1. 주제 잡기 — 어디에서 영감을 얻어볼까?</a></li>
      <li><a href="#step2">2. 자료조사 하기 — 어디에서 어떻게 찾아야 할까?</a></li>
      <li><a href="#step3">3. 활동 계획하기 — 어떤 활동을 할 수 있을까?</a></li>
      <li><a href="#step4">4. 최종보고서 작성하기 — 실제로 해보기</a></li>
      <li><a href="#step5">5. 후속 활동 계획하기</a></li>
    </ul>`;
}

function renderStep(key){
  const s = STEPS[key];
  let body = `<h1>${s.title}</h1>${s.desc?`<p class="subtitle">${s.desc}</p>`:''}`;
  if(s.grid){
    body += `<div class="grid">` + s.grid.map(([k,n])=>`<a class="btn" href="#${k}">${n}</a>`).join('') + `</div>`;
  } else if(s.list){
    body += `<ul class="nav-list">` + s.list.map(([k,n])=>`<li><a href="#${k}">${n}</a></li>`).join('') + `</ul>`;
  } else if(s.html){
    body += s.html;
  }
  body += backBtn('home');
  app.innerHTML = body;
}

function renderTopic(key){
  const t = window.SITE_DATA[key];
  if(!t) return renderHome();
  let html = `<h1>${t.title}</h1>`;
  t.groups.forEach(g=>{
    html += `<div class="category">${g.category}</div>`;
    g.sites.forEach(s=>{
      html += `<div class="card">
        <h4><a href="${s.url}" target="_blank" rel="noopener">${s.name}</a></h4>
        <div class="tags">${(s.tags||[]).map(x=>`<span class="tag">#${x}</span>`).join('')}</div>
        <p class="desc">${s.desc||''}</p>
        ${s.items&&s.items.length?`<ul class="items">${s.items.map(i=>`<li>${i}</li>`).join('')}</ul>`:''}
        ${s.warn?`<div class="warn">⚠️ ${s.warn}</div>`:''}
      </div>`;
    });
  });
  html += backBtn('home');
  app.innerHTML = html;
}

function renderStub(key){
  app.innerHTML = `<h1>${STUBS[key]}</h1><p class="subtitle">여기에 상세 내용을 작성하세요.</p>` + backBtn('home');
}

function route(){
  const h = location.hash.replace('#','') || 'home';
  if(h==='home') return renderHome();
  if(STEPS[h]) return renderStep(h);
  if(window.SITE_DATA[h]) return renderTopic(h);
  if(STUBS[h]) return renderStub(h);
  renderHome();
}
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
