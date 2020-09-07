import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Table from "react-bootstrap/Table";
import ResultItem from "./ResultItem";

const ExamResult = (props) => {
  let { OralExamResult } = props;

  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          {context.authErr && <Redirect to="/login"></Redirect>}
          {OralExamResult && (
            <Table striped bordered hover variant="white">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Date and Start Time</th>
                  <th>Mark</th>
                  <th>Exam Result</th>
                  <th>Booking State</th>
                </tr>
              </thead>
              {OralExamResult.map((resultItem) => (
                <tbody>
                  <ResultItem key={resultItem.slotId} resultItem={resultItem} />
                </tbody>
              ))}
            </Table>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default ExamResult;
