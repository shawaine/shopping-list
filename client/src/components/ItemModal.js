import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Axios from "axios";
import { LoadingContext } from "../contexts/LoadingContext";

export default function ItemModal() {
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [toggle, setToggle] = useState(false);
  const [item, setItem] = useState([{ name: "" }]);

  const itemOnChange = e => {
    setItem(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (item) {
      setIsLoading(true);
      Axios.post("/api/items", { name: item }).then(res => setIsLoading(false));
    }
    setItem("");
    setToggle(!toggle);
  };
  return (
    <div>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Add Item
      </Button>
      <Modal
        isOpen={toggle}
        toggle={() => {
          setToggle(!toggle);
        }}
      >
        <ModalHeader
          toggle={() => {
            setToggle(!toggle);
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
    </div>
  );
}
