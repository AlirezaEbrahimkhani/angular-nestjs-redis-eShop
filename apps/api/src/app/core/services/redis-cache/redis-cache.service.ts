import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T> {
    return await this.cache.get(key);
  }

  async set<T>(key: string, value: T): Promise<void> {
    return this.cache.set(key, value, 1000);
  }

  async reset(): Promise<void> {
    await this.cache.reset();
  }

  async delete(key: string): Promise<void> {
    await this.cache.del(key);
  }
}
