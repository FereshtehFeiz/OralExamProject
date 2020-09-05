class oralTest {
  constructor(slotId, startTime, date, state, studentId, mark, attendance) {
    if (slotId) this.slotId = slotId;
    this.startTime = startTime;
    this.date = date;
    this.state = state;
    this.studentId = studentId;
    this.mark = mark;
    this.attendance = attendance;
  }
}

module.exports = oralTest;
