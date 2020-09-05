import React, { useEffect } from "react";
import OralExamItem from "./OralExamItem";
import ListGroup from "react-bootstrap/ListGroup";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const OralExamList = (props) => {
  let { timeslots, updateMark } = props;

  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          {context.authErr && <Redirect to="/login"></Redirect>}

          {timeslots && (
            <ListGroup as="ul" variant="flush">
              {timeslots.map((timeslot) => (
                <OralExamItem
                  key={timeslot.id}
                  timeslot={timeslot}
                  updateMark={updateMark}
                />
              ))}
            </ListGroup>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default OralExamList;
