#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { readFile } = require('fs');

// Get the filepath for the passed in file
const dbFileArg = process.argv[2]
const cartFileArg = process.argv[3]
const cartFile = path.join(__dirname, cartFileArg)
let cartTotal = 0

// const cart = readFile(cartFile, 'utf-8', (err, jsonString) => {
//   if(err){ 
//     console.log('File read failed:', err)
//   } else {
//     const data = JSON.parse(jsonString)
//     return data 
//   }
// })

// const database = require('../test/base-prices.json');
const cart = require('../test/cart-4560.json');
// const cart = require('../test/cart-9363.json');
// const cart = require('../test/cart-11356.json');

// TO DO: enable buffered data to be read and passed to the checkout function. 

try {
  // default highWaterMark of 64 kb
  const readableStream = fs.createReadStream(__dirname + dbFileArg, {encoding: 'utf8'}) // OR fs.createReadStream('file_path')
  logChunks(readableStream);
  
  // My concern here is, 'What happens if the chunk ends part-way through a db object?'
  async function logChunks(readableStream) {
    for await (const chunk of readableStream) {
      // Returns an object of sorts, but with /n after every new line
      let database = [chunk] 
      // I am working on the returned buffer chunks to remove 
      //the \n from the object to enable mapping.

      // eg.
      // '  {\n' +
      // '    "product-type": "hoodie",\n' +
      // '    "options": {\n' +
      // '      "colour": ["white", "dark"],\n' +
      // '      "size": ["small", "medium"]\n' +
      // '    },\n' +
      // '    "base-price": 3800\n' +
      // '  },\n' +
  
      console.log('database', database)
      checkout(cart, database)
      console.log('cart total', cartTotal, '\n')
    }
  }
} catch (error) {
  console.log('error', error)
}

// To demonstrate the functions that I have written
// I have hard-coded the files above;

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