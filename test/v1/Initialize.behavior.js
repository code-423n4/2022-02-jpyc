const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

const FiatTokenV1= artifacts.require('FiatTokenV1');

function shouldBehaveLikeInitialize (errorPrefix, name, symbol, currency, decimals, masterMinter, pauser, blocklister, owner) {
  beforeEach(async function () {
    this.anotherToken = await FiatTokenV1.new();
  });

  it('newMasterMinter is the zero', async function () {
    await expectRevert(
      this.anotherToken.initialize(name, symbol, currency, decimals, ZERO_ADDRESS, pauser, blocklister, owner),
      `${errorPrefix}: new masterMinter is the zero address`,
    );
  });

  it('newMasterMinter is the zero', async function () {
    await expectRevert(
      this.anotherToken.initialize(name, symbol, currency, decimals, masterMinter, ZERO_ADDRESS, blocklister, owner),
      `${errorPrefix}: new pauser is the zero address`,
    );
  });

  it('newMasterMinter is the zero', async function () {
    await expectRevert(
      this.anotherToken.initialize(name, symbol, currency, decimals, masterMinter, pauser, ZERO_ADDRESS, owner),
      `${errorPrefix}: new blocklister is the zero address`,
    );
  });

  it('newMasterMinter is the zero', async function () {
    await expectRevert(
      this.anotherToken.initialize(name, symbol, currency, decimals, masterMinter, pauser, blocklister, ZERO_ADDRESS),
      `${errorPrefix}: new owner is the zero address`,
    );
  });
}

module.exports = {
  shouldBehaveLikeInitialize,
};