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





