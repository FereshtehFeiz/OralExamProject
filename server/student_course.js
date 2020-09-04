class StudentCourse {
  constructor(cid, fullname, studentId) {
    if (cid) {
      this.cid = cid;
    }

    this.fullname = fullname;
    this.studentId = studentId;
  }
}

module.exports = StudentCourse;
