import { LazyConfig } from '@backbase/foundation-ang/core';

export const bundlesDefinition: LazyConfig = [
  {
    module: 'AccountsTransactionsJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-accounts-transactions-journey.module').then(
        (m) => m.AccountsTransactionsJourneyBundleModule,
      ),
  },
  {
    module: 'ActionsRetailNotificationPreferencesJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-actions-retail-notification-preferences-journey.module').then(
        (m) => m.ActionsRetailNotificationPreferencesJourneyBundleModule,
      ),
  },
  {
    components: ['CampaignSpaceComponent', 'NavigationLinkWidgetComponent', 'QuickTransferJourneyComponent'],
    loadChildren: () =>
      import('../bundles/bundle-accounts-transactions').then((m) => m.AccountsTransactionsBundleModule),
  },
  {
    components: ['InternalTransferWrapperWidgetAngComponent', 'PayordInitiatePaymentWidgetComponent'],
    loadChildren: () => import('../bundles/bundle-payment-orders').then((m) => m.PaymentOrdersBundleModule),
  },
  {
    components: ['LeftToSpendWidgetComponent', 'TopMetricsWidgetComponent'],
    loadChildren: () => import('../bundles/bundle-financial-insights').then((m) => m.FinancialInsightsBundleModule),
  },
  {
    components: [
      'UserManageProfileWidgetComponent',
      'UserIdentitySecurityCenterWidgetComponent',
      'DeviceInformationWidgetComponent',
      'AuthorizedUsersListWidgetComponent',
      'AuthorizedUsersCreateWidgetComponent',
      'PayordStopChecksListWidgetAngComponent',
      'PayordStopChecksWidgetAngComponent',
      'AccountStatementListWidgetComponent',
    ],
    loadChildren: () => import('../bundles/bundle-self-service').then((m) => m.SelfServiceBundleModule),
  },
  {
    module: 'BudgetJourneyBundleModule',
    loadChildren: () => import('../bundles/bundle-budget.module').then((m) => m.BudgetJourneyBundleModule),
  },
  {
    module: 'IncomeAnalysisBundleModule',
    loadChildren: () => import('../bundles/bundle-income-analysis.module').then((m) => m.IncomeAnalysisBundleModule),
  },
  {
    module: 'SpendingAnalysisBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-spending-analysis.module').then((m) => m.SpendingAnalysisBundleModule),
  },
  {
    module: 'PlacesJourneyBundleModule',
    loadChildren: () => import('../bundles/bundle-places').then((m) => m.PlacesJourneyBundleModule),
  },
  {
    components: ['ProductSummaryAccountSelectorWidgetComponent'],
    loadChildren: () => import('../bundles/bundle-account-selector').then((m) => m.AccountSelectorBundleModule),
  },
  {
    components: ['LoginWidgetComponent', 'BackgroundContainerComponent'],
    loadChildren: () => import('../bundles/bundle-login').then((m) => m.LoginBundleModule),
  },
  {
    components: ['SelectContextRetailWidgetAngComponent'],
    loadChildren: () => import('../bundles/bundle-select-context').then((m) => m.SelectContextBundleModule),
  },
  {
    components: [
      'NavigationStepperWidgetComponent',
      'SelfEnrollmentConfirmationWidgetComponent',
      'SelfEnrollmentCreateAccountWidgetComponent',
      'SelfEnrollmentIdentificationWidgetComponent',
      'SelfEnrollmentLockedOutWidgetComponent',
      'SelfEnrollmentVerificationWidgetComponent',
    ],
    loadChildren: () => import('../bundles/bundle-self-enrollment').then((m) => m.SelfEnrollmentBundleModule),
  },
  {
    components: [
      'ConsentDetailsWidgetComponent',
      'ConsentListWidgetComponent',
      'ConsentRequestWidgetComponent',
      'PaymentRequestWidgetComponent',
    ],
    loadChildren: () => import('../bundles/bundle-consent').then((m) => m.ConsentBundleModule),
  },
  {
    module: 'CardsManagementJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-cards-management-journey.module').then((m) => m.CardsManagementJourneyBundleModule),
  },
  {
    module: 'AuthorizedUsersJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-authorized-users.module').then((m) => m.AuthorizedUsersJourneyBundleModule),
  },
  {
    module: 'ManageBillPaymentsJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-manage-bill-payments-journey.module').then(
        (m) => m.ManageBillPaymentsJourneyBundleModule,
      ),
  },
  {
    module: 'ManageBillPaymentsHistoryJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-manage-bill-payments-history-journey.module').then(
        (m) => m.ManageBillPaymentsHistoryJourneyBundleModule,
      ),
  },
  {
    module: 'ManagePayeesJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-manage-payees-journey.module').then((m) => m.ManagePayeesJourneyBundleModule),
  },
  {
    module: 'PayBillsJourneyBundleModule',
    loadChildren: () => import('../bundles/bundle-pay-bills-journey.module').then((m) => m.PayBillsJourneyBundleModule),
  },
  {
    module: 'MessagesClientInboxJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-messages-client-inbox-journey-bundle.module').then(
        (m) => m.MessagesClientInboxJourneyBundleModule,
      ),
  },
  {
    module: 'TurnoversJourneyBundleModule',
    loadChildren: () => import('../bundles/bundle-turnovers.module').then((m) => m.TurnoversJourneyBundleModule),
  },
  {
    module: 'ManageUpcomingAndHistoricalPaymentsJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/upcoming-and-history-payments.module').then(
        (m) => m.ManageUpcomingAndHistoricalPaymentsJourneyBundleModule,
      ),
  },
  {
    module: 'QuickTransferJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/quick-transfer-journey.module').then((m) => m.QuickTransferJourneyBundleModule),
  },
  {
    module: 'ConnectExternalAccountsJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/connect-external-accounts-journey.module').then(
        (m) => m.ConnectExternalAccountsJourneyBundleModule,
      ),
  },
  {
    module: 'ContactManagerJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-contact-journey.module').then((m) => m.ContactManagerJourneyBundleModule),
  },
  {
    module: 'AccountStatementRetailJourneyBundleModule',
    loadChildren: () =>
      import('../bundles/bundle-accounts-statement-retail-journey.module').then(
        (m) => m.AccountStatementRetailJourneyBundleModule,
      ),
  },
];
