import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickActionsOmniPaymentWrapperWidgetAngComponent } from './quick-actions-omni-payment-wrapper-widget-ang.component';

describe('QuickActionsOmniPaymentWrapperWidgetAngComponent', () => {
  let component: QuickActionsOmniPaymentWrapperWidgetAngComponent;
  let fixture: ComponentFixture<QuickActionsOmniPaymentWrapperWidgetAngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickActionsOmniPaymentWrapperWidgetAngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickActionsOmniPaymentWrapperWidgetAngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
