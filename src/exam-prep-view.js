import { examCases, examSource } from './exam-prep.js';

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function renderExamBanner() {
  return `<section class="exam-banner" aria-label="Repetisjon og eksamensøving"><div><p class="eyebrow">NYTT · FRA EKSAMENSARKET</p><h2>Fra huskeregel til et svar med egne ord.</h2><p>24 repetisjonskort, selvtest og en femdagersplan. Bruk det du husker på de tre eksamensalternativene.</p></div><div class="setup-actions"><a class="button primary" href="#revision" data-nav="revision">Åpne huskearket →</a><a class="button secondary" href="#exams" data-nav="exams">Øv på oppgavene</a></div></section>`;
}

export function renderExamOverview(state) {
  const completed = examCases.filter(task => state.completedDilemmas.includes(task.id)).length;
  return `<section class="exam-intro"><p class="eyebrow">FORSTÅ OPPGAVEN FØR DU SKRIVER</p><h2>Tre alternativer. Ett begrunnet svar.</h2><p>Oppsummeringen sier at du får tre alternative oppgaver og skal svare på én (s. 2). Her kan du øve på alle tre eksempeloppgavene. De viser aktuelle oppgavetyper, ikke en garanti for hva du får på eksamen.</p><ol class="exam-workflow"><li><strong>Velg og avgrens</strong><span>Finn hva oppgaven ber deg gjøre.</span></li><li><strong>Forklar og anvend</strong><span>Bruk teori på konkrete forhold.</span></li><li><strong>Drøft og begrunn</strong><span>Prøv innvendinger og ta stilling.</span></li></ol><p class="exam-source">Kilde: ${examSource}, Anne Rose Røsbak Feragen. Oppgavetekstene er gjengitt fra s. 3, 18 og 39. Disposisjoner, teoripåminnelser, quiz og drøftingsforslag er laget for appen.</p></section><div class="section-heading"><h2>Velg hva du vil forberede</h2><span class="muted small">${completed} av ${examCases.length} gjennomgått</span></div><div class="exam-case-grid">${examCases.map((task, index) => {
    const done = state.completedDilemmas.includes(task.id);
    const started = state.drafts[task.id]?.some(text => text.trim());
    return `<article class="exam-task"><span class="exam-task-number">0${index + 1}</span><p class="eyebrow">${task.label}</p><h2>${task.title}</h2><p>${task.focus}</p><ul>${task.prompts.slice(0, 3).map(prompt => `<li>${prompt.title}</li>`).join('')}</ul><p class="exam-task-status">${done ? 'Gjennomgått ✓' : started ? 'Utkast lagret · fortsett der du slapp' : 'Klar når du er'}</p><button class="button primary" data-action="open-dilemma" data-id="${task.id}">${started ? 'Fortsett besvarelsen' : 'Åpne oppgaven'} →</button><button class="text-button" data-action="exam-quiz" data-id="${task.id}">Test teorien · 4 spørsmål</button></article>`;
  }).join('')}</div><section class="exam-study-tip"><h2>En enkel øvingsøkt</h2><p>Legg en plan for svaret, skriv med egne ord og åpne drøftingsforslaget etterpå. Sjekk at du dekker alle delene av oppgaven. Velg gjerne selv en tidsramme; dokumentet oppgir ingen eksamensvarighet eller ordgrense.</p><p class="exam-source">Skriveråd i oppsummeringen, s. 62–65: dekk oppgaven, legg en plan, bruk fagstoff og forklar hvordan du tenker.</p><button class="button secondary" data-action="exam-quiz" data-id="all">Blandet eksamensquiz · 12 spørsmål</button></section>`;
}

export function renderExamBrief(task) {
  if (!task.source) return '';
  return `<section class="exam-task-brief"><p class="exam-source">Oppgavetekst: ${escape(task.source)}, s. ${task.page} · eksempeloppgave.</p><details><summary>Hva må svaret dekke?</summary><ul>${task.requirements.map(([title, hint]) => `<li><strong>${escape(title)}</strong> ${escape(hint)}</li>`).join('')}</ul></details><p class="exam-source">Skrivestøtten under og drøftingsforslaget er laget for appen. Du kan se teoripåminnelser i sidefeltet og sammenligne når du har skrevet selv.</p></section>`;
}

export function renderExamNotes(task) {
  if (!task.notes) return '';
  return `<section class="exam-theory-notes"><h2>Teoripåminnelser</h2><p class="exam-source">Kort studiestøtte fra oppsummeringen og begrepsguiden. Referansene under er til oppsummeringen; les pensum for full argumentasjon.</p>${task.notes.map(note => `<details><summary>${escape(note.title)}</summary><p>${escape(note.text)}</p><small>${escape(note.reference)}</small></details>`).join('')}</section>`;
}
