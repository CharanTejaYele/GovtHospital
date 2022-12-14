import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import { hello } from "./HeaderUtils";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { margin } from "@mui/system";
import immunization from "./immunization.png";
import { Image } from "@mui/icons-material";

const StyledHeaderBox = styled(Box)({
  padding: "0px 36px",
  "@media only screen and (max-width: 900px)": {
    display: "block",
  },
});

const StyledMenuBox = styled(Box)({
  display: "flex",
  "@media only screen and (max-width: 900px)": {
    display: "grid",
    gridTemplateColumns: "150px 150px",
    justifyContent: "space-around",
    gridAutoRows: "50px",
    padding: "20px",
  },
});

const HeaderTitle = styled(Box)({
  display: "flex",
  alignItems: "center",
  "@media only screen and (max-width: 900px)": {
    justifyContent: "center",
    paddingTop: "20px",
  },
});

function Header() {
  const navigate = useNavigate();
  const BtnAddPatient = (props) => {
    // console.log(props);
  };
  const [LoggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    });
  }, []);

  return (
    <StyledHeaderBox
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#2B4162",
        alignItems: "center",
      }}
      minHeight={"68px"}
      mb="36px"
    >
      <HeaderTitle display="flex" minWidth={"60px"}>
        <img src={immunization} alt="" height={"30px"} />

        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontWeight: 700,
            fontSize: { xs: "1rem" },
            color: "#e0e0e2",
            textDecoration: "none",
          }}
        >
          Immunization Due Children
        </Typography>
      </HeaderTitle>

      {LoggedIn && (
        <StyledMenuBox alignItems="center">
          <Button
            sx={{
              color: "#e0e0e2",
              margin: "5px",
              border: "0px",
              "&:hover": {
                borderColor: "#e0e0e2",
              },
              "@media only screen and (max-width: 900px)": {
                borderColor: "#e0e0e2",
                border: "1px solid",
              },
            }}
            variant="outlined"
            onClick={() => navigate("/AddPatient")}
          >
            Add Patient
          </Button>
          <Divider
            orientation="vertical"
            color="#e0e0e2"
            sx={{ height: "30px", display: { xs: "none", md: "flex" } }}
          />
          <Button
            sx={{
              color: "#e0e0e2",
              margin: "5px",
              border: "0px",
              "&:hover": {
                borderColor: "#e0e0e2",
              },
              "@media only screen and (max-width: 900px)": {
                borderColor: "#e0e0e2",
                border: "1px solid",
              },
            }}
            variant="outlined"
            onClick={() => navigate("/ViewDetails?key=1")}
          >
            1st Dose
          </Button>
          <Divider
            orientation="vertical"
            color="#e0e0e2"
            sx={{ height: "30px", display: { xs: "none", md: "flex" } }}
          />{" "}
          <Button
            sx={{
              color: "#e0e0e2",
              margin: "5px",
              border: "0px",
              "&:hover": {
                borderColor: "#e0e0e2",
              },
              "@media only screen and (max-width: 900px)": {
                borderColor: "#e0e0e2",
                border: "1px solid",
              },
            }}
            variant="outlined"
            onClick={() => navigate("/ViewDetails?key=2")}
          >
            {" "}
            2nd Dose
          </Button>
          <Divider
            orientation="vertical"
            color="#e0e0e2"
            sx={{ height: "30px", display: { xs: "none", md: "flex" } }}
          />{" "}
          <Button
            sx={{
              color: "#e0e0e2",
              margin: "5px",
              border: "0px",
              "&:hover": {
                borderColor: "#e0e0e2",
              },
              "@media only screen and (max-width: 900px)": {
                borderColor: "#e0e0e2",
                border: "1px solid",
              },
            }}
            variant="outlined"
            onClick={() => navigate("/ViewDetails?key=3")}
          >
            {" "}
            3rd Dose
          </Button>
          <Divider
            orientation="vertical"
            color="#e0e0e2"
            sx={{ height: "30px", display: { xs: "none", md: "flex" } }}
          />{" "}
          <Button
            sx={{
              color: "#e0e0e2",
              margin: "5px",
              border: "0px",
              "&:hover": {
                borderColor: "#e0e0e2",
              },
              "@media only screen and (max-width: 900px)": {
                borderColor: "#e0e0e2",
                border: "1px solid",
              },
            }}
            variant="outlined"
            onClick={() => navigate("/ViewDetails?key=4")}
          >
            {" "}
            Last Dose
          </Button>
          <Divider
            orientation="vertical"
            color="#e0e0e2"
            sx={{ height: "30px", display: { xs: "none", md: "flex" } }}
          />{" "}
          <Button
            sx={{
              my: 2,
              color: "white",
              border: "0px",
              margin: "5px",
              "&:hover": {
                borderColor: "#e0e0e2",
              },
              "@media only screen and (max-width: 900px)": {
                borderColor: "#e0e0e2",
                border: "1px solid",
              },
            }}
            variant="outlined"
            onClick={() => {
              const auth = getAuth();
              signOut(auth)
                .then(() => {
                  console.log("Signed Out");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Logout
          </Button>
        </StyledMenuBox>
      )}
    </StyledHeaderBox>
  );
}
export default Header;
