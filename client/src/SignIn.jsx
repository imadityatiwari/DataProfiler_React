/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import testImage from "./Assets/girikon-logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { login } from "../redux/actions/auth";
// import { connect } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://girikon.ai/">
        Girikon AI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignIn = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [localStorage.getItem("token")]);

  const defaultTheme = createTheme();
  const [username, setUsername] = useState("mail@example.com");
  const [password, setPassword] = useState("P@$w0rd`");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  const handleLogin = async (data) => {
    console.log("Logging in with:", data);
    try {
      const res = await axios.post("http://localhost:5000/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Success:", res.data);
    } catch (err) {
      console.error("Login Error:", err.response?.data);
    }
  };

  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={testImage}
              alt="Logo"
              style={{ width: "150px", height: "50px", marginBottom: 15 }}
            />
            <Typography
              component="h1"
              variant="h5"
              style={{ color: "grey", fontSize: "24px" }}
            >
              Sign in to continue
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                onChange={handleUsernameChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={navigateToForgotPassword} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            //backgroundImage: `url(${testImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[300]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

// const mapStateToProps = (state) => ({
//   usersDataList: state.users,
//   auth: state.auth,
// });

// const mapDispatchToProps = {
//   login,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
export default SignIn;
