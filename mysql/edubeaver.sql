SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `edubeaver` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `edubeaver`;

CREATE TABLE `courses` (
`id` int(6) unsigned NOT NULL,
  `title` varchar(128) DEFAULT NULL,
  `abbr` varchar(10) NOT NULL,
  `credits` varchar(10) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `time_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE `sections` (
`id` int(10) unsigned NOT NULL,
  `course_id` int(6) unsigned NOT NULL,
  `term` char(4) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `session` varchar(20) NOT NULL,
  `crn` smallint(6) unsigned NOT NULL,
  `sec` smallint(3) unsigned NOT NULL,
  `credits` varchar(4) DEFAULT NULL,
  `instructor` varchar(50) NOT NULL,
  `m` tinyint(1) NOT NULL,
  `t` tinyint(1) NOT NULL,
  `w` tinyint(1) NOT NULL,
  `r` tinyint(1) NOT NULL,
  `f` tinyint(1) NOT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `location` varchar(20) NOT NULL,
  `campus` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `cap` smallint(4) unsigned NOT NULL,
  `enrolled` smallint(4) unsigned NOT NULL,
  `wl_cap` tinyint(3) unsigned NOT NULL,
  `wl_current` tinyint(3) unsigned NOT NULL,
  `fees` varchar(50) DEFAULT NULL,
  `restrictions` varchar(200) DEFAULT NULL,
  `comments` varchar(400) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;


ALTER TABLE `courses`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `sections`
 ADD PRIMARY KEY (`id`), ADD KEY `course_id` (`course_id`);


ALTER TABLE `courses`
MODIFY `id` int(6) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
ALTER TABLE `sections`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=70;

ALTER TABLE `sections`
ADD CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);
