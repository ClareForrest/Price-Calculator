
const path = require('path');
const { readFile, createReadStream } = require('fs');
let cartFile
let cartTotal = 0


// Process the arguments passed to CLI
processArgv()

// Read the cart file
// Callback method used as readFile does not return a promise
readFile(cartFile, 'utf-8', (err, jsonString) => {
  if(err){ 
    console.log('File read failed:', err)
  } else {
    let cart = JSON.parse(jsonString)
    
    try {
      // Convert the database file to a readable stream
      const readableStream = createReadStream(__dirname + dbFileArg, {encoding: 'utf-8'})
      logChunks(readableStream);
    
      // Convert readableStream to JSON object, pass to calculating function
      async function logChunks(readableStream) {
        for await (const chunk of readableStream) {
          let db =  chunk.toString('utf-8')
          const database = JSON.parse(db)

          // Because readableStream is not a variable, the data being read can't be referred to outside of this function
          // Calculating function is called within the readFile and createReadStrem methods in order to pass the data to the calcuclating function
          calculating(cart, database)
          console.log(`cart total $0.${cartTotal} \n`)
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  }
})

// Takes in two files and returns cart total from db pricing
function calculating(cart, database){
  for(let k = 0; k < cart.length; k++){
    let item = cart[k]
    let itemBaseCost = searching(database,  item)
    let itemTotal = addMarkup(itemBaseCost, item['artist-markup'])
    let itemQuantity = item['quantity']
    cartTotal = cartTotal +(itemTotal * itemQuantity)
  }
  return cartTotal
}

// Searching function enables a flexible search for the varying options on different products
function searching(database, cartItem){
  let dbItemsMatchingCartItems = []
  
  // Checks for cartItem product type to match against database
  database.map((product) => {
    if(product['product-type'] === cartItem['product-type']){ 
      dbItemsMatchingCartItems.push(product)
    }  
  })  
  if(dbItemsMatchingCartItems.length === 0){
    throw Error("There are no cartItems matching the provided database")
  } else {
    const productOne = dbItemsMatchingCartItems[0]
    const productKeys = Object.keys(productOne.options)
    
    let matchingProduct
    
    // Checks nested cart key/value pairs against db key/value pairs
    for(let j = 0; j < dbItemsMatchingCartItems.length; j++){        
        // Then checks database options against cartItem options. 
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
  }

  // Calculates the markup from cartItem and calculates against the base price
  function addMarkup(baseCost, artistMarkup){
    return (baseCost + Math.round(baseCost * artistMarkup/100))
  }

  // Get the filepath for the passed in file
  function processArgv(){
    if(process.argv[2]){
      dbFileArg = process.argv[2]
      database = path.join(__dirname, dbFileArg)
    } else {
      throw Error("Missing/invalid database file, please ensure file is provided in '/file-name.json' format")
    }
    if(process.argv[3]){
      cartFileArg = process.argv[3]
      cartFile = path.join(__dirname, cartFileArg)
    } else {
      throw Error("Missing/invalid cart file, please ensure file is in '/file-name.json' format")
    }
  }

  // Allows for modules to be exported for testing. 
  module.exports = {
    addMarkup,
    calculating,
    searching,
    processArgv,
  }