import React, { Component } from 'react'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'
import { Button } from 'react-bootstrap';
import offers from '../img/offers.png'
import happymoogle from '../img/happy-moogle-crop.png'
import '../css/oswald.css'
import '../css/Token.css'

class AddToken extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      file: '',
      imagePreviewUrl: ''
    }
  }
  
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
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
      <div className="Token">       
        <div className="container">
          <div className="row token-info-row">
            <div className="col-md col-home-left">
                <img className="happymoogle" src={happymoogle}/>
                <div className="token-column">
                    <h3 className="token-name">Happy Moogle</h3>
                    <div className="token-id">ID 1399 · Moogle</div>
                    <Button className="offer-button" bsStyle="primary btn-home">Make an Offer</Button>  
                </div>
            </div>
            <div className="col-md col-home-right">
                <h3 className="bio-header">Bio</h3>
                <div className="bio-text">Hi there! I’m a happy moogle who enjoys eating vines and kupo nuts. I spend most of my time playing basketball and currently looking for someone to play with me!</div>
                <h3 className="features-header">Features</h3>
                <div className="features-text">Cheerful, small wings, ruby hair pin</div>            
            </div>
            <div className="row">
                <img className="offers" src={offers}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddToken
