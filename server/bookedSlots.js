class bookedSlots {
  constructor(
    eid,
    studentId,
    date,
    state,
    mark,
    slotId,
    cid,
    examId,
    attendance,
    withdraw,
    name
  ) {
    if (eid) {
      this.eid = eid;
    }

    this.studentId = studentId;
    this.date = date;
    this.state = state;
    this.mark = mark;
    this.slotId = slotId;
    this.cid = cid;
    this.examId = examId;
    this.attendance = attendance || false;
    this.withdraw = withdraw || false;
    this.name = name;
  }
}

module.exports = bookedSlots;
