class Exam {
  constructor(eid, cid, slotDuration) {
    if (eid) this.eid = eid;
    this.cid = cid;
    this.slotDuration = slotDuration;
  }
}

module.exports = Exam;
