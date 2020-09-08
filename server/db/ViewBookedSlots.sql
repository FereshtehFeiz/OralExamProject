SELECT *
FROM student_exam
INNER JOIN slots on slots.eid = student_exam.examId
WHERE studentId IN (SELECT studentId FROM student_exam WHERE studentId = 275645) AND slots.state = 1;
