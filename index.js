/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

const qr = require('qr-image');
const fs = require('fs');
const path = require('path');

async function generateQR() {
  const inquirer = await import('inquirer');
  const questions = [
    {
      type: 'input',
      name: 'url',
      message: 'Please enter the URL:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a valid URL.';
        }
      },
    },
  ];

  const answers = await inquirer.default.prompt(questions);

  const qrCode = qr.image(answers.url, { type: 'png' });
  const outputFilePath = path.join(__dirname, 'QRCode.png');

  qrCode.pipe(fs.createWriteStream(outputFilePath));
  console.log(`QR Code generated at ${outputFilePath}`);

  const userInputFilePath = path.join(__dirname, 'UserInput.txt');
  fs.writeFileSync(userInputFilePath, answers.url);
  console.log(`URL saved to ${userInputFilePath}`);
}

generateQR().catch(console.error);
