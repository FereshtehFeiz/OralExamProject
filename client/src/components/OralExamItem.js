import React from "react";
import moment from "moment";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

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
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let oralExamItem = Object.assign({}, this.state);
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
    return (
      <>
        <tr key={this.props.oralExamItem.slotId}>
          <td>{this.props.oralExamItem.studentId}</td>
          <td>{this.props.oralExamItem.date}</td>
          <td>{this.props.oralExamItem.startTime}</td>
          <td>
            {" "}
            {this.props.oralExamItem.attendance === 0 ? "Absent" : "Present"}
          </td>
          <td>
            {this.props.oralExamItem.mark === 0
              ? "Not yet"
              : this.props.oralExamItem.mark}
          </td>
          <td>
            {" "}
            <Button variant="primary" onClick={this.showModal}>
              Take Exam
            </Button>{" "}
            <Link to={`/oralExamItem/${this.props.oralExamItem.slotId}`}>
              <Image
                width="20"
                height="20"
                className="img-button"
                src="/svg/edit.svg"
                alt=""
              />
            </Link>
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
              <Form.Group controlId="Mark">
                <Form.Label>Mark</Form.Label>
                <Form.Control
                  type="number"
                  name="mark"
                  value={this.state.mark}
                  onChange={(ev) =>
                    this.updateField(ev.target.name, ev.target.value)
                  }
                />
              </Form.Group>
              <Form.Group>
                <div className="custom-control custom-checkbox">
                  <input
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
                    Attendance
                  </label>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default OralExamItem;
