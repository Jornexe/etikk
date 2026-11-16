import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><div id="app"></div>', { url: 'http://localhost/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.location = dom.window.location;
let cardTop = 48, reducedMotion = false;
const scrolls = [], focuses = [], animations = [];
dom.window.scrollTo = () => {};
dom.window.matchMedia = query => ({ matches: query.includes('reduced-motion') && reducedMotion, addEventListener() {} });
dom.window.HTMLElement.prototype.scrollIntoView = function (options) { scrolls.push({ element: this, options }); };
const nativeFocus = dom.window.HTMLElement.prototype.focus;
dom.window.HTMLElement.prototype.focus = function (options) { focuses.push({ element: this, options }); nativeFocus.call(this, options); };
const nativeRect = dom.window.HTMLElement.prototype.getBoundingClientRect;
dom.window.HTMLElement.prototype.getBoundingClientRect = function () {
  return this.matches('.flashcard') ? { top: cardTop, height: this.classList.contains('is-flipped') ? 760 : 390 } : nativeRect.call(this);
};
dom.window.HTMLElement.prototype.animate = function (frames, options) {
  animations.push({ frames, options });
  return { finished: Promise.resolve() };
};
await import('../src/app.js');
const click = selector => { const el = document.querySelector(selector); assert.ok(el, selector); el.click(); };

test('revealing a card preserves its reading position and progressively discloses the lesson', () => {
  for (const scenario of [
    { top: 48, reduced: false, shouldScroll: false },
    { top: -180, reduced: false, shouldScroll: true },
    { top: -180, reduced: true, shouldScroll: true },
  ]) {
    cardTop = scenario.top; reducedMotion = scenario.reduced;
    click('[data-nav="home"]'); click('[data-action="quick-cards"]');
    const main = document.querySelector('main');
    const card = document.querySelector('.flashcard');
    const heading = card.querySelector('h2');
    scrolls.length = 0; focuses.length = 0; animations.length = 0;
    click('[data-action="flip"]');

    assert.equal(document.querySelector('main'), main, 'the page must not be replaced');
    assert.equal(document.querySelector('.flashcard'), card, 'the card must stay in place');
    assert.equal(card.querySelector('h2'), heading, 'the concept heading must stay in place');
    assert.equal(document.activeElement, card.querySelector('.card-answer'));
    assert.ok(focuses.every(call => call.options.preventScroll), 'focus must not scroll to the rating buttons');
    assert.equal(scrolls.length, scenario.shouldScroll ? 1 : 0);
    if (scenario.shouldScroll) {
      assert.equal(scrolls[0].element, card);
      assert.equal(scrolls[0].options.block, 'start');
      assert.equal(scrolls[0].options.behavior, scenario.reduced ? 'instant' : 'smooth');
    }
    assert.equal(animations.length, scenario.reduced ? 0 : 1);
    assert.equal(card.querySelector('.card-figure-disclosure').open, false);
    assert.equal(card.querySelector('.lesson-more').open, false);
    assert.ok(card.querySelector('.definition').textContent.length > 0);
    assert.ok(card.querySelector('.card-answer-summary').textContent.length > 0);
    const figure = card.querySelector('.card-figure-disclosure');
    figure.open = true;
    assert.ok(figure.querySelector('.teaching-figure'), 'the full figure remains available');
    const depth = card.querySelector('.lesson-more');
    depth.open = true;
    assert.ok(depth.querySelector('.worked-example'), 'the detailed lesson remains available');

    click('[data-action="rate"][data-rating="known"]');
    assert.equal(document.activeElement, document.querySelector('.flashcard h2'));
    assert.equal(document.querySelector('.card-answer'), null, 'next card starts with the question');
    assert.match(document.querySelector('.session-top').textContent, /Kort 2 av 12/);
  }
});
