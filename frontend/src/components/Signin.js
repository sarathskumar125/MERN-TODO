import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../Utils";
import Axios from "axios";
import { Store } from "../Store";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { userValue } = useContext(Store); 
  const {setUser} = userValue;

  const signinHandler = async (e) => {
    e.preventDefault();
    try {
      const Datas = await Axios.post("/signin", {
        Username: username,
        Password: password,
      });
     setUser(Datas.data);
      localStorage.setItem("USERINFO", JSON.stringify(Datas.data));
      navigate("/");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4 mb-4">
        <Col md="6" xs="10" className="signupcol">
          <h2 className="text-center">Login</h2>

          <Form onSubmit={(e) => signinHandler(e)} className="p-2">
            <Form.Group className="mb-3" controlId="formBasic-Username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic-Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Signin
            </Button>
          </Form>
          <span>
            Not registered? <Link to="/signup">signup</Link>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
