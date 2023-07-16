import { IService } from '../../adapters/service.adapter';
import { Result } from '../../../utils/error/custom-error';

export interface ISendCodeEmailIn {
  email: string;
}

export interface ISendCodeEmailOut {
  expiresIn: number;
  sendTo: string;
}

export type ISendEmailCodeUseCase = IService<ISendCodeEmailIn, Result<ISendCodeEmailOut>>;
