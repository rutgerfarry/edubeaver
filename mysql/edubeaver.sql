SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `edubeaver` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `edubeaver`;

CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `abbr` varchar(10) NOT NULL,
  `credits` varchar(10) DEFAULT NULL,
  `description` varchar(3000) DEFAULT NULL,
  `time_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2887 ;

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `review_text` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `sections` (
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
  KEY `course_id` (`course_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14310 ;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(16) NOT NULL,
  `avatar` mediumblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `users_reviews` (
  `user_id` int(10) unsigned NOT NULL,
  `review_id` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `users_sections` (
  `user_id` int(10) unsigned NOT NULL,
  `section_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`section_id`),
  UNIQUE KEY `user_id` (`user_id`,`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `sections`
  ADD CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);
