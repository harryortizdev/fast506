CREATE DATABASE IF NOT EXISTS `db_fast506` DEFAULT CHARACTER SET utf8mb4;
USE `db_fast506`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: mysqlfast506-fast506.h.aivencloud.com    Database: db_fast506
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

-- SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '311433ef-5ee1-11f1-b5cf-aad38b5b89dd:1-2411,
-- 6966883e-61cf-11f1-a79e-66f855059833:1-15,
-- 8289db80-6c3a-11f1-9865-520233a65031:1-136,
-- 9e66cc32-6f69-11f1-b7fd-4ed10a68ac96:1-593,
-- bae5fa9f-6e9d-11f1-84e7-063a6a739f02:1-26';

--
-- Table structure for table `ad`
--

DROP TABLE IF EXISTS `ad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ad` (
  `id_Ad` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `expiration_Date` date DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `publication_status` bit(1) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_Ad`),
  KEY `fk_ad_id_user_idx` (`id_user`),
  CONSTRAINT `fk_ad_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ad`
--

LOCK TABLES `ad` WRITE;
/*!40000 ALTER TABLE `ad` DISABLE KEYS */;
INSERT INTO `ad` VALUES (1,'Logo Nissan','uploads/fa4003f7-31c7-4d16-9bd5-7f44dd9133b6_R.png',NULL,'Marcas',_binary '',_binary '',1),(2,'Logo Toyota','uploads/11166074-610b-4842-9903-7050eae3e12b_toyota-red-logo-11.png',NULL,'Marcas',_binary '',_binary '',1),(3,'Logo Mitsubishi','uploads/9555f75e-882d-4d41-be93-67844a9a7c41_Mitsubishi-Logo-1970-present-700x394.png',NULL,'Marcas',_binary '',_binary '',1),(4,'Logo Audi','uploads/889276a1-cb6b-4f71-b533-ac87d357d043_Image-Source-PlusPNG.com.png',NULL,'Marcas',_binary '',_binary '',1),(5,'RAV4 ANUNCIO 2026','uploads/8ba0e287-8694-4c7e-846b-ffb7ec10fa54_c28d8fd9ef9d412f8902295b6b8f2f53efffd605222222.jpeg',NULL,'Anuncios',_binary '',_binary '',1),(6,'Frontier Anuncio 2026','uploads/e155e519-b9c8-4551-8185-d272d3661101_nissan-2023-esto_es_nissan-descargable_puerto-widescreen-d2.jpg.ximg.full.hero.jpg',NULL,'Anuncios',_binary '',_binary '',1),(7,'L200 Modo bestia Mitsubishi','uploads/85e27956-41fb-4f48-b85e-d7fdb3f74b10_tyhhy.png','2026-06-23','Anuncios',_binary '\0',_binary '',1);
/*!40000 ALTER TABLE `ad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `id_user` int NOT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `corporate_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `employee_id` (`employee_id`),
  UNIQUE KEY `corporate_email` (`corporate_email`),
  CONSTRAINT `fk_admin_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,'ADMIN00','allan@gmail.com'),(5,'ADMIN01','adminfast@agenciafast.cr');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `id_Branch` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `ubication` varchar(255) DEFAULT NULL,
  `direction` varchar(255) DEFAULT NULL,
  `branch_phone_number` varchar(255) DEFAULT NULL,
  `operation_schedule` varchar(255) DEFAULT NULL,
  `id_active` bit(1) DEFAULT NULL,
  `coordinates` varchar(255) DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_Branch`),
  KEY `fk_branch_users_id_idx` (`id_user`),
  CONSTRAINT `fk_branch_users_id` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Fast506 Guápiles','Limón, Pococí','Frente a la UCR Recinto de Guápiles','+506 2710 1234','L-V: 8:00am-6:00pm, S: 9:00am-2:00pm',_binary '','10.211306686307188, -83.77130550738062',1),(2,'Fast506 San José','San José, La Uruca','Frente a las instalaciones de Repretel','+506 2222 5678','L-V: 7:30am-5:30pm, S: 8:00am-12:00pm',_binary '','9.955604275880729, -84.1164932910103',1),(3,'Fast506 Grecia','Alajuela, Grecia','600 metros Oeste del Hospital de Grecia','+506 2494 0011','L-V: 8:00am-5:00pm, S: Cerrado',_binary '','10.070330987790673, -84.32156284301192',1),(4,'Fast506 Escazú','San José, Escazú','Centro Comercial Escazu Village','+506 2288 9900','L-D: 10:00am-8:00pm',_binary '','9.933832242947375, -84.12909517764673',1),(5,'Fast506 Pérez Zeledón','San José, San Isidro','Contiguo a la gasolinera El Jorón','+506 2771 4433','L-V: 8:00am-6:00pm, S: 9:00am-4:00pm',_binary '','9.330757708994817, -83.669410048738',1),(6,'Fast506 Liberia','Guanacaste, Liberia','Frente a la entrada al Aeropuerto Daniel Oduber','+506 2665 9000','L-V: 8:00am-5:30pm, S: 9:00am-1:00pm',_binary '','10.596253373403933, -85.52703150704106',1);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogs`
--

