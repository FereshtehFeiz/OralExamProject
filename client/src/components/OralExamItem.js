import React from "react";
import moment from "moment";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const OralExamItem = (props) => {
  let { oralExamItem, updateMark } = props;

  return (
    <>
      <tr key={oralExamItem.timeslotId}>
        <td>{oralExamItem.studentId}</td>
        <td>{oralExamItem.date}</td>
        <td>{oralExamItem.startTime}</td>
        <td>{oralExamItem.attendance}</td>
        <td>{oralExamItem.mark}</td>
        <td>
          {" "}
          <Link to={`/oralExamItem/${oralExamItem.timeslotId}`}>
            <Image
              width="20"
              height="20"
              className="img-button"
              src="/svg/edit.svg"
              alt=""
              onClick={() => updateMark(oralExamItem)}
            />
          </Link>
        </td>
      </tr>
    </>
  );
};
export default OralExamItem;
