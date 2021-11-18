import { BasePage } from '@backbase/lib-test-widget';
import locators from '../locators/horizontal-menu-base.locators';

export class HorizontalMenuBasePageObject extends BasePage {
  constructor() {
    super('');
  }

  public navigateToPage(page: string) {
    switch (page) {
      case 'My Accounts':
        return this.clickInListByText(locators.baseLocator, 'My Accounts');
      case 'Analytics':
        return this.clickInListByText(locators.baseLocator, 'Analytics');
      case 'Transfers':
        return this.clickInListByText(locators.baseLocator, 'Transfers');
      case 'Bill Pay':
        return this.clickInListByText(locators.baseLocator, 'Bill Pay');
      case 'Self Service':
        return this.clickInListByText(locators.baseLocator, 'Self Service');
      case 'More':
        return this.clickInListByText(locators.baseLocator, 'More');
      default:
        fail('Menu Option not found.');
        return;
    }
  }

  public clickOnNavigationDropdown() {
    return this.click(locators.navigationDropdown);
  }

  public navigateToPageInDropdown(page: string) {
    switch (page) {
      case 'Cash Flow':
        return this.clickInListByText(locators.dropdownItem, 'Cash Flow');
      case 'Make a Transfer':
        return this.clickInListByText(locators.dropdownItem, 'Make a Transfer');
      case 'Scheduled Transfers':
        return this.clickInListByText(locators.dropdownItem, 'Scheduled Transfers');
      case 'Pay Bills':
        return this.clickInListByText(locators.dropdownItem, 'Pay Bills');
      case 'Pending Payments':
        return this.clickInListByText(locators.dropdownItem, 'Pending Payments');
      case 'History Payments':
        return this.clickInListByText(locators.dropdownItem, 'History Payments');
      case 'Spending Analysis':
        return this.clickInListByText(locators.dropdownItem, 'Spending Analysis');
      case 'Income Analysis':
        return this.clickInListByText(locators.dropdownItem, 'Income Analysis');
      case 'Budgets':
        return this.clickInListByText(locators.dropdownItem, 'Budgets');
      case 'Messages':
        return this.clickInListByText(locators.dropdownItem, 'Messages');
      case 'Find Branches and ATMs':
        return this.clickInListByText(locators.dropdownItem, 'Find Branches and ATMs');
      case 'My Profile':
        return this.clickInListByText(locators.dropdownItem, 'My Profile');
      case 'Manage Cards':
        return this.clickInListByText(locators.dropdownItem, 'Manage Cards');
      case 'Authorized Users':
        return this.clickInListByText(locators.dropdownItem, 'Authorized Users');
      case 'Stop Checks':
        return this.clickInListByText(locators.dropdownItem, 'Stop Checks');
      default:
        fail('Menu Option not found.');
        return;
    }
  }
}
