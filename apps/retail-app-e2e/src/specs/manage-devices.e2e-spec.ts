import { HorizontalMenuBasePageObject } from '../page-objects/horizontal-menu-base-page-object';
import { ManageDevicesBasePageObject } from '../page-objects/manage-devices-base-page-object';
import testData from '../data/testing.data';

import { BrowserHelper } from '@backbase/lib-test-widget';

const browserHelper = new BrowserHelper();
const horizontalMenuBasePageObject = new HorizontalMenuBasePageObject();
const manageDevicesBasePageObject = new ManageDevicesBasePageObject();

describe('My profile End-to-End User Journey', (): void => {
  beforeAll(
    async (): Promise<void> => {
      await browserHelper.setLocalStorageItem('enableMocks', 'true');
      await horizontalMenuBasePageObject.navigateToPage('Self Service');
      await horizontalMenuBasePageObject.navigateToPageInDropdown('My Profile');
    },
  );

  it('manage Devices Journey tab and device list exists', async (): Promise<void> => {
    await manageDevicesBasePageObject.clickTab();

    expect(await manageDevicesBasePageObject.isWidgetPresent()).toBe(true);
  });

  it('manage Devices Journey edit device name', async (): Promise<void> => {
    await manageDevicesBasePageObject.clickDropdownMenu();

    await manageDevicesBasePageObject.clickEditName();

    await manageDevicesBasePageObject.typeNewName(testData.deviceName);
    await manageDevicesBasePageObject.clickSaveName();
  });

  it('manage Devices Journey suspend device ', async (): Promise<void> => {
    await manageDevicesBasePageObject.clickDropdownMenu();

    await manageDevicesBasePageObject.clickSuspendDevice();

    await manageDevicesBasePageObject.confirmSuspendDevice();
  });

  it('manage Devices Journey delete device ', async (): Promise<void> => {
    await manageDevicesBasePageObject.clickDropdownMenu();

    await manageDevicesBasePageObject.clickDeleteDevice();

    await manageDevicesBasePageObject.confirmDeleteDevice();
  });
});
