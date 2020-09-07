SELECT *
FROM student_course
INNER JOIN students ON students.studentId = student_course.studentId
WHERE student_course.studentId NOT IN (SELECT studentId FROM student_exam) OR student_course.studentId IN (SELECT studentId FROM student_exam WHERE mark<18 or withdraw =1)
AND student_course.tid = 2;