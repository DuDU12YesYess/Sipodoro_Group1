USE sipodoro_db;


-- ADMIN
CREATE TABLE IF NOT EXISTS Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);
INSERT INTO Admin (username, email, password_hash)
VALUES
('admin1', 'admin1@sipodoro.com', '$2b$10$hashedadmin1'),
('admin2', 'admin2@sipodoro.com', '$2b$10$hashedadmin2');

-- USER
CREATE TABLE IF NOT EXISTS User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    total_streak INT DEFAULT 0,
    total_flowers INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);
INSERT INTO User
(admin_id, username, email, password_hash, total_streak, total_flowers)
VALUES
(1, 'john', 'john@gmail.com', '$2b$10$hashedjohn', 7, 2),
(1, 'sara', 'sara@gmail.com', '$2b$10$hashedsara', 12, 4),
(1, 'mike', 'mike@gmail.com', '$2b$10$hashedmike', 3, 1),
(2, 'anna', 'anna@gmail.com', '$2b$10$hashedanna', 15, 5),
(2, 'david', 'david@gmail.com', '$2b$10$hasheddavid', 8, 3);

-- TASK CATEGORY
CREATE TABLE IF NOT EXISTS Task_Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    category_name VARCHAR(50) NOT NULL,

    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);
INSERT INTO Task_Category (admin_id, category_name)
VALUES
(1, 'Study'),
(1, 'Work'),
(2, 'Personal');

