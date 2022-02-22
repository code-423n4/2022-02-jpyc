const {
  BN,
  constants,
  expectEvent,
  expectRevert,
} = require('@openzeppelin/test-helpers')
const { expect } = require('chai')
const { ZERO_ADDRESS } = constants

const { shouldBehaveLikeInitialize } = require('../v1/Initialize.behavior')

const { shouldBehaveLikeERC20 } = require('../v1/ERC20.behavior')

const {
  shouldBehaveLikeBlocklistable,
} = require('../v1/Blocklistable.behavior')

const { shouldBehaveLikeWhitelistable } = require('./Whitelistable.behavior')

const { shouldBehaveLikeOwnable } = require('../v1/Ownable.behabvior')

const { shouldBehaveLikePausable } = require('../v1/Pausable.behavior')

const { shouldBehaveLikeRescuable } = require('../v1/Rescuable.behavior')

const { shouldBehaveLikeEIP3009 } = require(`../v1/EIP3009.behavior`)

const { shouldBehaveLikeEIP2612 } = require(`../v1/EIP2612.behavior`)

const { shouldBehaveLikeFiatTokenV1 } = require('../v1/FiatTokenV1.behavior')

const {
  shouldBehaveLikeUUPSUpgradeable,
} = require('../v1/UUPSUpgradeable.behavior')

const { whitelistWithEIP2612 } = require('./WhitelistEIP2612.behavior')

const { whitelistWithEIP3009 } = require('./WhitelistEIP3009.behavior')

const { artifacts } = require('hardhat')

const FiatTokenV2 = artifacts.require('FiatTokenV2')
const FiatTokenV2Test = artifacts.require('FiatTokenV2Test')

