import React, { Component } from 'react'
import getWeb3 from '../utils/getWeb3'
import { Button } from 'react-bootstrap';
import offers from '../img/offers.png'
import '../css/oswald.css'
import '../css/Token.css'
import Tokens from '../contracts/Tokens'

class TokenDetail extends Component {
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

  render() {
    return (
      <div className="Token">       
        <div className="container">
          <div className="row token-info-row">
            <div className="col-md col-home-left">
                <img className="happymoogle" src={Tokens[this.props.match.params.tokenAddress].img}/>
                <div className="token-column">
                    <h3 className="token-name">
                      {Tokens[this.props.match.params.tokenAddress].name}
                    </h3>
                    <h2 className="token-id">#{this.props.match.params.tokenId}</h2>
                    <Button className="offer-button" bsStyle="primary btn-home">Make an Offer</Button>  
                </div>
            </div>
            <div className="col-md col-home-right">
                <h3 className="bio-header">Bio</h3>
                <div className="bio-text">{Tokens[this.props.match.params.tokenAddress].bio}</div>
                <h3 className="features-header">Features</h3>
                <div className="features-text">{Tokens[this.props.match.params.tokenAddress].features}</div>            
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

export default TokenDetail
