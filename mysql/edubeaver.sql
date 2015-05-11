-- MySQL dump 10.13  Distrib 5.6.24, for Linux (x86_64)
--
-- Host: localhost    Database: edubeaver
-- ------------------------------------------------------
-- Server version 5.6.24

--
-- Create the edubeaver database
--
CREATE DATABASE `edubeaver`;
USE `edubeaver`;

--
-- Table structure for table `courses`
--
CREATE TABLE `courses` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `abbr` varchar(10) NOT NULL,
  `credits` varchar(10) DEFAULT NULL,
  `description` varchar(3000) DEFAULT NULL,
  `time_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Table structure for table `sections`
--
CREATE TABLE `sections` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` int(6) unsigned NOT NULL,
  `term` char(4) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `session` varchar(20) DEFAULT NULL,
  `crn` mediumint(6) unsigned NOT NULL,
  `sec` smallint(3) unsigned NOT NULL,
  `credits` varchar(4) DEFAULT NULL,
  `instructor` varchar(50) NOT NULL,
  `m` tinyint(1) DEFAULT NULL,
  `t` tinyint(1) DEFAULT NULL,
  `w` tinyint(1) DEFAULT NULL,
  `r` tinyint(1) DEFAULT NULL,
  `f` tinyint(1) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `campus` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `cap` smallint(4) unsigned NOT NULL,
  `enrolled` smallint(4) unsigned NOT NULL,
  `wl_cap` tinyint(3) unsigned NOT NULL,
  `wl_current` tinyint(3) unsigned NOT NULL,
  `fees` varchar(100) DEFAULT NULL,
  `restrictions` varchar(1000) DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create a superuser just in case :)
--
CREATE USER 'app'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'app'@'localhost' WITH GRANT OPTION;
CREATE USER 'app'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'app'@'%' WITH GRANT OPTION;

