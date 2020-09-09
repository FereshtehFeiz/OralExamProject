import React from "react";
import moment from "moment";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";

class OralExamItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };

    if (this.props.oralExamItem) {
      this.state = { ...this.props.oralExamItem };
    }
    this.state.submitted = false;
  }

  updateField = (name, value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    console.log("submit");
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let oralExamItem = Object.assign({}, this.state);
      console.log(oralExamItem);
      this.props.updateExam(oralExamItem);
      this.setState({ submitted: true });
    }
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    // if (this.state.submitted) return <Redirect to="/" />;
    return (
      <>
        <tr key={this.props.oralExamItem.slotId}>
          <td>{this.props.oralExamItem.studentId}</td>
          <td>{this.props.oralExamItem.date}</td>
          <td>
            {" "}
            {this.props.oralExamItem.attendance === true ? "Present" : "Absent"}
          </td>
          <td>
            {this.props.oralExamItem.mark === 0 ? (
              <span className="badge badge-danger">Undefined</span>
            ) : (
              this.props.oralExamItem.mark
            )}
          </td>
          {/* <td>
            {this.props.oralExamItem.withdraw === true ? (
              <span className="badge badge-warning">withdrawn</span>
            ) : (
              <span className="badge badge-success">Mark accepted</span>
            )}
          </td> */}
          <td>
            {" "}
            <Button variant="primary" onClick={this.showModal}>
              Take Exam
            </Button>{" "}
            {/* <Link to={`/oralExamItem/${this.props.oralExamItem.slotId}`}>
              <Image
                width="20"
                height="20"
                className="img-button"
                src="/svg/edit.svg"
                alt=""
              />
            </Link> */}
          </td>
        </tr>

        {/* To update the mark and attendance of student */}
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update mark and attendance</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form method="POST" onSubmit={(event) => this.handleSubmit(event)}>
              <Form.Group>
                <div className="custom-control custom-checkbox">
                  <input
                    value={this.state.attendance}
                    type="checkbox"
                    className="custom-control-input"
                    id={"check-t" + this.props.oralExamItem.slotId}
                    onChange={(ev) =>
                      this.updateField(ev.target.name, ev.target.checked)
                    }
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={"check-t" + this.props.oralExamItem.slotId}
                  >
                    Student is present
                  </label>
                </div>
              </Form.Group>
              <Form.Group controlId="Mark">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Exam Result</Form.Label>
                  <Form.Control
                    as="select"
                    name="state"
                    value={this.state.value}
                    onChange={(ev) =>
                      this.updateField(ev.target.name, ev.target.value)
                    }
                  >
                    <option>Passed</option>
                    <option>Failed</option>
                    <option>30L</option>
                    <option>Withdraw</option>
                  </Form.Control>
                </Form.Group>
                <Form.Label>Mark</Form.Label>
                <Form.Control
                  type="text"
                  name="mark"
                  value={this.state.mark}
                  onChange={(ev) =>
                    this.updateField(ev.target.name, ev.target.value)
                  }
                />
              </Form.Group>

              {/* <Form.Group>
                <div className="custom-control custom-checkbox">
                  <input
                    value={this.state.withdraw}
                    type="checkbox"
                    className="custom-control-input"
                    id={"check-t" + this.props.oralExamItem.withdraw}
                    onChange={(ev) =>
                      this.updateField(ev.target.name, ev.target.checked)
                    }
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={"check-t" + this.props.oralExamItem.withdraw}
                  >
                    Mark is withdraw
                  </label>
                </div>
              </Form.Group> */}
              <Button variant="secondary" onClick={this.hideModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default OralExamItem;
