/**
 * Storage Service Contract
 * SOLID: Interface Segregation & Dependency Inversion
 * Clients depend on this minimal contract without binding to window.localStorage
 */

export interface IStorageService {
  getItem<T = string>(key: string, defaultValue?: T): T | null;
  setItem<T = unknown>(key: string, value: T): boolean;
  removeItem(key: string): boolean;
  clear(): boolean;
  hasItem(key: string): boolean;
}
