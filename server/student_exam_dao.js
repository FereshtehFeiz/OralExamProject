"use strict";

const Course = require("./course");
const Exam = require("./exam");
const Student = require("./student");

const db = require("./db");

const createStudentExam = function (row) {
  return new StudentExam(
    row.eid,
    row.studentId,
    row.state,
    row.mark,
    row.cid,
    row.slotId
  );
};

/**
 * Get exams of given Student ID
 */

exports.getStudentExams = function (sid) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM student_exam INNER JOIN courses on courses.cid = student_exam.cid";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else if (rows.length === 0) resolve(undefined);
      else {
        let StudentExams = rows.map((row) => createStudentExam(row));
        resolve(StudentExams);
        console.log(StudentExams);
      }
    });
  });
};

/**
 * Insert an exam and students for that exam
 */
exports.createExam = function (studentId) {
  return new Promise((resolve, reject) => {
    // let studentId = { ...studentId };
    const sql = "INSERT INTO student_exam(studentId) VALUES(?)";
    db.run(sql, [studentId], function (err) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(this.lastID);
        resolve(this.lastID);
      }
    });
  });
};
