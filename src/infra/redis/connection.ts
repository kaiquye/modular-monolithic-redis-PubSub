import Redis from 'redis';
import { RedisClientType as _RedisClientType } from '@redis/client/dist/lib/client';

export class Cache {
  instance: _RedisClientType;
  constructor() {
    this.instance = Redis.createClient({
      password: '12345',
    });
  }
  async get(target: string) {
    try {
      return await this.instance.get(target);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async post(target: string, value) {
    try {
      return await this.instance.set(target, value);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
