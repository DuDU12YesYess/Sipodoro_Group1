-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: mysql-sipodoro-sipodoro-2h7m.h.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Coin_Transaction`
--

DROP TABLE IF EXISTS `Coin_Transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Coin_Transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Coin_Transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Coin_Transaction`
--

LOCK TABLES `Coin_Transaction` WRITE;
/*!40000 ALTER TABLE `Coin_Transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Coin_Transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Coin_Wallet`
--

DROP TABLE IF EXISTS `Coin_Wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Coin_Wallet` (
  `wallet_id` int NOT NULL AUTO_INCREMENT,
  `total_coins` int DEFAULT '0',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`wallet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Coin_Wallet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Coin_Wallet`
--

LOCK TABLES `Coin_Wallet` WRITE;
/*!40000 ALTER TABLE `Coin_Wallet` DISABLE KEYS */;
INSERT INTO `Coin_Wallet` VALUES (1,3,1);
/*!40000 ALTER TABLE `Coin_Wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flower`
--

DROP TABLE IF EXISTS `Flower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Flower` (
  `flower_id` int NOT NULL AUTO_INCREMENT,
  `growth_stage` int DEFAULT '0',
  `status` enum('Sprout','Bud','Bloomed') DEFAULT 'Sprout',
  `date_planted` datetime DEFAULT NULL,
  `date_bloomed` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `seed_id` int DEFAULT NULL,
  PRIMARY KEY (`flower_id`),
  KEY `user_id` (`user_id`),
  KEY `seed_id` (`seed_id`),
  CONSTRAINT `Flower_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Flower_ibfk_2` FOREIGN KEY (`seed_id`) REFERENCES `Seed` (`seed_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flower`
--

LOCK TABLES `Flower` WRITE;
/*!40000 ALTER TABLE `Flower` DISABLE KEYS */;
/*!40000 ALTER TABLE `Flower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Garden`
--

DROP TABLE IF EXISTS `Garden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Garden` (
  `garden_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`garden_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Garden_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Garden`
--

