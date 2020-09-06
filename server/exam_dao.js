"use strict";

const Exam = require("./exam");
const db = require("./db");

const createExam = function (row) {
  return new Exam(row.eid, row.cid, row.slotDuration);
};

/**
 * Insert an exam
 */
exports.createExam = function (exam) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO exams(eid,cid,slotDuration) VALUES(?,?,?);";
    db.run(sql, [exam.eid, exam.cid, exam.slotDuration], function (err) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        //console.log(this.lastID);
        resolve(this.lastID);
      }
    });
  });
};
