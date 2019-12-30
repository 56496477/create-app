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

  .action(() => {
    
    inquirer.prompt([
        {
            type: 'input',
            name: 'targetDir',
            message: chalk.blue(`Build directory(${chalk.bold.red(` default:./template-react `)}):`),
            default: () => 'template-react'
        }
    ]).then(({ targetDir }) => {
        
        if (fs.existsSync(path.resolve(targetDir))) {
            console.log(chalk.bold.red('The directory already exists, please input!'));
            process.exit(0);
        }

        // if (fs.existsSync(path.resolve('template-react'))) {
        //     console.log(chalk.bold.red('The template-react default directory already exists, please remove the retry!'));
        //     process.exit(0);
        // }

        spinner.start("generated...");

        exec('git clone https://github.com/56496477/template-react.git', (error, stdout, stderr) => {

            if (error) {
                console.log(chalk.bold.red('Pull error !'));
                process.exit(0);
                return;
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

    })

});

program.parse(process.argv);
