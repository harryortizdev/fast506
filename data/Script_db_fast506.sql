-- 22/04/2026 - Creación de la base de datos (Harry)
CREATE DATABASE IF NOT EXISTS db_fast506;
USE db_fast506;

-- 02/05/2026 - Creación de la tabla Users (Allan)

CREATE TABLE users (

	id_user INT PRIMARY KEY UNIQUE AUTO_INCREMENT,
	name VARCHAR (100) NOT NULL,
	id INT UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	phone_number VARCHAR (15) UNIQUE NOT NULL,
	date_birth DATE NULL,
	profile_image VARCHAR (500) NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT TRUE

);



-- 02/05/2026 - Creación de la tabla Administrator (Allan)

CREATE TABLE administrator (

	id_user INT PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL UNIQUE,
    corporate_email VARCHAR(100) NOT NULL UNIQUE,

    CONSTRAINT fk_admin_user
    FOREIGN KEY (id_user) REFERENCES users(id_user)
    ON DELETE CASCADE
    ON UPDATE CASCADE

);

-- 02/05/2026 - Creación de la tabla Mechanic (Allan)

CREATE TABLE mechanic (

    id_user INT PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL UNIQUE,
    corporate_email VARCHAR(100) NOT NULL UNIQUE,
    specialty VARCHAR(50) NOT NULL,
    cert_level VARCHAR(20) NOT NULL,

    CONSTRAINT fk_mechanic_user
    FOREIGN KEY (id_user) REFERENCES users(id_user)
    ON DELETE CASCADE
    ON UPDATE CASCADE

 );

 -- 02/05/2026 - Creación de la tabla Client (Allan)
 
CREATE TABLE client (

    id_user INT PRIMARY KEY,
    comm_interest VARCHAR(50),
    physical_address VARCHAR(255),
    occupation VARCHAR(100) NOT NULL,

    CONSTRAINT fk_client_user
    FOREIGN KEY (id_user) REFERENCES users(id_user)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    
);

-- lo puso Nolan para probar
-- Insertar un usuario en la tabla users
INSERT INTO `db_fast506`.`users`  (name, id, email, password, phone_number, date_birth, profile_image)
VALUES 
('Administrador de Prueba', 123456, 'admin@prueba.com', 'password123', '800-123-4567', '1985-10-15', 'profile.jpg');
-- -----------------------------------------------------------------------------------------

-- 07/05/26 Creacion de procedimientos para la tabla Administrator (Allan)

-- Obtener administradores

DELIMITER $$

DROP PROCEDURE IF EXISTS getAllAdministrators;

CREATE PROCEDURE getAllAdministrators()
BEGIN

    SELECT
        u.id_user,
        u.name,
        u.id,
        u.email,
        u.phone_number,
        u.date_birth,
        u.profile_image,
        a.employee_id,
        a.corporate_email
    FROM users u
    INNER JOIN administrator a
        ON u.id_user = a.id_user
    WHERE u.is_active = TRUE;

END $$

DELIMITER ;

-- Buscar administrador por ID 

DROP PROCEDURE IF EXISTS findAdministratorById;

DELIMITER $$

CREATE PROCEDURE findAdministratorById(
    IN p_id_user INT
)
BEGIN

    SELECT
        u.id_user,
        u.name,
        u.id,
        u.email,
        u.phone_number,
        u.date_birth,
        u.profile_image,
        a.employee_id,
        a.corporate_email
    FROM users u
    INNER JOIN administrator a
        ON u.id_user = a.id_user
    WHERE u.id_user = p_id_user
      AND u.is_active = TRUE;

END$$

DELIMITER ;

-- Insertar en administrator

DROP PROCEDURE IF EXISTS insertAdministrator;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE insertAdministrator(

   
    IN p_name VARCHAR(100),
    IN p_identification INT,
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_phone_number VARCHAR(15),
    IN p_date_birth DATE,
    IN p_profile_image VARCHAR(500),

    IN p_employee_id VARCHAR(10),
    IN p_corporate_email VARCHAR(100)

)
BEGIN

    DECLARE v_id_user INT;
    
    START TRANSACTION;

    INSERT INTO users(
        name,
        id,
        email,
        password,
        phone_number,
        date_birth,
        profile_image,
        is_active
    )
    VALUES(
        p_name,
        p_identification,
        p_email,
        p_password,
        p_phone_number,
        p_date_birth,
        p_profile_image,
        TRUE
    );

    SET v_id_user = LAST_INSERT_ID();

    INSERT INTO administrator(
        id_user,
        employee_id,
        corporate_email
    )
    VALUES(
        v_id_user,
        p_employee_id,
        p_corporate_email
    );

