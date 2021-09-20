#!/usr/bin/env node

const chai = require('chai')
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
const mocha = require('mocha');

const { 
  addMarkup,
  checkout,
  searching
} = require('../bin/index');



// Unit Tests

describe('addMarkup Test', () => {

  it('should return 4560', () => {
    let baseCost = 3800
    let artistMarkup = 20
    let itemTotal = addMarkup(baseCost, artistMarkup)
    expect(itemTotal).to.equal(4560)
  })
  it('should return 3190', () => {
    let baseCost = 2900
    let artistMarkup = 10
    let itemTotal = addMarkup(baseCost, artistMarkup)
    expect(itemTotal).to.equal(3190)
  })
  it('should return 21275', () => {
    let baseCost = 18500
    let artistMarkup = 15
    let itemTotal = addMarkup(baseCost, artistMarkup)
    expect(itemTotal).to.equal(21275)
  })
})

describe('searching Test', () => {
  
  it('should return basePrice of 3800', () => {
    let database = require('./base-prices.json')
    let cart = require('./cart-4560.json')
    let basePrice = searching(database, cart[0])
    expect(basePrice).to.equal(3800)
  })
  it('should return basePrice of 221', () => {
    let database = require('./base-prices.json')
    let cart = require('./cart-9363.json')
    let basePrice = searching(database, cart[1])
    expect(basePrice).to.equal(221)
  })
  it('should return basePrice of 4369', () => {
    let database = require('./base-prices.json')
    let cart = require('./cart-11356.json')
    let basePrice = searching(database, cart[0])
    expect(basePrice).to.equal(4368)
  })
})

// Integration Test
// This test is currently failing. The cart total is an accumulation of all three expect totals.
// I am unsure as to why this is as the cart is re-set/a new const in each test.
// I have also mocked up some pseudo code with the before/afterEach hooks 
// as I believe something similar to a stub would be effective

describe('checkout Test', () => {
  
  // beforeEach(() => {
  //   const stubSearchingFunc = sandbox.stub(searching)
  //   const stubAddMarkupFunc = sandbox.stub(addMarkup)
  //   let cart = [{}]
  //   let cartTotal = 0
  // })

  // afterEach(() => {
  //   sandbox.restore()
  // })

  it('should return cartTotal of 4560', function() {
    cart = require('./cart-4560.json')
    cartTotal = checkout(cart)
    expect(cartTotal).to.equal(4560)
  })
  it('should return cartTotal of 9363', () => {
    cart = require('./cart-9363.json')
    cartTotal = checkout(cart)
    expect(cartTotal).to.equal(9363)
  })
  it('should return cartTotal of 11356', function () {
    cart = require('./cart-11356.json')
    cartTotal = checkout(cart)
    expect(cartTotal).to.equal(11356)
  })
})

// End to End Test

describe('End to end test', function () {
const database = require('./base-prices.json')
const cart = require('./cart-4560.json')

  it('should return 4560', () => {
    expect(checkout(cart, database)).to.equal(4560)
  })
  // it('should call searching function once', function () {
  //   expect(searching).to.have.been.called.once
  // })
})