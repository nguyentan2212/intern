import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from "@mui/material";
import { useMoralis } from "react-moralis";

function ResetPassword() {
  const [email, setEmail] = useState(null);
  const { Moralis } = useMoralis();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const appId = process.env.REACT_APP_ID;

  const resetpasswordHandle = () => {
    if (email) {
      Moralis.start({ serverUrl, appId });
      Moralis.User.requestPasswordReset(email)
        .then(() => {
          alert(`Email had been send to ${email}`);
        })
        .catch((error) => {
          alert("Error: " + error.code + " " + error.message);
        });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="button"
            onClick={resetpasswordHandle}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Send Email
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/auth/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default ResetPassword;
