import truffleContract from 'truffle-contract'
import getWeb3 from '../utils/getWeb3'
import config from '../config'

export default (contractJSON) => {
  return getWeb3
    .then(results => {
      const contract = truffleContract(contractJSON)
      contract.setProvider(results.web3.currentProvider)
      return contract.deployed()
    })
    .catch((err) => {
      console.log('Error finding web3: ', err)
    })
}

