import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BackbaseCoreModule, SessionTimeoutModule, StepUpModule } from '@backbase/foundation-ang/core';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsRetailRoutingContainerAngModule } from '@backbase/notifications-retail-routing-container-ang';
import { StepUpAuthenticationComponent } from './components/step-up/step-up-authentication.component';
import { SessionTimeoutComponent } from './components/session-timeout/session-timeout.component';
import { FormsModule } from '@angular/forms';
import { WebSdkApiModule, PAGE_CONFIG, PageConfig } from '@backbase/foundation-ang/web-sdk';
import { BackbaseStoreModule } from '@backbase/foundation-ang/store';
import { ContainersModule } from '@backbase/universal-ang/containers';
import { RemoteConfigModule, RemoteConfigService } from '@backbase/remote-config-ang';
import { MegaMenuNavigationContainerModule, MegaMenuContainerConfig, MEGA_MENU_CONTAINER_CONFIG } from '@backbase/universal-ang/navigation';
import { LayoutContainerModule } from '@backbase/universal-ang/layouts';
import { HeadingWidgetModule } from '@backbase/universal-ang/heading';
import { ContentWidgetModule } from '@backbase/universal-ang/content';
import { UserContextMenuWidgetModule } from '@backbase/retail-ang/access-control';
import { NotificationsBadgeWidgetModule, NotificationsPopupsWidgetModule } from '@backbase/retail-ang/notifications';
import { TransactionSigningWidgetModule, TransactionSigningModule } from '@backbase/identity-ang/transaction-signing';
import { ImpersonationBannerWidgetModule } from '@backbase/identity-ang/impersonation';
import { AnimationProvider, HttpXsrfProvider } from './config.providers';
import { CanDeactivateGuard } from '@backbase/contact-manager-widget-ang';
import { AuthInterceptor } from '@backbase/foundation-ang/auth';
import { RetailAppRemoteConfig, remoteConfigDefaults } from '../remote-config/remote-config';
import { CARDS_BASE_PATH } from '@backbase/data-ang/cards';
import { TRANSACTIONS_BASE_PATH } from '@backbase/data-ang/transactions';
import { ARRANGEMENT_MANAGER_BASE_PATH } from '@backbase/data-ang/arrangements';
import { SAVING_GOALS_BASE_PATH } from '@backbase/data-ang/saving-goals';
import { CATEGORIES_MANAGEMENT_BASE_PATH } from '@backbase/data-ang/categories-management';
import { BUDGETING_BASE_PATH } from '@backbase/data-ang/budgeting';
import { AUTHORIZED_USER_BASE_PATH } from '@backbase/data-ang/authorized-users';
import { BILLPAY_BASE_PATH } from '@backbase/data-ang/billpay';
import { CONTACT_MANAGER_BASE_PATH } from '@backbase/data-ang/contact-manager';
import { PAYMENT_ORDER_BASE_PATH } from '@backbase/data-ang/payment-order';
import { STOP_CHECKS_BASE_PATH } from '@backbase/data-ang/stop-checks';
import { ACCOUNT_STATEMENT_BASE_PATH } from '@backbase/data-ang/account-statements';
import { USER_BASE_PATH } from '@backbase/data-ang/user';
import { DEVICE_BASE_PATH } from '@backbase/data-ang/device';
import { PAYMENT_ORDER_A2A_BASE_PATH } from '@backbase/data-ang/payment-order-a2a';
import { PLACES_BASE_PATH } from '@backbase/data-ang/places';
import { MESSAGES_BASE_PATH } from '@backbase/data-ang/messages';
import { ACTIONS_BASE_PATH } from '@backbase/data-ang/actions';
import { NOTIFICATIONS_BASE_PATH } from '@backbase/data-ang/notifications';
import { ACCESS_CONTROL_BASE_PATH } from '@backbase/data-ang/accesscontrol';
import { CONSENT_BASE_PATH } from '@backbase/data-ang/consent';
import { StepUpConfig } from './components/step-up/step-up-config';
import { bundlesDefinition } from './bundles-definition';

export function getBasePath(servicePath: string) { return (config: PageConfig) => `${config.apiRoot}/${servicePath}`; }


export function applicationInitializer(remoteConfig: RemoteConfigService<RetailAppRemoteConfig>) { return () => remoteConfig.fetchAndActivate(); }



export function configureMegaMenuPagesRendering(remoteConfig: RemoteConfigService<RetailAppRemoteConfig>): Partial<MegaMenuContainerConfig> {
  return {
    linksMap: (links: any[]) => {
      const hiddenPages: { [key: string]: boolean; } = {
        'billpay,manage-payees': true,
        'self-service,manage-contacts': !remoteConfig.getValue('show_contacts'),
      }
      links.forEach((link) =>
        link.children?.forEach((child: any, index: number) => {
          if (hiddenPages[child.id]) link.children.splice(index, 1);
        }),
      );
      return links;
    },
  }
}


