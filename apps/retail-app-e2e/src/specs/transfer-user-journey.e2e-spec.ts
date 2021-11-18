import { HorizontalMenuBasePageObject } from '../page-objects/horizontal-menu-base-page-object';
import { TransferBasePageObject } from '../page-objects/transfer-base-page-object';
import testData from '../data/testing.data';

import { BrowserHelper } from '@backbase/lib-test-widget';

const browserHelper = new BrowserHelper();
const horizontalMenuBasePageObject = new HorizontalMenuBasePageObject();
const transferBasePageObject = new TransferBasePageObject();

describe('Transfer End-to-End User Journey', (): void => {
  beforeAll(
    async (): Promise<void> => {
      await browserHelper.setLocalStorageItem('enableMocks', 'true');
    },
  );

  it('Transfer Journey make a transfer', async (): Promise<void> => {
    await horizontalMenuBasePageObject.navigateToPage('Transfers');

    await horizontalMenuBasePageObject.navigateToPageInDropdown('Make a Transfer');
    await transferBasePageObject.waitUntilAccountIsLoaded();
    await transferBasePageObject.clickOnToAccountButton();
    await transferBasePageObject.waitUntilAccountSelectorIsLoaded();
    await transferBasePageObject.clickOnTransferAccount();

    await transferBasePageObject.updateAmount(testData.amount);
    await transferBasePageObject.clickContinue();

    await transferBasePageObject.clickSubmit();
  });

  it('Transfer Journey scheduled transfers', async (): Promise<void> => {
    await horizontalMenuBasePageObject.navigateToPage('Transfers');

    await horizontalMenuBasePageObject.navigateToPageInDropdown('Scheduled Transfers');
    await transferBasePageObject.clickTransfer();
    await transferBasePageObject.clickCancelPayment();
    await transferBasePageObject.clickCancelPaymentConfirm();
  });
});
