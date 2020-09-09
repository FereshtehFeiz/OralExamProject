SELECT distinct date, slots.slotId
FROM slots
INNER JOIN student_exam ON student_exam.examId = slots.eid
WHERE eid = 86 AND slots.state = 0;