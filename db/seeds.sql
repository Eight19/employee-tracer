USE employee_tracer;

INSERT INTO department (name)
    VALUES
    ('Engineering'),
    ('Finance'),
    ('Marketing'),
    ('Sales');  

INSERT INTO role (title, salary, department_id)
    VALUES
    ('Engineering Manager', 220000, 1),
    ('Senior Engineer', 190000, 1),
    ('Junior Engineer', 100000, 1),
    ('CFO', 380000, 2),
    ('Senior Accountant', 199900, 2),
    ('Accountant', 167000, 2),
    ('Marketing Manager', 175000, 3),
    ('Marketing Analyst', 150000, 3),
    ('Marketing Agent', 125000, 3),
    ('Sales Manager', 300000, 4),
    ('Sales Agent', 215000, 4),
    ('Sales Assistant', 192000, 4);

INSERT INTO employee (first_name, last_name, role_id)
    VALUES
    ('Shelena', 'Brand', 1),
    ('Corrie', 'Brand', 2),
    ('LC', 'Brand', 3),
    ('Mansa', 'Musa', 4),
    ('Ashley', 'Springs', 5),
    ('Danielle', 'McManus', 6),
    ('Tiffany', 'Evans', 11),
    ('Denice', 'Dimes', 12),
    ('Betty', 'Rock', 7),
    ('Morgan', 'Faust', 8),
    ('Skina', 'Marinkey', 9),
    ('Jason', 'Jackson', 10);