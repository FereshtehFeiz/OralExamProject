SELECT DISTINCT studentId
FROM student_exam 
INNER JOIN users ON users.cid = student_exam.cid
WHERE examId is NULL OR mark < 18 OR withdraw = 1 AND users.id= 2;