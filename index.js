
const path = require('path');
const { readFile, createReadStream } = require('fs');
const { calculating } = require('./controllers/controller.js');
let cartFile
let database

processArgv()
readingFiles(cartFile)

// TO DO: modify function for windowsOS and sanitise file so '\' isn't required
// Process the arguments passed to CLI and get filepath for the passed in file
function processArgv(){
  if(process.argv[2]){
    dbFileArg = process.argv[2]
    database = path.join(__dirname, dbFileArg)
  } else {
    throw Error("Missing/invalid database file, please ensure file is provided in 'file-name.json' format")
  }
  if(process.argv[3]){
    cartFileArg = process.argv[3]
    cartFile = path.join(__dirname, cartFileArg)
  } else {
    throw Error("Missing/invalid cart file, please ensure file is in 'file-name.json' format")
  }
}
// Read the cart file
// Callback method used as readFile does not return a promise
function readingFiles (cartFile){
  readFile(cartFile, 'utf-8', function(err, jsonString) {
    if(err){ 
      console.log('File read failed:', err, "Likely invalid cart file, please ensure file is in the 'file-name.json' format")
    } else {
      let cart = JSON.parse(jsonString)

      try {
        // Convert the database file to a readable stream
        const readableStream = createReadStream(database, {encoding: 'utf-8'})
        logChunks(readableStream);

        // Convert readableStream to JSON object, pass to calculating function
        async function logChunks(readableStream) {
          for await (const chunk of readableStream) {
            let db =  chunk.toString('utf-8')
            const database = JSON.parse(db)

            // Because readableStream is not a variable, the data being read can't be referred to outside of this function
            // Calculating function is called within the readFile and createReadStrem methods in order to pass the data to the calcuclating function
            let cartTotal = calculating(cart, database)
            console.log(`cart total ${cartTotal} \n`)
          }
        }
      } catch (error) {
        console.log('error', error)
      }
    }
  })
}