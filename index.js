//Connected to the server and Added questions for user//
const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Chalk = require("chalk");
prompt = inquirer.createPromptModule();

connection.connect((error) => {
  if (error) throw error;
});

prompt([
  {
    type: "list",
    message: `${Chalk.bgBlue.black(
      "Welcome to the Employee Tracer. Please click continue to start."
    )}`,
    choices: ["Continue", "End"],
    name: "begin",
  },
]).then((response) => {
  switch (response.start) {
    case "Continue":
      menu();
      break;
    case "End":
      return console.log("Please restart and try again.");
  }
});
//Questions for the user//
function menu() {
  prompt([
    {
      name: "choices",
      type: "list",
      message: `${Chalk.black.bgGreen(
        "Which option would you like to choose?"
      )}`,
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Update Employee Role",
        "Add Department",
        "Add Role",
        "Add Employee",
        "End",
      ],
    },
  ]).then((answers) => {
    const { choices } = answers;
    if (choices === "View All Departments") {
      viewAllEmployees();
    }
    if (choices === "View All Roles") {
      viewAllRoles();
    }
    if (choices === "View All Employees") {
      viewAllDepartments();
    }
    if (choices === "Update Employee Role") {
      updateEmployeeRole();
    }
    if (choices === "Add Department") {
      addEmployee();
    }
    if (choices === "Add Role") {
      addRole();
    }
    if (choices === "Add Employee") {
      addDepartment();
    }
    if (choices === "End") {
      console.log("Thanks for using Employee Tracer. Goodbye!");
      connection.end();
    }
  });
}

