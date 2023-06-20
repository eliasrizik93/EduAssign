import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Messages from "./components/Messages/Messages";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </>
  );
};

export default App;
