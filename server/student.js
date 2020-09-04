class Student {
  constructor(sid, fullname, studentId) {
    if (sid) this.sid = sid;
    this.fullname = fullname;
    this.studentId = studentId;
  }
}

module.exports = Student;
