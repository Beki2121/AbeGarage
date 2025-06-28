const connection = require("./config/db.config");

async function testWorkHours() {
  try {
    console.log("Testing employee_work_hours table...");
    
    // Check if table exists and has any data
    const tableCheck = await connection.query(`
      SELECT COUNT(*) as total_records 
      FROM employee_work_hours
    `);
    
    console.log(`Total records in employee_work_hours: ${tableCheck[0].total_records}`);
    
    if (tableCheck[0].total_records > 0) {
      // Get sample data
      const sampleData = await connection.query(`
        SELECT 
          wh.work_hour_id,
          wh.employee_id,
          wh.order_id,
          wh.vehicle_id,
          wh.work_date,
          wh.start_time,
          wh.end_time,
          wh.total_hours,
          ei.employee_first_name,
          ei.employee_last_name,
          v.vehicle_make,
          v.vehicle_serial
        FROM employee_work_hours wh
        INNER JOIN employee_info ei ON wh.employee_id = ei.employee_id
        INNER JOIN customer_vehicle_info v ON wh.vehicle_id = v.vehicle_id
        ORDER BY wh.work_date DESC
        LIMIT 10
      `);
      
      console.log("\nSample work hours data:");
      sampleData.forEach((record, index) => {
        console.log(`${index + 1}. Employee: ${record.employee_first_name} ${record.employee_last_name}`);
        console.log(`   Vehicle: ${record.vehicle_make} (${record.vehicle_serial})`);
        console.log(`   Date: ${record.work_date}`);
        console.log(`   Start: ${record.start_time}`);
        console.log(`   End: ${record.end_time}`);
        console.log(`   Hours: ${record.total_hours}`);
        console.log(`   Month: ${new Date(record.work_date).getMonth() + 1}, Year: ${new Date(record.work_date).getFullYear()}`);
        console.log("");
      });
      
      // Check for June 2025 specifically
      const june2025Data = await connection.query(`
        SELECT COUNT(*) as count
        FROM employee_work_hours 
        WHERE MONTH(work_date) = 6 AND YEAR(work_date) = 2025
      `);
      
      console.log(`Records for June 2025: ${june2025Data[0].count}`);
      
    } else {
      console.log("No data found in employee_work_hours table.");
      console.log("Work hours are created when:");
      console.log("1. An order is created with an assigned_employee_id");
      console.log("2. An order is completed (status = 1)");
    }
    
  } catch (error) {
    console.error("Error testing work hours:", error);
  } finally {
    process.exit(0);
  }
}

testWorkHours(); 