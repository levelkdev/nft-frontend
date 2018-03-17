import getContract from './getContract'
import NFTExchangeJSON from './NFTExchange.json'

export default () => {
  return getContract(NFTExchangeJSON)
}

