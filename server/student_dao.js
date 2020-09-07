"use strict";

const Student = require("./student");
const Exam = require("./exam");
const StudentExam = require("./student_exam");
const db = require("./db");

const createStudent = function (row) {
  return new Student(row.sid, row.fullname, row.studentId);
};

const createStudentExams = function (row) {
  return new Exam(row.eid, row.name);
};

const createStudentExam = function (row) {
  return new StudentExam(
    row.eid,
    row.studentId,
    row.state,
    row.mark,
    row.slotId,
    row.cid,
    row.examId,
    row.attendance,
    row.withdraw
  );
};

/**
 * Get student of given student ID
 */

exports.getStudentID = function (sid) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM students WHERE studentId = ?";
    db.all(sql, [sid], (err, rows) => {
      if (err) reject(err);
      else if (rows.length === 0) resolve(undefined);
      else {
        const student = createStudent(rows[0]);
        resolve(student);
        console.log(student);
      }
    });
  });
};

/**
 * Get exams of given Student ID
 */

exports.getStudentExams = function () {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM student_exam INNER JOIN courses on courses.cid = student_exam.cid";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else if (rows.length === 0) resolve(undefined);
      else {
        let Exams = rows.map((row) => createStudentExams(row));
        resolve(Exams);
        console.log(Exams);
      }
    });
  });
};

/**
 * Get booked slots
 */
exports.getBookedSlots = function (studentId) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT name,mark,slots.startTime,slots.date,slots.state" +
      "FROM slots" +
      "INNER JOIN student_exam on student_exam.eid = slots.eid INNER JOIN courses on courses.cid = student_exam.cid" +
      "where slots.state = 0 or slots.state = 1 and studentId = ?;";
    db.all(sql, [studentId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        let bookingSlots = rows.map((row) => createBookingSlots(row));
        resolve(bookingSlots);
      }
    });
  });
};

/**
 * Update Mark and attendance
 */
exports.updateExam = function (slotId, NewStudentExam) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE student_exam SET mark = ?, attendance = ?, withdraw = ? WHERE slotId = ?";
    db.run(
      sql,
      [
        NewStudentExam.mark,
        NewStudentExam.attendance,
        NewStudentExam.withdraw,
        slotId,
      ],
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else resolve(slotId);
      }
    );
  });
};
