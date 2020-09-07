class OralTimeSlot {
  constructor(
    slotId,
    startTime,
    date,
    state,
    studentId,
    mark,
    attendance,
    withdraw,
    cid
  ) {
    if (slotId) {
      this.slotId = slotId;
    }

    this.startTime = startTime;
    this.date = date;
    this.state = state;
    this.studentId = studentId;
    this.mark = mark;
    this.attendance = attendance || false;
    this.withdraw = withdraw || false;
    this.cid = cid;
  }

  /**
   * Construct a Task from a plain object
   * @param {{}} json
   * @return {OralTimeSlot} the newly created Task object
   */
  static from(json) {
    const t = Object.assign(new OralTimeSlot(), json);
    return t;
  }
}

export default OralTimeSlot;
