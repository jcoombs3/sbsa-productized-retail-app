import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { PayordOmniPaymentWidgetAngModule } from '@backbase/retail-ang/payment-order';
import { QuickActionsOmniPaymentWrapperWidgetAngComponent } from './quick-actions-omni-payment-wrapper-widget-ang.component';

@NgModule({
  declarations: [QuickActionsOmniPaymentWrapperWidgetAngComponent],
  imports: [
    CommonModule,
    BackbaseCoreModule.withConfig({
      classMap: { QuickActionsOmniPaymentWrapperWidgetAngComponent },
    }),
    PayordOmniPaymentWidgetAngModule,
  ],
})
export class QuickActionsOmniPaymentWrapperWidgetAngModule {}
