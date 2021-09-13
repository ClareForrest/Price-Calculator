#!/usr/bin/env node

const database = require('../base-prices.json');
const cart1 = require('../cart-9363.json'); // array of objects
let cartTotal = 0

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