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

**Installation & Setup:**
1. Install node.js -v 6.14.11
2. Install git
3. In the terminal git clone the app to your home directory
4. npm install to install required dependencies
5. Run the start executable to start the app (npm start)
~/redububble/bin/index

**Testing:**
Unit, Integration and End-to-end Tests have been written.
The libraries used are mocha and chai with the 'expect' syntax
A script has been created to enable automated testing of all tests. 
1. Run the test executable to run all tests (npm test)
~redbubble/test/test

**Functionality:**

Redbubble has asked that the CLI program complete the following;

1. Accept 2 command-line arguments
Two options considered; 
- readline package required for user interaction and CLI arguments
- ARGV array accessed to save user responses to appropriate constant variables

2. Output the total price of the cart 
    a. in cents 
    b. followed by a newline character
    console.log used to return constant variable from calculating function

3. Handle products with any options, even ones not found in the sample files

4. Time complexity to be O(n)
.map and for loop methods both have a time complexity Big O Notation of O(n)

5. Include thorough, automated tests
mocha and chai testing packages have been required and utilised in the creation of unit, integration and end-to-end tests
a script has been created to run all tests automatically 

6. Include any necessary instructions on how to install your program, run it, and run the tests
yargs library has been required for future option to create a help menu for the user

7. Your code should clearly reflect and explain the problem domain
code comments have been included where appropriate

8. Write code which you can easily extend
the code has been written as components where possible to allow for ease of extension/modification

# Resources
Node:
[readline](https://nodejs.org/api/readline.html)
[scripts](https://nodejs.dev/learn/run-nodejs-scripts-from-the-command-line)
[argv](https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line)
[fs.readfile](https://nodejs.org/docs/latest/api/fs.html#fs_fs_readfile_path_options_callback)
[fs.read](https://betterprogramming.pub/a-memory-friendly-way-of-reading-files-in-node-js-a45ad0cc7bb6)
[streams](https://nodejs.dev/learn/nodejs-streams)
[fs.readFile](https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824)
[object keys](https://www.geeksforgeeks.org/object-keys-javascript/)
[javascript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

Big O Notation:
[Time Complexity diagrams](http://www.eenboekskast.nl/big-o-cheatsheet/)

yargs:
[yargs](https://www.npmjs.com/package/yargs)
