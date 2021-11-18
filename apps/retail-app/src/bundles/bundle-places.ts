import { NgModule, Provider } from '@angular/core';
import {
  PlacesJourneyModule,
  PlacesJourneyConfiguration,
  PlacesJourneyConfigurationToken,
} from '@backbase/places-journey-ang';

const PlacesConfigProvider: Array<Provider> = [
  {
    provide: PlacesJourneyConfigurationToken,
    useValue: <Partial<PlacesJourneyConfiguration>>{
      latitude: 40.72345,
      longitude: -73.9924,
      mapZoom: 12,
      placeTypes: {
        branch: {
          iconName: 'account',
          markerUrl: 'branch-marker.svg',
        },
        atm: {
          iconName: 'credit-card',
          markerUrl: 'atm-marker.svg',
        },
      },
    },
  },
];

@NgModule({
  imports: [PlacesJourneyModule.forRoot()],
  providers: [PlacesConfigProvider],
})
export class PlacesJourneyBundleModule {}
