DROP DATABASE IF EXISTS employees_tracer;
CREATE DATABASE employee_tracer;
USE employee_tracer;

-- Created Tables --
CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(40) NOT NULL,BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (department_name)
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    employee_title VARCHAR(50) NOT NULL,
    employee_salary DECIMAL(10, 2) NOT NULL,
    KEY (employee_title),
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)

   
);

CREATE TABLE employee(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    employee_role_id INTEGER,
    employee_id INTEGER,BIGINT NOT NULL,
    FOREIGN KEY (employee_role_id) REFERENCES role(id),
    FOREIGN KEY (employee_id) REFERENCES employee(id),BIGINT NOT NULL,
    PRIMARY KEY (id),
);

CREATE TABLE salary(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    employee_salary DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(id),
    PRIMARY KEY (id)
);

--Employees and Roles--
-- Engineering --
    -- Engineer Manager --
        -- Shelena Brand --
    -- Senior Engineer --
        -- Corrie Brand --
    -- Junior Engineer --
        -- LC Brand --
-- Finance --
    -- CFO --
        -- Mansa Musa --
    -- Senior Accountant --
        -- Ashley Springs --
    -- Accountant --
        -- Danielle McManus --
-- Marketing --
    -- Senior Marketing Manager --
        -- Tiffany Evans --
    -- Marketing Agent --
        -- Denice Dimes --
    -- Marketing Intern --
        -- Betty Rock --
-- Sales --
    -- Senior Sales Manager --
        -- Morgan Faust --
    -- Sales Field Manager --
        -- Skina Marinkey --
    -- Sales Intern --
        -- Jason Jackson --

