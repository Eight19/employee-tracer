const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

require('console.table');

const mysql = require('mysql2');
const db = mysql.createConnection({
  user: "root",
  database: "employee_db",
});
//Function to perform SQL query SELECT * FROM table//
const selectAll = async (table, display) => {
    const results = await db.promise().query('SELECT * FROM ' + table);
    if (display) {
      console.table(results[0]);
      return init();
    }
    return results;
  };
  
  //Function for SQL query to insert data from addRole and addEmployee//
  const insert = (table, data) => {
    db.query('INSERT INTO ?? SET ?', [table, data], (err) => {
      if (err) return console.error(err);
      console.log('\nSuccessfully created!\n');
      init();
    });
  };
  
  //Function for SQL query to update database within parameters//
  const update = (table, roleId, employeeId) => {
      db.query('UPDATE ?? SET ? WHERE employee.id = ?', [table, roleId, employeeId], (err) => {
          if (err) return console.error(err);
          console.log('\nSuccessfully updated!\n')
          init();
      });
  }
  
  //Name and ID selection for inquirer//
  const selectNameAndValue = (table, firstName, lastName, value) => {
    return db.promise().query('SELECT CONCAT(??, " ", ??) AS name, ?? AS value FROM ??', [firstName, lastName, value, table]);
  };
  
  //Department and Role IDs for inquirer//
  const selectValue = (table, name, value) => {
    return db.promise().query('SELECT ?? AS name, ?? AS value FROM ??', [name, value, table]);
  }
  
  //Table of all employees printed//
  const selectDetailsOfEmployee = async () => {
    const statement = `
      SELECT
      employee.id,
      employee.first_name,
      employee.last_name,
      role.title,
      role.salary,
      CONCAT(
          manager.first_name,
          ' ',
          manager.last_name
      ) AS manager
      FROM employee
      JOIN role
      ON employee.role_id = role.id
      JOIN employee AS manager
      ON employee.manager_id = manager.id
      `
      const [employees] = await db.promise().query(statement);
      console.table(employees);
      init();
  };
  //Adds a role to the database//
const addRole = async () => {
    const [departments] = await selectValue('department', 'name', 'id');
    prompt([
        {
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'rawlist',
            name: 'department_id',
            message: 'What department does this role belong to?',
            choices: departments
        }
    ])
    .then((answers) => {
        insert('role', answers);
    })
}

//Function to add an employee//
const addEmployee = async () => {
  const [roles] = await selectValue('role', 'title', 'id');
  const [managers] = await selectNameAndValue('employee', 'first_name', 'last_name', 'id');
  prompt([
    {
      name: 'first_name',
      message: 'Enter the first name of the employee.',
    },
    {
      name: 'last_name',
      message: 'Enter the last name of the employee.',
    },
    {
      type: 'rawlist',
      name: 'role_id',
      message: 'Select the employee role.',
      choices: roles,
    },
    {
      type: 'rawlist',
      name: 'manager_id',
      message: 'Select the employee manager.',
      choices: managers,
    }
  ])
  .then((answers) => {
    insert('employee', answers);
  });
};

//Function to update Role//
const updateRole = async () => {
    const [roles] = await selectValue('role', 'title', 'id');
    const [employees] = await selectNameAndValue('employee', 'first_name', 'last_name', 'id');
    prompt([
        {
            type: 'rawlist',
            name: 'id',
            message: 'Which employee role is being updated?',
            choices: employees
        },
        {
            type: 'rawlist',
            name: 'role_id',
            message: 'What\'s the employee\'s new role?',
            choices: roles
        }
    ])
    .then((answers) => {
        const roleId = {role_id: answers.role_id};
        update('employee', roleId, answers.id);
    })
}

//Function to update manager//
const updateManager = async () => {
    const [managers] = await selectNameAndValue('employee', 'first_name', 'last_name', 'id');
    const [employees] = await selectNameAndValue('employee', 'first_name', 'last_name', 'id');
    prompt([
        {
            type: 'rawlist',
            name: 'id',
            message: 'Which employee role is being updated?',
            choices: employees
        },
        {
            type: 'rawlist',
            name: 'manager_id',
            message: 'Who is the employee\'s new manager?',
            choices: managers
        }
    ])
    .then((answers) => {
        const managerId = {manager_id: answers.manager_id};
        update('employee', managerId, answers.id);
    })
}
// Switch case for the possible cases provided below
const selectOption = (type) => {
    switch (type) {
      case 'View All Employees': {
        selectAllEmployeeDetails();
        break;
      }
      case 'View All Departments': {
        selectAll('department', true);
        break;
      }
      case 'View All Roles': {
        selectAll('role', true);
        break;
      }
      case 'Add Employee': {
        addEmployee();
        break;
      }
      case 'Add Role': {
        addRole();
        break;
      }
      case 'Update Employee Role': {
        updateRole();
        break;
      }
      case 'Update Employee Manager': {
        updateManager();
        break;
      }
      case 'Done': {
        process.exit();
      }
    }
  };
  
  // Initial prompt that can be repeated indefinitely or exited via 'Done'
  const init = () => {
    prompt({
      type: 'rawlist',
      message: 'Choose one of the following:',
      choices: [
        'View All Employees',
        'View All Departments',
        'View All Roles',
        'Add Employee',
        'Add Role',
        'Update Employee Role',
        'Update Employee Manager',
        'Done'
      ],
      name: 'type',
    })
      .then((answers) => {
        selectOption(answers.type);
      });
  };
  
  init();
 
  

