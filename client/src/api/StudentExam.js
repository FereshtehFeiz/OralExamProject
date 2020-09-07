class StudentExam {
  constructor(
    eid,
    studentId,
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
   * @return {StudentExam} the newly created Task object
   */
  static from(json) {
    const t = Object.assign(new StudentExam(), json);
    return t;
  }
}

export default StudentExam;
