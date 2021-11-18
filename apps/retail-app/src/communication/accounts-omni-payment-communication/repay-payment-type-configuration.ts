import { ValidatorFn, Validators } from '@angular/forms';
import { PaymentCardNumberFormat } from '@backbase/ui-ang';
import {
  endDateAfterStartDateValidator,
  Frequencies,
  maxValueTwoHundredValidator,
  minValueTwoValidator,
  pastDateValidator,
  ScheduleEndType,
} from '@backbase/payments-common-ang';
import {
  AccountBalances,
  AmountOptions,
  CounterPartyFields,
  InitiatorFields,
  internalTransAmountOptToggleDependants,
  internalTransferOnDestroyHook,
  internalTransferScheduleAlertOnInitHook,
  internalTransferScheduleFreqOnInitHook,
  internalTransScheduleStartDateOnInitHook,
  PaymentBaseFields,
  PaymentComponents,
  PaymentFormGroup,
  PaymentTypeConfig,
  ProductKinds,
  RemittanceInfoFields,
  scheduleEndDateOnInitHook,
  scheduleEndTypeToggleDependants,
  ScheduleFields,
  scheduleFrequencyToggleDependants,
  scheduleStartDateOnDestroyHook,
  toggleForAmountOptions,
} from '@backbase/payment-orders-ang';

const numbersFormat: PaymentCardNumberFormat = { length: 0, segments: 4, maskRange: [0, 0] };

const amountOptions: AmountOptions = {
  cssClasses: ['pl-2'],
  creditCard: [
    {
      label: $localize`:@@repay-modal.details.amount-label.minimum-payment:Minimum repayment`,
      description: $localize`:@@repay-modal.details.amount-description.minimum-payment:The minimum you need to pay`,
      amountApiField: 'minimumPayment',
    },
    {
      label: $localize`:@@repay-modal.details.amount-label.booked-balance:Consumed credit limit`,
      description: $localize`:@@repay-modal.details.amount-description.booked-balance:The balance plus any activity since the latest billing cycle`,
      amountApiField: 'bookedBalance',
    },
    {
      label: $localize`:@@repay-modal.details.amount-label.custom-amount:Different amount`,
      description: $localize`:@@repay-modal.details.amount-description.custom-amount:Choose what you wish to repay`,
      hasCustomAmountInput: true,
    },
  ],
};

const getToAccountForm = (useShortCurrency: boolean): PaymentFormGroup => ({
  name: PaymentBaseFields.counterparty,
  fields: [
    {
      type: PaymentComponents.internalAccountSelector,
      name: CounterPartyFields.counterPartyAccountGroup,
      options: {
        label: $localize`:@@repay-modal.account.to:To`,
        placeholder: $localize`:@@repay-modal.account.select:Select an account`,
        cssClasses: ['col-12', 'bb-block', 'bb-block--lg', 'bb-heading-3'],
        productKinds: [
          {
            productKind: ProductKinds.creditCard,
            balance: {
              apiField: AccountBalances.current,
              label: $localize`:@@repay-modal.account.total-owed:Total owed`,
            },
          },
        ],
        dependants: [
          {
            parent: PaymentBaseFields.remittanceInfo,
            items: [
              RemittanceInfoFields.description,
              RemittanceInfoFields.amountCurrencyGroup,
              RemittanceInfoFields.amountOptions,
            ],
          },
        ],
        showCurrencySymbol: useShortCurrency,
        productNumberFormat: numbersFormat,
        activateDependantsOn: (value, control) => toggleForAmountOptions(value, control, amountOptions),
      },
    },
  ],
});

