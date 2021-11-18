import { NgModule, Provider } from '@angular/core';
import {
  AccountsTransactionsJourneyModule,
  AccountsPaymentsCommunication,
  AccountsTransactionsJourneyConfigurationToken,
  AccountsTransactionsJourneyConfiguration,
} from '@backbase/accounts-transactions-journey-ang';
import { AccountsOmniPaymentCommunication } from '../communication/accounts-omni-payment-communication/accounts-omni-payment-communication';

const AccountsTransactionsConfigProvider: Provider = {
  provide: AccountsTransactionsJourneyConfigurationToken,
  useValue: <Partial<AccountsTransactionsJourneyConfiguration>>{
    showCheckImages: true,
    maskIndicator: true,
    disputeTopicId: '',
    inquireTopicId: '',
  },
};

@NgModule({
  imports: [AccountsTransactionsJourneyModule.forRoot()],
  providers: [
    AccountsTransactionsConfigProvider,
    {
      provide: AccountsPaymentsCommunication,
      useExisting: AccountsOmniPaymentCommunication,
    },
  ],
})
export class AccountsTransactionsJourneyBundleModule {}
