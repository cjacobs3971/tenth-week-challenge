async function promptUserInput() {
  const inquirer = await import('inquirer');
  return inquirer.default.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => {
        if (input.length <= 3) {
          return true;
        }
        return 'Please enter up to three characters.';
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (color keyword or hexadecimal number):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['Triangle', 'Circle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (color keyword or hexadecimal number):',
    },
  ]);
}

function saveSVGToFile(svg) {
  const fs = require('fs');
  fs.writeFileSync('logo.svg', svg);
  console.log('Generated logo.svg');
}
//main section of code below in generate logo, other functions in this file are called within this generatelogo function
function generateLogo() {
  promptUserInput()
    .then((answers) => {
      const { text, textColor, shape, shapeColor } = answers;

      const shapeInstance = getShapeInstance(shape);
      shapeInstance.setColor(shapeColor);

      const svg = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          ${shapeInstance.render()}
          <text x="150" y="100" text-anchor="middle" fill="${textColor}" font-size="30">${text}</text>
        </svg>
      `;

      saveSVGToFile(svg);
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

function getShapeInstance(shape) {
  const { Triangle, Circle, Square } = require('./shapes');
  switch (shape) {
    case 'Triangle':
      return new Triangle();
    case 'Circle':
      return new Circle();
    case 'Square':
      return new Square();
    default:
      throw new Error('Invalid shape');
  }
}

module.exports = { generateLogo };
