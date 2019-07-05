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
  NavLink,
  Alert
} from "reactstrap";
import Axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { ErrorContext } from "../../contexts/ErrorContext";

export default function RegisterModal() {
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useContext(ErrorContext);
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });

  const inputOnChange = (type, e) => {
    if (type === "name") {
      setCredentials({ ...credentials, name: e.target.value });
    } else if (type === "email") {
      setCredentials({ ...credentials, email: e.target.value });
    } else {
      setCredentials({ ...credentials, password: e.target.value });
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    Axios.post("/api/users", credentials)
      .then(res => {
        setCredentials();
        setToggle(!toggle);
        setError();
        const userInfo = {
          isAuthenticated: "true",
          token: res.data.token,
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email
        };
        setUser(userInfo);
      })
      .catch(err => {
        setError(err.response.data.msg);
      });
  };
  return (
    <div>
      <NavLink
        href="#"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Register
      </NavLink>
      <Modal
        isOpen={toggle}
        toggle={() => {
          setToggle(!toggle);
        }}
      >
        <ModalHeader
          toggle={() => {
            setToggle(!toggle);
            setError("");
          }}
        >
          Register
        </ModalHeader>
        <ModalBody>
          {error ? <Alert color="danger">{error}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                className="mb-3"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={e => {
                  inputOnChange("name", e);
                }}
              />
              <Label for="email">Email</Label>
              <Input
                className="mb-3"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={e => {
                  inputOnChange("email", e);
                }}
              />
              <Label for="password">Password</Label>
              <Input
                className="mb-3"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={e => {
                  inputOnChange("password", e);
                }}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
