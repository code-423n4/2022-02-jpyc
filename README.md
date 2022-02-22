# ✨ So you want to sponsor a contest

This `README.md` contains a set of checklists for our contest collaboration.

Your contest will use two repos: 
- **a _contest_ repo** (this one), which is used for scoping your contest and for providing information to contestants (wardens)
- **a _findings_ repo**, where issues are submitted. 

Ultimately, when we launch the contest, this contest repo will be made public and will contain the smart contracts to be reviewed and all the information needed for contest participants. The findings repo will be made public after the contest is over and your team has mitigated the identified issues.

Some of the checklists in this doc are for **C4 (🐺)** and some of them are for **you as the contest sponsor (⭐️)**.

---

# Contest setup

## ⭐️ Sponsor: Provide contest details

Under "SPONSORS ADD INFO HERE" heading below, include the following:

- [x] Name of each contract and:
  - [x] source lines of code (excluding blank lines and comments) in each
  - [x] external contracts called in each
  - [x] libraries used in each
- [x] Describe any novel or unique curve logic or mathematical models implemented in the contracts
- [x] Does the token conform to the ERC-20 standard? In what specific ways does it differ?
- [x] Describe anything else that adds any special logic that makes your approach unique
- [x] Identify any areas of specific concern in reviewing the code
- [x] Add all of the code to this repo that you want reviewed
- [ ] Create a PR to this repo with the above changes.

---

# ⭐️ Sponsor: Provide marketing details

