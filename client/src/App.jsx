/* eslint-disable no-unused-vars */

// import React, { useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Link,
//   Alert,
//   Avatar,
// } from "@mui/material";
// import LockIcon from "@mui/icons-material/Lock";

// function App() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [message, setMessage] = useState("");

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post("http://localhost:5000/signup", data);
//       setMessage({ type: "success", text: res.data.message });
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: err.response?.data?.message || "Error signing up",
//       });
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box display="flex" justifyContent="center" mt={8}>
//         <Card
//           sx={{
//             padding: 3,
//             boxShadow: 3,
//             maxWidth: 450,
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <CardContent>
//             <Box display="flex" justifyContent="center" mb={2}>
//               <Avatar sx={{ bgcolor: "purple" }}>
//                 <LockIcon />
//               </Avatar>
//             </Box>
//             <Typography variant="h5" align="center" gutterBottom>
//               Sign up
//             </Typography>
//             {message && (
//               <Alert severity={message.type} sx={{ mb: 2 }}>
//                 {message.text}
//               </Alert>
//             )}
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <TextField
//                     fullWidth
//                     label="First Name *"
//                     variant="outlined"
//                     {...register("firstName", {
//                       required: "First Name is required",
//                     })}
//                     error={!!errors.firstName}
//                     helperText={errors.firstName?.message}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     fullWidth
//                     label="Last Name *"
//                     variant="outlined"
//                     {...register("lastName", {
//                       required: "Last Name is required",
//                     })}
//                     error={!!errors.lastName}
//                     helperText={errors.lastName?.message}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Email Address *"
//                     type="email"
//                     variant="outlined"
//                     {...register("email", {
//                       required: "Email is required",
//                       pattern: {
//                         value:
//                           /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                         message: "Invalid email format",
//                       },
//                     })}
//                     error={!!errors.email}
//                     helperText={errors.email?.message}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Organization Name *"
//                     variant="outlined"
//                     {...register("organization", {
//                       required: "Organization Name is required",
//                     })}
//                     error={!!errors.organization}
//                     helperText={errors.organization?.message}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Password *"
//                     type="password"
//                     variant="outlined"
//                     {...register("password", {
//                       required: "Password is required",
//                       minLength: {
//                         value: 6,
//                         message: "Password must be at least 6 characters",
//                       },
//                     })}
//                     error={!!errors.password}
//                     helperText={errors.password?.message}
//                   />
//                 </Grid>
//               </Grid>
//               <Box mt={3}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                 >
//                   SIGN UP
//                 </Button>
//               </Box>
//             </form>
//             <Box mt={2} textAlign="center">
//               <Typography variant="body2">
//                 Already have an account? <Link href="#">Sign in</Link>
//               </Typography>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </Container>
//   );
// }

// export default App;

// ------------------------------------------------------------------------
// import * as React from "react";
// import { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// // import { connect } from "react-redux";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
// import { useNavigate } from "react-router-dom";

// import { Link as RouterLink } from "react-router-dom";
// import axios from "axios";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://girikon.ai/">
//         Girikon AI
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const defaultTheme = createTheme();

// // eslint-disable-next-line react/prop-types
// const SignUp = ({ auth }) => {
//   const navigate = useNavigate();
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [message, setMessage] = useState({ type: "", text: "" });

//   const handleUsernameChange = (event) => {
//     setEmailError("");
//   };

//   const handlePasswordChange = (event) => {
//     setPasswordError("");
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(data.get("email"))) {
//       setEmailError("Please enter a valid email address.");
//       return;
//     }

//     if (!validatePassword(data.get("password"))) {
//       setPasswordError(
//         "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long."
//       );
//       return;
//     }

//     const userData = {
//       firstName: data.get("firstName"),
//       lastName: data.get("lastName"),
//       email: data.get("email"),
//       org_name: data.get("org_name"),
//       password: data.get("password"),
//     };

//     try {
//       const res = await axios.post("http://localhost:5000/signup", userData);
//       setMessage({ type: "success", text: res.data.message });

//       setTimeout(() => {
//         navigate("/signin");
//       }, 2000);
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: err.response?.data?.message || "Error signing up",
//       });
//     }
//   };

//   const validatePassword = (password) => {
//     const passwordPattern =
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordPattern.test(password);
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: "100vh" }}>
//         <CssBaseline />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign up
//             </Typography>
//             {message.text && (
//               <Typography
//                 color={message.type === "success" ? "green" : "red"}
//                 sx={{ mt: 2 }}
//               >
//                 {message.text}
//               </Typography>
//             )}
//             <Box
//               component="form"
//               noValidate
//               onSubmit={handleSubmit}
//               sx={{ mt: 3 }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="given-name"
//                     name="firstName"
//                     required
//                     fullWidth
//                     id="firstName"
//                     label="First Name"
//                     autoFocus
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="lastName"
//                     label="Last Name"
//                     name="lastName"
//                     autoComplete="family-name"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     onChange={handleUsernameChange}
//                     error={!!emailError}
//                     autoComplete="email"
//                     helperText={emailError}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="org_name"
//                     label="Organization Name"
//                     name="org_name"
//                     autoComplete="org_name"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     onChange={handlePasswordChange}
//                     autoComplete="new-password"
//                     error={!!passwordError}
//                     helperText={passwordError}
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign Up
//               </Button>
//               <Grid container justifyContent="flex-end">
//                 <Grid item>
//                   <Link component={RouterLink} to="/signin" variant="body2">
//                     Already have an account? Sign in
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//           <Copyright sx={{ mt: 5 }} />
//         </Grid>
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundRepeat: "no-repeat",
//             backgroundColor: (t) =>
//               t.palette.mode === "light"
//                 ? t.palette.grey[300]
//                 : t.palette.grey[900],
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//       </Grid>
//     </ThemeProvider>
//   );
// };

// // const mapStateToProps = (state) => ({
// //   auth: state.auth,
// // });

// export default SignUp;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
