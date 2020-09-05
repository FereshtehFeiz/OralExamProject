"use strict";

const StudentCourse = require("./student_course");
const Student = require("./student");

const db = require("./db");

const createStudentCourse = function (row) {
  return new StudentCourse(row.cid, row.fullname, row.studentId);
};
/**
 * Get students of given Course ID
 */

exports.getStudentsOfCourse = function (tid) {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT fullname,studentId,cid FROM student_course INNER JOIN students ON students.sid = student_course.sid WHERE tid = ?;";
    db.all(sql, [tid], (err, rows) => {
      if (err) reject(err);
      else if (rows.length === 0) resolve(undefined);
      else {
        let StudentCourse = rows.map((row) => createStudentCourse(row));
        resolve(StudentCourse);
        console.log(StudentCourse);
      }
    });
  });
};
