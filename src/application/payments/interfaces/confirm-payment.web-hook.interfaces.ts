import { IService } from '../../adapters/service.adapter';
import { ConfirmPaymentEvent } from '../../../domain/payments/events/confirm-payment.event';

export type IConfirmPaymentWebHook = IService<ConfirmPaymentEvent, void>;
