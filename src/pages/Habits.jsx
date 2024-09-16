import axios from "axios";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import GreyBG from "../components/Background.jsx";
import Loader from "../components/Loader.jsx";

import UserContext from "../contexts/UserContext.js";

import { apiAddress } from "../api/apiAddress.js";

import trash from "../assets/media/trashicon.png";

export default function Habits() {
  const [habitCreation, setHabitCreation] = useState(false);
  const [habitList, setHabitList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [habit, setHabit] = useState({
    name: "",
    days: [],
  });

  const { user } = useContext(UserContext);

  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

  function toggleHabitCreation() {
    if (habitCreation) {
      setHabitCreation(false);
    } else {
      setHabitCreation(true);
    }
  }

  function getHabits() {
    const promise = axios.get(`${apiAddress}/habits`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    promise.then((res) => {
      setHabitList(res.data);
    });
  }

  function postHabit() {
    if (habit.name !== "" && habit.days.length > 0) {
      setDisabled(true);
      const request = axios.post(`${apiAddress}/habits`, habit, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      request.then(() => {
        setHabit({
          name: "",
          days: [],
        });
        setHabitCreation(false);
        setDisabled(false);
        getHabits();
      });
      request.catch((err) => {
        alert("Erro. Tente novamente!");
        setDisabled(false);
        console.log(err);
      });
    }
  }

  function deleteHabit(id) {
    let confirmation = window.confirm(
      "Tem certeza que deseja deletar este hábito? (essa ação não pode ser desfeita!"
    );
    if (confirmation) {
      setDisabled(true);
      const request = axios.delete(`${apiAddress}/habits/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      request.then(() => {
        setDisabled(false);
        getHabits();
      });
      request.catch((err) => {
        console.log(err.response.status);
        setDisabled(false);
      });
    }
  }

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <>
      <Header />
      <GreyBG />
      <Container>
        <Title>
          <h1> Meus hábitos </h1>
          <CreateHabit onClick={toggleHabitCreation}> + </CreateHabit>
        </Title>
        <HabitForm display={habitCreation ? "block" : "none"}>
          <InputHabit
            type="text"
            placeholder="nome do hábito"
            value={habit.name}
            onChange={(e) => setHabit({ ...habit, name: e.target.value })}
            disabled={disabled}
            color={disabled ? "#DBDBDB" : "#666666"}
          />
          <Weekdays>
            {weekdays.map((day, index) => (
              <SelectWeekday
                key={index}
                day={day}
                number={index}
                habit={habit}
                setHabit={setHabit}
                disabled={disabled}
              />
            ))}
          </Weekdays>
          <ActionButtons>
            <Cancel onClick={toggleHabitCreation} disabled={disabled}>
              {" "}
              Cancelar{" "}
            </Cancel>
            <Save
              onClick={postHabit}
              disabled={disabled}
              opacity={disabled ? "0.5" : "1"}
              cursor={disabled ? "default" : "pointer"}
            >
              {" "}
              {disabled ? <Loader /> : "Salvar"}{" "}
            </Save>
          </ActionButtons>
        </HabitForm>
        <HabitList
          habitList={habitList}
          weekdays={weekdays}
          deleteHabit={deleteHabit}
          disabled={disabled}
        />
      </Container>
      <Footer />
    </>
  );
}

function SelectWeekday({ day, number, habit, setHabit, disabled }) {
  const array = habit.days;

  function toggleDay(i) {
    if (array.includes(i)) {
      setHabit({ ...habit, days: array.filter((a) => a !== i) });
    } else {
      array.push(i);
      setHabit({ ...habit, days: array });
    }
  }

  if (array.includes(number)) {
    return (
      <Day
        backgroundcolor="#CFCFCF"
        color="#FFFFFF"
        onClick={() => toggleDay(number)}
        disabled={disabled}
        cursor={disabled ? "default" : "pointer"}
      >
        {day}
      </Day>
    );
  } else {
    return (
      <Day
        backgroundcolor="#FFFFFF"
        color="#D4D4D4"
        onClick={() => toggleDay(number)}
        disabled={disabled}
        cursor={disabled ? "default" : "pointer"}
      >
        {day}
      </Day>
    );
  }
}

function HabitList({ habitList, weekdays, deleteHabit, disabled }) {
  if (habitList.length === 0) {
    return (
      <HabitContainer>
        <p>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a Trackear!
        </p>
      </HabitContainer>
    );
  } else {
    return (
      <HabitContainer>
        {habitList.map((elem, index) => (
          <Habit
            habit={elem}
            key={index}
            weekdays={weekdays}
            deleteHabit={deleteHabit}
            disabled={disabled}
          />
        ))}
      </HabitContainer>
    );
  }
}

function Habit({ habit, weekdays, deleteHabit, disabled }) {
  return (
    <HabitCard cursor={disabled ? "default" : "pointer"}>
      <h1> {habit.name} </h1>
      <Weekdays>
        {weekdays.map((day, index) => (
          <Weekday key={index} day={day} days={habit.days} number={index} />
        ))}
      </Weekdays>
      <img
        src={trash}
        alt="delete"
        onClick={() => deleteHabit(habit.id)}
        disabled={disabled}
      />
    </HabitCard>
  );
}

function Weekday({ day, days, number }) {
  if (days.includes(number)) {
    return (
      <Day backgroundcolor="#CFCFCF" color="#FFFFFF">
        {day}
      </Day>
    );
  } else {
    return (
      <Day backgroundcolor="#FFFFFF" color="#D4D4D4">
        {day}
      </Day>
    );
  }
}

const Container = styled.div`
  margin: 70px auto 101px auto;
  padding: 15px 20px;
`;

const Title = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 23px;
    color: #126ba5;
  }
`;

const CreateHabit = styled.div`
  width: 40px;
  height: 35px;
  padding-bottom: 2.5px;
  background-color: #52b6ff;
  border: 0 solid transparent;
  border-radius: 5px;
  font-size: 27px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HabitForm = styled.div`
  width: 100%;
  height: 180px;
  padding: 18px;
  margin: 10px auto;
  background: #ffffff;
  border-radius: 5px;
  position: relative;
  display: ${(props) => props.display};
`;

const InputHabit = styled.input`
  width: 100%;
  height: 45px;
  background: transparent;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  padding: 10px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 20px;
  color: ${(props) => props.color};

  &::placeholder {
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    color: #dbdbdb;
  }
`;

const Weekdays = styled.div`
  width: 100%;
  display: flex;
`;

const Day = styled.div`
  width: 30px;
  height: 30px;
  margin: 8px 2px 0 2px;
  background-color: ${(props) => props.backgroundcolor};
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-size: 20px;
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => props.cursor};
`;

const HabitContainer = styled.div`
  width: 100%;
  margin: 5px auto;
  display: flex;
  flex-direction: column;

  p {
    font-size: 18px;
    color: #666666;
    line-height: 1.2;
  }
`;

const HabitCard = styled.div`
  width: 100%;
  min-height: 91px;
  height: fit-content;
  margin: 5px auto;
  padding: 14px;
  background-color: #ffffff;
  border-radius: 5px;
  position: relative;

  h1 {
    width: 94%;
    font-size: 20px;
    color: #666666;
    margin-bottom: 5px;
  }

  img {
    width: 13px;
    position: absolute;
    top: 14px;
    right: 14px;
    cursor: ${(props) => props.cursor};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 18px;
  right: 18px;
`;

const Cancel = styled.p`
  font-size: 16px;
  color: #52b6ff;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Save = styled.button`
  width: 84px;
  height: 35px;
  background-color: #52b6ff;
  opacity: ${(props) => props.opacity};
  border: 0px solid transparent;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 16px;
  color: #ffffff;
  cursor: ${(props) => props.cursor};
`;
