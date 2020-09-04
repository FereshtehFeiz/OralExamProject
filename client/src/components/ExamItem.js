import React from "react";
import moment from "moment";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const ExamItem = (props) => {
  let { exam, showExamSlots } = props;

  // const onChangeTask = (ev, task) => {
  //   if (ev.target.checked) {
  //     task.completed = true;
  //     updateTask(task);
  //   } else {
  //     task.completed = false;
  //     updateTask(task);
  //   }
  // };

  return (
    <Link to={`/exam/${exam.eid}`}>
      <ListGroup.Item>{exam.name}</ListGroup.Item>
    </Link>
  );
};
export default ExamItem;
