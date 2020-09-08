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
    if (this.eid) {
      this.eid = eid;
    }
    this.studentId = studentId;
    this.date = date;
    this.state = state;
    this.mark = mark;
    this.slotId = slotId;
    this.cid = cid;
    this.examId = examId;
    this.attendance = attendance;
    this.withdraw = withdraw;
    this.name = name;
  }

  /**
   * Construct a Task from a plain object
   * @param {{}} json
   * @return {bookedSlots} the newly created Task object
   */
  static from(json) {
    const t = Object.assign(new bookedSlots(), json);
    return t;
  }
}

export default bookedSlots;
