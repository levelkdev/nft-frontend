import React, { Component } from 'react'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'
import { Button } from 'react-bootstrap';

import '../css/oswald.css'
import '../App.css'
import '../css/AddToken.css'


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
      <div className="AddToken">       
        <div className="container">
        <p className="title">What would you like to trade?</p>
          <div className="row">
            <div className="col-md col-home-left">
              <div className="home-buttons">
                <label style= {{display: "block"}}>
                    <div>Wallet Address:</div>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label style= {{display: "block"}}>
                    <div>Token ID:</div>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label style= {{display: "block"}}>
                    <div>Token Name:</div>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <Button className="add-token-button" bsStyle="primary btn-home">Add Token</Button>
              </div>
            </div>
            <div className="col-md col-home-right">
                <label style= {{display: "block"}}>
                    <div> Picture <input onChange={(e)=>this._handleImageChange(e)} className="file-upload" type="file" accept="image/*"/></div>
                    <div className="picture-upload-display"><img src={this.state.imagePreviewUrl} /></div>
                </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddToken
