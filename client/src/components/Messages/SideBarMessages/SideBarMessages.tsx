import React, { ChangeEvent, useState } from 'react';
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
  },
  searchIcon: {
    color: theme.palette.action.active,
  },
  focused: {
    color: theme.palette.primary.main,
  },
  labelContainer: {
    '&$labelFocused': {
      fontWeight: 'bold',
    },
  },
  labelFocused: {},
  errorMessage: {
    color:'red'
  }
}));

const REGEX_CHECK = /\d|[^\w\s]/ //No numbers or special characters

const SideBarMessages = () => {
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [errorMessage, setErrormessage] = useState<string>('')
  const classes = useStyles();

  const handleInputFocus = () => {
    setInputIsFocused(true)
  }
  const handleInputBlur = () => {
    setInputIsFocused(false)
  }
  const checkSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchValue(value)
    if (REGEX_CHECK.test(value)) {
      setErrormessage('Invalid input')
    } else {
      setErrormessage('')
    }
  }

  return (
    <div className="w-1/5 pr-2 pl-5 pt-3">
      <TextField
        id="standard-basic"
        label="Search"
        variant="standard"
        className={classes.input}
        value={searchValue}
        onChange={checkSearchValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        InputProps={{
          endAdornment: (
            <SearchIcon className={`${classes.searchIcon} ${inputIsFocused && classes.focused}`} />
          ),
        }}
        InputLabelProps={{
          classes: {
            root: classes.labelContainer,
            focused: classes.labelFocused,
          },
        }}
      />
      {errorMessage?.length > 0 && <div className={classes.errorMessage}>{errorMessage}</div>}
      <div className="h-full">Messages</div>
    </div>
  );
};

export default SideBarMessages;
