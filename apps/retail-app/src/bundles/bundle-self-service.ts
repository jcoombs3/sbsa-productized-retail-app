import { NgModule } from '@angular/core';

import { AccountStatementListWidgetModule } from '@backbase/retail-ang/account-statement';
import { ActionsProductNotificationsSettingsWidgetModule } from '@backbase/retail-ang/actions';
import {
  AuthorizedUsersCreateWidgetModule,
  AuthorizedUsersListWidgetModule,
} from '@backbase/retail-ang/authorized-users';
import { PayordStopChecksListWidgetAngModule, PayordStopChecksWidgetModule } from '@backbase/retail-ang/payment-order';
import { UserIdentitySecurityCenterWidgetModule, UserManageProfileWidgetModule } from '@backbase/retail-ang/users';
import { DeviceInformationWidgetModule } from '@backbase/identity-ang/devices';

@NgModule({
  imports: [
    UserManageProfileWidgetModule,
    UserIdentitySecurityCenterWidgetModule,
    DeviceInformationWidgetModule,
    AuthorizedUsersListWidgetModule,
    AuthorizedUsersCreateWidgetModule,
    ActionsProductNotificationsSettingsWidgetModule,
    PayordStopChecksListWidgetAngModule,
    PayordStopChecksWidgetModule,
    AccountStatementListWidgetModule,
  ],
})
export class SelfServiceBundleModule {}
