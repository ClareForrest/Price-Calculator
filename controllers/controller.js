
// Takes in two files and returns cart total from db pricing
function calculating(cart, database){
  let cartTotal = 0
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

  // Allows for modules to be exported to index.js file to run program & for testing. 
  module.exports = {
    calculating,
    searching,
    addMarkup,
  }