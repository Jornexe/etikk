import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { revisionCards, revisionTopics, studyDays, filterRevisionCards } from '../src/revision.js';
import { examCases } from '../src/exam-prep.js';
import { loadState, STORAGE_KEY, freshState } from '../src/state.js';
import { renderRevision } from '../src/revision-view.js';

const dom = new JSDOM('<!doctype html><div id="app"></div>', { url: 'http://localhost/#revision' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.location = dom.window.location;
dom.window.scrollTo = () => {};
dom.window.HTMLElement.prototype.scrollIntoView = () => {};
const oldDraft = ['Mitt gamle utkast', '', '', '', ''];
dom.window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ratings: { plikt: 'known' }, drafts: { bank: oldDraft } }));
await import('../src/app.js');
const click = selector => {
  const el = document.querySelector(selector);
  assert.ok(el, selector);
  el.click();
};
const change = (selector, value, type = 'change') => {
  const el = document.querySelector(selector);
  el.value = value;
  el.dispatchEvent(new dom.window.Event(type, { bubbles: true }));
};
const saved = () => JSON.parse(dom.window.localStorage.getItem(STORAGE_KEY));

test('revision topics have traceable sources, usable examples and valid writing destinations', () => {
  assert.equal(revisionCards.length, 24);
  assert.equal(new Set(revisionCards.map(card => card.id)).size, 24);
  for (const card of revisionCards) {
    assert.ok(revisionTopics[card.topic]);
    assert.ok(card.question.endsWith('?'));
    assert.ok(card.answer.length > 80);
    assert.match(card.example, /^Fiktivt:/);
    assert.ok(card.caution);
    assert.match(card.pages, /^[\d, –]+$/);
  }
  for (const topic of Object.keys(revisionTopics)) {
    assert.equal(filterRevisionCards(topic).length, 8);
    assert.ok(examCases.some(task => task.id === revisionTopics[topic].caseId));
  }
  const tasks = studyDays.flatMap(day => day.tasks);
  assert.equal(tasks.length, 15);
  assert.equal(new Set(tasks.map(task => task.id)).size, 15);
  assert.ok(tasks.filter(task => task.caseId).every(task => examCases.some(item => item.id === task.caseId)));
});

test('huskeark opens directly and searches all teaching text without replacing the search field', () => {
  assert.equal(document.querySelector('h1').textContent, 'Huskeark');
  assert.equal(document.querySelectorAll('.revision-card').length, 24);
  const search = document.querySelector('#revision-search');
  search.focus();
  change('#revision-search', '  OSTROM ', 'input');
  assert.equal(document.activeElement, search);
  assert.equal(document.querySelectorAll('.revision-card').length, 1);
  assert.match(document.querySelector('.revision-card').textContent, /Allmenningens tragedie/);
  change('#revision-search', '<script>bad</script>', 'input');
  assert.ok(document.querySelector('.empty-state'));
  assert.equal(document.querySelector('main script'), null);
  change('#revision-search', '', 'input');
  change('#revision-topic', 'responsibility');
  assert.equal(document.querySelectorAll('.revision-card').length, 8);
  assert.equal(document.querySelectorAll('.revision-card[open]').length, 0);
  click('.revision-card summary');
  assert.equal(document.querySelectorAll('.revision-card[open]').length, 1);
});

test('recall hides answers, records deliberate ratings and retries only missed cards', () => {
  click('[data-action="revision-mode"][data-mode="recall"]');
  assert.ok(document.querySelector('[data-action="recall-weak"]').disabled);
  click('[data-action="recall-start"]');
  let missed;
  const seen = new Set();
  for (let i = 0; i < 8; i++) {
    assert.equal(document.querySelector('.revision-answer'), null);
    assert.equal(document.querySelector('[data-action="recall-rate"]'), null);
    const card = revisionCards.find(card => card.question === document.querySelector('.recall-card h2').textContent);
    assert.equal(card.topic, 'responsibility');
    assert.ok(!seen.has(card.id));
    seen.add(card.id);
    if (!i) missed = card.id;
    click('[data-action="recall-reveal"]');
    assert.match(document.querySelector('.revision-answer').textContent, /Vær presis/);
    assert.equal(document.activeElement, document.querySelector('.recall-card h2'));
    click(`[data-action="recall-rate"][data-rating="${i ? 'known' : 'again'}"]`);
  }
  assert.match(document.querySelector('.result-panel h2').textContent, /7 av 8/);
  assert.equal(saved().recallRatings[missed], 'again');
  assert.equal(Object.values(saved().activity).reduce((sum, n) => sum + n, 0), 8);
  click('[data-action="recall-retry"]');
  assert.match(document.querySelector('.session-top').textContent, /av 1/);
  assert.equal(document.querySelector('.recall-card h2').textContent, revisionCards.find(card => card.id === missed).question);
  click('[data-action="recall-reveal"]');
  click('[data-action="recall-rate"][data-rating="known"]');
  assert.match(document.querySelector('.result-panel h2').textContent, /1 av 1/);
  click('[data-action="recall-reset"]');
  assert.ok(document.querySelector('[data-action="recall-weak"]').disabled);
  assert.deepEqual(saved().ratings, { plikt: 'known' });
  assert.deepEqual(saved().drafts.bank, oldDraft);
});

test('study plan saves checked and unchecked steps and launches the matching activity', () => {
  click('[data-action="revision-mode"][data-mode="plan"]');
  assert.equal(document.querySelectorAll('[data-study-task]').length, 15);
  click('[data-study-task="day1-recall"]');
  assert.match(document.querySelector('#study-plan-progress').textContent, /1 av 15/);
  assert.equal(saved().studyPlan['day1-recall'], true);
  click('[data-nav="home"]');
  click('[data-nav="revision"]');
  assert.ok(document.querySelector('[data-study-task="day1-recall"]').checked);
  const restored = renderRevision(loadState(dom.window.localStorage), { mode: 'plan' });
  assert.match(restored, /data-study-task="day1-recall" checked/);
  click('[data-study-task="day1-recall"]');
  assert.equal(saved().studyPlan['day1-recall'], false);
  click('[data-action="revision-task"][data-mode="recall"][data-revision-topic="ethics"]');
  assert.equal(document.querySelector('#revision-topic').value, 'ethics');
  assert.match(document.querySelector('[data-action="recall-start"]').textContent, /8 kort/);
  click('[data-action="revision-mode"][data-mode="plan"]');
  click('[data-action="open-dilemma"][data-id="exam-decent-work"]');
  assert.equal(location.hash, '#exams');
  assert.equal(document.querySelector('h1').textContent, 'Arbeid for en bærekraftig fremtid');
});

test('malformed revision storage is sanitized, legacy drafts survive, and reset clears new progress', () => {
  const state = loadState({ getItem: () => JSON.stringify({ recallRatings: { a: 'known', b: 'again', c: false }, studyPlan: { a: true, b: false, c: 'yes' }, drafts: { bank: oldDraft } }) });
  assert.deepEqual(state.recallRatings, { a: 'known', b: 'again' });
  assert.deepEqual(state.studyPlan, { a: true, b: false });
  assert.deepEqual(state.drafts.bank, oldDraft);
  click('[data-nav="progress"]');
  click('[data-action="reset-prompt"]');
  click('[data-action="reset-confirm"]');
  assert.deepEqual(saved(), freshState());
  click('[data-nav="revision"]');
  click('[data-action="revision-mode"][data-mode="recall"]');
  assert.ok(document.querySelector('[data-action="recall-weak"]').disabled);
});
