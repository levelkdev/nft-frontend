import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import sha3 from 'solidity-sha3'
import getWeb3 from './utils/getWeb3'
import getNFTExchange from './contracts/getNFTExchange'
import getERC721 from './contracts/getERC721'
import Home from './views/Home'
import AddToken from './views/AddToken'
import MakeOffer from './views/MakeOffer'
import TokenDetail from './views/TokenDetail'
import MyTokens from './views/MyTokens'
import Listings from './views/Listings'

import profileCircle from './img/profile-circle.png'
import './css/oswald.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      erc721: null,
      accounts: [],
      listings: [],
      proposedSwaps: [],
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

      let listing = {
        owner: result.args.owner,
        id: result.args.tokenId.toString(),
        tokenName: result.args.token
      }
      console.log('_TokenWrapped(): ', listing)

      component.state.nftExchange._tokens(sha3(listing.tokenName, parseInt(listing.id)))
        .then((result) => {
          listing.owner = result[0]
          let listings = component.state.listings
          listings.push(listing)
          component.setState({ listings })
          // console.log('CURRENT TOKEN STATE: ', result)
        })

    })

    let unwrappedEvent = component.state.nftExchange._TokenUnwrapped({}, { fromBlock: 0 })
    unwrappedEvent.watch(function (err, result) {
      if (err) {
        console.error(err)
        return
      }

      console.log('_TokenUnwrapped(): ', result)
      // TODO: find the listing and remove it
    })

    let swapProposedEvent = component.state.nftExchange._SwapProposed({}, { fromBlock: 0 })
    swapProposedEvent.watch(function (err, result) {
      if (err) {
        console.error(err)
        return
      }

      let proposedSwaps = component.state.proposedSwaps
      let proposedSwap = {
        proposalHash: result.args.proposalHash,
        offerTokenOwner: result.args.offerTokenOwner,
        askTokenOwner: result.args.askTokenOwner,
        offerToken: result.args.offerToken,
        askToken: result.args.askToken,
        offerTokenId: result.args.offerTokenId.toString(),
        askTokenId: result.args.askTokenId.toString()
      }
      console.log('_SwapProposed(): ', proposedSwap)

      proposedSwaps.push(proposedSwap)
      component.setState({ proposedSwaps })
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar-nft navbar navbar-light">
            <Button bsStyle="primary btn-home">
              <a className="navbar-nav" href="/">Home</a>
            </Button>
            <p className="navbar-nav navbar-center">NFT Exchange</p>
            <img className="nav-gravatar navbar-right" src={profileCircle}/>
          </nav>
          
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/add-token" render={props => (
              <AddToken 
                nftExchange={this.state.nftExchange}
                accounts={this.state.accounts}
                erc721={this.state.erc721} />
            )} />
            <Route path="/token/:tokenAddress/:tokenId" render={props => (
              <TokenDetail
                match={props.match}
                proposedSwaps={this.state.proposedSwaps}
                nftExchange={this.state.nftExchange}
                accounts={this.state.accounts}
                web3={this.state.web3} />
            )} />
            <Route path="/make-offer/:tokenAddress/:tokenId" render={props => (
              <MakeOffer 
                match={props.match}
                nftExchange={this.state.nftExchange}
                accounts={this.state.accounts} />
            )} />
            <Route path="/listings" render={props => (
              <Listings tokenListings={this.state.listings} />
            )} />
            <Route path="/my-tokens" render={props => (
              <MyTokens
                tokenListings={this.state.listings}
                accounts={this.state.accounts} />
            )} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App
