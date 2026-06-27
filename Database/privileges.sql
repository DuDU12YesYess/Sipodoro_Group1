-- ###############################################
-- USER ROLES AND PRIVILEGES
-- ###############################################
-- Admin
CREATE ROLE IF NOT EXISTS admin_role;
GRANT ALL PRIVILEGES ON sipodoro_db.* TO admin_role;

-- system admin
CREATE USER 'admin_fufu'@'localhost'
IDENTIFIED BY 'fufu1234';

GRANT ALL PRIVILEGES 
ON sipodoro_db.*
TO 'admin_fufu'@'localhost';
GRANT 'admin_role' TO 'admin_fufu'@'localhost';
SHOW GRANTS FOR 'admin_fufu'@'localhost';

-- database manager 
CREATE USER 'admin_tutu'@'localhost'
IDENTIFIED BY 'tutu1234';


GRANT ALTER, SELECT, INSERT, UPDATE, CREATE VIEW
ON sipodoro_db.*
TO 'admin_tutu'@'localhost';



-- User
CREATE USER 'user_gaga'@'localhost'
IDENTIFIED BY 'gaga1234';

GRANT SELECT, INSERT, UPDATE
ON sipodoro_db.*
TO 'user_gaga'@'localhost';

REVOKE UPDATE ON sipodoro_db.* FROM 'user_gaga'@'localhost';



SHOW GRANTS FOR 'admin_role';
SHOW GRANTS FOR 'admin_fufu'@'localhost';
SHOW GRANTS FOR 'admin_tutu'@'localhost';
SHOW GRANTS FOR 'user_gaga'@'localhost';
FLUSH PRIVILEGES;