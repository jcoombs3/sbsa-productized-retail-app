import { Component, Input, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemModelTree, TemplateRegistry } from '@backbase/foundation-ang/core';

import { NotificationsRetailRoutingContainerAngComponent } from './notifications-retail-routing-container-ang.component';

// Fake bb-area
@Component({
  selector: 'bb-area',
  template: '<div>{{children}}</div>',
})
class AreaComponent {
  @Input() children: Array<any> = [];
}

@NgModule({
  declarations: [AreaComponent],
  exports: [AreaComponent],
})
class AreaModule {}

describe('NotificationsRetailRoutingContainerAngComponent', () => {
  let component: NotificationsRetailRoutingContainerAngComponent;
  let fixture: ComponentFixture<NotificationsRetailRoutingContainerAngComponent>;

  const ItemModelTreeStub = {
    children: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaModule],
      declarations: [NotificationsRetailRoutingContainerAngComponent],
      providers: [TemplateRegistry],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(NotificationsRetailRoutingContainerAngComponent, {
        set: {
          providers: [{ provide: ItemModelTree, useValue: ItemModelTreeStub }],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsRetailRoutingContainerAngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
