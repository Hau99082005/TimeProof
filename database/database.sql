-- SQLINES DEMO ***  Distrib 8.0.45, for Win64 (x86_64)
--
-- SQLINES DEMO ***   Database: timeproof
-- SQLINES DEMO *** -------------------------------------
-- SQLINES DEMO *** 0.45

/* SQLINES DEMO *** CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/* SQLINES DEMO *** CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/* SQLINES DEMO *** COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/* SQLINES DEMO ***  utf8 */;
/* SQLINES DEMO *** TIME_ZONE=@@TIME_ZONE */;
/* SQLINES DEMO *** ZONE='+00:00' */;
/* SQLINES DEMO *** UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/* SQLINES DEMO *** FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/* SQLINES DEMO *** SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/* SQLINES DEMO *** SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- SQLINES DEMO *** or table `ai_chat_messages`
--

DROP TABLE IF EXISTS ai_chat_messages;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
-- SQLINES FOR EVALUATION USE ONLY (14 DAYS)
CREATE TABLE ai_chat_messages (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  session_id bigint DEFAULT NULL,
  role varchar(30) check (role in ('user','assistant')) DEFAULT NULL,
  content text,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT ai_chat_messages_ibfk_1 FOREIGN KEY (session_id) REFERENCES ai_chat_sessions (id)
) ;

CREATE INDEX session_id ON ai_chat_messages (session_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `ai_chat_messages`
--

LOCK TABLES ai_chat_messages WRITE;
/* SQLINES DEMO *** LE `ai_chat_messages` DISABLE KEYS */;
/* SQLINES DEMO *** LE `ai_chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `ai_chat_sessions`
--

DROP TABLE IF EXISTS ai_chat_sessions;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE ai_chat_sessions (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  title varchar(255) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT ai_chat_sessions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
) ;

CREATE INDEX user_id ON ai_chat_sessions (user_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `ai_chat_sessions`
--

LOCK TABLES ai_chat_sessions WRITE;
/* SQLINES DEMO *** LE `ai_chat_sessions` DISABLE KEYS */;
/* SQLINES DEMO *** LE `ai_chat_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `ai_reviews`
--

DROP TABLE IF EXISTS ai_reviews;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE ai_reviews (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  submission_id bigint DEFAULT NULL,
  score int DEFAULT NULL,
  strengths text,
  weaknesses text,
  suggestion text,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT ai_reviews_ibfk_1 FOREIGN KEY (submission_id) REFERENCES exercise_submissions (id)
) ;

CREATE INDEX submission_id ON ai_reviews (submission_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `ai_reviews`
--

LOCK TABLES ai_reviews WRITE;
/* SQLINES DEMO *** LE `ai_reviews` DISABLE KEYS */;
/* SQLINES DEMO *** LE `ai_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `ai_usage_logs`
--

DROP TABLE IF EXISTS ai_usage_logs;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE ai_usage_logs (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  tool_name varchar(255) DEFAULT NULL,
  credits_used int DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT ai_usage_logs_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
) ;

CREATE INDEX user_id ON ai_usage_logs (user_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `ai_usage_logs`
--

LOCK TABLES ai_usage_logs WRITE;
/* SQLINES DEMO *** LE `ai_usage_logs` DISABLE KEYS */;
/* SQLINES DEMO *** LE `ai_usage_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `badges`
--

DROP TABLE IF EXISTS badges;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE badges (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar(255) DEFAULT NULL,
  description text,
  image text,
  PRIMARY KEY (id)
) ;
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `badges`
--

LOCK TABLES badges WRITE;
/* SQLINES DEMO *** LE `badges` DISABLE KEYS */;
/* SQLINES DEMO *** LE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `banners`
--

DROP TABLE IF EXISTS banners;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE banners (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  title varchar(255) NOT NULL,
  image text NOT NULL,
  image_url text,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
)  ;

ALTER SEQUENCE banners_seq RESTART WITH 4;
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `banners`
--

LOCK TABLES banners WRITE;
/* SQLINES DEMO *** LE `banners` DISABLE KEYS */;
INSERT INTO banners VALUES (1,'Modern ReactJS Development Banner','banners/banner-1782233327150','https://res.cloudinary.com/dqy0xlhld/image/upload/v1782233329/banners/banner-1782233327150.png','2026-06-23 16:48:58','2026-06-23 16:48:58'),(2,'MySQL Công Nghệ - Tối Giản & Hiện Đại','banners/banner-1782233431373','https://res.cloudinary.com/dqy0xlhld/image/upload/v1782233433/banners/banner-1782233431373.png','2026-06-23 16:50:42','2026-06-23 16:50:42'),(3,'Modern MySQL Digital Banner with Dolphin Icon','banners/banner-1782233708286','https://res.cloudinary.com/dqy0xlhld/image/upload/v1782233702/banners/banner-1782233708286.png','2026-06-23 16:55:11','2026-06-23 16:55:11');
/* SQLINES DEMO *** LE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `blog_categories`
--

DROP TABLE IF EXISTS blog_categories;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE blog_categories (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar(255) DEFAULT NULL,
  slug varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ;
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `blog_categories`
--

LOCK TABLES blog_categories WRITE;
/* SQLINES DEMO *** LE `blog_categories` DISABLE KEYS */;
/* SQLINES DEMO *** LE `blog_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `blogs`
--

DROP TABLE IF EXISTS blogs;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE blogs (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  author_id bigint DEFAULT NULL,
  category_id bigint DEFAULT NULL,
  title varchar(255) DEFAULT NULL,
  slug varchar(255) DEFAULT NULL,
  thumbnail text,
  content text,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT blogs_ibfk_1 FOREIGN KEY (author_id) REFERENCES users (id),
  CONSTRAINT blogs_ibfk_2 FOREIGN KEY (category_id) REFERENCES blog_categories (id)
) ;

CREATE INDEX author_id ON blogs (author_id);
CREATE INDEX category_id ON blogs (category_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `blogs`
--

LOCK TABLES blogs WRITE;
/* SQLINES DEMO *** LE `blogs` DISABLE KEYS */;
/* SQLINES DEMO *** LE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `categories`
--

DROP TABLE IF EXISTS categories;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE categories (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar(255) NOT NULL,
  slug varchar(255) DEFAULT NULL,
  type varchar(30) check (type in ('source_code','project','template','ai_tool')) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT slug UNIQUE (slug)
) ;
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `categories`
--

LOCK TABLES categories WRITE;
/* SQLINES DEMO *** LE `categories` DISABLE KEYS */;
/* SQLINES DEMO *** LE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `certificates`
--

DROP TABLE IF EXISTS certificates;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE certificates (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  learning_path_id bigint DEFAULT NULL,
  certificate_code varchar(100) DEFAULT NULL,
  issued_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT certificates_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT certificates_ibfk_2 FOREIGN KEY (learning_path_id) REFERENCES learning_paths (id)
) ;

CREATE INDEX user_id ON certificates (user_id);
CREATE INDEX learning_path_id ON certificates (learning_path_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `certificates`
--

LOCK TABLES certificates WRITE;
/* SQLINES DEMO *** LE `certificates` DISABLE KEYS */;
/* SQLINES DEMO *** LE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `challenge_submissions`
--

DROP TABLE IF EXISTS challenge_submissions;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE challenge_submissions (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  challenge_id bigint DEFAULT NULL,
  user_id bigint DEFAULT NULL,
  score int DEFAULT NULL,
  submitted_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT challenge_submissions_ibfk_1 FOREIGN KEY (challenge_id) REFERENCES daily_challenges (id),
  CONSTRAINT challenge_submissions_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id)
) ;

CREATE INDEX challenge_id ON challenge_submissions (challenge_id);
CREATE INDEX user_id ON challenge_submissions (user_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `challenge_submissions`
--

LOCK TABLES challenge_submissions WRITE;
/* SQLINES DEMO *** LE `challenge_submissions` DISABLE KEYS */;
/* SQLINES DEMO *** LE `challenge_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `chapters`
--

DROP TABLE IF EXISTS chapters;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE chapters (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  learning_path_id bigint DEFAULT NULL,
  title varchar(255) DEFAULT NULL,
  position int DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT chapters_ibfk_1 FOREIGN KEY (learning_path_id) REFERENCES learning_paths (id)
) ;

CREATE INDEX learning_path_id ON chapters (learning_path_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `chapters`
--

LOCK TABLES chapters WRITE;
/* SQLINES DEMO *** LE `chapters` DISABLE KEYS */;
/* SQLINES DEMO *** LE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `coding_playgrounds`
--

DROP TABLE IF EXISTS coding_playgrounds;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE coding_playgrounds (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  language varchar(50) DEFAULT NULL,
  code text,
  output text,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT coding_playgrounds_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
) ;

CREATE INDEX user_id ON coding_playgrounds (user_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `coding_playgrounds`
--

LOCK TABLES coding_playgrounds WRITE;
/* SQLINES DEMO *** LE `coding_playgrounds` DISABLE KEYS */;
/* SQLINES DEMO *** LE `coding_playgrounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `daily_challenges`
--

DROP TABLE IF EXISTS daily_challenges;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE daily_challenges (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  title varchar(255) DEFAULT NULL,
  description text,
  difficulty varchar(30) check (difficulty in ('Easy','Medium','Hard')) DEFAULT NULL,
  challenge_date date DEFAULT NULL,
  PRIMARY KEY (id)
) ;
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `daily_challenges`
--

LOCK TABLES daily_challenges WRITE;
/* SQLINES DEMO *** LE `daily_challenges` DISABLE KEYS */;
/* SQLINES DEMO *** LE `daily_challenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `downloads`
--

DROP TABLE IF EXISTS downloads;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE downloads (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  product_id bigint DEFAULT NULL,
  downloaded_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT downloads_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT downloads_ibfk_2 FOREIGN KEY (product_id) REFERENCES products (id)
) ;

CREATE INDEX user_id ON downloads (user_id);
CREATE INDEX product_id ON downloads (product_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `downloads`
--

LOCK TABLES downloads WRITE;
/* SQLINES DEMO *** LE `downloads` DISABLE KEYS */;
/* SQLINES DEMO *** LE `downloads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `exercise_submissions`
--

DROP TABLE IF EXISTS exercise_submissions;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE exercise_submissions (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  exercise_id bigint DEFAULT NULL,
  code text,
  language varchar(50) DEFAULT NULL,
  output text,
  score int DEFAULT NULL,
  status varchar(30) check (status in ('Accepted','Wrong Answer','Runtime Error')) DEFAULT NULL,
  submitted_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT exercise_submissions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT exercise_submissions_ibfk_2 FOREIGN KEY (exercise_id) REFERENCES exercises (id)
) ;

CREATE INDEX user_id ON exercise_submissions (user_id);
CREATE INDEX exercise_id ON exercise_submissions (exercise_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `exercise_submissions`
--

LOCK TABLES exercise_submissions WRITE;
/* SQLINES DEMO *** LE `exercise_submissions` DISABLE KEYS */;
/* SQLINES DEMO *** LE `exercise_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `exercises`
--

DROP TABLE IF EXISTS exercises;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE exercises (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  lesson_id bigint DEFAULT NULL,
  title varchar(255) DEFAULT NULL,
  description text,
  difficulty varchar(30) check (difficulty in ('Easy','Medium','Hard')) DEFAULT NULL,
  starter_code text,
  solution_code text,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT exercises_ibfk_1 FOREIGN KEY (lesson_id) REFERENCES lessons (id)
) ;

CREATE INDEX lesson_id ON exercises (lesson_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `exercises`
--

LOCK TABLES exercises WRITE;
/* SQLINES DEMO *** LE `exercises` DISABLE KEYS */;
/* SQLINES DEMO *** LE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `forum_answers`
--

DROP TABLE IF EXISTS forum_answers;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE forum_answers (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  question_id bigint DEFAULT NULL,
  user_id bigint DEFAULT NULL,
  content text,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT forum_answers_ibfk_1 FOREIGN KEY (question_id) REFERENCES forum_questions (id),
  CONSTRAINT forum_answers_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id)
) ;

CREATE INDEX question_id ON forum_answers (question_id);
CREATE INDEX user_id ON forum_answers (user_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `forum_answers`
--

LOCK TABLES forum_answers WRITE;
/* SQLINES DEMO *** LE `forum_answers` DISABLE KEYS */;
/* SQLINES DEMO *** LE `forum_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `forum_questions`
--

DROP TABLE IF EXISTS forum_questions;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE forum_questions (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  title varchar(255) DEFAULT NULL,
  content text,
  views int DEFAULT '0',
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT forum_questions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
) ;

CREATE INDEX user_id ON forum_questions (user_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `forum_questions`
--

LOCK TABLES forum_questions WRITE;
/* SQLINES DEMO *** LE `forum_questions` DISABLE KEYS */;
/* SQLINES DEMO *** LE `forum_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `learning_paths`
--

DROP TABLE IF EXISTS learning_paths;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE learning_paths (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  technology_id bigint DEFAULT NULL,
  title varchar(255) DEFAULT NULL,
  description text,
  level varchar(30) check (level in ('Beginner','Intermediate','Advanced')) DEFAULT NULL,
  thumbnail text,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT learning_paths_ibfk_1 FOREIGN KEY (technology_id) REFERENCES technologies (id)
) ;

CREATE INDEX technology_id ON learning_paths (technology_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `learning_paths`
--

LOCK TABLES learning_paths WRITE;
/* SQLINES DEMO *** LE `learning_paths` DISABLE KEYS */;
/* SQLINES DEMO *** LE `learning_paths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `lesson_resources`
--

DROP TABLE IF EXISTS lesson_resources;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE lesson_resources (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  lesson_id bigint DEFAULT NULL,
  title varchar(255) DEFAULT NULL,
  resource_type varchar(30) check (resource_type in ('pdf','video','article','github')) DEFAULT NULL,
  url text,
  PRIMARY KEY (id)
,
  CONSTRAINT lesson_resources_ibfk_1 FOREIGN KEY (lesson_id) REFERENCES lessons (id)
) ;

CREATE INDEX lesson_id ON lesson_resources (lesson_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `lesson_resources`
--

LOCK TABLES lesson_resources WRITE;
/* SQLINES DEMO *** LE `lesson_resources` DISABLE KEYS */;
/* SQLINES DEMO *** LE `lesson_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `lessons`
--

DROP TABLE IF EXISTS lessons;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE lessons (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  chapter_id bigint DEFAULT NULL,
  title varchar(255) DEFAULT NULL,
  slug varchar(255) DEFAULT NULL,
  content text,
  example_code text,
  output_example text,
  video_url text,
  estimated_minutes int DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT lessons_ibfk_1 FOREIGN KEY (chapter_id) REFERENCES chapters (id)
) ;

CREATE INDEX chapter_id ON lessons (chapter_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `lessons`
--

LOCK TABLES lessons WRITE;
/* SQLINES DEMO *** LE `lessons` DISABLE KEYS */;
/* SQLINES DEMO *** LE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `order_items`
--

DROP TABLE IF EXISTS order_items;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE order_items (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  order_id bigint DEFAULT NULL,
  product_id bigint DEFAULT NULL,
  price decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (id)
,
  CONSTRAINT order_items_ibfk_1 FOREIGN KEY (order_id) REFERENCES orders (id),
  CONSTRAINT order_items_ibfk_2 FOREIGN KEY (product_id) REFERENCES products (id)
) ;

CREATE INDEX order_id ON order_items (order_id);
CREATE INDEX product_id ON order_items (product_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `order_items`
--

LOCK TABLES order_items WRITE;
/* SQLINES DEMO *** LE `order_items` DISABLE KEYS */;
/* SQLINES DEMO *** LE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `orders`
--

DROP TABLE IF EXISTS orders;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE orders (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  total_amount decimal(12,2) DEFAULT NULL,
  payment_method varchar(100) DEFAULT NULL,
  payment_status varchar(30) check (payment_status in ('pending','paid','failed')) DEFAULT 'pending',
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT orders_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
) ;

CREATE INDEX user_id ON orders (user_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `orders`
--

LOCK TABLES orders WRITE;
/* SQLINES DEMO *** LE `orders` DISABLE KEYS */;
/* SQLINES DEMO *** LE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `product_images`
--

DROP TABLE IF EXISTS product_images;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE product_images (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  product_id bigint DEFAULT NULL,
  image_url text,
  PRIMARY KEY (id)
,
  CONSTRAINT product_images_ibfk_1 FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
) ;

CREATE INDEX product_id ON product_images (product_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `product_images`
--

LOCK TABLES product_images WRITE;
/* SQLINES DEMO *** LE `product_images` DISABLE KEYS */;
/* SQLINES DEMO *** LE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `product_technologies`
--

DROP TABLE IF EXISTS product_technologies;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE product_technologies (
  product_id bigint NOT NULL,
  technology_id bigint NOT NULL,
  PRIMARY KEY (product_id,technology_id)
,
  CONSTRAINT product_technologies_ibfk_1 FOREIGN KEY (product_id) REFERENCES products (id),
  CONSTRAINT product_technologies_ibfk_2 FOREIGN KEY (technology_id) REFERENCES technologies (id)
) ;

CREATE INDEX technology_id ON product_technologies (technology_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `product_technologies`
--

LOCK TABLES product_technologies WRITE;
/* SQLINES DEMO *** LE `product_technologies` DISABLE KEYS */;
/* SQLINES DEMO *** LE `product_technologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `product_videos`
--

DROP TABLE IF EXISTS product_videos;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE product_videos (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  product_id bigint DEFAULT NULL,
  video_url text,
  PRIMARY KEY (id)
,
  CONSTRAINT product_videos_ibfk_1 FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
) ;

CREATE INDEX product_id ON product_videos (product_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `product_videos`
--

LOCK TABLES product_videos WRITE;
/* SQLINES DEMO *** LE `product_videos` DISABLE KEYS */;
/* SQLINES DEMO *** LE `product_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `products`
--

DROP TABLE IF EXISTS products;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE products (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  seller_id bigint DEFAULT NULL,
  category_id bigint DEFAULT NULL,
  title varchar(255) NOT NULL,
  slug varchar(255) DEFAULT NULL,
  description text,
  thumbnail text,
  demo_url text,
  github_url text,
  price decimal(12,2) DEFAULT NULL,
  technology_stack text,
  is_featured smallint DEFAULT '0',
  status varchar(30) check (status in ('draft','published')) DEFAULT 'published',
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT slug UNIQUE (slug)
,
  CONSTRAINT products_ibfk_1 FOREIGN KEY (seller_id) REFERENCES users (id),
  CONSTRAINT products_ibfk_2 FOREIGN KEY (category_id) REFERENCES categories (id)
) ;

CREATE INDEX seller_id ON products (seller_id);
CREATE INDEX category_id ON products (category_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `products`
--

LOCK TABLES products WRITE;
/* SQLINES DEMO *** LE `products` DISABLE KEYS */;
/* SQLINES DEMO *** LE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `quiz_attempts`
--

DROP TABLE IF EXISTS quiz_attempts;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE quiz_attempts (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  quiz_id bigint DEFAULT NULL,
  score int DEFAULT NULL,
  completed_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT quiz_attempts_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT quiz_attempts_ibfk_2 FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
) ;

CREATE INDEX user_id ON quiz_attempts (user_id);
CREATE INDEX quiz_id ON quiz_attempts (quiz_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `quiz_attempts`
--

LOCK TABLES quiz_attempts WRITE;
/* SQLINES DEMO *** LE `quiz_attempts` DISABLE KEYS */;
/* SQLINES DEMO *** LE `quiz_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `quiz_questions`
--

DROP TABLE IF EXISTS quiz_questions;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE quiz_questions (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  quiz_id bigint DEFAULT NULL,
  question text,
  option_a text,
  option_b text,
  option_c text,
  option_d text,
  correct_answer char(1) DEFAULT NULL,
  PRIMARY KEY (id)
,
  CONSTRAINT quiz_questions_ibfk_1 FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
) ;

CREATE INDEX quiz_id ON quiz_questions (quiz_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `quiz_questions`
--

LOCK TABLES quiz_questions WRITE;
/* SQLINES DEMO *** LE `quiz_questions` DISABLE KEYS */;
/* SQLINES DEMO *** LE `quiz_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `quizzes`
--

DROP TABLE IF EXISTS quizzes;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE quizzes (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  lesson_id bigint DEFAULT NULL,
  title varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
,
  CONSTRAINT quizzes_ibfk_1 FOREIGN KEY (lesson_id) REFERENCES lessons (id)
) ;

CREATE INDEX lesson_id ON quizzes (lesson_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `quizzes`
--

LOCK TABLES quizzes WRITE;
/* SQLINES DEMO *** LE `quizzes` DISABLE KEYS */;
/* SQLINES DEMO *** LE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `reviews`
--

DROP TABLE IF EXISTS reviews;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE reviews (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  product_id bigint DEFAULT NULL,
  rating int DEFAULT NULL,
  comment text,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT reviews_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT reviews_ibfk_2 FOREIGN KEY (product_id) REFERENCES products (id)
) ;

CREATE INDEX user_id ON reviews (user_id);
CREATE INDEX product_id ON reviews (product_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `reviews`
--

LOCK TABLES reviews WRITE;
/* SQLINES DEMO *** LE `reviews` DISABLE KEYS */;
/* SQLINES DEMO *** LE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `seller_commissions`
--

DROP TABLE IF EXISTS seller_commissions;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE seller_commissions (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  seller_id bigint DEFAULT NULL,
  order_id bigint DEFAULT NULL,
  commission_percent decimal(5,2) DEFAULT NULL,
  commission_amount decimal(12,2) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT seller_commissions_ibfk_1 FOREIGN KEY (seller_id) REFERENCES users (id),
  CONSTRAINT seller_commissions_ibfk_2 FOREIGN KEY (order_id) REFERENCES orders (id)
) ;

CREATE INDEX seller_id ON seller_commissions (seller_id);
CREATE INDEX order_id ON seller_commissions (order_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `seller_commissions`
--

LOCK TABLES seller_commissions WRITE;
/* SQLINES DEMO *** LE `seller_commissions` DISABLE KEYS */;
/* SQLINES DEMO *** LE `seller_commissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `service_requests`
--

DROP TABLE IF EXISTS service_requests;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE service_requests (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  full_name varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  phone varchar(50) DEFAULT NULL,
  budget decimal(12,2) DEFAULT NULL,
  project_description text,
  status varchar(30) check (status in ('pending','contacted','completed')) DEFAULT 'pending',
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ;
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `service_requests`
--

LOCK TABLES service_requests WRITE;
/* SQLINES DEMO *** LE `service_requests` DISABLE KEYS */;
/* SQLINES DEMO *** LE `service_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `technologies`
--

DROP TABLE IF EXISTS technologies;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE technologies (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar(100) DEFAULT NULL,
  images varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ;
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `technologies`
--

LOCK TABLES technologies WRITE;
/* SQLINES DEMO *** LE `technologies` DISABLE KEYS */;
/* SQLINES DEMO *** LE `technologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `test_cases`
--

DROP TABLE IF EXISTS test_cases;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE test_cases (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  exercise_id bigint DEFAULT NULL,
  input_data text,
  expected_output text,
  PRIMARY KEY (id)
,
  CONSTRAINT test_cases_ibfk_1 FOREIGN KEY (exercise_id) REFERENCES exercises (id)
) ;

CREATE INDEX exercise_id ON test_cases (exercise_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `test_cases`
--

LOCK TABLES test_cases WRITE;
/* SQLINES DEMO *** LE `test_cases` DISABLE KEYS */;
/* SQLINES DEMO *** LE `test_cases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `user_badges`
--

DROP TABLE IF EXISTS user_badges;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE user_badges (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  badge_id bigint DEFAULT NULL,
  earned_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT user_badges_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT user_badges_ibfk_2 FOREIGN KEY (badge_id) REFERENCES badges (id)
) ;

CREATE INDEX user_id ON user_badges (user_id);
CREATE INDEX badge_id ON user_badges (badge_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `user_badges`
--

LOCK TABLES user_badges WRITE;
/* SQLINES DEMO *** LE `user_badges` DISABLE KEYS */;
/* SQLINES DEMO *** LE `user_badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `user_progress`
--

DROP TABLE IF EXISTS user_progress;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE user_progress (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  lesson_id bigint DEFAULT NULL,
  is_completed smallint DEFAULT NULL,
  completed_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
,
  CONSTRAINT user_progress_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT user_progress_ibfk_2 FOREIGN KEY (lesson_id) REFERENCES lessons (id)
) ;

CREATE INDEX user_id ON user_progress (user_id);
CREATE INDEX lesson_id ON user_progress (lesson_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `user_progress`
--

LOCK TABLES user_progress WRITE;
/* SQLINES DEMO *** LE `user_progress` DISABLE KEYS */;
/* SQLINES DEMO *** LE `user_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `users`
--

DROP TABLE IF EXISTS users;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE users (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  firebase_id varchar(255) NOT NULL,
  full_name varchar(255) DEFAULT NULL,
  email varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  avatar text,
  role varchar(30) check (role in ('admin','seller','customer')) DEFAULT 'customer',
  wallet_balance decimal(12,2) DEFAULT '0.00',
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  status smallint DEFAULT '1',
  PRIMARY KEY (id),
  CONSTRAINT email UNIQUE (email)
)  ;

ALTER SEQUENCE users_seq RESTART WITH 11;
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `users`
--

LOCK TABLES users WRITE;
/* SQLINES DEMO *** LE `users` DISABLE KEYS */;
INSERT INTO users VALUES (3,'OMSrCTVNOagrUWt5qaGxg6gpmB33','Hậu Lê văn','hau99082005@gmail.com','','/images/avatars/avatar-3-1782224673350-758253911.jpeg','admin',0.00,'2026-06-23 08:42:25','2026-06-23 15:22:40',1),(4,'HvxhSDO1ftZOOLsbr5hDo1BCQDj2','Hậu Lê Văn','levanhau200508@gmail.com','','https://lh3.googleusercontent.com/a/ACg8ocJ8sbNuDT0xIrbhvrl8UA_vetHhgyrr3GyTEvo0ef45sxeECg=s96-c','customer',0.00,'2026-06-23 09:16:37','2026-06-23 11:28:38',1),(5,'RNnFBRpLmqgRzTubudyEScw4Ix83','minh Thien','thienminh200202@gmail.com','','https://lh3.googleusercontent.com/a/ACg8ocLpf4W-JvQtpWiAcCoa0V9twChHnGi42dviAVtbTOV9Jw6t5w=s96-c','customer',0.00,'2026-06-23 09:23:44','2026-06-23 11:48:11',1),(6,'','LÊ VĂN HẬU','hau22082005@gmail.com','$2b$10$FYOZO.vhr0gdU1Sjh7UlLebSK89QGXV.CGxCCCVSih5F1Ag9CZpna','','customer',0.00,'2026-06-23 09:24:18','2026-06-23 09:24:18',1),(8,'mBqxSpDYWafGwsZVm5JdYD3Gnnp2','LÊ VĂN HẬU','hau12082005@gmail.com','$2b$10$35ZsJR4wuU4q8Eb5sFWR1e6yIy51cNJhect.W94opxk2zycogRz3C','','customer',0.00,'2026-06-23 09:31:52','2026-06-23 09:47:30',1),(9,'NhQ0zxhNuWWYhsIqaiVXrle6Lgm1','LÊ VĂN HẬU','hau26082005@gmail.com','$2b$10$05G1Km5NrLfwYLX7Orahj.K1KVDEdVWcxJRBNKPBq3xxPw3HUOkm2','','customer',0.00,'2026-06-23 09:34:52','2026-06-23 09:34:54',1),(10,'HFEpyNvVROd6L1QTO9hNgqnVz7i1','Nguyễn Duy Mạnh','manh@gmail.com','$2b$10$KAYUoweUnEudf1Q04mMtGe.VVVAO.ez2b0goWaT0JlCpa3QKSRviS','','customer',0.00,'2026-06-23 09:46:10','2026-06-23 09:46:12',1);
/* SQLINES DEMO *** LE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `wallet_transactions`
--

DROP TABLE IF EXISTS wallet_transactions;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE wallet_transactions (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  amount decimal(12,2) DEFAULT NULL,
  type varchar(30) check (type in ('deposit','withdraw','purchase','commission')) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
,
  CONSTRAINT wallet_transactions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
) ;

CREATE INDEX user_id ON wallet_transactions (user_id);
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `wallet_transactions`
--

LOCK TABLES wallet_transactions WRITE;
/* SQLINES DEMO *** LE `wallet_transactions` DISABLE KEYS */;
/* SQLINES DEMO *** LE `wallet_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- SQLINES DEMO *** or table `wishlists`
--

DROP TABLE IF EXISTS wishlists;
/* SQLINES DEMO *** d_cs_client     = @@character_set_client */;
/* SQLINES DEMO *** cter_set_client = utf8mb4 */;
CREATE TABLE wishlists (
  id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id bigint DEFAULT NULL,
  product_id bigint DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ;
/* SQLINES DEMO *** cter_set_client = @saved_cs_client */;

--
-- SQLINES DEMO *** table `wishlists`
--

LOCK TABLES wishlists WRITE;
/* SQLINES DEMO *** LE `wishlists` DISABLE KEYS */;
/* SQLINES DEMO *** LE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;
/* SQLINES DEMO *** ZONE=@OLD_TIME_ZONE */;

/* SQLINES DEMO *** ODE=@OLD_SQL_MODE */;
/* SQLINES DEMO *** GN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/* SQLINES DEMO *** E_CHECKS=@OLD_UNIQUE_CHECKS */;
/* SQLINES DEMO *** CTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/* SQLINES DEMO *** CTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/* SQLINES DEMO *** TION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/* SQLINES DEMO *** OTES=@OLD_SQL_NOTES */;

-- SQLINES DEMO ***  2026-06-23 23:59:12
