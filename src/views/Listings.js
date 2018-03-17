import React, { Component } from 'react'
import '../Listings.css'

export default class Listings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listingItems: JSON.parse(this.fetchListingItems())
    }
  }

  render() {
    const listingItemsLength = this.state.listingItems.length
    const listingItemComponents = this.state.listingItems.map(listing => {
      return (
        <ListingItem
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
            <p className='item-count'>{`${listingItemsLength} Items Listed`}</p>
          </div>
          <div className='col-4'>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              id="txtSearch"
            />
          </div>
          <div className='col-4 add-new'>
            <a href='#'>Add New</a>
          </div>
        </div>
        <div className='listings-list'>
          {listingItemComponents}
        </div>
      </div>
    )
  }

  fetchListingItems() {
    const listingItems = [
      {id: '12323', img: 'happy-moogle.png', tokenName: 'Happy Moogle'},
      {id: '43447', img: 'castle.png', tokenName: 'European Castle'},
      {id: '44547', img: 'link.png', tokenName: 'Link'},
      {id: '43447', img: 'bandit-moogle.png', tokenName: 'Bandit Moogle'},
      {id: '16307', img: 'kitty.png', tokenName: 'Holiday Kitty'},
      {id: '43447', img: 'castle.png', tokenName: 'European Castle'},
      {id: '44547', img: 'nerdy-moogle.png', tokenName: 'Link'},
      {id: '16307', img: 'kitty.png', tokenName: 'Holiday Kitty'},
      {id: '44547', img: 'link.png', tokenName: 'Link'}
    ]

    return JSON.stringify(listingItems)
  }

}

class ListingItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='listing-item'>
        <div className='row'>
          <div className='col'>
            <img className='token-image' src={require('../img/' + this.props.img)}/>
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
      </div>
    )
  }
}
