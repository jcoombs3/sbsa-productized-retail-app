import { Component, EventEmitter, Output } from '@angular/core';
import { CopyRoutes, ItemModel } from '@backbase/foundation-ang/core';
import {
  CHAPS,
  SEPA,
  US_ACH_CREDIT,
  US_DOMESTIC_WIRE,
  INTERNAL_TRANSFER,
  INTRABANK_TRANSFER,
  UK_FASTER_PAYMENT,
} from '@backbase/retail-ang/payment-configs';
import {
  PayordOmniPaymentWidgetAngComponent,
  PaymentTypeConfig,
  ReviewScreens,
} from '@backbase/retail-ang/payment-order';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentifiedPaymentOrder } from '@backbase/data-ang/payment-order';
import { InternalTransferCommunicationService } from './communication.service';

@Component({
  selector: 'bb-internal-transfer-wrapper-widget-ang',
  templateUrl: './internal-transfer-wrapper-widget-ang.component.html',
})
@CopyRoutes(PayordOmniPaymentWidgetAngComponent)
export class InternalTransferWrapperWidgetAngComponent {
  /**
   * Event emitter to initiate redirection to scheduled payments
   */
  @Output() redirectAfterSuccess = new EventEmitter();

  readonly upcomingPaymentEditItem$ = this.communicationService.upcomingPaymentEditItem$.asObservable() as Observable<
    IdentifiedPaymentOrder | any
  >;
  paymentType$ = this.itemModel.property<string>('paymentType');
  defaultScheme$: Observable<'BBAN' | 'IBAN' | undefined> = this.itemModel
    .property('defaultScheme')
    .pipe(map((value) => (value !== 'BBAN' && value !== 'IBAN' ? undefined : value)));
  enableApprovals$ = this.itemModel.property<boolean>('enableApprovals');
  enablePaymentTemplateSelector$ = of(false);
  enableSavePaymentAsTemplate$ = of(false);
  options$ = combineLatest([
    this.defaultScheme$,
    this.enableApprovals$,
    this.enablePaymentTemplateSelector$,
    this.enableSavePaymentAsTemplate$,
  ]).pipe(
    map(([defaultScheme, enableApprovals, enablePaymentTemplateSelector, enableSavePaymentAsTemplate]) => ({
      defaultScheme,
      enableApprovals,
      enablePaymentTemplateSelector,
      enableSavePaymentAsTemplate,
      reviewScreenType: ReviewScreens.ADAPTED,
    })),
  );

  constructor(
    private readonly itemModel: ItemModel,
    private readonly communicationService: InternalTransferCommunicationService,
  ) {}

  getPaymentConfig(paymentType: string): PaymentTypeConfig | undefined {
    switch (paymentType) {
      case 'SEPA':
        return SEPA;
      case 'US_ACH_CREDIT':
        return US_ACH_CREDIT;
      case 'FASTER_PAYMENT':
        return UK_FASTER_PAYMENT;
      case 'CHAPS':
        return CHAPS;
      case 'US_DOMESTIC_WIRE':
        return US_DOMESTIC_WIRE;
      case 'INTERNAL_TRANSFER':
        return INTERNAL_TRANSFER;
      case 'INTRABANK_TRANSFER':
        return INTRABANK_TRANSFER;
      default:
        return undefined;
    }
  }

  getBusinessFunction(paymentType: string): string {
    switch (paymentType) {
      case 'SEPA':
        return 'SEPA CT';
      case 'US_ACH_CREDIT':
        return 'ACH Credit Transfer';
      case 'CHAPS':
        return 'UK CHAPS';
      case 'FASTER_PAYMENT':
        return 'UK Faster Payments';
      case 'US_DOMESTIC_WIRE':
        return 'US Domestic Wire';
      case 'INTERNAL_TRANSFER':
        return 'A2A Transfer';
      case 'INTRABANK_TRANSFER':
        return 'A2A Transfer';
    }
    return 'SEPA CT';
  }
  /**
   * Emits an event to navigate to the scheduled payment
   *
   * @returns {void}
   */
  onAfterSuccessRedirect() {
    this.redirectAfterSuccess.emit();
  }
}
