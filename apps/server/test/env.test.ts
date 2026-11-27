import { describe, expect, it } from 'vitest';

import { loadEnv } from '../src/env.js';

const valid = {
  HOST: '127.0.0.1',
  PORT: '3000',
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/syncspace',
};

describe('loadEnv', () => {
  it('parses valid variables', () => {
    expect(loadEnv(valid)).toEqual({
      HOST: '127.0.0.1',
      PORT: 3000,
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/syncspace',
    });
  });

  it('accepts IPv4 and IPv6 addresses for HOST', () => {
    expect(loadEnv({ ...valid, HOST: '0.0.0.0' }).HOST).toBe('0.0.0.0');
    expect(loadEnv({ ...valid, HOST: '::1' }).HOST).toBe('::1');
    expect(loadEnv({ ...valid, HOST: '::' }).HOST).toBe('::');
  });

  it('rejects a missing HOST or one that is not an IP address', () => {
    expect(() => loadEnv({ PORT: valid.PORT, DATABASE_URL: valid.DATABASE_URL })).toThrow(/HOST/);
    expect(() => loadEnv({ ...valid, HOST: 'localhost' })).toThrow(/HOST/);
    expect(() => loadEnv({ ...valid, HOST: '999.1.1.1' })).toThrow(/HOST/);
  });

  it('rejects a missing PORT', () => {
    expect(() => loadEnv({ HOST: valid.HOST, DATABASE_URL: valid.DATABASE_URL })).toThrow(/PORT/);
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
    expect(() => loadEnv({ HOST: valid.HOST, PORT: valid.PORT })).toThrow(/DATABASE_URL/);
    expect(() => loadEnv({ ...valid, DATABASE_URL: 'mysql://localhost/db' })).toThrow(
      /DATABASE_URL/,
    );
    expect(() => loadEnv({ ...valid, DATABASE_URL: 'not a url' })).toThrow(/DATABASE_URL/);
  });

  it('reports every invalid variable at once', () => {
    expect(() => loadEnv({})).toThrow(/PORT[\s\S]*DATABASE_URL|DATABASE_URL[\s\S]*PORT/);
  });
});
