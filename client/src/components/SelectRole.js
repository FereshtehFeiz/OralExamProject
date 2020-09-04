import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

class SelectRole extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      role: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    console.log(this.state.role);
  };

  render() {
    if (this.state.submitted && this.state.role == "Teacher")
      return <Redirect to="/login" />;
    else if (this.state.submitted && this.state.role == "Student")
      return <Redirect to="/studentLogin" />;
    else
      return (
        <>
          <h4>Who are you ?</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="Teacher"
                  checked={this.state.role === "Teacher"}
                  onChange={this.onValueChange}
                />
                Teacher
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="Student"
                  checked={this.state.role === "Student"}
                  onChange={this.onValueChange}
                />
                Student
              </label>
            </div>
            <Button variant="primary" type="submit">
              Select
            </Button>
          </form>
        </>
      );
  }
}

export default SelectRole;
