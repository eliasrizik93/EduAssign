// GoogleButton.tsx
import React from 'react';
import './GoogleButton.scss';
import { Button } from 'react-bootstrap';
import GoogleIcon from '@mui/icons-material/Google';

type GoogleButtonProps = {
  onClick: () => void;
};

const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick }) => {
  return (
    <Button className='googleButton' onClick={onClick}>
      <GoogleIcon className='googleIcon' />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
