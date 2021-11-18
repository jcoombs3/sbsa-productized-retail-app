import { NgModule, Provider } from '@angular/core';
import { NavigationLinkWidgetModule } from '@backbase/universal-ang/navigation';
import { QuickTransferJourneyBundleModule } from './quick-transfer-journey.module';
import {
  CampaignSpaceModule,
  CampaignSpaceConfiguration,
  CampaignSpaceConfigurationToken,
} from '@backbase/campaign-space-ang';

const CampaignSpaceConfigProvider: Provider = {
  provide: CampaignSpaceConfigurationToken,
  useValue: <Partial<CampaignSpaceConfiguration>>{
    dimensions: '328x430',
    title: 'Accounts and Transactions side banner',
  },
};

@NgModule({
  imports: [CampaignSpaceModule, NavigationLinkWidgetModule, QuickTransferJourneyBundleModule],
  providers: [CampaignSpaceConfigProvider],
})
export class AccountsTransactionsBundleModule {}
