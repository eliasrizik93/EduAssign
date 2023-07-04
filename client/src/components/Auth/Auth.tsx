import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { specialCharacters } from "../../common/Funcitons";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@mui/material";
const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
          color="primary"
          sx={{ margin: "16px 0" }}
        />
        asda
      </form>
    </div>
  );
};

export default Auth;
