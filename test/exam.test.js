import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { concepts, dilemmas, questions, writingPrompts } from '../src/data.js';
import { draftWordCount, writingCriteria } from '../src/exam.js';
import { freshState, loadState, STORAGE_KEY } from '../src/state.js';

const dom = new JSDOM('<!doctype html><div id="app"></div>', { url: 'http://localhost/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.location = dom.window.location;
dom.window.scrollTo = () => {};
dom.window.HTMLElement.prototype.scrollIntoView = () => {};
const legacyState = { ratings: { plikt: 'known' }, activity: {}, quizzes: [], drafts: { bank: ['Mitt gamle utkast', '', '', '', ''] }, completedDilemmas: ['bank'] };
dom.window.localStorage.setItem(STORAGE_KEY, JSON.stringify(legacyState));
await import('../src/app.js');

const click = selector => {
  const element = document.querySelector(selector);
  assert.ok(element, selector);
  element.click();
};
const input = (selector, value) => {
  const element = document.querySelector(selector);
  assert.ok(element, selector);
  element.value = value;
  element.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
};
const saved = () => JSON.parse(dom.window.localStorage.getItem(STORAGE_KEY));

test('exam practice has a coherent outline and all cases keep five draft fields', () => {
  assert.equal(dilemmas.length, 4);
  assert.equal(new Set(dilemmas.map(dilemma => dilemma.id)).size, dilemmas.length);
  const exam = dilemmas.find(dilemma => dilemma.id === 'exam-responsibility');
  assert.match(exam.story, /Fiktivt eksempel/);
  assert.match(exam.question, /ikke hentet fra den opprinnelige eksamenen/);
  assert.equal(exam.prompts.length, 5);
  for (const dilemma of dilemmas) {
    assert.equal((dilemma.prompts || writingPrompts).length, 5);
    assert.equal(dilemma.guide.length, 5);
    assert.ok(dilemma.concepts.every(id => concepts.some(concept => concept.id === id)));
  }
  assert.equal(writingCriteria.length, 6);
  assert.equal(new Set(writingCriteria.map(criterion => criterion.id)).size, 6);
  assert.equal(questions.length, 24);
  assert.equal(questions.filter(question => question.skill === 'argumentation').length, 6);
});

test('word count counts whitespace-separated words without treating length as a grade', () => {
  assert.equal(draftWordCount(['', '', '', '', '']), 0);
  assert.equal(draftWordCount(['  ansvar og\nprofitt ', '\tveies opp', '', '', 'ærlig']), 6);
});

test('legacy progress survives and malformed self-reviews are rejected', () => {
  const legacy = loadState({ getItem: () => JSON.stringify(legacyState) });
  assert.deepEqual(legacy.drafts, legacyState.drafts);
  assert.deepEqual(legacy.completedDilemmas, ['bank']);
  assert.deepEqual(legacy.ratings, { plikt: 'known' });
  assert.deepEqual(legacy.reviews, {});
  const valid = [true, false, true, false, true, false];
  const restored = loadState({ getItem: () => JSON.stringify({ ...freshState(), reviews: { bank: valid, short: [true], strings: Array(6).fill('yes'), object: {}, null: null } }) });
  assert.deepEqual(restored.reviews, { bank: valid });
});

test('writing coach, case-specific prompts, self-review and edits preserve existing work', () => {
  assert.match(document.querySelector('main').textContent, /24 spørsmål/);
  assert.match(document.querySelector('main').textContent, /3 dilemmaer \+ eksamensøving/);
  click('[data-nav="dilemmas"]');
  assert.equal(document.querySelectorAll('.dilemma-card').length, 4);
  assert.match(document.querySelector('.exam-coach').textContent, /ikke en offisiell A-oppskrift/);
  assert.match(document.querySelector('.exam-precision').textContent, /Friedman = shareholder og Freeman = stakeholder/);
  click('.exam-coach summary');
  click('.exam-coach [data-action="open-dilemma"]');
  assert.match(document.querySelector('h1').textContent, /Ansvar/);
  assert.match(document.querySelector('.writing-prompt').textContent, /Avgrens problemstillingen/);
  input('[data-draft="0"]', 'Ansvar kan koste penger');
  assert.equal(document.querySelector('#draft-word-count').textContent, '4');
  click('[data-action="show-guide"]');
  assert.match(document.querySelector('.discussion-guide h3').textContent, /Avgrens problemstillingen/);
  assert.equal(document.querySelectorAll('[data-writing-review]').length, 6);
  assert.ok(document.querySelector('.writing-review legend'));
  click('[data-writing-review="0"]');
  click('[data-writing-review="3"]');
  click('#complete-dilemma');
  assert.deepEqual(saved().reviews['exam-responsibility'], [true, false, false, true, false, false]);
  assert.deepEqual(saved().drafts.bank, legacyState.drafts.bank);
  assert.deepEqual(saved().ratings, legacyState.ratings);

  click('[data-action="show-guide"]');
  click('[data-action="show-guide"]');
  assert.ok(document.querySelector('[data-writing-review="3"]').checked);
  click('[data-action="close-dilemma"]');
  click('.dilemma-card [data-id="bank"]');
  assert.equal(document.querySelector('[data-draft="0"]').value, 'Mitt gamle utkast');
  click('[data-action="show-guide"]');
  assert.ok([...document.querySelectorAll('[data-writing-review]')].every(checkbox => !checkbox.checked));
  click('[data-writing-review="1"]');

  click('[data-action="close-dilemma"]');
  click('.dilemma-card [data-id="exam-responsibility"]');
  assert.equal(document.querySelector('[data-draft="0"]').value, 'Ansvar kan koste penger');
  click('[data-action="show-guide"]');
  assert.ok(document.querySelector('[data-writing-review="0"]').checked);
  assert.ok(document.querySelector('#complete-dilemma').checked);
  const textarea = document.querySelector('[data-draft="2"]');
  input('[data-draft="2"]', '<script>ikke kjør</script>');
  assert.equal(document.querySelector('[data-draft="2"]'), textarea, 'typing must not replace the textarea');
  assert.equal(document.querySelector('#draft-word-count').textContent, '6');
  assert.ok([...document.querySelectorAll('[data-writing-review]')].every(checkbox => !checkbox.checked));
  assert.equal(document.querySelector('#complete-dilemma').checked, false);
  assert.equal(saved().reviews['exam-responsibility'], undefined);
  assert.equal(saved().completedDilemmas.includes('exam-responsibility'), false);
  assert.ok(saved().completedDilemmas.includes('bank'));
  assert.ok(saved().reviews.bank[1]);
  assert.deepEqual(loadState(dom.window.localStorage), saved());
  click('[data-action="close-dilemma"]');
  click('.dilemma-card [data-id="exam-responsibility"]');
  assert.equal(document.querySelector('[data-draft="2"]').value, '<script>ikke kjør</script>');
  assert.equal(document.querySelector('.writing-area script'), null);

  click('[data-nav="quiz"]');
  click('[data-action="argumentation-quiz"]');
  assert.match(document.querySelector('.session-top').textContent, /av 6/);
  for (let index = 0; index < 6; index++) {
    const prompt = document.querySelector('.question-panel h2').textContent;
    const question = questions.find(question => question.prompt === prompt);
    assert.equal(question.skill, 'argumentation');
    click(`[data-action="select-answer"][data-index="${question.correct}"]`);
    click('[data-action="check-answer"]');
    click('[data-action="next-question"]');
  }
  assert.match(document.querySelector('.result-panel h2').textContent, /6 av 6/);
  assert.equal(saved().quizzes.at(-1).total, 6);
  click('[data-action="quiz-reset"]');
  assert.equal(document.querySelector('#quiz-count option:last-child').value, String(questions.length));
  document.querySelector('#quiz-count').value = String(questions.length);
  click('[data-action="start-quiz"]');
  assert.match(document.querySelector('.session-top').textContent, /av 24/);

  click('[data-nav="progress"]');
  click('[data-action="reset-prompt"]');
  click('[data-action="reset-confirm"]');
  assert.deepEqual(saved().reviews, {});
  assert.deepEqual(saved().drafts, {});
});
