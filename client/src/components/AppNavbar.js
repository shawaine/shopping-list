import React, { useState, useContext } from "react";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import { UserContext } from "../contexts/UserContext";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import LoginModal from "./auth/LoginModal";

export default function AppNavbar() {
  const [burger, setBurger] = useState(false);
  const [user] = useContext(UserContext);
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler
            onClick={() => {
              setBurger(!burger);
            }}
          />
          <Collapse isOpen={burger} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="ml-4">
                <NavLink href="https://github.com/shawaine">My Github</NavLink>
              </NavItem>
              <NavItem className="ml-4">
                {user.isAuthenticated ? (
                  <NavLink>Welcome {user.name}</NavLink>
                ) : (
                  <RegisterModal />
                )}
              </NavItem>
              <NavItem className="ml-4">
                {user.isAuthenticated ? <Logout /> : <LoginModal />}
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
