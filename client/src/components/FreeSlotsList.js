import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import API from "../api/API";

class FreeSlotsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { FreeSlots: [], selectedSlotId: 0 };
  }

  componentDidMount() {
    API.getFreeExamSlots(this.props.eid)
      .then((FreeSlots) => this.setState({ FreeSlots: FreeSlots }))
      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  }

  onChangeTask = (selectedSlotId, checked) => {
    this.setState({ selectedSlotId });
  };

  createSlots = (r) => {
    return ["radio"].map((type) => (
      <div key={r.slotId} className="mb-3">
        <Form.Check
          name="slotDates"
          type={type}
          id={r.slotId}
          label={r.date}
          onChange={(event) =>
            this.onChangeTask(r.slotId, event.target.checked)
          }
        />
      </div>
    ));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      // let SelectedSlot = Object.assign({}, this.state);
      if (this.state.selectedSlotId > 0) {
        this.props.bookSlot(this.state.selectedSlotId);
        this.setState({ submitted: true });
      }
    }
  };

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authErr && <Redirect to="/studentLogin"></Redirect>}
            <Form method="POST" onSubmit={(event) => this.handleSubmit(event)}>
              <Table striped bordered hover variant="white">
                <thead>
                  <tr>
                    <th>Date and Start Time</th>
                  </tr>
                  <tr>
                    <td>
                      <tbody>
                        {this.state.FreeSlots.map(this.createSlots)}
                      </tbody>
                    </td>
                  </tr>
                </thead>
              </Table>
              <Button variant="primary" type="submit">
                Book
              </Button>
            </Form>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default FreeSlotsList;
