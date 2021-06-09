/*user-microservice*/

use `user-microservice`;

CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    timestamp DATETIME DEFAULT NULL,
    model_id INT NOT NULL,
    model_type VARCHAR(50) NOT NULL,
	old_data JSON DEFAULT NULL,
	new_data JSON DEFAULT NULL
);

/*customers table*/

CREATE TRIGGER before_customer_delete 
    BEFORE delete ON `user-microservice`.customers
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'delete',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'customers';

CREATE TRIGGER after_customer_insert 
    AFTER insert ON `user-microservice`.customers
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'insert',
     timestamp = NOW(),
     model_id = NEW.id,
     model_type = 'customers';
     
CREATE TRIGGER before_customer_update 
    BEFORE update ON `user-microservice`.customers
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'update',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'customers',
     old_data = JSON_OBJECT(
            "address", OLD.address,
            "email", OLD.email,
            "first_name", OLD.first_name,
            "last_name", OLD.last_name,
            "phone", OLD.phone
        ),
     new_data = JSON_OBJECT(
            "address", NEW.address,
            "email", NEW.email,
            "first_name", NEW.first_name,
            "last_name", NEW.last_name,
            "phone", NEW.phone
        );

/*roles table*/

CREATE TRIGGER before_role_delete 
    BEFORE delete ON `user-microservice`.roles
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'delete',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'roles';

CREATE TRIGGER after_role_insert 
    AFTER insert ON `user-microservice`.roles
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'insert',
     timestamp = NOW(),
     model_id = NEW.id,
     model_type = 'roles';
     
CREATE TRIGGER before_role_update 
    BEFORE update ON `user-microservice`.roles
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'update',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'roles',
     old_data = JSON_OBJECT(
            "description", OLD.description,
            "role_name", OLD.role_name
        ),
     new_data = JSON_OBJECT(
            "description", NEW.description,
            "role_name", NEW.role_name
        );
        
/*users table*/

CREATE TRIGGER before_user_delete 
    BEFORE delete ON `user-microservice`.users
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'delete',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'users';

CREATE TRIGGER after_user_insert 
    AFTER insert ON `user-microservice`.users
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'insert',
     timestamp = NOW(),
     model_id = NEW.id,
     model_type = 'users';

CREATE TRIGGER before_user_update 
    BEFORE update ON `user-microservice`.users
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'update',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'users',
     old_data = JSON_OBJECT(
            "address", OLD.address,
            "email", OLD.email,
            "first_name", OLD.first_name,
            "last_name", OLD.last_name,
            "password", OLD.password,
            "phone", OLD.phone,
            "username", OLD.username,
            "role_id", OLD.role_id, 
            "warehouse_id", OLD.warehouse_id
        ),
     new_data = JSON_OBJECT(
            "address", NEW.address,
            "email", NEW.email,
            "first_name", NEW.first_name,
            "last_name", NEW.last_name,
            "password", NEW.password,
            "phone", NEW.phone,
            "username", NEW.username,
            "role_id", NEW.role_id, 
            "warehouse_id", NEW.warehouse_id
        );
        
/*warehouses table*/

CREATE TRIGGER before_warehouse_delete 
    BEFORE delete ON `user-microservice`.warehouses
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'delete',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'warehouses';

CREATE TRIGGER after_warehouse_insert 
    AFTER insert ON `user-microservice`.warehouses
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'insert',
     timestamp = NOW(),
     model_id = NEW.id,
     model_type = 'warehouses';
     
CREATE TRIGGER before_warehouse_update 
    BEFORE update ON `user-microservice`.warehouses
    FOR EACH ROW 
 INSERT INTO `user-microservice`.logs
 SET action = 'update',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'warehouses',
     old_data = JSON_OBJECT(
            "company_name", OLD.company_name,
            "inventory_start_date", OLD.inventory_start_date,
            "location", OLD.location
        ),
     new_data = JSON_OBJECT(
            "company_name", NEW.company_name,
            "inventory_start_date", NEW.inventory_start_date,
            "location", NEW.location
        );
        
