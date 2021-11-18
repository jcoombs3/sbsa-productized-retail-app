import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentTypeConfig } from '@backbase/retail-ang/payment-order';
import { IdentifiedPaymentOrder } from '@backbase/payments-common-ang';
import { AccountsPaymentsCommunication } from '@backbase/accounts-transactions-journey-ang';
import {
  QuickActionsOmniPaymentCommunication,
  QuickActionsOmniPaymentWrapperWidgetAngComponentApi,
} from '@backbase/quick-actions-omni-payment-wrapper-widget-ang';
import { getCashAdvancePaymentTypeConfiguration } from './cash-advance-payment-type-configuration';
import { getRepayPaymentTypeConfiguration } from './repay-payment-type-configuration';

interface PaymentPayload {
  paymentOrder: IdentifiedPaymentOrder;
  paymentTypeConfig: PaymentTypeConfig;
}

export const PAYMENT_MODAL_NAME = 'quick-payment-modal';

@Injectable({
  providedIn: 'root',
})
export class AccountsOmniPaymentCommunication
  implements AccountsPaymentsCommunication, QuickActionsOmniPaymentCommunication {
  private destinationApi: QuickActionsOmniPaymentWrapperWidgetAngComponentApi | undefined;
  private paymentPayload: PaymentPayload | undefined;

  constructor(private readonly router: Router) {}

  initDestination(destinationApi: QuickActionsOmniPaymentWrapperWidgetAngComponentApi) {
    this.destinationApi = destinationApi;
    this.setPaymentConfiguration();
  }

  repayEvent(arrangementId: string) {
    const paymentConfiguration = getRepayPaymentTypeConfiguration();
    const paymentOrder = this.getPaymentOrder(paymentConfiguration.paymentType, { counterparty: arrangementId });
    this.paymentEvent(paymentOrder, paymentConfiguration);
  }

  cashAdvanceEvent(arrangementId: string) {
    const paymentConfiguration = getCashAdvancePaymentTypeConfiguration();
    const paymentOrder = this.getPaymentOrder(paymentConfiguration.paymentType, { originator: arrangementId });
    this.paymentEvent(paymentOrder, paymentConfiguration);
  }

  private paymentEvent(paymentOrder: IdentifiedPaymentOrder, paymentTypeConfig: PaymentTypeConfig) {
    this.paymentPayload = { paymentOrder, paymentTypeConfig };
    this.setPaymentConfiguration();
    this.navigateToModal(PAYMENT_MODAL_NAME);
  }

  private setPaymentConfiguration() {
    if (this.destinationApi && this.paymentPayload) {
      this.destinationApi.setPaymentConfiguration(
        this.paymentPayload.paymentOrder,
        this.paymentPayload.paymentTypeConfig,
      );
    }
  }

  private navigateToModal(modalName: string): void {
    this.router.navigate([], {
      queryParams: { modalOpened: modalName },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  private getPaymentOrder(
    paymentType: string,
    id: { originator?: string; counterparty?: string },
  ): IdentifiedPaymentOrder {
    return {
      paymentType,
      requestedExecutionDate: new Date().toISOString(),
      originatorAccount: { arrangementId: id.originator },
      transferTransactionInformation: {
        counterpartyAccount: { arrangementId: id.counterparty },
        instructedAmount: { amount: '', currencyCode: '' },
      },
    } as IdentifiedPaymentOrder;
  }
}
