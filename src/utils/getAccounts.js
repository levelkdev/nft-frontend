import getWeb3 from './getWeb3'

export default () => {
  return getWeb3.then((result) => {
    return result.web3.eth.getAccounts()
  })
}
