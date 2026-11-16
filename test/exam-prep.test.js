import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { examCases, examQuestions, criteriaForCase, examSource } from '../src/exam-prep.js';
import { dilemmas, questions } from '../src/data.js';
import { writingCriteria } from '../src/exam.js';
import { loadState, STORAGE_KEY } from '../src/state.js';

const dom = new JSDOM('<!doctype html><div id="app"></div>', { url: 'http://localhost/#exams' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.location = dom.window.location;
dom.window.scrollTo = () => {};
dom.window.HTMLElement.prototype.scrollIntoView = () => {};
const oldDraft = ['Et eksisterende bankutkast', '', '', '', ''];
dom.window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ drafts: { bank: oldDraft }, ratings: { plikt: 'known' }, completedDilemmas: ['bank'] }));
await import('../src/app.js');

const click = selector => {
  const element = document.querySelector(selector);
  assert.ok(element, selector);
  element.click();
};
const input = (index, text) => {
  const element = document.querySelector(`[data-draft="${index}"]`);
  element.value = text;
  element.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
};
const saved = () => JSON.parse(dom.window.localStorage.getItem(STORAGE_KEY));

test('the three source examples retain their distinct task requirements and supporting theory', () => {
  assert.deepEqual(examCases.map(task => task.page), [3, 18, 39]);
  assert.equal(examCases.length, 3);
  assert.equal(examQuestions.length, 12);
  for (const task of examCases) {
    assert.equal(task.source, examSource);
    assert.ok(dilemmas.includes(task));
    assert.equal(task.prompts.length, 5);
    assert.equal(task.guide.length, 5);
    assert.equal(criteriaForCase(task, writingCriteria).length, 6);
    assert.ok(task.notes.every(note => note.reference.includes('s.')));
    assert.equal(examQuestions.filter(question => question.examCase === task.id).length, 4);
  }
  assert.match(examCases[0].question, /to \(eller flere\) handlingsalternativer/);
  assert.match(examCases[1].question, /to \(eller flere\) teorier om bedriftens samfunnsansvar/);
  assert.match(examCases[2].question, /konflikt\/utfordring/);
  const sustainability = JSON.stringify(examCases[2]);
  for (const topic of ['Frey', 'Ansvarsetikk', 'allmenningens tragedie', 'nordiske modellen', 'Halrynjo', 'Gundersen', 'SDG-vasking']) {
    assert.ok(sustainability.includes(topic), topic);
  }
  assert.equal(criteriaForCase({}, writingCriteria), writingCriteria);
  assert.ok(examQuestions.every(question => questions.includes(question)));
});

test('exam route, three independent drafts, tailored self-review and progress work together', () => {
  assert.equal(document.querySelector('h1').textContent, 'Eksamensøving');
  assert.equal(document.querySelectorAll('.exam-task').length, 3);
  assert.match(document.querySelector('.exam-intro').textContent, /svare på én/);
  assert.match(document.querySelector('.exam-intro').textContent, /ikke en garanti/);
  for (const [index, task] of examCases.entries()) {
    click(`[data-action="open-dilemma"][data-id="${task.id}"]`);
    assert.equal(location.hash, '#exams');
    assert.equal(document.querySelector('h1').textContent, task.title);
    assert.equal(document.querySelector('.case-story p').textContent, task.story);
    assert.equal(document.querySelector('.case-story strong').textContent, task.question);
    assert.match(document.querySelector('.exam-task-brief').textContent, new RegExp(`s. ${task.page}`));
    assert.ok(document.querySelector('.exam-theory-notes'));
    assert.equal(document.querySelectorAll('[data-draft]').length, 5);
    assert.equal(document.querySelector('.discussion-guide'), null);
    input(0, `Mitt svar på alternativ ${index + 1}`);
    input(4, '<script>egne ord</script>');
    click('[data-action="show-guide"]');
    assert.equal(document.querySelectorAll('[data-writing-review]').length, 6);
    assert.match(document.querySelector('.writing-review').textContent, new RegExp(task.requirements[0][0]));
    click('[data-writing-review="0"]');
    click('#complete-dilemma');
    click('[data-action="close-dilemma"]');
    assert.match(document.querySelector(`.exam-task:has([data-id="${task.id}"])`).textContent, /Gjennomgått/);
    click(`[data-action="open-dilemma"][data-id="${task.id}"]`);
    assert.equal(document.querySelector('[data-draft="0"]').value, `Mitt svar på alternativ ${index + 1}`);
    assert.equal(document.querySelector('[data-draft="4"]').value, '<script>egne ord</script>');
    assert.equal(document.querySelector('.writing-area script'), null);
    click('[data-action="show-guide"]');
    assert.ok(document.querySelector('[data-writing-review="0"]').checked);
    assert.ok(document.querySelector('#complete-dilemma').checked);
    click('[data-action="close-dilemma"]');
  }
  assert.match(document.querySelector('.section-heading').textContent, /3 av 3 gjennomgått/);
  assert.deepEqual(saved().drafts.bank, oldDraft);
  assert.deepEqual(saved().ratings, { plikt: 'known' });
  click(`[data-action="open-dilemma"][data-id="${examCases[0].id}"]`);
  click('[data-action="show-guide"]');
  input(1, 'En endret vurdering');
  assert.equal(saved().reviews[examCases[0].id], undefined);
  assert.equal(saved().completedDilemmas.includes(examCases[0].id), false);
  assert.ok(saved().completedDilemmas.includes(examCases[1].id));
  assert.ok(saved().reviews[examCases[1].id][0]);
  assert.deepEqual(loadState(dom.window.localStorage), saved());
  click('[data-action="close-dilemma"]');
  assert.match(document.querySelector(`.exam-task:has([data-id="${examCases[0].id}"])`).textContent, /Utkast lagret/);
  click('[data-nav="progress"]');
  assert.match(document.querySelector('.progress-stats > div:last-child').textContent, /3 \/ 7/);
});

test('each focused quiz stays within its exam case, explains errors and supports retry', () => {
  for (const task of examCases) {
    click('[data-nav="exams"]');
    click(`[data-action="exam-quiz"][data-id="${task.id}"]`);
    assert.equal(location.hash, '#quiz');
    assert.match(document.querySelector('.session-top').textContent, /av 4/);
    for (let index = 0; index < 4; index++) {
      const prompt = document.querySelector('.question-panel h2').textContent;
      const question = examQuestions.find(question => question.prompt === prompt);
      assert.equal(question.examCase, task.id);
      click(`[data-action="select-answer"][data-index="${index === 0 ? (question.correct + 1) % 4 : question.correct}"]`);
      click('[data-action="check-answer"]');
      assert.equal(document.querySelector('.feedback p').textContent, question.explanation);
      click('[data-action="next-question"]');
    }
    assert.match(document.querySelector('.result-panel h2').textContent, /3 av 4/);
    click('[data-action="retry-quiz"]');
    assert.match(document.querySelector('.session-top').textContent, /av 1/);
  }
  assert.equal(saved().quizzes.length, 3);
  click('[data-nav="exams"]');
  click('[data-action="exam-quiz"][data-id="all"]');
  assert.match(document.querySelector('.session-top').textContent, /av 12/);
});
