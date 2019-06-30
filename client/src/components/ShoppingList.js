import React, { useContext } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ItemContext } from "../contexts/ItemContext";
import { LoadingContext } from "../contexts/LoadingContext";
import Axios from "axios";

export default function ShoppingList() {
  const [items, setItems] = useContext(ItemContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem key={_id}>
                <Button
                  key={_id}
                  className="remove-btn mr-2"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    setIsLoading(true);
                    Axios.delete(`/api/items/${_id}`).then(res =>
                      setIsLoading(false)
                    );
                  }}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}
