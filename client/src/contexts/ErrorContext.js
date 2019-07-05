import React, { useState, createContext } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = props => {
  const [error, setError] = useState("");

  return (
    <ErrorContext.Provider value={[error, setError]}>
      {props.children}
    </ErrorContext.Provider>
  );
};
