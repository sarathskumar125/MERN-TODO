import Axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Store } from "../Store";

const DisplayTodo = () => {
  const { todoValue, userValue } = useContext(Store);
  const { user } = userValue;
  const [todo, setTodo] = todoValue;
  const [list, setList] = useState([]);

  const deleteHandler = async (id) => {
    Axios.post(`/deleteTodo${id}/${user._id}`).then((res) => setTodo(res.data));
    const Data = list.filter((x) => x._id !== id);
    setList(Data);
  };
  const checkHandler = useCallback(
    (e, todo) => {
      if (e.target.checked) {
        Axios.post(`/checked${todo._id}`).then((res) =>
          setList([...list, res.data])
        );
      } else {
        Axios.post(`/unChecked${todo._id}`).then((res) =>
          setList(list.filter((List) => List._id !== res.data._id))
        );
      }
    },
    [list]
  );

  const isChecked = (Data) => {
    return Data
      ? "displaytext bg-info text-decoration-line-through font-italic"
      : "displaytext bg-info";
  };

  useEffect(() => {
    const fetchTodo = () => {
      Axios.get(`/readTodo${user._id}`).then((res) => setTodo(res.data));
    };
    if(user){
      fetchTodo();
    }
  }, [setTodo, checkHandler, user]);

  //  console.log(user._id);

  return (
    <Container className="mt-5 mb-5">
      {todo.map((Todo, index) => (
        <Row key={index} className="justify-content-center">
          <div className="displayparent">
            <Col md="1" xs="1" className="displaycheck bg-info">
              {" "}
              <input
                type={"checkbox"}
                className="checkbox"
                value={Todo._id}
                defaultChecked={Todo.checked ? true : false}
                onChange={(e) => checkHandler(e, Todo)}
              />
            </Col>
            <Col md="6" xs="8" className={isChecked(Todo.checked)}>
              {" "}
              {Todo.Data}{" "}
            </Col>
            <Col md="1" xs="2" className="displaytrash bg-info">
              {" "}
              <Button
                className="btn-sm trashbutton bg-info button"
                onClick={() => deleteHandler(Todo._id)}
              >
                <MDBIcon icon="trash-alt" />
              </Button>
            </Col>
          </div>
        </Row>
      ))}
    </Container>
  );
};

export default DisplayTodo;