contract('FiatTokenV2', function (accounts) {
  const initialHolder = accounts[0]
  const recipient = accounts[1]
  const anotherAccount = accounts[2]

  const name = 'JPY Coin'
  const symbol = 'JPYC'
  const currency = 'JPY'
  const decimals = 18
  const masterMinter = accounts[3]
  const pauser = accounts[4]
  const blocklister = accounts[5]
  const owner = initialHolder

  const minter = accounts[6]
  const blocklisted = accounts[7]
  const unblocklisted = accounts[8]
  const rescuer = accounts[9]
  const whitelister = accounts[9]
  const unWhitelisted = accounts[1]
  const whitelisted = accounts[0]

  const initialSupply = new BN(100)
  // variables for whitelist
  const mintSupplyCap = new BN('210000000000000000000000')
  const mintSupply = new BN('110000000000000000000000')
  const sendAmountAbove = new BN('110000000000000000000000')
  const sendAmountBelow = new BN('90000000000000000000000')

  beforeEach(async function () {
    this.token = await FiatTokenV2.new()
    await this.token.initialize(
      name,
      symbol,
      currency,
      decimals,
      masterMinter,
      pauser,
      blocklister,
      owner
    )
    await this.token.configureMinter(minter, mintSupplyCap, {
      from: masterMinter,
    })

    await this.token.updateWhitelister(whitelister, { from: owner })
    await this.token.mint(initialHolder, initialSupply, { from: minter })
    await this.token.blocklist(blocklisted, { from: blocklister })
    await this.token.whitelist(whitelisted, { from: whitelister })
  })

  it('already initialized', async function () {
    await expectRevert(
      this.token.initialize(
        name,
        symbol,
        currency,
        decimals,
        masterMinter,
        pauser,
        blocklister,
        owner
      ),
      'FiatToken: contract is already initialized'
    )
  })

  it('has a name', async function () {
    expect(await this.token.name()).to.equal(name)
  })

  it('has a symbol', async function () {
    expect(await this.token.symbol()).to.equal(symbol)
  })

  it('has a currency', async function () {
    expect(await this.token.symbol()).to.equal(symbol)
  })

  it('has 18 decimals', async function () {
    expect(await this.token.decimals()).to.be.bignumber.equal('18')
  })

  it('has a masterMinter', async function () {
    expect(await this.token.masterMinter()).to.equal(masterMinter)
  })

  it('has a pauser', async function () {
    expect(await this.token.pauser()).to.equal(pauser)
  })

  it('has a blockLister', async function () {
    expect(await this.token.blocklister()).to.equal(blocklister)
  })

  it('has an owner', async function () {
    expect(await this.token.owner()).to.equal(owner)
  })

  it('has a rescuer', async function () {
    expect(await this.token.rescuer()).to.equal(ZERO_ADDRESS)
  })

  // 直接呼び出せないのでFiatTokenV1を継承したmockを使用
  it('_approve test', async function () {
    const tokenTest = await FiatTokenV2Test.new()
    const value = new BN(100)
    await expectRevert(
      tokenTest.approveTest(ZERO_ADDRESS, recipient, value),
      'ERC20: approve from the zero address'
    )
  })

  describe('shouldBehaveLikeInitialize', () => {
    shouldBehaveLikeInitialize(
      'FiatToken',
      name,
      symbol,
      currency,
      decimals,
      masterMinter,
      pauser,
      blocklister,
      owner
    )
  })

  describe('shouldBehaveLikeERC20', () => {
    shouldBehaveLikeERC20(
      'ERC20',
      initialSupply,
      initialHolder,
      recipient,
      anotherAccount
    )
  })

  describe('shouldBehaveLikeBlocklistable', () => {
    shouldBehaveLikeBlocklistable(
      'Blocklistable',
      blocklister,
      blocklisted,
      unblocklisted,
      owner,
      initialSupply,
      initialHolder,
      anotherAccount,
      masterMinter
    )
  })

  describe('shouldBehaveLikeWhitelistable', () => {
    shouldBehaveLikeWhitelistable(
      'Whitelistable',
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
    )
  })

  describe('whitelistWithEIP2612', () => {
    whitelistWithEIP2612(
      'EIP2612',
      name,
      initialHolder,
      recipient,
      pauser,
      blocklister,
      sendAmountAbove,
      sendAmountBelow,
      whitelister
    )
  })

  describe('whitelistWithEIP3009', () => {
    whitelistWithEIP3009(
      'EIP3009',
      name,
      mintSupply,
      initialHolder,
      recipient,
      pauser,
      blocklister,
      sendAmountAbove,
      sendAmountBelow,
      minter,
      whitelister
    )
  })

  describe('shouldBehaveLikeOwnable', () => {
    shouldBehaveLikeOwnable('Ownable', owner, anotherAccount)
  })

  describe('shouldBehaveLikePausable', () => {
    shouldBehaveLikePausable(
      'Pausable',
      pauser,
      owner,
      anotherAccount,
      initialSupply,
      initialHolder,
      recipient,
      masterMinter
    )
  })

  describe('shouldBehaveLikeRescuable', () => {
    shouldBehaveLikeRescuable('Rescuable', rescuer, owner, anotherAccount)
  })

  describe('shouldBehaveLikeEIP2612', () => {
    shouldBehaveLikeEIP2612(
      'EIP2612',
      name,
      initialHolder,
      recipient,
      pauser,
      blocklister
    )
  })

  describe('shouldBehaveLikeEIP3009', () => {
    shouldBehaveLikeEIP3009(
      'EIP3009',
      name,
      initialSupply,
      initialHolder,
      recipient,
      pauser,
      blocklister
    )
  })

  describe('shouldBehaveLikeFiatTokenV1', () => {
    shouldBehaveLikeFiatTokenV1(
      'FiatToken',
      masterMinter,
      anotherAccount,
      recipient,
      initialSupply,
      owner
    )
  })

  describe('shouldBehaveLikeUUPSUpgradeable', () => {
    shouldBehaveLikeUUPSUpgradeable('UUPSUPgradable')
  })
})
