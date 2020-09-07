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
  }

  render() {
    return (
      <>
        <tr key={this.props.resultItem.slotId}>
          <td>{this.props.resultItem.studentId}</td>
          <td>{this.props.resultItem.date}</td>
          <td>
            {this.props.resultItem.mark === 0 ? (
              <span className="badge badge-danger">Not Booked</span>
            ) : (
              this.props.resultItem.mark
            )}{" "}
          </td>

          <td>
            {this.props.resultItem.mark >= 18 ? (
              <span className="badge badge-success">Passed</span>
            ) : this.props.resultItem.mark < 18 ? (
              <span className="badge badge-warning">Failed</span>
            ) : (
              <span className="badge badge-danger">Not Booked</span>
            )}
          </td>

          <td>
            {this.props.resultItem.state === 0 ? (
              <span className="badge badge-danger">Not Booked</span>
            ) : (
              <span className="badge badge-success">Booked</span>
            )}{" "}
          </td>
        </tr>
      </>
    );
  }
}

export default OralExamItem;
