import { PaymentTypeConfig } from '@backbase/retail-ang/payment-order';
import { IdentifiedPaymentOrder } from '@backbase/payments-common-ang';
interface Communicator<API> {
  initDestination(destinationApi: API): void;
}
export interface QuickActionsOmniPaymentWrapperWidgetAngComponentApi {
  setPaymentConfiguration(paymentOrder: IdentifiedPaymentOrder, paymentTypeConfig: PaymentTypeConfig): void;
}
export abstract class QuickActionsOmniPaymentCommunication
  implements Communicator<QuickActionsOmniPaymentWrapperWidgetAngComponentApi> {
  abstract initDestination(destinationApi: QuickActionsOmniPaymentWrapperWidgetAngComponentApi): void;
  abstract repayEvent(arrangementId: string): void;
  abstract cashAdvanceEvent(arrangementId: string): void;
}
