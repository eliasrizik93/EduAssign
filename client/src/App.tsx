import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import MessagesPage from "./components/Messages/MessagesPage";

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
      </Routes>
    </>
  );
};

export default App;
