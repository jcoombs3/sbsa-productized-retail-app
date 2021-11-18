import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bb-discard-dialog',
  templateUrl: './sbsa-discard-dialog.component.html',
})
export class SbsaDiscardDialogComponentComponent {
  @Input() isOpen = false;

  @Output() cancel = new EventEmitter<any>();
  @Output() confirm = new EventEmitter<any>();

  constructor() {}

  onDiscard() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
