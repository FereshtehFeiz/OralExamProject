"use strict";

const Session = require("./session");
const db = require("./db");
const moment = require("moment");

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
  if (session.date) {
    session.date = moment(session.date).format("YYYY-MM-DD HH:mm");
  }
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO sessions(sessionId, date, startTime, sessionDuration, slotDuration, slotNumber, eid) VALUES(?,?,?,?,?,?,?)";
    db.run(
      sql,
      [
        session.sessionId,
        session.date,
        session.startTime,
        session.sessionDuration,
        session.slotDuration,
        session.slotNumber,
        session.eid,
      ],
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
