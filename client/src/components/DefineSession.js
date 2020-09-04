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

class DefineSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      duration: null,
      sessionDate: "",
      difference: 0,
      errorMsg: false,
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

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let session = Object.assign({}, this.state);
      // if (session.sessionDate !== "") {
      //   session.sessionDate = moment(session.sessionDate);
      // }
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
            <Form method="POST" onSubmit={(event) => this.handleSubmit(event)}>
              <Form.Group controlId="date">
                <Form.Label>Session Date</Form.Label>
                <Form.Control
                  type="date"
                  name="sessionDate"
                  value={this.state.sessionDate}
                  onChange={(ev) =>
                    this.updateField(ev.target.name, ev.target.value)
                  }
                  required
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
                  required
                />
              </Form.Group>

              <Form.Group controlId="duration">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={this.state.duration}
                  onChange={(ev) =>
                    this.updateField(ev.target.name, ev.target.value)
                  }
                  defaultValue={this.props.timeSlot}
                  required
                />
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
              </Form.Group>

              <Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Save
                </Button>{" "}
                <Link to="/createExam">
                  <Button variant="secondary" type="submit">
                    Close
                  </Button>
                </Link>
              </Form.Group>
            </Form>
            <Row>
              <Col>
                <Form.Group>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        Total selected students: {this.props.studentsNumber}
                      </Card.Title>
                      <Card.Title>
                        Number of available slots: {this.state.difference}
                      </Card.Title>
                      {this.state.errorMsg && (
                        <Badge variant="warning">
                          <h6>
                            The difference is negative! Please modify the
                            duration of session
                          </h6>
                        </Badge>
                      )}
                    </Card.Body>
                  </Card>
                </Form.Group>
              </Col>
            </Row>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default DefineSession;
