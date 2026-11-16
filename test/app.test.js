import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { questions } from '../src/data.js';
import { STORAGE_KEY } from '../src/state.js';

const dom = new JSDOM('<!doctype html><html><head><title>Etikk</title></head><body><div id="app"></div></body></html>', { url: 'http://localhost/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.location = dom.window.location;
dom.window.scrollTo = () => {};
dom.window.HTMLElement.prototype.scrollIntoView = () => {};
await import('../src/app.js');
const click = selector => { const el = document.querySelector(selector); assert.ok(el, selector); el.click(); };
const change = (selector, value) => { const el = document.querySelector(selector); el.value = value; el.dispatchEvent(new dom.window.Event('change', { bubbles: true })); };
const input = (selector, value) => { const el = document.querySelector(selector); el.value = value; el.dispatchEvent(new dom.window.Event('input', { bubbles: true })); };
const saved = () => JSON.parse(dom.window.localStorage.getItem(STORAGE_KEY));
const nav = name => click(`[data-nav="${name}"]`);

test('flashcards, quiz retry, search, draft persistence and reset work end to end', () => {
  assert.match(document.querySelector('h1').textContent, /Litt øving/);
  click('[data-action="quick-cards"]');
  for (let i = 0; i < 12; i++) {
    assert.equal(document.querySelector('[data-action="rate"]'), null);
    click('[data-action="flip"]');
    click(`[data-action="rate"][data-rating="${i === 0 ? 'again' : 'known'}"]`);
  }
  assert.match(document.querySelector('.result-panel').textContent, /11 av 12/);
  assert.equal(Object.values(saved().ratings).filter(v => v === 'known').length, 11);
  click('[data-action="cards-reset"]');
  click('[data-action="weak-cards"]');
  assert.match(document.querySelector('.session-top').textContent, /av 1/);
  click('[data-action="flip"]'); click('[data-action="rate"][data-rating="known"]');
  assert.equal(Object.values(saved().ratings).filter(v => v === 'known').length, 12);

  nav('quiz'); change('#category', 'sustainability'); click('[data-action="start-quiz"]');
  for (let i = 0; i < 5; i++) {
    const prompt = document.querySelector('.question-panel h2').textContent;
    const q = questions.find(q => q.prompt === prompt);
    assert.ok(document.querySelector('[data-action="check-answer"]').disabled);
    const selected = i === 0 ? (q.correct + 1) % 4 : q.correct;
    click(`[data-action="select-answer"][data-index="${selected}"]`);
    click('[data-action="check-answer"]');
    assert.match(document.querySelector('.feedback').textContent, new RegExp(q.explanation.slice(0, 12)));
    assert.ok(document.querySelector('[data-action="select-answer"]').disabled);
    click('[data-action="next-question"]');
  }
  assert.match(document.querySelector('.result-panel h2').textContent, /4 av 5/);
  assert.equal(saved().quizzes.length, 1);
  click('[data-action="retry-quiz"]');
  assert.match(document.querySelector('.session-top').textContent, /av 1/);
  const retry = questions.find(q => q.prompt === document.querySelector('.question-panel h2').textContent);
  click(`[data-action="select-answer"][data-index="${retry.correct}"]`);
  click('[data-action="check-answer"]'); click('[data-action="next-question"]');
  assert.equal(saved().quizzes[1].score, 1);

  nav('library'); input('#concept-search', 'Kant');
  assert.equal(document.querySelectorAll('.concept-detail').length, 1);
  assert.match(document.querySelector('.concept-detail').textContent, /Pliktetikk/);
  input('#concept-search', 'zzzz'); assert.ok(document.querySelector('.empty-state'));
  input('#concept-search', ''); change('#category', 'responsibility');
  assert.equal(document.querySelectorAll('.concept-detail').length, 3);

  nav('dilemmas'); click('[data-action="open-dilemma"][data-id="bank"]');
  const note = '<script>not executable</script> & egne ord';
  input('[data-draft="0"]', note);
  assert.equal(saved().drafts.bank[0], note);
  click('[data-action="close-dilemma"]'); click('[data-action="open-dilemma"][data-id="bank"]');
  assert.equal(document.querySelector('[data-draft="0"]').value, note);
  assert.equal(document.querySelector('.writing-area script'), null);
  click('[data-action="show-guide"]'); assert.ok(document.querySelector('.discussion-guide'));
  click('#complete-dilemma'); assert.deepEqual(saved().completedDilemmas, ['bank']);

  nav('progress'); assert.match(document.querySelector('.progress-stats').textContent, /12/);
  click('[data-action="reset-prompt"]');
  assert.equal(document.querySelector('#reset-confirm').hidden, false);
  click('[data-action="reset-cancel"]'); assert.equal(saved().quizzes.length, 2);
  click('[data-action="reset-prompt"]'); click('[data-action="reset-confirm"]');
  assert.deepEqual(saved().ratings, {}); assert.deepEqual(saved().drafts, {});
  assert.deepEqual(saved().quizzes, []);
});
