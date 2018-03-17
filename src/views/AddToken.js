import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class AddToken extends Component {

  constructor(props) {
    super(props)
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
      <div className="row">
        <Button onClick={this.createToken.bind(this)} bsStyle="primary btn-home">
          Create Token
        </Button>
      </div>
    )
  }

}
