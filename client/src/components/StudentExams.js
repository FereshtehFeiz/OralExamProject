import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import ExamItem from "./ExamItem";

class StudentExams extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authErr && <Redirect to="/login"></Redirect>}

            {this.props.exams && (
              <ListGroup as="ul" variant="flush">
                {this.props.exams.map((exam) => (
                  <ExamItem
                    key={exam.id}
                    exam={exam}
                    getExamSlots={this.props.getExamSlots}
                  />
                ))}
              </ListGroup>
            )}
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default StudentExams;
