const { readFile } = require('fs');
const path = require('path');

// I have not been able to read two files from the argument line. 
// From my research, using Streams is the most memory efficient way of reading large files
// I have no experience with buffers or streams as yet and have not been able to apply
// what I have read to date. 
// Below is a pseudocode style for another method - readFile - which works similarly
// But is not quite as memory efficient for large files which is one of the requirements
// for the task. 

// Get the filepath for the passed in file
const dbFileArg = process.argv[2]
const dbFile = path.resolve('/bin', dbFileArg)
const cartFileArg = process.argv[3]
const cartFile = path.resolve('bin', cartFileArg)

function jsonReader(filepath, callback) {
  callback(filepath)
}

function cb() {
readFile(filepath, 'utf-8', (err, jsonString) => {
  if(err){ 
    console.log('File read failed:', err)
  } else {
    const data = JSON.parse(jsonString)
    return data
  }
})
}

const cart = readFile(cartFile, 'utf-8', (err, jsonString) => {
  if(err){ 
    console.log('File read failed:', err)
  } else {
    const data = JSON.parse(jsonString)
    return data 
  }
})

jsonReader(dbFile, cb)
jsonReader(cartFile, cb)