import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle
} from "../firebase";
import "./Register.css";
import { Box, Button, FormControl, TextField } from "@mui/material";

const validate = (email) => {
  if (!email) {
    return false
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return false
  }
  return true
}

function RegisterUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
      <div className="register">        
      <div className="register__container">
      <Box sx={{ textAlign: "center" }}>
      </Box>      
        <FormControl fullWidth>
        <TextField
          type="text"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ditt namn"
        />
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
          placeholder="Lösenord"
        />
        <Button 
          sx={{mt: 5}} 
          onClick={register} 
          variant="contained"
          disabled={!validate(email) || !password || !name}
          >
          Register
        </Button>
        <Button          
          variant="text"
          onClick={signInWithGoogle}
        >
          Registrera med Google
        </Button>
        </FormControl>
        <div>
          Har du redan ett konto? <Link to="/">Logga in</Link>.
        </div>
      </div>
      </div>
  );
}
export default RegisterUser;