DROP TABLE IF EXISTS `catalogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogs` (
  `id_catalog` int NOT NULL AUTO_INCREMENT,
  `car_name` varchar(255) NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  `body_work` varchar(255) NOT NULL,
  `technical_description` varchar(255) NOT NULL,
  `base_price` double NOT NULL,
  `image` varchar(255) NOT NULL,
  `year_manufacture` int NOT NULL,
  `transmission` varchar(255) NOT NULL,
  `fuel_type` varchar(255) NOT NULL,
  `engine_size` varchar(255) NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_catalog`),
  UNIQUE KEY `id_catalogs_UNIQUE` (`id_catalog`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogs`
--

LOCK TABLES `catalogs` WRITE;
/*!40000 ALTER TABLE `catalogs` DISABLE KEYS */;
INSERT INTO `catalogs` VALUES (3,'Sentra S','Nissan','Sedán','Versión base con excelente consumo',24000,'uploads/5c72fab2-e8f5-4238-9392-8d33aceef3f3_SENTRAIMAGE.png',2026,'Automático','Combustible','2.0L',_binary ''),(4,'RAV4','Toyota','SUV','Versión base automática con increíble potencia ',39900,'uploads/9adc7282-c939-4f71-bac8-efad386243ba_RAV4IMAGE.png',2026,'Automático','Combustible','2.9L',_binary ''),(5,'Hilux Gazoo Racing','Toyota','Pick-up','Versión Gazoo Racing para los amantes del Off-Road',70000,'uploads/3b4dda57-182d-4606-b902-f81cb723447d_HILUXGR.png',2026,'Automático','Combustible','2.8L',_binary ''),(6,'Hilux Pickup','Toyota','Pick-up','Para los amantes del Off-Road y el trabajo en campo',60000,'uploads/b346f8a8-f0dd-4ea4-8390-e342954fc864_edc78558196d5268d8100e2241a55a175b6ed87e.png',2026,'Manual','Combustible','2.8L',_binary ''),(7,'L200 Sportero','Mitsubishi','Pick-up','Puro poder Mitsubishi',62000,'uploads/1fb1e13f-06c1-4ab7-a06a-442d92065417_1-621x386-Plata-1.png',2026,'Automático','Combustible','3.0L',_binary ''),(8,'Yaris S','Toyota','Sedán','Sedan super economico y apto para la familia',24500,'uploads/5c359511-6401-4202-82f5-8ab54967390f_6c438acdd6e3f67d6f47e657644ed78c4b64d09a.png',2026,'Automático','Combustible','2.0L',_binary ''),(9,'Frontier','Nissan','Pick-up','Puro poder Off-Road para los amantes de las aventuras',68000,'uploads/d0c65d3a-58da-4d8e-b985-6c4bf8894049_V-8454647872.png',2026,'Automático','Combustible','2.8L',_binary ''),(10,'Montero Sport','Mitsubishi','SUV','Version Familiar para todo tipo de aventuras',60000,'uploads/f8f7de93-b9cc-436c-a23f-caea3ca56bf0_Foto-Paleta-color-621x386px-08-3.png',2026,'Automático','Combustible','2.4L',_binary ''),(12,'Kicks Advance','Nissan','SUV','Kick adicto a la carretera con el mayor comfort y tecnología',37000,'uploads/0e6261fe-dfd8-4077-8b15-bcd3a6177a0c_fwd-kicks-sr.png',2026,'Automático','Combustible','2.4L',_binary ''),(13,'Q5 S-Line','Audi','SUV','Mayor comodidad, mayor confiabilida, mayor felicidad',50000,'uploads/4a4c2168-a3f0-4767-b46d-809aa3ee43cf_Fit640x480.png',2026,'Automático','Híbrido','2.0L Mild-Hybrid',_binary ''),(14,'Land Cruiser Prado TX','Toyota','SUV','Lo mejor de lo mejor en su version mejorada',68000,'uploads/3f0842b5-f9a4-4261-895c-fd2efaff958c_1d551128124868417888e62ece57ed5a97faa3b5.png',2026,'Automático','Combustible','2.8L',_binary ''),(15,'Land Cruiser Prado','Toyota','SUV','Lo mejor de lo mejor para vivir lo que soñás',60000,'uploads/b32c86f5-0a71-4063-8ce1-9d077f276a01_03ae0129ba283e536fc3775d1d0d5c17c6a2c893.png',2026,'Automático','Combustible','2.4L',_binary ''),(17,'Corolla Cross Hybrid','Toyota','SUV','El carro más vendido del mundo evolucionó en forma de SUV para descubrir el mundo.',37000,'uploads/4f92bf19-fbe9-4ed2-b6fd-9ecaaa865194_cd0e602a6fa6b260d23f18f1a485530b9b48f0cd.png',2026,'Automático','Híbrido','1.8L Híbrido',_binary ''),(18,'Corolla Cross','Toyota','SUV','El carro más vendido del mundo evolucionó en forma de SUV para descubrir el mundo.',33000,'uploads/b1585fe9-5185-4ca1-9226-20de8870669c_f755cbab373f506808a6184e4a46f31c8b083e80.png',2026,'Automático','Combustible','1.8L',_binary ''),(19,'Outlander GLS','Mitsubishi','SUV','La mayor tecnología en una máquina que se siente en las nubes',50000,'uploads/540e1435-b249-44fe-a968-f8f1f5d979dd_paleta-reddiamond-621x386-db0315.webp',2026,'Automático','Combustible','2.5L',_binary ''),(21,'Q8 e-tron','Audi','SUV','La mayor aventura de todas',64000,'uploads/82a2f147-6c17-453a-8577-dc75e2414908_audi-rs-q8-navarra-blue-metallic.png',2026,'Automático','Eléctrico','Batería 114kWh',_binary ''),(22,'A4 Comfort','Audi','Sedán','Pura diversion y adrenalina convertida en un vehiculo',37000,'uploads/3294e334-b558-4908-8841-fd1236081dd1_Audi-Car-PNG-Free-Download.png',2026,'Automático','Combustible','2.0L TFS',_binary ''),(23,'XTrail ePOWER','Nissan','SUV','La mayor tecnología en ayudar al medio ambiente',48000,'uploads/749411aa-0b73-482b-b818-723470e7d9bb_22TDIEULHD_XT_Acenta_QAK_001_VE.png',2026,'Automático','Híbrido','1.5L ePOWER',_binary '');
/*!40000 ALTER TABLE `catalogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id_user` int NOT NULL,
  `comm_interest` varchar(255) DEFAULT NULL,
  `physical_address` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  CONSTRAINT `fk_client_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (3,'SUV','Rio Jimenez, Guácimo, Guácimo, Limon, Costa Rica','Estudiante'),(4,'SUV','Toro Amarillo, Guapiles','Estudiante'),(20,'Todoterreno','Guacimo, Limon','Estudiante'),(21,'Todoterreno','La Sole','Vagancia'),(24,'Deportivo','Toro Amarillo, Guapiles','Estudiante'),(30,'Todoterreno','La sole, cariari','Narco');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mechanic`
--

DROP TABLE IF EXISTS `mechanic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mechanic` (
  `id_user` int NOT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `corporate_email` varchar(255) DEFAULT NULL,
  `specialty` varchar(255) DEFAULT NULL,
  `cert_level` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `employee_id` (`employee_id`),
  UNIQUE KEY `corporate_email` (`corporate_email`),
  CONSTRAINT `fk_mechanic_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mechanic`
--

LOCK TABLES `mechanic` WRITE;
/*!40000 ALTER TABLE `mechanic` DISABLE KEYS */;
INSERT INTO `mechanic` VALUES (2,'MEC00','Juan@agenciafast.cr','Motor','Avanzado');
/*!40000 ALTER TABLE `mechanic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id_Permissions` int NOT NULL AUTO_INCREMENT,
  `id_role` int NOT NULL,
  `id_module` varchar(255) DEFAULT NULL,
  `create_Permission` tinyint(1) DEFAULT NULL,
  `read_Permission` tinyint(1) DEFAULT NULL,
  `update_Permission` tinyint(1) DEFAULT NULL,
  `delete_Permission` tinyint(1) DEFAULT NULL,
  `is_Active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_Permissions`),
  UNIQUE KEY `id_role` (`id_role`,`id_module`),
  CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_Role`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (17,1,'roles',1,1,1,1,1),(18,1,'permissions',1,1,1,1,1),(19,1,'users',1,1,1,1,1),(20,1,'catalog',1,1,1,1,1),(21,1,'units',1,1,1,1,1),(22,1,'suppliers',1,1,1,1,1),(23,1,'branches',1,1,1,1,1),(24,1,'quotation',1,1,1,1,1),(25,1,'sales',1,1,1,1,1),(26,1,'testdrive',1,1,1,1,1),(27,1,'mechanic',1,1,1,1,1),(28,1,'repairreport',1,1,1,1,1),(29,1,'adds',1,1,1,1,1),(30,3,'roles',0,0,0,0,1),(31,3,'permissions',0,0,0,0,1),(32,3,'users',1,1,1,1,1),(33,3,'catalog',0,1,0,0,1),(34,3,'units',0,0,0,0,1),(35,3,'suppliers',0,0,0,0,1),(36,3,'branches',0,1,0,0,1),(37,3,'quotation',1,1,1,1,1),(38,3,'sales',0,1,0,0,1),(39,3,'testdrive',1,1,1,1,1),(40,3,'mechanic',1,1,1,1,1),(41,3,'repairreport',0,1,0,0,1),(42,3,'adds',0,1,0,0,1),(56,2,'roles',0,0,0,0,1),(57,2,'permissions',0,0,0,0,1),(58,2,'users',0,0,0,0,1),(59,2,'catalog',0,0,0,0,1),(60,2,'units',0,0,0,0,1),(61,2,'suppliers',0,0,0,0,1),(62,2,'branches',0,0,0,0,1),(63,2,'quotation',0,0,0,0,1),(64,2,'sales',0,0,0,0,1),(65,2,'testdrive',0,0,0,0,1),(66,2,'mechanic',0,1,0,1,1),(67,2,'repairreport',1,1,1,1,1),(68,2,'adds',0,0,0,0,1);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation`
--

DROP TABLE IF EXISTS `quotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation` (
  `id_Quotation` int NOT NULL AUTO_INCREMENT,
  `reference_Number` int NOT NULL,
  `date` date NOT NULL,
  `initial_price` double DEFAULT NULL,
  `transfer_cost` double DEFAULT NULL,
  `sales_tax` double DEFAULT NULL,
  `total_payment` double DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `id_user` int NOT NULL,
  `id_catalog` int NOT NULL,
  `id_car` int NOT NULL,
  PRIMARY KEY (`id_Quotation`),
  KEY `fk_quotation_users_id_user_idx` (`id_user`),
  KEY `fk_quotation_catalogs_id_catalog_idx` (`id_catalog`),
  KEY `fk_quotation_units_id_car_idx` (`id_car`),
  CONSTRAINT `fk_quotation_catalogs_id_catalog` FOREIGN KEY (`id_catalog`) REFERENCES `catalogs` (`id_catalog`),
  CONSTRAINT `fk_quotation_units_id_car` FOREIGN KEY (`id_car`) REFERENCES `units` (`id_car`),
  CONSTRAINT `fk_quotation_users_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation`
--

LOCK TABLES `quotation` WRITE;
/*!40000 ALTER TABLE `quotation` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repair_reports`
--

DROP TABLE IF EXISTS `repair_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repair_reports` (
  `id_reparation` int NOT NULL AUTO_INCREMENT,
  `number_reference` int NOT NULL,
  `technical_diagnosis` varchar(255) DEFAULT NULL,
  `spare_parts` varchar(255) DEFAULT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `cost` double NOT NULL,
  `taxes` double NOT NULL,
  `total_payment` double NOT NULL,
  `completion_date` date NOT NULL,
  `id_mechanic` int NOT NULL,
  `id_appointment` int NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_reparation`),
  KEY `fk_reparation_mechanic` (`id_mechanic`),
  KEY `fk_repair_workshop` (`id_appointment`),
  CONSTRAINT `fk_repair_workshop` FOREIGN KEY (`id_appointment`) REFERENCES `workshop_schedule` (`id_appointment`),
  CONSTRAINT `fk_reparation_mechanic` FOREIGN KEY (`id_mechanic`) REFERENCES `mechanic` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair_reports`
--

LOCK TABLES `repair_reports` WRITE;
/*!40000 ALTER TABLE `repair_reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `repair_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_Role` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_Date` date DEFAULT NULL,
  `level_Hierarchy` int DEFAULT NULL,
  `is_Worker` tinyint(1) DEFAULT NULL,
  `have_Email` tinyint(1) DEFAULT NULL,
  `is_Active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_Role`),
  UNIQUE KEY `role_Name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador','Acceso total a todos los módulos','2026-06-02',1,1,1,1),(2,'Mecánico','Personal técnico encargado de las reparaciones en el taller','2026-06-02',2,1,0,1),(3,'Cliente','Usuario externo que consulta catálogo y agenda citas de taller','2026-06-02',3,0,1,1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id_sales` int NOT NULL AUTO_INCREMENT,
  `invoice_number` int NOT NULL,
  `transaction_date` date NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `base_price` double DEFAULT NULL,
  `sales_tax` double DEFAULT NULL,
  `extras` double DEFAULT NULL,
  `total_payment` double DEFAULT NULL,
  `transfer_cost` double DEFAULT NULL,
  `id_client` int NOT NULL,
  `id_admin` int DEFAULT NULL,
  `id_car` int NOT NULL,
  `id_catalog` int NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `sales_status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_sales`),
  UNIQUE KEY `id_sales_UNIQUE` (`id_sales`),
  KEY `fk_sales_client_id_idx` (`id_client`),
  KEY `fk_sales_admin_id_idx` (`id_admin`),
  KEY `fk_sales_car_id_idx` (`id_car`),
  KEY `fk_sales_catalog_id_idx` (`id_catalog`),
  CONSTRAINT `fk_sales_admin_id` FOREIGN KEY (`id_admin`) REFERENCES `administrator` (`id_user`),
  CONSTRAINT `fk_sales_car_id` FOREIGN KEY (`id_car`) REFERENCES `units` (`id_car`),
  CONSTRAINT `fk_sales_catalog_id` FOREIGN KEY (`id_catalog`) REFERENCES `catalogs` (`id_catalog`),
  CONSTRAINT `fk_sales_client_id` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id_supplier` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `legal_name` varchar(255) DEFAULT NULL,
  `support_phone` varchar(255) DEFAULT NULL,
  `bussines_contact_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `admin_id` int NOT NULL,
  PRIMARY KEY (`id_supplier`),
  KEY `fk_supplier_admin` (`admin_id`),
  CONSTRAINT `fk_supplier_admin` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'Auto Parts SA','Auto Parts S.A.','Auto Parts S.A.','87232901','Carlos González','cgonzalez@autoparts.com','Guápiles, Limón',1,5);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testdrive`
--

DROP TABLE IF EXISTS `testdrive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testdrive` (
  `id_Test` int NOT NULL AUTO_INCREMENT,
  `number_Reference` int NOT NULL,
  `creation_Date` date NOT NULL,
  `scheduled_Date` date NOT NULL,
  `initiation_Time` time NOT NULL,
  `finalization_Time` time NOT NULL,
  `status_appointment` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `id_user` int NOT NULL,
  `id_car` int NOT NULL,
  `id_branch` int NOT NULL,
  PRIMARY KEY (`id_Test`),
  KEY `fk_testdrive_users_id_idx` (`id_user`),
  KEY `fk_testdrive_units_id_idx` (`id_car`),
  KEY `fk_testdrive_branch_id_idx` (`id_branch`),
  CONSTRAINT `fk_testdrive_branch_id` FOREIGN KEY (`id_branch`) REFERENCES `branch` (`id_Branch`),
  CONSTRAINT `fk_testdrive_units_id` FOREIGN KEY (`id_car`) REFERENCES `units` (`id_car`),
  CONSTRAINT `fk_testdrive_users_id` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testdrive`
--

LOCK TABLES `testdrive` WRITE;
/*!40000 ALTER TABLE `testdrive` DISABLE KEYS */;
/*!40000 ALTER TABLE `testdrive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `units` (
  `id_car` int NOT NULL AUTO_INCREMENT,
  `vin` varchar(255) DEFAULT NULL,
  `engine_number` varchar(255) DEFAULT NULL,
  `car_brand` varchar(255) DEFAULT NULL,
  `car_name` varchar(255) DEFAULT NULL,
  `legal_brand_name` varchar(255) DEFAULT NULL,
  `year_manufacture` int DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `transmission` varchar(255) DEFAULT NULL,
  `traction` varchar(255) DEFAULT NULL,
  `body_work` varchar(255) DEFAULT NULL,
  `engine_size` varchar(255) DEFAULT NULL,
  `fuel_type` varchar(255) DEFAULT NULL,
  `stock_status` bit(1) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `id_supplier` int DEFAULT NULL,
  PRIMARY KEY (`id_car`),
  UNIQUE KEY `id_UNIQUE` (`id_car`),
  KEY `fk_units_supplier_id_idx` (`id_supplier`),
  CONSTRAINT `fk_units_supplier_id` FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id_supplier`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,'3N1AC7APXL222222','MR20-111111A','Nissan','Sentra S','Nissan Motor Co.',2026,'Gris Platino','CVT','FWD','Sedán','2.0L','Gasolina',_binary '',_binary '',1),(2,'3N1AB8APXL222222','MR20-222222B','Nissan','Sentra S','Nissan Motor Co.',2026,'Negro','CVT','FWD','Sedán','2.0L','Gasolina',_binary '',_binary '',1),(3,'8AJHA8DCX1111111','1GD-1111111','Toyota','Hilux Electrico','Toyota Motor Corp.',2026,'Blanco','Automático','4WD','Pick-up','2.8L','Diesel',_binary '',_binary '',1),(4,'8AJHA8DCX2222222','1GD-2222222','Toyota','Hilux Gazoo Racing','Toyota Motor Corp.',2026,'Blanco/Negro GR','Automático','4WD','Pick-up','2.8L','Diesel',_binary '',_binary '',1),(5,'JTMDFRFV11111111','A25A-1111111','Toyota','RAV4','Toyota Motor Corp.',2026,'Azul Metálico','Manual','AWD','SUV','2.5L','Gasolina',_binary '',_binary '',1),(6,'JTMDFRFV22222222','A25A-2222222','Toyota','RAV4','Toyota Motor Corp.',2026,'Rojo','Automático','AWD','SUV','2.5L','Gasolina',_binary '',_binary '',1),(7,'JTMDFRFV33333333','A25A-3333333','Toyota','RAV4','Toyota Motor Corp.',2026,'Plata','Automático','AWD','SUV','2.5L Híbrido','Híbrido',_binary '',_binary '',1),(8,'JTMDFRFV44444444','365V-4444444','Toyota','RAV4','Toyota Motor Corp.',2026,'Blanco Perla','Automático','AWD','SUV','Batería 150kW','Eléctrico',_binary '',_binary '',1),(9,'JTMDFRFV55555555','A25A-5555555','Toyota','RAV4','Toyota Motor Corp.',2026,'Gris','Automático','AWD','SUV','2.5L Híbrido','Híbrido',_binary '',_binary '',1),(10,'3N1AB8APXL333333','MR20-222222C','Nissan','Sentra S','Nissan Motor Co.',2026,'Negro','CVT','FWD','Sedán','2.0L','Gasolina',_binary '',_binary '',1),(11,'JTMDFRFV66666666','A25A-222222B','Toyota','RAV4','Toyota Motor Corp.',2026,'Rojo','Automático','AWD','SUV','2.5L','Gasolina',_binary '',_binary '',1),(12,'8AJHA8DCX33333333','1GD-3333333','Toyota','Hilux Pickup','Toyota Motor Corp.',2026,'Rojo','Manual','4WD','Pick-up','2.8L','Diesel',_binary '',_binary '',1),(13,'8AJHA8DCX44444444','1GD-4444444','Toyota','Hilux Pickup','Toyota Motor Corp.',2026,'Gris','Manual','4WD','Pick-up','2.8L','Diesel',_binary '',_binary '',1),(14,'8AJHA8DCX55555555','1GD-5555555','Toyota','Hilux Pickup','Toyota Motor Corp.',2026,'Blanco','Manual','4WD','Pick-up','2.8L','Diesel',_binary '',_binary '',1),(15,'MMAJRKL2001111111','4N15-111111A','Mitsubishi','L200 Sportero','Mitsubishi Motors',2026,'Gris','Automático','4WD','Pick-up','3.0L','Diesel',_binary '',_binary '',1),(16,'MMAJRKL2002222222','4N15-111111B','Mitsubishi','L200 Sportero','Mitsubishi Motors',2026,'Negro','Automático','4WD','Pick-up','3.0L','Diesel',_binary '',_binary '',1),(17,'MMAJRKL2003333333','4N15-111111C','Mitsubishi','L200 Sportero','Mitsubishi Motors',2026,'Gris','Automático','4WD','Pick-up','3.0L','Diesel',_binary '',_binary '',1),(18,'6T1BR32K077777777','2NR-77777777','Toyota','Yaris S','Toyota Motor Corp.',2026,'Blanco','CVT','FWD','Sedán','2.0L','Gasolina',_binary '',_binary '',1),(19,'6T1BR32K088888888','2NR-88888888','Toyota','Yaris S','Toyota Motor Corp.',2026,'Blanco','CVT','FWD','Sedán','2.0L','Gasolina',_binary '',_binary '',1),(20,'6T1BR32K099999999','2NR-99999999','Toyota','Yaris S','Toyota Motor Corp.',2026,'Azul','CVT','FWD','Sedán','2.0L','Gasolina',_binary '',_binary '',1),(21,'3N1CP0FL088888888','YS23-8888888','Nissan','Frontier','Nissan Motor Co.',2026,'Blanco','Automático','4WD','Pick-up','2.8L','Gasolina',_binary '',_binary '',1),(22,'3N1CP0FL099999999','YS23-9999999','Nissan','Frontier','Nissan Motor Co.',2026,'Negro','Automático','4WD','Pick-up','2.8L','Gasolina',_binary '',_binary '',1),(23,'3N1CP0FL000000000','YS23-0000000','Nissan','Frontier','Nissan Motor Co.',2026,'Azul','Automático','4WD','Pick-up','2.8L','Gasolina',_binary '',_binary '',1),(24,'MMAJRKR4011111111','4N15-999111A','Mitsubishi','Montero Sport','Mitsubishi Motors',2026,'Negro','Automático','AWD','SUV','2.4L','Gasolina',_binary '',_binary '',1),(25,'MMAJRKR4022222222','4N15-999111B','Mitsubishi','Montero Sport','Mitsubishi Motors',2026,'Blanco','Automático','AWD','SUV','2.4L','Gasolina',_binary '',_binary '',1),(26,'MMAJRKR4033333333','4N15-999111C','Mitsubishi','Montero Sport','Mitsubishi Motors',2026,'Negro','Manual','AWD','SUV','2.4L','Gasolina',_binary '',_binary '',1),(27,'3N1CP5CV044444444','HR16-4444444','Nissan','Kicks Advance','Nissan Motor Co.',2026,'Azul','CVT','RWD','SUV','1.8L','Gasolina',_binary '',_binary '',1),(28,'3N1CP5CV055555555','HR16-5555555','Nissan','Kicks Advance','Nissan Motor Co.',2026,'Azul','CVT','RWD','SUV','1.8L','Gasolina',_binary '',_binary '',1),(29,'3N1CP5CV066666666','HR16-6666666','Nissan','Kicks Advance','Nissan Motor Co.',2026,'Azul','CVT','RWD','SUV','1.8L','Gasolina',_binary '',_binary '',1),(30,'WA1BPAF8011111111','EA888-111111','Audi','Q5 S-Line','Audi AG',2026,'Gris','Automático','AWD','SUV','2.0L Mild-Hybrid','Híbrido',_binary '',_binary '',1),(31,'WA1BPAF8022222222','EA888-222222','Audi','Q5 S-Line','Audi AG',2026,'Negro','Automático','AWD','SUV','2.0L Mild-Hybrid','Híbrido',_binary '',_binary '',1),(32,'WA1BPAF8033333333','EA888-333333','Audi','Q5 S-Line','Audi AG',2026,'Blanco','Automático','AWD','SUV','2.0L Mild-Hybrid','Híbrido',_binary '',_binary '',1),(33,'WA1EVAB4099999999','EAD3-9999999','Audi','Q8 e-tron','Audi AG',2026,'Azul','Automático','AWD','SUV','Batería 114kWh','Eléctrico',_binary '',_binary '',1),(34,'WA1BUAF4088888888','EA888-888888','Audi','A4 Comfort','Audi AG',2026,'Negro','Automático','AWD','Sedán','2.0L TFS','Gasolina',_binary '',_binary '',1),(35,'WA1EVAB4077777777','EAD3-8888888','Audi','Q8 e-tron','Audi AG',2026,'Azul','Automático','AWD','SUV','Batería 114kWh','Eléctrico',_binary '',_binary '',1),(36,'WA1BUAF4066666666','EA888-999999','Audi','A4 Comfort','Audi AG',2026,'Negro','Automático','AWD','Sedán','2.0L TFS','Gasolina',_binary '',_binary '',1),(37,'MR0EA3HEX77777777','2ZR-FXE77777','Toyota','Corolla Cross Hybrid','Toyota Motor Corp.',2026,'Blanco Perla','CVT','FWD','SUV','1.8L Híbrido','Híbrido',_binary '',_binary '',1),(38,'MMAMSDM4055555555','4B12-5555555','Mitsubishi','Outlander GLS','Mitsubishi Motors',2026,'Rojo','CVT','AWD','SUV','2.5L','Gasolina',_binary '',_binary '',1),(39,'MR0EA3HEX88888888','3ZR-FXE77777','Toyota','Corolla Cross','Toyota Motor Corp.',2026,'Negro','CVT','FWD','SUV','1.8L','Gasolina',_binary '',_binary '',1),(40,'MMAMSDM40666666','4B11-5555555','Mitsubishi','Outlander GLS','Mitsubishi Motors',2026,'Rojo','CVT','AWD','SUV','2.5L','Gasolina',_binary '',_binary '',1),(41,'3N1AT2MV066666666','KR16-6666666','Nissan','XTrail ePOWER','Nissan Motor Co.',2026,'Azul','Automático','AWD','SUV','1.5L ePOWER','Híbrido',_binary '',_binary '',1),(42,'3N1AT2MV077777777','KR17-6666666','Nissan','XTrail ePOWER','Nissan Motor Co.',2026,'Blanco','Automático','AWD','SUV','1.5L ePOWER','Híbrido',_binary '',_binary '',1),(43,'JTMBA3FJ011111111','1GD-PRADO11','Toyota','Land Cruiser Prado TX','Toyota Motor Corp.',2026,'Negro','Automático','4WD','SUV','2.8L','Diesel',_binary '',_binary '',1),(44,'JTMBA4FK111111111','2GD-PRADO11','Toyota','Land Cruiser Prado','Toyota Motor Corp.',2026,'Blanco','Automático','4WD','SUV','2.4L','Diesel',_binary '',_binary '',1);
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `date_birth` date DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `id_role` int DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_user` (`id_user`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_user_role` (`id_role`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_Role`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Allan Mejia',123456789,'allan@gmail.com','12345','88887777','2005-10-15','',1,1),(2,'Juan',701330523,'Juan@gmail.com','Pablito123*','70158082','1995-06-20','uploads/d7cd562e-9921-41ad-8791-42dc26348470_sweenewy.jpeg',1,2),(3,'Ilian Edison Ramirez Quiros',703070426,'edisonramirezq2004@gmail.com','Edison123*','86026811','2004-04-21','uploads/sabrina-carpenter-ft-johnnie-walker-2025-x9.jpg',1,3),(4,'Nolan Gonzalez Mora',703060970,'nolangonza@gmail.com','NolanKenk212763*','87232801','2026-06-25','',0,3),(5,'adminfast',777777777,'adminfast@gmail.com','Admin1713*','88776655','2000-05-17','uploads/a3f8009f-c5b0-475a-bace-87b2a3ca4127_Screenshot from 2026-04-09 21-41-48.png',1,1),(21,'Harry',703030994,'harryortizalvarez@gmail.com','Choco123*','88277955','2003-11-11','uploads/78ecff35-bc3b-4095-a1c2-d9fd2b1ce07f_killua.jpg',1,3),(24,'Nolan Gonzalez Mora',703060974,'nolan@gmail.com','Kenk212763*','87232802','2026-06-02','uploads/13d5eb26-5633-44c3-9c64-d3db4e911734_WhatsApp Image 2026-06-25 at 8.02.39 PM.jpeg',1,3),(30,'Pepe El Grillo',123456780,'pepeGrillo@gmail.com','Pepegrillo1*','70158011','2026-05-31','uploads/c4ce8e07-86e1-48c4-9f74-a970eb07b957_Jiminy_Cricket_(cropped).png',1,3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workshop_schedule`
--

DROP TABLE IF EXISTS `workshop_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workshop_schedule` (
  `id_appointment` int NOT NULL AUTO_INCREMENT,
  `number_reference` int NOT NULL,
  `license_plate` varchar(255) DEFAULT NULL,
  `entry_date` date NOT NULL,
  `reason_service` varchar(255) DEFAULT NULL,
  `reception_mileage` int NOT NULL,
  `id_client` int NOT NULL,
  `id_branch` int NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_appointment`),
  KEY `fk_workshop_client` (`id_client`),
  KEY `fk_workshop_branch` (`id_branch`),
  CONSTRAINT `fk_workshop_branch` FOREIGN KEY (`id_branch`) REFERENCES `branch` (`id_Branch`),
  CONSTRAINT `fk_workshop_client` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workshop_schedule`
--

LOCK TABLES `workshop_schedule` WRITE;
/*!40000 ALTER TABLE `workshop_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `workshop_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_fast506'
--
/*!50003 DROP PROCEDURE IF EXISTS `activateRepairReport` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE activateRepairReport(

    IN p_id_reparation INT

)
BEGIN

    UPDATE repair_reports

    SET is_active = TRUE

    WHERE id_reparation = p_id_reparation;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `activateWorkshopSchedule` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE activateWorkshopSchedule(

    IN p_id_appointment INT

)
BEGIN

    UPDATE workshop_schedule

    SET is_active = TRUE

    WHERE id_appointment = p_id_appointment;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `countUnitsByCatalog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createBranch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE createBranch(

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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deactivateAdByExpirationDatePA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deactivateAdByExpirationDatePA()
BEGIN

UPDATE ad 

    SET publication_status = false 

    WHERE expiration_date <= CURRENT_DATE() 

      AND publication_status = true 

      AND is_active = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deactivateRepairReport` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deactivateRepairReport(

    IN p_id_reparation INT

)
BEGIN

    UPDATE repair_reports

    SET is_active = FALSE

    WHERE id_reparation = p_id_reparation;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deactivateSupplier` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deactivateSupplier(IN p_id_supplier INT)
BEGIN

    UPDATE supplier

    SET is_active = FALSE

    WHERE id_supplier = p_id_supplier;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deactivateWorkshopSchedule` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deactivateWorkshopSchedule(

    IN p_id_appointment INT

)
BEGIN

    UPDATE workshop_schedule

    SET is_active = FALSE

    WHERE id_appointment = p_id_appointment;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteAd` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deleteAd(IN id_AdA INT)
BEGIN

UPDATE ad

	SET is_Active = 0

    WHERE id_Ad = id_AdA; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteBranch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deleteBranch(in id_BranchB INT)
BEGIN

UPDATE branch

	SET id_active = 0

    WHERE id_Branch = id_BranchB;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteCatalog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deleteCatalog(

    IN p_idCatalog INT

)
BEGIN

    UPDATE catalogs

    SET is_active = 0

    WHERE id_catalog = p_idCatalog;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deletePermissionsByRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteQuotation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deleteQuotation(IN id_QuotationQ int)
BEGIN

UPDATE quotation

	SET is_Active = 0

    WHERE id_Quotation = id_QuotationQ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deleteRole(

    IN p_id_Role INT

)
BEGIN



    UPDATE roles

    SET is_Active = FALSE

    WHERE id_Role = p_id_Role;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteSales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deleteSales(

    IN p_id_sales INT

)
BEGIN

    UPDATE sales

    SET

        is_active = 0

    WHERE

        id_sales = p_id_sales;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteSupplier` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deleteSupplier(

    IN p_id_supplier INT

)
BEGIN

    DELETE FROM supplier WHERE id_supplier = p_id_supplier;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteTestdrive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deleteTestdrive(IN id_TestT INT)
BEGIN

    UPDATE testdrive

    SET is_Active = 0

    WHERE id_Test = id_TestT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteUnit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deleteUnit(IN p_id_car INT)
BEGIN

	UPDATE units

	SET is_active = 0

    WHERE id_car = p_id_car;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE deleteUser(

    IN p_id_user INT

)
BEGIN



    UPDATE users

    SET is_active = FALSE

    WHERE id_user = p_id_user;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findAdministratorById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findClientById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findMechanicById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findRepairReportById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findSupplierById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE findSupplierById(IN p_id_supplier INT)
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findUnitById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE findUnitById(IN p_id_car INT)
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findUnitByVIN` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE findUnitByVIN(IN p_VIN VARCHAR(17))
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `findWorkshopScheduleById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAdminByCredentials` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllAd` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllAd()
BEGIN

SELECT id_Ad, title, image, expiration_Date, category, publication_Status, is_Active, id_user FROM ad where is_Active=1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllAdAdvertisement` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllAdAdvertisement()
BEGIN

SELECT id_Ad, title, image, expiration_Date, category, publication_status, is_Active, id_user FROM ad where is_active=1 AND publication_status=1 AND category = 'Anuncios';



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllAdBranch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllAdBranch()
BEGIN

SELECT id_Ad, title, image, expiration_Date, category, publication_status, is_Active, id_user FROM ad where is_active=1  AND publication_status=1 AND category = 'Marcas';



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllAdministrators` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllBranch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllBranch()
BEGIN

SELECT id_Branch ,name ,ubication , direction ,branch_Phone_Number , operation_Schedule, id_active, coordinates ,id_user FROM branch Where id_Active = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllCarAvailable` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllCarAvailable()
BEGIN

    SELECT u.* FROM catalogs c 

    INNER JOIN units u ON u.id_car = (

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

    WHERE u.is_active = 1 

      AND c.is_active = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllCatalogs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllCatalogs()
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllClients` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllMechanics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllQuotation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllQuotation()
BEGIN

SELECT id_Quotation ,reference_Number ,date , initial_Price ,transfer_Cost , sales_Tax, total_Payment, is_Active ,id_user,id_catalog, id_car FROM quotation Where is_Active = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllRepairReports` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllRoles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllRoles()
BEGIN



    SELECT *

    FROM roles

    WHERE is_Active = TRUE

    ORDER BY role_Name;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllSales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllSales()
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllSuppliers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllSuppliers()
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllTestdrive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllTestdrive()
BEGIN

SELECT id_Test, number_Reference, creation_Date, scheduled_Date, initiation_Time, finalization_Time, status_Appointment, is_Active, id_user, id_car, id_branch FROM testdrive WHERE is_Active=1;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllUnits` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getAllUnits()
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllWorkshopSchedules` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllWorkshopSchedulesForReports` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getBodyworksCatalog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getBodyworksCatalog()
BEGIN



    SELECT 

        body_work,

        COUNT(*) AS total

    FROM catalogs
    WHERE is_active = 1

    GROUP BY body_work;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getCatalogsByBodyWork` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getCatalogsByBodyWork(

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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getClientByCredentials` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getColorsByCatalog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getColorsByCatalog(

    IN p_id_catalog INT

)
BEGIN

    SELECT DISTINCT u.color

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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getColorsByCatalogAndTraction` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getColorsByCatalogAndTraction(

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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getOccupiedHoursByDate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getOccupiedHoursByDate(IN scheduled_dateS DATE, IN id_branchP INT)
BEGIN

    SELECT DATE_FORMAT(initiation_Time, '%H:%i') AS occupied_hour

    FROM testdrive

    WHERE scheduled_Date = scheduled_dateS

      AND id_Branch = id_branchP 

      AND is_Active = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPermissionsByRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getRoleById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getRoleById(

    IN p_id_Role INT

)
BEGIN



    SELECT *

    FROM roles

    WHERE id_Role = p_id_Role

      AND is_Active = TRUE;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getUnitsByCatalog` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE getUnitsByCatalog(IN idCatalogC INT)
BEGIN

    SELECT 

        MAX(u.id_car) AS id_car,

        MAX(u.vin) AS vin,

        MAX(u.engine_number) AS engine_number,

        MAX(u.car_brand) AS car_brand,

        MAX(u.car_name) AS car_name,

        MAX(u.legal_brand_name) AS legal_brand_name,

        MAX(u.year_manufacture) AS year_manufacture,

        MAX(u.color) AS color,

        MAX(u.transmission) AS transmission,

        MAX(u.body_work) AS body_work,

        MAX(u.engine_size) AS engine_size,

        MAX(u.fuel_type) AS fuel_type,

        MAX(u.stock_status) AS stock_status,

        MAX(u.is_active) AS is_active,

        MAX(u.id_supplier) AS id_supplier,

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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertAdministrator` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertClient` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertMechanic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertRepairReport` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertSupplier` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertUnit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE insertUnit(

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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertWorkshopSchedule` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `savePermissionByRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `units_groud_exists` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE units_groud_exists()
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateAdministrator` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateBranch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE updateBranch(

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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateClient` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateMechanic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateRepairReport` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateSupplier` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateUnit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE updateUnit(

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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateWorkshopSchedule` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-25 21:41:54
