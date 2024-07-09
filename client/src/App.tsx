import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn';
import NavBar from './Components/NavBar/NavBar';
import PrivateRoute from './Components/route/PrivateRoute';
import MessagesPage from './Components/Messages/MessagesPage';
import GroupDetails from './Components/GroupsCenter/GroupDetails';
import GroupsCenter from './Components/GroupsCenter';

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
          <Route path='/groups' element={<GroupsCenter />} />
          <Route path='/groups/:id' element={<GroupDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
