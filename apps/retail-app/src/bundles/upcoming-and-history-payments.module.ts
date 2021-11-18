import { NgModule } from '@angular/core';
import {
  ManageUpcomingAndHistoricalPaymentsJourneyModule,
  ManageUpcomingAndHistoricalPaymentsJourneyConfigurationToken,
  ManageUpcomingAndHistoricalPaymentsJourneyConfiguration,
  UpcomingPaymentsViewComponent,
  ManageUpcomingAndHistoricalPaymentsJourneyComponent,
  ManageUpcomingAndHistoricalPaymentsCommunicationService,
} from '@backbase/manage-upcoming-and-historical-payments-journey-ang';
import { PaymentsCommunicationService } from '../communication/paymentsCommunication';

const route = {
  path: '',
  component: ManageUpcomingAndHistoricalPaymentsJourneyComponent,
  children: [
    {
      path: '',
      component: UpcomingPaymentsViewComponent,
    },
  ],
};

@NgModule({
  imports: [ManageUpcomingAndHistoricalPaymentsJourneyModule.forRoot({ route })],
  providers: [
    {
      provide: ManageUpcomingAndHistoricalPaymentsJourneyConfigurationToken,
      useValue: <ManageUpcomingAndHistoricalPaymentsJourneyConfiguration>{
        journeyTitle: 'Scheduled Transfers',
        upcomingPaymentParams: {
          orderBy: 'requestedExecutionDate',
          direction: 'ASC',
          status: ['ACCEPTED'],
          from: 0,
          size: 200,
        },
      },
    },
    {
      provide: ManageUpcomingAndHistoricalPaymentsCommunicationService,
      useExisting: PaymentsCommunicationService,
    },
  ],
})
export class ManageUpcomingAndHistoricalPaymentsJourneyBundleModule {}
