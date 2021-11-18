import { NgModule } from '@angular/core';
import { QuickTransferProductKinds as ProductKinds } from '@backbase/retail-ang/quick-transfer';
import {
  QuickTransferJourneyModule,
  QuickTransferJourneyConfiguration,
  QuickTransferJourneyConfigurationToken,
} from '@backbase/quick-transfer-journey-ang';
import '@angular/localize/init';

const fromAccount = {
  productKinds: [
    ProductKinds.savingsAccount,
    ProductKinds.currentAccount,
    ProductKinds.creditCard,
    ProductKinds.loanAccount,
    ProductKinds.connectedAccounts,
  ],
  otherFilters: [{ key: 'currency', value: ['EUR', 'AED', 'USD'] }],
  connectedAccountsSubHeader: $localize`:@@quick-transfer-initiator-connected-acc-subheader:Connected Accounts`,
  validationMessages: [
    {
      name: 'required',
      message: $localize`:@@quick-transfer-initiator-validation-required:From account is required`,
    },
  ],
};

const toAccount = {
  productKinds: [
    ProductKinds.savingsAccount,
    ProductKinds.currentAccount,
    ProductKinds.creditCard,
    ProductKinds.loanAccount,
    ProductKinds.connectedAccounts,
    ProductKinds.contacts,
  ],
  connectedAccountsSubHeader: $localize`:@@quick-transfer-counterparty-connected-acc-subheader:Connected Accounts`,
  validationMessages: [
    {
      name: 'required',
      message: $localize`:@@quick-transfer-counterparty-validation-required:To account is required`,
    },
  ],
};

const amount = {
  initialCurrency: 'USD',
  validationMessages: [
    {
      name: 'invalidAmount',
      message: $localize`:@@quick-transfer-counterparty-validation-invalid-amount:Please fill in an amount`,
    },
  ],
};

@NgModule({
  imports: [QuickTransferJourneyModule],
  providers: [
    {
      provide: QuickTransferJourneyConfigurationToken,
      useValue: <QuickTransferJourneyConfiguration>{
        fields: { fromAccount, toAccount, amount },
        businessFunction: 'A2A Transfer',
        successEvents: 'eventName',
        paymentTypes: {
          internal: 'INTERNAL_TRANSFER',
          external: 'EXTERNAL_A2A',
          contact: 'INTRABANK_TRANSFER',
        },
        disabledCombinations: [
          { from: ProductKinds.loanAccount, to: ProductKinds.loanAccount },
          { from: ProductKinds.creditCard, to: ProductKinds.creditCard },
        ],
      },
    },
  ],
})
export class QuickTransferJourneyBundleModule {}
