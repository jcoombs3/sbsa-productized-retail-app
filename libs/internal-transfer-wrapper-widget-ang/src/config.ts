import {
  PaymentFormGroup,
  PaymentBaseFields,
  PaymentComponents,
  InitiatorFields,
  RemittanceInfoFields,
  CounterPartyFields,
  PaymentTypeConfig,
  AccountBalances,
  ProductKinds,
  ScheduleFields,
} from '@backbase/payment-orders-ang';
import { Validators, FormControl } from '@angular/forms';

const alphanumericPattern = "^[a-zA-Z0-9 \\\\=:;/().?'&@,*#-]+$";

// initiator form group
const initiator: PaymentFormGroup = {
  name: PaymentBaseFields.initiator,
  title: 'From account',
  fields: [
    {
      name: InitiatorFields.initiatorAccountGroup,
      type: PaymentComponents.internalAccountSelector,
      options: {
        placeholder: 'Select an account',
        productKinds: [
          {
            productKind: ProductKinds.savingsAccount,
            balance: {
              apiField: AccountBalances.available,
              label: 'Savings',
            },
          },
          {
            productKind: ProductKinds.currentAccount,
            balance: {
              apiField: AccountBalances.available,
              label: 'Current',
            },
          },
          {
            productKind: ProductKinds.creditCard,
            balance: {
              apiField: AccountBalances.available,
              label: 'Credit Card',
            },
          },
          {
            productKind: ProductKinds.loanAccount,
            balance: {
              apiField: AccountBalances.outstandingPrincipalAmount,
              label: 'Loan',
            },
          },
          {
            productKind: 'Investment Account',
            balance: {
              apiField: 'currentInvestmentValue',
              label: 'Loan',
            },
          },
        ],
        cssClasses: ['mb-0', 'px-3'],
        validationMessages: [
          {
            name: 'required',
            message: 'Please select an account from the list to transfer from',
          },
        ],
      },
    },
  ],
};

// counterParty form group
const counterParty: PaymentFormGroup = {
  name: PaymentBaseFields.counterparty,
  title: 'To account',
  fields: [
    {
      name: CounterPartyFields.counterPartyAccountGroup,
      type: PaymentComponents.internalAccountSelector,
      options: {
        placeholder: 'Select an account',
        productKinds: [
          {
            productKind: ProductKinds.savingsAccount,
            balance: {
              apiField: AccountBalances.available,
              label: 'Savings',
            },
          },
          {
            productKind: ProductKinds.currentAccount,
            balance: {
              apiField: AccountBalances.available,
              label: 'Current',
            },
          },
          {
            productKind: ProductKinds.creditCard,
            balance: {
              apiField: AccountBalances.available,
              label: 'Credit Card',
            },
          },
          {
            productKind: ProductKinds.loanAccount,
            balance: {
              apiField: AccountBalances.outstandingPrincipalAmount,
              label: 'Loan',
            },
          },
          {
            productKind: 'Investment Account',
            balance: {
              apiField: 'currentInvestmentValue',
              label: 'Loan',
            },
          },
        ],
        cssClasses: ['mb-5', 'px-3'],
        validationMessages: [
          {
            name: 'required',
            message: 'Please select an account from the list to transfer to',
          },
        ],
      },
    },
  ],
};

// remittanceInfo form group
const remittanceInfo: PaymentFormGroup = {
  name: PaymentBaseFields.remittanceInfo,
  title: 'Payment details',
  fields: [
    {
      type: PaymentComponents.amount,
      name: RemittanceInfoFields.amountCurrencyGroup,
      options: {
        label: 'Amount',
        currencies: ['ZAR'],
        cssClasses: ['d-block', 'col-md-8', 'px-3'],
      },
    },

    {
      name: RemittanceInfoFields.description,
      type: PaymentComponents.textarea,
      options: {
        label: 'Recipient reference',
        showCharCounter: true,
        minLength: 0,
        maxLength: 20,
        rows: 1,
        helperText: ' (Required)',
        cssClasses: ['d-block', 'col-md-8', 'px-3', 'mb-0'],
        validators: [Validators.required, Validators.pattern(alphanumericPattern)],
        validationMessages: [
          {
            name: 'pattern',
            message: 'This field allows only alphanumeric characters',
          },
        ],
      },
    },
    {
      name: RemittanceInfoFields.paymentReference,
      type: PaymentComponents.textarea,
      hidden: true,
      options: {
        label: 'Your reference',
      },
    },
  ],
};

// Frequencies object
const frequencies = [
  {
    value: 'ONCE',
    every: 1,
  },
  // {
  //   value: 'DAILY',
  //   every: 1,
  // },
  // {
  //   value: 'WEEKLY',
  //   every: 1,
  // },
  // {
  //   value: 'BIWEEKLY',
  //   every: 1,
  // },
  // {
  //   value: 'MONTHLY',
  //   every: 1,
  // },
  // {
  //   value: 'QUARTERLY',
  //   every: 1,
  // },
  // {
  //   value: 'YEARLY',
  //   every: 1,
  // },
];

// schedule form group
const schedule: PaymentFormGroup = {
  name: PaymentBaseFields.schedule,
  fields: [
    {
      type: PaymentComponents.schedule,
      name: ScheduleFields.scheduleGroup,
      options: {
        label: 'Schedule payment',
        frequencies,
        minOccurs: 1,
        maxOccurs: 1,
      },
    },
  ],
};

export const INTERNAL_TRANSFER: PaymentTypeConfig = {
  name: 'IAT',
  paymentType: 'IAT',
  fields: [initiator, counterParty, remittanceInfo, schedule],
  hooks: {
    onSave: ({ form, doneFn }: any) => {
      const paymentReference = <FormControl>(
        form.controls.remittanceInfo.controls[RemittanceInfoFields.paymentReference]
      );
      paymentReference.setValue('Internal Account Transfer');
      doneFn();
    },
  },
};
