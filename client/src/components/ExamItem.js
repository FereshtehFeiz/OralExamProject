import React from "react";
import moment from "moment";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";

class ExamItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <tr>
          <td></td>

          <td>
            {" "}
            <Button variant="primary">Show Slots</Button>{" "}
          </td>
        </tr>
      </>
    );
  }
}

export default ExamItem;
