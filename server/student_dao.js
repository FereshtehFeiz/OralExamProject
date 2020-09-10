"use strict";

const Student = require("./student");
const Exam = require("./exam");
const StudentExam = require("./student_exam");
const BookedSlots = require("./bookedSlots");

const db = require("./db");

const createStudent = function (row) {
  return new Student(row.sid, row.fullname, row.studentId);
};

const createStudentExams = function (row) {
  return new StudentExam(
    row.eid,
    row.studentId,
    row.state,
    row.mark,
    row.slotId,
    row.cid,
    row.examId,
    row.attendance,
    row.withdraw,
    row.name
  );
};

const createBookedSlots = function (row) {
  return new BookedSlots(
    row.eid,
    row.studentId,
    row.date,
    row.state,
    row.mark,
    row.slotId,
    row.cid,
    row.examId,
    row.attendance,
    row.withdraw,
    row.name
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

exports.getStudentExams = function (sid) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT DISTINCT name,examId FROM exams INNER JOIN student_exam ON student_exam.examId = exams.eid " +
      "INNER JOIN courses ON courses.cid = exams.cid " +
      "WHERE mark < 18 OR withdraw = 1 AND studentId = ?;";
    db.all(sql, [sid], (err, rows) => {
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
 * Get booked slots for student
 */
exports.getBookedSlots = function (sid) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT studentId , examId , mark,attendance,withdraw , cid, student_exam.slotId , slots.date " +
      "FROM student_exam INNER JOIN slots on slots.eid = student_exam.examId where studentId = ? AND student_exam.slotId is not NULL GROUP BY examId;";
    db.all(sql, [sid], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        let bookedSlots = rows.map((row) => createBookedSlots(row));
        resolve(bookedSlots);
        console.log(bookedSlots);
      }
    });
  });
};

/**
 * Update Mark and attendance
 */
exports.updateExam = function (studentId, NewStudentExam) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE student_exam SET mark = ?, attendance = ? WHERE studentId = ?";
    db.run(
      sql,
      [NewStudentExam.mark, NewStudentExam.attendance, studentId],
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else resolve(true);
      }
    );
  });
};
