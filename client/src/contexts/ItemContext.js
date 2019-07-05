import React, { useState, useEffect, createContext, useContext } from "react";
import { LoadingContext } from "./LoadingContext";
import Axios from "axios";

export const ItemContext = createContext();

export const ItemProvider = props => {
  const [items, setItems] = useState([]);
  const [isLoading] = useContext(LoadingContext);

  useEffect(() => {
    Axios.get("/api/items")
      .then(res => setItems(res.data))
      .catch(err => console.log("Please refresh the page."));
  }, [isLoading]);

  return (
    <ItemContext.Provider value={[items, setItems]}>
      {props.children}
    </ItemContext.Provider>
  );
};
