"use strict";

const TimeSlot = require("./timeSlot");
const db = require("./db");
const moment = require("moment");

const createTimeSlot = function (row) {
  return new TimeSlot(
    row.state,
    row.date,
    row.slotDuration,
    row.startTime,
    row.eid,
    row.cid
  );
};

exports.createExamTimeSlot = function (timeSlot) {
  if (timeSlot.date) {
    timeSlot.date = moment(timeSlot.date).format("YYYY-MM-DD HH:mm");
  }
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO slots(state, date, slotDuration, startTime,eid,cid) VALUES(0,?,?,?,?,?,?)";
    db.run(
      sql,
      [
        timeSlot.state,
        timeSlot.date,
        timeSlot.slotDuration,
        timeSlot.startTime,
        timeSlot.eid,
        timeSlot.cid,
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
