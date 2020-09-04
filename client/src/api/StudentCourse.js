class StudentCourse {
  constructor(fullname, studentId, cid) {
    if (cid) {
      this.cid = cid;
    }

    this.fullname = fullname;
    this.studentId = studentId;
  }

  /**
   * Construct a Task from a plain object
   * @param {{}} json
   * @return {StudentCourse} the newly created Task object
   */
  static from(json) {
    const t = Object.assign(new StudentCourse(), json);
    return t;
  }
}

export default StudentCourse;
