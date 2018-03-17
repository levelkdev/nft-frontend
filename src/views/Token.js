import React, { Component } from 'react'
import getWeb3 from '../utils/getWeb3'
import { Button } from 'react-bootstrap';
import offers from '../img/offers.png'
import happymoogle from '../img/happy-moogle-crop.png'
import '../css/oswald.css'
import '../css/Token.css'

class Token extends Component {
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
                <img className="happymoogle" src={happymoogle}/>
                <div className="token-column">
                    <h3 className="token-name">Happy Moogle</h3>
                    <div className="token-id">{this.props.match.params.tokenId}</div>
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

export default Token
