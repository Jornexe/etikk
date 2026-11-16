import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { concepts, questions } from '../src/data.js';
import { STORAGE_KEY, freshState, loadState, saveState, recordActivity, dateKey, shuffle, makeQuiz, mastery } from '../src/state.js';

test('all twelve definitions match the source guide exactly', () => {
  const source = readFileSync(new URL('../Etikk begreper.md', import.meta.url), 'utf8');
  const table = source.split('## Puggeark')[1].split('**Husk også:**')[0];
  for (const concept of concepts) assert.ok(table.includes(concept.definition), concept.name);
  assert.equal(concepts.length, 12);
  assert.equal(concepts.filter(c => c.supplementary).length, 3);
});

test('quiz filters topics and caps the requested size to available questions', () => {
  for (const category of ['all', 'ethics', 'responsibility', 'sustainability']) {
    const quiz = makeQuiz(questions, concepts, category, 100);
    const ids = new Set(concepts.filter(c => category === 'all' || c.category === category).map(c => c.id));
    assert.ok(quiz.every(q => ids.has(q.concept)));
    assert.equal(quiz.length, questions.filter(q => ids.has(q.concept)).length);
    assert.equal(new Set(quiz).size, quiz.length);
  }
  assert.equal(makeQuiz(questions, concepts, 'all', 5).length, 5);
  for (const q of questions) {
    assert.ok(concepts.some(c => c.id === q.concept));
    assert.ok(q.correct >= 0 && q.correct < q.options.length);
  }
});

test('progress round-trips through storage and uses the local calendar date', () => {
  const data = new Map();
  const storage = { getItem: k => data.get(k), setItem: (k, v) => data.set(k, v) };
  const state = freshState();
  const now = new Date(2026, 10, 15, 0, 30);
  assert.equal(dateKey(now), '2026-11-15');
  recordActivity(state, 1, now); recordActivity(state, 1, now);
  state.ratings.nytte = 'known'; state.ratings.plikt = 'again';
  state.drafts.bank = ['<script>notes</script>', '', '', '', ''];
  assert.equal(mastery(state, concepts), 1);
  assert.ok(saveState(storage, state));
  assert.deepEqual(loadState(storage), state);
  assert.equal(state.activity['2026-11-15'], 2);
});

test('corrupt and unavailable storage cannot crash the app', () => {
  assert.deepEqual(loadState({ getItem: () => '{broken' }), freshState());
  assert.deepEqual(loadState(undefined), freshState());
  assert.equal(saveState({ setItem: () => { throw Error('quota'); } }, freshState()), false);
  const loaded = loadState({ getItem: () => JSON.stringify({ ratings: { nytte: 'known', plikt: 'wrong' }, quizzes: [{ score: 2, total: 1, date: '2026-11-15' }, { score: 1, total: 1, date: 'invalid' }], drafts: { bank: 'not an array' }, completedDilemmas: ['bank', 'bank', 4] }) });
  assert.deepEqual(loaded.ratings, { nytte: 'known' });
  assert.deepEqual(loaded.quizzes, []);
  assert.deepEqual(loaded.drafts, {});
  assert.deepEqual(loaded.completedDilemmas, ['bank']);
  assert.equal(typeof STORAGE_KEY, 'string');
});

test('shuffling preserves input and all members', () => {
  const input = ['a', 'b', 'c', 'd'];
  const output = shuffle(input, () => 0);
  assert.deepEqual(input, ['a', 'b', 'c', 'd']);
  assert.deepEqual([...output].sort(), input);
  assert.notDeepEqual(output, input);
});
