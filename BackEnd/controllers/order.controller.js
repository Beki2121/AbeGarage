const orderService = require("../services/order.service");
const conn = require("../config/db.config");
const PDFDocument = require("pdfkit");
const employeeService = require("../services/employee.service");

async function createOrder(req, res) {
  try {
    const orderData = req.body;

    // Validate the presence of required fields in the request body
    const requiredFields = [
      "customer_id",
      "employee_id",
      "vehicle_id",
      "order_status",
      "order_total_price",
      "order_description",
      "estimated_completion_date",
      "order_services",
    ];

    for (const field of requiredFields) {
      if (orderData[field] === undefined) {
        return res.status(400).json({ error: `Field ${field} is required` });
      }
    }

    if (
      !Array.isArray(orderData.order_services) ||
      orderData.order_services.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Field 'order_services' must be a non-empty array" });
    }

    const result = await orderService.createOrders(orderData);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
}
// Get all orders
async function getAllOrders(req, res) {
  try {
    const { limit, sortby, completed } = req.query;
    const orders = await orderService.getAllOrders({
      limit,
      sortby,
      completed,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get single order by ID
async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the order" });
  }
}

async function getOrderDetailById(req, res) {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderDetailById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the order" });
  }
}

// Get single order by CUSTOMER_ID
async function getOrderByCustomerId(req, res) {
  try {
    const { customerid } = req.params;
    const order = await orderService.getOrderByCustomerId(customerid);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the order" });
  }
}

// Update an order
async function updateOrder(req, res) {
  try {
    const { order_id } = req.params; // Ensure order_id is obtained from params
    const orderData = req.body;

    const requiredFields = [
      "order_description",
      "estimated_completion_date",
      "completion_date",
      "order_services",
    ];

    for (const field of requiredFields) {
      if (orderData[field] === undefined) {
        return res.status(400).json({ error: `Field ${field} is required` });
      }
    }

    if (
      !Array.isArray(orderData.order_services) ||
      orderData.order_services.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Field 'order_services' must be a non-empty array" });
    }
    console.log("orderData:", orderData);
    console.log("order_id:", order_id);

    const result = await orderService.updateOrder(orderData, order_id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
}

async function searchOrder(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const searchQuery = `
  SELECT ci.*, cinfo.customer_first_name, cinfo.customer_last_name
  FROM customer_identifier ci
  JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id
  WHERE 
    cinfo.customer_first_name LIKE ? OR 
    cinfo.customer_last_name LIKE ? OR 
    ci.customer_email LIKE ? OR 
    ci.customer_phone_number LIKE ?
`;
    const values = [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`];
    const results = await conn.query(searchQuery, values);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

//get all order detail info for status page
const getOrderAllDetail = async (req, res) => {
  const { order_hash } = req.params;

  console.log("Received request with order_hash:", order_hash); // Log the received hash

  if (!order_hash) {
    console.log("No order_hash provided in the request");
    return res.status(400).json({ message: "Order hash is required" });
  }

  try {
    const orderDetails = await orderService.getOrderAllDetail(order_hash);

    if (!orderDetails) {
      console.log("No order details found for the provided hash");
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(orderDetails);
  } catch (error) {
    console.error(
      `Error fetching order details with hash ${order_hash}:`,
      error
    );
    res.status(500).json({
      message: "An error occurred while retrieving the order details",
    });
  }
};

// Endpoint: GET /api/reports/work-hours?month=MM&year=YYYY
async function getMonthlyWorkHoursReport(req, res) {
  try {
    const { month, year } = req.query;
    if (!month || !year) {
      return res.status(400).json({ error: "Month and year are required" });
    }

    console.log(`Fetching work hours for month: ${month}, year: ${year}`);
    const data = await employeeService.getMonthlyWorkHours({ month, year });

    console.log(`Found ${data.length} work hours records`);

    if (!data || data.length === 0) {
      return res.status(200).json({
        message: `No work hours data found for ${month}/${year}`,
        data: [],
        count: 0,
      });
    }

    res.status(200).json({
      message: `Work hours data retrieved successfully for ${month}/${year}`,
      data: data,
      count: data.length,
    });
  } catch (error) {
    console.error("Error in getMonthlyWorkHoursReport:", error);
    res.status(500).json({ error: error.message });
  }
}

// Endpoint: GET /api/reports/work-hours/pdf?month=MM&year=YYYY
async function getMonthlyWorkHoursPDF(req, res) {
  try {
    const { month, year } = req.query;
    if (!month || !year) {
      return res.status(400).json({ error: "Month and year are required" });
    }
    const data = await employeeService.getMonthlyWorkHours({ month, year });
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=work_hours_report_${month}_${year}.pdf`
    );
    doc.pipe(res);

    // Optional: handle PDF errors
    doc.on("error", (err) => {
      console.error("PDF generation error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to generate PDF" });
      }
    });

    doc.fontSize(20).text("Employee Work Hours Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Month: ${month} / Year: ${year}`);
    doc.moveDown();

    // Group data by employee_id
    const grouped = {};
    data.forEach((row) => {
      if (!grouped[row.employee_id]) grouped[row.employee_id] = [];
      grouped[row.employee_id].push(row);
    });

    // For each employee, print their section
    Object.values(grouped).forEach((rows, idx) => {
      const emp = rows[0];
      if (idx > 0) doc.addPage();
      doc
        .fontSize(16)
        .text(`${emp.employee_first_name} ${emp.employee_last_name}`, {
          underline: true,
        });
      doc.moveDown(0.5);
      // Table header
      doc.font("Helvetica-Bold");
      doc.text("Truck", 30, doc.y, { continued: true });
      doc.text("Date", 180, doc.y, { continued: true });
      doc.text("Hours", 320, doc.y);
      doc.font("Helvetica");
      doc.moveDown(0.5);
      let subtotal = 0;
      rows.forEach((row) => {
        doc.text(`${row.vehicle_make} (${row.vehicle_serial})`, 30, doc.y, {
          continued: true,
        });
        doc.text(`${row.work_date.toISOString().slice(0, 10)}`, 180, doc.y, {
          continued: true,
        });
        doc.text(`${Number(row.total_hours).toFixed(2)}`, 320, doc.y);
        subtotal += Number(row.total_hours);
      });
      doc.moveDown(0.5);
      doc.font("Helvetica-Bold").text(`Total Hours: ${subtotal.toFixed(2)}`);
      doc.font("Helvetica");
      doc.moveDown(1);
    });

    doc.end(); // This will end the response when the PDF is done
  } catch (error) {
    // Only send error if headers not already sent
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error after headers sent:", error);
    }
  }
}

// Endpoint: GET /api/reports/work-hours/:employeeId?month=MM&year=YYYY
async function getEmployeeMonthlyWorkHoursReport(req, res) {
  try {
    const { employeeId } = req.params;
    const { month, year } = req.query;
    if (!month || !year || !employeeId) {
      return res
        .status(400)
        .json({ error: "Employee, month, and year are required" });
    }
    const data = await employeeService.getMonthlyWorkHours({
      month,
      year,
      employeeId,
    });
    res.status(200).json({
      message: `Work hours data for employee ${employeeId} for ${month}/${year}`,
      data,
      count: data.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Endpoint: GET /api/reports/work-hours/:employeeId/pdf?month=MM&year=YYYY
async function getEmployeeMonthlyWorkHoursPDF(req, res) {
  try {
    const { employeeId } = req.params;
    const { month, year } = req.query;
    if (!month || !year || !employeeId) {
      return res
        .status(400)
        .json({ error: "Employee, month, and year are required" });
    }
    const data = await employeeService.getMonthlyWorkHours({
      month,
      year,
      employeeId,
    });
    if (!data.length) {
      return res.status(404).json({
        error:
          "No work hours found for this employee in the selected month/year",
      });
    }
    const emp = data[0];
    const doc = new PDFDocument({ margin: 40, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=work_hours_${emp.employee_first_name}_${emp.employee_last_name}_${month}_${year}.pdf`
    );
    doc.pipe(res);
    doc.on("error", (err) => {
      console.error("PDF generation error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to generate PDF" });
      }
    });

    // --- Eurodiesel Branding ---
    // Add logo at the top (centered)
    try {
      doc.image(
        __dirname + "/../assets/eurodiesel-logo.jpg",
        doc.page.width / 2 - 180,
        20,
        { width: 360 }
      );
    } catch (e) {
      // If logo not found, skip
    }
    doc.moveDown(3.5);

    // Title
    doc
      .fontSize(26)
      .font("Helvetica-Bold")
      .fillColor("#1a237e")
      .text("Employee Work Hours Report", { align: "center" });
    // Divider
    doc.moveDown(0.2);
    doc
      .moveTo(60, doc.y)
      .lineTo(doc.page.width - 60, doc.y)
      .strokeColor("#1a237e")
      .lineWidth(2)
      .stroke();
    doc.moveDown(1);

    // Employee Info
    doc
      .fontSize(16)
      .font("Helvetica")
      .fillColor("#222")
      .text(`${emp.employee_first_name} ${emp.employee_last_name}`, {
        align: "center",
      });
    doc
      .fontSize(13)
      .text(`Month: ${month} / Year: ${year}`, { align: "center" });
    doc.moveDown(1.5);

    // Table header styling
    const tableTop = doc.y;
    const col1 = 60,
      col2 = 260,
      col3 = 420;
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .rect(col1 - 10, tableTop - 2, 400, 24)
      .fill("#e3eafc")
      .fillColor("#1a237e")
      .text("Truck", col1, tableTop, { width: 180, align: "left" })
      .text("Date", col2, tableTop, { width: 120, align: "left" })
      .text("Hours", col3, tableTop, { width: 60, align: "right" })
      .moveDown(1);

    doc.font("Helvetica").fontSize(12).fillColor("#222");

    // Table rows with alternating background
    let y = tableTop + 24;
    let subtotal = 0;
    data.forEach((row, idx) => {
      if (idx % 2 === 1) {
        doc
          .rect(col1 - 10, y - 2, 400, 22)
          .fill("#f5faff")
          .fillColor("#222");
      }
      doc
        .text(`${row.vehicle_make} (${row.vehicle_serial})`, col1, y, {
          width: 180,
          align: "left",
        })
        .text(`${row.work_date.toISOString().slice(0, 10)}`, col2, y, {
          width: 120,
          align: "left",
        })
        .text(`${Number(row.total_hours).toFixed(2)}`, col3, y, {
          width: 60,
          align: "right",
        });
      y += 22;
      subtotal += Number(row.total_hours);
      doc
        .moveTo(col1 - 10, y - 2)
        .lineTo(col1 + 390, y - 2)
        .strokeColor("#e3eafc")
        .lineWidth(1)
        .stroke();
    });

    // Subtotal
    doc.moveDown(2);
    doc.font("Helvetica-Bold").fontSize(16).fillColor("#1a237e");
    doc.text(`Total Hours: ${subtotal.toFixed(2)}`, col1, y + 10, {
      align: "left",
    });
    doc.font("Helvetica").fillColor("#222");

    // Footer: page number and date
    const now = new Date();
    const dateStr = now.toLocaleDateString() + " " + now.toLocaleTimeString();
    doc.fontSize(10).fillColor("#888");
    doc.text(
      `Generated by EURODIESEL PARMA S.p.A. | ${dateStr}`,
      0,
      doc.page.height - 50,
      { align: "center" }
    );
    doc.text(`Page 1 of 1`, 0, doc.page.height - 35, { align: "center" });

    doc.end();
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error after headers sent:", error);
    }
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  searchOrder,
  getOrderByCustomerId,
  getOrderAllDetail,
  getOrderDetailById,
  getMonthlyWorkHoursReport,
  getMonthlyWorkHoursPDF,
  getEmployeeMonthlyWorkHoursReport,
  getEmployeeMonthlyWorkHoursPDF,
};
