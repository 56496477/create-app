#!/usr/bin/env node

const { exec } = require("child_process");
const program = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const Ora = require("ora");
const fs = require("fs");
const path = require("path");

const spinner = new Ora();

program.version("0.0.1", "-v, --version", "new version message");

program
  .command("create")
  .description("Create a new react template")
  .action(async () => {

    const { type } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Please select the scaffolding type:',
            name: 'type',
            choices: [
                "javascript",
                "typescript",
            ]
        }
    ])

    if(type === 'javascript') {
        await downloadJs();
    }
    if(type === 'typescript') {
        await downloadTs();
    }

});

async function downloadJs() {

    const { targetDir } = await inquirer.prompt([
        {
            type: 'input',
            name: 'targetDir',
            message: chalk.blue(`${chalk.bold.red(`Build directory`)}:`),
            validate: function(val = '') {
                return val !== '';
            }
        }
    ]);

    if (fs.existsSync(path.resolve(targetDir))) {
        console.log(chalk.bold.red('The directory already exists, please input!'));
        process.exit(0);
    }

    spinner.start("generated...");

    exec('git clone https://github.com/56496477/template-react.git', (error) => {

        if (error) {
            console.log(chalk.bold.red('Pull error !'));
            process.exit(0);
        }

        if (targetDir !== 'template-react') {
            exec(`mv template-react/ ${targetDir}`);
        }

        exec(`rm -rf ${targetDir}/.git`);

        spinner.succeed('Successful...!');

        console.log(chalk.green`The project has been built successfully: `)
        console.log(chalk.blue(`1.Enter the working directory: cd ${targetDir}`));
        console.log(chalk.blue(`2.yarn or npm install`));
        console.log(chalk.blue(`enjoy it !`));

    });
}

async function downloadTs() {

    const { targetDir } = await inquirer.prompt([
        {
            type: 'input',
            name: 'targetDir',
            message: chalk.blue(`${chalk.bold.red(`Build director`)}:`),
            validate: function(val = '') {
                return val !== '';
            }
        }
    ]);

    if (fs.existsSync(path.resolve(targetDir))) {
        console.log(chalk.bold.red('The directory already exists, please input!'));
        process.exit(0);
    }

    spinner.start("generated...");

    exec('git clone https://github.com/56496477/typescript-cli.git', (error) => {

        if (error) {
            console.log(chalk.bold.red('Pull error !'));
            process.exit(0);
        }

        if (targetDir !== 'typescript-cli') {
            exec(`mv typescript-cli/ ${targetDir}`);
        }

        exec(`rm -rf ${targetDir}/.git`);

        spinner.succeed('Successful...!');

        console.log(chalk.green`The project has been built successfully: `)
        console.log(chalk.blue(`1.Enter the working directory: cd ${targetDir}`));
        console.log(chalk.blue(`2.yarn or npm install`));
        console.log(chalk.blue(`enjoy it !`));

    });
}


program.parse(process.argv);
