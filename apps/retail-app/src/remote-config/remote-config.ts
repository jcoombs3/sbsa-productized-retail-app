export interface RetailAppRemoteConfig {
  [name: string]: boolean;
}

// @ts-ignore
// tslint:disable-next-line:no-var-requires
export const remoteConfigDefaults = require('./remote-config-defaults.json') as RetailAppRemoteConfig;
