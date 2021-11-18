import { AbstractControl, Validators } from '@angular/forms';
import { PaymentCardNumberFormat } from '@backbase/ui-ang';
import { Frequencies, pastDateValidator } from '@backbase/payments-common-ang';
import {
  AccountBalances,
  CounterPartyFields,
  InitiatorFields,
  internalTransferOnDestroyHook,
  internalTransferScheduleAlertOnInitHook,
  internalTransScheduleStartDateOnInitHook,
  PaymentBaseFields,
  PaymentComponents,
  PaymentFormGroup,
  PaymentTypeConfig,
  ProductKinds,
  RemittanceInfoFields,
  ScheduleFields,
  scheduleStartDateOnDestroyHook,
} from '@backbase/payment-orders-ang';

const numbersFormat: PaymentCardNumberFormat = { length: 0, segments: 4, maskRange: [0, 0] };

const creditLimitExceededValidator = (control: AbstractControl) => {
  // tslint:disable-next-line:no-null-keyword
  let validationResult = null;
  const selectedValue = parseFloat(control.value.amount);
  if (control.root) {
    const fromControl = control.root.get(PaymentBaseFields.initiator);
    const creditLimit = fromControl?.value?.accountData?.creditLimit;
    if (creditLimit !== undefined && selectedValue > creditLimit) {
      validationResult = { creditLimitExceeded: true };
    }
  }
  return Promise.resolve(validationResult);
};

const getFromAccountForm = (useShortCurrency: boolean): PaymentFormGroup => ({
  name: PaymentBaseFields.initiator,
  fields: [
    {
      type: PaymentComponents.internalAccountSelector,
      name: InitiatorFields.initiatorAccountGroup,
      options: {
        label: $localize`:@@cash-advance-modal.account.from:From`,
        placeholder: $localize`:@@cash-advance-modal.account.select:Select an account`,
        cssClasses: ['col-12', 'bb-block', 'bb-block--lg', 'bb-heading-3'],
        productKinds: [
          {
            productKind: ProductKinds.creditCard,
            balance: {
              apiField: AccountBalances.current,
              label: $localize`:@@cash-advance-modal.account.total-owed:Total owed`,
            },
          },
        ],
        showCurrencySymbol: useShortCurrency,
        productNumberFormat: numbersFormat,
      },
    },
  ],
});

const getToAccountForm = (useShortCurrency: boolean): PaymentFormGroup => ({
  name: PaymentBaseFields.counterparty,
  fields: [
    {
      type: PaymentComponents.internalAccountSelector,
      name: CounterPartyFields.counterPartyAccountGroup,
      options: {
        label: $localize`:@@cash-advance-modal.account.to:To`,
        placeholder: $localize`:@@cash-advance-modal.account.select:Select an account`,
        cssClasses: ['col-12', 'bb-block', 'bb-block--lg', 'bb-heading-3'],
        productKinds: [
          { productKind: ProductKinds.savingsAccount, balance: { apiField: AccountBalances.available } },
          { productKind: ProductKinds.currentAccount, balance: { apiField: AccountBalances.current } },
        ],
        connectedAccounts: true,
        connectedAccountsSubHeader: $localize`:@@cash-advance-modal.account.connected:Connected Accounts`,
        preselect: true,
        showCurrencySymbol: useShortCurrency,
        productNumberFormat: numbersFormat,
      },
    },
  ],
});

const getPaymentDetailsForm = (useShortCurrency: boolean): PaymentFormGroup => ({
  name: PaymentBaseFields.remittanceInfo,
  fields: [
    {
      type: PaymentComponents.header,
      name: PaymentComponents.header,
      options: {
        cssClasses: ['col-12', 'pb-0', 'pt-2', 'bb-fieldset__heading'],
        heading: $localize`:@@cash-advance-modal.details.header:Payment details `,
        headingType: 'h3',
        headingClasses: ['mb-0'],
        separatorLine: true,
      },
    },
    {
      type: PaymentComponents.compactAmount,
      name: RemittanceInfoFields.amountCurrencyGroup,
      options: {
        label: $localize`:@@cash-advance-modal.details.amount:Amount`,
        cssClasses: ['bb-amount-input__field--large', 'bb-block', 'bb-block--lg', 'col-md-6'],
        asyncValidators: [creditLimitExceededValidator],
        autoDecimal: true,
        keepValueOnHidden: true,
        validationMessages: [
          {
            name: 'invalidAmount',
            message: $localize`:@@cash-advance-modal.details.error.invalid-selected:Please add amount of this transfer`,
          },
          {
            name: 'creditLimitExceeded',
            message: $localize`:@@cash-advance-modal.details.error.credit-limit-exceeded:Please enter an amount below your remaining cash credit limit`,
          },
        ],
      },
    },
  ],
});

const getDeliveryForm = (): PaymentFormGroup => ({
  name: PaymentBaseFields.schedule,
  fields: [
    {
      type: PaymentComponents.alert,
      name: PaymentComponents.alert,
      hidden: true,
      options: {
        cssClasses: ['col-md-12'],
        alerts: {
          overdue: {
            title: $localize`:@@cash-advance-modal.delivery.warning-title.due-date-passed:The due date has passed. This payment will incur a late fee.`,
            description: $localize`:@@cash-advance-modal.delivery.warning-description.due-date-passed:The due date was @@date. Late payments will decrease your credit score.`,
            modifier: 'warning',
          },
        },
      },
      hooks: {
        onInit: internalTransferScheduleAlertOnInitHook,
      },
    },
    {
      type: PaymentComponents.date,
      name: ScheduleFields.startDate,
      options: {
        label: $localize`:@@cash-advance-modal.delivery.execution-date.title:Execution date`,
        cssClasses: ['d-inline-block', 'col-md-6', 'align-top'],
        validators: [Validators.required, pastDateValidator],
        defaultValue: new Date().toISOString(),
        validationMessages: [
          {
            name: 'pastDate',
            message: $localize`:@@cash-advance-modal.delivery.warning-title.execution-date-in-past:Start date cannot be in the past`,
          },
        ],
        description: $localize`:@@cash-advance-modal.delivery.warning-description.execution-date-in-past:You selected a date after the due date, this transfer will incur a late fee`,
      },
      hooks: {
        onInit: internalTransScheduleStartDateOnInitHook,
        onDestroy: scheduleStartDateOnDestroyHook,
      },
    },
    {
      type: PaymentComponents.select,
      name: ScheduleFields.frequency,
      options: { options: [{ value: Frequencies.ONCE }], defaultValue: Frequencies.ONCE },
      hidden: true,
    },
  ],
});

export const getCashAdvancePaymentTypeConfiguration = (useShortCurrency = true): PaymentTypeConfig => {
  const fromAccount = getFromAccountForm(useShortCurrency);
  const toAccount = getToAccountForm(useShortCurrency);
  const paymentDetails = getPaymentDetailsForm(useShortCurrency);
  const delivery = getDeliveryForm();

  return {
    fields: [fromAccount, toAccount, paymentDetails, delivery],
    name: $localize`:@@cash-advance-modal.title:Cash advance`,
    paymentType: 'INTERNAL_TRANSFER',
    businessFunction: 'A2A Transfer',
    hooks: {
      onDestroy: internalTransferOnDestroyHook,
    },
  };
};
