import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { SelectContextWidgetModule } from '@backbase/retail-ang/access-control';
import { SelectContextRetailWidgetAngComponent } from './select-context-retail-widget-ang.component';

@NgModule({
  declarations: [SelectContextRetailWidgetAngComponent],
  imports: [
    CommonModule,
    BackbaseCoreModule.withConfig({
      classMap: { SelectContextRetailWidgetAngComponent },
    }),
    SelectContextWidgetModule,
  ],
})
export class SelectContextRetailWidgetAngModule {}
