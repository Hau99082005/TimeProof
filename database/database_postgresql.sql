-- PostgreSQL dump for TimeProof
-- Generated from MySQL dump

-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS wishlists;
DROP TABLE IF EXISTS wallet_transactions;
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS user_badges;
DROP TABLE IF EXISTS test_cases;
DROP TABLE IF EXISTS technologies;
DROP TABLE IF EXISTS service_requests;
DROP TABLE IF EXISTS seller_commissions;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS quiz_questions;
DROP TABLE IF EXISTS quiz_attempts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_videos;
DROP TABLE IF EXISTS product_technologies;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS lesson_resources;
DROP TABLE IF EXISTS learning_paths;
DROP TABLE IF EXISTS forum_questions;
DROP TABLE IF EXISTS forum_answers;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS exercise_submissions;
DROP TABLE IF EXISTS downloads;
DROP TABLE IF EXISTS daily_challenges;
DROP TABLE IF EXISTS coding_playgrounds;
DROP TABLE IF EXISTS chapters;
DROP TABLE IF EXISTS challenge_submissions;
DROP TABLE IF EXISTS certificates;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS blog_categories;
DROP TABLE IF EXISTS banners;
DROP TABLE IF EXISTS badges;
DROP TABLE IF EXISTS ai_usage_logs;
DROP TABLE IF EXISTS ai_reviews;
DROP TABLE IF EXISTS ai_chat_sessions;
DROP TABLE IF EXISTS ai_chat_messages;
DROP TABLE IF EXISTS users;

-- Drop ENUM types if they exist
DROP TYPE IF EXISTS service_status_type;
DROP TYPE IF EXISTS category_type;
DROP TYPE IF EXISTS ai_role_type;
DROP TYPE IF EXISTS transaction_type;
DROP TYPE IF EXISTS resource_type;
DROP TYPE IF EXISTS level_type;
DROP TYPE IF EXISTS difficulty_type;
DROP TYPE IF EXISTS exercise_status_type;
DROP TYPE IF EXISTS product_status_type;
DROP TYPE IF EXISTS status_type;
DROP TYPE IF EXISTS role_type;

-- Create ENUM types first
CREATE TYPE role_type AS ENUM ('admin', 'seller', 'customer');
CREATE TYPE status_type AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE product_status_type AS ENUM ('draft', 'published');
CREATE TYPE exercise_status_type AS ENUM ('Accepted', 'Wrong Answer', 'Runtime Error');
CREATE TYPE difficulty_type AS ENUM ('Easy', 'Medium', 'Hard');
CREATE TYPE level_type AS ENUM ('Beginner', 'Intermediate', 'Advanced');
CREATE TYPE resource_type AS ENUM ('pdf', 'video', 'article', 'github');
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdraw', 'purchase', 'commission');
CREATE TYPE ai_role_type AS ENUM ('user', 'assistant');
CREATE TYPE category_type AS ENUM ('source_code', 'project', 'template', 'ai_tool');
CREATE TYPE service_status_type AS ENUM ('pending', 'contacted', 'completed');

-- Table structure for table users
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  firebase_id VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar TEXT,
  role role_type DEFAULT 'customer',
  wallet_balance DECIMAL(12,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status BOOLEAN DEFAULT true
);

-- Table structure for table ai_chat_sessions
CREATE TABLE ai_chat_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_chat_sessions_user_id ON ai_chat_sessions(user_id);

