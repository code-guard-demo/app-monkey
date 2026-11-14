const test = require('node:test');
const assert = require('node:assert');
const { average, clamp } = require('./sum');

test('average of [1,2,3] is 2', () => {
  assert.strictEqual(average([1, 2, 3]), 2);
});

test('clamp bounds values within range', () => {
  assert.strictEqual(clamp(5, 0, 10), 5);
  assert.strictEqual(clamp(-2, 0, 10), 0);
  assert.strictEqual(clamp(15, 0, 10), 10);
  assert.throws(() => clamp(1, 5, 2), RangeError);
});
