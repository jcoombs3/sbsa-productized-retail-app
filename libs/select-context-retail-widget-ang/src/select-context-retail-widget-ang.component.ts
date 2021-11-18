import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'bb-select-context-retail-widget-ang',
  templateUrl: './select-context-retail-widget-ang.component.html',
})
export class SelectContextRetailWidgetAngComponent {
  @Output() back = new EventEmitter<void>();
  @Output() loading = new EventEmitter<boolean>();

  goBack() {
    this.back.emit();
  }

  loadingChanged(event: boolean) {
    this.loading.emit(event);
  }
}
