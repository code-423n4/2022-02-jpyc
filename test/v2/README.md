

### Whitelistable.behaviour.js
- isWhitelisted
  - account is whitelisted
  - account is not whitelisted
- whitelist
  - requested account is whitelister
    - whitelist whitelisted account
    - whitelist unwhitelisted account
    - emmits a whitelist event
  - requested account is not whitelister 
- unwhitelist
  - requested account is whitelister
    - unwhitelist whitelisted account
    - unwhitelist unwhitelisted account
    - emits a unWhitelist event
  - requested account is not whitelister
- upadateWhitelister
  - whitelister
  - newWhitelister is not the zero
    - requested account is owner
      - returns whitelister
      - emits a updateWhitelister event
    - requested account is not owner
  - newWhitelister is the zero
- whitelistable token
  - approve
    - allows to approve over 100000 tokens when Whitelisted
    - reverts when allows to approve over 100000 tokens when unWhitelisted
    - allows to approve under 100000 tokens when unWhitelisted
    - allows to approve under 100000 tokens when whitelisted and then unWhitelisted
  - transfer
    - allows to transfer over 100000 when whitelisted
    - allows to transfer under 100000 tokens when whitelisted and then unWhitelisted
    - reverts when trying to transfer when sender is not whitelisted and the value is more than 100000
  - transfer from
    - allows to transferfrom over 100000 tokens when sender is Whitelisted
    - allows to transferfrom under 100000 tokens when sender is not Whitelisted
    - allows to transferfrom under 100000 tokens when sender is whitelisted and then unWhitelisted
    - reverts when transferfrom over 100000 tokens when sender is not Whitelisted
    - allows to transferfrom under 100000 tokens when sender is not Whitelisted
  - increaseAllowance
    - allows to increaseAllowance under 100000 tokens when msg.sender is unWhitelisted
    - allows to increaseAllowance under 100000 tokens when msg.sender and spender is whitelisted and then unWhitelisted
    - reverts when trying to increaseAllowance over 100000 tokens when msg.sender is not whitelisted
  - decreaseAllowance
    - allows to decreaseAllowance when unWhitelisted
    - allows to decreaseAllowance when whitelisted and then unWhitelisted
  - mint
    - allows to mint over 100000 tokens when minter is whitelisted
    - allows to mint under 100000 tokens when minter is not whitelisted
    - reverts when minter is not whitelisted and mint more than 100000 token

### WhitelistEIP2612.behaviour.js
- permit
  - accepts owner signature when unwhitelisted and under 100000 tokens
  - reverts when permit with unwhitelisted account and over 100000 tokens
  - accepts owner signature when he is whitelisted and under 100000 tokens
  - accepts owner signature when he is whitelisted and over 100000 tokens

### WhitelistEIP3009.behaviour.js
- TransferWithAuthorization
  - accepts owner signature when from is unWhitelisted and send under 100000 tokens
  - reverts when from is unWhitelisted and send over 100000 tokens
  - accepts owner signature when from is whitelisted and send under 100000 tokens
  - accepts owner signature when from is whitelisted and send over 100000 tokens
- ReceiveWithAuthorization
  - accepts owner signature when from is not whitelisted and receive under 100000 tokens and caller is the payee
  - reverts when from is not whitelisted and receive over 100000 tokens and caller is the payee
  - accepts owner signature when from is whitelisted and receive under 100000 tokens and caller is the payee
  - accepts owner signature when from is whitelisted and receive over 100000 tokens and caller is the payee

