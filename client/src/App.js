import React from "react";
import "./App.css";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import LoginForm from "./components/LoginForm";
import StudentLogin from "./components/StudentLogin";
import SelectRole from "./components/SelectRole";
import CreateExam from "./components/CreateExam";
import StudentExams from "./components/StudentExams";
import DefineSession from "./components/DefineSession";
import BookedSlots from "./components/BookedSlots";
import OralExamList from "./components/OralExamList";
import ExamResult from "./components/ExamResult";
import API from "./api/API";
import { Redirect, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { AuthContext } from "./auth/AuthContext";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OralExams: [],
      exams: [],
      slots: [],
      studentsOfCourse: [],
      openMobileMenu: false,
      selectedStudents: [],
      addSession: null,
      studentsNumber: 0,
      checkedCount: 0,
      timeSlot: 0,
      sessionNumber: 1,
      session: null,
      examId: 0,
    };
    this.setNumberofStudents = this.setNumberofStudents.bind(this);
    this.setTimeSlot = this.setTimeSlot.bind(this);
    this.setTotalTimeSlot = this.setTotalTimeSlot.bind(this);
    this.handleAddSession = this.handleAddSession.bind(this);
  }

  componentDidMount() {
    //check if the user is authenticated
    API.isAuthenticated()
      .then((user) => {
        this.setState({ authUser: user, courseId: user.courseId });
      })
      .catch((err) => {
        this.setState({ authErr: err.errorObj });
        this.props.history.push("/login");
      });

    //check if the student is logined
    API.isStudent()
      .then((student) => {
        this.setState({ authStudent: student });
      })
      .catch((errsid) => {
        this.setState({ invalidSid: errsid.errorObj });
        this.props.history.push("/studentLogin");
      });
  }

  handleErrors(err) {
    if (err) {
      if (err.status && err.status === 401) {
        this.setState({ authErr: err.errorObj });
        this.props.history.push("/login");
      }
    }
  }

  handleErrorsSid(errsid) {
    if (errsid) {
      if (errsid.status && errsid.status === 401) {
        this.setState({ invalidSid: errsid.errorObj });
        this.props.history.push("/studentLogin");
      }
    }
  }

  // Add a logout method
  logout = () => {
    API.userLogout().then(() => {
      this.setState({
        authUser: null,
        authErr: null,
        // tasks: null,
        studentsOfCourse: [],
        authStudent: null,
        invalidSid: null,
      });
      // API.getTasks().catch((errorObj) => {
      //   this.handleErrors(errorObj);
      // });
    });
  };

  // Add a login method
  login = (username, password) => {
    API.userLogin(username, password)
      .then((user) => {
        API.getStudentsOfCourse().then((studentsOfCourse) => {
          this.setState({
            exams: null,
            studentsOfCourse: studentsOfCourse,
            courseId: user.courseId,
            authUser: user,
            authErr: null,
            authStudent: null,
            invalidSid: null,
          });
        });
        this.props.history.push("/createExam");
      })
      .catch((errorObj) => {
        const err0 = errorObj.errors[0];
        this.setState({ authErr: err0 });
      });
  };

  // Add a logout method
  studentlogout = () => {
    API.studentLogout().then(() => {
      this.setState({
        authStudent: null,
        invalidSid: null,
        authUser: null,
        authErr: null,
      });
      // API.getTasks().catch((errorObj) => {
      //   this.handleErrorsSid(errorObj);
      // });
    });
  };

  // Add a login method
  studentlogin = (sid) => {
    API.studentLogin(sid)
      .then((student) => {
        // API.getBookedSlots()
        //   .then((bookedSlots) => {
        this.setState({
          authStudent: student,
          // bookedSlots: bookedSlots,
          authUser: null,
          authErr: null,
          invalidSid: null,
        });
        // })
        // .catch((errorObj) => {
        //   this.handleErrors(errorObj);
        // });

        this.props.history.push("/exams");
      })
      .catch((errorObj) => {
        const err0 = errorObj.errors[0];
        this.setState({ invalidSid: err0 });
      });
  };

  // getStudentExams = () => {
  //   API.getStudentExams()
  //     .then((exams) => this.setState({ exams: exams }))
  //     .catch((errorObj) => {
  //       this.handleErrors(errorObj);
  //     });
  // };

  // getBookedSlots = () => {
  //   API.getBookedSlots()
  //     .then((bookedSlots) => this.setState({ bookedSlots: bookedSlots }))
  //     .catch((errorObj) => {
  //       this.handleErrors(errorObj);
  //     });
  // };

  // getProjects(tasks) {
  //   return [
  //     ...new Set(
  //       tasks.map((task) => {
  //         if (task.project) return task.project;
  //         else return null;
  //       })
  //     ),
  //   ];
  // }

  showSidebar = () => {
    this.setState((state) => ({ openMobileMenu: !state.openMobileMenu }));
  };

  // getPublicTasks = () => {
  //   API.getPublicTasks()
  //     .then((tasks) => this.setState({ tasks: tasks }))
  //     .catch((errorObj) => {
  //       this.handleErrors(errorObj);
  //     });
  // };

  // filterTasks = (filter) => {
  //   if (filter === "all") {
  //     API.getTasks()
  //       .then((tasks) =>
  //         this.setState({
  //           tasks: tasks,
  //           filter: "all",
  //           projects: this.getProjects(tasks),
  //         })
  //       )
  //       .catch((errorObj) => {
  //         this.handleErrors(errorObj);
  //       });
  //   } else {
  //     API.getTasks(filter)
  //       .then((tasks) => {
  //         this.setState({
  //           tasks: tasks,
  //           filter: filter,
  //           projects: this.getProjects(tasks),
  //         });
  //       })
  //       .catch((errorObj) => {
  //         this.handleErrors(errorObj);
  //       });
  //   }
  // };

  // addOrEditTask = (task) => {
  //   if (!task.id) {
  //     //ADD
  //     API.addTask(task)
  //       .then(() => {
  //         //get the updated list of tasks from the server
  //         API.getTasks().then((tasks) =>
  //           this.setState({
  //             tasks: tasks,
  //             filter: "All",
  //             projects: this.getProjects(tasks),
  //           })
  //         );
  //       })
  //       .catch((errorObj) => {
  //         this.handleErrors(errorObj);
  //       });
  //   } else {
  //     //UPDATE
  //     API.updateTask(task)
  //       .then(() => {
  //         //get the updated list of tasks from the server
  //         API.getTasks().then((tasks) =>
  //           this.setState({
  //             tasks: tasks,
  //             filter: "All",
  //             projects: this.getProjects(tasks),
  //           })
  //         );
  //       })
  //       .catch((errorObj) => {
  //         this.handleErrors(errorObj);
  //       });
  //   }
  // };

  addSession = (session) => {
    //ADD Session
    API.addSession(session)
      .then(() => {
        this.setState({
          session: session,
        });
      })
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  createExam = (exam) => {
    //ADD Exam and then get Exam ID
    API.createExam(exam)
      .then((res) => {
        this.setState({ examId: res.id });
      })
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  // editTask = (task) => {
  //   this.setState({ editedTask: task });
  // };

  // deleteTask = (task) => {
  //   API.deleteTask(task.id)
  //     .then(() => {
  //       //get the updated list of tasks from the server
  //       API.getTasks().then((tasks) =>
  //         this.setState({
  //           tasks: tasks,
  //           filter: "All",
  //           projects: this.getProjects(tasks),
  //         })
  //       );
  //     })
  //     .catch((errorObj) => {
  //       this.handleErrors(errorObj);
  //     });
  // };

  // getExamSlots = (exam) => {
  //   API.getExamSlots(exam.id)
  //     .then((slots) => {
  //       this.setState({
  //         slots: slots,
  //       });
  //     })
  //     .catch((errorObj) => {
  //       this.handleErrors(errorObj);
  //     });
  // };

  checkStudentId = (student) => {
    API.isStudent(student.id)
      .then((studentId) => this.setState({ studentId: studentId }))
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  getOralExamTimeSlots = () => {
    API.getOralExamTimeSlots(this.state.courseId)
      .then((OralExams) => this.setState({ OralExams: OralExams }))
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  getResultView = () => {
    API.getResultView(this.state.courseId)
      .then((OralExamResult) =>
        this.setState({ OralExamResult: OralExamResult })
      )
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  updateExam = (examResult) => {
    API.updateExam(examResult)
      .then(() => {})

      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  setNumberofStudents(checkedCount) {
    this.setState({ studentsNumber: checkedCount });
  }

  setTimeSlot(timeSlot) {
    this.setState({ timeSlot: timeSlot });
  }

  setTotalTimeSlot(timeSlot, checkedCount) {
    this.setState({ totalTimeSlot: timeSlot * checkedCount });
  }

  handleAddSession(sessionNumber) {
    this.setState({ sessionNumber: sessionNumber + 1 });
  }

  render() {
    // compose value prop as object with user object and logout method
    const value = {
      authUser: this.state.authUser,
      authErr: this.state.authErr,
      courseId: this.state.courseId,
      loginUser: this.login,
      logoutUser: this.logout,
      authStudent: this.state.authStudent,
      invalidSid: this.state.invalidSid,
      loginStudent: this.studentlogin,
      logoutStudent: this.studentlogout,
    };
    return (
      <AuthContext.Provider value={value}>
        <Header
          showSidebar={this.showSidebar}
          // getPublicTasks={this.getPublicTasks}
          getStudentExams={this.getStudentExams}
          getOralExamTimeSlots={this.getOralExamTimeSlots}
          getResultView={this.getResultView}
        />

        <Container fluid>
          <Switch>
            <Route path="/role">
              <Row className="vheight-100">
                <Col sm={4}></Col>
                <Col sm={4} className="below-nav">
                  <SelectRole role={this.state.role} />
                </Col>
              </Row>
            </Route>

            <Route path="/login">
              <Row className="vheight-100">
                <Col sm={4}></Col>
                <Col sm={4} className="below-nav">
                  <LoginForm />
                </Col>
              </Row>
            </Route>

            {/* <Route>
              <Redirect to="/students" />
            </Route> */}

            <Route path="/createExam">
              <Row className="vheight-100">
                <Col sm={4}></Col>
                <Col sm={4} className="below-nav">
                  <h4>Students of course</h4>
                  <CreateExam
                    studentsOfCourse={this.state.studentsOfCourse}
                    checkedCount={this.state.checkedCount}
                    setNumberofStudents={this.setNumberofStudents}
                    setTimeSlot={this.setTimeSlot}
                    setTotalTimeSlot={this.setTotalTimeSlot}
                    exam={this.state.exam}
                    createExam={this.createExam}
                    courseId={this.state.courseId}
                  />
                </Col>
              </Row>
            </Route>
            <Route path="/addSession">
              <Row className="vheight-100">
                <Col sm={4}></Col>
                <Col sm={4} className="below-nav">
                  <DefineSession
                    timeSlot={this.state.timeSlot}
                    studentsNumber={this.state.studentsNumber}
                    totalTimeSlot={this.state.totalTimeSlot}
                    sessionNumber={this.state.sessionNumber}
                    session={this.state.session}
                    addSession={this.addSession}
                    examId={this.state.examId}
                  />
                </Col>
              </Row>
              {/* <Link to="/addSession">
                <Button
                  variant="success"
                  size="lg"
                  className="fixed-right-bottom"
                  onClick={this.handleAddSession}
                >&#43; Add Session
                </Button>
              </Link> */}
            </Route>
            <Route path="/studentLogin">
              <Row className="vheight-100">
                <Col sm={4}></Col>
                <Col sm={4} className="below-nav">
                  <StudentLogin />
                </Col>
              </Row>
            </Route>

            <Route path="/exams">
              <Row className="vheight-100">
                <Col sm={4}></Col>
                <Col sm={4} className="below-nav">
                  <StudentExams
                    exams={this.state.exams}
                    getExamSlots={this.getExamSlots}
                    getStudentExams={this.getStudentExams}
                  />
                </Col>
              </Row>
            </Route>

            <Route path="/examSlots">
              <Row className="vheight-100">
                <Col className="below-nav">
                  <h4>List of slots for taking oral exam</h4>
                  <OralExamList
                    OralExams={this.state.OralExams}
                    updateExam={this.updateExam}
                  />
                </Col>
              </Row>
            </Route>

            <Route path="/resultView">
              <Row className="vheight-100">
                <Col className="below-nav">
                  <h4>Result Overview</h4>
                  <ExamResult OralExamResult={this.state.OralExamResult} />
                </Col>
              </Row>
            </Route>

            <Route path="/bookings">
              <Row className="vheight-100">
                <Col sm={4}></Col>
                <Col sm={4} className="below-nav">
                  <h4>My Booked Slots</h4>
                  <BookedSlots bookedSlots={this.state.bookedSlots} />
                </Col>
              </Row>
            </Route>
          </Switch>
        </Container>
      </AuthContext.Provider>
    );
  }
}

export default withRouter(App);
