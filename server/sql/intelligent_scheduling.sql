-- 创建数据库
create database intelligent_scheduling;

-- 创建数据表
create table flow_person(
	store_id varchar(20),			-- 门店id
	time datetime,              -- 记录日期
	flowing_person float,     -- 人流量数
	start_time time,        -- 开始时间
	end_time   time         -- 结束时间
)

-- 插入语句
INSERT INTO `intelligent_scheduling`.`flow_person`(`store_id`, `time`, `flowing_person`, `start_time`, `end_time`) 
VALUES ('1',	'2023-03-05 16:47:51',	0.1,	'08:00:00', '08:30:00');
