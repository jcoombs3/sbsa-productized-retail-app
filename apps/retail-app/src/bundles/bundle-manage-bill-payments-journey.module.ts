import { NgModule } from '@angular/core';
import {
  ManageBillPaymentsJourneyModule,
  ManageBillPaymentsCommunicationService,
} from '@backbase/manage-bill-payments-journey-ang';
import { BillpayCommunication } from '../communication/billpayCommunication';

@NgModule({
  imports: [ManageBillPaymentsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManageBillPaymentsCommunicationService,
      useExisting: BillpayCommunication,
    },
  ],
})
export class ManageBillPaymentsJourneyBundleModule {}
