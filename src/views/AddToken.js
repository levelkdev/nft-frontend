import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

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

  createToken() {
    this.props.castle.approve(
      this.props.nftExchange.address,
      2,
      { from: this.props.accounts[0] }
    )
    .then((approveTx) => {
      console.log('APPROVE TX: ', approveTx)
      return this.props.nftExchange.wrapToken(
        '0xae4c9bd0f7ae5398df05043079596e2bf0079ce9',
        2,
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
                <Button className="add-token-button" bsStyle="primary btn-home" onClick={this.createToken.bind(this)}>Add Token</Button>
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
