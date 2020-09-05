"use strict";

const Course = require("./course");
const Exam = require("./exam");
const Student = require("./student");

const db = require("./db");

/**
 * Insert an exam and students for that exam
 */
exports.createExam = function (exam) {
  return new Promise((resolve, reject) => {
    // let studentId = { ...studentId };
    const sql =
      "INSERT INTO student_exam(studentId,state,mark,cid,slotId)  VALUES(?,?,?,?,?); ";
    db.run(
      sql,
      [exam.studentId, exam.state, exam.mark, exam.cid, exam.slotId],
      function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(this.lastID);
          resolve(this.lastID);
        }
      }
    );
  });
};
