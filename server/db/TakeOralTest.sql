SELECT startTime,date,slots.state,studentId,mark,attendance
FROM slots
INNER JOIN student_exam on student_exam.eid = slots.eid
WHERE slots.state = 0 and slots.cid = 2;


