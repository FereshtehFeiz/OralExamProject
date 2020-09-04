import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

class CreateExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedCount: 0,
      totalTimeSlot: 0,
      selectedStudentsID: [],
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let selectedStudentsID = Object.assign({}, this.state);
      this.props.createExam(selectedStudentsID);
      this.setState({
        submitted: true,
      });
    }
    this.props.setNumberofStudents(this.state.checkedCount);
    this.props.setTimeSlot(this.state.timeSlot);
    this.props.setTotalTimeSlot(this.state.timeSlot, this.state.checkedCount);
  };
  updateField = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onCheckChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    // console.log(value);
    const name = target.name;

    this.setState({
      [name]: value,
    });

    if (target.type === "checkbox") {
      if (value === true) {
        // add student ID to list
        this.setState((state) => {
          const selectedStudentsID = state.selectedStudentsID.concat([name]);

          return {
            selectedStudentsID,
          };
        });

        // access to the previous value by means of prevState
        this.setState((prevState) => {
          return {
            checkedCount: prevState.checkedCount + 1,
          };
        });
      } else {
        // remove student ID from list
        this.setState((state) => {
          var index = this.state.selectedStudentsID.indexOf([name]);
          const selectedStudentsID = state.selectedStudentsID.splice(index, 1);
          return {
            selectedStudentsID,
          };
        });

        this.setState((prevState) => {
          return {
            checkedCount: prevState.checkedCount - 1,
          };
        });
      }
    }
  };

  createStudents = (s) => {
    return (
      <tr key={s.studentId}>
        <td>{s.studentId}</td>
        <td>{s.fullname}</td>
        <td>
          <div className="custom-control custom-checkbox">
            <input
              name={s.studentId}
              type="checkbox"
              className="custom-control-input"
              id={"check-t" + s.studentId}
              onChange={this.onCheckChange}
            />

            <label
              className="custom-control-label"
              htmlFor={"check-t" + s.studentId}
            >
              {""}
            </label>
          </div>
        </td>
      </tr>
    );
  };

  render() {
    if (this.state.submitted) return <Redirect to="/addSession" />;
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authErr && <Redirect to="/login"></Redirect>}

            <Form method="POST" onSubmit={(event) => this.handleSubmit(event)}>
              <Form.Group controlId="selected-students">
                <Table striped bordered hover variant="white">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.studentsOfCourse.map(this.createStudents)}
                  </tbody>
                </Table>
                <Card>
                  <Card.Body>
                    <h6>Total selected students : {this.state.checkedCount}</h6>
                  </Card.Body>
                </Card>
              </Form.Group>

              <Form.Group controlId="time-slot">
                <Form.Label>Select TimeSlot</Form.Label>
                <Form.Control
                  type="number"
                  name="timeSlot"
                  value={this.state.timeSlot}
                  defaultValue="0"
                  onChange={(ev) =>
                    this.updateField(ev.target.name, parseInt(ev.target.value))
                  }
                  required
                  focused
                ></Form.Control>
              </Form.Group>

              <Button
                variant="primary"
                onClick={(ev) => this.handleSubmit}
                type="submit"
              >
                Create Session
              </Button>
            </Form>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default CreateExam;
