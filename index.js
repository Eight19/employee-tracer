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
//Start-up question for the user//
function menu() {
  prompt([
    {
      name: "choices",
      type: "list",
      message: `${Chalk.black.bgGreen(
        "Which option would you like to choose?"
      )}`,
      choices: [
        "See All Departments",
        "See All Roles",
        "See All Employees",
        "Update Employee Role",
        "Add Department",
        "Add Role",
        "Add Employee",
        "End",
      ],
    },
  ]).then((answers) => {
    const { choices } = answers;
    if (choices === "See Departments") {
      seeEmployees();
    }
    if (choices === "See Roles") {
      seeRoles();
    }
    if (choices === "see Employees") {
      seeDepartments();
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
//Department selection//
const seeDepartments = () => {
  let sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(
      "------------------------------------------------------------------"
    );
    console.log(`${Chalk.bgYellow("List of Departments:\n")}`);
    console.table(response);
    console.log(
      "------------------------------------------------------------------"
    );
    menu();
  });
};

//Employee selection//
const seeEmployees = () => {
let sql = `SELECT employee.id, 
            employee.first_name, 
            employee.last_name, 
            department.department_name AS 'department', 
            role.title, 
            role.salary
            FROM employee, role, department 
            WHERE department.id = role.department_id 
            AND role.id = employee.role_id
            ORDER BY employee.id ASC`;
connection.query(sql, (error, response) => {
  if (error) throw error;
  console.log(
    "------------------------------------------------------------------"
  );
  console.log(`${Chalk.bgCyan("All Employees:\n")}`);
  console.table(response);
  console.log(
    "------------------------------------------------------------------"
  );
  menu();
});
};
//ROLE selection//
const seeRoles = () => {
let sql = `SELECT role.id, role.title, department.department_name AS department
FROM role
INNER JOIN department ON role.department_id = department.id`;
connection.query(sql, (error, response) => {
  if (error) throw error;
  console.log(
    "------------------------------------------------------------------"
  );
  console.log(`${Chalk.yellow("List of Roles:\n")}`);
  response.forEach((role) => {
    console.log(role.title);
  });
  console.log(
    "------------------------------------------------------------------"
  );
  menu();
});
};
