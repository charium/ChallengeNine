const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    "Please enter the title of your application?", 
    "Enter the description of your application?",
    "How to install this application?", 
    "How to use this application?",
    "Please enter the repo link", 
    "Please enter the deployed page link", 
    "What license does this program use?", 
    "Name the contributors' GitHub usernames separated by a comma",
    "How should tests be performed?", 
    "Preferred method of contact?", 
    "What phone number?", 
    "What email?", 
    "What GitHub should be messaged?"
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File written successfully");
        }
    });
}

// Function to generate README content
function generateReadMe(response, contactLine) {
    const contributorsList = response.contributors.split(',')
        .map(contributor => contributor.trim())
        .map(contributor => `[${contributor}](https://github.com/${contributor})`)
        .join('\n');

    return `
# ${response.title}
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

## Repository Link
[Repository Link](${response.linkRepo})

## Deployed Page Link
[Deployed Page Link](${response.linkDeployed})

## License
Please refer to the ${response.license} in the repo.

## Contributing
Contributing members are thanked and appreciated:
${contributorsList}

## Tests
${response.tests}

## Questions
If you have any questions, contact a team member by ${response.contact} at ${contactLine}`;
}

// TODO: Create a function to initialize app
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
                type: 'input',
                message: questions[4],
                name: 'linkRepo',
            },
            {
                type: 'input',
                message: questions[5],
                name: 'linkDeployed',
            },
            {
                type: 'list',
                message: questions[6],
                choices: ['MIT License','GNU General Public','LicenseApache License 2.0','BSD License','Mozilla Public License 2.0','Creative Commons License'],
                name: 'license',
            },
            {
                type: 'input',
                message: questions[7],
                name: 'contributors',
            },
            {
                type: 'input',
                message: questions[8],
                name: 'tests',
            },
            {
                type: 'list',
                message: questions[9],
                choices: ['phone', 'email', 'github'],
                name: 'contact',
            },
        ])
        .then((response) => {
            let contactLine = '';
            if (response.contact === 'phone') {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: questions[10],
                        name: 'phone',
                    }
                ]).then((contactResponse) => {
                    contactLine = contactResponse.phone;
                    const readMe = generateReadMe(response, contactLine);
                    writeToFile('README.md', readMe);
                });
            } else if (response.contact === 'email') {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: questions[11],
                        name: 'email',
                    }
                ]).then((contactResponse) => {
                    contactLine = contactResponse.email;
                    const readMe = generateReadMe(response, contactLine);
                    writeToFile('README.md', readMe);
                });
            } else if (response.contact === 'github') {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: questions[12],
                        name: 'github',
                    }
                ]).then((contactResponse) => {
                    contactLine = contactResponse.github;
                    const readMe = generateReadMe(response, contactLine);
                    writeToFile('README.md', readMe);
                });
            }
        });
}

// Function call to initialize app
init();
