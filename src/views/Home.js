import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

import latestExchange from '../img/latest-exchange.png'
import happyMoogle from '../img/happy-moogle.png'
import castle from '../img/castle.png'
import kitty from '../img/kitty.png'
import popularItems from '../img/most-popular-items.png'

export default class Home extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md col-home-left">
          <p className="app-description">Get your perfect whatever.</p>
          <p className="amount-listed">23849 items listed</p>
          <div className="home-buttons">
            <Button bsStyle="primary btn-home">
              <a href="/listings">View Listings</a>
            </Button>
            <Button bsStyle="primary btn-home">
              <a href="/add-token">Add New Token</a>
            </Button>
            <Button bsStyle="primary btn-home">
              <a href="/my-tokens">My Tokens</a>
            </Button>
          </div>
        </div>
        <div className="col-md col-home-right">
          <div className="lastest-exchange">
            <h3>Latest Exchange</h3>
            <a href="/listings"><img className="latest-exchange" src={latestExchange}/></a>
          </div>
          <div className="popular-items">
            <h3>Most Popular Items</h3>
            <a href="/listings"><img className="popular-items" src={popularItems}/></a>
          </div>
        </div>
      </div>
    )
  }

}
