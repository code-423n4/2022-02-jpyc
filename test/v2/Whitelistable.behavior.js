const {
  BN,
  constants,
  expectEvent,
  expectRevert,
} = require('@openzeppelin/test-helpers')
const { expect } = require('chai')
const { ZERO_ADDRESS } = constants

function shouldBehaveLikeWhitelistable(
  errorPrefix,
  whitelister,
  whitelisted,
  unWhitelisted,
  owner,
  mintSupply,
  sendAmountBelow,
  sendAmountAbove,
  initialHolder,
  anotherAccount,
  masterMinter,
  minter
) {
  describe('isWhitelisted', function () {
    describe('when _account is whitelisted', function () {
      it('returns true', async function () {
        expect(await this.token.isWhitelisted(whitelisted)).to.be.equal(true)
      })
    })

    describe('when _account is not whitelisted', function () {
      it('returns false', async function () {
        expect(await this.token.isWhitelisted(unWhitelisted)).to.be.equal(false)
      })
    })
  })

  describe('whitelist', function () {
    describe('when the requested account is whitelister', function () {
      describe('when whitelist whitelisted account', function () {
        it('returns true', async function () {
          await this.token.whitelist(whitelisted, { from: whitelister })
          expect(await this.token.isWhitelisted(whitelisted)).to.be.equal(true)
        })
      })

      describe('when whitelist unwhitelisted account', function () {
        it('returns true', async function () {
          await this.token.whitelist(unWhitelisted, { from: whitelister })
          expect(await this.token.isWhitelisted(unWhitelisted)).to.be.equal(
            true
          )
        })
      })

      it('emits a whitelist event', async function () {
        const { logs } = await this.token.whitelist(whitelisted, {
          from: whitelister,
        })
        expectEvent.inLogs(logs, 'Whitelisted', {
          _account: whitelisted,
        })
      })
    })

    describe('when the requested account is not whitelister (owner)', function () {
      it('reverts', async function () {
        await expectRevert(
          this.token.whitelist(unWhitelisted, { from: owner }),
          `${errorPrefix}: caller is not the whitelister`
        )
      })
    })
  })

  describe('unwhitelist', function () {
    describe('when the requested account is whitelister', function () {
      describe('when unwhitelist whitelisted account', function () {
        it('returns false', async function () {
          await this.token.unWhitelist(whitelisted, { from: whitelister })
          expect(await this.token.isWhitelisted(whitelisted)).to.be.equal(false)
        })
      })

      describe('when unwhitelist unwhitelisted account', function () {
        it('returns false', async function () {
          await this.token.unWhitelist(unWhitelisted, { from: whitelister })
          expect(await this.token.isWhitelisted(unWhitelisted)).to.be.equal(
            false
          )
        })
      })

      it('emits a unWhitelist event', async function () {
        const { logs } = await this.token.unWhitelist(whitelisted, {
          from: whitelister,
        })
        expectEvent.inLogs(logs, 'UnWhitelisted', {
          _account: whitelisted,
        })
      })
    })

    describe('when the requested account is not whitelister (owner)', function () {
      it('reverts', async function () {
        await expectRevert(
          this.token.unWhitelist(whitelisted, { from: owner }),
          `${errorPrefix}: caller is not the whitelister`
        )
      })
    })
  })

  describe('updateWhitelister', async function () {
    describe('whitelister', async function () {
      it('returns whitelister', async function () {
        expect(await this.token.whitelister()).to.equal(whitelister)
      })
    })

    describe('when the newWhitelister is not the zero address', function () {
      describe('when the requested account is owner', function () {
        it('returns whitelister', async function () {
          await this.token.updateWhitelister(unWhitelisted, { from: owner })
          expect(await this.token.whitelister()).to.equal(unWhitelisted)
        })

        it('emits a updateWhitelister event', async function () {
          const { logs } = await this.token.updateWhitelister(unWhitelisted, {
            from: owner,
          })
          expectEvent.inLogs(logs, 'WhitelisterChanged', {
            newWhitelister: unWhitelisted,
          })
        })
      })

      describe('when the requested account is not owner (whitelister)', function () {
        it('reverts', async function () {
          await expectRevert(
            this.token.updateWhitelister(unWhitelisted, { from: whitelister }),
            `Ownable: caller is not the owner`
          )
        })
      })
    })

    describe('when the newWhitelister is the zero address', function () {
      it('reverts', async function () {
        await expectRevert(
          this.token.updateWhitelister(ZERO_ADDRESS, { from: owner }),
          `${errorPrefix}: new whitelister is the zero address`
        )
      })
    })
  })

  describe('whitelistable token', function () {
    describe('approve', function () {
      it('allows to approve over 100000 tokens when Whitelisted', async function () {
        await this.token.approve(unWhitelisted, sendAmountAbove, {
          from: initialHolder,
        })

        expect(
          await this.token.allowance(initialHolder, unWhitelisted)
        ).to.be.bignumber.equal(sendAmountAbove)
      })

      it('reverts when allows to approve over 100000 tokens when unWhitelisted', async function () {
        await expectRevert(
          this.token.approve(initialHolder, sendAmountAbove, {
            from: unWhitelisted,
          }),
          `${errorPrefix}: account is not whitelisted`
        )
      })

      it('allows to approve under 100000 tokens when unWhitelisted', async function () {
        await this.token.approve(initialHolder, sendAmountBelow, {
          from: unWhitelisted,
        })

        expect(
          await this.token.allowance(unWhitelisted, initialHolder)
        ).to.be.bignumber.equal(sendAmountBelow)
      })

      it('allows to approve under 100000 tokens when whitelisted and then unWhitelisted', async function () {
        await this.token.whitelist(unWhitelisted, { from: whitelister })
        await this.token.unWhitelist(unWhitelisted, { from: whitelister })
        await this.token.whitelist(initialHolder, { from: whitelister })
        await this.token.unWhitelist(initialHolder, { from: whitelister })

        await this.token.approve(unWhitelisted, sendAmountBelow, {
          from: initialHolder,
        })

        expect(
          await this.token.allowance(initialHolder, unWhitelisted)
        ).to.be.bignumber.equal(sendAmountBelow)
      })
    })
  })

  describe('transfer', function () {
    it('allows to transfer over 100000 when whitelisted', async function () {
      await this.token.whitelist(minter, { from: whitelister })
      await this.token.mint(initialHolder, mintSupply, { from: minter })
      await this.token.transfer(unWhitelisted, sendAmountAbove, {
        from: initialHolder, //owner
      })

      expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(
        '100'
      )
      expect(await this.token.balanceOf(unWhitelisted)).to.be.bignumber.equal(
        sendAmountAbove
      )
    })

    it('allows to transfer under 100000 tokens when whitelisted and then unWhitelisted', async function () {
      await this.token.whitelist(minter, { from: whitelister })
      await this.token.mint(initialHolder, sendAmountBelow, { from: minter })
      await this.token.whitelist(unWhitelisted, { from: whitelister })
      await this.token.unWhitelist(unWhitelisted, { from: whitelister })
      await this.token.whitelist(initialHolder, { from: whitelister })
      await this.token.unWhitelist(initialHolder, { from: whitelister })

      await this.token.transfer(unWhitelisted, sendAmountBelow, {
        from: initialHolder,
      })

      expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(
        '100'
      )
      expect(await this.token.balanceOf(unWhitelisted)).to.be.bignumber.equal(
        sendAmountBelow
      )
    })

    it('reverts when trying to transfer when sender is not whitelisted and the value is more than 100000', async function () {
      await this.token.unWhitelist(initialHolder, { from: whitelister })
      await expectRevert(
        this.token.transfer(whitelisted, sendAmountAbove, {
          from: initialHolder,
        }),
        `${errorPrefix}: account is not whitelisted`
      )
    })
  })

  describe('transfer from', function () {
    beforeEach(async function () {
      await this.token.approve(anotherAccount, mintSupply, {
        from: initialHolder,
      })
      await this.token.whitelist(minter, { from: whitelister })
      await this.token.mint(initialHolder, mintSupply, { from: minter })
    })

    it('allows to transferfrom over 100000 tokens when sender is Whitelisted', async function () {
      await this.token.transferFrom(
        initialHolder,
        unWhitelisted,
        sendAmountAbove,
        {
          from: anotherAccount,
        }
      )

      expect(await this.token.balanceOf(unWhitelisted)).to.be.bignumber.equal(
        sendAmountAbove
      )

      expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(
        new BN(100)
      )
    })

    it('allows to transferfrom under 100000 tokens when sender is not Whitelisted', async function () {
      await this.token.unWhitelist(initialHolder, { from: whitelister })
      await this.token.transferFrom(
        initialHolder,
        unWhitelisted,
        sendAmountBelow,
        {
          from: anotherAccount,
        }
      )

      expect(await this.token.balanceOf(unWhitelisted)).to.be.bignumber.equal(
        sendAmountBelow
      )

      expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(
        new BN('20000000000000000000100')
      )
    })

    it('allows to transferfrom under 100000 tokens when sender is whitelisted and then unWhitelisted', async function () {
      await this.token.whitelist(anotherAccount, { from: whitelister })
      await this.token.unWhitelist(anotherAccount, { from: whitelister })
      await this.token.whitelist(initialHolder, { from: whitelister })
      await this.token.unWhitelist(initialHolder, { from: whitelister })
      await this.token.whitelist(unWhitelisted, { from: whitelister })
      await this.token.unWhitelist(unWhitelisted, { from: whitelister })

      await this.token.transferFrom(
        initialHolder,
        unWhitelisted,
        sendAmountBelow,
        {
          from: anotherAccount,
        }
      )

      expect(await this.token.balanceOf(unWhitelisted)).to.be.bignumber.equal(
        sendAmountBelow
      )

      expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(
        new BN('20000000000000000000100')
      )
    })

    it('reverts when transferfrom over 100000 tokens when sender is not Whitelisted', async function () {
      await this.token.unWhitelist(initialHolder, { from: whitelister })
      await expectRevert(
        this.token.transferFrom(initialHolder, unWhitelisted, sendAmountAbove, {
          from: anotherAccount,
        }),
        `${errorPrefix}: account is not whitelisted`
      )
    })

    it('allows to transferfrom under 100000 tokens when sender is not Whitelisted', async function () {
      await this.token.unWhitelist(initialHolder, { from: whitelister })
      await this.token.transferFrom(
        initialHolder,
        unWhitelisted,
        sendAmountBelow,
        {
          from: anotherAccount,
        }
      )

      expect(await this.token.balanceOf(unWhitelisted)).to.be.bignumber.equal(
        sendAmountBelow
      )

      expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(
        new BN('20000000000000000000100')
      )
    })
  })

  describe(`increaseAllowance`, function () {
    const allowance = new BN('90000000000000000000000')
    const allowanceDiff = new BN('10000000000000000000000')
    const allowanceAbove = new BN('20000000000000000000000')

    beforeEach(async function () {
      await this.token.approve(anotherAccount, allowance, {
        from: initialHolder,
      })
    })

    it('allows to increaseAllowance under 100000 tokens when msg.sender is unWhitelisted', async function () {
      await this.token.unWhitelist(initialHolder, { from: whitelister })
      await this.token.increaseAllowance(anotherAccount, allowanceDiff, {
        from: initialHolder,
      })

      expect(
        await this.token.allowance(initialHolder, anotherAccount)
      ).to.be.bignumber.equal(allowance.add(allowanceDiff))
    })

    it('allows to increaseAllowance under 100000 tokens when msg.sender and spender is whitelisted and then unWhitelisted', async function () {
      await this.token.whitelist(anotherAccount, { from: whitelister })
      await this.token.unWhitelist(anotherAccount, { from: whitelister })
      await this.token.whitelist(initialHolder, { from: whitelister })
      await this.token.unWhitelist(initialHolder, { from: whitelister })

      await this.token.increaseAllowance(anotherAccount, allowanceDiff, {
        from: initialHolder,
      })

      expect(
        await this.token.allowance(initialHolder, anotherAccount)
      ).to.be.bignumber.equal(allowance.add(allowanceDiff))
    })

    it('reverts when trying to increaseAllowance over 100000 tokens when msg.sender is not whitelisted', async function () {
      await this.token.unWhitelist(initialHolder, { from: whitelister })
      await expectRevert(
        this.token.increaseAllowance(anotherAccount, allowanceAbove, {
          from: initialHolder,
        }),
        `${errorPrefix}: account is not whitelisted`
      )
    })
  })

  describe(`decreaseAllowance`, function () {
    const allowance = new BN('90000000000000000000000')
    const allowanceDiff = new BN('10000000000000000000000')
    const allowanceAbove = new BN('20000000000000000000000')

    beforeEach(async function () {
      await this.token.approve(anotherAccount, allowance, {
        from: initialHolder,
      })
    })

    it('allows to decreaseAllowance when unWhitelisted', async function () {
      await this.token.unWhitelist(initialHolder, { from: whitelister })
      await this.token.decreaseAllowance(anotherAccount, allowanceDiff, {
        from: initialHolder,
      })

      expect(
        await this.token.allowance(initialHolder, anotherAccount)
      ).to.be.bignumber.equal(allowance.sub(allowanceDiff))
    })

    it('allows to decreaseAllowance when whitelisted and then unWhitelisted', async function () {
      await this.token.whitelist(anotherAccount, { from: whitelister })
      await this.token.unWhitelist(anotherAccount, { from: whitelister })
      await this.token.whitelist(initialHolder, { from: whitelister })
      await this.token.unWhitelist(initialHolder, { from: whitelister })

      await this.token.decreaseAllowance(anotherAccount, allowanceDiff, {
        from: initialHolder,
      })

      expect(
        await this.token.allowance(initialHolder, anotherAccount)
      ).to.be.bignumber.equal(allowance.sub(allowanceDiff))
    })
  })

  describe('mint', function () {
    beforeEach(async function () {
      await this.token.whitelist(minter, { from: whitelister })
    })

    it('allows to mint over 100000 tokens when minter is whitelisted', async function () {
      await this.token.mint(unWhitelisted, mintSupply, { from: minter })

      expect(await this.token.balanceOf(unWhitelisted)).to.be.bignumber.equal(
        mintSupply
      )
    })

    it('allows to mint under 100000 tokens when minter is not whitelisted', async function () {
      await this.token.unWhitelist(minter, { from: whitelister })
      await this.token.mint(unWhitelisted, sendAmountBelow, { from: minter })

      expect(await this.token.balanceOf(unWhitelisted)).to.be.bignumber.equal(
        sendAmountBelow
      )
    })

    it('reverts when minter is not whitelisted and mint more than 100000 token', async function () {
      await this.token.unWhitelist(minter, { from: whitelister })

      await expectRevert(
        this.token.mint(unWhitelisted, mintSupply, { from: minter }),
        `${errorPrefix}: account is not whitelisted`
      )
    })
  })
}

module.exports = {
  shouldBehaveLikeWhitelistable,
}