LOCK TABLES `Garden` WRITE;
/*!40000 ALTER TABLE `Garden` DISABLE KEYS */;
INSERT INTO `Garden` VALUES (1,'2026-07-14 16:39:55',1);
/*!40000 ALTER TABLE `Garden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Garden_Flower`
--

DROP TABLE IF EXISTS `Garden_Flower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Garden_Flower` (
  `garden_flower_id` int NOT NULL AUTO_INCREMENT,
  `added_at` datetime DEFAULT NULL,
  `garden_id` int DEFAULT NULL,
  `flower_id` int DEFAULT NULL,
  PRIMARY KEY (`garden_flower_id`),
  KEY `garden_id` (`garden_id`),
  KEY `flower_id` (`flower_id`),
  CONSTRAINT `Garden_Flower_ibfk_1` FOREIGN KEY (`garden_id`) REFERENCES `Garden` (`garden_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Garden_Flower_ibfk_2` FOREIGN KEY (`flower_id`) REFERENCES `Flower` (`flower_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Garden_Flower`
--

LOCK TABLES `Garden_Flower` WRITE;
/*!40000 ALTER TABLE `Garden_Flower` DISABLE KEYS */;
/*!40000 ALTER TABLE `Garden_Flower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hydration_Log`
--

DROP TABLE IF EXISTS `Hydration_Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Hydration_Log` (
  `hydration_id` int NOT NULL AUTO_INCREMENT,
  `check_in_time` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`hydration_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Hydration_Log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hydration_Log`
--

LOCK TABLES `Hydration_Log` WRITE;
/*!40000 ALTER TABLE `Hydration_Log` DISABLE KEYS */;
/*!40000 ALTER TABLE `Hydration_Log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pomodoro_Cycle`
--

DROP TABLE IF EXISTS `Pomodoro_Cycle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pomodoro_Cycle` (
  `cycle_id` int NOT NULL AUTO_INCREMENT,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `focus_duration` int DEFAULT '25',
  `break_duration` int DEFAULT '5',
  `completed_focus_sessions` int DEFAULT '0',
  `completed_break` int DEFAULT '0',
  `streak_earned` int DEFAULT '0',
  `completed_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`cycle_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Pomodoro_Cycle_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pomodoro_Cycle`
--

LOCK TABLES `Pomodoro_Cycle` WRITE;
/*!40000 ALTER TABLE `Pomodoro_Cycle` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pomodoro_Cycle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Seed`
--

DROP TABLE IF EXISTS `Seed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Seed` (
  `seed_id` int NOT NULL AUTO_INCREMENT,
  `seed_name` varchar(50) NOT NULL,
  `cost` int NOT NULL,
  `growth_required` int DEFAULT '3',
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`seed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seed`
--

LOCK TABLES `Seed` WRITE;
/*!40000 ALTER TABLE `Seed` DISABLE KEYS */;
/*!40000 ALTER TABLE `Seed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Seed_Inventory`
--

DROP TABLE IF EXISTS `Seed_Inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Seed_Inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `seed_id` int DEFAULT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `user_id` (`user_id`),
  KEY `seed_id` (`seed_id`),
  CONSTRAINT `Seed_Inventory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Seed_Inventory_ibfk_2` FOREIGN KEY (`seed_id`) REFERENCES `Seed` (`seed_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seed_Inventory`
--

LOCK TABLES `Seed_Inventory` WRITE;
/*!40000 ALTER TABLE `Seed_Inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `Seed_Inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shop_Transaction`
--

DROP TABLE IF EXISTS `Shop_Transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shop_Transaction` (
  `shop_transaction_id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT '1',
  `coin_spent` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `seed_id` int DEFAULT NULL,
  PRIMARY KEY (`shop_transaction_id`),
  KEY `user_id` (`user_id`),
  KEY `seed_id` (`seed_id`),
  CONSTRAINT `Shop_Transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Shop_Transaction_ibfk_2` FOREIGN KEY (`seed_id`) REFERENCES `Seed` (`seed_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shop_Transaction`
--

LOCK TABLES `Shop_Transaction` WRITE;
/*!40000 ALTER TABLE `Shop_Transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Shop_Transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Streak_Record`
--

DROP TABLE IF EXISTS `Streak_Record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Streak_Record` (
  `streak_id` int NOT NULL AUTO_INCREMENT,
  `current_streak` int DEFAULT '0',
  `longest_streak` int DEFAULT '0',
  `last_completed_cycle` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`streak_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Streak_Record_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Streak_Record`
--

LOCK TABLES `Streak_Record` WRITE;
/*!40000 ALTER TABLE `Streak_Record` DISABLE KEYS */;
INSERT INTO `Streak_Record` VALUES (1,0,0,NULL,1);
/*!40000 ALTER TABLE `Streak_Record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Task`
--

DROP TABLE IF EXISTS `Task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Task` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `deadline` datetime NOT NULL,
  `status` enum('Urgent','Critical','Low Critical') DEFAULT 'Urgent',
  `completed` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `Task_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Task_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Task_Category` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Task`
--

LOCK TABLES `Task` WRITE;
/*!40000 ALTER TABLE `Task` DISABLE KEYS */;
/*!40000 ALTER TABLE `Task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Task_Category`
--

DROP TABLE IF EXISTS `Task_Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Task_Category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Task_Category`
--

LOCK TABLES `Task_Category` WRITE;
/*!40000 ALTER TABLE `Task_Category` DISABLE KEYS */;
/*!40000 ALTER TABLE `Task_Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'dyna023','dyna023@gmail.com','$2b$10$61062PoOtDE25kpXBSUFI.qriPgsfQ6.Im1h4XjC7S7R7/vSM6dXy','user','2026-07-14 16:39:54');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-15  3:14:08
