import { describe, it, expect } from 'vitest';
import { flattenObject, getAllKeys } from '../../utils/flattenObject';

describe('flattenObject', () => {
  it('should flatten a simple object', () => {
    const obj = { name: 'Alice', age: 30 };
    const result = flattenObject(obj);
    expect(result).toEqual({ name: 'Alice', age: 30 });
  });

  it('should flatten nested objects with dot notation', () => {
    const obj = {
      name: 'Alice',
      profile: {
        role: 'engineer',
        level: 'senior'
      }
    };
    const result = flattenObject(obj);
    expect(result).toEqual({
      name: 'Alice',
      'profile.role': 'engineer',
      'profile.level': 'senior'
    });
  });

  it('should convert arrays to JSON strings', () => {
    const obj = {
      name: 'Alice',
      tags: ['frontend', 'react']
    };
    const result = flattenObject(obj);
    expect(result).toEqual({
      name: 'Alice',
      tags: '["frontend","react"]'
    });
  });

  it('should handle deeply nested objects', () => {
    const obj = {
      user: {
        profile: {
          contact: {
            email: 'alice@example.com'
          }
        }
      }
    };
    const result = flattenObject(obj);
    expect(result).toEqual({
      'user.profile.contact.email': 'alice@example.com'
    });
  });

  it('should handle null and undefined values', () => {
    const obj = {
      name: 'Alice',
      middleName: null,
      nickname: undefined
    };
    const result = flattenObject(obj);
    expect(result).toEqual({
      name: 'Alice',
      middleName: null,
      nickname: undefined
    });
  });

  it('should handle empty arrays', () => {
    const obj = {
      name: 'Alice',
      tags: []
    };
    const result = flattenObject(obj);
    expect(result).toEqual({
      name: 'Alice',
      tags: '[]'
    });
  });

  it('should handle mixed nested structures', () => {
    const obj = {
      id: 1,
      profile: {
        name: 'Alice',
        roles: ['admin', 'user']
      },
      metadata: {
        created: '2023-01-01',
        settings: {
          theme: 'dark'
        }
      }
    };
    const result = flattenObject(obj);
    expect(result).toEqual({
      id: 1,
      'profile.name': 'Alice',
      'profile.roles': '["admin","user"]',
      'metadata.created': '2023-01-01',
      'metadata.settings.theme': 'dark'
    });
  });
});

describe('getAllKeys', () => {
  it('should collect all unique keys from array of objects', () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', email: 'bob@example.com' }
    ];
    const keys = getAllKeys(data);
    expect(keys.sort()).toEqual(['age', 'email', 'name'].sort());
  });

  it('should flatten nested keys', () => {
    const data = [
      { name: 'Alice', profile: { role: 'engineer' } },
      { name: 'Bob', profile: { level: 'senior' } }
    ];
    const keys = getAllKeys(data);
    expect(keys.sort()).toEqual(['name', 'profile.level', 'profile.role'].sort());
  });

  it('should return sorted keys', () => {
    const data = [
      { z: 1, a: 2, m: 3 }
    ];
    const keys = getAllKeys(data);
    expect(keys).toEqual(['a', 'm', 'z']);
  });

  it('should handle empty array', () => {
    const keys = getAllKeys([]);
    expect(keys).toEqual([]);
  });
});
