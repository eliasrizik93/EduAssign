import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import './SidebarSearch.scss';

const REGEX_CHECK = /\d|[^\w\s]/; // No numbers or special characters

type Props = {
  handleSearch: (userName: string) => void;
};

const SidebarSearch: React.FC<Props> = ({ handleSearch }) => {
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputFocus = () => {
    setInputIsFocused(true);
  };

  const handleInputBlur = () => {
    setInputIsFocused(false);
  };

  const checkSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    if (REGEX_CHECK.test(value)) {
      setErrorMessage('Invalid input');
      return;
    }
    setErrorMessage('');
    handleSearch(value);
  };

  return (
    <>
      <TextField
        id='standard-basic'
        label='Search'
        variant='standard'
        className='input'
        value={searchValue}
        onChange={checkSearchValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        InputProps={{
          endAdornment: (
            <SearchIcon
              className={`searchIcon ${inputIsFocused ? 'focused' : ''}`}
            />
          ),
        }}
        InputLabelProps={{
          classes: {
            root: 'labelContainer',
            focused: 'labelFocused',
          },
        }}
      />
      {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
    </>
  );
};

export default SidebarSearch;
