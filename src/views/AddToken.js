import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import getERC721 from '../contracts/getERC721'
import Tokens from '../contracts/Tokens'

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

  handleTokenContractAddressChange(event) {
    this.setState({ tokenContractAddress: event.target.value });
  }

  handleTokenIdChange(event) {
    this.setState({ tokenId: event.target.value });
  }

  handleTokenNameChange(event) {
    this.setState({ tokenName: event.target.value });
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

  createToken() {
    let erc721
    console.log(`adding token ${this.state.tokenContractAddress} ${this.state.tokenId}`)
    getERC721(this.state.tokenContractAddress)
    .then((_erc721) => {
      erc721 = _erc721
      return erc721.balanceOf(this.props.accounts[0])
    })
    .then((tokenCount) => {
      console.log('balance: ', tokenCount.toNumber())
      console.log(`erc721.approve
        ${this.props.nftExchange.address}
        ${this.state.tokenId}
      `)
      return erc721.approve(
        this.props.nftExchange.address,
        this.state.tokenId,
        { from: this.props.accounts[0] }
      )
    })
    .then((approveTx) => {
      console.log('erc721.approve tx: ', approveTx)
      return this.props.nftExchange.wrapToken(
        this.state.tokenContractAddress,
        this.state.tokenId,
        {from: this.props.accounts[0]}
      )
    })
    .then((wrapTokenTx) => {
      console.log('WRAP TOKEN TX: ', wrapTokenTx)
    })
    .catch((err) => {
      console.log('Error createToken: ', err)
    })
  }

  getImage() {
    const token = Tokens[this.state.tokenContractAddress]
    if (token) {
      return token.img
    }
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
                    <div>Token Contract Address:</div>
                    <input type="text" value={this.state.tokenContractAddress} onChange={this.handleTokenContractAddressChange.bind(this)} />
                </label>
                <label style= {{display: "block"}}>
                    <div>Token ID:</div>
                    <input type="text" value={this.state.tokenId} onChange={this.handleTokenIdChange.bind(this)} />
                </label>
                <label style= {{display: "block"}}>
                    <div>Token Name:</div>
                    <input type="text" value={this.state.tokenName} onChange={this.handleTokenNameChange.bind(this)} />
                </label>
                <Button className="add-token-button" bsStyle="primary btn-home" onClick={this.createToken.bind(this)}>Add Token</Button>
              </div>
            </div>
            <div className="col-md col-home-right">
                <label style= {{display: "block"}}>
                    <div> Picture <input onChange={(e)=>this._handleImageChange(e)} className="file-upload" type="file" accept="image/*"/></div>
                    <div className="picture-upload-display"><img src={this.getImage()} /></div>
                </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddToken
