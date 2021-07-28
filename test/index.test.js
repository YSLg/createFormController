const nodes = require('..')

// TODO: Implement module test
test('nodes', () => {
  expect(nodes('w')).toBe('w@zce.me')
  expect(nodes('w', { host: 'wedn.net' })).toBe('w@wedn.net')
  expect(() => nodes(100)).toThrow('Expected a string, got number')
})
