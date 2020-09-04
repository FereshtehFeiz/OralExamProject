import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

class StudentLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sid: "", submitted: false };
  }

  onChangeSid = (event) => {
    this.setState({ sid: event.target.value });
  };

  handleSubmit = (event, onLogin) => {
    event.preventDefault();
    onLogin(this.state.sid);
    this.setState({ submitted: true });
  };

  render() {
    // if (this.state.submitted) return <Redirect to="/" />;
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            <Container fluid>
              <Row>
                <Col>
                  <h2 className="ui teal image header">
                    <div className="content">Enter your student ID</div>
                  </h2>

                  <Form
                    method="POST"
                    onSubmit={(event) =>
                      this.handleSubmit(event, context.loginStudent)
                    }
                  >
                    <Form.Group controlId="sid">
                      <Form.Label>Student ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="sid"
                        placeholder="Student ID"
                        value={this.state.sid}
                        onChange={(ev) => this.onChangeSid(ev)}
                        required
                        autoFocus
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Enter
                    </Button>
                  </Form>

                  {context.invalidSid && (
                    <Alert variant="danger">{context.invalidSid.msg}</Alert>
                  )}
                </Col>
              </Row>
            </Container>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default StudentLogin;
