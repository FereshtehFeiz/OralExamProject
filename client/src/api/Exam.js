class Exam {
  constructor(eid, cid, slotDuration) {
    if (this.eid) {
      this.eid = eid;
    }
    this.cid = cid;
    this.slotDuration = slotDuration;
  }

  /**
   * Construct a Task from a plain object
   * @param {{}} json
   * @return {Exam} the newly created Task object
   */
  static from(json) {
    const t = Object.assign(new Exam(), json);
    return t;
  }
}

export default Exam;
