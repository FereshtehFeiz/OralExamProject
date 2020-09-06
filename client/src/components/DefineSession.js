import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { AuthContext } from "../auth/AuthContext";
import Modal from "react-bootstrap/Modal";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'

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
  }

  updateField = (name, value) => {
    this.setState({ [name]: value });
  };

  decreaseItem = () => {
    if (this.state.duration === 0)
      this.setState({ duration: 0 });
    else
      this.setState({ duration: this.state.duration - this.state.timeSlot });
  };

  incrementItem = () => {
    this.setState({ duration: this.state.duration + this.state.timeSlot });
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
              <Form.Group>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>Save</Button>{" "}
                <Button variant="primary" onClick={this.showModal}>Add session</Button>{" "}

                <Modal show={this.state.show} onHide={this.hideModal} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add session</Modal.Title>
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
                      {/* <Form.Label>Duration</Form.Label>
                      <Form.Control
                        disabled
                        type="number"
                        name="duration"
                        min="0"
                        step={this.props.timeSlot}
                        defaultValue={this.props.timeSlot}
                        value={this.state.duration}
                        onChange={(ev) =>
                          this.updateField(ev.target.name, ev.target.value)
                        }
                      /> */}
                      {/* <button className="btn btn-secondary" onClick={this.decreaseItem}>-</button>{" "}
                      <button className="btn btn-secondary" onClick={this.incrementItem}>+</button> */}



                      <Form.Label>Duration</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <Button variant="outline-secondary" onClick={this.decreaseItem}>-</Button>
                        </InputGroup.Prepend>

                        <FormControl
                          aria-describedby="basic-addon1"
                          disabled
                          name="duration"
                          min="0"
                          defaultValue={this.props.timeSlot}
                          value={this.state.duration}
                        />
                        <InputGroup.Append>
                          <Button variant="outline-secondary" onClick={this.incrementItem}>+</Button>
                        </InputGroup.Append>
                      </InputGroup>

                      {/* <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                          <Button variant="outline-secondary">Button</Button>
                        </InputGroup.Append>
                      </InputGroup> */}


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
