require('console.table');
const inquirer = require('inquirer');
const { chose, confirm } = require('./utils/questions');
const mysql = require('mysql2');

const prompt = inquirer.createPromptModule();

const chooseOption = ( type ) => {
    switch (type) {
        case 'View all EMPLOYEES': {
            db.query('SELECT * FROM employee', (err, res) => {
                console.table(employee);
                init();
            });
            break;
        }
        case 'View all DEPARTMENTS': {
            db.query('SELECT * FROM department', (err, res) => {
                console.table(department);
                init();
            });
            break;
        }
        case 'View all ROLES': {
            db.query('SELECT * FROM role', (err, res) => {
                console.table(role);
                init();
            });
            break;
        }
    }
};
        
const init  = () => {
            prompt({
                type: 'list',
                message: 'What would you like to do?',
                choices: [
                    'View All Employees',
                    'View All Departments',
                    'View All Roles',
                ],
                name: 'type',
            })

                .then((answers)) => {
                    chooseOption(answers.type);
                };
            };
                
init();
