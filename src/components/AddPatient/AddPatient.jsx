import { Alert, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddPatientBox, StyledTextField } from "./AddPatient.styles";
import { getDatabase, ref, update } from "firebase/database";
import Snackbar from "@mui/material/Snackbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";

const AddPatient = () => {
  const [snackopen, setsnackopen] = useState(false);
  const [Snackseverity, setSnackseverity] = useState("error");
  const [SnackText, setSnackText] = useState(
    "All the details are mandatory. Details not added to database"
  );
  const [errors, setErrors] = useState(false);

  const [patientdetails, setpatientdetails] = useState({
    MotherName: "",
    WifeOf: "",
    MotherAadharNumber: "",
    PhoneNumber: "",
    DOD: "",
    VillageName: "",
  });

  const [Errordetails, setErrordetails] = useState({
    MotherName: "",
    WifeOf: "",
    MotherAadharNumber: "",
    PhoneNumber: "",
    DOD: "",
    VillageName: "",
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
    setErrordetails({ ...Errordetails, [prop]: "" });
  };

  const handleAddDetails = () => {
    if (
      patientdetails["WifeOf"] !== "" &&
      patientdetails["MotherName"] !== "" &&
      patientdetails["MotherAadharNumber"] !== "" &&
      patientdetails["PhoneNumber"] !== "" &&
      patientdetails["DOD"] !== "" &&
      patientdetails["VillageName"] !== ""
    ) {
      const db = getDatabase();
      update(ref(db, "Patients/" + patientdetails["WifeOf"]), {
        MotherName: patientdetails["MotherName"],
        WifeOf: patientdetails["WifeOf"],
        AadharNumber: patientdetails["MotherAadharNumber"],
        PhoneNumber: patientdetails["PhoneNumber"],
        DOD: patientdetails["DOD"],
        VillageName: patientdetails["VillageName"],
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
      setErrors(true);
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
      {errors && (
        <Typography varient="h6" mb={"20px"} color="red">
          *Cannot submit! All details are mandatory*
        </Typography>
      )}
      <StyledTextField
        required
        error={Errordetails["VillageName"] !== ""}
        helperText={
          Errordetails["VillageName"] === "" ? "" : Errordetails["VillageName"]
        }
        variant="outlined"
        label="Village Name"
        sx={{ marginBottom: "20px" }}
        onChange={handleChange("VillageName")}
      />
      <StyledTextField
        required
        error={Errordetails["MotherAadharNumber"] !== ""}
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
        error={Errordetails["MotherName"] !== ""}
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
        error={Errordetails["WifeOf"] !== ""}
        helperText={Errordetails["WifeOf"] === "" ? "" : Errordetails["WifeOf"]}
        variant="outlined"
        label="Wife Of"
        sx={{ marginBottom: "20px" }}
        onChange={handleChange("WifeOf")}
      />
      <StyledTextField
        required
        inputProps={{ maxLength: 10 }}
        error={Errordetails["PhoneNumber"] !== ""}
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
        onChange={handleChange("DOD")}
      /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date Of Delivery*"
          value={patientdetails["DOD"]}
          disableFuture
          onChange={(date) => {
            let dateString = "";
            if (date !== null) {
              dateString = new Date(date);
            }
            setpatientdetails({ ...patientdetails, DOD: dateString });
            setErrordetails({
              ...Errordetails,
              DOD: "",
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ width: "100%" }}
              error={Errordetails["DOD"] ? true : false}
              helperText={Errordetails["DOD"]}
              onKeyDown={(e) => {
                e.preventDefault();
                setErrordetails({
                  ...Errordetails,
                  DOD: "Keyboard Input Not Accepted",
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
