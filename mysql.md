## 语法
```

-- ddl 数据定义语言
-- 关键字大写
CREATE TABLE student
(
  id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(64) NOT NULL,
	age INT(11) DEFAULT NULL,
	city VARCHAR(64) DEFAULT '北京'
	)
	SELECT * FROM student;
	DESC student
-- 如何修改和增加表里的字段
ALTER TABLE student ADD COLUMN idcard VARCHAR(18) NULL; -- 增加
ALTER TABLE student MODIFY idcard VARCHAR(128) NOT NULL; -- 修改
ALTER TABLE student DROP idcard; -- 删除

-- 增加约束
ALTER TABLE student ADD PRIMARY KEY(id); -- 增加主键
ALTER TABLE student ADD UNIQUE INDEX uq_student_idcard (idcard); -- 增加唯一索引
-- 增加默认约束
ALTER TABLE student MODIFY COLUMN city VARCHAR(64) DEFAULT '南京';
-- 主外键
ALTER TABLE score ADD CONSTRAINT fk_score_student_id FOREIGN KEY(student_id) REFERENCES student(id);

-- dml 数据操作语言
INSERT INTO student(name,age,city) -- 括号内的内容可以省略
VALUES('张三','10','北京');
-- 每次插入一行 精确匹配 不能为标识列写入值 缺省的值 可以用DEFAULT 代替

UPDATE student SET age = 40,city='汶上'; -- 更新所有行
UPDATE student SET age = 30,city='济宁' where id = 1 OR name='李四';
-- 一次可以更新多列 用，隔开 如果有多个条件 用AND 		OR 
-- 更新只更新 不同的行


DELETE FROM student WHERE id = 2;
-- 删除是正行删除 如果删除的表是主表 要先删除子表；


-- TRUNCATE 重置标识种子 删除条目后没有占位 没有备份 不写入日志 不能恢复
-- delete 会写入日志 可以在日志恢复
TRUNCATE TABLE student;






-- 查询语句
SELECT id,name AS HOME  -- 	所有 * as 起别名 要查询的列
FROM student
WHERE city='北京'
ORDER BY id ASC

-- 查询空行

SELECT * 
FROM student 
WHERE name IS NULL -- 不能用等号

--常量 列 ‘中国’ as country

-- 分页

SELECT * 
FROM student 
LIMIT 0,3 -- 从0索引开始取  取三条 如果只写一个数字 就是取几条


-- 查询来自不同的城市

SELECT DISTINCT city  -- DISTINCT 不同的  如果有相同的 则只保留一个
FROM student;

SELECT 1+1 -- + 只能用来加数字 如果不是数字 也转化不成数字 就是0

SELECT CONCAT('A','B'); -- AB

-- 排序
SELECT * 
FROM score
ORDER BY grade DESC // 降序

-- 多次排序 先按课程排序 课程内再按分数排序 
SELECT * 
FROM score
ORDER BY course_id ASC, grade DESC;

-- 模糊匹配

SELECT * FROM student WHERE name LIKE'郭%' -- 以郭开头 %郭 以郭结尾 %郭% 包含郭

SELECT * FROM student WHERE name LIKE'郭_' -- 郭后面有一个字符

SELECT CONCAT(province,city) from student; -- 字段拼接

SELECT CONCAT(province,city) from student; -- 字段拼接 第一个参数分隔符
SELECT CONCAT_ws('-', province,city) from student; -- 字段拼接 第一个参数分隔符
SELECT LEFT('zhufeng',3) -- 从左边取三个字符 right length
SELECT SUBSTR(str FROM pos FOR len) -- 从第pos开始去len个 pos 从1开始
SELECT SUBSTR(str,pos,len) -- 同上

SELECT INSTR('ZHUFENG','FENG'); -- FENG 所在的位置
SELECT UPPER('Z') -- 转化成大写 LOWER 转化为小写 TRIM 去空格
SELECT LPAD('DD', num, 0); -- 给DD补 num 个 0 左边补领 RPAD 右边补零
SELECT REPLACE('zhufeng', 'zhu', 'dog') -- 把zhu 替换成dog
SELECT FORMAT(10000,2) -- 保留两位小数 数字格式化
-- 数学运算 以下都要有select
SELECT 
CEIL(2.5);FLOOR(3.4);
MOD(22，3);-- 取模
POWER(2，3);-- 幂运算
ROUND();-- 四舍五入
TRUNCATE(); -- 取整

-- 日期
NOW(); -- 当前时间
CURDATE(); -- 当前日期
CURTIME();
SELECT YEAR(NOW());
SELECT STR_TO_DATE('09-09-2018', '%y-%m-%d') -- 2018-09-09
SELECT DATE_FORMAT(NOW(),'%y-%m-%d') -- 格式化

SELECT DATE_ADD(NOW(), INTERVAL, 365, DAY);
SELECT DATEDIFF(NOW(),'2019-9-2');
SELECT CONNECTION_ID(); -- 查询当前数据链接ID 每个客户端连接上数据库之后都会有一个链接的id
SELECT DATABASE() -- 当前数据库名字
SELECT VERSION(); -- 查询mysql 版本号
SELECT USER(); -- 查询当前用户
SELECT LAST_INSERT_ID() -- 获取上一个被插入的ID号
SELECT MD5(str); -- 生成MD5
SELECT PASSWORD(‘root’); -- 查询root 的密码

UPDATE mysql.user SET PASSWORD=PASSWORD('root') where user = '珠峰';

SELECT IF(1>2, 1,0);

SELECT 
CASE grade
WHEN 100 THEN '满分'
WHEN 90 THEN '优秀'
ELSE '其他'
END
FROM score


SELECT 
CASE 
WHEN grade > 100 THEN '满分'
WHEN grade > 90 THEN '优秀'
ELSE '其他'
END
FROM score

UPDATE student SET email = UPPER(email); -- 更新邮箱为大写

-- 创建函数

SELECT NOW();
CREATE FUNCTION ZNOW(format varchar(64)) RETURNS VARCHAR(128) -- 创建一个函数  返回值格式是varchar
RETURN DATE_FORMAT(NOW(), '%Y-%m-%d')

-- 函数体不止一行
CREATE FUNCTION ADD_USER(name VARCHAR(64)) RETURNS INT
BEGIN
	INSERT INTO t2(name) VALUES(name);
	RETURN LAST_INSET_ID();
END
SELECT ADD_USER('chen7')

-- 模糊查询

SELECT * FROM score WHERE grade > 70 AND grade < 100; -- 等价于下面的语句

SELECT * FROM score WHERE grade BETWEEN 70 AND 100;

-- 聚合函数

SELECT SUM(grade) FROM score WHERE student_id = 1;


SELECT AVG(grade) FROM score WHERE student_id = 1;

SELECT COUNT(*) FROM score WHERE student_id = 1; -- id 为1 的记录有几条 COUNT 计算每一条的个数 在分组中用于计算 group by 字段的 条数


SELECT MAX(grade) FROM score WHERE student_id = 1; -- 取最大分

SELECT MIN(grade) FROM score WHERE student_id = 1; -- 最下分

-- 分组
SELECT student_id, AVG(grade)
FROM score
GROUP BY student_id   -- 以studentId 分组 两列 一列是id 另一列 平均分
-- 分组
SELECT student_id, AVG(grade)
FROM score
GROUP BY student_id   -- 以studentId 分组 两列 一列是id 另一列 平均分
ORDER BY AVG(grade) DEC
-- 多列分组 只有多列的值相同的才会被分在一组
SELECT province，gender from STUDENT 
GROUP BY province,gender

-- 对分组后的结果进行筛选 只能用having
 
SELECT province,COUNT(*)
from STUDENT 
GROUP BY province
HAVING COUNT(*)>1


-- SELECT province,COUNT(*)
SELECT province,COUNT(*)
from STUDENT 
where grade > 80
GROUP BY province
HAVING COUNT(*)>1

-- COUNT() 如果里面是列名 则统计不为null 个数
-- 为* 就等同于记录数  只要一列不为null 就会被计数

-- 子查询 ALL SOME ANY
SELECT * 
FROM student
WHERE age > ALL (SELECT age FROM student WHERE province='陕西省')

-- 查询有成绩的同学
SELECT *
FROM student
WHERE id in (SELECT student_id from score) -- not in 不在

-- 查询有成绩的同学 性能比 in 高
SELECT *
FROM student
WHERE EXISTS in (SELECT * from score WHERE score.student_id = student.id) -- not EXIT 不在

-- 表连接

-- 内连接 满足后面的条件
SELECT * FROM student INNER JOIN SCORE ON student.id = score.student_id -- 等价于
SELECT * FROM student,score where student.id = score.student_id 
-- 左连接
SELECT * FROM student LEFT JOIN SCORE ON student.id = score.student_id -- 先内连接 然后看左边没有匹配上的 补上
-- 右连接
SELECT * FROM student RIGHT JOIN SCORE ON student.id = score.student_id


-- 学生姓名 课程名 分数  多表连接
SELECT student.name, course.name, score.grade 
FROM score INNER JOIN student ON score.student_id = student.id
INNER JOIN course ON score.course_id = course.id

-- 内联表 自己连接自己
-- 查询所有顶级分类下面的类别的数量

SELECT * FROM category c1 INNER JOIN category c2 on c1.parentId = c2.id -- c1  c2 同一表的别名

SELECT c1.id,COUNT(*) FROM category c1 INNER JOIN category c2 on c1.parent_Id = c2.id 
WHERE c1.parent_id = 0; -- 把等级分类赛选出来
GROUP BY c1.id -- 根据顶级分类的id 进行分组

-- 要把所有的父id 变成名称
SELECT c1.id, c1.name, c2.name 父分类的名称 FROM category c1 INNER JOIN category c2 on c1.parent_id = c2.id

-- 删除重复记录
-- 1. 先查出来要删除的id
SELECT * FROM category c1 LEFT JOIN 
(SELECT id,name FROM category GROUP BY name HAVING count(*) > 1) c2 -- 用子查询作为一个表
ON c1.name = c2.name
WHERE c1.id != c2.id 
-- 2. 实现删除
DELETE FROM category c1
WHERE name IN 
(SELECT name from (SELECT name FROM category GROUP BY name HAVING COUNT(*) > 1) t1) -- 删除了重复的name 条目 
NOT IN (SELECT id from (SELECT MIN(id) id FROM catefory GROUP BY name HAVING COUNT(*) > 1) t2) -- 保留最小id 要不会全部删除 至少保留一条 id 是别名

-- 分组后 没有单一的字段 一般只能拿到 分组的字段名称 还有 聚合 就算写了 单一的 字段 会只取到第一个条目的字段


-- 多表更新
INSERT INTO province(name) SELECT DISTINCT province FROM student -- 把学生表的 省份拿出来 插入到省份表

-- 把学生表的 省份 变成 id 关联 省份表

UPDATE student INNER JOIN province ON student.province = province.name 
SET student.province = province.id

ALTER TABLE student MODIFY province int NOT NULL  -- 修改表字段 用 alter 
-- 修改列名
ALTER table student 
CHANGE COLUMN province province_id int(11) NOT NULL AFTER city;


-- 无限分类 自关联 -- 显示关联后符合条件的条目

select name, IFNULL(c1.name, '顶级分类') from category c1 INNER JOIN category c2 ON c1.parent_id == c2.id -- 查到 on 后边条件的条目

-- 软件开发 步骤
-- 1.需求分析
-- 2.概要 er 图
-- 3. 详细设计
-- 4， 代码实现
-- 5. 测试
-- 6. 安装

-- 数据库设计步骤
-- 1. 数据分析
-- 2. 标识实体
-- 3. 标示 实体属性
-- 4. 标示实体之间的关系

-- 数据库 er 图 entity relative -- 实体关系图
-- 与其他数据库通用

-- 数据设计合理 表结构和表关系设计好
-- 信息重复
-- 更新异常
-- 插入异常
-- 删除异常

-- 三大范式
-- 1. 第一范式 每一列不可拆分
-- 2. 第二范式 每一列必须和主键有关系 一个表描述一件事情
-- 3. 第三范式 每一列 和 主键直接相关  不能间接相关

-- RBAC 角色权限控制 用户-角色-资源

-- 一对一 在各自表 放对方的id
-- 一对多 一个用户关联多个角色 一个角色只能属于一个用户 在多的一方 加一个字段 标识自己是属于哪个一
-- 多对多 建立关联表 user_role

-- 模型图 可以 导出sql 和 图  导出sql 可以导入 自动创建表  模型图不导出 可以 同步到数据库
-- 同步的好处 如果模型改了 可以 再次同步 修改的内容

-- 数据库使用
-- 事务 
-- 事务是一系列逻辑 要么都执行 要么不执行
-- 原子性 隔离性 一致性 持久性

-- 开启事务

-- 默认是自动提交 修改 SET AUTOCOMMIT = 0; 可以关闭自动提交
-- BEGIN 开启事务  开启之后 只有自己的链接能看见 别人看不到
-- 如果没问题 commit  提交之后 别人可以看到


-- 有问题  ROLLBACK 回滚
```


## 使用
- 在node 中使用
   安装  `cnpm install mysql`
##  线程池

## note 
- 死锁  互相等待