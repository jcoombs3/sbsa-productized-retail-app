import { BasePage } from '@backbase/lib-test-widget';
import locators from '../locators/manage-devices-base.locators';

export class ManageDevicesBasePageObject extends BasePage {
  constructor() {
    super('');
  }
  public clickTab() {
    return this.clickInListByText(locators.tab, 'Registered Devices');
  }

  public isWidgetPresent() {
    return this.isPresent(locators.deviceInformationWidget);
  }

  public clickDropdownMenu() {
    this.findAllElements(locators.dropdownButton).get(0).click();
  }

  public clickEditName() {
    return this.click(locators.editDeviceName);
  }

  public typeNewName(name: string) {
    return this.type(locators.deviceNameInput, name);
  }

  public clickSaveName() {
    return this.click(locators.saveChangeButton);
  }

  public clickSuspendDevice() {
    return this.click(locators.suspendDeviceButton);
  }

  public confirmSuspendDevice() {
    return this.click(locators.confirmSuspendButton);
  }

  public clickDeleteDevice() {
    return this.click(locators.deleteDeviceButton);
  }

  public confirmDeleteDevice() {
    return this.click(locators.confirmDeleteButton);
  }
}
