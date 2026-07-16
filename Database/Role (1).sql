-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 12, 2026 at 03:38 PM
-- Server version: 8.0.44
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Role`
--

-- --------------------------------------------------------

--
-- Table structure for table `garden_inventories`
--

CREATE TABLE `garden_inventories` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `quantity` int DEFAULT '1',
  `purchased_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `garden_inventories`
--

INSERT INTO `garden_inventories` (`id`, `user_id`, `item_name`, `quantity`, `purchased_at`) VALUES
(1, 1, 'Golden Sunflower Seed', 2, '2026-07-12 15:35:20'),
(2, 1, 'Bonsai Cherry Tree', 1, '2026-07-12 15:35:20'),
(3, 3, 'Basic Fertilizer Pack', 5, '2026-07-12 15:35:20');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `streaks`
--

CREATE TABLE `streaks` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `current_streak` int DEFAULT '0',
  `highest_streak` int DEFAULT '0',
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `streaks`
--

INSERT INTO `streaks` (`id`, `user_id`, `current_streak`, `highest_streak`, `last_updated`) VALUES
(1, 1, 5, 12, '2026-07-12 15:35:20'),
(2, 2, 0, 0, '2026-07-12 15:35:20'),
(3, 3, 2, 4, '2026-07-12 15:35:20');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `is_completed` tinyint(1) DEFAULT '0',
  `deadline` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `title`, `description`, `is_completed`, `deadline`, `created_at`) VALUES
(1, 1, 'Finalize Database Assignment', 'Normalize and run advanced operational scripts in phpMyAdmin', 1, '2026-07-15 14:00:00', '2026-07-12 15:35:20'),
(2, 1, 'Test Connection Pool', 'Configure Sequelize connection limits in Express project', 0, '2026-07-20 18:30:00', '2026-07-12 15:35:20'),
(3, 3, 'Review Study Plan', 'Read through chapters on index trees and constraints', 0, '2026-07-14 09:00:00', '2026-07-12 15:35:20');

-- --------------------------------------------------------

--
-- Table structure for table `timers`
--

CREATE TABLE `timers` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `duration_minutes` int NOT NULL,
  `completed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `timers`
--

INSERT INTO `timers` (`id`, `user_id`, `duration_minutes`, `completed_at`) VALUES
(1, 1, 25, '2026-07-12 15:35:20'),
(2, 1, 50, '2026-07-12 15:35:20'),
(3, 1, 25, '2026-07-12 15:35:20'),
(4, 3, 45, '2026-07-12 15:35:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `role_id`, `created_at`) VALUES
(1, 'pich_dev', 'pich@cadt.edu.kh', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36XKpS9Od1A.', 2, '2026-07-12 15:35:20'),
(2, 'admin_user', 'admin@system.com', '$2b$10$8K1p/9Z62Lg82MvGZ23VOurS.K2E5U1w0L83cDe1B.', 1, '2026-07-12 15:35:20'),
(3, 'test_user', 'test@example.com', '$2b$10$Y5n87bWv8R2vKqZs8mNfUu1p3kLW8Z9x3C4vB5n6M.', 2, '2026-07-12 15:35:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `garden_inventories`
--
ALTER TABLE `garden_inventories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_garden_user` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `streaks`
--
ALTER TABLE `streaks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_tasks_user_deadline` (`user_id`,`deadline`);

--
-- Indexes for table `timers`
--
ALTER TABLE `timers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_timers_user` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `idx_users_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `garden_inventories`
--
ALTER TABLE `garden_inventories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `streaks`
--
ALTER TABLE `streaks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `timers`
--
ALTER TABLE `timers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `garden_inventories`
--
ALTER TABLE `garden_inventories`
  ADD CONSTRAINT `garden_inventories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `streaks`
--
ALTER TABLE `streaks`
  ADD CONSTRAINT `streaks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `timers`
--
ALTER TABLE `timers`
  ADD CONSTRAINT `timers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
