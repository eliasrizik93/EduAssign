import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { specialCharacters } from "../../common/Funcitons";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Divider, InputLabel, MenuItem, Select } from "@mui/material";
import {
  Fade,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
type Gender = "male" | "female";

const days: any = Array.from({ length: 31 }, (_, index) => index + 1);
const months: any = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const years: any = Array.from({ length: 120 }, (_, index) => 2023 - index);
days.unshift("Select Day");
years.unshift("Select Year");
months.unshift("Select Month");
const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [handleOpen, setHandleOpen] = useState<boolean>(false);
  const [gender, setGender] = useState<Gender>("male");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleChange = (event: any) => {
    setGender(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (specialCharacters.test(value) || value === "") {
      setError(false);
    } else {
      setError(true);
    }
    setUsername(value);
  };
  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
  const handlePasswordBlur = () => {
    setShowPassword(false);
  };
  const handleDayChange = (event: any) => {
    setSelectedDay(event.target.value);
  };

  const handleMonthChange = (event: any) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white h-1/2 w-1/4 shadow-xl rounded  flex flex-col space-y-5 p-12 flex justify-center items-center ">
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
          className="mb-4 w-full"
        />
        {error && <span className="text-red-500">Invalid username</span>}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full"
          onBlur={handlePasswordBlur}
          InputProps={{
            endAdornment: (
              <div
                onClick={handleTogglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full"
        >
          Submit
        </Button>
        <Typography variant="body2" style={{ color: "#1877f1" }}>
          <Link to="/forgot-password">Forgot Your Password?</Link>
        </Typography>
        <Divider
          variant="fullWidth"
          orientation="horizontal"
          style={{ width: "100%" }}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "green", color: "white" }}
          onClick={() => setHandleOpen(true)}
        >
          Sign Up
        </Button>
        <Dialog
          open={handleOpen}
          onClose={() => setHandleOpen(false)}
          TransitionComponent={Fade}
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <DialogTitle>
            Sign Up
            <IconButton
              aria-label="close"
              onClick={() => {
                setHandleOpen(false);
              }}
              style={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider
            variant="fullWidth"
            orientation="horizontal"
            style={{ width: "100%" }}
          />
          <DialogContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <TextField
                label="First name"
                type="text"
                value={username}
                variant="outlined"
              />
              <TextField
                label="Last name"
                type={"text"}
                value={password}
                variant="outlined"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <TextField
                label="Email"
                type="email"
                value={password}
                variant="outlined"
              />
              <TextField
                label="Phone number"
                type="email"
                value={password}
                variant="outlined"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                variant="outlined"
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={password}
                variant="outlined"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <FormControl variant="outlined">
                <InputLabel>Month</InputLabel>
                <Select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  label="Month"
                  style={{
                    height: "2.5rem",
                    padding: "0.25rem",
                  }}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    MenuListProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {months.map((month: any) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel>Day</InputLabel>
                <Select
                  value={selectedDay}
                  onChange={handleDayChange}
                  label="Day"
                  style={{
                    height: "2.5rem",
                    padding: "0.25rem",
                  }}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    MenuListProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {days.map((day: any) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  label="Year"
                  style={{
                    height: "2.5rem",
                    padding: "0.25rem",
                  }}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    MenuListProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {years.map((year: any) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormControl component="fieldset">
                <FormLabel component="legend" style={{ color: "black" }}>
                  Gender
                </FormLabel>
                <RadioGroup
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormControlLabel
                      value="male"
                      control={<Radio color="primary" />}
                      label="Male"
                      className="col-span-1"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio color="primary" />}
                      label="Female"
                      className="col-span-1"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex justify-center mb-2">
              <Button
                variant="contained"
                className="w-1/3"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  marginTop: "1rem",
                }}
              >
                Sign Up
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
};

export default Auth;
