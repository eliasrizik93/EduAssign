import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import GroupsCenter from '../GroupsCenter';

const Home: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/SignIn');
    }
  }, [isAuthenticated, navigate]);

  return <GroupsCenter />;
};
export default Home;
