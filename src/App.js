import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import getWeb3 from './utils/getWeb3'
import getNFTExchange from './contracts/getNFTExchange'
import getCastle from './contracts/getCastle'
import Home from './views/Home'
import AddToken from './views/AddToken'
import Token from './views/Token'
import Listings from './views/Listings'

import profileCircle from './img/profile-circle.png'
import './css/oswald.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      castle: null,
      accounts: [],
      listings: [],
      nftExchange: null,
      web3: null
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({ web3: results.web3 })
      return new Promise((resolve, reject) => {
        results.web3.eth.getAccounts((error, accounts) => {
          if (error) reject(error)
          resolve(accounts)
        })
      })
    })
    .then((accounts) => {
      this.setState({ accounts })
      return getNFTExchange()
    })
    .then((nftExchange) => {
      this.setState({ nftExchange })
      return getCastle()
    })
    .then((castle) => {
      this.setState({ castle })
    })
    .then(() => {
      this.addEventListeners(this)
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  // watch for contract events
  addEventListeners(component) {
    let wrappedEvent = component.state.nftExchange._TokenWrapped({}, { fromBlock: 0 })
    wrappedEvent.watch(function (err, result) {
      if (err) {
        console.error(err)
        return
      }

      console.log(`added ${result}`)
      let listings = component.state.listings
      let listing = result

      listings.push(listing)
      component.setState({ listings })
    })

    let unwrappedEvent = component.state.nftExchange._TokenUnwrapped({}, { fromBlock: 0 })
    unwrappedEvent.watch(function (err, result) {
      if (err) {
        console.error(err)
        return
      }

      console.log(`removed ${result}`)
      // TODO: find the listing and remove it
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar-nft navbar navbar-light">
            <a className="navbar-nav"></a>
            <p className="navbar-nav navbar-center">NFT Exchange</p>
            <img className="nav-gravatar navbar-right" src={profileCircle}/>
          </nav>
          
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/add-token" render={props => (
              <AddToken 
                nftExchange={this.state.nftExchange}
                accounts={this.state.accounts}
                castle={this.state.castle} />
            )} />
            <Route path="/token" component={Token} />
            <Route path="/listings" component={Listings} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App
