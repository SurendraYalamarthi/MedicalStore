import React, { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import firebase from "../constants/firebase";
import Loader from "./Loader";

const Login = ({ onSubmit }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(userName, password)
      .then(async (user) => {
        setLoader(false);
        let result = await user.user.getIdTokenResult();
        onSubmit(result);
      })
      .catch((error) => {
        setLoader(false);
        setErrMessage(error.message);
      });
    // onSubmit(userName, password);
  };

  return (
    <div
      className="bg-light d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <Card className="w-100" style={{ maxWidth: "350px" }}>
          <Card.Header className="bg-primary text-white">Login</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={userName}
                  onChange={handleUserName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePassword}
                />
              </Form.Group>
              <Button type="submit" className="my-2">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      {errMessage !== "" ? (
        <Alert variant={"danger"} show={errMessage ? true : false}>
          {errMessage}
        </Alert>
      ) : null}
      <Loader loader={loader} />
    </div>
  );
};

export default Login;
