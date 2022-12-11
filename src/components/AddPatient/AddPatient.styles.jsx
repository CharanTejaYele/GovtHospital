import { Box, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";


export const AddPatientBox = styled(Paper)({
  backgroundColor:"#fafafa",
  color: "darkslategray",
  width: "600px",
  padding: 8,
  borderRadius: 4,
  margin:'auto'
});

export const StyledTextField = styled(TextField)({
  width:'100%',
});
