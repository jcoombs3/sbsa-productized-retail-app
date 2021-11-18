import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { PayordOmniPaymentWidgetAngModule } from '@backbase/retail-ang/payment-order';
import { SbsaDiscardDialogModule } from './components/sbsa-discard-dialog/sbsa-discard-dialog.module';
import { InternalTransferWrapperWidgetAngComponent } from './internal-transfer-wrapper-widget-ang.component';

@NgModule({
  declarations: [InternalTransferWrapperWidgetAngComponent],
  imports: [
    CommonModule,
    BackbaseCoreModule.withConfig({
      classMap: { InternalTransferWrapperWidgetAngComponent },
    }),
    PayordOmniPaymentWidgetAngModule,
    SbsaDiscardDialogModule,
  ],
})
export class InternalTransferWrapperWidgetAngModule {}
