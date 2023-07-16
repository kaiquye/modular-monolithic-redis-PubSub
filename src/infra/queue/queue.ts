import { Cache } from '../../utils/providers/redis/connection';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Queue_ {
  async publish(message: string, value) {
    const redis = new Cache();
    const client = await redis.connection();

    return await client.publish(message, JSON.stringify(value));
  }

  async subscribe(message: string, callback) {
    const redis = new Cache();
    const client = await redis.connection();
    const subscriber = client.duplicate();
    await subscriber.connect();

    await client.subscribe(message, async (value) => {
      await callback(JSON.parse(value));
    });
  }
}
