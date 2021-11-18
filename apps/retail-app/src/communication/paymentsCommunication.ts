import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ManageUpcomingAndHistoricalPaymentsCommunicationService } from '@backbase/manage-upcoming-and-historical-payments-journey-ang';
import { BehaviorSubject } from 'rxjs';
import { IdentifiedPaymentOrder } from '@backbase/payment-order-http-ang';
import { InternalTransferCommunicationService } from '@backbase/internal-transfer-wrapper-widget-ang';
import { ConnectExternalAccontsCommunicationService } from '@backbase/connect-external-accounts-journey-ang';

@Injectable({
  providedIn: 'root',
})
export class PaymentsCommunicationService
  implements
    ManageUpcomingAndHistoricalPaymentsCommunicationService,
    InternalTransferCommunicationService,
    ConnectExternalAccontsCommunicationService {
  upcomingPaymentEditItem$ = new BehaviorSubject<IdentifiedPaymentOrder | undefined>(undefined);

  constructor(private readonly router: Router) {}

  navigateToEditPayment(payment: IdentifiedPaymentOrder) {
    const route = payment.paymentType === 'INTRABANK_TRANSFER' ? 'money-to-member' : 'make-a-transfer';

    this.router.navigate(['2', route]);
    this.upcomingPaymentEditItem$.next(payment);
  }

  navigateToMakeTransfer(id: string) {
    this.router.navigate(['2', 'make-a-transfer', { transferFrom: id }]);
  }
}
