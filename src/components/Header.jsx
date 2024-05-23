import styled from "styled-components";
import { useContext } from "react";

import logo from "../assets/media/trackit.png";
import UserContext from "../contexts/UserContext.js";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Logo src={logo} />
      <UserImage src={user.image} />
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  height: 70px;
  padding: 0 18px;
  background-color: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 2;
`;

const Logo = styled.img`
  width: 97px;
`;

const UserImage = styled.img`
  width: 51px;
  height: 51px;
  object-fit: cover;
  border-radius: 50%;
`;
