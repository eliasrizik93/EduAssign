import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import MessagesPage from './Components/Messages/MessagesPage';
import SignIn from './Components/SignIn/SignIn';
import Home from './Components/Home/Home';
import PrivateRoute from './Components/route/PrivateRoute';

const App: React.FC = () => {
  const homePaths = ['', '/', '/home'];
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path='/messages' element={<MessagesPage />} />
          {homePaths.map((path, index) => (
            <Route key={index} path={path} element={<Home />} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default App;
