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
  const selectNameAndValues = (table, firstName, lastName, value) => {
    return db.promise().query('SELECT CONCAT(??, " ", ??) AS name, ?? AS value FROM ??', [firstName, lastName, value, table]);
  };
  
  //Department and Role IDs for inquirer//
  const selectValues = (table, name, value) => {
    return db.promise().query('SELECT ?? AS name, ?? AS value FROM ??', [name, value, table]);
  }
  
  //Table of all employees printed//
  const selectEmployeeDetails = async () => {
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
  

