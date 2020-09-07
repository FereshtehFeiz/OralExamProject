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
    if (eid) {
      this.eid = eid;
    }

    this.studentId = studentId;
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

module.exports = StudentExam;