- [x] Your logo (URL or add file to this repo - SVG or other vector format preferred)
- [x] Your primary Twitter handle
- [x] Any other Twitter handles we can/should tag in (e.g. organizers' personal accounts, etc.)
- [x] Your Discord URI
- [x] Your website
- [ ] Optional: Do you have any quirks, recurring themes, iconic tweets, community "secret handshake" stuff we could work in? How do your people recognize each other, for example? 
- [ ] Optional: your logo in Discord emoji format

---

# Contest prep

## 🐺 C4: Contest prep
- [x] Rename this repo to reflect contest date (if applicable)
- [x] Rename contest H1 below
- [x] Add link to report form in contest details below
- [x] Update pot sizes
- [x] Fill in start and end times in contest bullets below.
- [ ] Move any relevant information in "contest scope information" above to the bottom of this readme.
- [ ] Add matching info to the [code423n4.com public contest data here](https://github.com/code-423n4/code423n4.com/blob/main/_data/contests/contests.csv))
- [ ] Delete this checklist.

## ⭐️ Sponsor: Contest prep
- [x] Make sure your code is thoroughly commented using the [NatSpec format](https://docs.soliditylang.org/en/v0.5.10/natspec-format.html#natspec-format).
- [x] Modify the bottom of this `README.md` file to describe how your code is supposed to work with links to any relevent documentation and any other criteria/details that the C4 Wardens should keep in mind when reviewing. ([Here's a well-constructed example.](https://github.com/code-423n4/2021-06-gro/blob/main/README.md))
- [x] Please have final versions of contracts and documentation added/updated in this repo **no less than 8 hours prior to contest start time.**
- [x] Ensure that you have access to the _findings_ repo where issues will be submitted.
- [ ] Promote the contest on Twitter (optional: tag in relevant protocols, etc.)
- [ ] Share it with your own communities (blog, Discord, Telegram, email newsletters, etc.)
- [ ] Optional: pre-record a high-level overview of your protocol (not just specific smart contract functions). This saves wardens a lot of time wading through documentation.
- [x] Designate someone (or a team of people) to monitor DMs & questions in the C4 Discord (**#questions** channel) daily (Note: please *don't* discuss issues submitted by wardens in an open channel, as this could give hints to other wardens.)
- [ ] Delete this checklist and all text above the line below when you're ready.

---

# JPYC contest details
- $28,500 USDC main award pot
- $1,500 USDC gas optimization award pot
- Join [C4 Discord](https://discord.gg/code4rena) to register
- Submit findings [using the C4 form](https://code4rena.com/contests/2022-02-jpyc-contest/submit)
- [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
- Starts February 24 2022 00:00 UTC
- Ends February 26 2022 23:59 UTC

This repo will be made public before the start of the contest. (C4 delete this line when made public)

[ ⭐️ SPONSORS ADD INFO HERE ]

Previous JPYC's information, white paper, and more can be found [here](https://jpyc.jp). This time we developed 
## Brief introduction
JPYC protocol is an ERC20 compatible token. It allows minting of tokens by multiple entities, pausing all activity, freezing of individual addresses, rescuing of tokens and UUPS proxy pattern to upgrade the contract so that bugs can be fixed or features added. 
## Protocol contracts' structure
Protocol's contracts, Libraries and interfaces are below.
![contractArchitecture](contractArchitecture.drawio.svg)

## About solidity's version
According to [Openzeppelin's recent update](https://github.com/OpenZeppelin/openzeppelin-contracts/commit/e192fac2769386b7d4b61a3541073ab47bb7723a) and [this contract's version](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/e192fac2769386b7d4b61a3541073ab47bb7723a/contracts/proxy/ERC1967/ERC1967Upgrade.sol#L17). We need to keep the solidity verion equal to or higher than `pragma solidity 0.8.2`. We decided to use the comparatively new version of `0.8.11`.


# Contract Overview

Here is the list of main contracts in the protocol.
| filename                                                                    | language | code       | comment    | blank      | total      |
| --- | --- | --- | --- | --- | --- | 
| JPYCv2/contracts/proxy/ERC1967Proxy.sol             | Solidity |         12 |         17 |          4 |         33 |
| JPYCv2/contracts/proxy/Proxy.sol                    | Solidity |         29 |         47 |         10 |         86 |
| JPYCv2/contracts/upgradeability/ERC1967Upgrade.sol  | Solidity |         48 |         43 |         11 |        102 |
| JPYCv2/contracts/upgradeability/IBeacon.sol         | Solidity |          4 |         10 |          2 |         16 |
| JPYCv2/contracts/upgradeability/UUPSUpgradeable.sol | Solidity |         49 |         59 |         11 |        119 |
| JPYCv2/contracts/upgradeability/draft-IERC1822.sol  | Solidity |          4 |         14 |          2 |         20 |
| JPYCv2/contracts/util/Address.sol                   | Solidity |         85 |        114 |         18 |        217 |
| JPYCv2/contracts/util/Context.sol                   | Solidity |         10 |         12 |          4 |         26 |
| JPYCv2/contracts/util/ECRecover.sol                 | Solidity |         22 |         48 |          5 |         75 |
| JPYCv2/contracts/util/EIP712.sol                    | Solidity |         40 |         43 |          4 |         87 |
| JPYCv2/contracts/util/IERC20.sol                    | Solidity |         15 |         58 |          9 |         82 |
| JPYCv2/contracts/util/SafeERC20.sol                 | Solidity |         58 |         31 |         10 |         99 |
| JPYCv2/contracts/util/StorageSlot.sol               | Solidity |         51 |         39 |         10 |        100 |
| JPYCv2/contracts/v1/AbstractFiatTokenV1.sol         | Solidity |         24 |         23 |          6 |         53 |
| JPYCv2/contracts/v1/Blocklistable.sol               | Solidity |         43 |         46 |         11 |        100 |
| JPYCv2/contracts/v1/EIP2612.sol                     | Solidity |         37 |         43 |         10 |         90 |
| JPYCv2/contracts/v1/EIP3009.sol                     | Solidity |        134 |         94 |         22 |        250 |
| JPYCv2/contracts/v1/EIP712Domain.sol                | Solidity |         16 |         29 |          5 |         50 |
| JPYCv2/contracts/v1/FiatTokenV1.sol                 | Solidity |        356 |        180 |         39 |        575 |
| JPYCv2/contracts/v1/Ownable.sol                     | Solidity |         26 |         31 |         10 |         67 |
| JPYCv2/contracts/v1/Pausable.sol                    | Solidity |         34 |         52 |         10 |         96 |
| JPYCv2/contracts/v1/Rescuable.sol                   | Solidity |         32 |         40 |         10 |         82 |
| JPYCv2/contracts/v2/FiatTokenV2.sol                 | Solidity |        419 |        205 |         46 |        670 |
| JPYCv2/contracts/v2/FiatTokenV2test.sol             | Solidity |          8 |          2 |          5 |         15 |
| Total                                                                       |          |      1,813 |      1,584 |        348 |      3,745 


## Proxy
### Comparison of upgradeable pattern
<table>
  <tr><th width="130">Upgrading Pattern</th><th width="450">Good</th><th width="450">Bad</th></tr>
  <tr><td>UUPS</td><td>・Good gas efficiency </br>・More flexibility about the upgradeability when upgrade function is located in implementation</br>・Upgrade function can be customized（access control, Ownable）<br>・Proxy with less comlexity <br>・Upgradeability can be removed </td><td>・Has the risk of losing upgradeability if the upgrade function is not included</br>・Some bugs reported on github in the past<br>・More complexity in implementation</td></tr>
   <tr><td>Transparent</td><td>・Longer history with many real examples</td><td>・Bad gas efficency<br>・More comlexity in proxy</td></tr>
</table>

- https://docs.openzeppelin.com/contracts/4.x/api/proxy#transparent-vs-uups
- https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies

<br>


![TransparentPattern](./upgradeablePattern.drawio.svg)

### Transparent Proxy Pattern

Transparent proxy pattern is one of the most used upgradeable patterns in the industry and even OpenZeppelin's plugin uses it as a default way to deploy upgradeable contracts. But it has some disadvantages. That's why openzeppelin team's recommendation is shifting towards UUPS proxy pattern.   

Transparent proxy pattern puts `upgradeTo(impl)` in the proxy contract. It could mean this pattern is vulnerable to "clash of fucntions" in proxy and implementation. In order to avoid it, in Transparent proxy pattern, not only `ifAdmin` modifier was implemented in the proxy contract but also admin address needs to be stored in proxy. As a result, gas efficiency becomes worse and comlexity increases. 
### UUPS(EIP1822) Proxy Pattern

[UUPS proxy pattern is recommended by the OpenZeppelin team](https://docs.openzeppelin.com/contracts/4.x/api/proxy#transparent-vs-uups). It is said that UUPS pattern is more lightweight and vasatile.  

https://eips.ethereum.org/EIPS/eip-1822   


- Proxies    
UUPS proxies are implemented using an `ERC1967Proxy`. The proxy is not upgradeable by itself. It delegates calls to implementation contract.
- Implementation    
UUPS's implementation includes the `upgradeTo` function by inheritting `UUPSUpgradeable`   contract. Then we can upgrade the implementation contract by calling the `upgradeTo` function.

### We went with UUPS proxy pattern
In light of the current condition, we were hesitating between UUPS parxy and Transparent proxy patterns. In the end, With the reasons below, we've chosen UUPS pattern.
- More simplicity in Proxy
- Less gas fee for user
- Higher flexibility for upgradeability
- Recommended by openzeppelin team

### Explanation of UUPS contract
https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/proxy

We adopted openzeppelin's library to implement the UUPS upgradeable pattern. The only thing we have changed is we added `uint256[50] private _gap;` as the last part of serveral contracts in order to prepare for future upgradings(e.g. adding state variables) and be aligned with Openzeppelin's code.

#### Proxy.sol
- This contract provides a `_fallback` function that delegates all calls from proxy contract to implementation contract using `_delegate` function. The virtual `_implementation` function needs to be overrode. 
#### UUPSUpgradeable.sol
This is an upgradeability mechanism designed for UUPS proxies. The contract is inherited by the implemetation contract(`FiatTokenV1`). By inheriting this contract, implementation contract acquires upgradeability. 

We want to note that the `_authorizeUpgrade` function must be overrode by the implementation contract. we have done that and set the access right `onlyOwner`.

`draft-IERC1822.sol` is from a recent [Openzeppelin's update](https://github.com/OpenZeppelin/openzeppelin-contracts/commit/e192fac2769386b7d4b61a3541073ab47bb7723a). We have adopted the update. 


#### ERC1967Upgrade.sol
The contract is from [EIP1967](https://eips.ethereum.org/EIPS/eip-1967). It standardise where proxies store the address of the logic contract they delegate to, as well as other proxy-specific information.

#### ERC1967Proxy.sol
This is the Proxy contract. It is from OpenZeppelin's library. It needs implementation contract's address `_logic` and `_data` to be initialized.

- A proxy contract.
- constructor
  - It checks if `_IMPLEMENTATION_SLOT` is right.
  - Initializes the upgradeable proxy with an initial implementation specified by `_logic`.
  - `_data` is an encoded function call, and the function call initializes the storage of the proxy like a `constructor`.
- _implementation
  - It override the function in `Proxy.sol` and is called by function of `Proxy.sol`.

## implementation
### explanation of implementation contract
- We created implementation with reference to [the centre-tokens](https://github.com/centrehq/centre-tokens/tree/master/contracts ), Which is a contract with various functions added to the ERC20 standard. 
- Also, each contract declares an empty state variable `gap`, so that state variables can be added later.

Hereby, I will explain every single added function for each contract. 
#### Ownable.sol
A contract that manages the access rights of the contract.
It is the same as openzeppelin library except for not adding the function `renounceOwnership` used for removing ownership.

#### Pausable.sol
A contract that manages the access rights of the pausability. 
If the pauser pause FiatTokenV1 contract, some functions is restricted.
#### Blocklistable.sol
A contract that manages the access rights of the blocklistability. 
If you are registered in the blocklist, you will not be able to use some functions. 
`FiatTokenV1` contract is blocklisted in the init funciton.
#### Rescuable.sol
A contract that manages the access rights of rescuing tokens. 
Only the rescuer is able to send ERC20 tokens that were mistakenly sent to the proxy contract's address. 
The contract uses the `safeTransfer` function.
#### EIP712Domain.sol
https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md  
The contract stores EIP712 Domain Separator. 
EIP3009 and EIP2612 require EIP712 Domain.
#### EIP3009.sol
https://eips.ethereum.org/EIPS/eip-3009  
A contract that enables transferring of fungible assets via a signed authorization. 
The contract uses v, r and s to recover the address and verify if it matches the owner.

- `authorizationState`
  - There is a nonce for each user, and the same nonce cannot be used again.
  - The nonce is randomly determined.
- `_transferWithAuthorization`
- `_receiveWithAuthorization`
  - The destination of transferFrom is msg.sender.
- `_cancelAuthorization`
  - It deauthorize the nonce. You can undo a metatransaction that you signed incorrectly.
- `_requireUnusedAuthorization`
  - It checks if the nonce is already used. 
- `_requireValidAuthorization`
  - It checks if block.time is valid.
- `_markAuthorizationAsUsed`
  - It makes the nonce used and emits an event.
#### EIP2612.sol
https://eips.ethereum.org/EIPS/eip-2612  
A contract that enables transferring of fungible assets via a signed authorization. 
The contract uses v, r and s to recover the address and verify that it matches the authorizer.
- nonces
  - There is a `nonce` for each user, and the same `nonce` cannot be used twice.
  - The `nonce` increases one by one.
- _permit
  - It checks if `block.time` is valid.
  - If the recoverd address matches The owner, `_approve` is called.

#### FiatTokenV1
- Manages the access rights of the masterminter.
- Has an initializing function
  - `blocklisted[address(this)] = true`
  - `makeDomainSeparator(name, "1")`
  - `initialized = true`
  - mint, burn, increaseAllowance, decreaseAllowance
- Override the `_authorizeUpgrade` function with `onlyOwner` modifier.

#### FiatTokenV2
- It is an assumed upgraded version of FiatTokenV1 with a new functionality `whitelist`.
- It allows only users who are whitelisted to send or approve over 100,000 token to other user.
- Other than that everything is the same as FiatTokenV1.

### Note
- We partially used `ERC1967Upgradeable.sol` and `IBeacon.sol`’s code, but it is used totally because we selected UUPS upgradeable pattern. Functions like Beacon or Transparent pattern’s parts are not used in the current situation. We removed the unused parts.


## How to start

Install nodejs, refer to [nodejs](https://nodejs.org/en/).

```
git clone https://github.com/code-423n4/2022-02-jpyc.git

cd 2022-02-jpyc

npm i

// test
npx hardhat test
// When specifying the path
npx hardhat test test/direcotry/file

// coverage
npx hardhat coverage
// When specifying the path
npx hardhat coverage test/direcotry/file

// contract-sizer
npx hardhat size-contracts
```
## Used tools
- hardhat
  - https://hardhat.org/getting-started/
- solidity-coverage
  - https://www.npmjs.com/package/solidity-coverage
- contract-sizer
  - https://www.npmjs.com/package/hardhat-contract-sizer



## Test
We created the tests for the smart contracts as below.

### unit test
- test/util/ECRecover.test.js

### integration test
- test/v1/FiatTokenV1.test.js
  - test/v1/Initialize.behavior.js
  - test/v1/ERC20.behavior.js
  - test/v1/Blocklistable.behavior.js
  - test/v1/Ownable.behavior.js
  - test/v1/Pausable.behavior.js
  - test/v1/Rescuable.behavior.js
  - test/v1/EIP3009.behavior.js
  - test/v1/EIP2612.behavior.js
  - test/v1/FiatTokenV1.behavior.js
  - test/v1/UUPSUpgradeable.behavior.js

### functional test
Test with proxy
- test/v1_proxy/FiatTokenV1_proxy.test.js
  - test/v1/Initialize.behavior.js
  - test/v1/ERC20.behavior.js
  - test/v1/Blocklistable.behavior.js
  - test/v1/Ownable.behavior.js
  - test/v1/Pausable.behavior.js
  - test/v1/Rescuable.behavior.js
  - test/v1/EIP3009.behavior.js
  - test/v1/EIP2612.behavior.js
  - test/v1/FiatTokenV1.behavior.js
- test/storageSlot/storageSlot.test.js
  - test/storageSlot/storageSlot.behavior.js
- test/upgradeability/UUPSUpgradeable.test.js

## test reference
- Openzepplin test
  - https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/test
- Centre-tokens test
  - https://github.com/centrehq/centre-tokens/tree/master/test

## Other README.md files
If you want more information about how the contracts are forked or test files, see files below. 
- contracts/README.md
  - contract list
- test/READEME.md
  - test list

## References
[Openzeppelin's recent update](https://github.com/OpenZeppelin/openzeppelin-contracts/commit/e192fac2769386b7d4b61a3541073ab47bb7723a)   
[EIP1967](https://eips.ethereum.org/EIPS/eip-1967)   
[Transparent-vs-uups by Openzeppelin](https://docs.openzeppelin.com/contracts/4.x/api/proxy#transparent-vs-uups)    
[the centre-tokens](https://github.com/centrehq/centre-tokens/tree/master/contracts )   
[UUPS proxy pattern explanation](https://www.youtube.com/watch?v=kWUDTZhxKZI)   
[EIP2535](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard)   
[Unstructured storage pattern](https://blog.openzeppelin.com/upgradeability-using-unstructured-storage/)

## 📝 License

Copyright © 2022 [JPYC](https://jpyc.jp). <br />
This project is [MIT](https://github.com/jcam1/JPYCv2/blob/master/LICENSE) licensed.

# Our Website
http://jpyc.jp
