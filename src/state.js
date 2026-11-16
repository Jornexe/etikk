export const STORAGE_KEY = 'etikk-practice-v1';
export const freshState = () => ({ ratings: {}, activity: {}, quizzes: [], drafts: {}, reviews: {}, completedDilemmas: [], recallRatings: {}, studyPlan: {} });
export function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function loadState(storage) {
  try {
    const raw = JSON.parse(storage.getItem(STORAGE_KEY));
    if (!raw || typeof raw !== 'object') return freshState();
    const object = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    return {
      ratings: Object.fromEntries(Object.entries(object(raw.ratings)).filter(([, v]) => v === 'known' || v === 'again')),
      recallRatings: Object.fromEntries(Object.entries(object(raw.recallRatings)).filter(([, v]) => v === 'known' || v === 'again')),
      studyPlan: Object.fromEntries(Object.entries(object(raw.studyPlan)).filter(([, v]) => typeof v === 'boolean')),
      activity: Object.fromEntries(Object.entries(object(raw.activity)).filter(([k, v]) => /^\d{4}-\d{2}-\d{2}$/.test(k) && Number.isFinite(v) && v > 0)),
      quizzes: Array.isArray(raw.quizzes) ? raw.quizzes.filter(q => q && Number.isInteger(q.score) && Number.isInteger(q.total) && q.total > 0 && q.score >= 0 && q.score <= q.total && typeof q.date === 'string' && Number.isFinite(new Date(q.date).getTime())) : [],
      drafts: Object.fromEntries(Object.entries(object(raw.drafts)).filter(([, v]) => Array.isArray(v) && v.length === 5 && v.every(s => typeof s === 'string'))),
      reviews: Object.fromEntries(Object.entries(object(raw.reviews)).filter(([, v]) => Array.isArray(v) && v.length === 6 && v.every(checked => typeof checked === 'boolean'))),
      completedDilemmas: Array.isArray(raw.completedDilemmas) ? [...new Set(raw.completedDilemmas.filter(s => typeof s === 'string'))] : [],
    };
  } catch { return freshState(); }
}
export function saveState(storage, state) {
  try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; } catch { return false; }
}
export function recordActivity(state, amount = 1, date = new Date()) {
  const key = dateKey(date);
  state.activity[key] = (state.activity[key] || 0) + amount;
}
export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function makeQuiz(questions, concepts, category = 'all', count = 5) {
  const ids = new Set(concepts.filter(c => category === 'all' || c.category === category).map(c => c.id));
  return shuffle(questions.filter(q => ids.has(q.concept))).slice(0, count);
}
export function mastery(state, concepts) {
  return concepts.filter(c => state.ratings[c.id] === 'known').length;
}
