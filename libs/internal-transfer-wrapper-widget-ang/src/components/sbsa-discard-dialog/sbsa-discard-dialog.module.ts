import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SbsaDiscardDialogComponentComponent } from './sbsa-discard-dialog.component';
import { ModalModule, ButtonModule } from '@backbase/ui-ang';

const uiModules = [ModalModule, ButtonModule];
@NgModule({
  declarations: [SbsaDiscardDialogComponentComponent],
  imports: [CommonModule, uiModules],
  exports: [SbsaDiscardDialogComponentComponent],
})
export class SbsaDiscardDialogModule {}
