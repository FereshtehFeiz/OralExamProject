--Student's exams 
SELECT *
FROM student_exam
INNER JOIN courses on courses.cid = student_exam.cid
WHERE (mark < 18 OR withdraw = 1 OR attendance = 0 OR examId = NULL) AND student_exam.studentId = 274475;