import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

class FreeSlotsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createExamItems = (e) => {
    return (
      <tr>
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
            {this.props.StudentExams && (
              <Table striped bordered hover variant="white">
                <thead>
                  <tr>
                    <th>Date and Start Time</th>
                    <th>State</th>
                    <th>Select to Book</th>
                  </tr>
                </thead>
              </Table>
            )}
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default FreeSlotsList;
