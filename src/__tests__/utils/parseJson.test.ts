import { describe, it, expect } from 'vitest';
import { parseJson } from '../../utils/parseJson';

describe('parseJson', () => {
  it('should parse valid JSON', () => {
    const result = parseJson('{"name": "Alice"}');
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ name: 'Alice' });
    expect(result.error).toBeUndefined();
  });

  it('should parse valid JSON array', () => {
    const result = parseJson('[1, 2, 3]');
    expect(result.success).toBe(true);
    expect(result.data).toEqual([1, 2, 3]);
  });

  it('should fail on empty input', () => {
    const result = parseJson('');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Input is empty');
  });

  it('should fail on whitespace-only input', () => {
    const result = parseJson('   ');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Input is empty');
  });

  it('should fail on invalid JSON', () => {
    const result = parseJson('{invalid json}');
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should fail on incomplete JSON', () => {
    const result = parseJson('{"name": "Alice"');
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
