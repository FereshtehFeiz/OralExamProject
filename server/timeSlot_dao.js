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
    row.withdraw,
    row.cid
  );
};

/**
 * Get slots to take oral exam
 */
exports.getExamSlots = function (cid) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM student_exam INNER JOIN exams ON exams.eid = student_exam.examId INNER JOIN slots ON slots.eid = exams.eid " +
      "WHERE slots.state = 1 and exams.cid = ?";
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
 * Get results of oral exams booked or not booked to teacher
 */

exports.getResultView = function (cid) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM slots INNER JOIN student_exam ON student_exam.examId = slots.eid WHERE student_exam.cid = ?";
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

/**
 * Get Free slots to book
 */
exports.getFreeExamSlots = function (examId) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM slots INNER JOIN student_exam ON student_exam.examId = slots.eid WHERE eid = ? AND slots.state = 0";
    db.all(sql, [examId], (err, rows) => {
      if (err) reject(err);
      else if (rows.length === 0) resolve(undefined);
      else {
        let Exams = rows.map((row) => createExamSlots(row));
        resolve(Exams);
        console.log(Exams);
      }
    });
  });
};

/**
 * Update an existing booked slot with a given exam id. new slot contains the new values of the slot (e.g., to mark it as "available")
 */
exports.updateBookedSlot = function (studentId) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE slots SET state = 0 WHERE eid IN (SELECT examId FROM student_exam WHERE studentId = ?) and state = 1";
    db.run(sql, [studentId], (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else resolve(null);
    });
  });
};
