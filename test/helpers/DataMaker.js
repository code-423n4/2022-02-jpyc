// web3.jsの場合でも試してみる

const _data = (newMasterMinter, newPauser, newBlocklister, newOwner) => web3.eth.abi.encodeFunctionCall(
  {
    name: 'initialize',
    type: 'function',
    inputs: [
      {
        type: 'string',
        name: 'tokenName',
      },
      {
        type: 'string',
        name: 'tokenSymbol',
      },
      {
        type: 'string',
        name: 'tokenCurrency',
      },
      {
        type: 'uint8',
        name: 'tokenName',
      },
      {
        type: 'address',
        name: 'newMasterMinter',
      },
      {
        type: 'address',
        name: 'newPauser',
      },
      {
        type: 'address',
        name: 'newBlocklister',
      },
      {
        type: 'address',
        name: 'newOwner',
      },
    ],
  },
  [
    'JPY Coin',
    'JPYC',
    'JPY',
    18,
    newMasterMinter,
    newPauser,
    newBlocklister,
    newOwner,
  ]
)
// console.log('data by encode: ', data)

// console.log(
//   'data by sha3: ',
//   web3.utils
//     .sha3(
//       'initialize(string,string,string,uint8,address,address,address,address)'
//     )
//     .substring(0, 10)
// )
module.exports = {
  _data,
}
