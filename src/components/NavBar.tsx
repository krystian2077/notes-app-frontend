import React from "react";
import { User } from "../models/user";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavBarLoggedInView } from "./NavBarLoggedInView";
import { NavBarLoggedOutView } from "./NavBarLoggedOutView";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

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
      <Navbar bg="success" variant="dark" expand="md" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className={styles.brandFontSize}>
            My Notes App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav>
              <Nav.Link as={Link} to="/privacy">
                Privacy
              </Nav.Link>
            </Nav>
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
