import React, { useState, useEffect } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.scss'; // Import SCSS file
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { signOut } from '../../redux/thunks/authThunks';
type IconType = 'home' | 'messages' | 'notifications';

interface IconWrapperProps {
  name: IconType;
  Icon: typeof HomeOutlinedIcon;
  clickedIcon: IconType | null;
  setClickedIcon: React.Dispatch<React.SetStateAction<IconType | null>>;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  name,
  Icon,
  clickedIcon,
  setClickedIcon,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.substring(1) as IconType;
    setClickedIcon(path || 'home');
  }, [location, setClickedIcon]);

  const onClick = () => {
    setClickedIcon(name);
    navigate(`/${name}`);
  };

  return (
    <button
      onClick={onClick}
      className={`w-1/3 flex justify-center items-center cursor-pointer relative ${
        clickedIcon === name ? 'divClicked' : ''
      }`}
      data-testid={`${name}-icon`}
    >
      <div className='rounded-lg flex items-center hover:bg-gray-200 w-5/6 h-5/6 p-0 m-0 justify-center'>
        <Icon className={clickedIcon === name ? 'iconClicked' : 'icon'} />
      </div>
    </button>
  );
};

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [clickedIcon, setClickedIcon] = useState<IconType | null>(null);
  const ICONS: Record<IconType, typeof HomeOutlinedIcon> = {
    home: HomeOutlinedIcon,
    messages: MessageOutlinedIcon,
    notifications: NotificationsNoneIcon,
  };
  const isAuthenticated = useSelector(
    (store: RootState) => store.auth.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(signOut());
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/SignIn');
  };
  return (
    <nav className='w-full h-10 mdh-14 lg:h-16 text-zinc-50 bg-white flex'>
      <button
        className='h-full ml-10 text-sky-700 font-bold text-2xl w-1/3 flex items-center'
        onClick={() => navigate('/')}
      >
        EduAssign
      </button>
      <div className='h-full flex-1 flex justify-center text-zinc-500 w-1/3'>
        {Object.entries(ICONS).map(([name, Icon]) => (
          <IconWrapper
            key={name}
            name={name as IconType}
            Icon={Icon}
            clickedIcon={clickedIcon}
            setClickedIcon={setClickedIcon}
          />
        ))}
      </div>
      <div className='h-full text-zinc-500 w-1/3 flex justify-end mr-10 items-center'>
        {isAuthenticated ? (
          <Button
            data-testid='logout'
            variant='outlined'
            className='roundedButton'
            onClick={handleLogout}
          >
            <PersonOutlineIcon className='logoutIcon' />
            <span className='ml-2 signInText'>Logout</span>
          </Button>
        ) : (
          <Button
            data-testid='Sign-in'
            variant='outlined'
            className='roundedButton'
            onClick={handleSignIn}
          >
            <PersonOutlineIcon className='signInIcon' />
            <span className='ml-2 signInText'>Sign in</span>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
