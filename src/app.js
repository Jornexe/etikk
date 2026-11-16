import { categories, concepts, questions, dilemmas, writingPrompts } from './data.js';
import { freshState, loadState, saveState, recordActivity, dateKey, shuffle, makeQuiz, mastery } from './state.js';
import { examQuestions, criteriaForCase } from './exam-prep.js';
import { renderExamBanner, renderExamOverview, renderExamBrief, renderExamNotes } from './exam-prep-view.js';
import { initTheme } from './theme.js';
import { renderLesson, renderCardAnswer, selectCsrLevel } from './lesson-view.js';
import { lessons } from './learning.js';
import { draftWordCount, renderExamCoach, renderWritingReview, writingCriteria } from './exam.js';
import { filterRevisionCards, studyDays } from './revision.js';
import { renderRevision, renderRevisionResults } from './revision-view.js';

const theme = initTheme(window);

const paths = {
  book: '<path d="M12 6c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Zm0 0v15"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  cards: '<rect x="6" y="7" width="15" height="14" rx="3"/><path d="M3 16V6a3 3 0 0 1 3-3h11M10 12h7m-7 4h4"/>',
  quiz: '<rect x="5" y="3" width="14" height="18" rx="3"/><path d="m9 9 1 1 3-3m-4 8 1 1 3-3m2-4h1m-1 6h1"/>',
  chat: '<path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 0 1 18 0Z"/><path d="M7 10h10M7 14h6"/>',
  chart: '<path d="M4 3v18h17M9 16v-5m5 5V6m5 10v-7"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6 7a7 7 0 0 1 12-1l2 6M4 12l2 6a7 7 0 0 0 12-1"/>',
  spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  leaf: '<path d="M20 3C8 2 2 9 7 17c8 5 15-1 13-14ZM4 21 16 9"/>',
  people: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m3 11v-3a5 5 0 0 0-2-4"/>',
  bank: '<path d="m2 8 10-5 10 5H2Zm2 13h16M6 11v7m6-7v7m6-7v7"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v1m0 18v1M2 12h1m18 0h1M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
  moon: '<path d="M20.8 13a9 9 0 0 1-9.8-9.8A9 9 0 1 0 20.8 13Z"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.book}</svg>`;
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const root = document.querySelector('#app');
let storage;
try { storage = window.localStorage; } catch { /* Private browsing can disable storage. */ }
let state = loadState(storage);
let storageFailed = false;
let view = ['home', 'cards', 'quiz', 'exams', 'revision', 'dilemmas', 'library', 'progress'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home';
let category = 'all', query = '', deck = null, cardIndex = 0, flipped = false, cardKnown = 0;
let quiz = null, quizIndex = 0, selected = null, checked = false, answers = [];
let activeDilemma = null, showGuide = false;
let revisionMode = 'sheet', revisionTopic = 'all', revisionQuery = '', recallSession = null, recallIndex = 0, recallRevealed = false;
const pageNames = { home: 'Oversikt', cards: 'Flashcards', quiz: 'Quiz', exams: 'Eksamensøving', revision: 'Huskeark', dilemmas: 'Dilemmaer', library: 'Begrepsoversikt', progress: 'Min fremgang' };
function persist() {
  storageFailed = !saveState(storage, state);
  const notice = document.querySelector('#storage-notice');
  if (notice) notice.hidden = !storageFailed;
}
function navigate(next) {
  view = next; category = 'all'; query = ''; activeDilemma = null; showGuide = false;
  location.hash = next;
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.querySelector('main').focus({ preventScroll: true });
}
function badge(c) { return `<span class="badge ${categories[c.category].color}">${categories[c.category].short}</span>`; }
function categorySelect(id = 'category') {
  return `<label class="select-label">Tema <select id="${id}"><option value="all">Alle temaer</option>${Object.entries(categories).map(([key, c]) => `<option value="${key}" ${category === key ? 'selected' : ''}>${c.label}</option>`).join('')}</select></label>`;
}
function pageHeader(eyebrow, title, subtitle) { return `<div class="page-heading"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="muted">${subtitle}</p></div>`; }
function art() {
  return `<svg class="hero-art" viewBox="0 0 360 280" fill="none" aria-hidden="true">
    <circle cx="184" cy="139" r="98" stroke="#829784" stroke-dasharray="3 8"/><ellipse cx="184" cy="139" rx="136" ry="61" transform="rotate(-30 184 139)" stroke="#b5bda5"/>
    <circle cx="288" cy="78" r="5" fill="#b7a176"/><circle cx="87" cy="205" r="5" fill="#587763"/>
    <g transform="translate(121 81) rotate(-12 60 65)"><rect x="0" y="0" width="114" height="143" rx="12" fill="#d6dfce" stroke="#6a836e"/><rect x="12" y="-10" width="114" height="143" rx="12" fill="#f8f5e9" stroke="#6a836e"/><path d="M35 16h66M35 25h45" stroke="#b2bea8" stroke-width="3" stroke-linecap="round"/>
    <path d="M67 47v57m-30 0h60M42 64h50m-25-13-25 13m25-13 25 13M42 64l-13 24h26L42 64Zm50 0L79 88h26L92 64Z" stroke="#41634e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M29 88q13 13 26 0M79 88q13 13 26 0" fill="#c4d3b9" stroke="#41634e" stroke-width="2.5"/></g>
    <g transform="translate(57 54) rotate(-12)"><rect width="88" height="31" rx="15" fill="#e3e9da"/><text x="44" y="20" text-anchor="middle" fill="#41634e" font-size="11" font-family="sans-serif">Tenk kritisk</text></g>
    <g transform="translate(231 198) rotate(8)"><rect width="89" height="31" rx="15" fill="#eaddc8"/><text x="44" y="20" text-anchor="middle" fill="#756140" font-size="11" font-family="sans-serif">Se flere sider</text></g>
    <path d="m271 128 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8ZM96 117l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#889a74"/>
  </svg>`;
}
function shell(content) {
  const navItem = (key, symbol) => `<a class="nav-item ${view === key ? 'active' : ''}" href="#${key}" data-nav="${key}" ${view === key ? 'aria-current="page"' : ''}>${icon(symbol)}<span>${pageNames[key]}</span>${key === 'cards' ? '<span class="nav-count">12</span>' : ''}</a>`;
  return `<a class="skip-link" href="#main">Hopp til innhold</a><aside class="sidebar"><a href="#home" data-nav="home" class="brand"><img src="/assets/study-mark.svg" width="43" height="43" alt=""/><span>etikk<span class="brand-dot">.</span><small>Ditt lille øvingsrom</small></span></a><div class="sidebar-course"><span class="tiny-label">DITT FAG</span><strong>Etikk og samfunnsansvar</strong><span>Begrep for begrep.</span></div><nav aria-label="Hovedmeny"><p class="nav-label">ØVINGSROM</p>${navItem('home', 'grid')}${navItem('cards', 'cards')}${navItem('quiz', 'quiz')}${navItem('exams', 'book')}${navItem('revision', 'spark')}${navItem('dilemmas', 'chat')}<p class="nav-label second-label">BIBLIOTEK</p>${navItem('library', 'book')}${navItem('progress', 'chart')}</nav><div class="sidebar-bottom"><div class="small-note">${icon('leaf')}<p>Litt hver dag<br/><strong>gjør en forskjell.</strong></p></div><span class="device-note"><span></span> Lagres på denne enheten</span></div></aside><div class="workspace"><header class="topbar"><div><span class="breadcrumb">Øvingsrom</span><span class="breadcrumb-separator">/</span><strong>${pageNames[view]}</strong></div><div class="topbar-right"><span class="course-label">ETIKK & SAMFUNNSANSVAR</span><button class="theme-toggle" data-action="toggle-theme" aria-label="Mørk modus" aria-pressed="${theme.isDark()}">${icon('moon', 'theme-moon')}${icon('sun', 'theme-sun')}<span>Mørk modus</span></button><span class="avatar" aria-label="Din lokale profil">E</span></div></header><main id="main" tabindex="-1">${content}</main><footer><span>Et lite steg nærmere forståelse.</span><a href="#library" data-nav="library">Basert på begrepsguiden din ${icon('book')}</a></footer></div><div id="storage-notice" class="storage-notice" role="status" ${storageFailed ? '' : 'hidden'}>Nettleseren tillater ikke lagring. Fremgangen er tilgjengelig mens appen er åpen.</div>`;
}
function homePage() {
  const known = mastery(state, concepts), pct = Math.round(known / concepts.length * 100);
  const totalAnswers = Object.values(state.activity).reduce((a, b) => a + b, 0);
  return `<section class="welcome-line"><span>${icon('sun')} Et godt tidspunkt å lære noe.</span><span class="date-label">${new Intl.DateTimeFormat('nb-NO', { day: 'numeric', month: 'long' }).format(new Date())}</span></section><section class="hero"><div class="hero-copy"><p class="eyebrow">ETIKK, LITT OM GANGEN</p><h1>Litt øving.<br/>Bedre <em>forståelse.</em></h1><p>Fra «jeg har lest det» til «jeg kan forklare det».<br class="desktop-break"/> Gjør begrepene til dine, én liten økt om gangen.</p><button class="button primary" data-action="quick-cards">Start en økt ${icon('arrow')}</button><span class="hero-meta">${icon('clock')} Omtrent 5 minutter · helt i ditt tempo</span></div>${art()}</section><section class="stats-strip" aria-label="Din læring"><div class="stat-main"><span class="progress-ring" style="--progress:${pct}%"><span>${pct}<small>%</small></span></span><div><strong>${known} av 12 begreper</strong><span>markert som «kan det»</span></div></div><div class="stat-item"><span class="stat-icon sage">${icon('cards')}</span><div><strong>${totalAnswers}</strong><span>øvinger gjennomført</span></div></div><div class="stat-item"><span class="stat-icon peach">${icon('quiz')}</span><div><strong>${state.quizzes.length}</strong><span>fullførte quizer</span></div></div><div class="week-activity"><span>Din siste uke</span><div>${Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); const active = !!state.activity[dateKey(d)]; return `<span class="day ${active ? 'done' : ''} ${i === 6 ? 'today' : ''}" title="${dateKey(d)}: ${state.activity[dateKey(d)] || 0} øvinger"><small>${new Intl.DateTimeFormat('nb-NO', { weekday: 'narrow' }).format(d)}</small><i>${active ? icon('check') : ''}</i></span>`; }).join('')}</div></div></section><section class="practice-section"><div class="section-heading"><div><p class="eyebrow">FINN DIN MÅTE</p><h2>Hvordan vil du øve?</h2></div><span class="muted small">Tre veier til bedre forståelse</span></div><div class="mode-grid">${[
    ['cards', 'cards', 'sage', '01', 'Vend et kort. Finn ordene.', 'Flashcards', 'Hent frem det du husker, før du snur kortet og sjekker forklaringen.', '12 begreper', 'Øv med flashcards'],
    ['quiz', 'quiz', 'peach', '02', 'Test det du tror du kan.', 'Quiz', 'Skill teoriene fra hverandre og forstå hvorfor et svar er riktig.', `${questions.length} spørsmål`, 'Ta en quiz'],
    ['dilemmas', 'chat', 'lavender', '03', 'Gå fra teori til virkelighet.', 'Dilemmaer', 'Utforsk gråsonene. Bruk teoriene, prøv et motargument og ta stilling.', `${dilemmas.filter(d => !d.source).length - 1} dilemmaer + eksamensøving`, 'Utforsk dilemmaer'],
  ].map(([route, symbol, color, number, kicker, title, body, meta, cta]) => `<a href="#${route}" data-nav="${route}" class="mode-card ${color}"><div class="mode-card-top"><span class="mode-icon">${icon(symbol)}</span><span class="mode-number">${number}</span></div><span class="mode-kicker">${kicker}</span><h3>${title}</h3><p>${body}</p><div class="mode-meta">${meta}<span>·</span>I ditt tempo</div><div class="mode-cta">${cta}${icon('arrow')}</div></a>`).join('')}</div></section>${renderExamBanner()}<section class="bottom-grid"><div class="topic-panel"><div class="section-heading"><h2>Pensum, i oversikt</h2><a href="#library" data-nav="library" class="text-link">Se alle begrepene ${icon('arrow')}</a></div>${Object.entries(categories).map(([id, c]) => { const items = concepts.filter(x => x.category === id); const n = items.filter(x => state.ratings[x.id] === 'known').length; return `<a class="topic-row" href="#library" data-topic="${id}"><span class="topic-dot ${c.color}"></span><span><strong>${c.label}</strong><small>${items.length} begreper${id === 'ethics' ? ' · inkludert 3 tilleggsbegreper' : ''}</small></span><span class="mini-track"><i style="width:${n / items.length * 100}%"></i></span>${icon('chevron')}</a>`; }).join('')}</div><aside class="thought"><span class="thought-icon">${icon('spark')}</span><p class="eyebrow">ET LITE STUDIETIPS</p><h3>Forklar det som om<br/>du lærte det bort.</h3><p>Kan du bruke egne ord og ett konkret eksempel? Da er du på god vei.</p><span>Forstå først. Husk bedre.</span></aside></section>`;
}
function cardsPage() {
  let content;
  if (!deck) content = `<div class="setup-panel"><span class="large-mode sage">${icon('cards')}</span><h2>Hva husker du uten å se?</h2><p>Forklar begrepet høyt eller for deg selv. Vend kortet,<br class="desktop-break"/> og velg om du kan det eller vil øve mer.</p><div class="setup-options">${categorySelect()}</div><div class="setup-actions"><button class="button primary" data-action="start-cards">Start med ${concepts.filter(c => category === 'all' || c.category === category).length} kort ${icon('arrow')}</button><button class="button secondary" data-action="weak-cards" ${concepts.some(c => state.ratings[c.id] === 'again') ? '' : 'disabled'}>Øv på usikre begreper</button></div><small class="muted">Du vurderer selv hva du kan. Kortene blandes for hver økt.</small></div>`;
  else if (cardIndex >= deck.length) content = `<section class="result-panel"><span class="large-mode sage">${icon('check')}</span><p class="eyebrow">ØKT FULLFØRT</p><h2 tabindex="-1">Et lite steg videre.</h2><p>Du markerte ${cardKnown} av ${deck.length} kort som «kan det» i denne økten.</p><p class="muted">Begreper du var usikker på, finner du igjen under «Øv på usikre begreper».</p><div class="setup-actions"><button class="button primary" data-action="cards-reset">Øv videre ${icon('arrow')}</button><button class="button secondary" data-nav="quiz">Prøv en quiz</button></div></section>`;
  else {
    const c = deck[cardIndex];
    content = `<section class="flashcard-session">
      <div class="session-top"><span>Kort <strong>${cardIndex + 1}</strong> av ${deck.length}</span><button class="text-button" data-action="cards-reset">Avslutt økten</button></div>
      <div class="session-track"><i style="width:${cardIndex / deck.length * 100}%"></i></div>
      <article class="flashcard ${flipped ? 'is-flipped' : ''}">
        <div class="flashcard-top">${badge(c)}<span class="tiny-label">${flipped ? 'FORKLARING' : 'HVA BETYR BEGREPET?'}</span></div>
        <div class="flashcard-content">
          <span class="muted small">${c.author}${c.supplementary ? ' · Tilleggsbegrep' : ''}</span>
          <h2 tabindex="-1">${c.name}</h2>
          <div class="card-face">${flipped ? renderCardAnswer(c) : `<p class="muted card-prompt">Prøv å forklare med egne ord.<br/>Kan du også komme på et eksempel?</p><span class="card-watermark">${icon('cards')}</span>`}</div>
        </div>
        ${flipped ? '' : `<button class="button primary" data-action="flip">${icon('refresh')} Vis forklaringen</button>`}
      </article>
      <div class="card-actions">${cardActions()}</div>
    </section>`;
  }
  return pageHeader('HENT FREM DET DU KAN', 'Flashcards', 'Egne ord først. Forklaringen etterpå.') + `<div class="study-container">${content}</div>`;
}
function quizPage() {
  let content;
  if (!quiz) content = `<section class="setup-panel"><span class="large-mode peach">${icon('quiz')}</span><h2>Sett forståelsen på prøve.</h2><p>Velg ett svar per spørsmål. Du får en forklaring<br class="desktop-break"/> etter hvert svar, også når du svarer riktig.</p><div class="setup-options">${categorySelect()}<label class="select-label">Antall spørsmål<select id="quiz-count"><option value="5">5 spørsmål</option><option value="10">10 spørsmål</option><option value="${questions.length}">Alle tilgjengelige</option></select></label></div><button class="button primary" data-action="start-quiz">Start quiz ${icon('arrow')}</button><p class="muted small">Ingen tidtaking. Her handler det om å lære.</p><button class="text-button" data-action="argumentation-quiz">Egen økt: drøfting og presisjon · ${questions.filter(question => question.skill === 'argumentation').length} spørsmål på tvers av temaer</button></section>`;
  else if (quizIndex >= quiz.length) { const score = answers.filter(a => a.correct).length; content = `<section class="result-panel"><span class="large-mode peach">${icon('spark')}</span><p class="eyebrow">QUIZ FULLFØRT</p><h2>${score} av ${quiz.length} riktige</h2><p>${score === quiz.length ? 'Alle riktige! Prøv å anvende teoriene i et dilemma.' : 'Bruk forklaringene til å gjøre de usikre begrepene tydeligere.'}</p><div class="setup-actions"><button class="button primary" data-action="quiz-reset">Ny quiz ${icon('arrow')}</button>${score < quiz.length ? `<button class="button secondary" data-action="retry-quiz">Øv på feilene</button>` : '<button class="button secondary" data-nav="dilemmas">Prøv et dilemma</button>'}</div><div class="answer-review">${answers.map((a, i) => `<details><summary><span class="answer-status ${a.correct ? 'right' : 'wrong'}">${icon(a.correct ? 'check' : 'close')}</span><span>${quiz[i].prompt}</span>${icon('chevron')}</summary><div><p><strong>Riktig svar:</strong> ${quiz[i].options[quiz[i].correct]}</p><p>${quiz[i].explanation}</p></div></details>`).join('')}</div></section>`; }
  else { const q = quiz[quizIndex], c = concepts.find(c => c.id === q.concept); content = `<div class="session-top"><span>Spørsmål <strong>${quizIndex + 1}</strong> av ${quiz.length}</span><button class="text-button" data-action="quiz-reset">Avslutt quizen</button></div><div class="session-track"><i style="width:${quizIndex / quiz.length * 100}%"></i></div><section class="question-panel">${badge(c)}<h2>${q.prompt}</h2><div class="answer-options" role="group" aria-label="Svaralternativer">${q.options.map((option, i) => `<button class="answer-option ${selected === i ? 'selected' : ''} ${checked && i === q.correct ? 'correct' : ''} ${checked && selected === i && i !== q.correct ? 'incorrect' : ''}" data-action="select-answer" data-index="${i}" aria-pressed="${selected === i}" ${checked ? 'disabled' : ''}><span class="option-letter">${String.fromCharCode(65 + i)}</span><span>${option}</span>${checked && i === q.correct ? icon('check') : ''}</button>`).join('')}</div>${checked ? `<div class="feedback ${selected === q.correct ? 'right' : 'wrong'}" role="status"><strong>${selected === q.correct ? 'Riktig tenkt!' : 'Her er det verdt å stoppe opp.'}</strong><p>${q.explanation}</p></div><details class="quiz-lesson"><summary>Forstå begrepet: ${c.name} <span aria-hidden="true">+</span></summary><p class="definition">${c.definition}</p>${renderLesson(c, { scope: 'quiz' })}</details><button class="button primary" data-action="next-question">${quizIndex === quiz.length - 1 ? 'Se resultatet' : 'Neste spørsmål'} ${icon('arrow')}</button>` : `<button class="button primary" data-action="check-answer" ${selected === null ? 'disabled' : ''}>Sjekk svaret ${icon('arrow')}</button>`}</section>`; }
  return pageHeader('TEST OG FORSTÅ', 'Quiz', 'Små spørsmål som hjelper deg å se de viktige forskjellene.') + `<div class="study-container">${content}</div>`;
}
function examsPage() {
  if (activeDilemma) return dilemmasPage();
  return pageHeader('FORBERED DEG PÅ OPPGAVETYPENE', 'Eksamensøving', 'Fra oppsummeringen 13. november 2026 · velg, skriv og vurder selv.') + '<p class="revision-exam-link"><a class="text-link" href="#revision" data-nav="revision">Repeter først: huskeark, selvtest og femdagersplan →</a></p>' + renderExamOverview(state);
}
function revisionPage() {
  return pageHeader('REPETISJON MED EGNE ORD', 'Huskeark', 'Fra etikk-eksamensarket · forstå, test deg og planlegg øvingen.') + renderRevision(state, {
    mode: revisionMode, topic: revisionTopic, query: revisionQuery,
    session: recallSession, index: recallIndex, revealed: recallRevealed,
  });
}
function dilemmasPage() {
  if (!activeDilemma) return pageHeader('BRUK DET DU HAR LÆRT', 'Det er sjelden helt svart-hvitt.', 'Øv på å drøfte, begrunne og se en sak fra flere sider.') + renderExamCoach() + `<div class="dilemma-grid">${dilemmas.filter(d => !d.source).map((d, i) => `<article class="dilemma-card"><div class="dilemma-illustration ${['sage', 'peach', 'lavender'][i % 3]}">${icon(d.icon)}<span>CASE 0${i + 1}</span></div><div class="dilemma-card-body"><p class="eyebrow">${d.label}</p><h2>${d.title}</h2><p>${d.story.slice(0, d.story.indexOf('. ') + 1)}</p><div class="dilemma-meta">${icon('clock')} ${d.time}${state.completedDilemmas.includes(d.id) ? '<span class="completed-label">Gjennomgått ✓</span>' : state.drafts[d.id]?.some(s => s.trim()) ? '<span>Utkast lagret</span>' : ''}</div><button class="button secondary" data-action="open-dilemma" data-id="${d.id}">Åpne dilemma ${icon('arrow')}</button></div></article>`).join('')}</div><div class="info-note">${icon('book')}<p>Dette er øvingscase laget ut fra temaene i guiden din. Bruk drøftingsforslaget til å sammenligne perspektiver og begrunnelser.</p></div>`;
  const d = activeDilemma, draft = state.drafts[d.id] || Array(5).fill('');
  const prompts = d.prompts || writingPrompts;
  return `<button class="text-link back-link" data-action="close-dilemma">← ${d.source ? 'Alle eksamensalternativer' : 'Alle dilemmaer'}</button>` + pageHeader(d.label, d.title, 'Ta deg tid til å begrunne. Det finnes rom for flere gode vurderinger.') + `<section class="case-story"><span class="large-mode sage">${icon(d.icon)}</span><div><p>${d.story}</p><strong>${d.question}</strong></div></section>${renderExamBrief(d)}<div class="writing-layout"><section class="writing-area"><div class="section-heading"><h2>Din drøfting</h2><span id="draft-status" class="muted small" role="status">${storageFailed ? 'Lagring utilgjengelig' : 'Lagres automatisk på enheten'}</span></div><p class="writing-count"><span id="draft-word-count">${draftWordCount(draft)}</span> ord totalt · Lengde er ikke et mål på kvalitet.</p>${prompts.map((p, i) => `<label class="writing-prompt"><span><i>0${i + 1}</i>${p.title}</span><small>${p.hint}</small><textarea data-draft="${i}" rows="4" placeholder="Skriv dine tanker her …">${esc(draft[i])}</textarea></label>`).join('')}<button class="button primary" data-action="show-guide">${icon('book')} ${showGuide ? 'Skjul drøftingsforslag' : 'Sammenlign med et drøftingsforslag'}</button>${showGuide ? `<section class="discussion-guide"><p class="eyebrow">ET MULIG RESONNEMENT</p><h2>Se etter begrunnelser, ikke identiske svar.</h2><p class="muted">Dette er et veiledende drøftingsforslag. Det gir ingen automatisk vurdering av teksten din.</p>${d.guide.map((g, i) => `<h3>${i + 1}. ${prompts[i].title}</h3><p>${g}</p>`).join('')}${renderWritingReview(state.reviews[d.id], criteriaForCase(d, writingCriteria))}<label class="complete-check"><input type="checkbox" id="complete-dilemma" ${state.completedDilemmas.includes(d.id) ? 'checked' : ''}/> Jeg har sammenlignet perspektivene og begrunnelsen min.</label></section>` : ''}</section><aside class="writing-aside">${renderExamNotes(d)}<p class="eyebrow">BEGREPER Å VURDERE</p>${d.concepts.map(id => { const c = concepts.find(c => c.id === id); return `<details><summary>${c.name}${icon('chevron')}</summary><p>${c.definition}</p><details class="aside-depth"><summary>Se forklaring og figur</summary>${renderLesson(c, { compact: true, scope: 'dilemma-' + c.id })}</details></details>`; }).join('')}<div class="sentence-starter"><span>${icon('spark')}</span><h3>Kom i gang med ordene</h3><p>«Fra et … perspektiv taler dette for … fordi … . Motargumentet er … . Jeg legger størst vekt på … fordi … .»</p></div></aside></div>`;
}
function libraryPage() {
  return pageHeader('DITT LILLE OPPSLAGSVERK', 'Begrepene, samlet.', '9 hovedbegreper og 3 tilleggsbegreper fra guiden din.') + `<div class="library-tools"><label class="search-box">${icon('search')}<input id="concept-search" type="search" aria-label="Søk etter begrep eller navn" placeholder="Søk etter begrep eller navn …" value="${esc(query)}"/></label>${categorySelect()}</div><div id="concept-list">${conceptList()}</div><section class="source-note"><h2>Om innholdet</h2><p>Definisjonene følger «Etikk begreper.md», revidert 12. november 2026. Eksempler, quiz og øvingscase er tilpasset fra temaene i denne guiden. Huskearket bruker «etikk-eksamensark copy (1).pdf» til repetisjonskort, selvtest og en lagret femdagersplan, med presiseringer av forenklinger i arket. Eksamensøving bruker også «Oppsummering13112026.pdf», med tre eksempeloppgaver og supplerende teoripåminnelser med sidehenvisninger. Guiden erstatter ikke pensum eller de konkrete eksamensoppgavene.</p><p>Sentrale navn: Bentham og Mill, Kant, Aristoteles, Freeman, Friedman, Carroll, Porter og Kramer, og Elkington. Eksternaliteter er et samfunnsøkonomisk begrep.</p></section>`;
}
function conceptList() {
  const filtered = concepts.filter(c => (category === 'all' || category === c.category) && `${c.name} ${c.author} ${c.definition} ${JSON.stringify(lessons[c.id])}`.toLocaleLowerCase('nb').includes(query.toLocaleLowerCase('nb')));
  return `<p class="muted small" role="status">${filtered.length} begreper</p><div class="concept-list">${filtered.length ? filtered.map(c => `<details class="concept-detail"><summary><span class="concept-symbol ${categories[c.category].color}">${icon(c.category === 'ethics' ? 'book' : c.category === 'responsibility' ? 'people' : 'leaf')}</span><span class="concept-title"><strong>${c.name}</strong><small>${c.author}${c.supplementary ? ' · Tilleggsbegrep' : ''}</small></span>${state.ratings[c.id] === 'known' ? '<span class="known-label">Kan det ✓</span>' : ''}${badge(c)}${icon('chevron')}</summary><div class="concept-body"><p class="definition">${c.definition}</p>${renderLesson(c, { scope: 'library-' + c.id })}</div></details>`).join('') : '<div class="empty-state"><h2>Ingen treff ennå.</h2><p>Prøv et annet søkeord eller velg alle temaer.</p></div>'}</div>`;
}
function progressPage() {
  const known = mastery(state, concepts), total = state.quizzes.reduce((n, q) => n + q.total, 0), correct = state.quizzes.reduce((n, q) => n + q.score, 0);
  return pageHeader('SMÅ STEG TELLER', 'Se hvor langt du har kommet.', 'En oversikt over øvingen din, lagret i denne nettleseren.') + `<div class="progress-stats"><div><span class="large-mode sage">${icon('cards')}</span><strong>${known}<small> / 12</small></strong><span>begreper du har markert «kan det»</span></div><div><span class="large-mode peach">${icon('quiz')}</span><strong>${total ? Math.round(correct / total * 100) + '%' : '—'}</strong><span>riktige svar i fullførte quizer</span></div><div><span class="large-mode lavender">${icon('chat')}</span><strong>${state.completedDilemmas.filter(id => dilemmas.some(d => d.id === id)).length}<small> / ${dilemmas.length}</small></strong><span>øvinger du har gjennomgått</span></div></div><section class="progress-panel"><h2>Din trygghet på begrepene</h2><p class="muted">Basert på den siste vurderingen din i flashcards.</p>${Object.entries(categories).map(([id, c]) => `<h3 class="progress-category">${c.label}</h3>${concepts.filter(c => c.category === id).map(c => `<div class="progress-row"><span>${c.name}</span><span class="rating-label ${state.ratings[c.id] || 'unseen'}">${state.ratings[c.id] === 'known' ? 'Kan det' : state.ratings[c.id] === 'again' ? 'Øv mer' : 'Ikke vurdert'}</span></div>`).join('')}`).join('')}<button class="button primary" data-nav="cards">Fortsett med flashcards ${icon('arrow')}</button></section><section class="progress-panel"><h2>Siste quizer</h2>${state.quizzes.length ? `<div class="quiz-history">${state.quizzes.slice(-8).reverse().map(q => `<div><span>${new Intl.DateTimeFormat('nb-NO', { dateStyle: 'medium' }).format(new Date(q.date))}</span><strong>${q.score} av ${q.total} riktige</strong></div>`).join('')}</div>` : '<p class="muted">Når du har fullført en quiz, dukker resultatet opp her.</p>'}</section><div class="reset-area"><p class="muted small">Fremgang og utkast lagres bare på denne enheten.</p><button class="text-button" data-action="reset-prompt">Nullstill fremgang og utkast</button><div id="reset-confirm" hidden><p>Dette sletter alle kortvurderinger, quizresultater, dilemmatekster, selvtestvurderinger og planavkrysninger i denne nettleseren.</p><button class="button danger" data-action="reset-confirm">Slett all lokal fremgang</button><button class="button secondary" data-action="reset-cancel">Avbryt</button></div></div>`;
}
function render() {
  root.innerHTML = shell(({ home: homePage, cards: cardsPage, quiz: quizPage, dilemmas: dilemmasPage, exams: examsPage, revision: revisionPage, library: libraryPage, progress: progressPage })[view]());
  theme.syncButton();
  document.title = `${pageNames[view]} — Etikk`;
}
function startCards(weak = false) {
  deck = shuffle(concepts.filter(c => weak ? state.ratings[c.id] === 'again' : category === 'all' || c.category === category));
  cardIndex = 0; cardKnown = 0; flipped = false; render();
}
function startQuiz(items) { quiz = items; quizIndex = 0; selected = null; checked = false; answers = []; render(); }
function startRecall(items) {
  if (!items.length) return;
  recallSession = shuffle(items); recallIndex = 0; recallRevealed = false; render();
  document.querySelector('.recall-card h2')?.focus({ preventScroll: true });
}
function cardActions() {
  return flipped
    ? `<div class="rating-buttons"><button class="button secondary" data-action="rate" data-rating="again">${icon('refresh')} Øv mer</button><button class="button primary" data-action="rate" data-rating="known">${icon('check')} Kan det</button></div>`
    : '<p class="keyboard-hint">Ta deg tid til å tenke før du snur kortet.</p>';
}
function keepCardStartVisible() {
  const card = document.querySelector('.flashcard');
  if (!card) return;
  const top = card.getBoundingClientRect().top;
  if (top < 16 || top > window.innerHeight * .55) {
    card.scrollIntoView({ block: 'start', behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
}
function revealCard() {
  if (!deck || flipped || cardIndex >= deck.length) return;
  const card = document.querySelector('.flashcard');
  const before = card.getBoundingClientRect().height;
  flipped = true;
  // Preserve the card and its heading instead of replacing the entire page.
  card.classList.add('is-flipped');
  card.querySelector('.tiny-label').textContent = 'FORKLARING';
  card.querySelector('.card-face').innerHTML = renderCardAnswer(deck[cardIndex]);
  card.querySelector('[data-action="flip"]').remove();
  document.querySelector('.card-actions').innerHTML = cardActions();
  const after = card.getBoundingClientRect().height;
  if (before > 0 && after > before && card.animate && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    const animation = card.animate([{ height: `${before}px` }, { height: `${after}px` }], { duration: 240, easing: 'cubic-bezier(.2,.7,.2,1)' });
    card.classList.add('is-revealing');
    const finish = () => card.classList.remove('is-revealing');
    animation.finished.then(finish, finish);
  }
  card.querySelector('.card-answer').focus({ preventScroll: true });
  keepCardStartVisible();
}
root.addEventListener('click', event => {
  const el = event.target.closest('[data-action], [data-nav], [data-topic]');
  if (!el || el.disabled) return;
  if (el.dataset.nav) { event.preventDefault(); navigate(el.dataset.nav); return; }
  if (el.dataset.topic) { event.preventDefault(); navigate('library'); category = el.dataset.topic; render(); return; }
  switch (el.dataset.action) {
    case 'csr-level': selectCsrLevel(el); break;
    case 'toggle-theme': theme.toggle(); break;
    case 'revision-mode':
      revisionMode = el.dataset.mode; render();
      document.querySelector(`[data-action="revision-mode"][data-mode="${revisionMode}"]`)?.focus({ preventScroll: true }); break;
    case 'revision-task':
      revisionMode = el.dataset.mode; revisionTopic = el.dataset.revisionTopic; revisionQuery = ''; recallSession = null;
      render(); document.querySelector('main').focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); break;
    case 'recall-start': startRecall(filterRevisionCards(revisionTopic)); break;
    case 'recall-weak': startRecall(filterRevisionCards(revisionTopic, '', state.recallRatings, true)); break;
    case 'recall-reveal':
      if (!recallSession || recallIndex >= recallSession.length || recallRevealed) break;
      recallRevealed = true; render(); document.querySelector('.recall-card h2')?.focus({ preventScroll: true }); break;
    case 'recall-rate':
      if (!recallSession || recallIndex >= recallSession.length || !recallRevealed || !['known', 'again'].includes(el.dataset.rating)) break;
      state.recallRatings[recallSession[recallIndex].id] = el.dataset.rating;
      recordActivity(state); persist(); recallIndex++; recallRevealed = false; render();
      document.querySelector('.recall-card h2, .revision-recall h2')?.focus({ preventScroll: true }); break;
    case 'recall-retry': startRecall((recallSession || []).filter(card => state.recallRatings[card.id] === 'again')); break;
    case 'recall-reset': recallSession = null; render(); break;
    case 'quick-cards': navigate('cards'); startCards(); break;
    case 'start-cards': startCards(); break;
    case 'weak-cards': startCards(true); break;
    case 'flip': revealCard(); break;
    case 'rate':
      if (!deck || !flipped || cardIndex >= deck.length) break;
      state.ratings[deck[cardIndex].id] = el.dataset.rating;
      if (el.dataset.rating === 'known') cardKnown++;
      recordActivity(state); persist(); cardIndex++; flipped = false; render();
      document.querySelector('.flashcard h2, .result-panel h2')?.focus({ preventScroll: true });
      keepCardStartVisible(); break;
    case 'cards-reset': deck = null; render(); break;
    case 'start-quiz': startQuiz(makeQuiz(questions, concepts, category, Number(document.querySelector('#quiz-count').value))); break;
    case 'argumentation-quiz': startQuiz(shuffle(questions.filter(question => question.skill === 'argumentation'))); break;
    case 'select-answer': if (!checked) { selected = Number(el.dataset.index); render(); document.querySelector(`[data-action="select-answer"][data-index="${selected}"]`).focus(); } break;
    case 'check-answer':
      if (selected === null || checked) break;
      checked = true; answers.push({ selected, correct: selected === quiz[quizIndex].correct });
      recordActivity(state); persist(); render(); document.querySelector('[data-action="next-question"]').focus(); break;
    case 'next-question':
      if (!checked) break;
      quizIndex++; selected = null; checked = false;
      if (quizIndex === quiz.length) { state.quizzes.push({ score: answers.filter(a => a.correct).length, total: quiz.length, date: new Date().toISOString() }); persist(); }
      render(); break;
    case 'quiz-reset': quiz = null; render(); break;
    case 'retry-quiz': startQuiz(shuffle(quiz.filter((q, i) => !answers[i].correct))); break;
    case 'exam-quiz': {
      const items = examQuestions.filter(question => el.dataset.id === 'all' || question.examCase === el.dataset.id);
      if (!items.length) break;
      navigate('quiz'); startQuiz(shuffle(items)); break;
    }
    case 'open-dilemma': {
      const task = dilemmas.find(d => d.id === el.dataset.id);
      if (!task) break;
      const destination = task.source ? 'exams' : 'dilemmas';
      if (view !== destination) navigate(destination);
      activeDilemma = task; showGuide = false; render(); window.scrollTo({ top: 0, behavior: 'instant' });
      document.querySelector('main').focus({ preventScroll: true }); break;
    }
    case 'close-dilemma': activeDilemma = null; render(); break;
    case 'show-guide': showGuide = !showGuide; render(); if (showGuide) document.querySelector('.discussion-guide').scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
    case 'reset-prompt': document.querySelector('#reset-confirm').hidden = false; break;
    case 'reset-cancel': document.querySelector('#reset-confirm').hidden = true; break;
    case 'reset-confirm': state = freshState(); deck = null; quiz = null; recallSession = null; persist(); render(); break;
  }
});
root.addEventListener('change', event => {
  if (event.target.id === 'category') { category = event.target.value; render(); }
  if (event.target.id === 'revision-topic') {
    revisionTopic = event.target.value; recallSession = null; render();
    document.querySelector('#revision-topic')?.focus({ preventScroll: true });
  }
  if (event.target.matches('[data-study-task]')) {
    const id = event.target.dataset.studyTask;
    const tasks = studyDays.flatMap(day => day.tasks);
    if (!tasks.some(task => task.id === id)) return;
    state.studyPlan[id] = event.target.checked; persist();
    document.querySelector('#study-plan-progress').textContent = `${tasks.filter(task => state.studyPlan[task.id]).length} av ${tasks.length} steg fullført`;
  }
  if (event.target.matches('[data-writing-review]') && activeDilemma) {
    const index = Number(event.target.dataset.writingReview);
    if (!Number.isInteger(index) || index < 0 || index >= writingCriteria.length) return;
    state.reviews[activeDilemma.id] ||= Array(writingCriteria.length).fill(false);
    state.reviews[activeDilemma.id][index] = event.target.checked;
    persist();
  }
  if (event.target.id === 'complete-dilemma' && activeDilemma) {
    const id = activeDilemma.id;
    if (event.target.checked && !state.completedDilemmas.includes(id)) { state.completedDilemmas.push(id); recordActivity(state); }
    if (!event.target.checked) state.completedDilemmas = state.completedDilemmas.filter(x => x !== id);
    persist();
  }
});
root.addEventListener('input', event => {
  if (event.target.id === 'revision-search') {
    revisionQuery = event.target.value;
    document.querySelector('#revision-results').innerHTML = renderRevisionResults(state, revisionTopic, revisionQuery);
  }
  if (event.target.id === 'concept-search') { query = event.target.value; document.querySelector('#concept-list').innerHTML = conceptList(); }
  if (event.target.matches('[data-draft]') && activeDilemma) {
    const id = activeDilemma.id;
    state.drafts[id] ||= Array(5).fill('');
    state.drafts[id][Number(event.target.dataset.draft)] = event.target.value;
    delete state.reviews[id];
    state.completedDilemmas = state.completedDilemmas.filter(completed => completed !== id);
    document.querySelectorAll('[data-writing-review], #complete-dilemma').forEach(checkbox => { checkbox.checked = false; });
    document.querySelector('#draft-word-count').textContent = draftWordCount(state.drafts[id]);
    persist();
    document.querySelector('#draft-status').textContent = storageFailed ? 'Lagring utilgjengelig' : 'Utkast lagret på enheten';
  }
});
window.addEventListener('hashchange', () => {
  const next = location.hash.slice(1);
  if (Object.hasOwn(pageNames, next) && next !== view) navigate(next);
});
render();
