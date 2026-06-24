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

-- 07/05/26 Creacion de procedimientos para la tabla Administrator (Allan)

-- Obtener administradores


DROP PROCEDURE IF EXISTS getAllAdministrators;

DELIMITER $$
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
        u.is_active,
        u.password,
        u.id_role,
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

call insertAdministrator(
'adminfast',777777777,'adminfast@gmail.com','Admin1713*',88776655,'2000-05-17',null,1,'ADMIN00','adminfast@agenciafast.cr'
);

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
    IN p_id_role INT,

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
        is_active,
        id_role
    )
    VALUES(
        p_name,
        p_identification,
        p_email,
        p_password,
        p_phone_number,
        p_date_birth,
        p_profile_image,
        TRUE,
        p_id_role
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

	COMMIT;

END $$

DELIMITER ;


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
    IN p_id_role INT,
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
        profile_image = p_profile_image,
        id_role = p_id_role
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
USE `db_fast506`$$
CREATE PROCEDURE insertMechanic(

    IN p_name VARCHAR(100),
    IN p_identification INT,
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_phone_number VARCHAR(15),
    IN p_date_birth DATE,
    IN p_profile_image VARCHAR(500),
    IN p_id_Role INT,
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
        RESIGNAL;
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
        is_active,
        id_Role
    )
    VALUES(
        p_name,
        p_identification,
        p_email,
        p_password,
        p_phone_number,
        p_date_birth,
        p_profile_image,
        TRUE,
        p_id_role
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
        u.is_active,
        u.password,
        u.id_role,

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

--

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
USE `db_fast506`$$
CREATE PROCEDURE insertClient(

    IN p_name VARCHAR(100),
    IN p_identification INT,
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_phone_number VARCHAR(15),
    IN p_date_birth DATE,
    IN p_profile_image VARCHAR(500),
    IN p_id_Role INT,

    IN p_comm_interest VARCHAR(50),
    IN p_physical_address VARCHAR(255),
    IN p_occupation VARCHAR(100)

)
BEGIN

    DECLARE v_id_user INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
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
        is_active,
        id_Role
    )
    VALUES(
        p_name,
        p_identification,
        p_email,
        p_password,
        p_phone_number,
        p_date_birth,
        p_profile_image,
        TRUE,
        p_id_Role
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
        u.is_active,
        u.password,
        u.id_Role,

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
    
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Llave foránea de Administrador
    admin_id INT NOT NULL,
    
    CONSTRAINT fk_supplier_admin
        FOREIGN KEY (admin_id)
        REFERENCES users(id_user) -- ver si cambiar dependiendo de como lo puso Allan
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
 
  
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
        is_active,
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
    
    

-- 05/05/2026 - Creación de procedimientos de tabla units (Harry)

-- Se elimina el procedimiento si ya existe
DROP procedure IF EXISTS `getAllUnits`;

-- Procedimiento para obtener todas las units donde is_active = 1
DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllUnits`()
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
        is_active,
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
CREATE  PROCEDURE `findUnitByVIN`(IN p_VIN VARCHAR(17))
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
        is_active,
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

-- 09/05/2026 - Creación de la tabla Branch (Ilian)

CREATE TABLE `db_fast506`.`branch` (
  `id_Branch` INT(11) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `ubication` VARCHAR(100) NOT NULL,
  `direction` VARCHAR(100) NOT NULL,
  `branch_Phone_Number` VARCHAR(15) NOT NULL,
  `operation_Schedule` VARCHAR(200) NOT NULL,
  `id_Active` TINYINT NOT NULL,
  `id_user` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_Branch`),
  INDEX `fk_branch_users_id_idx` (`id_user` ASC) ,
  CONSTRAINT `fk_branch_users_id`
    FOREIGN KEY (`id_user`)
    REFERENCES `db_fast506`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Procedimiento almacenado obtener Branch

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllBranch` ()
BEGIN
SELECT id_Branch ,name ,ubication , direction ,branch_Phone_Number , operation_Schedule ,id_user FROM branch Where id_Active = 1;
END$$

DELIMITER ;

-- Funcionamiento de auto incremento

ALTER TABLE `db_fast506`.`branch` 
CHANGE COLUMN `id_Branch` `id_Branch` INT(11) NOT NULL AUTO_INCREMENT ;



-- creacion de procedimiento para agregar sucursales

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `createBranch` (
in nameB varchar(50),
in ubicationb varchar(100),
in directionB varchar (100),
in branch_Phone_NumberB varchar(15),
in operation_ScheduleB varchar(200),
in id_UserB int )
BEGIN
INSERT INTO branch ( name, ubication, direction, branch_Phone_Number, operation_Schedule, id_Active, id_user) VALUES(
nameB, ubicationb, directionB, branch_Phone_NumberB, operation_ScheduleB, 1, id_UserB);
END$$

DELIMITER ;

-- procedimiento almacenado Actualizar Sucursal

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `updateBranch` (
in id_BranchB int,
in nameB varchar(50),
in ubicationb varchar(100),
in directionB varchar (100),
in branch_Phone_NumberB varchar(15),
in operation_ScheduleB varchar(200),
in id_userB int )
BEGIN
update branch set 
name= nameb,
 ubication=ubicationb,
 direction= directionb,
 branch_Phone_Number= branch_Phone_NumberB,
 operation_Schedule= operation_ScheduleB,
 id_user= id_userB
 WHERE id_Branch = id_BranchB
 AND id_Active =1;
END$$

DELIMITER ;

-- procedimiento almacenado eliminar sucursal 
DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `deleteBranch` (in id_BranchB INT)
BEGIN
UPDATE branch
	SET id_active = 0
    WHERE id_Branch = id_BranchB;
END$$

DELIMITER ;

-- 10/5/2026 (Ajustes para ingresar un nuevo atributo a Branch (Coordinates))

-- Nueva columna coordenadas
ALTER TABLE `db_fast506`.`branch` 
ADD COLUMN `coordinates` VARCHAR(40) NOT NULL AFTER `id_Active`;

-- PA guardar Branch

USE `db_fast506`;
DROP procedure IF EXISTS `createBranch`;

USE `db_fast506`;
DROP procedure IF EXISTS `db_fast506`.`createBranch`;
;

DELIMITER $$
USE `db_fast506`$$
CREATE  PROCEDURE `createBranch`(
in nameB varchar(50),
in ubicationb varchar(100),
in directionB varchar (100),
in branch_Phone_NumberB varchar(15),
in operation_ScheduleB varchar(200),
in coordinatesB varchar(40),
in id_UserB int )
BEGIN
INSERT INTO branch ( name, ubication, direction, branch_Phone_Number, operation_Schedule, id_Active, coordinates, id_user) VALUES(
nameB, ubicationb, directionB, branch_Phone_NumberB, operation_ScheduleB, 1, coordinatesB ,id_UserB);
END$$

DELIMITER ;
;

-- PA Obtener todas las Sucursales

USE `db_fast506`;
DROP procedure IF EXISTS `getAllBranch`;

USE `db_fast506`;
DROP procedure IF EXISTS `db_fast506`.`getAllBranch`;
;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllBranch`()
BEGIN
SELECT id_Branch ,name ,ubication , direction ,branch_Phone_Number , operation_Schedule, coordinates ,id_user FROM branch Where id_Active = 1;
END$$

DELIMITER ;
;

-- PA Actualizar Sucursal

USE `db_fast506`;
DROP procedure IF EXISTS `updateBranch`;

USE `db_fast506`;
DROP procedure IF EXISTS `db_fast506`.`updateBranch`;
;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `updateBranch`(
in id_BranchB int,
in nameB varchar(50),
in ubicationb varchar(100),
in directionB varchar (100),
in branch_Phone_NumberB varchar(15),
in operation_ScheduleB varchar(200),
in coordinatesB varchar(40),
in id_userB int )
BEGIN
update branch set 
name= nameb,
 ubication=ubicationb,
 direction= directionb,
 branch_Phone_Number= branch_Phone_NumberB,
 operation_Schedule= operation_ScheduleB,
 coordinates = coordinatesB,
 id_user= id_userB
 WHERE id_Branch = id_BranchB
 AND id_Active =1;
END$$

DELIMITER ;
;


-- ILIAN 18/5/2026
-- Cambio del PA getAllBranch para agregar isActive

USE `db_fast506`;
DROP procedure IF EXISTS `getAllBranch`;

USE `db_fast506`;
DROP procedure IF EXISTS `db_fast506`.`getAllBranch`;
;

DELIMITER $$
USE `db_fast506`$$
CREATE  PROCEDURE `getAllBranch`()
BEGIN
SELECT id_Branch ,name ,ubication , direction ,branch_Phone_Number , operation_Schedule, id_active, coordinates ,id_user FROM branch Where id_Active = 1;
END$$

DELIMITER ;
;

-- TABLA TESTDRIVE

CREATE TABLE `db_fast506`.`testdrive` (
  `id_Test` INT NOT NULL AUTO_INCREMENT,
  `number_Reference` INT NOT NULL,
  `creation_Date` DATE NOT NULL,
  `scheduled_Date` DATE NOT NULL,
  `initiation_Time` TIME NOT NULL,
  `finalization_Time` TIME NOT NULL,
  `status_Appointment` VARCHAR(45) NOT NULL,
  `is_Active` TINYINT NOT NULL,
  `id_user` INT NOT NULL,
  `id_car` INT NOT NULL,
  `id_branch` INT NOT NULL,
  PRIMARY KEY (`id_Test`),
  INDEX `fk_testdrive_users_id_idx` (`id_user` ASC) ,
  INDEX `fk_testdrive_units_id_idx` (`id_car` ASC) ,
  INDEX `fk_testdrive_branch_id_idx` (`id_branch` ASC) ,
  CONSTRAINT `fk_testdrive_users_id`
    FOREIGN KEY (`id_user`)
    REFERENCES `db_fast506`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_testdrive_units_id`
    FOREIGN KEY (`id_car`)
    REFERENCES `db_fast506`.`units` (`id_car`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_testdrive_branch_id`
    FOREIGN KEY (`id_branch`)
    REFERENCES `db_fast506`.`branch` (`id_Branch`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    

    -- PA ELIMINAR
USE `db_fast506`;

DROP PROCEDURE IF EXISTS `deleteTestdrive`;

DELIMITER $$

CREATE PROCEDURE `deleteTestdrive` (IN id_TestT INT)
BEGIN
    UPDATE testdrive
    SET is_Active = 0
    WHERE id_Test = id_TestT;
END$$

DELIMITER ;
    
-- 18/05/2026 Tabla de catalogos (Harry)

CREATE TABLE `db_fast506`.`catalogs` (
  `id_catalogs` INT NOT NULL AUTO_INCREMENT,
  `car_name` VARCHAR(100) NULL,
  `brand_name` VARCHAR(100) NULL,
  `body_work` VARCHAR(100) NULL,
  `technical_description` VARCHAR(500) NULL,
  `base_price` DOUBLE NULL,
  `image` VARCHAR(500) NULL,
  `year_manufacture` INT NULL,
  `transmission` VARCHAR(10) NULL,
  `fuel_type` VARCHAR(10) NULL,
  `engine_size` VARCHAR(20) NULL,
  `is_active` TINYINT NULL,
  PRIMARY KEY (`id_catalogs`),
  UNIQUE INDEX `id_catalogs_UNIQUE` (`id_catalogs` ASC) );
-- cambios en la tabla  
  ALTER TABLE `db_fast506`.`catalogs` 
CHANGE COLUMN `id_catalogs` `id_catalog` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `car_name` `car_name` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `brand_name` `brand_name` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `body_work` `body_work` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `technical_description` `technical_description` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `base_price` `base_price` DOUBLE NOT NULL ,
CHANGE COLUMN `image` `image` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `year_manufacture` `year_manufacture` INT(11) NOT NULL ,
CHANGE COLUMN `transmission` `transmission` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `fuel_type` `fuel_type` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `engine_size` `engine_size` VARCHAR(255) NOT NULL ;


-- sp getAllCatalog 
DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllCatalogs`()
BEGIN
    SELECT 
        id_catalog,
        car_name,
        brand_name,
        body_work,
        technical_description,
        base_price,
        image,
        year_manufacture,
        transmission,
        fuel_type,
        engine_size,
        is_active
    FROM db_fast506.catalogs
    WHERE is_active = 1;
END$$

DELIMITER ;

-- PA GETALLTESTDRIVE

USE `db_fast506`;
DROP procedure IF EXISTS `getAllTestdrive`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllTestdrive` ()
BEGIN
SELECT id_Test, number_Reference, creation_Date, scheduled_Date, initiation_Time, finalization_Time, status_Appointment, is_Active, id_user, id_car, id_branch FROM testdrive WHERE is_Active=1;

END$$

DELIMITER ;

-- PA OBTENER HORAS DE CITAS DE DIA ESPECIFICO SOBRE TESTDRIVES

USE `db_fast506`;
DROP procedure IF EXISTS `getOccupiedHoursByDate`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getOccupiedHoursByDate` (IN scheduled_dateS DATE)
BEGIN
    SELECT DATE_FORMAT(initiation_Time, '%H:%i') AS occupied_hour
    FROM testdrive
    WHERE scheduled_Date = scheduled_dateS
      AND is_Active = 1;
END;$$

DELIMITER ;

DELIMITER $$
USE `db_fast506`$$
CREATE  PROCEDURE `deleteCatalog`(
    IN p_idCatalog INT
)
BEGIN
    UPDATE catalogs
    SET is_active = 0
    WHERE id_catalog = p_idCatalog;
END$$
DELIMITER ;

--  19/05/2026 - datos de prueba en la tabla units 

INSERT INTO units (VIN, engine_number, car_brand, car_name, legal_brand_name, year_Manufacture, color, transmission, traction, body_work, engine_size, fuel_type, stock_status, is_active, id_supplier) VALUES
-- Bloque de Nissan Sentra (10 unidades ficticias, metemos 2 de prueba con misma transmisión)
('3N1AB8APXL111111', 'MR20-111111A', 'Nissan', 'Sentra S', 'Nissan Motor Co.', 2026, 'Gris Platino', 'Automática', 'FWD', 'Sedán', '2.0L', 'Gasolina', 1, 1, NULL),
('3N1AB8APXL222222', 'MR20-222222B', 'Nissan', 'Sentra S', 'Nissan Motor Co.', 2026, 'Negro', 'Automática', 'FWD', 'Sedán', '2.0L', 'Gasolina', 1, 1, NULL),

-- Bloque de Toyota Hilux vs Hilux Gazoo Racing (Deben salir separados)
('8AJHA8DCX1111111', '1GD-1111111', 'Toyota', 'Hilux elct', 'Toyota Motor Corp.', 2026, 'Blanco', 'Manual', '4x4', 'Pick-up', '2.8L', 'Diésel', 1, 1, NULL),
('8AJHA8DCX2222222', '1GD-2222222', 'Toyota', 'Hilux Gazoo Racing', 'Toyota Motor Corp.', 2026, 'Blanco/Negro GR', 'Automática', '4x4', 'Pick-up', '2.8L', 'Diésel', 1, 1, NULL),

-- Bloque de Toyota RAV4 (Diferentes transmisiones y motores, deben salir las 4 por separado)
('JTMDFRFV11111111', 'A25A-1111111', 'Toyota', 'RAV4', 'Toyota Motor Corp.', 2026, 'Azul Metálico', 'Manual', 'AWD', 'SUV', '2.5L', 'Gasolina', 1, 1, NULL),
('JTMDFRFV22222222', 'A25A-2222222', 'Toyota', 'RAV4', 'Toyota Motor Corp.', 2026, 'Rojo', 'Automático', 'AWD', 'SUV', '2.5L', 'Gasolina', 1, 1, NULL),
('JTMDFRFV33333333', 'A25A-3333333', 'Toyota', 'RAV4', 'Toyota Motor Corp.', 2026, 'Plata', 'Automático', 'AWD', 'SUV', '2.5L Híbrido', 'Híbrido', 1, 1, NULL),
('JTMDFRFV44444444', '365V-4444444', 'Toyota', 'RAV4', 'Toyota Motor Corp.', 2026, 'Blanco Perla', 'Automático', 'AWD', 'SUV', 'Batería 150kW', 'Eléctrico', 1, 1, NULL),
-- Una segunda RAV4 automática híbrida para probar que la ignore y solo deje una
('JTMDFRFV55555555', 'A25A-5555555', 'Toyota', 'RAV4', 'Toyota Motor Corp.', 2026, 'Gris', 'Automático', 'AWD', 'SUV', '2.5L Híbrido', 'Híbrido', 1, 1, NULL);

INSERT INTO units (VIN, engine_number, car_brand, car_name, legal_brand_name, year_Manufacture, color, transmission, traction, body_work, engine_size, fuel_type, stock_status, is_active, id_supplier) VALUES
('3N1AB8APXL333333', 'MR20-222222C', 'Nissan', 'Sentra S', 'Nissan Motor Co.', 2026, 'Negro', 'CVT', 'FWD', 'Sedán', '2.0L', 'Gasolina', 1, 1, NULL),
('JTMDFRFV66666666', 'A25A-222222B', 'Toyota', 'RAV4', 'Toyota Motor Corp.', 2026, 'Rojo', 'Automático', 'AWD', 'SUV', '2.5L', 'Diesel', 1, 1, NULL);

-- datos prueba de catalogos

INSERT INTO catalogs 
(car_name, brand_name, body_work, technical_description, base_price, image, year_manufacture, transmission, fuel_type, engine_size, is_active) 
VALUES
-- 1. Bloqueamos el Nissan Sentra S Automático
('Sentra S', 'Nissan', 'Sedán', 'Versión base con excelente consumo', 24000, 'uploads/51c1e75b-916d-47f1-96d3-deb87787865e_nissan-sentra-s.png', 2026, 'Automático', 'Combustible', '2.0L', 1),

-- 2. Bloqueamos la Toyota RAV4 Híbrida
('RAV4', 'Toyota', 'SUV', 'Eficiencia híbrida para todo terreno', 42000, 'uploads/0d941b5d-127f-4bc6-9b97-a2e9662a89a1_rav4.png', 2026, 'Automático', 'Híbrido', '2.5L Híbrido', 1);

-- procedimiento para agrupar y comparar catalogos on unidades disponibles, este une las unidades por ciertos atributos y facilita para hacer un catalogo
DELIMITER $$
USE `db_fast506`$$
CREATE  PROCEDURE `units_groud_exists`()
BEGIN
    SELECT 
        u.car_brand,
        u.car_name,
        u.year_Manufacture,
        CASE 
            WHEN u.transmission IN ('Automática', 'CVT') THEN 'Automático'
            ELSE u.transmission 
        END AS transmission_group,
        u.body_work,
        CASE 
            WHEN u.fuel_type IN ('Gasolina', 'Diesel') THEN 'Combustible'
            ELSE u.fuel_type 
        END AS fuel_group
    FROM units u
    LEFT JOIN db_fast506.catalogs c ON 
        u.car_brand = c.brand_name 
        AND u.car_name = c.car_name 
        AND u.year_Manufacture = c.year_manufacture
        AND u.body_work = c.body_work
        AND (CASE 
                WHEN u.transmission IN ('Automática', 'CVT') THEN 'Automático'
                ELSE u.transmission 
             END) = c.transmission
        AND (CASE 
                WHEN u.fuel_type IN ('Gasolina', 'Diesel') THEN 'Combustible'
                ELSE u.fuel_type 
             END) = c.fuel_type
    WHERE 
        u.is_active = 1 
        AND u.stock_status = 1 
        AND c.id_catalog IS NULL 
    GROUP BY 
        u.car_brand,
        u.car_name,
        u.year_Manufacture,
        CASE 
            WHEN u.transmission IN ('Automática', 'CVT') THEN 'Automático'
            ELSE u.transmission 
        END,
        u.body_work,
        CASE 
            WHEN u.fuel_type IN ('Gasolina', 'Diesel') THEN 'Combustible'
            ELSE u.fuel_type 
        END;
END$$
DELIMITER ;

-- (20/5/2026) Ilian PA AJUSTADO PARA VER LAS HORAS DE CITAS DE TESTDRIVES DISPONIBLE POR ICTAS Y SUCURSAL


USE `db_fast506`;
DROP procedure IF EXISTS `getOccupiedHoursByDate`;

USE `db_fast506`;
DROP procedure IF EXISTS `db_fast506`.`getOccupiedHoursByDate`;
;

DELIMITER $$
USE `db_fast506`$$
CREATE  PROCEDURE `getOccupiedHoursByDate`(IN scheduled_dateS DATE, IN id_branchP INT)
BEGIN
    SELECT DATE_FORMAT(initiation_Time, '%H:%i') AS occupied_hour
    FROM testdrive
    WHERE scheduled_Date = scheduled_dateS
      AND id_Branch = id_branchP 
      AND is_Active = 1;
END$$

DELIMITER ;
;

-- 22/05/2026 sp para saber las categorias del catalogo y cuantas del mismo hay

DELIMITER $$

CREATE PROCEDURE getBodyworksCatalog()
BEGIN

    SELECT 
        body_work,
        COUNT(*) AS total
    FROM catalogs
    GROUP BY body_work;

END $$

DELIMITER ;

-- Seleccionar segun su bodywork
DELIMITER $$

CREATE  PROCEDURE `getCatalogsByBodyWork`(
	IN p_body_work VARCHAR(100)
    )
BEGIN
    SELECT 
        id_catalog,
        car_name,
        brand_name,
        body_work,
        technical_description,
        base_price,
        image,
        year_manufacture,
        transmission,
        fuel_type,
        engine_size,
        is_active
    FROM db_fast506.catalogs
    WHERE is_active = 1 AND
    body_work = p_body_work;
END$$

DELIMITER ;




     
-- (22/5/2026) ILIAN PA UNIDADES QUE ESTAN EN EL CATALOGO

USE `db_fast506`;
DROP procedure IF EXISTS `getAllCarAvailable`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllCarAvailable` ()
BEGIN
SELECT u.* FROM catalogs c INNER JOIN units u ON u.id_car = (
        SELECT sub.id_car 
        FROM units sub
        WHERE sub.is_active = 1
          AND sub.car_brand = c.brand_name
          AND sub.car_name = c.car_name
          AND sub.year_Manufacture = c.year_manufacture
          AND (
              (LOWER(c.transmission) = 'automático' AND LOWER(sub.transmission) IN ('automatico', 'automático', 'cvt'))
              OR 
              (LOWER(c.transmission) != 'automático' AND LOWER(sub.transmission) = LOWER(c.transmission))
          )
          AND (
              (LOWER(c.fuel_type) = 'combustible' AND LOWER(sub.fuel_type) IN ('gasolina', 'diesel', 'diésel'))
              OR 
              (LOWER(c.fuel_type) != 'combustible' AND LOWER(sub.fuel_type) = LOWER(c.fuel_type))
          )
        LIMIT 1
    )
    WHERE u.is_active = 1;
END$$

DELIMITER ;

-- TABLA QUOTATION

CREATE TABLE `db_fast506`.`quotation` (
  `id_Quotation` INT NOT NULL AUTO_INCREMENT,
  `reference_Number` INT NOT NULL,
  `date` DATE NOT NULL,
  `initial_Price` DECIMAL(10,2) NOT NULL,
  `transfer_Cost` DECIMAL(10,2) NOT NULL,
  `sales_Tax` DECIMAL(10,2) NOT NULL,
  `total_Payment` DECIMAL(10,2) NOT NULL,
  `is_Active` TINYINT NOT NULL,
  `id_user` INT NOT NULL,
  `id_catalog` INT NOT NULL,
  `id_car` INT NOT NULL,
  PRIMARY KEY (`id_Quotation`),
  INDEX `fk_quotation_users_id_user_idx` (`id_user` ASC) ,
  INDEX `fk_quotation_catalogs_id_catalog_idx` (`id_catalog` ASC) ,
  INDEX `fk_quotation_units_id_car_idx` (`id_car` ASC) ,
  CONSTRAINT `fk_quotation_users_id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `db_fast506`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_quotation_catalogs_id_catalog`
    FOREIGN KEY (`id_catalog`)
    REFERENCES `db_fast506`.`catalogs` (`id_catalog`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_quotation_units_id_car`
    FOREIGN KEY (`id_car`)
    REFERENCES `db_fast506`.`units` (`id_car`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    -- PA GETALLQUOTATION
    
    USE `db_fast506`;
DROP procedure IF EXISTS `getAllQuotation`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllQuotation` ()
BEGIN
SELECT id_Quotation ,reference_Number ,date , initial_Price ,transfer_Cost , sales_Tax, total_Payment, is_Active ,id_user,id_catalog, id_car FROM quotation Where is_Active = 1;
END$$

DELIMITER ;

-- PA ELIMINAR COTIZACION

USE `db_fast506`;
DROP procedure IF EXISTS `deleteQuotation`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `deleteQuotation` (IN id_QuotationQ int)
BEGIN
UPDATE quotation
	SET is_Active = 0
    WHERE id_Quotation = id_QuotationQ;
END$$

DELIMITER ;

/*
-- PA DEVUELVE UNA UNIDAD REPETIDA O NO PERO SIN REPETIR SU TRACCION (METODO ANTIGUO)
USE `db_fast506`;
DROP procedure IF EXISTS `getUnitsByCatalog`;

DELIMITER $$

CREATE PROCEDURE `getUnitsByCatalog` (IN idCatalogC INT)
BEGIN
    SELECT u.* FROM units u
    INNER JOIN catalogs c ON 
        u.car_brand = c.brand_name AND u.car_name = c.car_name AND u.year_Manufacture = c.year_manufacture
        AND (
            (LOWER(c.transmission) = 'automático' AND LOWER(u.transmission) IN ('automatico', 'automático', 'cvt'))
            OR 
            (LOWER(c.transmission) != 'automático' AND LOWER(u.transmission) = LOWER(c.transmission))
        )
        AND (
            (LOWER(c.fuel_type) = 'combustible' AND LOWER(u.fuel_type) IN ('gasolina', 'diesel', 'diésel'))
            OR 
            (LOWER(c.fuel_type) != 'combustible' AND LOWER(u.fuel_type) = LOWER(c.fuel_type))
        )
    WHERE c.id_catalog = idCatalogC 
	AND u.is_active = 1
    GROUP BY u.traction;
END$$

DELIMITER ;

*/

-- PA DEVUELVE UNA UNIDAD REPETIDA O NO PERO SIN REPETIR SU TRACCION

USE `db_fast506`;
DROP procedure IF EXISTS `getUnitsByCatalog`;

DELIMITER $$

CREATE PROCEDURE `getUnitsByCatalog` (IN idCatalogC INT)
BEGIN
    SELECT 
        ANY_VALUE(u.id_car) AS id_car,
        ANY_VALUE(u.vin) AS vin,
        ANY_VALUE(u.engine_number) AS engine_number,
        ANY_VALUE(u.car_brand) AS car_brand,
        ANY_VALUE(u.car_name) AS car_name,
        ANY_VALUE(u.legal_brand_name) AS legal_brand_name,
        ANY_VALUE(u.year_manufacture) AS year_manufacture,
        ANY_VALUE(u.color) AS color,
        ANY_VALUE(u.transmission) AS transmission,
        ANY_VALUE(u.body_work) AS body_work,
        ANY_VALUE(u.engine_size) AS engine_size,
        ANY_VALUE(u.fuel_type) AS fuel_type,
        ANY_VALUE(u.stock_status) AS stock_status,
        ANY_VALUE(u.is_active) AS is_active,
        ANY_VALUE(u.id_supplier) AS id_supplier,
        u.traction
    FROM units u
    INNER JOIN catalogs c ON 
        u.car_brand = c.brand_name AND u.car_name = c.car_name AND u.year_Manufacture = c.year_manufacture
        AND (
            
        (LOWER(c.transmission) = 'automático' AND LOWER(u.transmission) IN ('automatico', 'automático', 'cvt'))
            OR 
            (LOWER(c.transmission) != 'automático' AND LOWER(u.transmission) = LOWER(c.transmission))
        )
        AND (
            
        (LOWER(c.fuel_type) = 'combustible' AND LOWER(u.fuel_type) IN ('gasolina', 'diesel', 'diésel'))
            OR 
            (LOWER(c.fuel_type) != 'combustible' AND LOWER(u.fuel_type) = LOWER(c.fuel_type))
        )
    WHERE c.id_catalog = idCatalogC 
	AND u.is_active = 1
    GROUP BY u.traction;
END$$

DELIMITER ;


-- 23-05-26 CREACION TABLA AD

CREATE TABLE `db_fast506`.`ad` (
  `id_Ad` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `expiration_Date` DATE NULL,
  `category` VARCHAR(50) NOT NULL,
  `publication_Status` TINYINT NOT NULL,
  `is_Active` TINYINT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_Ad`),
  INDEX `fk_ad_id_user_idx` (`id_user` ASC) ,
  CONSTRAINT `fk_ad_id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `db_fast506`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    -- PA GETALLAD
    
    USE `db_fast506`;
DROP procedure IF EXISTS `getAllAd`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllAd` ()
BEGIN
SELECT id_Ad, title, image, expiration_Date, category, publication_Status, is_Active, id_user FROM ad where is_Active=1;
END$$

DELIMITER ;

-- PA DELETEAD

USE `db_fast506`;
DROP procedure IF EXISTS `deleteAd`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `deleteAd` (IN id_AdA INT)
BEGIN
UPDATE ad
	SET is_Active = 0
    WHERE id_Ad = id_AdA; 
END$$

DELIMITER ;

-- PA DESACTIVAR ANUNCIOS POR FECHA DE EXPIRACINO

USE `db_fast506`;
DROP procedure IF EXISTS `deactivateAdByExpirationDatePA`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `deactivateAdByExpirationDatePA` ()
BEGIN
UPDATE ad 
    SET publication_status = false 
    WHERE expiration_date <= CURRENT_DATE() 
      AND publication_status = true 
      AND is_active = 1;
END$$

DELIMITER ;

-- PA ANUNCIOS POR MARCA

USE `db_fast506`;
DROP procedure IF EXISTS `getAllAdBranch`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllAdBranch` ()
BEGIN
SELECT id_Ad, title, image, expiration_Date, category, publication_status, is_Active, id_user FROM ad where is_active=1 AND category = 'Marcas';

END$$

DELIMITER ;

-- AD ANUNCIOS POR IMPUBLICITARIAS

USE `db_fast506`;
DROP procedure IF EXISTS `getAllAdAdvertisement`;

DELIMITER $$
USE `db_fast506`$$
CREATE PROCEDURE `getAllAdAdvertisement` ()
BEGIN
SELECT id_Ad, title, image, expiration_Date, category, publication_status, is_Active, id_user FROM ad where is_active=1 AND category = 'Anuncios';

END$$

DELIMITER ;
-- 25/05/2026 harry sp para colores
DELIMITER $$

CREATE PROCEDURE `getColorsByCatalog`(
    IN p_id_catalog INT
)
BEGIN
    SELECT u.color
    FROM units u
    INNER JOIN catalogs c ON c.id_catalog = p_id_catalog
    WHERE u.car_name         = c.car_name
	AND u.car_brand        = c.brand_name
	AND u.body_work        = c.body_work
	AND u.year_manufacture = c.year_manufacture
	AND (
		(c.fuel_type = 'combustible' AND u.fuel_type IN ('gasolina', 'diesel'))
		OR
		(u.fuel_type = c.fuel_type)
	)
	AND (
		(c.transmission = 'automatico' AND u.transmission IN ('automatico', 'cvt'))
		OR
		(u.transmission = c.transmission)
	);
END$$

DELIMITER ;
  
-- 25/05/2026 tabla de ventas

CREATE TABLE `db_fast506`.`sales` (
  `id_sales` INT NOT NULL,
  `invoice_number` INT(10) NULL,
  `transaction_date` DATE NULL,
  `payment_method` VARCHAR(45) NULL,
  `base_price` DOUBLE NULL,
  `sales_tax` DOUBLE NULL,
  `extras` DOUBLE NULL,
  `total_payment` DOUBLE NULL,
  `transfer_cost` DOUBLE NULL,
  `id_client` INT NULL,
  `id_admin` INT NULL,
  `id_car` INT NULL,
  `id_catalog` INT NULL,
  `is_active` TINYINT NULL,
  PRIMARY KEY (`id_sales`),
  INDEX `fk_sales_client_id_idx` (`id_client` ASC) ,
  INDEX `fk_sales_admin_id_idx` (`id_admin` ASC) ,
  INDEX `fk_sales_car_id_idx` (`id_car` ASC) ,
  INDEX `fk_sales_catalog_id_idx` (`id_catalog` ASC) ,
  CONSTRAINT `fk_sales_client_id`
    FOREIGN KEY (`id_client`)
    REFERENCES `db_fast506`.`client` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_admin_id`
    FOREIGN KEY (`id_admin`)
    REFERENCES `db_fast506`.`administrator` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_car_id`
    FOREIGN KEY (`id_car`)
    REFERENCES `db_fast506`.`units` (`id_car`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_catalog_id`
    FOREIGN KEY (`id_catalog`)
    REFERENCES `db_fast506`.`catalogs` (`id_catalog`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    ALTER TABLE `db_fast506`.`sales` 
DROP FOREIGN KEY `fk_sales_admin_id`,
DROP FOREIGN KEY `fk_sales_car_id`,
DROP FOREIGN KEY `fk_sales_catalog_id`,
DROP FOREIGN KEY `fk_sales_client_id`;
ALTER TABLE `db_fast506`.`sales` 
CHANGE COLUMN `id_sales` `id_sales` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `invoice_number` `invoice_number` INT(10) NOT NULL ,
CHANGE COLUMN `transaction_date` `transaction_date` DATE NOT NULL ,
CHANGE COLUMN `payment_method` `payment_method` VARCHAR(255) NOT NULL ,
CHANGE COLUMN `base_price` `base_price` DOUBLE NULL ,
CHANGE COLUMN `sales_tax` `sales_tax` DOUBLE NULL ,
CHANGE COLUMN `extras` `extras` DOUBLE NULL ,
CHANGE COLUMN `id_client` `id_client` INT(11) NOT NULL ,
CHANGE COLUMN `id_admin` `id_admin` INT(11) NOT NULL ,
CHANGE COLUMN `id_car` `id_car` INT(11) NOT NULL ,
CHANGE COLUMN `id_catalog` `id_catalog` INT(11) NOT NULL ,
ADD UNIQUE INDEX `id_sales_UNIQUE` (`id_sales` ASC) ;
;
ALTER TABLE `db_fast506`.`sales` 
ADD CONSTRAINT `fk_sales_admin_id`
  FOREIGN KEY (`id_admin`)
  REFERENCES `db_fast506`.`administrator` (`id_user`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_sales_car_id`
  FOREIGN KEY (`id_car`)
  REFERENCES `db_fast506`.`units` (`id_car`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_sales_catalog_id`
  FOREIGN KEY (`id_catalog`)
  REFERENCES `db_fast506`.`catalogs` (`id_catalog`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_sales_client_id`
  FOREIGN KEY (`id_client`)
  REFERENCES `db_fast506`.`client` (`id_user`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

  ALTER TABLE `db_fast506`.`sales` 
ADD COLUMN `state_sales` VARCHAR(45) NOT NULL AFTER `is_active`;

ALTER TABLE `db_fast506`.`sales` 
DROP FOREIGN KEY `fk_sales_admin_id`;
ALTER TABLE `db_fast506`.`sales` 
CHANGE COLUMN `id_admin` `id_admin` INT(11) NULL DEFAULT NULL ,
CHANGE COLUMN `state_sales` `sales_status` VARCHAR(20) NOT NULL DEFAULT 'Pendiente' ;
ALTER TABLE `db_fast506`.`sales` 
ADD CONSTRAINT `fk_sales_admin_id`
  FOREIGN KEY (`id_admin`)
  REFERENCES `db_fast506`.`administrator` (`id_user`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

  -- 25/05/2026 sp de listar ventas (harry)
  
DELIMITER $$

CREATE PROCEDURE `getAllSales`()
BEGIN
    SELECT
        id_sales,
        invoice_number,
        transaction_date,
        payment_method,
        base_price,
        sales_tax,
        extras,
        total_payment,
        transfer_cost,
        sales_status,
        id_client,
        id_admin,
        id_car,
        id_catalog,
        is_active
    FROM
        sales
    WHERE
        is_active = 1;
END $$

DELIMITER ;
 
  -- 25/05/2026 sp de eliminar ventas (harry)
  
DELIMITER $$

CREATE PROCEDURE deleteSales(
    IN p_id_sales INT
)
BEGIN
    UPDATE sales
    SET
        is_active = 0
    WHERE
        id_sales = p_id_sales;
END $$

DELIMITER ; 

-- 26/05/2026 sp para verificar si es admin

DROP PROCEDURE IF EXISTS getAdminByCredentials;
DELIMITER $$


CREATE PROCEDURE getAdminByCredentials(IN p_email VARCHAR(255), IN p_password VARCHAR(255))
BEGIN
    SELECT 
        u.id_user,
        u.name,
        u.id,
        u.email,
        u.password,
        u.phone_number,
        u.date_birth,
        u.profile_image,
        u.is_active,
        u.id_role,
        a.employee_id,
        a.corporate_email
    FROM users u 
    INNER JOIN administrator a ON u.id_user = a.id_user 
    WHERE u.email = p_email 
    AND u.password = p_password;
END$$

DELIMITER ;

-- 26/05/2026 sp para agrupar por colores

DELIMITER $$

CREATE  PROCEDURE `getColorsByCatalogAndTraction`(
    IN idCatalogC INT,
    IN tractionC VARCHAR(50)
)
BEGIN

    SELECT DISTINCT
        u.id_car,
        u.VIN,
        u.engine_number,
        u.car_brand,
        u.car_name,
        u.legal_brand_name,
        u.year_manufacture,
        u.color,
        u.transmission,
        u.traction,
        u.body_work,
        u.engine_size,
        u.fuel_type,
        u.stock_status,
        u.id_supplier,
        u.is_active

    FROM units u

    INNER JOIN catalogs c
        ON u.car_brand = c.brand_name
        AND u.car_name = c.car_name
        AND u.year_manufacture = c.year_manufacture

        AND (
            (
                LOWER(c.transmission) = 'automático'
                AND LOWER(u.transmission)
                    IN ('automatico', 'automático', 'cvt')
            )

            OR

            (
                LOWER(c.transmission) != 'automático'
                AND LOWER(u.transmission)
                    = LOWER(c.transmission)
            )
        )

        AND (
            (
                LOWER(c.fuel_type) = 'combustible'
                AND LOWER(u.fuel_type)
                    IN ('gasolina', 'diesel', 'diésel')
            )

            OR

            (
                LOWER(c.fuel_type) != 'combustible'
                AND LOWER(u.fuel_type)
                    = LOWER(c.fuel_type)
            )
        )

    WHERE c.id_catalog = idCatalogC
      AND u.is_active = 1
      AND LOWER(u.traction) = LOWER(tractionC);

END $$

DELIMITER ;

-- sp de login client

DELIMITER $$

CREATE PROCEDURE getClientByCredentials(IN p_email VARCHAR(255), IN p_password VARCHAR(255))
BEGIN
    SELECT 
        u.id_user,
        u.name,
        u.id,
        u.email,
        u.password,
        u.phone_number,
        u.date_birth,
        u.profile_image,
        u.is_active,
        comm_interest,
        physical_address,
        occupation
    FROM users u 
    INNER JOIN db_fast506.client c  ON u.id_user = c.id_user 
    WHERE u.email = p_email 
    AND u.password = p_password;
END$$

DELIMITER ;

-- sp para contar unidades por catalogo

DELIMITER $$

DROP PROCEDURE IF EXISTS countUnitsByCatalog$$

CREATE PROCEDURE countUnitsByCatalog(
    IN p_idCatalog INT,
    OUT p_total INT
)
BEGIN

    SELECT COUNT(*) INTO p_total
    FROM units u
    INNER JOIN catalogs c ON 
        u.car_brand = c.brand_name 
        AND u.car_name = c.car_name 
        AND u.year_Manufacture = c.year_manufacture
        AND u.body_work = c.body_work
        AND (
            CASE 
                WHEN u.transmission IN ('Automático', 'CVT')
                THEN 'Automático'
                ELSE u.transmission
            END
        ) = c.transmission
        AND (
            CASE 
                WHEN u.fuel_type IN ('Gasolina', 'Diesel')
                THEN 'Combustible'
                ELSE u.fuel_type
            END
        ) = c.fuel_type

    WHERE c.id_catalog = p_idCatalog
    AND u.is_active = 1;

END$$

DELIMITER ;

-- 27/05/2026 Creacion de la tabla de agendas del taller-Nolan
CREATE TABLE workshop_schedule (

    id_appointment INT AUTO_INCREMENT PRIMARY KEY,

    number_reference INT NOT NULL,

    license_plate VARCHAR(20) NOT NULL,

    entry_date DATE NOT NULL,

    reason_service VARCHAR(500) NOT NULL,

    reception_mileage INT NOT NULL,

    id_client INT NOT NULL,

    id_branch INT NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_workshop_client
        FOREIGN KEY (id_client)
        REFERENCES client(id_user),

    CONSTRAINT fk_workshop_branch
        FOREIGN KEY (id_branch)
        REFERENCES branch(id_Branch)
);

-- Se crearon tambien los procedimientos necesarios (insert,delete,deactive, update, getAll, findById)

DROP PROCEDURE IF EXISTS insertWorkshopSchedule;

DELIMITER $$
CREATE PROCEDURE insertWorkshopSchedule(
    IN p_number_reference INT,
    IN p_license_plate VARCHAR(20),
    IN p_entry_date DATE,
    IN p_reason_service VARCHAR(500),
    IN p_reception_mileage INT,
    IN p_id_client INT,
    IN p_id_branch INT
)
BEGIN
    INSERT INTO workshop_schedule (
        number_reference,
        license_plate,
        entry_date,
        reason_service,
        reception_mileage,
        id_client,
        id_branch,
        is_active
    )
    VALUES (
        p_number_reference,
        p_license_plate,
        p_entry_date,
        p_reason_service,
        p_reception_mileage,
        p_id_client,
        p_id_branch,
        TRUE
    );
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllWorkshopSchedules;

DELIMITER $$
CREATE PROCEDURE getAllWorkshopSchedules()
BEGIN
    SELECT
        id_appointment,
        number_reference,
        license_plate,
        entry_date,
        reason_service,
        reception_mileage,
        id_client,
        id_branch,
        is_active
    FROM workshop_schedule
    WHERE is_active = TRUE;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS updateWorkshopSchedule;

DELIMITER $$
CREATE PROCEDURE updateWorkshopSchedule(
    IN p_id_appointment INT,
    IN p_number_reference INT,
    IN p_license_plate VARCHAR(20),
    IN p_entry_date DATE,
    IN p_reason_service VARCHAR(500),
    IN p_reception_mileage INT,
    IN p_id_client INT,
    IN p_id_branch INT
)
BEGIN
    UPDATE workshop_schedule
    SET
        number_reference = p_number_reference,
        license_plate = p_license_plate,
        entry_date = p_entry_date,
        reason_service = p_reason_service,
        reception_mileage = p_reception_mileage,
        id_client = p_id_client,
        id_branch = p_id_branch
    WHERE id_appointment = p_id_appointment
      AND is_active = TRUE;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS deactivateWorkshopSchedule;

DELIMITER $$
CREATE PROCEDURE deactivateWorkshopSchedule(
    IN p_id_appointment INT
)
BEGIN
    UPDATE workshop_schedule
    SET is_active = FALSE
    WHERE id_appointment = p_id_appointment;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS activateWorkshopSchedule;

DELIMITER $$
CREATE PROCEDURE activateWorkshopSchedule(
    IN p_id_appointment INT
)
BEGIN
    UPDATE workshop_schedule
    SET is_active = TRUE
    WHERE id_appointment = p_id_appointment;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS findWorkshopScheduleById;

DELIMITER $$
CREATE PROCEDURE findWorkshopScheduleById(
    IN p_id_appointment INT
)
BEGIN
    SELECT
        id_appointment,
        number_reference,
        license_plate,
        entry_date,
        reason_service,
        reception_mileage,
        id_client,
        id_branch,
        is_active
    FROM workshop_schedule
    WHERE id_appointment = p_id_appointment;
END$$
DELIMITER ;



SELECT * FROM client;
SELECT * FROM branch;

-- 27/05/2026 Creacion de la tabla de informes de reparacion-Nolan

CREATE TABLE repair_reports (

    id_reparation INT AUTO_INCREMENT PRIMARY KEY,

    number_reference INT NOT NULL,

    technical_diagnosis VARCHAR(500),

    spare_parts VARCHAR(500),

    observations VARCHAR(500),

    cost DOUBLE NOT NULL,

    taxes DOUBLE NOT NULL,

    total_payment DOUBLE NOT NULL,

    completion_date DATE NOT NULL,

    id_mechanic INT NOT NULL,

    id_appointment INT NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_reparation_mechanic
        FOREIGN KEY (id_mechanic)
        REFERENCES mechanic(id_user),

    CONSTRAINT fk_repair_workshop
        FOREIGN KEY (id_appointment)
        REFERENCES workshop_schedule(id_appointment)
);

-- Se crearon tambien los procedimientos necesarios (insert,delete,deactive(borrado logico), update, getAll, findById y tambien getAllWorkshopSchedulesForReports para traer las citas inactivas)
DROP PROCEDURE IF EXISTS insertRepairReport;

DELIMITER $$
CREATE PROCEDURE insertRepairReport(
    IN p_number_reference INT,
    IN p_technical_diagnosis VARCHAR(500),
    IN p_spare_parts VARCHAR(500),
    IN p_observations VARCHAR(500),
    IN p_cost DOUBLE,
    IN p_taxes DOUBLE,
    IN p_total_payment DOUBLE,
    IN p_completion_date DATE,
    IN p_id_mechanic INT,
    IN p_id_appointment INT
)
BEGIN
    INSERT INTO repair_reports (
        number_reference,
        technical_diagnosis,
        spare_parts,
        observations,
        cost,
        taxes,
        total_payment,
        completion_date,
        id_mechanic,
        id_appointment,
        is_active
    )
    VALUES (
        p_number_reference,
        p_technical_diagnosis,
        p_spare_parts,
        p_observations,
        p_cost,
        p_taxes,
        p_total_payment,
        p_completion_date,
        p_id_mechanic,
        p_id_appointment,
        TRUE
    );
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllRepairReports;

DELIMITER $$
CREATE PROCEDURE getAllRepairReports()
BEGIN
    SELECT
        id_reparation,
        number_reference,
        technical_diagnosis,
        spare_parts,
        observations,
        cost,
        taxes,
        total_payment,
        completion_date,
        id_mechanic,
        id_appointment,
        is_active
    FROM repair_reports
    WHERE is_active = TRUE;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS updateRepairReport;

DELIMITER $$
CREATE PROCEDURE updateRepairReport(
    IN p_id_reparation INT,
    IN p_number_reference INT,
    IN p_technical_diagnosis VARCHAR(500),
    IN p_spare_parts VARCHAR(500),
    IN p_observations VARCHAR(500),
    IN p_cost DOUBLE,
    IN p_taxes DOUBLE,
    IN p_total_payment DOUBLE,
    IN p_completion_date DATE,
    IN p_id_mechanic INT,
    IN p_id_appointment INT
)
BEGIN
    UPDATE repair_reports
    SET
        number_reference = p_number_reference,
        technical_diagnosis = p_technical_diagnosis,
        spare_parts = p_spare_parts,
        observations = p_observations,
        cost = p_cost,
        taxes = p_taxes,
        total_payment = p_total_payment,
        completion_date = p_completion_date,
        id_mechanic = p_id_mechanic,
        id_appointment = p_id_appointment
    WHERE id_reparation = p_id_reparation
      AND is_active = TRUE;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS deactivateRepairReport;

DELIMITER $$
CREATE PROCEDURE deactivateRepairReport(
    IN p_id_reparation INT
)
BEGIN
    UPDATE repair_reports
    SET is_active = FALSE
    WHERE id_reparation = p_id_reparation;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS activateRepairReport;

DELIMITER $$
CREATE PROCEDURE activateRepairReport(
    IN p_id_reparation INT
)
BEGIN
    UPDATE repair_reports
    SET is_active = TRUE
    WHERE id_reparation = p_id_reparation;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS findRepairReportById;

DELIMITER $$
CREATE PROCEDURE findRepairReportById(
    IN p_id_reparation INT
)
BEGIN
    SELECT
        id_reparation,
        number_reference,
        technical_diagnosis,
        spare_parts,
        observations,
        cost,
        taxes,
        total_payment,
        completion_date,
        id_mechanic,
        id_appointment,
        is_active
    FROM repair_reports
    WHERE id_reparation = p_id_reparation;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllWorkshopSchedulesForReports;

DELIMITER $$

CREATE PROCEDURE getAllWorkshopSchedulesForReports()
BEGIN
    SELECT
        id_appointment,
        number_reference,
        license_plate,
        entry_date,
        reason_service,
        reception_mileage,
        id_client,
        id_branch,
        is_active
    FROM workshop_schedule;
END$$

DELIMITER ;

USE db_fast506;
  

-- 29/05/26 creacion de la tabla roles y permissions Allan
USE db_fast506;
CREATE TABLE roles (

id_Role INT PRIMARY KEY AUTO_INCREMENT,
role_Name VARCHAR (50) UNIQUE,
description VARCHAR (255),
create_Date DATE,
level_Hierarchy INT,
is_Worker BOOLEAN,
have_Email BOOLEAN,
is_Active BOOLEAN 

);

-- Relacionar Users con Role

ALTER TABLE users
ADD COLUMN id_role INT;

ALTER TABLE users
ADD CONSTRAINT fk_user_role
FOREIGN KEY(id_role)
REFERENCES roles(id_role);

CREATE TABLE permissions (
    id_Permissions INT PRIMARY KEY AUTO_INCREMENT,
    id_role INT NOT NULL,
    id_Module VARCHAR(50),
    create_Permission BOOLEAN,
    read_Permission BOOLEAN,
    update_Permission BOOLEAN,
    delete_Permission BOOLEAN,
    is_Active BOOLEAN,
    FOREIGN KEY(id_role)
    REFERENCES roles(id_role),
    UNIQUE(id_role,id_Module)
);

-- 30/05/26 procedimientos almacenados para el crud de roles (Allan)

DROP PROCEDURE IF EXISTS insertRole;

DELIMITER $$

CREATE PROCEDURE insertRole(
    IN p_role_Name VARCHAR(50),
    IN p_description VARCHAR(255),
    IN p_create_Date DATE,
    IN p_level_Hierarchy INT,
    IN p_is_Worker BOOLEAN,
    IN p_have_Email BOOLEAN
)
BEGIN

    INSERT INTO roles(
        role_Name,
        description,
        create_Date,
        level_Hierarchy,
        is_Worker,
        have_Email,
        is_Active
    )
    VALUES(
        p_role_Name,
        p_description,
        p_create_Date,
        p_level_Hierarchy,
        p_is_Worker,
        p_have_Email,
        TRUE
    );

END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS getAllRoles;

DELIMITER $$

CREATE PROCEDURE getAllRoles()
BEGIN

    SELECT *
    FROM roles
    WHERE is_Active = TRUE
    ORDER BY role_Name;

END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS updateRole;

DELIMITER $$

CREATE PROCEDURE updateRole(
    IN p_id_Role INT,
    IN p_role_Name VARCHAR(50),
    IN p_description VARCHAR(255),
    IN p_level_Hierarchy INT,
    IN p_is_Worker BOOLEAN,
    IN p_have_Email BOOLEAN
)
BEGIN

    UPDATE roles
    SET
        role_Name = p_role_Name,
        description = p_description,
        level_Hierarchy = p_level_Hierarchy,
        is_Worker = p_is_Worker,
        have_Email = p_have_Email
    WHERE id_Role = p_id_Role
      AND is_Active = TRUE;

END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS deleteRole;

DELIMITER $$

CREATE PROCEDURE deleteRole(
    IN p_id_Role INT
)
BEGIN

    UPDATE roles
    SET is_Active = FALSE
    WHERE id_Role = p_id_Role;

END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS getRoleById;

DELIMITER $$

CREATE PROCEDURE getRoleById(
    IN p_id_Role INT
)
BEGIN

    SELECT *
    FROM roles
    WHERE id_Role = p_id_Role
      AND is_Active = TRUE;

END $$

DELIMITER ;

-- Procedimientos para la tabla de permisos

DROP PROCEDURE IF EXISTS getPermissionsByRole;

DELIMITER $$

CREATE PROCEDURE getPermissionsByRole(

    IN p_id_role INT

)

BEGIN

    SELECT *
    FROM permissions
    WHERE
        id_role =
        p_id_role
        AND
        is_Active = TRUE
    ORDER BY id_Module;

END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS deletePermissionsByRole;

DELIMITER $$

CREATE PROCEDURE deletePermissionsByRole(
    IN p_id_role INT
)

BEGIN
    UPDATE permissions
    SET
        is_Active = FALSE
    WHERE
        id_role =
        p_id_role;
END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS savePermissionByRole;

DELIMITER $$

CREATE PROCEDURE savePermissionByRole(
    IN p_id_role INT,
    IN p_id_Module VARCHAR(50),
    IN p_create BOOLEAN,
    IN p_read BOOLEAN,
    IN p_update BOOLEAN,
    IN p_delete BOOLEAN
)

BEGIN

    INSERT INTO permissions(
        id_role,
        id_Module,
        create_Permission,
        read_Permission,
        update_Permission,
        delete_Permission,
        is_Active
    )

    VALUES(
        p_id_role,
        p_id_Module,
        p_create,
        p_read,
        p_update,
        p_delete,
        TRUE
    )

    ON DUPLICATE KEY UPDATE
    
        create_Permission =
        VALUES(create_Permission),
        read_Permission =
        VALUES(read_Permission),
        update_Permission =
        VALUES(update_Permission),
        delete_Permission =
        VALUES(delete_Permission),
        is_Active = TRUE;

END $$

DELIMITER ;

-- INSERTAR ROLES
INSERT INTO roles (role_Name, description, create_Date, level_Hierarchy, is_Worker, have_Email, is_Active)
VALUES ('Administrador', 'Acceso total a todos los módulos', '2026-06-02', 1, TRUE, TRUE, TRUE);


-- INSERTAR ROLES
INSERT INTO roles (role_Name, description, create_Date, level_Hierarchy, is_Worker, have_Email, is_Active)
VALUES 
('Mecánico', 'Personal técnico encargado de las reparaciones en el taller', '2026-06-02', 2, TRUE, FALSE, TRUE),
('Cliente', 'Usuario externo que consulta catálogo y agenda citas de taller', '2026-06-02', 3, FALSE, TRUE, TRUE);

-- INSERT ADMINISTRADOR

CALL insertAdministrator(
    'Allan Mejia',123456789,'allan@gmail.com','12345','88887777','2005-10-15','allan.png',1,'ADM001','allan@fast506.com'

);

-- INSERT MECANICO

CALL insertMechanic(
    'Felipe Quirós',101111111,'felipe.mecanico@gmail.com','12345', '88881111','1995-04-12','allan.png',2,'MEC-001','felipe.q@autosphere.com','Frenos y Suspensión','Avanzado'
);

-- INSERT PROVEDOR
INSERT INTO `db_fast506`.`supplier` 
(name, company_name, legal_name, support_phone, bussines_contact_name, email, ubicacion, admin_id)
VALUES
    ('Auto Parts S.A.', 'Auto Parts S.A.', 'Auto Parts S.A.', 
    '800-123-4567', 'Carlos González', 'cgonzalez@autoparts.com', 'San José, Costa Rica', 1);


INSERT INTO supplier
(name, company_name, legal_name, support_phone, bussines_contact_name, email, ubicacion, admin_id)
VALUES
('Repuestos del Caribe', 'Repuestos Caribe S.A.', 'Repuestos del Caribe Sociedad Anónima', '2710-8899', 'Luis Méndez', 'ventas@repuestoscaribe.com', 'Guápiles, Limón', 1),
('Importadora Motor CR', 'Motor CR S.A.', 'Importadora Motor Costa Rica S.A.', '2222-3344', 'Andrea Solano', 'contacto@motorcr.com', 'La Uruca, San José', 1),
('AutoFix Parts', 'AutoFix Parts Ltda.', 'AutoFix Parts Limitada', '2494-7788', 'Marcos Vargas', 'info@autofixparts.com', 'Grecia, Alajuela', 1);
  
-- INSERT SUCURSALES
INSERT INTO branch (name, ubication, direction, branch_Phone_Number, operation_Schedule, id_Active, coordinates, id_user) VALUES
('Fast506 Guápiles', 'Limón, Pococí', 'Frente a la UCR Recinto de Guápiles', '+506 2710 1234', 'L-V: 8:00am-6:00pm, S: 9:00am-2:00pm', '1', '10.211306686307188, -83.77130550738062', 1),
('Fast506 San José', 'San José, La Uruca', 'Frente a las instalaciones de Repretel', '+506 2222 5678', 'L-V: 7:30am-5:30pm, S: 8:00am-12:00pm', '1', '9.955604275880729, -84.1164932910103', 1),
('Fast506 Grecia', 'Alajuela, Grecia', '600 metros Oeste del Hospital de Grecia', '+506 2494 0011', 'L-V: 8:00am-5:00pm, S: Cerrado', '1', '10.070330987790673, -84.32156284301192', 1),
('Fast506 Escazú', 'San José, Escazú', 'Centro Comercial Escazu Village', '+506 2288 9900', 'L-D: 10:00am-8:00pm', '1', '9.933832242947375, -84.12909517764673', 1),
('Fast506 Pérez Zeledón', 'San José, San Isidro', 'Contiguo a la gasolinera El Jorón', '+506 2771 4433', 'L-V: 8:00am-6:00pm, S: 9:00am-4:00pm', '1', '9.330757708994817, -83.669410048738', 1),
('Fast506 Liberia', 'Guanacaste, Liberia', 'Frente a la entrada al Aeropuerto Daniel Oduber', '+506 2665 9000', 'L-V: 8:00am-5:30pm, S: 9:00am-1:00pm', '1', '10.596253373403933, -85.52703150704106', 1);


-- INSERT CLIENTES
CALL insertClient('Adán Céspedes', 102222222, 'adan@gmail.com', '12345', '88882222', '1985-08-24', 'avatar2.png', 3, 'SUV', 'Guápiles, Limón', 'Profesor');
CALL insertClient('Enrique Ramírez', 103333333, 'enrique@gmail.com', '12345', '88883333', '2000-01-15', 'avatar3.png', 3, '4x4', 'Grecia, Alajuela', 'Estudiante');
CALL insertClient('Wilber Edison', 104444444, 'wilber@gmail.com', '12345', '88884444', '1992-11-05', 'avatar4.png', 3, 'Pick-up', 'La Uruca, San José', 'Mecánico');
CALL insertClient('Joshua Solano', 105555555, 'joshua@gmail.com', '12345', '88885555', '1997-06-30', 'avatar5.png', 3, 'Deportivo', 'Heredia, Centro', 'Comerciante');

-- INSER CITAS
INSERT INTO workshop_schedule 
(number_reference, license_plate, entry_date, reason_service, reception_mileage, id_client, id_branch, is_active)
VALUES
(53030111, 'ABC123', '2026-05-30', 'Revisión general del vehículo y cambio de aceite.', 45200, 3, 1, TRUE),
(53030122, 'XYZ789', '2026-05-31', 'Ruido en frenos delanteros.', 78500, 3, 2, TRUE),
(60130133, 'GHI456', '2026-06-01', 'Diagnóstico por pérdida de potencia.', 63000, 3, 3, TRUE);

-- INSERT REPORTES REPARACION
INSERT INTO repair_reports
(number_reference, technical_diagnosis, spare_parts, observations, cost, taxes, total_payment, completion_date, id_mechanic, id_appointment, is_active)
VALUES
(530202001, 'Se realizó revisión general. Se detectó aceite degradado y filtro sucio.', 'Filtro de aceite, aceite 10W-30', 'Vehículo entregado en buen estado.', 35000, 4550, 39550, '2026-05-30', 2, 1, TRUE),

(531202002, 'Se identificó desgaste en pastillas de freno delanteras.', 'Pastillas de freno delanteras', 'Se recomienda revisión de discos en próxima visita.', 48000, 6240, 54240, '2026-05-31', 2, 2, TRUE),

(601202003, 'Se detectó obstrucción parcial en filtro de aire y sensores con lectura irregular.', 'Filtro de aire, limpieza de sensores', 'Prueba de ruta realizada correctamente.', 42000, 5460, 47460, '2026-06-01', 2, 3, TRUE);



 