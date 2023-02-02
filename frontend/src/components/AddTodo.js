import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import { Store } from "../Store";
import Axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const navigate = useNavigate()
  const [addTodo, setAddTodo] = useState("");
  const { todoValue, userValue } = useContext(Store);
  const { user } = userValue;
  const [todo, setTodo] = todoValue;
  const addHandler = () => {
    if (addTodo.length === 0) {
      window.alert("Please enter something for add!");
      return;
    }
    if (!user) {
      toast.info("PLEASE LOGIN OR REGISTER FOR ADD TODO");
      navigate('/login')
    } else {
      Axios.post("/addTodo", {
        Data: addTodo,
        ID: user._id,
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
  // console.log(user);
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
