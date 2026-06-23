-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: timeproof
-- ------------------------------------------------------
-- Server version	8.0.45

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

--
-- Table structure for table `ai_chat_messages`
--

DROP TABLE IF EXISTS `ai_chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_chat_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `session_id` bigint DEFAULT NULL,
  `role` enum('user','assistant') DEFAULT NULL,
  `content` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `session_id` (`session_id`),
  CONSTRAINT `ai_chat_messages_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `ai_chat_sessions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_chat_messages`
--

LOCK TABLES `ai_chat_messages` WRITE;
/*!40000 ALTER TABLE `ai_chat_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `ai_chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_chat_sessions`
--

DROP TABLE IF EXISTS `ai_chat_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_chat_sessions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ai_chat_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_chat_sessions`
--

LOCK TABLES `ai_chat_sessions` WRITE;
/*!40000 ALTER TABLE `ai_chat_sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `ai_chat_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_reviews`
--

DROP TABLE IF EXISTS `ai_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `submission_id` bigint DEFAULT NULL,
  `score` int DEFAULT NULL,
  `strengths` text,
  `weaknesses` text,
  `suggestion` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `submission_id` (`submission_id`),
  CONSTRAINT `ai_reviews_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `exercise_submissions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_reviews`
--

LOCK TABLES `ai_reviews` WRITE;
/*!40000 ALTER TABLE `ai_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `ai_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_usage_logs`
--

DROP TABLE IF EXISTS `ai_usage_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_usage_logs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `tool_name` varchar(255) DEFAULT NULL,
  `credits_used` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ai_usage_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_usage_logs`
--

LOCK TABLES `ai_usage_logs` WRITE;
/*!40000 ALTER TABLE `ai_usage_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `ai_usage_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badges` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `image_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'Modern ReactJS Development Banner','banners/banner-1782233327150','https://res.cloudinary.com/dqy0xlhld/image/upload/v1782233329/banners/banner-1782233327150.png','2026-06-23 16:48:58','2026-06-23 16:48:58'),(2,'MySQL Công Nghệ - Tối Giản & Hiện Đại','banners/banner-1782233431373','https://res.cloudinary.com/dqy0xlhld/image/upload/v1782233433/banners/banner-1782233431373.png','2026-06-23 16:50:42','2026-06-23 16:50:42'),(3,'Modern MySQL Digital Banner with Dolphin Icon','banners/banner-1782233708286','https://res.cloudinary.com/dqy0xlhld/image/upload/v1782233702/banners/banner-1782233708286.png','2026-06-23 16:55:11','2026-06-23 16:55:11');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_categories`
--

DROP TABLE IF EXISTS `blog_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_categories`
--

LOCK TABLES `blog_categories` WRITE;
/*!40000 ALTER TABLE `blog_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `author_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `thumbnail` text,
  `content` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `blogs_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `type` enum('source_code','project','template','ai_tool') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificates` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `learning_path_id` bigint DEFAULT NULL,
  `certificate_code` varchar(100) DEFAULT NULL,
  `issued_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `learning_path_id` (`learning_path_id`),
  CONSTRAINT `certificates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `certificates_ibfk_2` FOREIGN KEY (`learning_path_id`) REFERENCES `learning_paths` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificates`
--

LOCK TABLES `certificates` WRITE;
/*!40000 ALTER TABLE `certificates` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_submissions`
--

DROP TABLE IF EXISTS `challenge_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_submissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `challenge_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `score` int DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `challenge_id` (`challenge_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `challenge_submissions_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `daily_challenges` (`id`),
  CONSTRAINT `challenge_submissions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_submissions`
--

LOCK TABLES `challenge_submissions` WRITE;
/*!40000 ALTER TABLE `challenge_submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `challenge_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `learning_path_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `position` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `learning_path_id` (`learning_path_id`),
  CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`learning_path_id`) REFERENCES `learning_paths` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coding_playgrounds`
--

DROP TABLE IF EXISTS `coding_playgrounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coding_playgrounds` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `code` longtext,
  `output` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `coding_playgrounds_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coding_playgrounds`
--

LOCK TABLES `coding_playgrounds` WRITE;
/*!40000 ALTER TABLE `coding_playgrounds` DISABLE KEYS */;
/*!40000 ALTER TABLE `coding_playgrounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_challenges`
--

DROP TABLE IF EXISTS `daily_challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_challenges` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `difficulty` enum('Easy','Medium','Hard') DEFAULT NULL,
  `challenge_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_challenges`
--

LOCK TABLES `daily_challenges` WRITE;
/*!40000 ALTER TABLE `daily_challenges` DISABLE KEYS */;
/*!40000 ALTER TABLE `daily_challenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `downloads`
--

DROP TABLE IF EXISTS `downloads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `downloads` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `downloaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `downloads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `downloads_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `downloads`
--

LOCK TABLES `downloads` WRITE;
/*!40000 ALTER TABLE `downloads` DISABLE KEYS */;
/*!40000 ALTER TABLE `downloads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_submissions`
--

DROP TABLE IF EXISTS `exercise_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_submissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `exercise_id` bigint DEFAULT NULL,
  `code` longtext,
  `language` varchar(50) DEFAULT NULL,
  `output` text,
  `score` int DEFAULT NULL,
  `status` enum('Accepted','Wrong Answer','Runtime Error') DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `exercise_id` (`exercise_id`),
  CONSTRAINT `exercise_submissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `exercise_submissions_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_submissions`
--

LOCK TABLES `exercise_submissions` WRITE;
/*!40000 ALTER TABLE `exercise_submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercises` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `difficulty` enum('Easy','Medium','Hard') DEFAULT NULL,
  `starter_code` longtext,
  `solution_code` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_answers`
--

DROP TABLE IF EXISTS `forum_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_answers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `content` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `forum_answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `forum_questions` (`id`),
  CONSTRAINT `forum_answers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_answers`
--

LOCK TABLES `forum_answers` WRITE;
/*!40000 ALTER TABLE `forum_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_questions`
--

DROP TABLE IF EXISTS `forum_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_questions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `views` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `forum_questions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_questions`
--

LOCK TABLES `forum_questions` WRITE;
/*!40000 ALTER TABLE `forum_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning_paths`
--

DROP TABLE IF EXISTS `learning_paths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learning_paths` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `technology_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `level` enum('Beginner','Intermediate','Advanced') DEFAULT NULL,
  `thumbnail` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `technology_id` (`technology_id`),
  CONSTRAINT `learning_paths_ibfk_1` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning_paths`
--

LOCK TABLES `learning_paths` WRITE;
/*!40000 ALTER TABLE `learning_paths` DISABLE KEYS */;
/*!40000 ALTER TABLE `learning_paths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_resources`
--

DROP TABLE IF EXISTS `lesson_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_resources` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `resource_type` enum('pdf','video','article','github') DEFAULT NULL,
  `url` text,
  PRIMARY KEY (`id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `lesson_resources_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_resources`
--

LOCK TABLES `lesson_resources` WRITE;
/*!40000 ALTER TABLE `lesson_resources` DISABLE KEYS */;
/*!40000 ALTER TABLE `lesson_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `chapter_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `content` longtext,
  `example_code` longtext,
  `output_example` longtext,
  `video_url` text,
  `estimated_minutes` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chapter_id` (`chapter_id`),
  CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `total_amount` decimal(12,2) DEFAULT NULL,
  `payment_method` varchar(100) DEFAULT NULL,
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint DEFAULT NULL,
  `image_url` text,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_technologies`
--

DROP TABLE IF EXISTS `product_technologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_technologies` (
  `product_id` bigint NOT NULL,
  `technology_id` bigint NOT NULL,
  PRIMARY KEY (`product_id`,`technology_id`),
  KEY `technology_id` (`technology_id`),
  CONSTRAINT `product_technologies_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `product_technologies_ibfk_2` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_technologies`
--

LOCK TABLES `product_technologies` WRITE;
/*!40000 ALTER TABLE `product_technologies` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_technologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_videos`
--

DROP TABLE IF EXISTS `product_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_videos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint DEFAULT NULL,
  `video_url` text,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_videos_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_videos`
--

LOCK TABLES `product_videos` WRITE;
/*!40000 ALTER TABLE `product_videos` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `seller_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` longtext,
  `thumbnail` text,
  `demo_url` text,
  `github_url` text,
  `price` decimal(12,2) DEFAULT NULL,
  `technology_stack` text,
  `is_featured` tinyint(1) DEFAULT '0',
  `status` enum('draft','published') DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `seller_id` (`seller_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_attempts`
--

DROP TABLE IF EXISTS `quiz_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_attempts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `quiz_id` bigint DEFAULT NULL,
  `score` int DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `quiz_attempts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `quiz_attempts_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_attempts`
--

LOCK TABLES `quiz_attempts` WRITE;
/*!40000 ALTER TABLE `quiz_attempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_questions`
--

DROP TABLE IF EXISTS `quiz_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_questions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quiz_id` bigint DEFAULT NULL,
  `question` text,
  `option_a` text,
  `option_b` text,
  `option_c` text,
  `option_d` text,
  `correct_answer` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `quiz_questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_questions`
--

LOCK TABLES `quiz_questions` WRITE;
/*!40000 ALTER TABLE `quiz_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_commissions`
--

DROP TABLE IF EXISTS `seller_commissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_commissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `seller_id` bigint DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `commission_percent` decimal(5,2) DEFAULT NULL,
  `commission_amount` decimal(12,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `seller_id` (`seller_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `seller_commissions_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`),
  CONSTRAINT `seller_commissions_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_commissions`
--

LOCK TABLES `seller_commissions` WRITE;
/*!40000 ALTER TABLE `seller_commissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `seller_commissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_requests`
--

DROP TABLE IF EXISTS `service_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_requests` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `budget` decimal(12,2) DEFAULT NULL,
  `project_description` longtext,
  `status` enum('pending','contacted','completed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_requests`
--

LOCK TABLES `service_requests` WRITE;
/*!40000 ALTER TABLE `service_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technologies`
--

DROP TABLE IF EXISTS `technologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technologies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technologies`
--

LOCK TABLES `technologies` WRITE;
/*!40000 ALTER TABLE `technologies` DISABLE KEYS */;
/*!40000 ALTER TABLE `technologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_cases`
--

DROP TABLE IF EXISTS `test_cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_cases` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `exercise_id` bigint DEFAULT NULL,
  `input_data` text,
  `expected_output` text,
  PRIMARY KEY (`id`),
  KEY `exercise_id` (`exercise_id`),
  CONSTRAINT `test_cases_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_cases`
--

LOCK TABLES `test_cases` WRITE;
/*!40000 ALTER TABLE `test_cases` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_cases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_badges`
--

DROP TABLE IF EXISTS `user_badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_badges` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `badge_id` bigint DEFAULT NULL,
  `earned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `badge_id` (`badge_id`),
  CONSTRAINT `user_badges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_badges_ibfk_2` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_badges`
--

LOCK TABLES `user_badges` WRITE;
/*!40000 ALTER TABLE `user_badges` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_progress`
--

DROP TABLE IF EXISTS `user_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_progress` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `lesson_id` bigint DEFAULT NULL,
  `is_completed` tinyint(1) DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_progress_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_progress`
--

LOCK TABLES `user_progress` WRITE;
/*!40000 ALTER TABLE `user_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firebase_id` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `avatar` text,
  `role` enum('admin','seller','customer') DEFAULT 'customer',
  `wallet_balance` decimal(12,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'OMSrCTVNOagrUWt5qaGxg6gpmB33','Hậu Lê văn','hau99082005@gmail.com','','/images/avatars/avatar-3-1782224673350-758253911.jpeg','admin',0.00,'2026-06-23 08:42:25','2026-06-23 15:22:40',1),(4,'HvxhSDO1ftZOOLsbr5hDo1BCQDj2','Hậu Lê Văn','levanhau200508@gmail.com','','https://lh3.googleusercontent.com/a/ACg8ocJ8sbNuDT0xIrbhvrl8UA_vetHhgyrr3GyTEvo0ef45sxeECg=s96-c','customer',0.00,'2026-06-23 09:16:37','2026-06-23 11:28:38',1),(5,'RNnFBRpLmqgRzTubudyEScw4Ix83','minh Thien','thienminh200202@gmail.com','','https://lh3.googleusercontent.com/a/ACg8ocLpf4W-JvQtpWiAcCoa0V9twChHnGi42dviAVtbTOV9Jw6t5w=s96-c','customer',0.00,'2026-06-23 09:23:44','2026-06-23 11:48:11',1),(6,'','LÊ VĂN HẬU','hau22082005@gmail.com','$2b$10$FYOZO.vhr0gdU1Sjh7UlLebSK89QGXV.CGxCCCVSih5F1Ag9CZpna','','customer',0.00,'2026-06-23 09:24:18','2026-06-23 09:24:18',1),(8,'mBqxSpDYWafGwsZVm5JdYD3Gnnp2','LÊ VĂN HẬU','hau12082005@gmail.com','$2b$10$35ZsJR4wuU4q8Eb5sFWR1e6yIy51cNJhect.W94opxk2zycogRz3C','','customer',0.00,'2026-06-23 09:31:52','2026-06-23 09:47:30',1),(9,'NhQ0zxhNuWWYhsIqaiVXrle6Lgm1','LÊ VĂN HẬU','hau26082005@gmail.com','$2b$10$05G1Km5NrLfwYLX7Orahj.K1KVDEdVWcxJRBNKPBq3xxPw3HUOkm2','','customer',0.00,'2026-06-23 09:34:52','2026-06-23 09:34:54',1),(10,'HFEpyNvVROd6L1QTO9hNgqnVz7i1','Nguyễn Duy Mạnh','manh@gmail.com','$2b$10$KAYUoweUnEudf1Q04mMtGe.VVVAO.ez2b0goWaT0JlCpa3QKSRviS','','customer',0.00,'2026-06-23 09:46:10','2026-06-23 09:46:12',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_transactions`
--

DROP TABLE IF EXISTS `wallet_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_transactions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL,
  `type` enum('deposit','withdraw','purchase','commission') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `wallet_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_transactions`
--

LOCK TABLES `wallet_transactions` WRITE;
/*!40000 ALTER TABLE `wallet_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `wallet_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlists` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-23 23:59:12
