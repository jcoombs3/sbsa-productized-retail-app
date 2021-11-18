import { NgModule } from '@angular/core';

import { PaymentsCommunicationService } from '../communication/paymentsCommunication';
import {
  InternalTransferWrapperWidgetAngModule,
  InternalTransferCommunicationService,
} from '@backbase/internal-transfer-wrapper-widget-ang';

@NgModule({
  imports: [InternalTransferWrapperWidgetAngModule],
  providers: [
    {
      provide: InternalTransferCommunicationService,
      useExisting: PaymentsCommunicationService,
    },
  ],
})
export class PaymentOrdersBundleModule {}
