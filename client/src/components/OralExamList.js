import React, { useEffect } from "react";
import OralExamItem from "./OralExamItem";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Table from "react-bootstrap/Table";

const OralExamList = (props) => {
  let { OralExams, updateExam } = props;

  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          {context.authErr && <Redirect to="/login"></Redirect>}
          {OralExams && (
            <Table striped bordered hover variant="white">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Date</th>
                  <th>Attendance</th>
                  <th>Mark</th>
                  <th>Withdraw</th>
                  <th>Take Exam</th>
                </tr>
              </thead>
              {OralExams.map((oralExamItem) => (
                <tbody>
                  <OralExamItem
                    key={oralExamItem.slotId}
                    oralExamItem={oralExamItem}
                    updateExam={updateExam}
                  />
                </tbody>
              ))}
            </Table>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default OralExamList;
