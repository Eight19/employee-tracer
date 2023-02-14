const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

require('console.table');

const mysql = require('mysql2');
const db = mysql.createConnection({
  user: "root",
  database: "employee_db",
});