END $$

DELIMITER ;

-- Datos de prueba

CALL insertAdministrator(

    'Allan Mejia',
    123456789,
    'allan@gmail.com',
    '12345',
    '88887777',
    '2005-10-15',
    'allan.png',

    'ADM001',
    'allan@fast506.com'

);

-- Editar administrador

DROP PROCEDURE IF EXISTS updateAdministrator;

DELIMITER $$

CREATE PROCEDURE updateAdministrator(

    IN p_id_user INT,
    IN p_name VARCHAR(100),
    IN p_identification INT,
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_phone_number VARCHAR(15),
    IN p_date_birth DATE,
    IN p_profile_image VARCHAR(500),
    IN p_employee_id VARCHAR(10),
    IN p_corporate_email VARCHAR(100)

)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE users
    SET
        name = p_name,
        id = p_identification,
        email = p_email,
        password = p_password,
        phone_number = p_phone_number,
        date_birth = p_date_birth,
        profile_image = p_profile_image
    WHERE id_user = p_id_user
      AND is_active = TRUE;

    UPDATE administrator
    SET
        employee_id = p_employee_id,
        corporate_email = p_corporate_email
    WHERE id_user = p_id_user;

    COMMIT;

END$$

DELIMITER ;

-- Eliminar usuario

DROP PROCEDURE IF EXISTS deleteUser;

DELIMITER $$

CREATE PROCEDURE deleteUser(
    IN p_id_user INT
)
BEGIN

    UPDATE users
    SET is_active = FALSE
    WHERE id_user = p_id_user;

END$$

DELIMITER ;

-- 07/05/26 Creacion de procedimientos para la tabla mechanic (Allan)

-- Insertar mecanico
DROP PROCEDURE IF EXISTS insertMechanic;

DELIMITER $$

CREATE PROCEDURE insertMechanic(

    IN p_name VARCHAR(100),
    IN p_identification INT,
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_phone_number VARCHAR(15),
    IN p_date_birth DATE,
    IN p_profile_image VARCHAR(500),

    IN p_employee_id VARCHAR(10),
    IN p_corporate_email VARCHAR(100),
    IN p_specialty VARCHAR(50),
    IN p_cert_level VARCHAR(20)

)
BEGIN

    DECLARE v_id_user INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO users(
        name,
        id,
        email,
        password,
        phone_number,
        date_birth,
        profile_image,
        is_active
    )
    VALUES(
        p_name,
        p_identification,
        p_email,
        p_password,
        p_phone_number,
        p_date_birth,
        p_profile_image,
        TRUE
    );

    SET v_id_user = LAST_INSERT_ID();

    INSERT INTO mechanic(
        id_user,
        employee_id,
        corporate_email,
        specialty,
        cert_level
    )
    VALUES(
        v_id_user,
        p_employee_id,
        p_corporate_email,
        p_specialty,
        p_cert_level
    );

    COMMIT;

END$$

DELIMITER ;

-- Obtener mecanicos

DROP PROCEDURE IF EXISTS getAllMechanics;

DELIMITER $$

CREATE PROCEDURE getAllMechanics()
BEGIN

    SELECT
        u.id_user,
        u.name,
        u.id,
        u.email,
        u.phone_number,
        u.date_birth,
        u.profile_image,

        m.employee_id,
        m.corporate_email,
        m.specialty,
        m.cert_level

    FROM users u
    INNER JOIN mechanic m
        ON u.id_user = m.id_user

    WHERE u.is_active = TRUE;

END$$

DELIMITER ;

-- Buscar mecanico por id

DROP PROCEDURE IF EXISTS findMechanicById;

DELIMITER $$

CREATE PROCEDURE findMechanicById(
    IN p_id_user INT
)
BEGIN

    SELECT
        u.id_user,
        u.name,
        u.id,
        u.email,
        u.phone_number,
        u.date_birth,
        u.profile_image,

        m.employee_id,
        m.corporate_email,
        m.specialty,
        m.cert_level

    FROM users u
    INNER JOIN mechanic m
        ON u.id_user = m.id_user

    WHERE u.id_user = p_id_user
      AND u.is_active = TRUE;

