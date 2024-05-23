import React, { useState } from 'react';
import { TextField, Button, Typography, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import './SignIn.scss';

type Credentials = { email: string; password: string };

const SignIn = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const handleSignUp = (isOpen: boolean) => setIsSignUpOpen(isOpen);

  const resetPasswordVisibility = () => setShowPassword(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const renderPasswordToggleIcon = () => {
    if (credentials.password.length > 0) return null;
    return (
      <div
        onClick={togglePasswordVisibility}
        className='password-toggle-icon'
        style={{ cursor: 'pointer' }}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </div>
    );
  };

  const handleSignIn = () => {
    // Handle sign-in logic
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form className='bg-white h-1/2 w-1/4 shadow-xl rounded  flex flex-col space-y-5 p-12 flex justify-center items-center '>
        <Typography variant='h4' className='signin-label'>
          Sign In
        </Typography>
        <TextField
          label='Email'
          variant='outlined'
          value={credentials.email}
          onChange={handleInputChange}
          className='mb-4 w-full'
          type='email'
          name='email'
        />
        <TextField
          label='Password'
          type={showPassword ? 'text' : 'password'}
          value={credentials.password}
          variant='outlined'
          onChange={handleInputChange}
          className='mb-4 w-full'
          onBlur={resetPasswordVisibility}
          InputProps={{
            endAdornment: renderPasswordToggleIcon(),
          }}
          name='password'
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className='w-full'
          onClick={handleSignIn}
        >
          Submit
        </Button>
        <Typography variant='body2' style={{ color: '#1877f1' }}>
          <Link to='/forgot-password'>Forgot Your Password?</Link>
        </Typography>
        <Divider
          variant='fullWidth'
          orientation='horizontal'
          style={{ width: '100%' }}
        />
        <Button
          variant='contained'
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={() => handleSignUp(true)}
        >
          Sign Up
        </Button>
        {isSignUpOpen && (
          <SignUp
            isSignUpModalOpen={isSignUpOpen}
            handleSignUpModal={handleSignUp}
          />
        )}
      </form>
    </div>
  );
};

export default SignIn;
