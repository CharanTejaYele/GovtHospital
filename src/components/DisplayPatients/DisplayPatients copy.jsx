import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import { format } from "date-fns";
import {
  Hidden,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fafafa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({}));
const StyledDisplay = styled(Box)(({ theme }) => ({
  textAlign: "center",
  ".MuiTable-root": {
    borderRadius: "8px",
    overflow: "Hidden",
    margin: "auto",
  },
}));

const DisplayPatients = () => {
  const [Patients, setPatients] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  const userId = auth.uid;
  onValue(
    ref(db, "/Patients/"),
    (snapshot) => {
      let patients = [];
      snapshot.forEach((childSnapshop) => {
        let KeyName = childSnapshop.key;
        let data = childSnapshop.val();
        patients.push({ key: KeyName, data: data });
      });
      setPatients(patients);
    },
    {
      onlyOnce: true,
    }
  );
  let navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/GovtHospital/login");
      }
      // console.log(user);
      const auth = getAuth();
      getIdToken(auth, true);
      // console.log(auth);
    });
  }, []);

  return (
    <div>
      <StyledDisplay>
        <StyledTableContainer
          component={Paper}
          sx={{ width: "fit-content", margin: "auto" }}
        >
          <Table
            sx={{ width: 900, borderRadius: "8px" }}
            aria-label="customized table"
            hideSortIcon={false}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  Mother Aadhar Number
                </StyledTableCell>
                <StyledTableCell align="center">Mother Name</StyledTableCell>
                <StyledTableCell align="center">Father Name</StyledTableCell>
                <StyledTableCell align="center">Date Of Birth</StyledTableCell>
                <StyledTableCell align="center">Phone Number</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Patients.map((patient) => (
                <StyledTableRow key={patient.data.AadharNumber}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {patient.data.AadharNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {patient.data.MotherName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {patient.data.FatherName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(patient.data.DOB).format("d MMM YYYY")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {patient.data.PhoneNumber}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </StyledDisplay>
    </div>
  );
};
export default DisplayPatients;
