-- show user's tasks
SELECT
u.username,
t.title,
c.category_name,
t.status
FROM Task t
JOIN User u ON t.user_id = u.user_id
JOIN Task_Category c ON t.category_id = c.category_id;

-- most completed pomodoro cycles
SELECT
u.username,
COUNT(*) AS cycles_completed
FROM User u
JOIN Pomodoro_Cycle p ON u.user_id = p.user_id
WHERE p.is_completed = TRUE
GROUP BY u.user_id
ORDER BY cycles_completed DESC;

-- ###############################################
-- QUERIES
-- ###############################################
-- show streak
SELECT
u.username,
s.current_streak
FROM User u
JOIN Streak_Record s ON u.user_id = s.user_id
ORDER BY s.current_streak DESC;

-- total coin 
SELECT
u.username,
w.total_coins
FROM User u
JOIN Coin_Wallet w ON u.user_id = w.user_id;

-- bloomed flower 
SELECT
u.username,
s.seed_name,
f.date_bloomed
FROM Flower f
JOIN User u ON f.user_id = u.user_id
JOIN Seed s ON f.seed_id = s.seed_id
WHERE f.status = 'Bloomed';

DROP USER 'admin_fufu'@'localhost';