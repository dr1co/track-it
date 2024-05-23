import styled from "styled-components";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import GreyBG from "./Background.jsx";

export default function History() {
  return (
    <>
      <Header />
      <GreyBG />
      <Container>
        <Title> Histórico </Title>
        <Message>
          Em breve você poderá ver o histórico dos seus hábitos aqui!
        </Message>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  margin: 70px auto 101px auto;
  padding: 15px 20px;
`;

const Title = styled.h1`
  margin-bottom: 5px;
  font-size: 23px;
  color: #126ba5;
`;

const Message = styled.h2`
  margin-top: 15px;
  font-size: 18px;
  color: #666666;
  line-height: 1.2;
`;
