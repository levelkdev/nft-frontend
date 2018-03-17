import getWeb3 from '../utils/getWeb3'
import truffleContract from 'truffle-contract'
import ERC721JSON from './ERC721.json'

export default (contractAddress) => {
  return getWeb3
    .then(results => {
      const erc721 = truffleContract(ERC721JSON)
      erc721.setProvider(results.web3.currentProvider)
      return erc721.at(contractAddress)
    })
    .catch((err) => {
      console.log('Error finding web3: ', err)
    })
}
