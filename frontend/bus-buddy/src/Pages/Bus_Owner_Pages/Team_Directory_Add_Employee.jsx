import React from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material-next/Button";
import Button_ from "@mui/material/Button";
import avatar from "./../../Assets/Owner_assests/Avatar.png";
import { DataGrid } from "@mui/x-data-grid";
import "./Team_Directory.css";
import { IoIosArrowBack } from "react-icons/io";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

function Team_Directory_Add_Employee() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || " "} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  return (
    <div>
      <Sidebar>
        <div>
          <div class="d-flex flex-wrap align-items-center  justify-content-between">
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              InputProps={{
                sx: {
                  backgroundColor: "#F4F4F4",
                  width: 400,
                  borderRadius: 10,
                  borderColor: "FF760D",
                },
              }}
            />
            <div className="d-flex  py-3">
              <Button
                href="/teamdirectory"
                className="mx-2"
                size="large"
                variant="text"
                startIcon={<IoIosArrowBack color="black" />}
                style={{ borderRadius: 10, color: "black" }}
              >
                Back
              </Button>
            </div>
          </div>
          <div className="d-flex py-4" style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <div>
              <img className="photo-view" src={avatar} alt="Add Icon" />
            </div>

            <div className="d-flex flex-column">
              <lable className="profession">Driver</lable>
              <lable class="name-avatar">Kamal Fernando </lable>
              <div className="normal-details">
                <lable>ID :</lable>
                <lable> PV13289290</lable>
              </div>
              <lable className="normal-details"> Kamalfernando@gmail.com</lable>
              <lable className="normal-details"> +94726465466</lable>
              <div className="normal-details">
                <lable>Salary :</lable>
                <lable> 45000/=</lable>
              </div>
              <Button_
                className="mx-4 my-2"
                style={{
                  color: "#FF760D",
                  width: "200px",
                  borderColor: "#FF760D",
                }}
                variant="outlined"
                startIcon={<AddCircleSharpIcon />}
              >
                ADD
              </Button_>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default Team_Directory_Add_Employee;
