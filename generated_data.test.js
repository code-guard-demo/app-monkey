const test = require('node:test');
const assert = require('node:assert');
const { LOOKUP } = require('./generated_data');

test('LOOKUP contains 600 entries', () => {
  assert.strictEqual(LOOKUP.length, 600);
  assert.strictEqual(LOOKUP[0].code, 'CODE_0');
});
