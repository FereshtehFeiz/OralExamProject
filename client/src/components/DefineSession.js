import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import moment from "moment";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Modal from "react-bootstrap/Modal";

class DefineSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: '14:00',
      duration: 0,
      sessionDate: null,
      difference: 0,//availableSlots
      errorMsg: false,
      show: false,
      rowsData: [],
      totalTimeSlot: this.props.totalTimeSlot,
      studentsNumber: this.props.studentsNumber,
      timeSlot: this.props.timeSlot
    };

    this.state.submitted = false;
    this.handleDifference = this.handleDifference.bind(this);
  }

  IncrementItem = () => {
    this.setState({ duration: this.state.duration + this.props.timeSlot });
    this.state.difference = this.state.duration - this.props.totalTimeSlot;
    this.handleDifference(this.state.difference);
  };

  DecreaseItem = () => {
    if (this.state.duration < this.props.timeSlot) {
      this.setState({
        duration: this.props.timeSlot,
      });
    } else {
      this.setState({
        duration: this.state.duration - this.props.timeSlot,
      });
    }
    this.state.difference = this.state.duration - this.props.totalTimeSlot;
    this.handleDifference(this.state.difference);
  };

  handleDifference = (difference) => {
    if (difference >= 0) {
      this.state.errorMsg = false;
    } else if (difference < 0) {
      this.state.errorMsg = true;
    }
  };

  updateField = (name, value) => {
    this.setState({ [name]: value });
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  calculateSession = () => {

    let difference = (this.state.duration - this.state.totalTimeSlot) / this.state.timeSlot;
    if (difference >= 0)
      this.setState({ totalTimeSlot: 0 })
    else
      this.setState({ totalTimeSlot: this.state.totalTimeSlot - this.state.duration })
    let rowsData = this.state.rowsData;
    let rowData = {
      startTime: this.state.startTime,
      sessionDate: this.state.sessionDate,
      duration: this.state.duration
    }
    rowsData.push(rowData);
    this.setState({ rowsData, difference })
    this.hideModal();
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let session = Object.assign({}, this.state);
      this.props.addSession(session);
      this.setState({ submitted: true });
    }
  };

  render() {
    // if (this.state.submitted) return <Redirect to="/addSession" />;
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            <Col>
              <Form.Group>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Total selected students: {this.state.studentsNumber}
                    </Card.Title>
                    {/* <Card.Title>
                      Total needed time: {this.state.totalTimeSlot}
                    </Card.Title> */}
                    <Card.Title>
                      Number of available slots: {this.state.difference}
                    </Card.Title>
                    {this.state.errorMsg && (
                      <Badge variant="warning">
                        <h6>
                          The difference is negative! Please modify the duration
                          of session
                        </h6>
                      </Badge>
                    )}
                  </Card.Body>
                </Card>
              </Form.Group>
            </Col>

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Session Date</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">Total Duration</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.rowsData.map((item, index) =>
                    <tr key={index + 1}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.sessionDate}</td>
                      <td>{item.startTime}</td>
                      <td>{item.duration}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>

            <Form method="POST" onSubmit={(event) => this.handleSubmit(event)}>
              {/* 

              
                <button
                  className="btn btn-secondary"
                  onClick={this.DecreaseItem}
                >
                  -
                </button>{" "}
                <button
                  className="btn btn-secondary"
                  onClick={this.IncrementItem}
                >
                  +
                </button>
              </Form.Group> */}

              <Form.Group>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>Save</Button>{" "}
                {/* <Link to="/createExam">
                  <Button variant="primary" type="submit">Select student</Button>{" "}
                </Link> */}
                <Button variant="primary" onClick={this.showModal}>Add session</Button>{" "}





                <Modal show={this.state.show} onHide={this.hideModal} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group controlId="date">
                      <Form.Label>Session Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="sessionDate"
                        value={this.state.sessionDate}
                        onChange={(ev) =>
                          this.updateField(ev.target.name, ev.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="start-time">
                      <Form.Label>Start Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="startTime"
                        value={this.state.startTime}
                        onChange={(ev) =>
                          this.updateField(ev.target.name, ev.target.value)
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="duration">
                      <Form.Label>Duration</Form.Label>
                      <Form.Control
                        type="number"
                        name="duration"
                        min="0"
                        step={this.props.timeSlot}
                        value={this.state.duration}
                        onChange={(ev) =>
                          this.updateField(ev.target.name, ev.target.value)
                        }
                        defaultValue={this.props.timeSlot}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.hideModal}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={this.calculateSession}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form.Group>
            </Form>
            <Row></Row>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default DefineSession;
