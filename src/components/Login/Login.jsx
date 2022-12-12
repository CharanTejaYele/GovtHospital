import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase-config";
import { LoginForm, StyledTextField } from "./Login.styles";

const Login = () => {
  const [values, setValues] = useState({
    Email: "",
    Password: "",
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const HandleLogin = () => {
    // console.log(values);
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, values.Email, values.Password).then(
      (response) => {
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
        navigate("/ViewDetails?key=1");
      }
    );
  };

  return (
    <LoginForm>
      <h2 style={{ textAlign: "left", paddingBottom: "30px" }}>Login</h2>
      <StyledTextField
        variant="outlined"
        label="Email"
        onChange={handleChange("Email")}
        sx={{ marginBottom: "20px" }}
      />
      <FormControl
        sx={{ marginBottom: "20px", width: "100%" }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.Password}
          onChange={handleChange("Password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button variant="contained" sx={{ margin: "10px" }} onClick={HandleLogin}>
        Login
      </Button>
    </LoginForm>
  );
};
export default Login;