-- Table structure for table ai_chat_messages
CREATE TABLE ai_chat_messages (
  id BIGSERIAL PRIMARY KEY,
  session_id BIGINT REFERENCES ai_chat_sessions(id),
  role ai_role_type,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_chat_messages_session_id ON ai_chat_messages(session_id);

-- Table structure for table badges
CREATE TABLE badges (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  image TEXT
);

-- Table structure for table banners
CREATE TABLE banners (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table blog_categories
CREATE TABLE blog_categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  slug VARCHAR(255)
);

-- Table structure for table blogs
CREATE TABLE blogs (
  id BIGSERIAL PRIMARY KEY,
  author_id BIGINT REFERENCES users(id),
  category_id BIGINT REFERENCES blog_categories(id),
  title VARCHAR(255),
  slug VARCHAR(255),
  thumbnail TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blogs_author_id ON blogs(author_id);
CREATE INDEX idx_blogs_category_id ON blogs(category_id);

-- Table structure for table categories
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  type category_type,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table daily_challenges
CREATE TABLE daily_challenges (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  difficulty difficulty_type,
  challenge_date DATE
);

-- Table structure for table chapters
CREATE TABLE chapters (
  id BIGSERIAL PRIMARY KEY,
  learning_path_id BIGINT,
  title VARCHAR(255),
  position INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table learning_paths
CREATE TABLE learning_paths (
  id BIGSERIAL PRIMARY KEY,
  technology_id BIGINT,
  title VARCHAR(255),
  description TEXT,
  level level_type,
  thumbnail TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE chapters ADD CONSTRAINT fk_chapters_learning_path FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id);
CREATE INDEX idx_chapters_learning_path_id ON chapters(learning_path_id);

-- Table structure for table lessons
CREATE TABLE lessons (
  id BIGSERIAL PRIMARY KEY,
  chapter_id BIGINT REFERENCES chapters(id),
  title VARCHAR(255),
  slug VARCHAR(255),
  content TEXT,
  example_code TEXT,
  output_example TEXT,
  video_url TEXT,
  estimated_minutes INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lessons_chapter_id ON lessons(chapter_id);

-- Table structure for table lesson_resources
CREATE TABLE lesson_resources (
  id BIGSERIAL PRIMARY KEY,
  lesson_id BIGINT REFERENCES lessons(id),
  title VARCHAR(255),
  resource_type resource_type,
  url TEXT
);

CREATE INDEX idx_lesson_resources_lesson_id ON lesson_resources(lesson_id);

-- Table structure for table certificates
CREATE TABLE certificates (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  learning_path_id BIGINT REFERENCES learning_paths(id),
  certificate_code VARCHAR(100),
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_certificates_user_id ON certificates(user_id);
CREATE INDEX idx_certificates_learning_path_id ON certificates(learning_path_id);

-- Table structure for table challenge_submissions
CREATE TABLE challenge_submissions (
  id BIGSERIAL PRIMARY KEY,
  challenge_id BIGINT REFERENCES daily_challenges(id),
  user_id BIGINT REFERENCES users(id),
  score INT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_challenge_submissions_challenge_id ON challenge_submissions(challenge_id);
CREATE INDEX idx_challenge_submissions_user_id ON challenge_submissions(user_id);

-- Table structure for table coding_playgrounds
CREATE TABLE coding_playgrounds (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  language VARCHAR(50),
  code TEXT,
  output TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coding_playgrounds_user_id ON coding_playgrounds(user_id);

-- Table structure for table exercises
CREATE TABLE exercises (
  id BIGSERIAL PRIMARY KEY,
  lesson_id BIGINT REFERENCES lessons(id),
  title VARCHAR(255),
  description TEXT,
  difficulty difficulty_type,
  starter_code TEXT,
  solution_code TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exercises_lesson_id ON exercises(lesson_id);

-- Table structure for table exercise_submissions
CREATE TABLE exercise_submissions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  exercise_id BIGINT REFERENCES exercises(id),
  code TEXT,
  language VARCHAR(50),
  output TEXT,
  score INT,
  status exercise_status_type,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exercise_submissions_user_id ON exercise_submissions(user_id);
CREATE INDEX idx_exercise_submissions_exercise_id ON exercise_submissions(exercise_id);

-- Table structure for table ai_reviews
CREATE TABLE ai_reviews (
  id BIGSERIAL PRIMARY KEY,
  submission_id BIGINT REFERENCES exercise_submissions(id),
  score INT,
  strengths TEXT,
  weaknesses TEXT,
  suggestion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_reviews_submission_id ON ai_reviews(submission_id);

-- Table structure for table ai_usage_logs
CREATE TABLE ai_usage_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  tool_name VARCHAR(255),
  credits_used INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_usage_logs_user_id ON ai_usage_logs(user_id);

-- Table structure for table forum_questions
CREATE TABLE forum_questions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  title VARCHAR(255),
  content TEXT,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_forum_questions_user_id ON forum_questions(user_id);

-- Table structure for table forum_answers
CREATE TABLE forum_answers (
  id BIGSERIAL PRIMARY KEY,
  question_id BIGINT REFERENCES forum_questions(id),
  user_id BIGINT REFERENCES users(id),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_forum_answers_question_id ON forum_answers(question_id);
CREATE INDEX idx_forum_answers_user_id ON forum_answers(user_id);

-- Table structure for table technologies
CREATE TABLE technologies (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100),
  images VARCHAR(255)
);

ALTER TABLE learning_paths ADD CONSTRAINT fk_learning_paths_technology FOREIGN KEY (technology_id) REFERENCES technologies(id);
CREATE INDEX idx_learning_paths_technology_id ON learning_paths(technology_id);

-- Table structure for table test_cases
CREATE TABLE test_cases (
  id BIGSERIAL PRIMARY KEY,
  exercise_id BIGINT REFERENCES exercises(id),
  input_data TEXT,
  expected_output TEXT
);

CREATE INDEX idx_test_cases_exercise_id ON test_cases(exercise_id);

-- Table structure for table user_badges
CREATE TABLE user_badges (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  badge_id BIGINT REFERENCES badges(id),
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);

-- Table structure for table user_progress
CREATE TABLE user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  lesson_id BIGINT REFERENCES lessons(id),
  is_completed BOOLEAN,
  completed_at TIMESTAMP
);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);

-- Table structure for table products
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  seller_id BIGINT REFERENCES users(id),
  category_id BIGINT REFERENCES categories(id),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  thumbnail TEXT,
  demo_url TEXT,
  github_url TEXT,
  price DECIMAL(12,2),
  technology_stack TEXT,
  is_featured BOOLEAN DEFAULT false,
  status product_status_type DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_seller_id ON products(seller_id);
CREATE INDEX idx_products_category_id ON products(category_id);

-- Table structure for table product_images
CREATE TABLE product_images (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);

-- Table structure for table product_videos
CREATE TABLE product_videos (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  video_url TEXT
);

CREATE INDEX idx_product_videos_product_id ON product_videos(product_id);

-- Table structure for table product_technologies
CREATE TABLE product_technologies (
  product_id BIGINT NOT NULL REFERENCES products(id),
  technology_id BIGINT NOT NULL REFERENCES technologies(id),
  PRIMARY KEY (product_id, technology_id)
);

CREATE INDEX idx_product_technologies_technology_id ON product_technologies(technology_id);

-- Table structure for table downloads
CREATE TABLE downloads (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  product_id BIGINT REFERENCES products(id),
  downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_downloads_user_id ON downloads(user_id);
CREATE INDEX idx_downloads_product_id ON downloads(product_id);

-- Table structure for table orders
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  total_amount DECIMAL(12,2),
  payment_method VARCHAR(100),
  payment_status status_type DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Table structure for table order_items
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id),
  product_id BIGINT REFERENCES products(id),
  price DECIMAL(12,2)
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Table structure for table reviews
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  product_id BIGINT REFERENCES products(id),
  rating INT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);

-- Table structure for table seller_commissions
CREATE TABLE seller_commissions (
  id BIGSERIAL PRIMARY KEY,
  seller_id BIGINT REFERENCES users(id),
  order_id BIGINT REFERENCES orders(id),
  commission_percent DECIMAL(5,2),
  commission_amount DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_seller_commissions_seller_id ON seller_commissions(seller_id);
CREATE INDEX idx_seller_commissions_order_id ON seller_commissions(order_id);

-- Table structure for table service_requests
CREATE TABLE service_requests (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  budget DECIMAL(12,2),
  project_description TEXT,
  status service_status_type DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table quizzes
CREATE TABLE quizzes (
  id BIGSERIAL PRIMARY KEY,
  lesson_id BIGINT REFERENCES lessons(id),
  title VARCHAR(255)
);

CREATE INDEX idx_quizzes_lesson_id ON quizzes(lesson_id);

-- Table structure for table quiz_questions
CREATE TABLE quiz_questions (
  id BIGSERIAL PRIMARY KEY,
  quiz_id BIGINT REFERENCES quizzes(id),
  question TEXT,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer CHAR(1)
);

CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);

-- Table structure for table quiz_attempts
CREATE TABLE quiz_attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  quiz_id BIGINT REFERENCES quizzes(id),
  score INT,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);

-- Table structure for table wallet_transactions
CREATE TABLE wallet_transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  amount DECIMAL(12,2),
  type transaction_type,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wallet_transactions_user_id ON wallet_transactions(user_id);

-- Table structure for table wishlists
CREATE TABLE wishlists (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  product_id BIGINT REFERENCES products(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data into banners
INSERT INTO banners (id, title, image, image_url, created_at, updated_at) VALUES 
(1, 'Modern ReactJS Development Banner', 'banners/banner-1782233327150', 'https://res.cloudinary.com/dqy0xlhld/image/upload/v1782233329/banners/banner-1782233327150.png', '2026-06-23 16:48:58', '2026-06-23 16:48:58'),
(2, 'MySQL Công Nghệ - Tối Giản & Hiện Đại', 'banners/banner-1782233431373', 'https://res.cloudinary.com/dqy0xlhld/image/upload/v1782233433/banners/banner-1782233431373.png', '2026-06-23 16:50:42', '2026-06-23 16:50:42'),
(3, 'Modern MySQL Digital Banner with Dolphin Icon', 'banners/banner-1782233708286', 'https://res.cloudinary.com/dqy0xlhld/image/upload/v1782233702/banners/banner-1782233708286.png', '2026-06-23 16:55:11', '2026-06-23 16:55:11');

-- Insert data into users
INSERT INTO users (id, firebase_id, full_name, email, password_hash, avatar, role, wallet_balance, created_at, updated_at, status) VALUES 
(3, 'OMSrCTVNOagrUWt5qaGxg6gpmB33', 'Hậu Lê văn', 'hau99082005@gmail.com', '', '/images/avatars/avatar-3-1782224673350-758253911.jpeg', 'admin', 0.00, '2026-06-23 08:42:25', '2026-06-23 15:22:40', true),
(4, 'HvxhSDO1ftZOOLsbr5hDo1BCQDj2', 'Hậu Lê Văn', 'levanhau200508@gmail.com', '', 'https://lh3.googleusercontent.com/a/ACg8ocJ8sbNuDT0xIrbhvrl8UA_vetHhgyrr3GyTEvo0ef45sxeECg=s96-c', 'customer', 0.00, '2026-06-23 09:16:37', '2026-06-23 11:28:38', true),
(5, 'RNnFBRpLmqgRzTubudyEScw4Ix83', 'minh Thien', 'thienminh200202@gmail.com', '', 'https://lh3.googleusercontent.com/a/ACg8ocLpf4W-JvQtpWiAcCoa0V9twChHnGi42dviAVtbTOV9Jw6t5w=s96-c', 'customer', 0.00, '2026-06-23 09:23:44', '2026-06-23 11:48:11', true),
(6, '', 'LÊ VĂN HẬU', 'hau22082005@gmail.com', '$2b$10$FYOZO.vhr0gdU1Sjh7UlLebSK89QGXV.CGxCCCVSih5F1Ag9CZpna', '', 'customer', 0.00, '2026-06-23 09:24:18', '2026-06-23 09:24:18', true),
(8, 'mBqxSpDYWafGwsZVm5JdYD3Gnnp2', 'LÊ VĂN HẬU', 'hau12082005@gmail.com', '$2b$10$35ZsJR4wuU4q8Eb5sFWR1e6yIy51cNJhect.W94opxk2zycogRz3C', '', 'customer', 0.00, '2026-06-23 09:31:52', '2026-06-23 09:47:30', true),
(9, 'NhQ0zxhNuWWYhsIqaiVXrle6Lgm1', 'LÊ VĂN HẬU', 'hau26082005@gmail.com', '$2b$10$05G1Km5NrLfwYLX7Orahj.K1KVDEdVWcxJRBNKPBq3xxPw3HUOkm2', '', 'customer', 0.00, '2026-06-23 09:34:52', '2026-06-23 09:34:54', true),
(10, 'HFEpyNvVROd6L1QTO9hNgqnVz7i1', 'Nguyễn Duy Mạnh', 'manh@gmail.com', '$2b$10$KAYUoweUnEudf1Q04mMtGe.VVVAO.ez2b0goWaT0JlCpa3QKSRviS', '', 'customer', 0.00, '2026-06-23 09:46:10', '2026-06-23 09:46:12', true);

-- Set sequence values to match inserted data
SELECT setval('banners_id_seq', 4, false);
SELECT setval('users_id_seq', 11, false);

-- Create updated_at triggers for tables that need them
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
