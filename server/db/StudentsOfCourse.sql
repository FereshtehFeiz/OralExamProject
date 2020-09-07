SELECT 
	fullname,
	studentId,
	cid
FROM
	student_course
INNER JOIN students ON students.sid = student_course.sid
WHERE studentId NOT IN (SELECT studentId FROM student_exam) OR studentId IN (SELECT studentId FROM student_exam WHERE mark < 18) AND cid = 2 ;