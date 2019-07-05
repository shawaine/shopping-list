import React, { useState, useContext } from "react";
import { Container, ListGroup, ListGroupItem, Button, Alert } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ItemContext } from "../contexts/ItemContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { UserContext } from "../contexts/UserContext";
import Axios from "axios";

export default function ShoppingList() {
  const [items] = useContext(ItemContext);
  const [user] = useContext(UserContext);
  const [error, setError] = useState();
  // eslint-disable-next-line
  const [isLoaing, setIsLoading] = useContext(LoadingContext);

  const tokenConfig = {
    headers: {
      "Content-type": "application/json"
    }
  };
  if (user.token) {
    tokenConfig.headers["x-auth-token"] = user.token;
  }

  return (
    <Container>
      {error ? <Alert color="danger">{error}</Alert> : null}
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem key={_id}>
                {user.isAuthenticated ? (
                  <Button
                    key={_id}
                    className="remove-btn mr-2"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setIsLoading(true);
                      Axios.delete(`/api/items/${_id}`, tokenConfig)
                        .then(res => setIsLoading(false))
                        .catch(err => {
                          setError(err.response.data.message);
                          setTimeout(() => {
                            setError();
                          }, 2000);
                        });
                    }}
                  >
                    &times;
                  </Button>
                ) : null}
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}
