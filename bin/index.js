#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { readFile } = require('fs');

// Get the filepath for the passed in file
const dbFileArg = process.argv[2]
const cartFileArg = process.argv[3]
const cartFile = path.join(__dirname, cartFileArg)
let cartTotal = 0

try {
  // Read the file
  readFile(cartFile, 'utf-8', (err, jsonString) => {
    if(err){ 
      console.log('File read failed:', err)
    } else {
      let cart = JSON.parse(jsonString)

      // default highWaterMark of 64 kb
      const readableStream = fs.createReadStream(__dirname + dbFileArg, {encoding: 'utf-8'})
      logChunks(readableStream);
      
      // CONCERN/FUTURE RESEARCH: 'What happens if the chunk ends part-way through a db object?'
      
      // Convert readableStream to JSON object, pass to checkout function
      async function logChunks(readableStream) {
        for await (const chunk of readableStream) {
          let db =  chunk.toString('utf-8')
          const database = JSON.parse(db)
          checkout(cart, database)
          console.log('cart total', cartTotal, '\n')
        }
      }
    }
  })
} catch (error) {
  console.log('error', error)
}

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