/*product-microservice*/

use `product`;

CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    timestamp DATETIME DEFAULT NULL,
    model_id INT NOT NULL,
    model_type VARCHAR(50) NOT NULL,
	old_data JSON DEFAULT NULL,
	new_data JSON DEFAULT NULL
);

/*categories table*/

CREATE TRIGGER before_category_delete 
    BEFORE delete ON `product`.categories
    FOR EACH ROW 
 INSERT INTO `product`.logs
 SET action = 'delete',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'categories';

CREATE TRIGGER after_category_insert 
    AFTER insert ON `product`.categories
    FOR EACH ROW 
 INSERT INTO `product`.logs
 SET action = 'insert',
     timestamp = NOW(),
     model_id = NEW.id,
     model_type = 'categories';
     
CREATE TRIGGER before_category_update 
    BEFORE update ON `product`.categories
    FOR EACH ROW 
 INSERT INTO `product`.logs
 SET action = 'update',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'categories',
     old_data = JSON_OBJECT(
            "category_name", OLD.category_name
        ),
     new_data = JSON_OBJECT(
            "category_name", NEW.category_name
        );
        
/*products table*/

CREATE TRIGGER before_product_delete 
    BEFORE delete ON `product`.products
    FOR EACH ROW 
 INSERT INTO `product`.logs
 SET action = 'delete',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'products';

CREATE TRIGGER after_product_insert 
    AFTER insert ON `product`.products
    FOR EACH ROW 
 INSERT INTO `product`.logs
 SET action = 'insert',
     timestamp = NOW(),
     model_id = NEW.id,
     model_type = 'products';
     
CREATE TRIGGER before_product_update 
    BEFORE update ON `product`.products
    FOR EACH ROW 
 INSERT INTO `product`.logs
 SET action = 'update',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'products',
     old_data = JSON_OBJECT(
            "description", OLD.description,
            "name", OLD.name,
            "order_details", OLD.order_details,
            "price", OLD.price,
            "quantity", OLD.quantity,
            "status", OLD.status,
            "unit", OLD.unit,
            "category_id", OLD.category_id,
            "supplier_id", OLD.supplier_id,
            "warehouse_id", OLD.warehouse_id
        ),
     new_data = JSON_OBJECT(
            "description", NEW.description,
            "name", NEW.name,
            "order_details", NEW.order_details,
            "price", NEW.price,
            "quantity", NEW.quantity,
            "status", NEW.status,
            "unit", NEW.unit,
            "category_id", NEW.category_id,
            "supplier_id", NEW.supplier_id,
            "warehouse_id", NEW.warehouse_id
        );
        
/*suppliers table*/

CREATE TRIGGER before_supplier_delete 
    BEFORE delete ON `product`.suppliers
    FOR EACH ROW 
 INSERT INTO `product`.logs
 SET action = 'delete',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'suppliers';

CREATE TRIGGER after_supplier_insert 
    AFTER insert ON `product`.suppliers
    FOR EACH ROW 
 INSERT INTO `product`.logs
 SET action = 'insert',
     timestamp = NOW(),
     model_id = NEW.id,
     model_type = 'suppliers';
     
CREATE TRIGGER before_supplier_update 
    BEFORE update ON `product`.suppliers
    FOR EACH ROW 
 INSERT INTO `product`.logs
 SET action = 'update',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'suppliers',
     old_data = JSON_OBJECT(
            "address", OLD.address,
            "email", OLD.email,
            "fax", OLD.fax,
            "name", OLD.name,
            "other_details", OLD.other_details,
            "phone", OLD.phone,
            "user_id", OLD.user_id
        ),
     new_data = JSON_OBJECT(
            "address", NEW.address,
            "email", NEW.email,
            "fax", NEW.fax,
            "name", NEW.name,
            "other_details", NEW.other_details,
            "phone", NEW.phone,
            "user_id", NEW.user_id
        );

