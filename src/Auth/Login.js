import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { Box, Button, FormControl, TextField } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="login">
      <div className="login__container">
      <Box sx={{ textAlign: "center" }}>
      <h3>Logga in</h3>
      </Box>
      <FormControl fullWidth>
        <TextField
          type="text"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-postadress"
        />
        <TextField
          type="password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button disabled={!email || !password} sx={{mt: 5}} 
          variant={"contained"}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Logga in
        </Button>
        <Button onClick={signInWithGoogle}>
          Logga in med Google
        </Button>
        <div>
          <Link to="/reset">Glömt lösenordet?</Link>
        </div>
        <br/>
        <div>
          Har du inget konto, börja med att <Link to="/register">Registrera dig</Link>.
        </div>
        </FormControl>
      </div>
    </div>
  );
}
export default Login;