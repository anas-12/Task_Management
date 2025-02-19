-- Suppression des rôles existants
DELETE FROM roles;

-- Réinitialisation de l'auto-increment
ALTER TABLE roles AUTO_INCREMENT = 1;

-- Insertion des rôles
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_PUBLIC');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');