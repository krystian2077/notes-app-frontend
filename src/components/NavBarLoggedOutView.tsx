import React from "react";
import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

export const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button variant="success" onClick={onSignUpClicked}>
        Sign Up
      </Button>
      <Button variant="success" onClick={onLoginClicked}>
        Log In
      </Button>
    </>
  );
};
