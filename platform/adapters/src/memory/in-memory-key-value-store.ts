import type { KeyValueStore } from '@taijifu/application';

export class InMemoryKeyValueStore implements KeyValueStore {
  readonly #values = new Map<string, string>();

  async get(key: string): Promise<string | null> {
    return this.#values.get(key) ?? null;
  }

  async set(key: string, value: string): Promise<void> {
    this.#values.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.#values.delete(key);
  }
}
