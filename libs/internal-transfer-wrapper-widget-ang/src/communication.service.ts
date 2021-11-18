import { IdentifiedPaymentOrder } from '@backbase/data-ang/payment-order';
import { Subject } from 'rxjs';

export abstract class InternalTransferCommunicationService {
  abstract upcomingPaymentEditItem$: Subject<IdentifiedPaymentOrder | undefined>;
}
