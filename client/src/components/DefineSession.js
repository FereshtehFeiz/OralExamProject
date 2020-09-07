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
import Alert from "react-bootstrap/Alert";
import Moment from 'moment'

class DefineSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: '14:00',
      duration: 0,
      sessionDate: null,
      difference: 0,//availableSlots
      msgStatus: false,
      msg: '',
      show: false,
      rowsData: [],
      totalTimeSlot: this.props.totalTimeSlot,
      studentsNumber: this.props.studentsNumber,
      timeSlot: this.props.timeSlot,
      saveStatus: false,
      slotsSaved: false
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

    ////////////////////// validate modal fields //////////////////////////////////////////////
    if (this.state.duration === 0) {
      this.setState({ msgStatus: true, msg: 'Duration can not be zero!' });
      return;
    }
    if (this.state.sessionDate === null) {
      this.setState({ msgStatus: true, msg: 'Date can not be null!' });
      return;
    }
    let inpDate = new Date(this.state.sessionDate);
    let currDate = new Date();
    if (inpDate.setHours(0, 0, 0, 0) < currDate.setHours(0, 0, 0, 0)) {
      this.setState({ msgStatus: true, msg: 'Selected date can not be in the past!' });
      return;
    }

    let dateStatus = true;
    this.state.rowsData.forEach((item) => {
      if (item.sessionDate === this.state.sessionDate) {
        dateStatus = false;
        return;
      }
    });

    if (!dateStatus) {
      this.setState({ msgStatus: true, msg: 'Selected date is assigned for other session!' });
      return;
    }
    ////////////////////////////////////////////////////////////////////////////////////////

    let difference = (this.state.duration - this.state.totalTimeSlot) / this.state.timeSlot;
    if (difference >= 0)
      this.setState({ totalTimeSlot: this.state.totalTimeSlot - this.state.duration })
    else
      this.setState({ totalTimeSlot: this.state.totalTimeSlot - this.state.duration })
    let rowsData = this.state.rowsData;
    let rowData = {
      startTime: this.state.startTime,
      sessionDate: this.state.sessionDate,
      fulldate: Moment(this.state.sessionDate + ' ' + this.state.startTime).format('YYYY-MM-DD HH:mm'),
      duration: this.state.duration
    }
    rowsData.push(rowData);
    if (difference >= 0)
      this.setState({ saveStatus: true })
    this.setState({ rowsData, difference, msgStatus: false })
    this.hideModal();
  }


  handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let session = Object.assign({
        data: this.state.rowsData,
        examId: this.props.examId,
        timeSlot: this.props.timeSlot,
        students: this.props.selectedStudents
      });
      await this.props.addSession(session);
      this.setState({ slotsSaved: this.props.slotsSaved });
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
                      examID: {this.props.examId}
                    </Card.Title>
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
                  <th scope="col">Session Duration</th>
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
                <div className={this.state.slotsSaved ? 'invisible' : 'visible'}>
                  <Button variant="primary" type="submit" disabled={this.state.saveStatus ? false : true} onClick={this.handleSubmit}>Save</Button>{" "}
                  <Button variant="primary" onClick={this.showModal}>Add session</Button>{" "}
                </div>
                <div className={this.state.slotsSaved ? 'visible' : 'invisible'}>
                  <Alert variant='success'>Data has been saved successfully!</Alert>
                </div>

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
                    {this.state.msgStatus ? <Alert variant='danger'>{this.state.msg}</Alert> : null}
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
