-- ###############################################
-- INDEXES
-- ###############################################
CREATE INDEX idx_task_user
ON Task(user_id);

CREATE INDEX idx_task_deadline
ON Task(deadline);

CREATE INDEX idx_flower_user
ON Flower(user_id);

CREATE INDEX idx_hydration_user
ON Hydration_Log(user_id);

EXPLAIN
SELECT *
FROM Task
WHERE user_id = 1;