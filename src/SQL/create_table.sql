-- MySQL Script generated by MySQL Workbench
-- Sun Apr 15 20:13:25 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema JIAN-JIAN
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema JIAN-JIAN
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `JIAN-JIAN` DEFAULT CHARACTER SET utf8 ;
USE `JIAN-JIAN` ;

-- -----------------------------------------------------
-- Table `JIAN-JIAN`.`book_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JIAN-JIAN`.`book_info` (
  `isbn` VARCHAR(13) NOT NULL,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `author` VARCHAR(45) NULL DEFAULT NULL,
  `title_page_image` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`isbn`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `JIAN-JIAN`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JIAN-JIAN`.`user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `nick_name` VARCHAR(128) NULL DEFAULT NULL,
  `avator_url` MEDIUMTEXT NULL DEFAULT NULL,
  `open_id` VARCHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `open_id_UNIQUE` (`open_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `JIAN-JIAN`.`book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JIAN-JIAN`.`book` (
  `book_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `isbn` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE INDEX `uk_user_id_isbn_idx` (`user_id` ASC, `isbn` ASC),
  INDEX `fk_book_user_idx` (`user_id` ASC),
  INDEX `fk_book_book_info1_idx` (`isbn` ASC),
  CONSTRAINT `fk_book_book_info1`
    FOREIGN KEY (`isbn`)
    REFERENCES `JIAN-JIAN`.`book_info` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_book_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `JIAN-JIAN`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 110
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `JIAN-JIAN`.`square`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JIAN-JIAN`.`square` (
  `square_id` INT(11) NOT NULL AUTO_INCREMENT,
  `author_user_id` INT(11) NOT NULL,
  `thoughts` VARCHAR(150) NULL DEFAULT NULL,
  `add_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `isbn` VARCHAR(13) NULL DEFAULT NULL,
  PRIMARY KEY (`square_id`),
  INDEX `fk_square_user1_idx` (`author_user_id` ASC),
  INDEX `fk_square_book_info1_idx` (`isbn` ASC),
  CONSTRAINT `fk_square_book_info1`
    FOREIGN KEY (`isbn`)
    REFERENCES `JIAN-JIAN`.`book_info` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_square_user1`
    FOREIGN KEY (`author_user_id`)
    REFERENCES `JIAN-JIAN`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 33
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `JIAN-JIAN`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JIAN-JIAN`.`comment` (
  `comment_id` INT(11) NOT NULL AUTO_INCREMENT,
  `square_square_id` INT(11) NOT NULL,
  `comment_user_id` INT(11) NOT NULL,
  `content` VARCHAR(140) NULL DEFAULT NULL,
  `add_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_comment_square1_idx` (`square_square_id` ASC),
  INDEX `fk_comment_user1_idx` (`comment_user_id` ASC),
  CONSTRAINT `fk_comment_square1`
    FOREIGN KEY (`square_square_id`)
    REFERENCES `JIAN-JIAN`.`square` (`square_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`comment_user_id`)
    REFERENCES `JIAN-JIAN`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `JIAN-JIAN`.`drifting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JIAN-JIAN`.`drifting` (
  `drifting_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `isbn` VARCHAR(45) NOT NULL,
  `content` MEDIUMTEXT NULL DEFAULT NULL,
  `create_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`drifting_id`),
  UNIQUE INDEX `drifting_id_UNIQUE` (`drifting_id` ASC),
  INDEX `fk_drifting_1_idx` (`isbn` ASC),
  INDEX `fk_drifting_2_idx` (`user_id` ASC),
  CONSTRAINT `fk_drifting_1`
    FOREIGN KEY (`isbn`)
    REFERENCES `JIAN-JIAN`.`book_info` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_drifting_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `JIAN-JIAN`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `JIAN-JIAN`.`sentence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JIAN-JIAN`.`sentence` (
  `sentence_id` INT(11) NOT NULL AUTO_INCREMENT,
  `book_id` INT(11) NOT NULL,
  `content` MEDIUMTEXT NULL DEFAULT NULL,
  `add_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `thought` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`sentence_id`),
  INDEX `fk_sentence_book1_idx` (`book_id` ASC),
  CONSTRAINT `fk_sentence_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `JIAN-JIAN`.`book` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 131
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `JIAN-JIAN`.`square_sentence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JIAN-JIAN`.`square_sentence` (
  `sq_s_id` INT(11) NOT NULL AUTO_INCREMENT,
  `square_id` INT(11) NOT NULL,
  `sentence_id` INT(11) NOT NULL,
  PRIMARY KEY (`sq_s_id`),
  INDEX `fk_square_sentence_2_idx` (`square_id` ASC),
  INDEX `fk_square_sentence_1_idx` (`sentence_id` ASC),
  CONSTRAINT `fk_square_sentence_1`
    FOREIGN KEY (`sentence_id`)
    REFERENCES `JIAN-JIAN`.`sentence` (`sentence_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_square_sentence_2`
    FOREIGN KEY (`square_id`)
    REFERENCES `JIAN-JIAN`.`square` (`square_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `JIAN-JIAN`.`zan_record`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JIAN-JIAN`.`zan_record` (
  `zan_id` INT(11) NOT NULL AUTO_INCREMENT,
  `square_id` INT(11) NOT NULL,
  `zan_user_id` INT(11) NOT NULL,
  `add_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`zan_id`),
  INDEX `fk_zan_record_square1_idx` (`square_id` ASC),
  INDEX `fk_zan_record_user1_idx` (`zan_user_id` ASC),
  CONSTRAINT `fk_zan_record_square1`
    FOREIGN KEY (`square_id`)
    REFERENCES `JIAN-JIAN`.`square` (`square_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_zan_record_user1`
    FOREIGN KEY (`zan_user_id`)
    REFERENCES `JIAN-JIAN`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `uk_zan_square_user`
		UNIQUE KEY(`square_id`, `zan_user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
