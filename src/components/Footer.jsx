import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Link } from "react-router-dom";

import UserContext from "../contexts/UserContext.js";
import PercentContext from "../contexts/PercentContext.js";

import { apiAddress } from "../api/apiAddress.js";

import "../assets/css/progressbar.css";

export default function Footer() {
  const { user } = useContext(UserContext);
  const { percent, setPercent } = useContext(PercentContext);

  useEffect(() => {
    const promise = axios.get(`${apiAddress}/habits/today`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    promise.then((res) => {
      const doneList = res.data.filter((elem) => elem.done === true);
      const num = Math.round((doneList.length * 100) / res.data.length);
      setPercent(num);
    });
  }, [setPercent, user.token]);

  return (
    <Container>
      <StyledLink to="/habitos">
        <h1> Hábitos </h1>
      </StyledLink>
      <StyledLink to="/hoje">
        <Progress>
          <p> Hoje </p>
          <CircularProgressbar value={percent} />
        </Progress>
      </StyledLink>
      <StyledLink to="/historico">
        <h1> Histórico </h1>
      </StyledLink>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 35px;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 2;

  h1 {
    font-size: 18px;
    color: #52b6ff;
  }

  h1:hover {
    text-decoration: underline;
  }
`;

const Progress = styled.div`
  width: 90px;
  height: 90px;
  background-color: #52b6ff;
  border-radius: 50%;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);

  p {
    font-size: 18px;
    color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
