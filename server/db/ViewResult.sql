SELECT studentId,startTime,date,slots.state,mark,attendance
FROM student_exam
INNER JOIN slots on slots.slotId = student_exam.slotId
WHERE student_exam.cid = 2;