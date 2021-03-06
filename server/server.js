"use strict";

//import express
const express = require("express");
const taskDao = require("./task_dao");
const userDao = require("./user_dao");
const studentDao = require("./student_dao");
const studentcourseDao = require("./student_course_dao ");
const examDao = require("./exam_dao");
const sessionDao = require("./session_dao");
const timeslotDao = require("./timeslot_dao");
const morgan = require("morgan"); // logging middleware
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const jwtSecret =
  "6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX";
const expireTime = 300; //seconds
// Authorization error
const authErrorObj = {
  errors: [{ param: "Server", msg: "Authorization error" }],
};

//create application
const app = express();
const port = 3001;

// Set-up logging
app.use(morgan("tiny"));

// Process body content
app.use(express.json());

// Authentication endpoint
app.post("/api/studentlogin", (req, res) => {
  const sid = req.body.sid;
  studentDao
    .getStudentID(sid)
    .then((student) => {
      if (student === undefined) {
        res.status(404).send({
          errors: [{ param: "Server", msg: "Invalid student ID" }],
        });
      } else {
        // if (!userDao.checkPassword(user, password)) {
        //   res.status(401).send({
        //     errors: [{ param: "Server", msg: "Wrong password" }],
        //   });
        // }
        // else {
        //AUTHENTICATION SUCCESS
        // const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, {
        //   expiresIn: expireTime,
        // });
        // res.cookie("token", token, {
        //   httpOnly: true,
        //   sameSite: true,
        //   maxAge: 1000 * expireTime,
        // });
        res.json({
          sid: student.sid,
          fullname: student.fullname,
          studentId: student.studentId,
        });
        // }
      }
    })
    .catch(
      // Delay response when wrong user/pass is sent to avoid fast guessing attempts
      (err) => {
        new Promise((resolve) => {
          setTimeout(resolve, 1000);
        }).then(() => res.status(401).json(authErrorObj));
      }
    );
});

//GET /slots/<examId>
app.get("/api/slots/:examId", (req, res) => {
  timeslotDao
    .getFreeExamSlots(req.params.examId)
    .then((slots) => {
      if (!slots) {
        res.status(404).send();
      } else {
        res.json(slots);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ param: "Server", msg: err }],
      });
    });
});

//PUT /Booked Slots/<examId>
app.put("/api/bookedSlots/:examId", (req, res) => {
  timeslotDao
    .updateBookedSlot(req.body.studentId, req.params.examId)
    .then((result) => res.status(200).end())
    .catch((err) =>
      res.status(500).json({
        errors: [{ param: "Server", msg: err }],
      })
    );
});

//GET /bookedSlots/<studentId>
app.get("/api/bookedSlots/:studentId", (req, res) => {
  studentDao
    .getBookedSlots(req.params.studentId)
    .then((slots) => {
      console.log(slots);
      if (!slots) {
        res.status(404).send();
      } else {
        res.json(slots);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errors: [{ param: "Server", msg: err }],
      });
    });
});

//get exams of student
app.get("/api/StudentExams/:studentId", (req, res) => {
  studentDao
    .getStudentExams(req.params.studentId)
    .then((exams) => {
      res.json(exams);
      console.log(exams);
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ msg: err }],
      });
    });
});

//GET /exams/<examId>
app.get("/api/exams/:examId", (req, res) => {
  studentexamDao
    .getExamSlots(req.params.examId)
    .then((exam) => {
      if (!exam) {
        res.status(404).send();
      } else {
        res.json(exam);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ param: "Server", msg: err }],
      });
    });
});

app.put("/api/slots/:slotId", (req, res) => {
  timeslotDao
    .updateSlotState(req.params.slotId)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) =>
      res.status(500).json({
        errors: [{ param: "Server", msg: err }],
      })
    );
});

