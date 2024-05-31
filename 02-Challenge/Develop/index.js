const inquirer = require('inquirer');
const fs = require('fs');

// Questions array for user input
const questions = [
    "Please enter the title of your application?", 
    "Enter the description of your application?",
    "How to install this application?", 
    "How to use this application?",
    "What license does this program use?", 
    "Name the contributors' GitHub usernames separated by a comma",
    "How should tests be performed?", 
    "Preferred method of contact?", 
    "Message to what phone number?", 
    "Message to what email?", 
    "What GitHub username should be messaged?", 
];

// Function to write README file
function writeToFile(fileName, data) {
    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
    }
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            
            console.log("File written successfully");
        }
    });
}

function renderLicenseLink(license) {
    switch (license) {
        case 'MIT License':
            return `[MIT license](https://opensource.org/licenses/MIT)`;
        case 'GNU General Public License':
            return `[GNU General Public License](https://opensource.org/licenses/GPL-3.0)`;
        case `Apache License 2.0`:
            return `[Apache License 2.0](https://opensource.org/licenses/Apache-2.0)`;
        case `BSD License`:
            return `[BSD License](https://opensource.org/licenses/BSD-3-Clause)`;
        case `Mozilla Public License 2.0`:
            return `[Mozilla Public License 2.0](https://opensource.org/licenses/MPL-2.0)`;
        case `Creative Commons License`:
            return `[Creative Commons License](https://creativecommons.org/licenses/)`;
        case `None`:
            return `None`;
    }
}

// Function to generate README content
function generateReadMe(response, contactLine) {
    const contributorsList = response.contributors.split(',')
        .map(contributor => contributor.trim())
        .map(contributor => `[${contributor}](https://github.com/${contributor})`)
        .join('\n');

    return `
# ${response.title}, ${renderLicenseLink(response.license)}
${response.description}

## Table of Contents
- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${response.instructions}

## Usage
${response.usage}

## License
This application falls under the ${response.license}. Find further details in the repository.

## Contributing
Contributing members are thanked and appreciated:
${contributorsList}

## Tests
${response.tests}

## Questions
If you have any questions, contact a team member by ${response.contact} at ${contactLine}`;
}

// Function to initialize app
function init() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: questions[0],
                name: 'title',
            },
            {
                type: 'input',
                message: questions[1],
                name: 'description',
            },
            {
                type: 'input',
                message: questions[2],
                name: 'instructions',
            },
            {
                type: 'input',
                message: questions[3],
                name: 'usage',
            },
            {
                type: 'list',
                message: questions[4],
                choices: ['MIT License','GNU General Public License','Apache License 2.0','BSD License','Mozilla Public License 2.0','Creative Commons License'],
                name: 'license',
            },
            {
                type: 'input',
                message: questions[5],
                name: 'contributors',
            },
            {
                type: 'input',
                message: questions[6],
                name: 'tests',
            },
            {
                type: 'list',
                message: questions[7],
                choices: ['phone', 'email', 'github'],
                name: 'contact',
            },
        ])
        .then((response) => {
            console.log('Primary Response:', response);
            let contactLine = '';
            if (response.contact === 'phone') {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: questions[8],
                        name: 'phone',
                    }
                ]).then((contactResponse) => {
                    contactLine = contactResponse.phone;
                    console.log('Contact Response (Phone):', contactResponse);
                    const readMe = generateReadMe(response, contactLine);
                    writeToFile('README.md', readMe);
                });
            } else if (response.contact === 'email') {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: questions[9],
                        name: 'email',
                    }
                ]).then((contactResponse) => {
                    contactLine = contactResponse.email;
                    console.log('Contact Response (Email):', contactResponse);
                    const readMe = generateReadMe(response, contactLine);
                    writeToFile('README.md', readMe);
                });
            } else if (response.contact === 'github') {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: questions[10],
                        name: 'github',
                    }
                ]).then((contactResponse) => {
                    contactLine = contactResponse.github;
                    console.log('Contact Response (GitHub):', contactResponse);
                    const readMe = generateReadMe(response, contactLine);
                    writeToFile('README.md', readMe);
                });
            }
        });
}

// Function call to initialize app
init();
