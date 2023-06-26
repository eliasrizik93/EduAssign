import React, { ChangeEvent, useState } from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },
  searchIcon: {
    color: theme.palette.action.active,
  },
  focused: {
    color: theme.palette.primary.main,
  },
  labelContainer: {
    "&$labelFocused": {
      fontWeight: "bold",
    },
  },
  labelFocused: {},
  errorMessage: {
    color: red[500],
  },
}));

const REGEX_CHECK = /\d|[^\w\s]/; // No numbers or special characters

type propsTypes = {
  handleSearch: (userName: string) => void;
};

const SidebarSearch = (props: propsTypes) => {
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const classes = useStyles();

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
      setErrorMessage("Invalid input");
      return;
    }
    setErrorMessage("");
    props.handleSearch(value);
  };

  return (
    <>
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
            <SearchIcon
              className={`${classes.searchIcon} ${
                inputIsFocused && classes.focused
              }`}
            />
          ),
        }}
        InputLabelProps={{
          classes: {
            root: classes.labelContainer,
            focused: classes.labelFocused,
          },
        }}
      />
      {errorMessage && (
        <div className={classes.errorMessage}>{errorMessage}</div>
      )}
    </>
  );
};
export default SidebarSearch;