END$$

DELIMITER ;

-- Actualizar mecanico

DROP PROCEDURE IF EXISTS updateMechanic;

DELIMITER $$

CREATE PROCEDURE updateMechanic(

    IN p_id_user INT,

    IN p_name VARCHAR(100),
    IN p_identification INT,
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_phone_number VARCHAR(15),
    IN p_date_birth DATE,
    IN p_profile_image VARCHAR(500),

    IN p_employee_id VARCHAR(10),
    IN p_corporate_email VARCHAR(100),
    IN p_specialty VARCHAR(50),
    IN p_cert_level VARCHAR(20)

)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE users
    SET
        name = p_name,
        id = p_identification,
        email = p_email,
        password = p_password,
        phone_number = p_phone_number,
        date_birth = p_date_birth,
        profile_image = p_profile_image
    WHERE id_user = p_id_user
      AND is_active = TRUE;

    UPDATE mechanic
    SET
        employee_id = p_employee_id,
        corporate_email = p_corporate_email,
        specialty = p_specialty,
        cert_level = p_cert_level
    WHERE id_user = p_id_user;

    COMMIT;

END$$

DELIMITER ;

-- 07/05/26 Creacion de procedimientos para la tabla client (Allan)

-- Insertar cliente

DROP PROCEDURE IF EXISTS insertClient;

DELIMITER $$

CREATE PROCEDURE insertClient(

    IN p_name VARCHAR(100),
    IN p_identification INT,
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_phone_number VARCHAR(15),
    IN p_date_birth DATE,
    IN p_profile_image VARCHAR(500),

    IN p_comm_interest VARCHAR(50),
    IN p_physical_address VARCHAR(255),
    IN p_occupation VARCHAR(100)

)
BEGIN

    DECLARE v_id_user INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO users(
        name,
        id,
        email,
        password,
        phone_number,
        date_birth,
        profile_image,
        is_active
    )
    VALUES(
        p_name,
        p_identification,
        p_email,
        p_password,
        p_phone_number,
        p_date_birth,
        p_profile_image,
        TRUE
    );

    SET v_id_user = LAST_INSERT_ID();

    INSERT INTO client(
        id_user,
        comm_interest,
        physical_address,
        occupation
    )
    VALUES(
        v_id_user,
        p_comm_interest,
        p_physical_address,
        p_occupation
    );

    COMMIT;

END$$

DELIMITER ;

-- Obtener clientes

DROP PROCEDURE IF EXISTS getAllClients;

DELIMITER $$

CREATE PROCEDURE getAllClients()
BEGIN

    SELECT
        u.id_user,
        u.name,
        u.id,
        u.email,
        u.phone_number,
        u.date_birth,
        u.profile_image,

        c.comm_interest,
        c.physical_address,
        c.occupation

    FROM users u
    INNER JOIN client c
        ON u.id_user = c.id_user

    WHERE u.is_active = TRUE;

END$$

DELIMITER ;

-- Buscar cliente por id

DROP PROCEDURE IF EXISTS findClientById;

DELIMITER $$

CREATE PROCEDURE findClientById(
    IN p_id_user INT
)
BEGIN

    SELECT
        u.id_user,
        u.name,
        u.id,
        u.email,
        u.phone_number,
        u.date_birth,
        u.profile_image,

        c.comm_interest,
        c.physical_address,
        c.occupation

    FROM users u
    INNER JOIN client c
        ON u.id_user = c.id_user

    WHERE u.id_user = p_id_user
      AND u.is_active = TRUE;

END$$

DELIMITER ;

-- Actualizar cliente

DROP PROCEDURE IF EXISTS updateClient;

DELIMITER $$

CREATE PROCEDURE updateClient(

    IN p_id_user INT,

    IN p_name VARCHAR(100),
    IN p_identification INT,
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_phone_number VARCHAR(15),
    IN p_date_birth DATE,
    IN p_profile_image VARCHAR(500),

    IN p_comm_interest VARCHAR(50),
    IN p_physical_address VARCHAR(255),
    IN p_occupation VARCHAR(100)

)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE users
    SET
        name = p_name,
        id = p_identification,
        email = p_email,
        password = p_password,
        phone_number = p_phone_number,
        date_birth = p_date_birth,
        profile_image = p_profile_image
    WHERE id_user = p_id_user
      AND is_active = TRUE;

    UPDATE client
    SET
        comm_interest = p_comm_interest,
        physical_address = p_physical_address,
        occupation = p_occupation
    WHERE id_user = p_id_user;

    COMMIT;

