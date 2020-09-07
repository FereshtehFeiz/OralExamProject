import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

class StudentExamsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createExamItems = (e) => {
    return (
      <tr>
        <td>
          <Link to={`/ExamItem/${e.examId}`}>{e.name}</Link>
        </td>
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
                    <th>Exam Name</th>
                  </tr>
                </thead>
                {this.props.StudentExams.map(this.createExamItems)}
              </Table>
            )}
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default StudentExamsList;
