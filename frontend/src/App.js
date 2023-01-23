import React from "react";
import "./App.css";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { MDBFooter, MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import AddTodo from "./components/AddTodo";

function App() {
  return (
    <div>
      <Helmet>
        <title>TODO-APP</title>
      </Helmet>
      <Navbar className="bg-info">
        <Container>
          <Navbar.Brand href="#home">
            <h1>
              <strong style={{ fontFamily: "initial" }}>TODO APP</strong>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <strong>
                Signed in as: <a href="#login">Username</a>
              </strong>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AddTodo />

      <MDBFooter className="text-center text-white footer w-100 bg-info footer">
        <MDBContainer className="pt-1">
          <section className="mb-1">
            <MDBBtn
              rippleColor="dark"
              color="link"
              floating
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab className="fab fa-facebook-f" />
            </MDBBtn>
            <MDBBtn
              rippleColor="dark"
              color="link"
              floating
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab className="fa-twitter" />
            </MDBBtn>
            <MDBBtn
              rippleColor="dark"
              color="link"
              floating
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab className="fa-google" />
            </MDBBtn>
            <MDBBtn
              rippleColor="dark"
              color="link"
              floating
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab className="fa-instagram" />
            </MDBBtn>
            <MDBBtn
              rippleColor="dark"
              color="link"
              floating
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab className="fa-linkedin" />
            </MDBBtn>
            <MDBBtn
              rippleColor="dark"
              color="link"
              floating
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab className="fa-github" />
            </MDBBtn>
          </section>
        </MDBContainer>
        <div
          className="text-center text-dark p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <a className="text-dark" href="#!">
            MERN-developers
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

export default App;
