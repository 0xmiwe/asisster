const colors = require('colors');

function displayHeader() {
  // Clear the terminal screen
  process.stdout.write('\x1Bc');
  
  // Print header
  console.log('========================================'.cyan);
  console.log('=              assisterr              ='.cyan);
  console.log('=           Auto-Daily-Claim          ='.cyan);
  console.log('========================================'.cyan);
  console.log(); // Print an empty line for spacing
}

module.exports = { displayHeader };
