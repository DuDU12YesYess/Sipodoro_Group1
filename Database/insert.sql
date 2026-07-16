DROP DATABASE IF EXISTS defaultdb;
CREATE DATABASE defaultdb;
USE defaultdb;

SHOW TABLES;


-- ------------------------------------------------------------
-- User
-- ------------------------------------------------------------
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Task_Category
-- ------------------------------------------------------------
CREATE TABLE Task_Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

-- ------------------------------------------------------------
-- Seed
-- ------------------------------------------------------------
CREATE TABLE Seed (
    seed_id INT AUTO_INCREMENT PRIMARY KEY,
    seed_name VARCHAR(50) NOT NULL,
    cost INT NOT NULL,
    growth_required INT DEFAULT 3,
    image_url VARCHAR(255)
);

-- ------------------------------------------------------------
-- Task
-- ------------------------------------------------------------
CREATE TABLE Task (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT,
    title VARCHAR(255) NOT NULL,
    deadline DATETIME NOT NULL,
    status ENUM('Urgent','Critical','Low Critical') DEFAULT 'Urgent',
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (category_id) REFERENCES Task_Category(category_id)
);

-- ------------------------------------------------------------
-- Pomodoro_Cycle
-- ------------------------------------------------------------
CREATE TABLE Pomodoro_Cycle (
    cycle_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    focus_duration INT DEFAULT 25,
    break_duration INT DEFAULT 5,
    completed_focus_sessions INT DEFAULT 0,
    completed_break INT DEFAULT 0,
    streak_earned INT DEFAULT 0,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);


-- ------------------------------------------------------------
-- Hydration_Log
-- ------------------------------------------------------------
CREATE TABLE Hydration_Log (
    hydration_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    check_in_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);


-- ------------------------------------------------------------
-- Streak_Record
-- ------------------------------------------------------------
CREATE TABLE Streak_Record (
    streak_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_completed_cycle DATETIME,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- ------------------------------------------------------------
-- Coin_Wallet
-- ------------------------------------------------------------
CREATE TABLE Coin_Wallet (
    wallet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    total_coins INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
-- ------------------------------------------------------------
-- Coin_Transaction
-- ------------------------------------------------------------
CREATE TABLE Coin_Transaction (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- ------------------------------------------------------------
-- Seed_Inventory
-- ------------------------------------------------------------
CREATE TABLE Seed_Inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    seed_id INT NOT NULL,
    quantity INT DEFAULT 0,
    UNIQUE(user_id, seed_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (seed_id) REFERENCES Seed(seed_id)
);

-- ------------------------------------------------------------
-- Flower
-- ------------------------------------------------------------
CREATE TABLE Flower (
    flower_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    seed_id INT NOT NULL,
    growth_stage INT DEFAULT 0,
    status ENUM('Sprout','Bud','Bloomed') DEFAULT 'Sprout',
    date_planted DATETIME,
    date_bloomed DATETIME,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (seed_id) REFERENCES Seed(seed_id)
);

-- ------------------------------------------------------------
-- Shop_Transaction
-- ------------------------------------------------------------
CREATE TABLE Shop_Transaction (
    shop_transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    seed_id INT NOT NULL,
    quantity INT DEFAULT 1,
    coin_spent INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (seed_id) REFERENCES Seed(seed_id)
);

-- ------------------------------------------------------------
-- Garden
-- ------------------------------------------------------------
CREATE TABLE Garden (
    garden_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- ------------------------------------------------------------
-- Garden Flower
-- ------------------------------------------------------------
CREATE TABLE Garden_Flower (
    garden_flower_id INT AUTO_INCREMENT PRIMARY KEY,
    garden_id INT NOT NULL,
    flower_id INT NOT NULL,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (garden_id) REFERENCES Garden(garden_id) ON DELETE CASCADE,
    FOREIGN KEY (flower_id) REFERENCES Flower(flower_id) ON DELETE CASCADE
);
