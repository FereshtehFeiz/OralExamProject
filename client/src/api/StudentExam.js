class StudentExam {
  constructor(eid, name, sid) {
    if (this.eid) {
      this.eid = eid;
    }
    this.name = name;
    this.sid = sid;
    this.eid = eid;
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
