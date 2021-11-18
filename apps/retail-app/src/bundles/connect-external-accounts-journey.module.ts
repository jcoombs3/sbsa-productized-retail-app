import { NgModule } from '@angular/core';
import { PaymentsCommunicationService } from '../communication/paymentsCommunication';
import {
  ConnectExternalAccountsJourneyModule,
  ConnectExternalAccontsCommunicationService,
} from '@backbase/connect-external-accounts-journey-ang';

@NgModule({
  imports: [ConnectExternalAccountsJourneyModule.forRoot()],
  providers: [
    {
      provide: ConnectExternalAccontsCommunicationService,
      useExisting: PaymentsCommunicationService,
    },
  ],
})
export class ConnectExternalAccountsJourneyBundleModule {}
