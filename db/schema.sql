DROP DATABASE IF EXISTS employees_tracer;
CREATE DATABASE employee_tracer;
USE employee_tracer;

-- Created Tables --
CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    employee_title VARCHAR(30) NOT NULL,
    employee_salary DECIMAL(10, 2) NOT NULL,
    department_id INTEGER
);

CREATE TABLE employee(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    employee_role_id INTEGER,
    employee_id INTEGER
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

