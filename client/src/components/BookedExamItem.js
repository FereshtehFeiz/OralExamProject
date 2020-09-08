import React from "react";
import moment from "moment";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";

const BookedExamItem = (props) => {
  let { bookedExamItem, cancelSlot } = props;

  return (
    <>
      <tr>
        <td key={bookedExamItem.eid}>{bookedExamItem.examId}</td>
        <td>{bookedExamItem.studentId}</td>
        <td>{bookedExamItem.date}</td>
        <td>{bookedExamItem.mark}</td>
        <td>{bookedExamItem.state === 1 ? "Booked" : ""}</td>
        <td>
          {bookedExamItem.attendance === false ? (
            <>
              {/* <Link to={`/bookedItem/${bookedExamItem.eid}`}> Cancel </Link> */}
              <Link onClick={() => cancelSlot(bookedExamItem)}>
                {" "}
                Cancel Booking{" "}
              </Link>
            </>
          ) : (
            "Exam Taken"
          )}
        </td>
      </tr>
    </>
  );
};

export default BookedExamItem;
