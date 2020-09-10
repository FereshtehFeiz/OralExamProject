"use strict";

const OralTimeSlot = require("./oralTimeSlot");
const db = require("./db");
const moment = require("moment");

const createExamSlots = function (row) {
  return new OralTimeSlot(
    row.slotId,
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
 * Get slots to take oral exam, Booked slots
 */
exports.getExamSlots = function (cid) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM student_exam INNER JOIN exams ON exams.eid = student_exam.examId " +
      "INNER JOIN slots ON slots.eid = exams.eid WHERE exams.cid = ? AND student_exam.slotId is NOT NULL";
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
      "SELECT * FROM slots INNER JOIN student_exam ON student_exam.examId = slots.eid " +
      "INNER JOIN exams ON exams.eid = slots.eid  WHERE exams.cid = ? ;";
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
      "SELECT distinct date,slots.slotId FROM slots INNER JOIN student_exam ON student_exam.examId = slots.eid WHERE eid = ? AND slots.state = 0";
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
 * Cancel the Booked slot for the Given Exam Id, Update Slot ID to Null to become free
 */
exports.updateBookedSlot = function (studentId, examId) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE student_exam SET slotId = NULL WHERE studentId = ? AND examId = ? ;";
    db.run(sql, [studentId, examId], (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else resolve(true);
    });
  });
};

/**
 * Book exam slot, put slot Id in the student exam
 */
exports.updateExamStudent = function (data) {
  const slotid = data.slotid;
  const examid = data.examid;
  const studentId = data.studentId;
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE student_exam SET slotId = ? WHERE studentId = ? AND examId = ? ;";
    db.run(sql, [slotid, studentId, examid], (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else resolve(true);
    });
  });
};

/**
 * Set slot state = 1
 */
exports.updateSlotState = function (slotId) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE slots SET state = 1 WHERE slotId= ?";
    db.run(sql, [slotId], (err) => {
      if (err) {
        console.log(err);
        reject(0);
      } else resolve(slotId);
    });
  });
};
