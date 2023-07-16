import * as Redis from 'redis';
import { RedisClientType as _RedisClientType } from '@redis/client/dist/lib/client';
import { InternalServerErrorException } from '@nestjs/common';

export class Cache {
  instance: _RedisClientType;
  async connection(): Promise<_RedisClientType> {
    try {
      this.instance = Redis.createClient({
        password: '12345',
      });

      this.instance.on('error', (err) => console.log('Redis Client Error', err));

      this.instance.on('connect', () => {
        console.log('Conexão estabelecida com o Redis');
      });

      await this.instance.connect();
      return this.instance;
    } catch (e) {
      console.log('[redis error]:', e);
      throw new InternalServerErrorException('redis connection error');
    }
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
