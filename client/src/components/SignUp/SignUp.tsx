import React, { useState } from 'react';
import {
  TextField,
  Button,
  Divider,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Fade,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { days, years } from '../../Common/Funcitons';
import { months } from '../../Common/Constants';
import { Gender } from '../../Common/TypesAndEnums';
import axios from 'axios';

type propsType = {
  isSignUpModalOpen: boolean;
  handleSignUpModal: (isOpen: boolean) => void;
};

days.unshift('Select Day');
years.unshift('Select Year');
months.unshift('Select Month');

const SignUp = (props: propsType) => {
  const { isSignUpModalOpen, handleSignUpModal } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [selectedDay, setSelectedDay] = useState<string | number>(days[0]);
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  const [selectedYear, setSelectedYear] = useState<string | number>(years[0]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState<
    string | null
  >(null);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordBlur = () => {
    setShowPassword(false);
  };

  const handleDayChange = (event: SelectChangeEvent<string | number>) => {
    setSelectedDay(event.target.value as string | number);
  };

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    setSelectedMonth(event.target.value as string);
  };

  const handleYearChange = (event: SelectChangeEvent<string | number>) => {
    setSelectedYear(event.target.value as string | number);
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const onlyLetters = /^[a-zA-Z\s]*$/;

    if (name === 'firstName') {
      if (onlyLetters.test(value)) {
        setFirstName(value);
        setFirstNameError(null);
      } else {
        setFirstNameError('Invalid input');
        setFirstName(value);
      }
    }

    if (name === 'lastName') {
      const onlyLetters = /^[a-zA-Z\s]*$/;
      if (onlyLetters.test(value)) {
        setLastName(value);
        setLastNameError(null);
      } else {
        setLastNameError('Invalid input');
        setLastName(value);
      }
    }

    if (name === 'phoneNumber') {
      if (isNaN(Number(value))) {
        setPhoneNumberError('Invalid input');
      } else {
        setPhoneNumberError(null);
      }
    }

    if (name === 'password') {
      if (value.length < 6 && value.length !== 0) {
        setPasswordError('Password should be more than 5 characters');
      } else {
        setPasswordError(null);
      }
      setPasswordSignUp(value);
    }

    if (name === 'confirmPassword') {
      if (value.length < 6 && value.length !== 0) {
        setPasswordConfirmError('Password should be more than 5 characters');
      } else if (value !== passwordSignUp) {
        setPasswordConfirmError('Password should be the same');
      } else {
        setPasswordConfirmError(null);
      }
      setConfirmPassword(value);
    }

    // Update the corresponding state
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(value) || value === '') {
        setEmail(value);
        setEmailError(null);
      } else {
        setEmailError('Invalid input');
        setEmail(value);
      }
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    }
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value as Gender);
  };

  const handleSignUp = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      selectedDay === days[0] ||
      selectedMonth === months[0] ||
      selectedYear === years[0]
    ) {
      setSignUpError('Some fields are Empty!');
    } else {
      setSignUpError(null);

      const payload = {
        email,
        firstName,
        lastName,
        phoneNumber,
        password: passwordSignUp,
        birthday: `${selectedYear}-${selectedMonth}-${selectedDay}`,
        gender,
      };

      try {
        const response = await axios.post(
          'http://localhost:3002/users/register',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = response.data;

        if (response.status === 201) {
          // Handle successful sign-up
          console.log('User signed up successfully:', data);
          handleModalClose();
        } else {
          // Handle error
          console.error('Sign-up error:', data);
          setSignUpError(data.message || 'Sign-up failed');
        }
      } catch (error) {
        console.error('Network error:', error);
        setSignUpError('Network error');
      }
    }
  };

  const handleModalClose = () => {
    handleSignUpModal(false);
    setSelectedDay(days[0]);
    setSelectedMonth(months[0]);
    setSelectedYear(years[0]);
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setPasswordSignUp('');
    setConfirmPassword('');
    setSignUpError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setPasswordError(null);
    setPasswordConfirmError(null);
    setEmail('');
    setGender(Gender.Male);
  };

  const getMenuItems = (items: (string | number)[]) =>
    items.map((item) => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ));

  const checkSignUpError = () => {
    if (!signUpError) return null;
    return (
      <div style={{ color: 'red' }} className='flex justify-center'>
        {signUpError}
      </div>
    );
  };

  const renderPasswordIcon = () => {
    return (
      <div
        onClick={handleTogglePasswordVisibility}
        style={{ cursor: 'pointer' }}
      >
        {passwordSignUp?.length > 0 ? (
          showPassword ? (
            <VisibilityOff />
          ) : (
            <Visibility />
          )
        ) : null}
      </div>
    );
  };

  return (
    <Dialog
      open={isSignUpModalOpen}
      onClose={handleSignUpModal}
      TransitionComponent={Fade}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <DialogTitle>
        Sign Up
        <IconButton
          aria-label='close'
          onClick={handleModalClose}
          style={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider
        variant='fullWidth'
        orientation='horizontal'
        style={{ width: '100%' }}
      />
      <DialogContent>
        {checkSignUpError()}
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <TextField
            label='First name'
            type='text'
            value={firstName}
            variant='outlined'
            onChange={handleInputChange}
            error={Boolean(firstNameError)}
            helperText={firstNameError}
            name='firstName'
          />
          <TextField
            label='Last name'
            type='text'
            value={lastName}
            variant='outlined'
            onChange={handleInputChange}
            error={Boolean(lastNameError)}
            helperText={lastNameError}
            name='lastName'
          />
        </div>
        <div className='grid grid-cols-1 gap-4 mb-4'>
          <TextField
            label='Email'
            type='email'
            value={email}
            variant='outlined'
            error={Boolean(emailError)}
            helperText={emailError}
            onChange={handleInputChange}
            name='email'
          />
          <TextField
            label='Phone number'
            type='text'
            value={phoneNumber}
            variant='outlined'
            onChange={handleInputChange}
            error={Boolean(phoneNumberError)}
            helperText={phoneNumberError}
            name='phoneNumber'
          />
          <TextField
            label='Password'
            type={showPassword ? 'text' : 'password'}
            value={passwordSignUp}
            variant='outlined'
            onChange={(e) => handleInputChange(e)}
            onBlur={handlePasswordBlur}
            error={Boolean(passwordError)}
            helperText={passwordError}
            InputProps={{
              endAdornment: renderPasswordIcon(),
            }}
            name='password'
          />
          <TextField
            label='Confirm Password'
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            variant='outlined'
            error={Boolean(passwordConfirmError)}
            helperText={passwordConfirmError}
            onChange={(e) => handleInputChange(e)}
            onBlur={handlePasswordBlur}
            name='confirmPassword'
          />
        </div>
        <div className='grid grid-cols-3 gap-4 mb-4'>
          <FormControl variant='outlined'>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              label='Month'
              style={{ height: '2.5rem', padding: '0.25rem' }}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                MenuListProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              {getMenuItems(months)}
            </Select>
          </FormControl>
          <FormControl variant='outlined'>
            <InputLabel>Day</InputLabel>
            <Select
              value={selectedDay}
              onChange={handleDayChange}
              label='Day'
              style={{ height: '2.5rem', padding: '0.25rem' }}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                MenuListProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              {getMenuItems(days)}
            </Select>
          </FormControl>
          <FormControl variant='outlined'>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              label='Year'
              style={{ height: '2.5rem', padding: '0.25rem' }}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                MenuListProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              {getMenuItems(years)}
            </Select>
          </FormControl>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <FormControl component='fieldset'>
            <FormLabel component='legend' style={{ color: 'black' }}>
              Gender
            </FormLabel>
            <RadioGroup
              name='gender'
              value={gender}
              onChange={handleGenderChange}
            >
              <div className='grid grid-cols-2 gap-4'>
                <FormControlLabel
                  value='Male'
                  control={<Radio color='primary' />}
                  label='Male'
                  className='col-span-1'
                />
                <FormControlLabel
                  value='Female'
                  control={<Radio color='primary' />}
                  label='Female'
                  className='col-span-1'
                />
              </div>
            </RadioGroup>
          </FormControl>
        </div>
        <div className='flex justify-center mb-2'>
          <Button
            variant='contained'
            className='w-1/3'
            style={{
              backgroundColor: 'green',
              color: 'white',
              marginTop: '1rem',
            }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
