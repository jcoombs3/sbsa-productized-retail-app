import { NgModule } from '@angular/core';

import { LeftToSpendWidgetModule, TopMetricsWidgetModule } from '@backbase/retail-ang/pfm';

@NgModule({
  imports: [LeftToSpendWidgetModule, TopMetricsWidgetModule],
})
export class FinancialInsightsBundleModule {}