/*order-microservice*/

use `order`;

CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    timestamp DATETIME DEFAULT NULL,
    model_id INT NOT NULL,
    model_type VARCHAR(50) NOT NULL,
	old_data JSON DEFAULT NULL,
	new_data JSON DEFAULT NULL
);

/*oders table*/

CREATE TRIGGER before_order_delete 
    BEFORE delete ON `order`.orders
    FOR EACH ROW 
 INSERT INTO `order`.logs
 SET action = 'delete',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'orders';

CREATE TRIGGER after_order_insert 
    AFTER insert ON `order`.orders
    FOR EACH ROW 
 INSERT INTO `order`.logs
 SET action = 'insert',
     timestamp = NOW(),
     model_id = NEW.id,
     model_type = 'orders';
     
CREATE TRIGGER before_order_update 
    BEFORE update ON `order`.orders
    FOR EACH ROW 
 INSERT INTO `order`.logs
 SET action = 'update',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'orders',
     old_data = JSON_OBJECT(
            "date_of_order", OLD.date_of_order,
            "status", OLD.status,
            "customer_id", OLD.customer_id,
            "supplier_id", OLD.supplier_id
        ),
     new_data = JSON_OBJECT(
            "date_of_order", NEW.date_of_order,
            "status", NEW.status,
            "customer_id", NEW.customer_id,
            "supplier_id", NEW.supplier_id
        );
        
/*payments table*/

CREATE TRIGGER before_payment_delete 
    BEFORE delete ON `order`.payments
    FOR EACH ROW 
 INSERT INTO `order`.logs
 SET action = 'delete',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'payments';

CREATE TRIGGER after_payment_insert 
    AFTER insert ON `order`.payments
    FOR EACH ROW 
 INSERT INTO `order`.logs
 SET action = 'insert',
     timestamp = NOW(),
     model_id = NEW.id,
     model_type = 'payments';
     
CREATE TRIGGER before_payment_update 
    BEFORE update ON `order`.payments
    FOR EACH ROW 
 INSERT INTO `order`.logs
 SET action = 'update',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'payments',
     old_data = JSON_OBJECT(
            "order_details", OLD.order_details,
            "payment_type", OLD.payment_type
        ),
     new_data = JSON_OBJECT(
           "order_details", NEW.order_details,
			"payment_type", NEW.payment_type
        );

/*oder_details table*/

CREATE TRIGGER before_order_detail_delete 
    BEFORE delete ON `order`.order_details
    FOR EACH ROW 
 INSERT INTO `order`.logs
 SET action = 'delete',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'order_details';

CREATE TRIGGER after_order_detail_insert 
    AFTER insert ON `order`.order_details
    FOR EACH ROW 
 INSERT INTO `order`.logs
 SET action = 'insert',
     timestamp = NOW(),
     model_id = NEW.id,
     model_type = 'order_details';
     
CREATE TRIGGER before_order_detail_update 
    BEFORE update ON `order`.order_details
    FOR EACH ROW 
 INSERT INTO `order`.logs
 SET action = 'update',
     timestamp = NOW(),
     model_id = OLD.id,
     model_type = 'order_details',
     old_data = JSON_OBJECT(
            "date", OLD.date,
            "quantity", OLD.quantity,
            "size", OLD.size,
            "total", OLD.total,
            "unit_price", OLD.unit_price,
            "order_id", OLD.order_id,
            "payment_id", OLD.payment_id,
            "product_id", OLD.product_id
        ),
     new_data = JSON_OBJECT(
            "date", NEW.date,
            "quantity", NEW.quantity,
            "size", NEW.size,
            "total", NEW.total,
            "unit_price", NEW.unit_price,
            "order_id", NEW.order_id,
            "payment_id", NEW.payment_id,
            "product_id", NEW.product_id
        );