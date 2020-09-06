class oralTimeSlot {
  constructor(
    slotId,
    startTime,
    date,
    studentId,
    state,
    mark,
    attendance,
    cid
  ) {
    if (slotId) this.slotId = slotId;
    this.startTime = startTime;
    this.date = date;
    this.studentId = studentId;
    this.state = state;
    this.mark = mark;
    this.attendance = attendance;
    this.cid = cid;
  }
}

module.exports = oralTimeSlot;
