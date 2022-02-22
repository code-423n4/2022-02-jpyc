const {
  BN,
  constants,
  expectEvent,
  expectRevert,
} = require('@openzeppelin/test-helpers')
const { inTransaction } = require('@openzeppelin/test-helpers/src/expectEvent')
const { expect } = require('chai')
const { bnToHex } = require('ethereumjs-util')
const { ZERO_ADDRESS } = constants

function shouldBehaveLikeFiatTokenV1(
  errorPrefix,
  masterMinter,
  anotherAccount,
  recipient,
  initialSupply,
  owner
) {
  it('has a masterMinter', async function () {
    expect(await this.token.masterMinter()).to.equal(masterMinter)
  })

  describe('mint', function () {
    const value = new BN(100)
    const minter = anotherAccount

    beforeEach(async function () {
      await this.token.configureMinter(minter, value, { from: masterMinter })
    })

    describe('when the requested account is minter', function () {
      it('mint (full amount)', async function () {
        await this.token.mint(recipient, value, { from: minter })

        expect(await this.token.totalSupply()).to.be.bignumber.equal(
          initialSupply.add(value)
        )
        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(
          value
        )
        expect(await this.token.minterAllowance(minter)).to.be.bignumber.equal(
          new BN(0)
        )
      })

      it('mint (partical amount)', async function () {
        const amount = value.subn(1)
        await this.token.mint(recipient, amount, { from: minter })

        expect(await this.token.totalSupply()).to.be.bignumber.equal(
          initialSupply.add(amount)
        )
        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(
          amount
        )
        expect(await this.token.minterAllowance(minter)).to.be.bignumber.equal(
          value.sub(amount)
        )
      })

      it('emits a Mint event', async function () {
        const result = await this.token.mint(recipient, value, { from: minter })

        expectEvent(result, 'Mint', {
          minter: minter,
          to: recipient,
          amount: value,
        })
      })

      it('emits a Transfer event', async function () {
        const result = await this.token.mint(recipient, value, { from: minter })

        expectEvent(result, 'Transfer', {
          from: ZERO_ADDRESS,
          to: recipient,
          value: value,
        })
      })

      it('when to is the zero', async function () {
        await expectRevert(
          this.token.mint(ZERO_ADDRESS, value, { from: minter }),
          'FiatToken: mint to the zero address'
        )
      })

      it('when amount is not greater than 0', async function () {
        const amount = new BN(0)
        await expectRevert(
          this.token.mint(recipient, amount, { from: minter }),
          'FiatToken: mint amount not greater than 0'
        )
      })

      it('when amount exceeds minterAllowance', async function () {
        const amount = value.addn(1)
        await expectRevert(
          this.token.mint(recipient, amount, { from: minter }),
          'FiatToken: mint amount exceeds minterAllowance'
        )
      })
    })

    describe('when the requested account is not minter', function () {
      it('reverts', async function () {
        await expectRevert(
          this.token.mint(recipient, value, { from: owner }),
          'FiatToken: caller is not a minter'
        )
      })
    })
  })

  describe('minterAllowance', function () {
    const value = new BN(100)

    it('return minterAllowed', async function () {
      await this.token.configureMinter(anotherAccount, value, {
        from: masterMinter,
      })

      expect(
        await this.token.minterAllowance(anotherAccount)
      ).to.be.bignumber.equal(value)
    })
  })

  describe('isMinter', function () {
    const value = new BN(100)

    it('return true', async function () {
      await this.token.configureMinter(anotherAccount, value, {
        from: masterMinter,
      })

      expect(await this.token.isMinter(anotherAccount)).to.be.equal(true)
    })
    it('return false', async function () {
      expect(await this.token.isMinter(anotherAccount)).to.be.equal(false)
    })
  })

  describe('configureMinter', function () {
    const value = new BN(100)

    it('when the requested account is masterMinter', async function () {
      await this.token.configureMinter(anotherAccount, value, {
        from: masterMinter,
      })

      expect(await this.token.isMinter(anotherAccount)).to.be.equal(true)
      expect(
        await this.token.minterAllowance(anotherAccount)
      ).to.be.bignumber.equal(value)
    })

    it('emits a MasterConfigured event', async function () {
      const result = await this.token.configureMinter(anotherAccount, value, {
        from: masterMinter,
      })

      expectEvent(result, 'MinterConfigured', {
        minter: anotherAccount,
        minterAllowedAmount: value,
      })
    })

    it('when the requested account is not masterMinter', async function () {
      await expectRevert(
        this.token.configureMinter(anotherAccount, value, { from: owner }),
        'FiatToken: caller is not the masterMinter'
      )
    })
  })

  describe('removeMinter', function () {
    const value = new BN(100)
    const minter = anotherAccount

    beforeEach(async function () {
      await this.token.configureMinter(minter, value, { from: masterMinter })
    })

    describe('when the requested account is masterMinter', function () {
      it('remove minter', async function () {
        expect(await this.token.isMinter(minter)).to.equal(true)
        expect(await this.token.minterAllowance(minter)).to.be.bignumber.equal(
          value
        )

        await this.token.removeMinter(minter, { from: masterMinter })
        expect(await this.token.isMinter(minter)).to.equal(false)
        expect(await this.token.minterAllowance(minter)).to.be.bignumber.equal(
          new BN(0)
        )
      })

      it('emits a MinterRemoved event', async function () {
        const result = await this.token.removeMinter(minter, {
          from: masterMinter,
        })
        expectEvent(result, 'MinterRemoved', {
          oldMinter: minter,
        })
      })

      it('removed and then configured', async function () {
        await this.token.removeMinter(minter, { from: masterMinter })

        await this.token.configureMinter(minter, value, { from: masterMinter })
        expect(await this.token.isMinter(minter)).to.equal(true)
        expect(await this.token.minterAllowance(minter)).to.be.bignumber.equal(
          value
        )
      })
    })

    describe('when the requested account is not masterMinter', function () {
      it('reverts', async function () {
        await expectRevert(
          this.token.removeMinter(minter, {from: owner}),
          'FiatToken: caller is not the masterMinter',
        );
      });
    });
  });

  describe('burn', function () {
    const value = new BN(100)
    const minter = anotherAccount

    beforeEach(async function () {
      await this.token.configureMinter(minter, value, { from: masterMinter })
      await this.token.mint(minter, value, { from: minter })
    })

    describe('when the requested account is minter', function () {
      it('burn (full amount)', async function () {
        expect(await this.token.totalSupply()).to.be.bignumber.equal(
          initialSupply.add(value)
        )
        expect(await this.token.balanceOf(minter)).to.be.bignumber.equal(value)

        await this.token.burn(value, { from: minter })

        expect(await this.token.totalSupply()).to.be.bignumber.equal(
          initialSupply
        )
        expect(await this.token.balanceOf(minter)).to.be.bignumber.equal(
          new BN(0)
        )
      })

      it('burn (partical amount)', async function () {
        expect(await this.token.totalSupply()).to.be.bignumber.equal(
          initialSupply.add(value)
        )
        expect(await this.token.balanceOf(minter)).to.be.bignumber.equal(value)

        const amount = value.subn(1)
        await this.token.burn(amount, { from: minter })

        expect(await this.token.totalSupply()).to.be.bignumber.equal(
          initialSupply.addn(1)
        )
        expect(await this.token.balanceOf(minter)).to.be.bignumber.equal(
          value.sub(amount)
        )
      })

      it('emits a Burn event', async function () {
        const result = await this.token.burn(value, { from: minter })

        expectEvent(result, 'Burn', {
          burner: minter,
          amount: value,
        })
      })

      it('emits a Transfer event', async function () {
        const result = await this.token.burn(value, { from: minter })

        expectEvent(result, 'Transfer', {
          from: minter,
          to: ZERO_ADDRESS,
          value: value,
        })
      })

      it('when amount is not greater than 0', async function () {
        const amount = new BN(0)
        await expectRevert(
          this.token.burn(amount, { from: minter }),
          'FiatToken: burn amount not greater than 0'
        )
      })

      it('when amount exceeds balance', async function () {
        const amount = value.addn(1)
        await expectRevert(
          this.token.burn(amount, { from: minter }),
          'FiatToken: burn amount exceeds balance'
        )
      })
    })

    describe('when the requested account is not minter', function () {
      it('reverts', async function () {
        await expectRevert(
          this.token.burn(value, {from: owner}),
          'FiatToken: caller is not a minter',
        );
      });
    });
  });

  describe('updateMasterMinter', async function() {
    describe('masterMinter', async function () {
      it('returns masterMinter', async function () {
        expect(await this.token.masterMinter()).to.equal(masterMinter)
      })
    })

    describe('when the newMasterMinter is not the zero address', function () {
      describe('when the requested account is owner', function () {
        it('returns masterMinter', async function () {
          await this.token.updateMasterMinter(anotherAccount, { from: owner })
          expect(await this.token.masterMinter()).to.equal(anotherAccount)
        })

        it('emits a updateMasterMinterevent', async function () {
          const { logs } = await this.token.updateMasterMinter(anotherAccount, {
            from: owner,
          })
          expectEvent.inLogs(logs, 'MasterMinterChanged', {
            newMasterMinter: anotherAccount,
          })
        })
      })

      describe('when the requested account is not owner (masterMinter)', function () {
        it('reverts', async function () {
          await expectRevert(
            this.token.updateMasterMinter(anotherAccount, {
              from: masterMinter,
            }),
            `Ownable: caller is not the owner`
          )
        })
      })
    })

    describe('when the newMasterMinter is the zero address', function () {
      it('reverts', async function () {
        await expectRevert(
          this.token.updateMasterMinter(ZERO_ADDRESS, { from: owner }),
          `${errorPrefix}: new masterMinter is the zero address`
        )
      })
    })
  })
}

module.exports = {
  shouldBehaveLikeFiatTokenV1,
}
