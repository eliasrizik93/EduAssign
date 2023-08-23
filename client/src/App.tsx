import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import MessagesPage from "./components/Messages/MessagesPage";
import SignIn from "./components/SignIn/SignIn";

const App: React.FC = () => {
  const homePaths = ["", "/", "/home"];
  return (
    <>
      <NavBar />
      <Routes>
        {homePaths.map((path, index) => (
          <Route key={index} path={path} element={<> </>} />
        ))}
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
