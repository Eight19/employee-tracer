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
        "Please select from the following options?"
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
    if (choices === "Employee Role Update") {
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
//Connects the employee to the role and manager//
//Questions for the user to update the employee role//
const addEmployee = () => {
  prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
    },
  ]).then((answer) => {
    const crit = [answer.firstName, answer.lastName];
    const roleSql = `SELECT role.id, role.title FROM role`;
    connection.query(roleSql, (error, data) => {
      if (error) throw error;
      const roles = data.map(({ id, title }) => ({ name: title, value: id }));
      prompt([
        {
          type: "list",
          name: "role",
          message: "What is the employee's role?",
          choices: roles,
        },
      ]).then((roleChoice) => {
        const role = roleChoice.role;
        crit.push(role);
        const managerSql = `SELECT * FROM employee`;
        connection.query(managerSql, (error, data) => {
          if (error) throw error;
          const managers = data.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id,
          }));
          prompt([
            {
              type: "list",
              name: "manager",
              message: "Who is the employee's manager?",
              choices: managers,
            },
          ]).then((managerChoice) => {
            const manager = managerChoice.manager;
            crit.push(manager);
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                  VALUES (?, ?, ?, ?)`;
            connection.query(sql, crit, (error) => {
              if (error) throw error;
              console.log(
                "------------------------------------------------------------------"
              );
              console.log("Employee added successfully!");
              viewAllEmployees();
            });
          });
        });
      });
    });
  });
};

//Connects the department to new role//
//Questions for the user to add a new role//
const addRole = () => {
  const sql = "SELECT * FROM department";
  connection.query(sql, (error, response) => {
    if (error) throw error;
     let deptNamesArray = [];
    response.forEach((department) => {
      deptNamesArray.push(department.department_name);
    });
    deptNamesArray.push("Create Department");
    prompt([
      {
        name: "departmentName",
        type: "list",
        message: "Which department does this role belong to?",
        choices: deptNamesArray,
      },
    ]).then((answer) => {
      if (answer.departmentName === "Create Department") {
        this.addDepartment();
      } else {
        addRoleResume(answer);
      }
    });
//Connects new role to updated salary//
//Question to add new role and salary//
    const addRoleResume = (departmentData) => {
      prompt([
        {
          name: "newRole",
          type: "text",
          message: "What is the new role?",
        },
        {
          name: "salary",
          type: "text",
          message: "What is the new salary?",
        },
      ]).then((answer) => {
        let createdRole = answer.newRole;
        let departmentId;

        response.forEach((department) => {
          if (departmentData.departmentName === department.department_name) {
            departmentId = department.id;
          }
        });

        let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        let crit = [createdRole, answer.salary, departmentId];

        connection.query(sql, crit, (error) => {
          if (error) throw error;
          console.log(
            "------------------------------------------------------------------"
          );
          console.log("Role created!");
          viewAllRoles();
        }); });
    };
  });
};
//Connects the department to new role//
//Question for the user to add a new department for employee//
const addDepartment = () => {
  prompt([
        {
          name: 'newDepartment',
          type: 'text',
          message: 'Enter the new department name.'
        }
      ])
      .then((answer) => {
        let sql = `INSERT INTO department (department_name) VALUES (?)`;
        connection.query(sql, answer.newDepartment, (error, response) => {
          if (error) throw error;
          console.log(
            "------------------------------------------------------------------"
          );
          console.log(answer.newDepartment + " department added!");
          viewAllDepartments();
        });
      });
  };
  
  //Connects the employee to new role//
  //Question for the user to update the employee role//
  const updateEmployeeRole = () => {
  
    let employeesArray = []
  
    connection.query(
        `SELECT first_name, last_name FROM employee`,
        (err, res) => {
            if (err) throw err;
            prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee has a new role?",
                    choices() {
                        res.forEach(employee => {
                            employeesArray.push(`${employee.first_name} ${employee.last_name}`);
                        });
                        return employeesArray;
                    }
                },
                {
                  //Question for the user to update new role id//
                    type: "input",
                    name: "role",
                    message: `Choose the new role ID.${Chalk.red('\nDesigner: 1\nSenior Designer: 2\nPresident: 3\nIntern: 4\nConsultant: 5\nPress: 6\nTemp: 7\n' + Chalk.cyan('Your Answer: '))}`
                }
            ]).then( (answers) => {
  
                const updateEmployeeRole = answers.employee.split(' ');
                const updateEmployeeRoleFirstName = JSON.stringify(updateEmployeeRole[0]);
                const updateEmployeeRoleLastName = JSON.stringify(updateEmployeeRole[1]);
  
                connection.query(
                    `UPDATE employee
                    SET role_id = ${answers.role}
                    WHERE first_name = ${updateEmployeeRoleFirstName}
                    AND last_name = ${updateEmployeeRoleLastName}`,
  
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                          "------------------------------------------------------------------"
                        );
                        console.log("Employee role has been updated!");
                        viewAllEmployees();
                    });
            });
        }
    );  
  };
  
  init();