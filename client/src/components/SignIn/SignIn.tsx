import React, { useState } from "react";
import { TextField, Button, Typography, Divider } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { Link } from "react-router-dom";
import SignUp from "../SignUp/SignUp";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const handleSignUp = (isOpen: boolean) => {
    setIsSignUpOpen(isOpen);
  };
  const handlePasswordBlur = () => {
    setShowPassword(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = () => {
    // Handle sign-in logic
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white h-1/2 w-1/4 shadow-xl rounded  flex flex-col space-y-5 p-12 flex justify-center items-center ">
        <label
          htmlFor="sign-in-section"
          className="sign-in-label text-4xl mb-3"
        >
          Sign In
        </label>
        <TextField
          label="Email"
          variant="outlined"
          value={credentials.email}
          onChange={handleInputChange}
          className="mb-4 w-full"
          type="email"
          name="email"
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={credentials.password}
          variant="outlined"
          onChange={handleInputChange}
          className="mb-4 w-full"
          onBlur={handlePasswordBlur}
          InputProps={{
            endAdornment: (
              <>
                {credentials.password.length > 0 && (
                  <div
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </div>
                )}
              </>
            ),
          }}
          name="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full"
          onClick={handleSignIn}
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
