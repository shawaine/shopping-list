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
import { ErrorContext } from "../../contexts/ErrorContext";
import { UserContext } from "../../contexts/UserContext";

export default function LoginModal() {
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useContext(ErrorContext);
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const inputOnChange = (type, e) => {
    if (type === "email") {
      setCredentials({ ...credentials, email: e.target.value });
    } else {
      setCredentials({ ...credentials, password: e.target.value });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    Axios.post("/api/auth", JSON.stringify(credentials), config)
      .then(res => {
        const userInfo = {
          isAuthenticated: "true",
          token: res.data.token,
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email
        };

        setToggle(!toggle);

        setUser(userInfo);
      })
      .catch(err => {
        console.log(err.response.data.msg);
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
        Login
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
          Login
        </ModalHeader>
        <ModalBody>
          {error ? <Alert color="danger">{error}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
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
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
