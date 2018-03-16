import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import { Button } from 'react-bootstrap';

import profileCircle from './img/profile-circle.png'
import latestExchange from './img/latest-exchange.png'
import happyMoogle from './img/happy-moogle.png'
import castle from './img/castle.png'
import kitty from './img/kitty.png'
import popularItems from './img/most-popular-items.png'
import './css/oswald.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar-nft navbar navbar-light">
            <a className="navbar-nav"></a>
            <p className="navbar-nav navbar-center">NFT Exchange</p>
            <img className="nav-gravatar navbar-right" src={profileCircle}/>
        </nav>
        
        <div className="container">
          <div className="row">
            <div className="col-md col-home-left">
              <p className="app-description">Get your perfect whatever.</p>
              <p className="amount-listed">23849 items listed</p>
              <div className="home-buttons">
                <Button bsStyle="primary btn-home">View Listings</Button>
                <Button bsStyle="primary btn-home">Add New Token</Button>
              </div>
            </div>
            <div className="col-md col-home-right">
              <div className="lastest-exchange">
                <h3>Latest Exchange</h3>
                <img className="latest-exchange" src={latestExchange}/>
              </div>
              <div className="popular-items">
                <h3>Most Popular Items</h3>
                <img className="popular-items" src={popularItems}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
