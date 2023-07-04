import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import MessagesPage from "./components/Messages/MessagesPage";
import Auth from "./components/Auth/Auth";

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
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
