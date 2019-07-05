import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { NavLink } from "reactstrap";

export default function Logout() {
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  return (
    <div>
      <NavLink
        href="#"
        onClick={() => {
          setUser("");
        }}
      >
        Logout
      </NavLink>
    </div>
  );
}
