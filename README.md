# Software Development Plan

### Statement of purpose and scope; 

**Purpose Statement:**
Create a price calculator command-line program in any language

**Scope:**
1. Accept 2 command-line arguments
2. Output the total price of the cart 
  a. in cents 
  b. followed by a newline character
3. Handle products with any options, even ones not found in the sample files
4. Time complexity to be O(n)
5. Include thorough, automated tests
6. Include any necessary instructions on how to install your program, run it, and run the tests
7. Your code should clearly reflect and explain the problem domain
8. Write code which you can easily extend

**Domain Model:**
[Domain Model for an Online Marketplace - Buyer only]('./docs/online-marketplace-domain-model.png')

**Installation & Setup:**
1. Program runs on macOS/Linux only - not suitable for Windows due to filepath creation
2. Install node.js -v 14.16.0
3. Run npm install to install dependencies
4. Save any files to be referenced in the source directory where index.js is located 

**Running the Program:**
1. Reference files (to pass to program) must be saved in the root directory where index.js is located 
2. cd to root directory
3. Run either `npm start` or `node index.js` followed by TWO files(filename only). 
  First is the file that you will use as the database. Second is the cart you wish to use at checkout
   File example `/base-prices.json` OR `base-prices.json`
   Full CLI example `node index.js /base-prices.json /cart-4560.json` OR `node index.js base-prices.json cart-4560.json`

**Testing:**
Unit and Integration Tests have been written.
The libraries used are mocha and chai with the 'expect' syntax
A script has been created to enable automated testing of all tests. 
1. Run the test script to run all tests
  For example: `npm test`

**Functionality:**
Redbubble has asked that the CLI program complete the following;

1. Accept 2 command-line arguments
ARGV array accessed to save user input to appropriate constant variables

2. Output the total price of the cart 
  a. in cents 
  b. followed by a newline character
console.log used to return constant variable from calculating function

3. Handle products with any options, even ones not found in the sample files

4. Time complexity to be O(n)
.map and .filter methods both have a time complexity Big O Notation of O(n)

5. Include thorough, automated tests
Mocha and chai testing packages have been required and utilised in the creation of unit, integration and end-to-end tests

6. Include any necessary instructions on how to install your program, run it, and run the tests
Instructions included above under the headings; Installation & Setup, Running the Program, Testing

7. Your code should clearly reflect and explain the problem domain
Code comments have been included where appropriate

8. Write code which you can easily extend
The code has been written as components where possible to allow for ease of extension/modification

# Resources
Node:
[scripts](https://nodejs.dev/learn/run-nodejs-scripts-from-the-command-line)
[argv](https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line)
[object keys](https://www.geeksforgeeks.org/object-keys-javascript/)
[javascript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

fs; readFile and createReadStream
[fs.createReadstream](https://nodejs.org/docs/latest/api/fs.html#fs_fs_createreadstream_path_options)
[async/await readable stream](https://2ality.com/2019/11/nodejs-streams-async-iteration.html)
[fs.readfile](https://nodejs.org/docs/latest/api/fs.html#fs_fs_readfile_path_options_callback)
[fs.read](https://betterprogramming.pub/a-memory-friendly-way-of-reading-files-in-node-js-a45ad0cc7bb6)
[streams](https://nodejs.dev/learn/nodejs-streams)
[fs.readFile](https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824)

Buffer
[Buffer Encoding](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings)

Big O Notation:
[Time Complexity diagrams](http://www.eenboekskast.nl/big-o-cheatsheet/)

Path:
[path](https://nodejs.org/api/path.html)