END$$

DELIMITER ;


-- 02/05/2026 - Creación de la tabla supplier(proveedores) Nolan
CREATE TABLE supplier (
    id_supplier INT PRIMARY KEY AUTO_INCREMENT,
    
    name VARCHAR(50) NOT NULL,
    company_name VARCHAR(50) NOT NULL,
    legal_name VARCHAR(50) NOT NULL,
    
    support_phone VARCHAR(15) NOT NULL,
    
    bussines_contact_name VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    
    ubicacion VARCHAR(100) NOT NULL,
    
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Llave foránea de Administrador
    admin_id INT NOT NULL,
    
    CONSTRAINT fk_supplier_admin
        FOREIGN KEY (admin_id)
        REFERENCES users(id_user) -- ver si cambiar dependiendo de como lo puso Allan
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 07/05/2026 - Crear datos de prueba proveedor (Nolan)

INSERT INTO `db_fast506`.`supplier` 
(name, company_name, legal_name, support_phone, bussines_contact_name, email, ubicacion, admin_id)
VALUES
    ('Auto Parts S.A.', 'Auto Parts S.A.', 'Auto Parts S.A.', 
    '800-123-4567', 'Carlos González', 'cgonzalez@autoparts.com', 'San José, Costa Rica', 1);
  
-- 07/05/2026 - Crear procedimientos de la tabla proveedor (Nolan)
-- Procedimiento para agregar un supplier (Nolan)

DROP procedure IF EXISTS `insertSupplier`;

DELIMITER $$
CREATE PROCEDURE insertSupplier(
    IN p_name VARCHAR(50),
    IN p_company_name VARCHAR(50),
    IN p_legal_name VARCHAR(50),
    IN p_support_phone VARCHAR(15),
    IN p_bussines_contact_name VARCHAR(150),
    IN p_email VARCHAR(100),
    IN p_ubicacion VARCHAR(100),
    IN p_admin_id INT
)
BEGIN
    INSERT INTO supplier (
        name, company_name, legal_name, support_phone, bussines_contact_name, email, ubicacion, admin_id
    )
    VALUES (
        p_name, p_company_name, p_legal_name, p_support_phone, p_bussines_contact_name, p_email, p_ubicacion, p_admin_id
    );
END$$
DELIMITER ;

-- -- Procedimiento para obtener todos los proveedores donde is_active = 1 (Nolan)
DROP procedure IF EXISTS `getAllSupplier`;

DELIMITER $$
CREATE PROCEDURE `getAllSuppliers` ()
BEGIN
    SELECT 
        id_supplier,
        name,
        company_name,
        legal_name,
        support_phone,
        bussines_contact_name,
        email,
        ubicacion,
        admin_id
    FROM supplier
    WHERE is_active = 1;
END$$

DELIMITER ;

-- Procedimiento para actualizar un proveedor (Nolan)
DROP procedure IF EXISTS `updateSupplier`;

DELIMITER $$
CREATE PROCEDURE updateSupplier(
    IN p_id_supplier INT,
    IN p_name VARCHAR(50),
    IN p_company_name VARCHAR(50),
    IN p_legal_name VARCHAR(50),
    IN p_support_phone VARCHAR(15),
    IN p_bussines_contact_name VARCHAR(150),
    IN p_email VARCHAR(100),
    IN p_ubicacion VARCHAR(100),
    IN p_admin_id BOOLEAN
)
BEGIN
    UPDATE supplier
    SET
        name = p_name,
        company_name = p_company_name,
        legal_name = p_legal_name,
        support_phone = p_support_phone,
        bussines_contact_name = p_bussines_contact_name,
        email = p_email,
        ubicacion = p_ubicacion,
        admin_id = p_admin_id
    WHERE id_supplier = p_id_supplier
    AND is_active = true;
END$$
DELIMITER ;

-- Procedimiento para eliminar un proveedor (Nolan)
DROP procedure IF EXISTS `deleteSupplier`;

DELIMITER $$
CREATE PROCEDURE deleteSupplier(
    IN p_id_supplier INT
)
BEGIN
    DELETE FROM supplier WHERE id_supplier = p_id_supplier;
END$$
DELIMITER ;

-- Procedimiento para desactivar un proveedor o borrado logico (marcarlo como inactivo) (Nolan)
DROP procedure IF EXISTS `deactivateSupplier`;

DELIMITER $$
CREATE PROCEDURE deactivateSupplier(IN p_id_supplier INT)
BEGIN
    UPDATE supplier
    SET is_active = FALSE
    WHERE id_supplier = p_id_supplier;
END$$
DELIMITER ;

-- Para encontrar un proveedor mediante el id (Nolan)
DROP procedure IF EXISTS `findSupplierById`;

DELIMITER $$
CREATE PROCEDURE `findSupplierById` (IN p_id_supplier INT)
BEGIN
    SELECT 
        id_supplier,
        name,
        company_name,
        legal_name,
        support_phone,
        bussines_contact_name,
        email,
        ubicacion,
        admin_id
    FROM supplier
    WHERE id_supplier = p_id_supplier;
END$$
DELIMITER ;
-- -----------------------------------------------------------------------------------------
-- 22/04/2026 - Creación de la tabla de units (Harry)

CREATE TABLE `db_fast506`.`units` (
  `id_car` INT NOT NULL AUTO_INCREMENT,
  `VIN` VARCHAR(17) NOT NULL,
  `engine_number` VARCHAR(17) NOT NULL,
  `car_brand` VARCHAR(100) NOT NULL,
  `car_name` VARCHAR(100) NOT NULL,
  `legal_brand_name` VARCHAR(100) NOT NULL,
  `year_Manufacture` VARCHAR(4) NOT NULL,
  `color` VARCHAR(50) NOT NULL,
  `transmission` VARCHAR(10) NOT NULL,
  `traction` VARCHAR(10) NOT NULL,
  `body_work` VARCHAR(100) NOT NULL,
  `engine_size` VARCHAR(20) NOT NULL,
  `fuel_type` VARCHAR(20) NOT NULL,
  `stock_status` TINYINT NOT NULL,
  `is_active` TINYINT NOT NULL,
  `id_supplier` INT NULL,
  PRIMARY KEY (`id_car`),
  UNIQUE INDEX `id_UNIQUE` (`id_car` ASC),
  INDEX `fk_units_supplier_id_idx` (`id_supplier` ASC),
  CONSTRAINT `fk_units_supplier_id`
    FOREIGN KEY (`id_supplier`)
    REFERENCES `db_fast506`.`supplier` (`id_supplier`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    

    -- Insertar datos de prueba a tabla units
    INSERT INTO `db_fast506`.`units` 
  (`VIN`, `engine_number`, `car_brand`, `car_name`, `legal_brand_name`, `year_Manufacture`, `color`, `transmission`, `traction`, `body_work`, `engine_size`, `fuel_type`, `stock_status`, `is_active`, `id_supplier`)
VALUES 
  ('1HGBH41JXMN109186', 'K24Z7-1234567', 'Honda', 'Civic EX', 'American Honda Motor Co.', '2021', 'Blanco Perla', 'Automática', 'FWD', 'Sedán', '1.5L Turbo', 'Gasolina', 1, 1, NULL);

-- 05/05/2026 - Creación de procedimientos de tabla units (Harry)

-- Se elimina el procedimiento si ya existe
DROP procedure IF EXISTS `getAllUnits`;

-- Procedimiento para obtener todas las units donde is_active = 1
DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllUnits` ()
BEGIN
	SELECT 
        id_car,
        VIN,
        engine_number,
        car_brand,
        car_name,
        legal_brand_name,
        year_manufacture,
        color,
        transmission,
        traction,
        body_work,
        engine_size,
        fuel_type,
        stock_status,
        id_supplier
    FROM units
    WHERE is_active = 1;
END$$

DELIMITER ;

-- Procedimiento para insertar en la tabla units

-- Se elimina el procedimiento si ya existe
DROP procedure IF EXISTS `insertUnit`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `insertUnit` (
	IN p_VIN              VARCHAR(17),
    IN p_engine_number    VARCHAR(17),
    IN p_car_brand        VARCHAR(100),
    IN p_car_name         VARCHAR(100),
    IN p_legal_brand_name VARCHAR(100),
    IN p_year_manufacture INT,
    IN p_color            VARCHAR(50),
    IN p_transmission     VARCHAR(10),
    IN p_traction         VARCHAR(10),
    IN p_body_work        VARCHAR(100),
    IN p_engine_size      VARCHAR(20),
    IN p_fuel_type        VARCHAR(20),
    IN p_stock_status     TINYINT,
    IN p_id_supplier      INT)
BEGIN
	INSERT INTO units (
        VIN,
        engine_number,
        car_brand,
        car_name,
        legal_brand_name,
        year_manufacture,
        color,
        transmission,
        traction,
        body_work,
        engine_size,
        fuel_type,
        stock_status,
        is_active,
        id_supplier
    )
    VALUES (
        p_VIN,
        p_engine_number,
        p_car_brand,
        p_car_name,
        p_legal_brand_name,
        p_year_manufacture,
        p_color,
        p_transmission,
        p_traction,
        p_body_work,
        p_engine_size,
        p_fuel_type,
        p_stock_status,
        1,
        p_id_supplier
    );
END$$

DELIMITER ;

-- Procedimiento para eliminar logicamente de tabla units 

-- Se elimina el procedimiento si ya existe
DROP procedure IF EXISTS `deleteUnit`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `deleteUnit` (IN p_id_car INT)
BEGIN
	UPDATE units
	SET is_active = 0
    WHERE id_car = p_id_car;
END$$

DELIMITER ;

-- Procedimiento para buscar una unidad con el VIN 

-- Se elimina el procedimiento si ya existe
DROP procedure IF EXISTS `findUnitByVIN`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `findUnitByVIN` (IN p_VIN VARCHAR(17))
BEGIN
	SELECT 
        id_car,
        VIN,
        engine_number,
        car_brand,
        car_name,
        legal_brand_name,
        year_manufacture,
        color,
        transmission,
        traction,
        body_work,
        engine_size,
        fuel_type,
        stock_status,
        id_supplier
    FROM units
    WHERE VIN = p_VIN
      AND is_active = 1;
END$$

DELIMITER ;

-- Procedimiento para buscar una unidad con el ID

-- Se elimina el procedimiento si ya existe
DROP procedure IF EXISTS `findUnitById`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `findUnitById` (IN p_id_car INT)
BEGIN
	SELECT 
        id_car,
        VIN,
        engine_number,
        car_brand,
        car_name,
        legal_brand_name,
        year_manufacture,
        color,
        transmission,
        traction,
        body_work,
        engine_size,
        fuel_type,
        stock_status,
        id_supplier
    FROM units
    WHERE id_car = p_id_car;
END$$

DELIMITER ;

-- Procedimiento para actualizar una unidad

-- Se elimina el procedimiento si ya existe
DROP procedure IF EXISTS `updateUnit`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `updateUnit` (
	IN p_id_car           INT,
	IN p_VIN              VARCHAR(17),
    IN p_engine_number    VARCHAR(17),
    IN p_car_brand        VARCHAR(100),
    IN p_car_name         VARCHAR(100),
    IN p_legal_brand_name VARCHAR(100),
    IN p_year_manufacture INT,
    IN p_color            VARCHAR(50),
    IN p_transmission     VARCHAR(10),
    IN p_traction         VARCHAR(10),
    IN p_body_work        VARCHAR(100),
    IN p_engine_size      VARCHAR(20),
    IN p_fuel_type        VARCHAR(20),
    IN p_stock_status     TINYINT,
    IN p_id_supplier      INT)
BEGIN
	UPDATE units
		SET
			VIN              = p_VIN,
			engine_number    = p_engine_number,
			car_brand        = p_car_brand,
			car_name         = p_car_name,
			legal_brand_name = p_legal_brand_name,
			year_manufacture = p_year_manufacture,
			color            = p_color,
			transmission     = p_transmission,
			traction         = p_traction,
			body_work        = p_body_work,
			engine_size      = p_engine_size,
			fuel_type        = p_fuel_type,
			stock_status     = p_stock_status,
			id_supplier      = p_id_supplier
    WHERE id_car = p_id_car
      AND is_active = 1;
END$$

DELIMITER ;





