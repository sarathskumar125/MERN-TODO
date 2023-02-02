import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { MDBFooter, MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Signin from "./components/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./Store";

function App() {
  const { userValue } = useContext(Store);
  const {user} = userValue;


  const signoutHandler = () => {
    localStorage.removeItem("USERINFO");
    window.location.href = "/login";
  }; 
 
 console.log(user);

  return (
    <div>
      <Helmet>
        <title>TODO-APP</title>
      </Helmet>

      <ToastContainer
        position="bottom-center"
        autoClose="3000"
        theme="dark"
        limit={1}
      />

      <Navbar className="bg-info">
        <Container>
          <Navbar.Brand href="/">
            <h3>
              <strong style={{ fontFamily: "initial" }}>TODO APP</strong>
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {user ? (
                <>
                  <strong className="mr-3">
                    Signed in as: <a href="#!">{user.username}</a>
                  </strong>
                  <strong>
                    <Link to="#signout" onClick={signoutHandler}>
                      {" "}
                      signout
                    </Link>
                  </strong>
                </>
              ) : (
                <strong>
                  {" "}
                  <a href="/login">Login</a>{" "}
                </strong>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/" element={<Home />} />
      </Routes>

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
