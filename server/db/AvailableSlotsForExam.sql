SELECT *
FROM slots
INNER JOIN student_exam ON student_exam.examId = slots.eid
WHERE eid = 78 AND slots.state = 0;