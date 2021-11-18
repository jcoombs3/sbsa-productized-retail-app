import { Component, Input, OnInit, Optional } from '@angular/core';
import {
  PayordOmniPaymentWidgetAngComponent,
  OmniPaymentWidgetOptions,
  PaymentTypeConfig,
} from '@backbase/retail-ang/payment-order';
import { CopyRoutes } from '@backbase/foundation-ang/core';
import { IdentifiedPaymentOrder } from '@backbase/payments-common-ang';
import { RoutableModalService } from '@backbase/payment-orders-ang';
import { BehaviorSubject } from 'rxjs';
import { QuickActionsOmniPaymentCommunication } from './types';

@Component({
  selector: 'bb-quick-actions-omni-payment-wrapper-widget-ang',
  templateUrl: './quick-actions-omni-payment-wrapper-widget-ang.component.html',
})
@CopyRoutes(PayordOmniPaymentWidgetAngComponent)
export class QuickActionsOmniPaymentWrapperWidgetAngComponent implements OnInit {
  /**
   * Name of the modal view. Required to display the widget in modal
   */
  @Input() modalName = '';
  /**
   * Defines modal open/close state
   */
  isModalOpened$ = new BehaviorSubject<boolean>(false);
  /**
   * Payment order
   */
  paymentOrder: IdentifiedPaymentOrder | undefined;
  /**
   * Payment type configuration
   */
  paymentTypeConfiguration: PaymentTypeConfig | undefined;

  constructor(
    private readonly routableModalService: RoutableModalService,
    @Optional() private omniPaymentCommunicator: QuickActionsOmniPaymentCommunication,
  ) {
    if (this.omniPaymentCommunicator) {
      this.omniPaymentCommunicator.initDestination({
        setPaymentConfiguration: this.setPaymentConfiguration.bind(this),
      });
    }
  }

  ngOnInit() {
    if (!this.isConfigurationSet()) {
      this.closeModal();
    }
  }

  isConfigurationSet(): boolean {
    return !!this.paymentOrder && !!this.paymentTypeConfiguration;
  }

  getWidgetOptions(): OmniPaymentWidgetOptions | any {
    return {
      modalViewName: this.modalName,
      isModalView: true,
      isEditPaymentModal: false,
      enableApprovals: true,
      enablePaymentTemplateSelector: false,
      enableSavePaymentAsTemplate: false,
      isOneOffToRecurrentAllowed: false,
      isRecurrentToOneOffAllowed: false,
      isErrorTitleDisplayed: true,
      checkClosedPaymentsAccess: false,
      defaultScheme: 'BBAN',
      defaultCountry: 'US',
      successEventName: 'bb.refresh.payments.list',
      pageSize: 100,
    };
  }

  onModalToggle(isModalOpen: boolean) {
    this.isModalOpened$.next(isModalOpen);
  }

  private setPaymentConfiguration(payment: IdentifiedPaymentOrder, paymentTypeConfig: PaymentTypeConfig): void {
    this.paymentOrder = payment;
    this.paymentTypeConfiguration = paymentTypeConfig;
    this.openModal();
  }

  private openModal(): void {
    this.routableModalService.openModal(this.modalName);
  }

  private closeModal(): void {
    this.routableModalService.closeModal();
  }
}