const getFromAccountForm = (useShortCurrency: boolean): PaymentFormGroup => ({
  name: PaymentBaseFields.initiator,
  fields: [
    {
      type: PaymentComponents.internalAccountSelector,
      name: InitiatorFields.initiatorAccountGroup,
      options: {
        label: $localize`:@@repay-modal.account.from:From account`,
        placeholder: $localize`:@@repay-modal.account.select:Select an account`,
        cssClasses: ['col-12', 'bb-block', 'bb-block--lg', 'bb-heading-3'],
        productKinds: [
          { productKind: ProductKinds.savingsAccount, balance: { apiField: AccountBalances.available } },
          { productKind: ProductKinds.currentAccount, balance: { apiField: AccountBalances.current } },
        ],
        connectedAccounts: true,
        connectedAccountsSubHeader: $localize`:@@repay-modal.account.connected:Connected Accounts`,
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
        heading: $localize`:@@repay-modal.details.header:Payment details `,
        headingType: 'h3',
        headingClasses: ['mb-0'],
        separatorLine: true,
      },
    },
    {
      type: PaymentComponents.internalAmountOptions,
      name: RemittanceInfoFields.amountOptions,
      hidden: true,
      options: {
        cssClasses: ['col-12', 'pb-0'],
        isConditionalMandatory: true,
        noBalanceText: $localize`:@@repay-modal.details.error.no-balance:You don’t have any amount due on this credit card account.`,
        amountInputClassName: 'bb-amount-input__field--large',
        autoDecimal: true,
        mapCurrency: useShortCurrency,
        showCurrencySymbol: useShortCurrency,
        amountOptions,
        preselect: true,
        validationMessages: [
          {
            name: 'invalidAmount',
            message: $localize`:@@repay-modal.details.error.invalid-selected:Please add amount of this transfer`,
          },
          {
            name: 'required',
            message: $localize`:@@repay-modal.details.error.no-amount-selected:Please select an amount to transfer`,
          },
        ],
        activateDependantsOn: internalTransAmountOptToggleDependants,
      },
    },
    {
      type: PaymentComponents.compactAmount,
      name: RemittanceInfoFields.amountCurrencyGroup,
      options: {
        label: $localize`:@@repay-modal.details.amount:Amount`,
        cssClasses: ['bb-amount-input__field--large', 'bb-block', 'bb-block--lg', 'col-md-6'],
        autoDecimal: true,
        keepValueOnHidden: true,
        currency: 'USD',
        validationMessages: [
          {
            name: 'invalidAmount',
            message: $localize`:@@repay-modal.details.error.invalid-selected:Please add amount of this transfer`,
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
      type: PaymentComponents.scheduleHeader,
      name: PaymentComponents.scheduleHeader,
      options: {
        cssClasses: ['col-12', 'pb-0', 'pt-2', 'bb-heading-3'],
        heading: $localize`:@@repay-modal.delivery.header:Delivery `,
        headingType: 'h3',
        headingClasses: ['mb-0'],
        separatorLine: true,
      },
    },
    {
      type: PaymentComponents.alert,
      name: PaymentComponents.alert,
      hidden: true,
      options: {
        cssClasses: ['col-md-12'],
        alerts: {
          overdue: {
            title: $localize`:@@repay-modal.delivery.warning-title.due-date-passed:The due date has passed. This payment will incur a late fee.`,
            description: $localize`:@@repay-modal.delivery.warning-description.due-date-passed:The due date was @@date. Late payments will decrease your credit score.`,
            modifier: 'warning',
          },
        },
      },
      hooks: {
        onInit: internalTransferScheduleAlertOnInitHook,
      },
    },
    {
      type: PaymentComponents.select,
      name: ScheduleFields.frequency,
      options: {
        label: $localize`:@@repay-modal.delivery.frequency.title:Frequency`,
        validators: [Validators.required],
        options: [
          {
            label: $localize`:@@repay-modal.delivery.frequency.once:Once`,
            value: Frequencies.ONCE,
          },
          {
            label: $localize`:@@repay-modal.delivery.frequency.monthly:Monthly`,
            value: Frequencies.MONTHLY,
          },
        ],
        defaultValue: Frequencies.ONCE,
        cssClasses: ['d-inline-block', 'col-md-6', 'align-top'],
        dependants: [ScheduleFields.endType],
        activateDependantsOn: scheduleFrequencyToggleDependants,
      },
      hooks: {
        onInit: internalTransferScheduleFreqOnInitHook,
      },
    },
    {
      type: PaymentComponents.date,
      name: ScheduleFields.startDate,
      options: {
        label: $localize`:@@repay-modal.delivery.execution-date.title:Execution date`,
        cssClasses: ['d-inline-block', 'col-md-6', 'align-top'],
        validators: [Validators.required, pastDateValidator],
        defaultValue: new Date().toISOString(),
        validationMessages: [
          {
            name: 'pastDate',
            message: $localize`:@@repay-modal.delivery.warning-title.execution-date-in-past:Start date cannot be in the past`,
          },
        ],
        description: $localize`:@@repay-modal.delivery.warning-description.execution-date-in-past:You selected a date after the due date, this transfer will incur a late fee`,
      },
      hooks: {
        onInit: internalTransScheduleStartDateOnInitHook,
        onDestroy: scheduleStartDateOnDestroyHook,
      },
    },
    {
      type: PaymentComponents.radio,
      name: ScheduleFields.endType,
      options: {
        label: $localize`:@@repay-modal.delivery.end.title:End`,
        preselect: true,
        isConditionalMandatory: true,
        cssClasses: ['d-inline-block', 'offset-md-6', 'col-md-2', 'align-top', 'bb-schedule__end-type'],
        defaultValue: ScheduleEndType.NEVER,
        options: [
          { label: $localize`:@@repay-modal.delivery.end.never:Never`, value: ScheduleEndType.NEVER },
          { label: $localize`:@@repay-modal.delivery.end.on-date:On date`, value: ScheduleEndType.ON },
          { label: $localize`:@@repay-modal.delivery.end.after:After`, value: ScheduleEndType.AFTER },
        ],
        dependants: [ScheduleFields.endDate, ScheduleFields.repeat],
        activateDependantsOn: scheduleEndTypeToggleDependants,
      },
    },
    {
      type: PaymentComponents.date,
      name: ScheduleFields.endDate,
      options: {
        cssClasses: ['d-inline-block', 'col-md-4', 'align-top', 'bb-schedule__end-date'],
        validators: [endDateAfterStartDateValidator as ValidatorFn],
        validationMessages: [
          { name: 'required', message: $localize`:@@repay-modal.delivery.error.no-end-date:End date is required` },
          {
            name: 'lessThanStartDate',
            message: $localize`:@@repay-modal.delivery.error.end-date-before-start-date:End date cannot be before start date`,
          },
        ],
        isConditionalMandatory: true,
      },
      hooks: {
        onInit: scheduleEndDateOnInitHook,
      },
    },
    {
      type: PaymentComponents.number,
      name: ScheduleFields.repeat,
      options: {
        isConditionalMandatory: true,
        description: $localize`:@@repay-modal.delivery.occurrences.title:occurrences`,
        min: 2,
        max: 200,
        defaultValue: 2,
        validators: [minValueTwoValidator, maxValueTwoHundredValidator],
        validationMessages: [
          { name: 'required', message: $localize`:@@repay-modal.delivery.error.value-required:Value is required` },
          {
            name: 'min',
            message: $localize`:@@repay-modal.delivery.error.min-allowed-occurrences:Value is below the minimum allowed occurrences (2)`,
          },
          {
            name: 'max',
            message: $localize`:@@repay-modal.delivery.error.max-allowed-occurrences:Value exceeds maximum allowed occurrences (200)`,
          },
        ],
        cssClasses: ['d-inline-block', 'col-md-4', 'align-top', 'px-0', 'bb-schedule__repeat'],
      },
    },
  ],
});

export const getRepayPaymentTypeConfiguration = (useShortCurrency = true): PaymentTypeConfig => {
  const toAccount = getToAccountForm(useShortCurrency);
  const fromAccount = getFromAccountForm(useShortCurrency);
  const paymentDetails = getPaymentDetailsForm(useShortCurrency);
  const delivery = getDeliveryForm();

  return {
    fields: [toAccount, fromAccount, paymentDetails, delivery],
    name: $localize`:@@repay-modal.title:Repay credit card`,
    paymentType: 'INTERNAL_TRANSFER',
    businessFunction: 'A2A Transfer',
    hooks: {
      onDestroy: internalTransferOnDestroyHook,
    },
  };
};
