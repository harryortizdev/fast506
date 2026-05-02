-- 22/04/2026 - Creación de la base de datos (Harry)
CREATE DATABASE IF NOT EXISTS db_fast506;
USE db_fast506;

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
