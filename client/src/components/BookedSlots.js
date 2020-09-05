import React from "react";
import { AuthContext } from "../auth/AuthContext";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";

class BookedSlots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createBookedSlots = (b) => {
    return (
      <tr>
        <td></td>
        <td></td>
      </tr>
    );
  };

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authErr && <Redirect to="/login"></Redirect>}

            <Table striped bordered hover variant="white">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Mark</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default BookedSlots;
