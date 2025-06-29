-- Abe Garage Database Schema
-- Complete table structure with proper constraints

-- Table structure for table `announcements`
CREATE TABLE `announcements` (
  `announcement_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`announcement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `announcement_reads`
CREATE TABLE `announcement_reads` (
  `announcement_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `read_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`announcement_id`,`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `audit_log`
CREATE TABLE `audit_log` (
  `audit_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `user_type` enum('employee','customer') NOT NULL,
  `action` varchar(50) NOT NULL,
  `table_name` varchar(100) NOT NULL,
  `row_id` int(11) DEFAULT NULL,
  `old_data` text,
  `new_data` text,
  `action_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  PRIMARY KEY (`audit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `common_services`
CREATE TABLE `common_services` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) NOT NULL,
  `service_description` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `company_roles`
CREATE TABLE `company_roles` (
  `company_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`company_role_id`),
  UNIQUE KEY `company_role_name` (`company_role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `customer_identifier`
CREATE TABLE `customer_identifier` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone_number` varchar(255) NOT NULL,
  `customer_added_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_email` (`customer_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `customer_info`
CREATE TABLE `customer_info` (
  `customer_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `customer_first_name` varchar(255) NOT NULL,
  `customer_last_name` varchar(255) NOT NULL,
  `active_customer_status` int(11) NOT NULL,
  PRIMARY KEY (`customer_info_id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `customer_vehicle_info`
CREATE TABLE `customer_vehicle_info` (
  `vehicle_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `vehicle_year` int(11) NOT NULL,
  `vehicle_make` varchar(255) NOT NULL,
  `vehicle_model` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `vehicle_mileage` int(11) NOT NULL,
  `vehicle_tag` varchar(255) NOT NULL,
  `vehicle_serial` varchar(255) NOT NULL,
  `vehicle_color` varchar(255) NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `employee`
CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_email` varchar(255) NOT NULL,
  `active_employee` int(11) NOT NULL,
  `added_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_email` (`employee_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `employee_info`
CREATE TABLE `employee_info` (
  `employee_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `employee_first_name` varchar(255) NOT NULL,
  `employee_last_name` varchar(255) NOT NULL,
  `employee_phone` varchar(255) NOT NULL,
  PRIMARY KEY (`employee_info_id`),
  KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `employee_pass`
CREATE TABLE `employee_pass` (
  `employee_pass_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `employee_password_hashed` varchar(255) NOT NULL,
  PRIMARY KEY (`employee_pass_id`),
  KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `employee_role`
CREATE TABLE `employee_role` (
  `employee_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `company_role_id` int(11) NOT NULL,
  PRIMARY KEY (`employee_role_id`),
  KEY `employee_id` (`employee_id`),
  KEY `company_role_id` (`company_role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `employee_work_hours`
CREATE TABLE `employee_work_hours` (
  `work_hour_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `work_date` date NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `total_hours` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`work_hour_id`),
  KEY `employee_id` (`employee_id`),
  KEY `order_id` (`order_id`),
  KEY `vehicle_id` (`vehicle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `maintenance_space`
CREATE TABLE `maintenance_space` (
  `space_id` int(11) NOT NULL AUTO_INCREMENT,
  `space_name` varchar(255) NOT NULL,
  `space_status` enum('available','occupied') NOT NULL DEFAULT 'available',
  `space_notes` text,
  PRIMARY KEY (`space_id`),
  UNIQUE KEY `space_name` (`space_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `notifications`
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `orders`
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `active_order` int(11) NOT NULL,
  `order_hash` varchar(255) NOT NULL,
  `order_description` varchar(255) DEFAULT NULL,
  `space_id` int(11) DEFAULT NULL,
  `assigned_employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `employee_id` (`employee_id`),
  KEY `customer_id` (`customer_id`),
  KEY `vehicle_id` (`vehicle_id`),
  KEY `assigned_employee_id` (`assigned_employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `order_info`
CREATE TABLE `order_info` (
  `order_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `order_total_price` int(11) NOT NULL,
  `estimated_completion_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `completion_date` datetime DEFAULT NULL,
  `additional_request` text,
  `notes_for_internal_use` text,
  `notes_for_customer` text,
  `additional_requests_completed` int(11) NOT NULL,
  PRIMARY KEY (`order_info_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `order_services`
CREATE TABLE `order_services` (
  `order_service_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `service_completed` int(11) NOT NULL,
  PRIMARY KEY (`order_service_id`),
  KEY `order_id` (`order_id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `order_status`
CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `order_status` int(11) NOT NULL,
  PRIMARY KEY (`order_status_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `permission_requests`
CREATE TABLE `permission_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `reason` text,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `response_message` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `reviewed_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `service_category`
CREATE TABLE `service_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `vehicle_make`
CREATE TABLE `vehicle_make` (
  `make_id` int(11) NOT NULL AUTO_INCREMENT,
  `make_name` varchar(100) NOT NULL,
  PRIMARY KEY (`make_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `vehicle_model`
CREATE TABLE `vehicle_model` (
  `model_id` int(11) NOT NULL AUTO_INCREMENT,
  `make_id` int(11) DEFAULT NULL,
  `model_name` varchar(100) NOT NULL,
  PRIMARY KEY (`model_id`),
  KEY `make_id` (`make_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Add Foreign Key Constraints
ALTER TABLE `customer_info`
  ADD CONSTRAINT `customer_info_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier` (`customer_id`);

ALTER TABLE `customer_vehicle_info`
  ADD CONSTRAINT `customer_vehicle_info_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier` (`customer_id`);

ALTER TABLE `employee_info`
  ADD CONSTRAINT `employee_info_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

ALTER TABLE `employee_pass`
  ADD CONSTRAINT `employee_pass_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

ALTER TABLE `employee_role`
  ADD CONSTRAINT `employee_role_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `employee_role_ibfk_2` FOREIGN KEY (`company_role_id`) REFERENCES `company_roles` (`company_role_id`);

ALTER TABLE `employee_work_hours`
  ADD CONSTRAINT `employee_work_hours_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `employee_work_hours_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `employee_work_hours_ibfk_3` FOREIGN KEY (`vehicle_id`) REFERENCES `customer_vehicle_info` (`vehicle_id`);

ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier` (`customer_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`vehicle_id`) REFERENCES `customer_vehicle_info` (`vehicle_id`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`assigned_employee_id`) REFERENCES `employee` (`employee_id`);

ALTER TABLE `order_info`
  ADD CONSTRAINT `order_info_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `order_services`
  ADD CONSTRAINT `order_services_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `common_services` (`service_id`);

ALTER TABLE `order_status`
  ADD CONSTRAINT `order_status_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `permission_requests`
  ADD CONSTRAINT `permission_requests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

ALTER TABLE `vehicle_model`
  ADD CONSTRAINT `vehicle_model_ibfk_1` FOREIGN KEY (`make_id`) REFERENCES `vehicle_make` (`make_id`);

-- Setup Admin Account for Abie Garage
-- Run this script after creating the tables

-- First, make sure the roles exist
INSERT IGNORE INTO company_roles (company_role_name)
VALUES ('Employee'), ('Manager'), ('Admin');

-- Create the admin employee account
INSERT INTO employee (employee_email, active_employee, added_date)
VALUES ('admin@admin.com', 1, CURRENT_TIMESTAMP);

-- Create employee info
INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
VALUES (1, 'Admin', 'Admin', '555-555-5555'); 

-- Create employee password (using the hash generated from generate-hash.js)
INSERT INTO employee_pass (employee_id, employee_password_hashed)
VALUES (1, '$2b$10$v/fRJy3UJGAsM/eTdyYZh.G8xGAPu1JZyAyBTw9OoFS0bZ8r3Afjy');  

-- Assign admin role
INSERT INTO employee_role (employee_id, company_role_id)
VALUES (1, 3);

-- Verify the admin account was created
SELECT 
    e.employee_id,
    e.employee_email,
    e.active_employee,
    ei.employee_first_name,
    ei.employee_last_name,
    cr.company_role_name
FROM employee e
JOIN employee_info ei ON e.employee_id = ei.employee_id
JOIN employee_role er ON e.employee_id = er.employee_id
JOIN company_roles cr ON er.company_role_id = cr.company_role_id
WHERE e.employee_email = 'admin@admin.com'; 
