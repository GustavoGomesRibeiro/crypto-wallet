/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// import { reloadApp } from 'detox-expo-helpers';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should be have a Label Id', async () => {
    await expect(element(by.id('LabelTeste'))).toBeVisible();
  });
});
