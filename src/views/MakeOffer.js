import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import sha3 from 'solidity-sha3'
import getERC721 from '../contracts/getERC721'
import Tokens from '../contracts/Tokens'

import '../css/oswald.css'
import '../App.css'
import '../css/AddToken.css'

class MakeOffer extends Component {

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

  async proposeSwap() {
    const askAddress = this.props.match.params.tokenAddress
    const askId = this.props.match.params.tokenId
    const offerAddress = this.state.tokenContractAddress
    const offerId = this.state.tokenId
    console.log(`
      proposing token swap
        ask: ${askAddress} #${askId}
        offer: ${offerAddress} #${offerId}
    `)

    this.props.nftExchange._tokens(sha3(askAddress, parseInt(askId)))
      .then((res) => console.log('TOKEN1: ', res))
      .catch((err) => console.log(err))

    this.props.nftExchange._tokens(sha3(offerAddress, parseInt(offerId)))
      .then((res) => console.log('TOKEN2: ', res))
      .catch((err) => console.log(err))

    this.props.nftExchange.proposeSwap(
      sha3(askAddress, parseInt(askId)),
      sha3(offerAddress, parseInt(offerId)),
      {from: this.props.accounts[0]}
    )
    .then((proposeSwapTx) => {
      console.log('PROPOSE SWAP TX: ', proposeSwapTx)
    })
    .catch((err) => {
      console.log('Error proposeSwap: ', err)
    })
  }

  getImage() {
    const token = Tokens[this.state.tokenContractAddress]
    if (token) {
      return token.img
    }
  }

  render() {
    const askToken = Tokens[this.props.match.params.tokenAddress]
    return (
      <div className="AddToken">       
        <div className="container">
        <p className="title">{`What will you offer for ${askToken.name} #${this.props.match.params.tokenId}`}</p>
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
                <Button className="add-token-button" bsStyle="primary btn-home" onClick={this.proposeSwap.bind(this)}>Submit Offer</Button>
              </div>
            </div>
            <div className="col-md col-home-right">
                <label style= {{display: "block"}}>
                  <div className="picture-upload-display"><img src={this.getImage()} /></div>
                </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MakeOffer
