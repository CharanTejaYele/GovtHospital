import { Box, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const AddPatientBox = styled(Paper)({
  backgroundColor: "#fafafa",
  color: "darkslategray",
  maxWidth: "600px",
  padding: 8,
  borderRadius: 4,
  margin: "auto",
  "@media only screen and (max-width: 600px)": {
    margin: "10px",
  },
});

export const StyledTextField = styled(TextField)({
  width: "100%",
});
