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
import StudentExamsList from "./components/StudentExamsList";
import DefineSession from "./components/DefineSession";
import BookedSlotsList from "./components/BookedSlotsList";
import OralExamList from "./components/OralExamList";
import ExamResult from "./components/ExamResult";
import FreeSlotsList from "./components/FreeSlotsList";
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
      slotsSaved: false,
    };
    this.setStudentsIDList = this.setStudentsIDList.bind(this);
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
        this.setState({ authStudent: student, studentId: student.studentId });
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
        console.log(student);
        // API.getStudentExams().then((studentExams) => {
        // API.getBookedSlots()
        //   .then((bookedSlots) => {
        this.setState({
          authStudent: student,
          // studentExams: studentExams,
          // bookedSlots: bookedSlots,
          authUser: null,
          authErr: null,
          invalidSid: null,
        });
        // });
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

  getStudentExams = () => {
    // console.log(studentId);
    API.getStudentExams(this.state.authStudent.studentId)
      .then((StudentExams) => this.setState({ StudentExams: StudentExams }))
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  getFreeExamSlots = () => {
    // console.log(studentId);
    API.getFreeExamSlots()
      .then((FreeSlots) => this.setState({ FreeSlots: FreeSlots }))
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  getBookedSlots = () => {
    // console.log(studentId);
    API.getBookedSlots(this.state.authStudent.studentId)
      .then((BookedSlots) => this.setState({ BookedSlots: BookedSlots }))
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  showSidebar = () => {
    this.setState((state) => ({ openMobileMenu: !state.openMobileMenu }));
  };

  //ADD Session
  addSession = async (session) => {
    await API.addSession(session)
      .then((res) => {
        this.setState({ slotsSaved: res });
      })
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  //ADD Exam and then get Exam ID
  createExam = (exam) => {
    API.createExam(exam)
      .then((res) => {
        this.setState({ examId: res.id });
      })
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

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

  setStudentsIDList(list) {
    this.setState({ selectedStudents: list });
  }

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
      studentId: this.state.studentId,
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
          getBookedSlots={this.getBookedSlots}
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
                    setStudentsIDList={this.setStudentsIDList}
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
                    selectedStudents={this.state.selectedStudents}
                    timeSlot={this.state.timeSlot}
                    studentsNumber={this.state.studentsNumber}
                    totalTimeSlot={this.state.totalTimeSlot}
                    sessionNumber={this.state.sessionNumber}
                    session={this.state.session}
                    addSession={this.addSession}
                    examId={this.state.examId}
                    slotsSaved={this.state.slotsSaved}
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

            <Route path="/StudentExams">
              <Row className="vheight-100">
                <Col sm={4}></Col>
                <Col sm={4} className="below-nav">
                  <h4>List of exams to book</h4>
                  <StudentExamsList
                    StudentExams={this.state.StudentExams}
                    getFreeExamSlots={this.getFreeExamSlots}
                  />
                </Col>
              </Row>
            </Route>

            <Route path="/slots/:examId">
              <Row className="vheight-100">
                <Col className="below-nav">
                  <h4>List of slots for booking</h4>
                  <FreeSlotsList FreeSlots={this.state.FreeSlots} />
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

            <Route path="/bookedSlots">
              <Row className="vheight-100">
                <Col sm={4}></Col>
                <Col sm={4} className="below-nav">
                  <h4>My Booked Slots</h4>
                  <BookedSlotsList BookedSlots={this.state.BookedSlots} />
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
