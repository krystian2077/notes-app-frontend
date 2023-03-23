import React from "react";
import { User } from "../models/user";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavBarLoggedInView } from "./NavBarLoggedInView";
import { NavBarLoggedOutView } from "./NavBarLoggedOutView";

interface NavBarProps {
  loggedInUser?: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

export const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
        <Container>
          <Navbar.Brand>My Notes App</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              {loggedInUser ? (
                <NavBarLoggedInView
                  user={loggedInUser}
                  onLogoutSuccessful={onLogoutSuccessful}
                />
              ) : (
                <NavBarLoggedOutView
                  onLoginClicked={onLoginClicked}
                  onSignUpClicked={onSignUpClicked}
                />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};