SELECT *
FROM student_course
INNER JOIN students ON students.studentId = student_course.studentId
WHERE student_course.studentId NOT IN (SELECT studentId FROM student_exam WHERE mark >= 18 Or withdraw = 0 ) AND tid = 2; 