"use strict";

const Student = require("./student");
const db = require("./db");

const createStudent = function (row) {
  return new Student(row.sid, row.fullname, row.studentId);
};

/**
 * Get student of given student ID
 */

exports.getStudentID = function (sid) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM students WHERE sid = ?";
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
