import React from 'react';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
  },
}));

const SideBarMessages = () => {
  const classes = useStyles();

  return (
    <div className="sidebar__messages w-1/5 mr-2 ml-5">
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        className={classes.input}
      />

      <div className="h-full">Messages</div>
    </div>
  );
};

export default SideBarMessages;
