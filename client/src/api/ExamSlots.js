class Exam {
  constructor(eid, cid, state, mark, slotid) {
    if (eid) {
      this.eid = eid;
      this.cid = cid;
      this.state = state;
      this.mark = mark;
      this.slotid = slotid;
    }
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
