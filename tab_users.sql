/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : 127.0.0.1:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-04-17 16:38:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tab_users`
-- ----------------------------
DROP TABLE IF EXISTS `tab_users`;
CREATE TABLE `tab_users` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `age` varchar(30) DEFAULT NULL,
  `realname` varchar(50) CHARACTER SET gb2312 NOT NULL,
  `birthday` varchar(20) NOT NULL,
  `address` varchar(120) CHARACTER SET utf8 NOT NULL,
  `userid` varchar(10) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tab_users
-- ----------------------------
INSERT INTO `tab_users` VALUES ('1', 'admin1', '4297f44b13955235245b2497399d7a93', 'z.nygqhxed@ffgey.bs', '31', '崔刚', '1974-10-11', '房山区', '');
INSERT INTO `tab_users` VALUES ('6', 'Thomas Anderson', '4297f44b13955235245b2497399d7a93', 'f.btd@dppg.de', '92', '黎芳', '1976-10-24', '鄂温克族自治旗', '');
INSERT INTO `tab_users` VALUES ('7', 'Jessica Moore', '123123', 'z.nygqhxed@ffgey.bs', '31', '崔刚', '1974-10-11', '房山区', '');
INSERT INTO `tab_users` VALUES ('8', 'Joseph Hall', '123123', 'f.qbtyqarsja@cklw.lv', '09', '刘丽', '2008-05-17', '大冶市', '');
INSERT INTO `tab_users` VALUES ('9', 'Thomas Anderson', '123123', 'f.btd@dppg.de', '92', '黎芳', '1976-10-24', '鄂温克族自治旗', '');
INSERT INTO `tab_users` VALUES ('10', 'Jessica Moore', '4297f44b13955235245b2497399d7a93', 'z.nygqhxed@ffgey.bs', '31', '李闯', '1974-10-11', '房山区', '');
INSERT INTO `tab_users` VALUES ('11', 'Joseph Hall', '123123', 'f.qbtyqarsja@cklw.lv', '09', '刘丽', '2008-05-17', '大冶市', '');
INSERT INTO `tab_users` VALUES ('12', 'Thomas Anderson', '7e908c001b5279be2cc8f4d281c193f3', 'f.btd@dppg.de', '92', '黎芳', '1976-10-24', '鄂温克族自治旗', '');
INSERT INTO `tab_users` VALUES ('13', 'Jessica Moore', '123123', 'z.nygqhxed@ffgey.bs', '31', '李闯', '1974-10-11', '房山区', '');
INSERT INTO `tab_users` VALUES ('14', 'Joseph Hall', '123123', 'f.qbtyqarsja@cklw.lv', '09', '刘丽', '2008-05-17', '大冶市', '');
INSERT INTO `tab_users` VALUES ('16', 'Jessica Moore', '123123', 'z.nygqhxed@ffgey.bs', '31', '李闯', '1974-10-11', '房山区', '');
INSERT INTO `tab_users` VALUES ('17', 'Joseph Hall', '123123', 'f.qbtyqarsja@cklw.lv', '09', '刘丽', '2008-05-17', '大冶市', '');
INSERT INTO `tab_users` VALUES ('18', 'Thomas Anderson', '123123', 'f.btd@dppg.de', '92', '黎芳', '1976-10-24', '鄂温克族自治旗', '');
