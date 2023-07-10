import * as Redis from 'redis';
import { RedisClientType as _RedisClientType } from '@redis/client/dist/lib/client';

export class Cache {
  instance: _RedisClientType;
  async connection() {
    this.instance = Redis.createClient({
      password: '12345',
    });

    this.instance.on('error', (err) => console.log('Redis Client Error', err));

    this.instance.on('connect', () => {
      console.log('Conexão estabelecida com o Redis');
    });

    await this.instance.connect();
  }
  async get(target: string) {
    try {
      return await this.instance.get(target);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async setWithExpire(target: string, time: number, value) {
    try {
      return await this.instance.setEx(target, time, JSON.stringify(value));
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
