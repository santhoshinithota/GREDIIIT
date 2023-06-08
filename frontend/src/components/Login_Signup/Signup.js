import * as React from 'react';
import { Button, CssBaseline, TextField, Box, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const theme = createTheme();

export default function Signup () {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    age: "",
    contactNo: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const allFieldsHaveValue = Object.values(formData).every(Boolean);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await api.post("/api/auth/signup", formData);

      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("isAuthenticated", "true");
      api.defaults.headers.common['x-auth-token'] = res.data.token;

      navigate("/");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              autoFocus
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="age"
              label="Age"
              type="number"
              id="age"
              autoComplete="age"
              value={formData.age}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contactNo"
              label="Mobile No."
              type="tel"
              id="contactNo"
              autoComplete="tel"
              value={formData.contactNo}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="username"
              autoFocus
              value={formData.userName}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: 'white', bgcolor: 'orangered', '&:hover': { bgcolor: 'orangered' } }}
              disabled={!allFieldsHaveValue}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
