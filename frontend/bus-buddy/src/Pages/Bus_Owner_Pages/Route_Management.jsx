import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import { DataGrid } from "@mui/x-data-grid";
import "./Team_Directory.css";
import "./Route_Management.css";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button_ from "@mui/material/Button";
import axios from "axios";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Route_Management() {
  const token = localStorage.getItem("token");

  const table_theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: "none",
          },
          row: {
            "&:hover": {
              backgroundColor: "#FFDFC7",
            },
            "&.Mui-selected": {
              backgroundColor: "#FFDFC7",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#FFDFC7",
            },

            "& .MuiDataGrid-row": {
              "&:first-child .MuiDataGrid-cell": {
                borderRadius: "10px 10px 0 0",
              },
              "&:last-child .MuiDataGrid-cell": {
                borderRadius: "0 0 10px 10px",
              },
            },
          },
          cell: {
            border: "none",
            height: 2,

            "&.MuiDataGrid-cell--selected": {
              borderColor: "transparent",
            },
          },
        },
      },
    },
  });

  const [isUpdateButtonDisabled, setisUpdateButtonDisabled] = useState(true);

  const [isAddButtonDisabled, setisAddButtonDisabled] = useState(false);

  const buttonStyle_Update = {
    borderRadius: 10,
    margin: 30,
    backgroundColor: isUpdateButtonDisabled ? "#CCCCCC" : "#ff760d",
    color: "white",
  };

  const buttonStyle_Add = {
    borderRadius: 10,
    margin: 30,
    backgroundColor: isAddButtonDisabled ? "#CCCCCC" : "#ff760d",
    color: "white",
  };

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
          notchedOutline: {
            borderWidth: "0",
          },
        },
      },
    },
  });

  const datepicker_theme = createTheme({
    shape: {
      borderRadius: 12,
    },
  });

  const columns = [
    { field: "id", headerName: "Route ID", width: 130 },
    { field: "startDestination", headerName: "Start Destination", width: 130 },
    { field: "endDestination", headerName: "End Destination", width: 130 },
    {
      field: "distance",
      headerName: "Distance",
      type: "number",
      width: 90,
    },
    {
      field: "noOfSections",
      headerName: "Sections",
      width: 90,
    },
    {
      field: "permitExpDate",
      headerName: "Permite Expire Date",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <div>
          <IconButton
            style={{ color: "grey" }}
            className="mx-2"
            aria-label="delete"
            onClick={() => handleEdit(params.row)}
          >
            <EditNoteSharpIcon />
          </IconButton>
          <IconButton
            style={{ color: "grey" }}
            className="mx-2"
            aria-label="delete"
            // onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const [value, setValue] = useState(dayjs("2022-04-17"));
  const [routeId, setrouteId] = useState("");
  const [rows_, setRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [routeData, setRouteDate] = useState({
    startDestination: "",
    endDestination: "",
    distance: 0,
    noOfSections: 0,
    permitExpDate: value,
  });

  const handleEdit = (e) => {
    setrouteId(e.id);
    setValue(dayjs(e.permitExpDate));
    setRouteDate({
      startDestination: e.startDestination,
      endDestination: e.endDestination,
      distance: e.distance,
      noOfSections: e.noOfSections,
      permitExpDate: value,
    });

    setisUpdateButtonDisabled(false);
    setisAddButtonDisabled(true);
    console.log(routeId);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setRouteDate({
      ...routeData,
      [e.target.id]: value,
    });
    console.log(routeData);
  };

  const AddRoute = () => {
    axios
      .post(`http://localhost:8081/api/v1/route/add`, routeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log("Data successfully posted:", response.data);
      })
      .catch(function (error) {
        console.error("Error posting data:", error);
      });
    setRouteDate({
      startDestination: "",
      endDestination: "",
      distance: 0,
      noOfSections: 0,
      permitExpDate: dayjs("2022-04-17"),
    });
  };

  const UpdateRoute = () => {
    const updateData = {
      ...routeData,
      routeId: routeId,
    };
    console.log(updateData.permitExpDate);
    axios
      .post(`http://localhost:8081/api/v1/route/edit`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log("Data successfully Edited:", response.data);
      })
      .catch(function (error) {
        console.error("Error posting data:", error);
      });
    setRouteDate({
      startDestination: "",
      endDestination: "",
      distance: 0,
      noOfSections: 0,
      permitExpDate: dayjs("2022-04-17"),
    });
  };

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 0,
    pageSize: 5,
  });
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);

    // axios
    //   .get(
    //     `http://localhost:8081/api/v1/route/findRoutes?pageNo=0&pageSize=5&startDestination=${searchInput}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     const formattedData = response.data.content.map((routeData) => ({
    //       id: routeData.routeId,
    //       startDestination: routeData.startDestination,
    //       endDestination: routeData.endDestination,
    //       distance: routeData.distance,
    //       noOfSections: routeData.noOfSections,
    //       permitExpDate: routeData.permitExpDate.split("T")[0],
    //     }));
    //     setRows(formattedData);
    //     console.log(response.formattedData);
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //   });
  };

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));
      const response = await fetch(
        `http://localhost:8081/api/v1/route/findRoutes?pageNo=${pageState.page}&pageSize=${pageState.pageSize}&startDestination=badulla`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response);
      // const formattedData = response.data.content.map((routeData) => ({
      //   id: routeData.routeId,
      //   startDestination: routeData.startDestination,
      //   endDestination: routeData.endDestination,
      //   distance: routeData.distance,
      //   noOfSections: routeData.noOfSections,
      //   permitExpDate: routeData.permitExpDate.split("T")[0],
      // }));

      // setPageState((old) => ({
      //   ...old,
      //   isLoading: false,
      //   data: formattedData,
      //   total: response.data.totalElements,
      // }));
    };
    fetchData();
  }, [pageState.page, pageState.pageSize, searchInput]);

  return (
    <Sidebar>
      <div>
        <div className="d-flex flex-column align-items-center  justify-content-end">
          <div
            style={{ width: "80%" }}
            class="d-flex flex-wrap-reverse align-items-center  justify-content-between"
          >
            <ThemeProvider theme={theme}>
              <TextField
                id="outlined-basic"
                label="Search by Start Destination"
                variant="outlined"
                onChange={handleSearchInputChange}
                InputProps={{
                  sx: {
                    backgroundColor: "#F4F4F4",
                    width: 350,
                    borderRadius: 10,
                    borderColor: "FF760D",
                  },
                }}
              />
            </ThemeProvider>
          </div>
          <div
            className="justify-content-center align-items-center d-flex py-4"
            style={{ height: 400, width: "100%" }}
          >
            <div
              className="justify-content-center align-items-center"
              style={{ width: "80%", height: 325 }}
            >
              <ThemeProvider theme={table_theme}>
                <DataGrid
                  rows={pageState.data}
                  rowCount={pageState.total}
                  loading={pageState.isLoading}
                  pagination
                  page={pageState.page}
                  pageSize={pageState.pageSize}
                  paginationMode="server"
                  onPageChange={(newPage) =>
                    setPageState((old) => ({ ...old, pageSize: newPage }))
                  }
                  onPageSizeChange={(newPageSize) =>
                    setPageState((old) => ({ ...old, pageSize: newPageSize }))
                  }
                  columns={columns}

                  // rows={rows_}
                  // columns={columns}
                  // initialState={{
                  //   pagination: {
                  //     paginationModel: { page: 0, pageSize: 5 },
                  //   },
                  // }}
                  // // onRowClick={handleRowClick}
                  // pageSizeOptions={[5, 10]}
                  // rowHeight={40}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
        <div
          className="justify-content-center align-items-center d-flex py-4"
          style={{ width: "100%" }}
        >
          <div className="op-main-container">
            <div className="d-flex flex-wrap  justify-content-between two-fields">
              <div className="input-and-label">
                <label class="form-label">Start Destination*</label>
                <input
                  type="text"
                  id="startDestination"
                  class="form-control input-field"
                  value={routeData.startDestination}
                  onChange={handleChange}
                />
              </div>
              <div className="input-and-label">
                <label class="form-label">End Destination*</label>
                <input
                  type="text"
                  id="endDestination"
                  class="form-control input-field"
                  value={routeData.endDestination}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex flex-wrap  justify-content-between two-fields">
              <div className="input-and-label">
                <label class="form-label">Distance*</label>
                <input
                  type="text"
                  id="distance"
                  class="form-control input-field"
                  value={routeData.distance}
                  onChange={handleChange}
                />
              </div>
              <div className="input-and-label">
                <label class="form-label">Number of Sections*</label>
                <input
                  type="text"
                  id="noOfSections"
                  class="form-control input-field"
                  value={routeData.noOfSections}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="choosefile-expiredate">
              <div className="d-flex flex-column input-and-label">
                <label class="form-label">Permite Expire Date*</label>
                <ThemeProvider theme={datepicker_theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: 300 }}
                      value={value}
                      onChange={(newValue) =>
                        setRouteDate({
                          ...routeData,
                          permitExpDate: newValue,
                        })
                      }
                      id="permitExpDate"
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
              <div
                style={{
                  width: 340,
                  margin: 30,
                  marginBottom: 1,
                }}
                class="input-group "
              >
                <input
                  type="file"
                  class="form-control input-field-choosefile "
                  id="inputGroupFile02"
                />
                <Button_
                  style={{ height: 35 }}
                  class="input-group-text"
                  for="inputGroupFile02"
                >
                  Upload
                </Button_>
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-between two-fields">
              <Button
                style={buttonStyle_Add}
                className="d-flex  update-btn"
                variant="contained"
                disabled={isAddButtonDisabled}
                onClick={AddRoute}
              >
                Add Route
              </Button>
              <Button
                style={buttonStyle_Update}
                className="d-flex  update-btn"
                variant="contained"
                disabled={isUpdateButtonDisabled}
                onClick={UpdateRoute}
              >
                Update Route
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Route_Management;
