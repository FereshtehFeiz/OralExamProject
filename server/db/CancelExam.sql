UPDATE slots
SET state = 0
WHERE eid IN (SELECT examId FROM student_exam WHERE studentId = 274475)