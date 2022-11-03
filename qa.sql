-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;


DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;

DROP TABLE IF EXISTS questions;
-- DROP TABLE IF EXISTS products;

-- ---
-- Table Products
--
-- ---

-- CREATE TABLE products (
--   id INTEGER NOT NULL DEFAULT NULL,
--   PRIMARY KEY (id)
-- );

-- ---
-- Table Questions
--
-- ---
CREATE TABLE questions (
  id SERIAL,
  product_id INTEGER NOT NULL DEFAULT NULL,
  body TEXT NOT NULL DEFAULT NULL,
  date_written TEXT NOT NULL DEFAULT NULL,
  asker_name VARCHAR(60) NOT NULL DEFAULT NULL,
  asker_email VARCHAR(200) NOT NULL DEFAULT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpful INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table Answers
--
-- ---



CREATE TABLE answers (
  id SERIAL,
  question_id INTEGER NOT NULL DEFAULT NULL references questions(id),
  body TEXT NOT NULL DEFAULT NULL,
  date_written TEXT NULL DEFAULT NULL,
  answerer_name VARCHAR(60) NOT NULL DEFAULT NULL,
  answerer_email VARCHAR(200) NOT NULL DEFAULT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpful INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);





-- ---
-- Table photos
--
-- ---



CREATE TABLE photos (
  id SERIAL,
  answer_id INTEGER NOT NULL DEFAULT NULL references answers(id),
  "url" TEXT NOT NULL DEFAULT NULL
);

-- ---
-- Foreign Keys
-- ---

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Answers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Products ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO Questions (question_id,question_body,question_date,asker_name,question_helpfulness,reported,product_id) VALUES
-- (,,,,,,);
-- INSERT INTO Answers (question_id,id,body,date,answerer_name,helpfulness) VALUES
-- (,,,,,);
-- INSERT INTO Products (product_id) VALUES
-- ();
-- INSERT INTO photos (id,answer_id,url) VALUES
-- (,,);