SELECT DISTINCT name
FROM exams
INNER JOIN student_exam ON student_exam.examId = exams.eid
INNER JOIN courses ON courses.cid = exams.cid
WHERE mark < 18 OR withdraw = 1 AND studentId = 274475;