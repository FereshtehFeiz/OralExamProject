import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Alert from 'react-bootstrap/Alert'
import Form from "react-bootstrap/Form";

class CreateExam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedCount: 0,
      totalTimeSlot: 0,
      selectedStudentsID: [],
      timeSlot: 10,
      msg: null
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.selectedStudentsID.length === 0) {
      this.setState({ msg: 'Please select at least one student!' });
      return
    }
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      this.props.createExam({
        cid: this.props.courseId,
        slotDuration: this.state.timeSlot,
      });
      this.setState({ submitted: true });
    }
    this.props.setStudentsIDList(this.state.selectedStudentsID);
    this.props.setNumberofStudents(this.state.checkedCount);
    this.props.setTimeSlot(this.state.timeSlot);
    this.props.setTotalTimeSlot(this.state.timeSlot, this.state.checkedCount);
  };

  updateField = (name, value) => {
    this.setState({ [name]: value });
  };

  onCheckChange = async (studentId, checked) => {

    let arr = this.state.selectedStudentsID;
    if (checked) {
      arr.push(studentId)
      await this.setState({ selectedStudentsID: arr });
    }
    else {
      let newArr = arr.filter(item => item !== studentId)
      await this.setState({ selectedStudentsID: newArr });
    }

    await this.setState({ checkedCount: this.state.selectedStudentsID.length });
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
              onChange={(event) => this.onCheckChange(s.studentId, event.target.checked)}
            />

            <label
              className="custom-control-label"
              htmlFor={"check-t" + s.studentId}>{""}
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
                  min="0"
                  // value={this.state.timeSlot}
                  defaultValue={this.state.timeSlot}
                  onChange={(ev) =>
                    this.updateField(ev.target.name, parseInt(ev.target.value))
                  }
                  required
                  focused
                ></Form.Control>
              </Form.Group>

              <Button className="mb-2"
                variant="primary"
                onClick={(ev) => this.handleSubmit}
                type="submit">Create Session
              </Button>
              {
                this.state.msg ? <Alert variant='danger'>{this.state.msg}</Alert> : null
              }
            </Form>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default CreateExam;
