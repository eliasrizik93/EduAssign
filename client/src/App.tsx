import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import MessagesPage from './components/Messages/MessagesPage';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import PrivateRoute from './components/route/PrivateRoute';

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
