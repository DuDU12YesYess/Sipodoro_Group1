-- ###############################################
-- INDEXES
-- ###############################################
CREATE INDEX idx_user_email
ON User(email);

CREATE INDEX idx_task_user
ON Task(user_id);

CREATE INDEX idx_cycle_user
ON Pomodoro_Cycle(user_id);

CREATE INDEX idx_transaction_user
ON Coin_Transaction(user_id);

EXPLAIN SELECT * 
FROM User 
WHERE email = 'john@gmail.com';

EXPLAIN SELECT * 
FROM Task 
WHERE user_id = 1;