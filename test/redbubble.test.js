const chai = require('chai')
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
const mocha = require('mocha');

const { 
  addMarkup,
  calculating,
  searching,
} = require('../controller');

// Unit Tests
describe('addMarkup function Test', function() {

  it('should return 4560', function() {
    let baseCost = 3800
    let artistMarkup = 20
    let itemTotal = addMarkup(baseCost, artistMarkup)
    expect(itemTotal).to.equal(4560)
  })
  it('should return 3190', function() {
    let baseCost = 2900
    let artistMarkup = 10
    let itemTotal = addMarkup(baseCost, artistMarkup)
    expect(itemTotal).to.equal(3190)
  })
  it('should return 21275', function() {
    let baseCost = 18500
    let artistMarkup = 15
    let itemTotal = addMarkup(baseCost, artistMarkup)
    expect(itemTotal).to.equal(21275)
  })
})

describe('searching function Test', function() {
  
  it('should return basePrice of 3800', function()  {
    let database = require('./base-prices.json')
    let cartItem = require('./cart-4560.json')
    let basePrice = searching(database, cartItem[0])
    expect(basePrice).to.equal(3800)
  })
  it('should return basePrice of 221', function() {
    let database = require('./base-prices.json')
    let cartItem = require('./cart-9363.json')
    let basePrice = searching(database, cartItem[1])
    expect(basePrice).to.equal(221)
  })
  it('should return basePrice of 4369', function() {
    let database = require('./base-prices.json')
    let cartItem = require('./cart-11356.json')
    let basePrice = searching(database, cartItem[0])
    expect(basePrice).to.equal(4368)
  })
})

// Integration Tests
describe('calculating function Test', function() {

  it('should return cartTotal of 4560', function() {
    let cart = require('./cart-4560.json')
    let database = require('./base-prices.json')

    cartTotal = calculating(cart, database)
    expect(cartTotal).to.equal(4560)
  })
  it('should return cartTotal of 9363', function() {
    cart = require('./cart-9363.json')
    database = require('./base-prices.json')

    cartTotal = calculating(cart, database)
    expect(cartTotal).to.equal(9363)
  })
  it('should return cartTotal of 11356', function () {
    cart = require('./cart-11356.json')
    database = require('./base-prices.json')
    cartTotal = calculating(cart, database)
    expect(cartTotal).to.equal(11356)
  })
})