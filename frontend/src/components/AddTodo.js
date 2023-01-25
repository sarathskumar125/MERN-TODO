import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import { Store } from "../Store";
import Axios from "axios";

const AddTodo =  () => {
  const [addTodo, setAddTodo] = useState("");
  const { todo, setTodo } = useContext(Store);
  const addHandler = () => {
    if (addTodo.length === 0) {
      window.alert("Please enter something for add!");
    } else {
      Axios.post("/addTodo", {
        Data: addTodo, 
      })
        .then((res) => setTodo([...todo, res.data]))
        .then(setAddTodo(""));
    }
  };
  const enterHandler = (e) => {
    if (e.key === "Enter") {
      addHandler();
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6" sm="10" xs="10" className="addtodo">
          <Form.Control
            type="text"
            placeholder="Enter new todo"
            className="addinput"
            value={addTodo}
            onChange={(e) => setAddTodo(e.target.value)}
            onKeyDown={(e) => enterHandler(e)}
          />
          <Button className="bg-info button" onClick={addHandler}>
            <strong>+</strong>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTodo;
