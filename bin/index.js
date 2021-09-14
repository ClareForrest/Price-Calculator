#!/usr/bin/env node


// I have not been able to achieve the reading of files 
// that are passed in by argv in the CLI at startup
// To demonstrate the functions that I have written
// I have hard-coded the files below;

const database = require('../test/base-prices.json');
const cart = require('../test/cart-4560.json');
// const cart = require('../test/cart-9363.json');
// const cart = require('../test/cart-11356.json');

let cartTotal = 0

checkout(cart, database)

// TO DO: createReadStrem for both cart and database (currently hardcoded)

// Takes in two files and returns cart total from db pricing
function checkout(cart, database){
  for(let k = 0; k < cart.length; k++){
    let item = cart[k]
    let itemBaseCost = searching(database,  item)
    let itemTotal = addMarkup(itemBaseCost, item['artist-markup'])
    let itemQuantity = item['quantity']
    cartTotal = cartTotal +(itemTotal * itemQuantity)
  }
  return cartTotal
}
console.log('cart total', cartTotal, '\n')

  // Checks nested cart key/value pairs against db key/value pairs
  // Checks for cartItem product type to match against database
  // Then checks database options against cartItem options. 
  // This allows me to meet the criteria for varying options on different products

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

  // Calculates the markup from cartItem and calculates against the base price
  function addMarkup(baseCost, artistMarkup){
    return (baseCost + Math.round(baseCost * artistMarkup/100))
  }

  // TO DO: Export to separate file and create menu options
  // Allows for modules to be exported for testing. 
  module.exports = {
    addMarkup,
    checkout,
    searching
  }