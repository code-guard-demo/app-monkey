const test = require('node:test');
const assert = require('node:assert');
const { average } = require('./sum');

test('average of [1,2,3] is 2', () => {
  assert.strictEqual(average([1, 2, 3]), 2);
});
