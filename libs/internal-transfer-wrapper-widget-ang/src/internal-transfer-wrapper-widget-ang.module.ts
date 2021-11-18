import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { PayordOmniPaymentWidgetAngModule } from '@backbase/retail-ang/payment-order';
import { US_DOMESTIC_WIRE } from '@backbase/retail-ang/payment-configs';
import { InternalTransferWrapperWidgetAngComponent } from './internal-transfer-wrapper-widget-ang.component';

@NgModule({
  declarations: [InternalTransferWrapperWidgetAngComponent],
  imports: [
    CommonModule,
    BackbaseCoreModule.withConfig({
      classMap: { InternalTransferWrapperWidgetAngComponent },
    }),
    PayordOmniPaymentWidgetAngModule.withConfig({
      paymentType: US_DOMESTIC_WIRE,
      businessFunction: 'US Domestic Wire',
    }),
  ],
})
export class InternalTransferWrapperWidgetAngModule {}
