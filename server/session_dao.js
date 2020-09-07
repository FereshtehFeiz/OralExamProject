"use strict";

const Session = require("./session");
const db = require("./db");
const Moment = require("moment");

const createSession = function (row) {
  return new Session(
    row.sessionId,
    row.date,
    row.startTime,
    row.sessionDuration,
    row.slotDuration,
    row.slotNumber,
    row.eid
  );
};

/**
 * Insert a task in the database and returns the id of the inserted task.
 * To get the id, this.lastID is used. To use the "this", db.run uses "function (err)" instead of an arrow function.
 */
exports.createSession = function (session) {
  const timeSlot = session.timeSlot;
  const examId = session.examId;
  const data = session.data;
  // const students = session.students;
  // console.log(students);

  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO slots(state,date,eid) VALUES(?,?,?)";

    data.forEach((row) => {
      let count = row.duration / timeSlot - 1;
      for (let i = 0; i <= count; i++) {
        let newDate = Moment(row.fulldate)
          .add(timeSlot, "minutes")
          .format("YYYY-MM-DD HH:mm");

        db.run(sql, [0, row.fulldate, examId], function (err) {
          if (err) {
            console.log(err);
            reject(false);
          } else {
            resolve(true);
          }
        });

        row.fulldate = newDate;
      }
    });
  });
};

exports.addStudents = function (session) {
  const examId = session.examId;
  const students = session.students;

  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO student_exam(studentId,examId, state, mark, slotId, cid,attendance) VALUES(?,?,?,?,?,?,?)";
    students.forEach((id) => {
      db.run(sql, [id, examId, 0, 0, 0, 0, 0], function (err) {
        if (err) {
          console.log(err);
          reject(false);
        } else {
          resolve(students);
        }
      });
    });
  });
};
