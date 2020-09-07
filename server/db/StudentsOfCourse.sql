SELECT 
	fullname,
	studentId,
	cid
FROM
	student_course
INNER JOIN students ON students.sid = student_course.sid
WHERE studentId IN (SELECT studentId FROM student_exam WHERE examId is NULL OR mark < 18 OR withdraw = 1) AND tid = 2 ;