#!/usr/bin/env node

const database = require('../base-prices.json');
const cart = require('../cart-9363.json');
let cartTotal = 0

checkout(cart)

function checkout(cart){
  cart.forEach((item) => { 
  let itemBaseCost = searching(database, item)
  let itemTotal = addMarkup(itemBaseCost, item['artist-markup'])
  let itemQuantity = item['quantity']
  cartTotal = cartTotal +(itemTotal * itemQuantity)
  return cartTotal
  })
}
console.log('cart total', cartTotal, '\n')

function searching(database, cartItem){
  let dbItemsMatchingCartItems = []

  database.map((product) => {
    if(product['product-type'] === cartItem['product-type']){ 
        dbItemsMatchingCartItems.push(product)
      }  
    })    
    const productOne = dbItemsMatchingCartItems[0]
    const productKeys = Object.keys(productOne.options)
    
    let matchingProduct
  
    for(let j = 0; j < dbItemsMatchingCartItems.length; j++){        
      for (let i = 0; i < productKeys.length; i++) {
        matchingProduct = true
        let key = productKeys[i]
        let productOptionArray = dbItemsMatchingCartItems[j].options[key]
        let cartOption = cartItem.options[key]

        const foundMatch = productOptionArray.includes(cartOption)

        if(!foundMatch){
          matchingProduct = false
          break;
        }
      }
      if(matchingProduct){
        const match = dbItemsMatchingCartItems[j]
        const basePrice = match['base-price']
        return basePrice
      }
    }
  }

  function addMarkup(baseCost, artistMarkup){
    return (baseCost + Math.round(baseCost * artistMarkup/100))
  }

  module.exports = {
    addMarkup,
    checkout,
    searching
  }