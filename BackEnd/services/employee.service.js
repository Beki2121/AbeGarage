// import the query function from the db.config.js file
const connection = require("../config/db.config");

// import the crypto module to generate random id
const crypto = require("crypto");

// Import the bcrypt module
const bcrypt = require("bcrypt");

// A function to check employee existance
async function checkIfEmployeeExists(email) {
  try {
    const query = "SELECT * FROM employee Where employee_email = ?";

    const rows = await connection.query(query, [email]);

    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error)
  }
}

// A function to  create employee
async function createEmploye(employee) {
  let createdEmployee = {};

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);

    const hash_id = crypto.randomUUID();

    // hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    // Insert the email in to the employee table
    const queryEmployee =
      "INSERT INTO employee (employee_email,active_employee) VALUES (?,?)";

    const rows = await connection.query(queryEmployee, [

      employee.employee_email,
      employee.active_employee,
    ]);

    if (rows.affectedRows !== 1) {
      return false;
    }

    // Get the employee id from the insert
    const employee_id = rows.insertId;

    // insert the employee_info table data

    const queryEmployeeInfo =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?,?,?,?)";

    const rows2 = await connection.query(queryEmployeeInfo, [
   
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);

    // insert the employee_pass table data
    const queryEmployeePass =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?,?)";

    const rows3 = await connection.query(queryEmployeePass, [
   
      employee_id,
      hashedPassword,
    ]);

    // insert the employee_role table data
    const queryEmployeeRole =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?,?)";

    const rows4 = await connection.query(queryEmployeeRole, [
     
      employee_id,
      employee.company_role_id,
    ]);

    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (error) {
    // console.log(error);
  }

  // return the employee object
  return createdEmployee;
}

// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  try {
    const query =
      "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";

    const rows = await connection.query(query, [employee_email]);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

// A FUNCTION TO GET SINGLE EMPLOYEE BY HASH ID
async function getSingleEmployeeService(employee) {
  try {
    const employee_id = employee;

    const query =
      "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id WHERE employee.employee_id = ?";

    const rows = await connection.query(query, [employee_id]);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

// A function to get all employees
async function getAllEmployees() {
  try {
    const query =
      "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.active_employee DESC, employee_info.employee_first_name ASC LIMIT 40";

    const rows = await connection.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

// A function to update employees by id
async function updateEmployeeService(employee) {
  try {
    // Check if all required fields are provided
    const {
      employee_id,
      employee_first_name,
      employee_last_name,
      employee_phone,
      company_role_id,
      employee_email,
      active_employee,
    } = employee;

    if (
      employee_id === undefined ||
      employee_first_name === undefined ||
      employee_last_name === undefined ||
      employee_phone === undefined ||
      company_role_id === undefined ||
      employee_email === undefined ||
      active_employee === undefined
    ) {
      throw new Error("One or more parameters are undefined.");
    }

    // Log the input data
    console.log("Updating employee with data:", employee);

    const query1 = `UPDATE employee_info SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? WHERE employee_id = ?`;

    const query2 = `UPDATE employee_role SET company_role_id = ? WHERE employee_id = ?`;

    const query3 = `UPDATE employee SET employee_email = ?, active_employee = ? WHERE employee_id = ?`;

    // for employee_info table
    const rows1 = await connection.query(query1, [
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_id,
    ]);

    // for employee_role table
    const rows2 = await connection.query(query2, [
      company_role_id,
      employee_id,
    ]);

    // for employee table
    const rows3 = await connection.query(query3, [
      employee_email,
      active_employee,
      employee_id,
    ]);

    return { rows1, rows2, rows3 };
  } catch (error) {
    console.log("Error updating employee:", error);
    throw error;
  }
}

// A function to delete employees by id
async function ServicedeleteEmployee(employee_id) {
  console.log("employee to be deleted id>>>",employee_id);

  try{

  const query1 = "DELETE FROM employee_info WHERE  employee_id = ?";

  const query2 = "DELETE FROM employee_role WHERE employee_id = ?";

  const query3 = "DELETE FROM employee_pass WHERE employee_id = ?";

  const query4 = "DELETE FROM employee WHERE employee_id = ?";

  const rows1 = await connection.query(query1, [employee_id]);

  const rows2 = await connection.query(query2, [employee_id]);

  const rows3 = await connection.query(query3, [employee_id]);

  const rows4 = await connection.query(query4, [employee_id]);

  return { rows1, rows2, rows3, rows4 };
} catch (error) {
  console.error("Error deleting employee:", error);
  throw new Error("Could not delete employee. Please try again later.");
}
}

// Get monthly work hours for all employees, or a single employee if employeeId is provided
async function getMonthlyWorkHours({ month, year, employeeId }) {
  let query = `
    SELECT 
      wh.work_hour_id,
      e.employee_id, 
      ei.employee_first_name, 
      ei.employee_last_name, 
      v.vehicle_id, 
      v.vehicle_make, 
      v.vehicle_serial,
      wh.work_date, 
      wh.total_hours
    FROM employee_work_hours wh
    INNER JOIN employee e ON wh.employee_id = e.employee_id
    INNER JOIN employee_info ei ON e.employee_id = ei.employee_id
    INNER JOIN customer_vehicle_info v ON wh.vehicle_id = v.vehicle_id
    WHERE MONTH(wh.work_date) = ? AND YEAR(wh.work_date) = ?
  `;
  const params = [month, year];
  if (employeeId) {
    query += ' AND e.employee_id = ?';
    params.push(employeeId);
  }
  query += `
    ORDER BY ei.employee_first_name, v.vehicle_make, wh.work_date
  `;
  const rows = await connection.query(query, params);
  return rows;
}

// Update employee work hours by work_hour_id
async function updateEmployeeWorkHours(work_hour_id, { start_time, end_time, total_hours }) {
  // Build dynamic query based on provided fields
  const fields = [];
  const values = [];
  if (start_time !== undefined) {
    fields.push('start_time = ?');
    values.push(start_time);
  }
  if (end_time !== undefined) {
    fields.push('end_time = ?');
    values.push(end_time);
  }
  if (total_hours !== undefined) {
    fields.push('total_hours = ?');
    values.push(total_hours);
  }
  if (fields.length === 0) {
    throw new Error('No fields provided to update.');
  }
  const query = `UPDATE employee_work_hours SET ${fields.join(', ')} WHERE work_hour_id = ?`;
  values.push(work_hour_id);
  const result = await connection.query(query, values);
  return result;
}

module.exports = {
  checkIfEmployeeExists,
  createEmploye,
  getEmployeeByEmail,
  getAllEmployees,
  updateEmployeeService,
  ServicedeleteEmployee,
  getSingleEmployeeService,
  getMonthlyWorkHours,
  updateEmployeeWorkHours,
};
