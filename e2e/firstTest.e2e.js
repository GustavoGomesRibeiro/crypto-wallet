/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should access and create a new user', async () => {
    await element(by.id('button-signin')).tap();
    await element(by.id('button-createAccount')).tap();

    await element(by.id('input-email')).tap();
    await element(by.id('input-email')).typeText('gustavo.teste01@teste.com');

    await element(by.id('input-name')).tap();
    await element(by.id('input-name')).typeText('Gustavo');

    await element(by.id('input-lastname')).tap();
    await element(by.id('input-lastname')).typeText('Gomes');

    await element(by.id('ScrollView')).scrollTo('bottom');
    await element(by.id('input-password')).tap();
    await element(by.id('input-password')).typeText('123456');

    await element(by.id('input-repeatPass')).tap();
    await element(by.id('input-repeatPass')).typeText('123456');

    await element(by.id('keyboard')).tap();
    await element(by.id('button-send')).tap();

    // await element(by.id('ScrollView')).scrollTo('bottom');
    await expect(element(by.id('MainView'))).toBeVisible();
  });

  // it('If user exist return error message', async () => {
  //   await element(by.id('button-signin')).tap();
  //   await element(by.id('button-createAccount')).tap();

  //   await element(by.id('input-email')).tap();
  //   await element(by.id('input-email')).typeText('gustavo.teste01@teste.com');

  //   await element(by.id('input-name')).tap();
  //   await element(by.id('input-name')).typeText('Gustavo');

  //   await element(by.id('input-lastname')).tap();
  //   await element(by.id('input-lastname')).typeText('Gomes');

  //   await element(by.id('ScrollView')).scrollTo('bottom');
  //   await element(by.id('input-password')).tap();
  //   await element(by.id('input-password')).typeText('123456');

  //   await element(by.id('ScrollView')).scrollTo('bottom');
  //   await element(by.id('input-repeatPass')).tap();
  //   await element(by.id('input-repeatPass')).typeText('123456');

  //   await element(by.id('ScrollView')).scrollTo('bottom');
  //   await element(by.id('button-send')).tap();

  //   await expect(element(by.id('error-message'))).toBeVisible();
  // });
});
