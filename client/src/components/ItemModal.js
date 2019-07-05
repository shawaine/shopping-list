import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert
} from "reactstrap";
import Axios from "axios";
import { LoadingContext } from "../contexts/LoadingContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { UserContext } from "../contexts/UserContext";

export default function ItemModal() {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [error, setError] = useContext(ErrorContext);
  const [user] = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const [item, setItem] = useState([{ name: "" }]);

  const tokenConfig = {
    headers: {
      "Content-type": "application/json"
    }
  };
  if (user.token) {
    tokenConfig.headers["x-auth-token"] = user.token;
  }

  const itemOnChange = e => {
    setItem(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (item) {
      setIsLoading(true);
      Axios.post("/api/items", { name: item }, tokenConfig)
        .then(res => setIsLoading(false))
        .catch(err => {
          setError(err.response.data.message);
          setTimeout(() => {
            setError();
          }, 2000);
        });
    }
    setItem("");
    setToggle(!toggle);
  };
  return (
    <Container>
      {user.isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}
      <Modal
        isOpen={toggle}
        toggle={() => {
          setToggle(!toggle);
        }}
      >
        {error ? <Alert color="danger">{error}</Alert> : null}
        <ModalHeader
          toggle={() => {
            setToggle(!toggle);
            setError();
          }}
        >
          Add To Shopping List
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item name</Label>
              <Input
                type="text"
                name="item"
                id="item"
                placeholder="Add shopping item"
                onChange={itemOnChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
}
