import { Box, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const LoginForm = styled(Paper)({
  color: "darkslategray",
  backgroundColor: "#FAFAFA",
  width: "600px",
  padding: 30,
  borderRadius: 6,
  margin: "150px 10%",
});

export const StyledTextField = styled(TextField)({
  width: "100%",
});
