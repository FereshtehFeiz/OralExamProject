--Student's exams 
SELECT name,eid
FROM student_exam
INNER JOIN courses on courses.cid = student_exam.cid
WHERE sid = 1;
