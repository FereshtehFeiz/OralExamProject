SELECT * 
FROM student_exam
INNER JOIN exams ON exams.eid = student_exam.examId
INNER JOIN slots ON slots.eid = exams.eid
WHERE slots.state = 1 and exams.cid = 2;