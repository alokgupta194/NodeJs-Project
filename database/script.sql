--create db
create database employeeManagementSystem;

--select db
use employeeManagementSystem

--create Tables
create table users(
    userID int AUTO_INCREMENT,
    name varchar(40) NOT NULL,
    email varchar(40) ,
    password varchar(100) NOT NULL,
    roleID int NOT NULL,
    depID int NOT NULL,
    UNIQUE(email),
    userType 
    primary key(userID)
);
select * from users


create table roles(
    roleID int AUTO_INCREMENT,
    role varchar(40),
    primary key(roleID)
);

create table department(
    deptID int AUTO_INCREMENT,
    departmentName varchar(40),
    primary key(deptID)

);

--mapping
create table userRole(
    userID int NOT NULL,
    roleID int NOT NULL
);
create table departmentRole(
    userID int NOT NULL,
    roleID int NOT NULL,
    depID int NOT NULL
);
create table departmentUser (
    userID int NOT NULL,
    depID int NOT NULL
);
--insert command for userRole
insert into userrole(userID,roleID) values(1,1);
insert into userrole(userID,roleID) values(2,1);
insert into userrole(userID,roleID) values(3,1);
insert into userrole(userID,roleID) values(4,1);

--insert command for departmentRole
insert into departmentRole(userID,roleID,depID) values(1,1,2);
insert into departmentRole(userID,roleID,depID) values(2,1,2);
insert into departmentRole(userID,roleID,depID) values(3,1,1);
insert into departmentRole(userID,roleID,depID) values(4,1,2);

--insert command for departmentUser
insert into departmentUser(userID,depID) values(1,2);
insert into departmentUser(userID,depID) values(2,2);
insert into departmentUser(userID,depID) values(3,1);
insert into departmentUser(userID,depID) values(4,2);

--insert command for user
insert into users values(1,'ALOK GUPTA','alokgupta194@gmail.com','alok@123',1,2);
insert into users values(2,'Aman Singh','amansingh@gmail.com','aman@123',1,2)

--insert command for roles
insert into roles values(1,'admin')
insert into roles values(2,'normalUser')
select * from roles


--insert command for department
insert into department values(1,'HR');
insert into department values(2,'IT');
insert into department values(3,'support');
insert into department values(4,'service');


--Listing
--1
SELECT name,roles.role from  users
join roles on
users.roleID=roles.roleID

--2
SELECT name,department.departmentName from  users
join department on
users.depID=department.deptID

--Pagination

select * from users where userID between 1 and 3;

--download Csv File of User
SELECT * FROM users into outfile 
"C:\\Users\\OPTLPTP254\\Downloads\\users.csv" 
fields terminated by ',' 
lines terminated by '\n';'