import { Result } from '../../../utils/error/custom-error';
import {
  ISendCodeEmailIn,
  ISendCodeEmailOut,
  ISendEmailCodeUseCase,
} from '../interfaces/send-code-email.interfaces';
import { Cache } from '../../../utils/providers/redis/connection';
import { Injectable } from '@nestjs/common';
import { SendEmailCodeProvider } from '../../../utils/providers/email/send-email-code.provider';

@Injectable()
export class SendCodeEmailUseCase implements ISendEmailCodeUseCase {
  async Execute(input: ISendCodeEmailIn): Promise<Result<ISendCodeEmailOut>> {
    const randomCode = 12345;

    const RedisConn = new Cache();
    await RedisConn.connection();

    const emailSent = await SendEmailCodeProvider(input.email, randomCode);
    if (emailSent) {
      const value = {
        confirmed: false,
        code: randomCode,
      };
      const key = input.email;
      const expireIn = 60;

      await RedisConn.setWithExpire(key, expireIn, value);
    }

    return Result.Ok<ISendCodeEmailOut>({
      expiresIn: 60,
      sendTo: input.email,
    });
  }
}
