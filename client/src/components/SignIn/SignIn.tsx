import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { login } from '../../redux/thunks/authThunks';
import './SignIn.scss';

type Credentials = { email: string; password: string };

const SignIn: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      login({ email: credentials.email, password: credentials.password })
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const renderPasswordToggleIcon = () => {
    if (credentials.password.length === 0) return null;
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

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        className='bg-white h-1/2 w-1/4 shadow-xl rounded flex flex-col space-y-5 p-12 justify-center items-center'
        onSubmit={handleSignIn}
      >
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
          InputProps={{ endAdornment: renderPasswordToggleIcon() }}
          name='password'
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className='w-full'
          disabled={loading}
        >
          Submit
        </Button>
        {error && <Typography color='error'>{error}</Typography>}
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
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
