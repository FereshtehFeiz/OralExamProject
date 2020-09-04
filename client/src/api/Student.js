class Student {
  constructor(sid, fullname, studentId) {
    if (sid) {
      this.sid = sid;
    }

    this.fullname = fullname;
    this.studentId = studentId;
  }

  /**
   * Construct a Task from a plain object
   * @param {{}} json
   * @return {Student} the newly created Task object
   */
  static from(json) {
    const t = Object.assign(new Student(), json);
    return t;
  }
}

export default Student;
