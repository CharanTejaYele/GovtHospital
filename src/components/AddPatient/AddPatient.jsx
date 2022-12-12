import { Alert, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddPatientBox, StyledTextField } from "./AddPatient.styles";
import { getDatabase, ref, update } from "firebase/database";
import Snackbar from "@mui/material/Snackbar";
import dayjs from "dayjs";
import { Validate } from "../Validations";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";

const AddPatient = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [snackopen, setsnackopen] = useState(false);
  const [Snackseverity, setSnackseverity] = useState("error");
  const [SnackText, setSnackText] = useState(
    "All the details are mandatory. Details not added to database"
  );

  const [patientdetails, setpatientdetails] = useState({
    MotherName: "",
    FatherName: "",
    MotherAadharNumber: "",
    PhoneNumber: "",
    DOB: "",
  });

  const [Errordetails, setErrordetails] = useState({
    MotherName: "",
    FatherName: "",
    MotherAadharNumber: "",
    PhoneNumber: "",
    DOB: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackopen(false);
    window.location.reload();
  };

  const handleChange = (prop) => (event) => {
    setpatientdetails({ ...patientdetails, [prop]: event.target.value });
    const k = Validate(patientdetails[prop], prop);
    setErrordetails({ ...Errordetails, [prop]: k });
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const handleAddDetails = () => {
    if (
      patientdetails["FatherName"] !== "" &&
      patientdetails["MotherName"] !== "" &&
      patientdetails["MotherAadharNumber"] !== "" &&
      patientdetails["PhoneNumber"] !== "" &&
      patientdetails["DOB"] !== "" &&
      Errordetails["FatherName"] === "" &&
      Errordetails["MotherName"] === "" &&
      Errordetails["MotherAadharNumber"] === "" &&
      Errordetails["PhoneNumber"] === "" &&
      Errordetails["DOB"] == ""
    ) {
      const db = getDatabase();
      update(ref(db, "Patients/" + patientdetails["FatherName"]), {
        MotherName: patientdetails["MotherName"],
        FatherName: patientdetails["FatherName"],
        AadharNumber: patientdetails["MotherAadharNumber"],
        PhoneNumber: patientdetails["PhoneNumber"],
        DOB: patientdetails["DOB"],
      })
        .catch((error) => {
          setSnackText("Error! Cannot Add details to the server.");
          setsnackopen(true);
        })
        .then(() => {
          setSnackText("Success! The details have been added.");
          setSnackseverity("success");
          setsnackopen(true);
        });
    } else {
      setsnackopen(true);
    }
  };

  let navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
      const auth = getAuth();
      getIdToken(auth, true);
    });
  }, []);

  return (
    <AddPatientBox>
      <Typography variant="h5" mb={"20px"} color="#2b4162">
        Add New Child
      </Typography>
      <StyledTextField
        required
        error={Errordetails["MotherAadharNumber"]}
        helperText={
          Errordetails["MotherAadharNumber"] === ""
            ? ""
            : Errordetails["MotherAadharNumber"]
        }
        variant="outlined"
        label="Mother Aadhar Number"
        sx={{ marginBottom: "20px" }}
        onChange={handleChange("MotherAadharNumber")}
        inputProps={{ maxLength: 12 }}
      />
      <StyledTextField
        required
        error={Errordetails["MotherName"]}
        helperText={
          Errordetails["MotherName"] === "" ? "" : Errordetails["MotherName"]
        }
        variant="outlined"
        label="Mother Name"
        sx={{ marginBottom: "20px" }}
        onChange={handleChange("MotherName")}
      />
      <StyledTextField
        required
        error={Errordetails["FatherName"]}
        helperText={
          Errordetails["FatherName"] === "" ? "" : Errordetails["FatherName"]
        }
        variant="outlined"
        label="Father Name"
        sx={{ marginBottom: "20px" }}
        onChange={handleChange("FatherName")}
      />
      <StyledTextField
        required
        inputProps={{ maxLength: 10 }}
        error={Errordetails["PhoneNumber"]}
        helperText={
          Errordetails["PhoneNumber"] === "" ? "" : Errordetails["PhoneNumber"]
        }
        variant="outlined"
        label="Phone Number"
        sx={{ marginBottom: "20px" }}
        onChange={handleChange("PhoneNumber")}
      />
      {/* <StyledTextField
        onFocus={onFocus}
        onBlur={onBlur}
        required
        InputProps={{
          classes: {
            input: "CustomTextField",
          },
        }}
        label="Date Of Birth"
        type={focus ? "date" : "date"}
        onChange={handleChange("DOB")}
      /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date Of Birth*"
          value={patientdetails["DOB"]}
          disableFuture
          onChange={(date) => {
            let dateString = "";
            if (date !== null) {
              dateString = new Date(date);
            }
            setpatientdetails({ ...patientdetails, ["DOB"]: dateString });
            setErrordetails({
              ...Errordetails,
              ["DOB"]: "",
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ width: "100%" }}
              error={Errordetails["DOB"] ? true : false}
              helperText={Errordetails["DOB"]}
              onKeyDown={(e) => {
                e.preventDefault();
                setErrordetails({
                  ...Errordetails,
                  ["DOB"]: "Keyboard Input Not Accepted",
                });
              }}
            />
          )}
        />
      </LocalizationProvider>

      <Button
        variant="contained"
        sx={{ margin: "20px" }}
        onClick={handleAddDetails}
        disabled={snackopen}
      >
        Add Details
      </Button>
      <Snackbar open={snackopen} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={Snackseverity}
          sx={{ width: "100%" }}
        >
          {SnackText}
        </Alert>
      </Snackbar>
    </AddPatientBox>
  );
};
export default AddPatient;