app.put("/api/exam_student/:slotId", (req, res) => {
  timeslotDao
    .updateExamStudent(req.body)
    .then((result) => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch((err) =>
      res.status(500).json({
        errors: [{ param: "Server", msg: err }],
      })
    );
});

// Authentication endpoint
app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  userDao
    .getUser(username)
    .then((user) => {
      if (user === undefined) {
        res.status(404).send({
          errors: [{ param: "Server", msg: "Invalid e-mail" }],
        });
      } else {
        if (!userDao.checkPassword(user, password)) {
          res.status(401).send({
            errors: [{ param: "Server", msg: "Wrong password" }],
          });
        } else {
          //AUTHENTICATION SUCCESS
          const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, {
            expiresIn: expireTime,
          });
          res.cookie("token", token, {
            httpOnly: true,
            sameSite: true,
            maxAge: 1000 * expireTime,
          });
          res.json({ id: user.id, name: user.name, courseId: user.cid });
        }
      }
    })
    .catch(
      // Delay response when wrong user/pass is sent to avoid fast guessing attempts
      (err) => {
        new Promise((resolve) => {
          setTimeout(resolve, 1000);
        }).then(() => res.status(401).json(authErrorObj));
      }
    );
});

app.use(cookieParser());

app.post("/api/logout", (req, res) => {
  res.clearCookie("token").end();
});

// For the rest of the code, all APIs require authentication
app.use(
  jwt({
    secret: jwtSecret,
    getToken: (req) => req.cookies.token,
  })
);

// To return a better object in case of errors
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json(authErrorObj);
  }
});

// AUTHENTICATED REST API endpoints

//GET /user
app.get("/api/user", (req, res) => {
  const user = req.user && req.user.user;
  userDao
    .getUserById(user)
    .then((user) => {
      res.json({ id: user.id, name: user.name, courseId: user.cid });
    })
    .catch((err) => {
      res.status(401).json(authErrorObj);
    });
});

//get students of the course to take exam
app.get("/api/studentsofcourse", (req, res) => {
  const user = req.user && req.user.user;
  studentcourseDao
    .getStudentsOfCourse(user)
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ msg: err }],
      });
    });
});

//POST /sessions
app.post("/api/addSession", (req, res) => {
  const session = req.body;
  if (!session) {
    res.status(400).end();
  } else {
    sessionDao
      .createSession(session)
      .then((response) => {
        if (response)
          sessionDao.addStudents(session).then((response) => {
            console.log(response);
            res.status(201).json(response);
          });
        else res.status(500).json(false);
      })
      .catch((err) => {
        res.status(500).json({ errors: [{ param: "Server", msg: err }] });
      });
  }
});

//POST /exam
app.post("/api/createExam", (req, res) => {
  const exam = req.body;
  if (!exam) {
    res.status(400).end();
  } else {
    const user = req.user && req.user.courseId;
    console.log(exam);
    examDao
      .createExam(exam)
      .then((id) => {
        console.log(`examId is :${id}`);
        res.status(201).json({ id: id });
      })
      .catch((err) => {
        res.status(500).json({ errors: [{ param: "Server", msg: err }] });
      });
  }
});

//GET /oral time slots for taking exam by teacher for given course Id
app.get("/api/examSlots/:courseId", (req, res) => {
  // console.log(req.params.courseId);
  timeslotDao
    .getExamSlots(req.params.courseId)
    .then((timeslots) => {
      res.json(timeslots);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errors: [{ msg: err }],
      });
    });
});

//GET /shows exam result view for teacher for given course Id
app.get("/api/resultView/:courseId", (req, res) => {
  console.log(req.params.courseId);
  timeslotDao
    .getResultView(req.params.courseId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errors: [{ msg: err }],
      });
    });
});

//PUT /oralExamItem/<studentId>  update mark and attendance for given slotId
app.put("/api/oralExamItem/:studentId", (req, res) => {
  const exam = req.body;
  console.log(exam);
  console.log(req.params.studentId);
  studentDao
    .updateExam(req.params.studentId, exam)
    .then(() => res.status(200).end())
    .catch((err) =>
      res.status(500).json({
        errors: [{ param: "Server", msg: err }],
      })
    );
  // console.log(result);
});

//activate server
app.listen(port, () => console.log("Server ready"));
