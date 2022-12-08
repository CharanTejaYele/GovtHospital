import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddPatientBox, StyledTextField } from "./AddPatient.styles";
import { getDatabase, ref, set, update } from "firebase/database";

const AddPatient = () => {
  const [patientdetails, setpatientdetails] = useState({
    MotherName: "",
    FatherName: "",
    MotherAadharNumber: "",
    PhoneNumber: "",
    disabled: false,
  });
  const handleChange = (prop) => (event) => {
    console.log(prop);
    setpatientdetails({ ...patientdetails, [prop]: event.target.value });
  };
  const handleAddDetails = () => {
    console.log(patientdetails);
    setpatientdetails({ ...patientdetails, ["disabled"]: true });

    const db = getDatabase();
    update(
      ref(db, "Patients/" + patientdetails["FatherName"] + "/" + new Date()),
      {
        MotherName: patientdetails["MotherName"],
        FatherName: patientdetails["FatherName"],
        "Aadhar Number": patientdetails["MotherAadharNumber"],
      }
    ).catch((error) => {
      console.error(error);
    });
    setpatientdetails({ ...patientdetails, ["disabled"]: false });
  };

  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    console.log(authToken);
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  return (
    <AddPatientBox>
      <StyledTextField
        variant="outlined"
        label="Mother Name"
        sx={{ marginBottom: "20px" }}
        onChange={handleChange("MotherName")}
      />
      <StyledTextField
        variant="outlined"
        label="Father Name"
        sx={{ marginBottom: "20px" }}
        onChange={handleChange("FatherName")}
      />
      <StyledTextField
        variant="outlined"
        label="Mother Aadhar Number"
        onChange={handleChange("MotherAadharNumber")}
      />

      <Button
        variant="contained"
        sx={{ margin: "20px" }}
        onClick={handleAddDetails}
        disabled={patientdetails["disabled"]}
      >
        Add Details
      </Button>
    </AddPatientBox>
  );
};
export default AddPatient;