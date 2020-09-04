SELECT
	fullname,
	studentId,
	cid
FROM
	student_course
INNER JOIN students ON students.sid = student_course.sid;