@NgModule({
  declarations: [
    AppComponent,
    StepUpAuthenticationComponent,
    SessionTimeoutComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    BackbaseCoreModule.forRoot({
      assets: {
        assetsStaticItemName: environment.assetsStaticItemName || '',
      },
      classMap: {},
      logDeprecations: true,
      features: {
        EXTRA_ENCODE_URI_PARAMS: true,
        ACTION_RECIPES_UNIQUE_CONSTRAINT_ENDPOINTS: true,
        ENFORCE_INJECTOR_FOR_CREATE_STORE: true,
        SELECT_CONTEXT_INNER_CONTAINER: true,
      },
      lazyModules: bundlesDefinition,
    }),
    RouterModule.forRoot([], { initialNavigation: "disabled", useHash: true }),
    environment.animation ? BrowserAnimationsModule : NoopAnimationsModule,
    NotificationsRetailRoutingContainerAngModule,
    FormsModule,
    HttpClientXsrfModule.disable(),
    SessionTimeoutModule.forRoot({
      sessionTimeoutComponentClass: SessionTimeoutComponent,
      inactivityModalTime: 60,
    }),
    StepUpModule.forRoot(StepUpConfig),
    WebSdkApiModule,
    BackbaseStoreModule,
    ContainersModule,
    RemoteConfigModule.forRoot({
        appName: 'bb-retail-app-ang',
        appVersion: '2021.11-beta',
        defaults: remoteConfigDefaults,
        disabled: false,
        projectName: 'backbase-retail-prototypes',
        serviceRoot: '/api/remote-config'
      }),
    MegaMenuNavigationContainerModule,
    LayoutContainerModule,
    HeadingWidgetModule,
    ContentWidgetModule,
    UserContextMenuWidgetModule,
    NotificationsBadgeWidgetModule,
    NotificationsPopupsWidgetModule,
    TransactionSigningWidgetModule,
    TransactionSigningModule.withConfig({
      useRedirectFlow: false,
    }),
    ImpersonationBannerWidgetModule
  ],
  providers: [...environment.mockProviders || [], AnimationProvider, HttpXsrfProvider, CanDeactivateGuard, {
    provide: APP_INITIALIZER, useFactory: applicationInitializer, multi: true, deps: [RemoteConfigService]
  }, {
    provide: MEGA_MENU_CONTAINER_CONFIG, useFactory: configureMegaMenuPagesRendering, deps: [RemoteConfigService]
  }, {
    provide: CARDS_BASE_PATH, useFactory: getBasePath('cards-presentation-service'), deps: [PAGE_CONFIG]
  }, {
    provide: TRANSACTIONS_BASE_PATH, useFactory: getBasePath('transaction-manager'), deps: [PAGE_CONFIG]
  }, {
    provide: ARRANGEMENT_MANAGER_BASE_PATH, useFactory: getBasePath('arrangement-manager'), deps: [PAGE_CONFIG]
  }, {
    provide: SAVING_GOALS_BASE_PATH, useFactory: getBasePath('saving-goal-planner'), deps: [PAGE_CONFIG]
  }, {
    provide: CATEGORIES_MANAGEMENT_BASE_PATH, useFactory: getBasePath('transaction-category-collector'), deps: [PAGE_CONFIG]
  }, {
    provide: BUDGETING_BASE_PATH, useFactory: getBasePath('budget-planner'), deps: [PAGE_CONFIG]
  }, {
    provide: AUTHORIZED_USER_BASE_PATH, useFactory: getBasePath('authorized-user'), deps: [PAGE_CONFIG]
  }, {
    provide: BILLPAY_BASE_PATH, useFactory: getBasePath('billpay-integrator'), deps: [PAGE_CONFIG]
  }, {
    provide: CONTACT_MANAGER_BASE_PATH, useFactory: getBasePath('contact-manager'), deps: [PAGE_CONFIG]
  }, {
    provide: PAYMENT_ORDER_BASE_PATH, useFactory: getBasePath('payment-order-service'), deps: [PAGE_CONFIG]
  }, {
    provide: STOP_CHECKS_BASE_PATH, useFactory: getBasePath('stop-checks'), deps: [PAGE_CONFIG]
  }, {
    provide: ACCOUNT_STATEMENT_BASE_PATH, useFactory: getBasePath('account-statement'), deps: [PAGE_CONFIG]
  }, {
    provide: USER_BASE_PATH, useFactory: getBasePath('user-manager'), deps: [PAGE_CONFIG]
  }, {
    provide: DEVICE_BASE_PATH, useFactory: getBasePath('device-management-service'), deps: [PAGE_CONFIG]
  }, {
    provide: PAYMENT_ORDER_A2A_BASE_PATH, useFactory: getBasePath('payment-order-a2a'), deps: [PAGE_CONFIG]
  }, {
    provide: PLACES_BASE_PATH, useFactory: getBasePath('places-presentation-service'), deps: [PAGE_CONFIG]
  }, {
    provide: MESSAGES_BASE_PATH, useFactory: getBasePath('messages-service'), deps: [PAGE_CONFIG]
  }, {
    provide: ACTIONS_BASE_PATH, useFactory: getBasePath('action'), deps: [PAGE_CONFIG]
  }, {
    provide: NOTIFICATIONS_BASE_PATH, useFactory: getBasePath('notifications-service'), deps: [PAGE_CONFIG]
  }, {
    provide: ACCESS_CONTROL_BASE_PATH, useFactory: getBasePath('access-control'), deps: [PAGE_CONFIG]
  }, {
    provide: CONSENT_BASE_PATH, useFactory: getBasePath('consent'), deps: [PAGE_CONFIG]
  }, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