-- TASK
CREATE TABLE IF NOT EXISTS Task (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT,
    title VARCHAR(255) NOT NULL,
    deadline DATETIME,
    status ENUM('Pending','Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (category_id) REFERENCES Task_Category(category_id)
);
INSERT INTO Task
(user_id, category_id, title, deadline, status)
VALUES
(1, 1, 'Database Assignment', '2026-07-01 23:59:00', 'Pending'),
(1, 5, 'Read Networking Chapter', '2026-06-25 20:00:00', 'Completed'),
(2, 2, 'Prepare Presentation', '2026-06-28 18:00:00', 'Completed'),
(2, 3, 'Buy Groceries', '2026-06-24 17:00:00', 'Pending'),
(3, 1, 'Study SQL Joins', '2026-06-30 21:00:00', 'Pending'),
(3, 4, 'Morning Workout', '2026-06-23 07:00:00', 'Completed'),
(4, 2, 'Finish UI Design', '2026-06-29 22:00:00', 'Completed'),
(4, 5, 'Read AI Article', '2026-06-27 19:00:00', 'Pending'),
(5, 3, 'Clean Room', '2026-06-24 15:00:00', 'Completed'),
(5, 1, 'Research GeoAI', '2026-07-02 20:00:00', 'Pending');

-- POMODORO CYCLE
CREATE TABLE IF NOT EXISTS Pomodoro_Cycle (
    cycle_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    completed_focus_sessions INT DEFAULT 0,
    completed_breaks INT DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,

    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
INSERT INTO Pomodoro_Cycle
(user_id, completed_focus_sessions, completed_breaks, is_completed, completed_at)
VALUES
(1, 4, 4, TRUE, '2026-06-20 18:00:00'),
(1, 3, 3, TRUE, '2026-06-21 19:00:00'),
(2, 6, 6, TRUE, '2026-06-21 20:00:00'),
(3, 2, 2, TRUE, '2026-06-20 16:00:00'),
(4, 8, 8, TRUE, '2026-06-21 21:00:00'),
(5, 5, 5, TRUE, '2026-06-19 17:00:00');

-- HYDRATION LOG
CREATE TABLE IF NOT EXISTS Hydration_Log (
    hydration_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    check_in_time DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
INSERT INTO Hydration_Log (user_id, check_in_time)
VALUES
(1, '2026-06-22 09:00:00'),
(1, '2026-06-22 11:00:00'),
(2, '2026-06-22 08:30:00'),
(2, '2026-06-22 12:00:00'),
(3, '2026-06-22 10:00:00'),
(4, '2026-06-22 09:30:00'),
(4, '2026-06-22 13:00:00'),
(5, '2026-06-22 11:30:00');

-- STREAK RECORD
CREATE TABLE IF NOT EXISTS Streak_Record (
    streak_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_cycle_date DATE,

    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
INSERT INTO Streak_Record
(user_id, current_streak, longest_streak, last_cycle_date)
VALUES
(1, 7, 10, '2026-06-21'),
(2, 12, 15, '2026-06-21'),
(3, 3, 5, '2026-06-20'),
(4, 15, 20, '2026-06-21'),
(5, 8, 12, '2026-06-21');

-- COIN WALLET
CREATE TABLE IF NOT EXISTS Coin_Wallet (
    wallet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    total_coins INT DEFAULT 0,

    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
INSERT INTO Coin_Wallet
(user_id, total_coins)
VALUES
(1, 150),
(2, 280),
(3, 75),
(4, 400),
(5, 180);

-- COIN TRANSACTION
CREATE TABLE IF NOT EXISTS Coin_Transaction (
    coin_transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
INSERT INTO Coin_Transaction
(user_id, amount)
VALUES
(1, 50),
(1, 100),
(2, 80),
(2, 200),
(3, 75),
(4, 400),
(5, 180);

-- SEED
CREATE TABLE IF NOT EXISTS Seed (
    seed_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    seed_name VARCHAR(50) NOT NULL,
    growth_required INT DEFAULT 3,
    cost INT NOT NULL,

    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);
INSERT INTO Seed
(admin_id, seed_name, growth_required, cost)
VALUES
(1, 'Sunflower', 3, 50),
(1, 'Daisy', 4, 75),
(1, 'Tulip', 5, 100),
(2, 'Lavender', 6, 120),
(2, 'Rose', 8, 150);

-- SEED INVENTORY
CREATE TABLE IF NOT EXISTS Seed_Inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    seed_id INT NOT NULL,
    quantity INT DEFAULT 0,

    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (seed_id) REFERENCES Seed(seed_id)
);
INSERT INTO Seed_Inventory
(user_id, seed_id, quantity)
VALUES
(1, 1, 3),
(1, 2, 1),
(2, 5, 2),
(3, 3, 1),
(4, 4, 4),
(5, 1, 2);

-- FLOWER
CREATE TABLE IF NOT EXISTS Flower (
    flower_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    seed_id INT NOT NULL,
    growth_count INT DEFAULT 0,
    status ENUM('Growing','Bloomed') DEFAULT 'Growing',
    date_planted DATETIME,
    date_bloomed DATETIME,

    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (seed_id) REFERENCES Seed(seed_id)
);
INSERT INTO Flower
(user_id, seed_id, growth_count, status, date_planted, date_bloomed)
VALUES
(1, 1, 3, 'Bloomed', '2026-06-15', '2026-06-18'),
(2, 5, 6, 'Growing', '2026-06-17', NULL),
(3, 3, 2, 'Growing', '2026-06-20', NULL),
(4, 4, 6, 'Bloomed', '2026-06-10', '2026-06-16'),
(5, 1, 3, 'Bloomed', '2026-06-14', '2026-06-17');

-- SHOP TRANSACTION
CREATE TABLE IF NOT EXISTS Shop_Transaction (
    shop_transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    seed_id INT NOT NULL,
    quantity INT DEFAULT 1,
    coin_spent INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (seed_id) REFERENCES Seed(seed_id)
);
INSERT INTO Shop_Transaction
(user_id, seed_id, quantity, coin_spent)
VALUES
(1, 1, 1, 50),
(2, 5, 2, 300),
(3, 3, 1, 100),
(4, 4, 2, 240),
(5, 1, 2, 100);

-- GARDEN
CREATE TABLE IF NOT EXISTS Garden (
    garden_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
INSERT INTO Garden (user_id)
VALUES
(1),
(2),
(3),
(4),
(5);