class StudentExam {
  constructor(eid, name) {
    if (this.eid) {
      this.eid = eid;
    }
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
