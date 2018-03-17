import React, { Component } from 'react'
import Tokens from '../contracts/Tokens'
import '../Listings.css'

export default class MyTokens extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const myTokens = JSON.parse(this.fetchListingItems(this.props))
    const myTokensLength = myTokens.length
    const myTokenComponents = myTokens.map(listing => {
      return (
        <MyTokenItem
          id={listing.id}
          img={listing.img}
          tokenName={listing.tokenName}
        />
      )
    })

    return (
      <div className='listings'>
        <div className='row'>
          <div className='col-4'>
            <p className='item-count'>{`${myTokensLength} Items Listed`}</p>
          </div>
          <div className='col-4'>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              id="txtSearch"
            />
          </div>
        </div>
        <div className='listings-list'>
          {myTokenComponents}
        </div>
      </div>
    )
  }

  fetchListingItems(props) {
    let myTokenListings = []
    for (var i in props.tokenListings) {
      const tokenListing = props.tokenListings[i]
      if (tokenListing.owner == props.accounts[0]) {
        myTokenListings.push(tokenListing)
      }
    }
    console.log('MY TOKEN LISTINGS: ', myTokenListings)
    return JSON.stringify(myTokenListings.map((tokenListing) => {
      return {
        id: tokenListing.id,
        tokenName: tokenListing.tokenName,
        img: Tokens[tokenListing.tokenName].img
      }
    }))
  }

}

class MyTokenItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a className='listing-item' href={`/token/${this.props.tokenName}/${this.props.id}`}>
        <div className='row'>
          <div className='col'>
            <img className='token-image' src={this.props.img}/>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p className='token-id'>{`ID ${this.props.id}`}</p>
          </div>
          <div className='col'>
            <p>{this.props.tokenName}</p>
          </div>
        </div>
      </a>
    )
  }
}
