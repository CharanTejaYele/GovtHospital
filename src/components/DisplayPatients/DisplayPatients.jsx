import { getDatabase, onValue, ref } from "firebase/database";
import { useState } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { fun1 } from "./Data";

const db = getDatabase();
const auth = getAuth();

function descendingComparator(a, b, orderBy) {
  console.log(a);
  if (b.data.DOB < a.data.DOB) {
    return -1;
  }
  if (b.data.DOB > a.data.DOB) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "AadharNumber",
    pageid: 0,
    numeric: false,
    directrender: true,
    disablePadding: false,
    label: "Aadhar Number",
  },
  {
    id: "MotherName",
    pageid: 0,
    numeric: false,
    directrender: true,
    disablePadding: false,
    label: "Mother Name",
  },
  {
    id: "FatherName",
    pageid: 0,
    numeric: false,
    directrender: true,
    disablePadding: false,
    label: "Father Name",
  },
  {
    id: "DOB",
    pageid: 0,
    numeric: false,
    directrender: true,
    disablePadding: false,
    label: "DOB",
  },
  {
    id: "1stDose",
    pageid: 1,
    numeric: false,
    directrender: false,
    disablePadding: false,
    label: "1st Dose",
  },
  {
    id: "2ndDose",
    pageid: 2,
    numeric: false,
    directrender: false,
    disablePadding: false,
    label: "2nd Dose",
  },
  {
    id: "3rdDose",
    pageid: 3,
    numeric: false,
    directrender: false,
    disablePadding: false,
    label: "3rd Dose",
  },
  {
    id: "LastDose",
    pageid: 4,
    numeric: false,
    directrender: false,
    disablePadding: false,
    label: "Last Dose",
  },
  {
    id: "PhoneNumber",
    pageid: 0,
    numeric: false,
    directrender: true,
    disablePadding: false,
    label: "Phone Number",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, pagekey } = props;
  const createSortHandler = (property) => (event) => {
    if (property === "DOB") onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <>
            {(headCell.directrender === true ||
              headCell.pageid === Number(pagekey)) && (
              <TableCell
                key={headCell.id}
                align={"right"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{ fontWeight: "600" }}
              >
                {headCell.id === "DOB" ? (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                ) : (
                  headCell.label
                )}
              </TableCell>
            )}
          </>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function DisplayPatients() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [Patients, setPatients] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Patients.length) : 0;

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
  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/GovtHospital/login");
      }
    });
  }, []);

  const search = useLocation().search;
  const key = new URLSearchParams(search).get("key");

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: { md: "fit-content" },
            mb: 2,
            margin: { xs: "16px", md: "auto" },
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={Patients.length}
                pagekey={key}
              />
              <TableBody>
                {stableSort(Patients, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <>
                        {fun1(key, row.data.DOB) && (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.data.MotherName}
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              align="right"
                            >
                              {row.data.AadharNumber}
                            </TableCell>
                            <TableCell align="right">
                              {row.data.MotherName}
                            </TableCell>
                            <TableCell align="right">
                              {row.data.FatherName}
                            </TableCell>
                            <TableCell align="right">
                              {moment(row.data.DOB).format("DD MMM YYYY")}
                            </TableCell>
                            {key == 1 && (
                              <TableCell align="right">
                                {moment(row.data.DOB)
                                  .add(45, "days")
                                  .format("DD MMM YYYY")}
                              </TableCell>
                            )}
                            {key == 2 && (
                              <TableCell align="right">
                                {moment(row.data.DOB)
                                  .add(75, "days")
                                  .format("DD MMM YYYY")}{" "}
                              </TableCell>
                            )}
                            {key == 3 && (
                              <TableCell align="right">
                                {moment(row.data.DOB)
                                  .add(105, "days")
                                  .format("DD MMM YYYY")}{" "}
                              </TableCell>
                            )}
                            {key == 4 && (
                              <TableCell align="right">
                                {moment(row.data.DOB)
                                  .add(10, "month")
                                  .format("d MMM YYYY")}{" "}
                              </TableCell>
                            )}
                            <TableCell align="right">
                              {row.data.PhoneNumber}
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Patients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
