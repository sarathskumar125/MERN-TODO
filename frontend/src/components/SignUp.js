import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../Utils";
import { Store } from "../Store";

const SignUp = () => {
  const { userValue } = useContext(Store); 
  const {setUser} = userValue;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  var [usernameError, setUsernameError] = useState(null);
  var [passlength, setPasslength] = useState(null);
  var [passmatch, setPassmatch] = useState(null);

  const signupHandler = async (e) => {
    e.preventDefault();
    username.length < 4 &&
      setUsernameError(
        (usernameError = "username must be atleast 4 characters !")
      );
    username.length >= 4 && setUsernameError((usernameError = null));
    password.length < 6 &&
      setPasslength((passlength = "password must be atleast 6 characters !"));
    password.length >= 6 && setPasslength((passlength = null));
    password !== confirmPassword &&
      setPassmatch((passmatch = "password doesn't match !"));
    password === confirmPassword && setPassmatch((passmatch = null));

    if (
      username.length >= 4 && 
      password.length >= 6 && 
      password === confirmPassword 
    ) { 
      try {
      const Datas = await Axios.post("/signup", {
          Username: username,
          Password: password,
        });
          setUser(Datas.data); 
            localStorage.setItem("USERINFO", JSON.stringify(Datas.data))
            navigate("/")
      } catch (error) {
        toast.error(getError(error));
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4 mb-4">
        <Col md="6" xs="10" className="signupcol">
          <h2 className="text-center">Signup</h2>
          
          <Form onSubmit={(e) => signupHandler(e)} className="p-2">
            <Form.Group className="mb-3" controlId="formBasic-Username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter New Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <span className="err">{usernameError}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic-Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passlength && <span className="err">{passlength}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passmatch && <span className="err">{passmatch}</span>}
            </Form.Group>

            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Form>
          <span>
            Already registered? <Link to="/login">login</Link>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
