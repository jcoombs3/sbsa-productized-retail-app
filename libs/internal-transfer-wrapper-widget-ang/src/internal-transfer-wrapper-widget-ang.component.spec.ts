import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemModel } from '@backbase/foundation-ang/core';
import { of } from 'rxjs';

import { InternalTransferWrapperWidgetAngComponent } from './internal-transfer-wrapper-widget-ang.component';

describe('InternalTransferWrapperWidgetAngComponent', () => {
  let component: InternalTransferWrapperWidgetAngComponent;
  let fixture: ComponentFixture<InternalTransferWrapperWidgetAngComponent>;

  const ItemModelStub = {
    property: () => of(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternalTransferWrapperWidgetAngComponent],
    })
      .overrideComponent(InternalTransferWrapperWidgetAngComponent, {
        set: {
          providers: [{ provide: ItemModel, useValue: ItemModelStub }],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferWrapperWidgetAngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
