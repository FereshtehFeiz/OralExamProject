class StudentExam {
  constructor(eid, studentId, state, mark, slotId, cid, examId, attendance) {
    if (eid) {
      this.eid = eid;
    }

    this.studentId = studentId;
    this.state = state;
    this.mark = mark;
    this.slotId = slotId;
    this.cid = cid;
    this.examId = examId;
    this.attendance = attendance;
  }
}

module.exports = StudentExam;
