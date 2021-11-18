import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRegistry } from '@backbase/foundation-ang/core';

import { SelectContextRetailWidgetAngComponent } from './select-context-retail-widget-ang.component';

describe('SelectContextRetailWidgetAngComponent', () => {
  let component: SelectContextRetailWidgetAngComponent;
  let fixture: ComponentFixture<SelectContextRetailWidgetAngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectContextRetailWidgetAngComponent],
      providers: [TemplateRegistry],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContextRetailWidgetAngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
