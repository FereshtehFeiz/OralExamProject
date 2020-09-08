import React from "react";
import { AuthContext } from "../auth/AuthContext";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
import BookedExamItem from "./BookedExamItem";

const BookedSlotsList = (props) => {
  let { BookedSlots, cancelSlot } = props;

  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          {/* {context.authErr && <Redirect to="/login"></Redirect>} */}
          {BookedSlots && (
            <Table striped bordered hover variant="white">
              <thead>
                <tr>
                  <th>Exam Code</th>
                  <th>Student ID</th>
                  <th>Date and Start Time</th>
                  <th>Mark</th>
                  <th>Booking State</th>
                  <th>Cancel Appointment</th>
                </tr>
              </thead>
              {BookedSlots.map((bookedExamItem) => (
                <tbody>
                  <BookedExamItem
                    key={bookedExamItem.examId}
                    bookedExamItem={bookedExamItem}
                    cancelSlot={cancelSlot}
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

export default BookedSlotsList;
