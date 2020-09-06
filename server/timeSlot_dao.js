"use strict";

const OralTimeSlot = require("./oralTimeSlot");
const db = require("./db");
const moment = require("moment");

const createExamSlots = function (row) {
  return new OralTimeSlot(
    row.slotId,
    row.startTime,
    row.date,
    row.studentId,
    row.state,
    row.mark,
    row.attendance,
    row.cid
  );
};

/**
 * Get slots to take oral exam
 */
exports.getExamSlots = function (cid) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM slots INNER JOIN student_exam on student_exam.eid = slots.eid WHERE slots.state = 0 and slots.cid = ?";
    db.all(sql, [cid], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        let ExamSlots = rows.map((row) => createExamSlots(row));
        console.log(ExamSlots);
        resolve(ExamSlots);
      }
    });
  });
};

/**
 * Get results of oral exams booked or not booked for teacher
 */

exports.getResultView = function (cid) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT studentId,startTime,date,slots.state,mark FROM student_exam " +
      "INNER JOIN slots on slots.slotId = student_exam.slotId " +
      "WHERE student_exam.cid = ? ";
    db.all(sql, [cid], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        let ExamResult = rows.map((row) => createExamSlots(row));
        console.log(ExamResult);
        resolve(ExamResult);
      }
    });
  });
};

// exports.createExamTimeSlot = function (timeSlot) {
//   if (timeSlot.date) {
//     timeSlot.date = moment(timeSlot.date).format("YYYY-MM-DD HH:mm");
//   }
//   return new Promise((resolve, reject) => {
//     const sql =
//       "INSERT INTO slots(state, date, slotDuration, startTime,eid,cid) VALUES(0,?,?,?,?,?,?)";
//     db.run(
//       sql,
//       [
//         timeSlot.state,
//         timeSlot.date,
//         timeSlot.slotDuration,
//         timeSlot.startTime,
//         timeSlot.eid,
//         timeSlot.cid,
//       ],
//       function (err) {
//         if (err) {
//           console.log(err);
//           reject(err);
//         } else {
//           console.log(this.lastID);
//           resolve(this.lastID);
//         }
//       }
//     );
//   });
// };
