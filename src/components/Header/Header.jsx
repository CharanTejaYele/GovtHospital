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

function Header() {
  const navigate = useNavigate();
  const BtnAddPatient = (props) => {
    console.log(props);
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#2B4162",
        alignItems: "center",
      }}
      mb="36px"
      minHeight={"68px"}
    >
      <Box display="flex" minWidth={"60px"}>
        <PregnantWomanIcon
          sx={{
            display: { xs: "none", md: "flex" },
            mr: 1,
            width: "30px",
            height: "30px",
            color: "#e0e0e2",
          }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/ViewDetails?key=1"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            color: "#e0e0e2",
            textDecoration: "none",
          }}
        >
          Immunization Due Children
        </Typography>
      </Box>

      {LoggedIn && (
        <Box display="flex" alignItems="center">
          <Button
            sx={{ color: "#e0e0e2" }}
            onClick={() => navigate("/AddPatient")}
          >
            Add Patient
          </Button>
          <Divider
            orientation="vertical"
            color="#e0e0e2"
            sx={{ height: "30px" }}
          />
          <Button
            sx={{ color: "#e0e0e2" }}
            onClick={() => navigate("/ViewDetails?key=1")}
          >
            1st Dose
          </Button>
          <Divider
            orientation="vertical"
            color="#e0e0e2"
            sx={{ height: "30px" }}
          />{" "}
          <Button
            sx={{ color: "#e0e0e2" }}
            onClick={() => navigate("/ViewDetails?key=2")}
          >
            {" "}
            2nd Dose
          </Button>
          <Divider
            orientation="vertical"
            color="#e0e0e2"
            sx={{ height: "30px" }}
          />{" "}
          <Button
            sx={{ color: "#e0e0e2" }}
            onClick={() => navigate("/ViewDetails?key=3")}
          >
            {" "}
            3rd Dose
          </Button>
          <Divider
            orientation="vertical"
            color="#e0e0e2"
            sx={{ height: "30px" }}
          />{" "}
          <Button
            sx={{ color: "#e0e0e2" }}
            onClick={() => navigate("/ViewDetails?key=4")}
          >
            {" "}
            Last Dose
          </Button>
          <Divider
            orientation="vertical"
            color="#e0e0e2"
            sx={{ height: "30px" }}
          />{" "}
          <Button
            sx={{ my: 2, color: "white" }}
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
        </Box>
      )}
    </Box>
  );
}
export default Header;
