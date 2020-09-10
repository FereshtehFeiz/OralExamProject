SELECT *
FROM student_exam
INNER JOIN slots on slots.eid = student_exam.examId
where studentId = 274475 AND student_exam.slotId is not NULL AND slots.state=1;