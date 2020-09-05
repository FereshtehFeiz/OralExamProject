class OralTimeSlot {
  constructor(
    slotId,
    startTime,
    date,
    state,
    studentId,
    mark,
    attendance,
    cid
  ) {
    if (slotId) this.slotId = slotId;
    this.startTime = startTime;
    this.date = date;
    this.state = state;
    this.studentId = studentId;
    this.mark = mark;
    this.attendance = attendance;
    this.cid = cid;
  }
}

module.exports = OralTimeSlot;
