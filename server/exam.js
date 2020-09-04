class Exam {
  constructor(eid, studentId, state, mark, cid, slotid) {
    if (eid) this.eid = eid;
    this.studentId = studentId;
    this.state = state;
    this.mark = mark;
    this.cid = cid;
    this.slotid = slotid;
  }
}

module.exports = Exam;
