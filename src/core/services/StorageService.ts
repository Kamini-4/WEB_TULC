/**
 * Storage Service Implementations
 * SOLID Principles:
 * - Single Responsibility: Exclusively responsible for key-value persistence
 * - Liskov Substitution: MemoryStorageService and LocalStorageService are completely interchangeable
 * - Open/Closed: Extensible to SessionStorage, IndexedDB without changing caller code
 */

import { IStorageService } from '../contracts/storage';

export class MemoryStorageService implements IStorageService {
  private store = new Map<string, string>();

  getItem<T = string>(key: string, defaultValue?: T): T | null {
    const val = this.store.get(key);
    if (val === undefined) return defaultValue ?? null;
    try {
      return JSON.parse(val) as T;
    } catch {
      return val as unknown as T;
    }
  }

  setItem<T = unknown>(key: string, value: T): boolean {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      this.store.set(key, serialized);
      return true;
    } catch {
      return false;
    }
  }

  removeItem(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): boolean {
    this.store.clear();
    return true;
  }

  hasItem(key: string): boolean {
    return this.store.has(key);
  }
}

export class LocalStorageService implements IStorageService {
  private fallbackMemory = new MemoryStorageService();

  private isAvailable(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    try {
      const testKey = '__tulc_storage_probe__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  getItem<T = string>(key: string, defaultValue?: T): T | null {
    if (!this.isAvailable()) {
      return this.fallbackMemory.getItem<T>(key, defaultValue);
    }

    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return defaultValue ?? null;
      try {
        return JSON.parse(raw) as T;
      } catch {
        return raw as unknown as T;
      }
    } catch (e) {
      console.warn(`[StorageService] Failed to read ${key}:`, e);
      return defaultValue ?? null;
    }
  }

  setItem<T = unknown>(key: string, value: T): boolean {
    if (!this.isAvailable()) {
      return this.fallbackMemory.setItem(key, value);
    }

    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
      return true;
    } catch (e) {
      console.warn(`[StorageService] Failed to write ${key}:`, e);
      return this.fallbackMemory.setItem(key, value);
    }
  }

  removeItem(key: string): boolean {
    if (!this.isAvailable()) {
      return this.fallbackMemory.removeItem(key);
    }

    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn(`[StorageService] Failed to remove ${key}:`, e);
      return false;
    }
  }

  clear(): boolean {
    if (!this.isAvailable()) {
      return this.fallbackMemory.clear();
    }

    try {
      window.localStorage.clear();
      return true;
    } catch (e) {
      console.warn('[StorageService] Failed to clear localStorage:', e);
      return false;
    }
  }

  hasItem(key: string): boolean {
    if (!this.isAvailable()) {
      return this.fallbackMemory.hasItem(key);
    }
    try {
      return window.localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  }
}
