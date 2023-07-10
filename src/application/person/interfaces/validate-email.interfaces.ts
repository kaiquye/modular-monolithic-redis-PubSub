import { IService } from '../../adapters/service.adapter';

import { Result } from '../../../utils/error/custom-error';

export interface IValidateEmailCodeIn {
  code: number;
  email: string;
}

export type IValidateEmailCodeUseCase = IService<IValidateEmailCodeIn, Result<void>>;
