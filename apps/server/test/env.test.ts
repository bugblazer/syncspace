import { describe, expect, it } from 'vitest';

import { loadEnv } from '../src/env.js';

const valid = { PORT: '3000', DATABASE_URL: 'postgresql://user:pass@localhost:5432/syncspace' };

describe('loadEnv', () => {
  it('parses valid variables', () => {
    expect(loadEnv(valid)).toEqual({
      PORT: 3000,
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/syncspace',
    });
  });

  it('rejects a missing PORT', () => {
    expect(() => loadEnv({ DATABASE_URL: valid.DATABASE_URL })).toThrow(/PORT/);
  });

  it('rejects a PORT that is not a whole number', () => {
    expect(() => loadEnv({ ...valid, PORT: 'abc' })).toThrow(/PORT/);
    expect(() => loadEnv({ ...valid, PORT: '3000.5' })).toThrow(/PORT/);
  });

  it('rejects a PORT outside 1 to 65535', () => {
    expect(() => loadEnv({ ...valid, PORT: '0' })).toThrow(/PORT/);
    expect(() => loadEnv({ ...valid, PORT: '70000' })).toThrow(/PORT/);
  });

  it('rejects a missing or non-PostgreSQL DATABASE_URL', () => {
    expect(() => loadEnv({ PORT: '3000' })).toThrow(/DATABASE_URL/);
    expect(() => loadEnv({ ...valid, DATABASE_URL: 'mysql://localhost/db' })).toThrow(
      /DATABASE_URL/,
    );
    expect(() => loadEnv({ ...valid, DATABASE_URL: 'not a url' })).toThrow(/DATABASE_URL/);
  });

  it('reports every invalid variable at once', () => {
    expect(() => loadEnv({})).toThrow(/PORT[\s\S]*DATABASE_URL|DATABASE_URL[\s\S]*PORT/);
  });
});
