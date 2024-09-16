import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/css/reset.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Habits from "./pages/Habits.jsx";
import Today from "./pages/Today.jsx";
import History from "./pages/History.jsx";

import UserContext from "./contexts/UserContext.js";
import PercentContext from "./contexts/PercentContext.js";

function App() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    image: "",
    email: "",
    password: "",
    token: "",
  });
  const [percent, setPercent] = useState(0);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <PercentContext.Provider value={{ percent, setPercent }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/habitos" element={<Habits />} />
            <Route path="/hoje" element={<Today />} />
            <Route path="/historico" element={<History />} />
          </Routes>
        </PercentContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
