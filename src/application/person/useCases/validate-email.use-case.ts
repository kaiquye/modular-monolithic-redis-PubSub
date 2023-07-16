import { IValidateEmailCodeIn, IValidateEmailCodeUseCase } from '../interfaces/validate-email.interfaces';
import { Result } from '../../../utils/error/custom-error';
import { Cache } from '../../../providers/redis/connection';
import { Injectable } from '@nestjs/common';
import { ErrPersonReference } from './flags';

@Injectable()
export class ValidateEmailUseCase implements IValidateEmailCodeUseCase {
  async Execute(input: IValidateEmailCodeIn): Promise<Result<void>> {
    const RedisConn = new Cache();
    await RedisConn.connection();

    const getValue = await RedisConn.get(input.email);
    const valueParse = JSON.parse(getValue);

    if (Number(valueParse.code) !== input.code) {
      Result.BadRequest({
        message: 'invalid code',
        errorReference: ErrPersonReference.CD_CIV_400,
      });
    }

    const value = {
      confirmed: true,
      code: input.code,
    };
    const key = input.email;
    const expireIn = 60;

    await RedisConn.setWithExpire(key, expireIn, value);

    return Result.Ok<void>();
  }
}
