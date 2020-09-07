SELECT *
FROM slots
INNER JOIN student_exam ON student_exam.examId = slots.eid
WHERE student_exam.cid = (SELECT cid FROM users WHERE id = 2)