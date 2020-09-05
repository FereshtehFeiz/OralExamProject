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
        res.json({ sid: student.sid, name: student.name });
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

//get exams of student
app.get("/api/exams", (req, res) => {
  // const sid = req.user && req.user.user;
  studentexamDao
    .getStudentExams()
    .then((exams) => {
      res.json(exams);
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
    const user = req.user && req.user.user;
    session.user = user;
    sessionDao
      .createSession(session)
      .then((id) => res.status(201).json({ id: id }))
      .catch((err) => {
        res.status(500).json({ errors: [{ param: "Server", msg: err }] });
      });
  }
});

//GET /bookedSlots
app.get("/api/bookedSlots", (req, res) => {
  const user = req.user && req.user.user;
  taskDao
    .getTasks(user, req.query.filter)
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ msg: err }],
      });
    });
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
      .then((id) => res.status(201).json({ id: id }))
      .catch((err) => {
        res.status(500).json({ errors: [{ param: "Server", msg: err }] });
      });
  }
});

//GET /oral time slots for taking exam by teacher for given course Id
app.get("/api/examSlots/:courseId", (req, res) => {
  console.log(req.param.courseId);
  timeslotDao
    .getExamSlots(req.params.courseId)
    .then((timeslots) => {
      res.json(timeslots);
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ msg: err }],
      });
    });
});

//activate server
app.listen(port, () => console.log("Server ready"));
