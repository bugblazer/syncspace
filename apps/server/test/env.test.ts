import { describe, expect, it } from 'vitest';

import { loadEnv } from '../src/env.js';

describe('loadEnv', () => {
  it('parses PORT into a number', () => {
    expect(loadEnv({ PORT: '3000' })).toEqual({ PORT: 3000 });
  });

  it('rejects a missing PORT', () => {
    expect(() => loadEnv({})).toThrow(/PORT/);
  });

  it('rejects a PORT that is not a whole number', () => {
    expect(() => loadEnv({ PORT: 'abc' })).toThrow(/PORT/);
    expect(() => loadEnv({ PORT: '3000.5' })).toThrow(/PORT/);
  });

  it('rejects a PORT outside 1 to 65535', () => {
    expect(() => loadEnv({ PORT: '0' })).toThrow(/PORT/);
    expect(() => loadEnv({ PORT: '70000' })).toThrow(/PORT/);
  });
});
