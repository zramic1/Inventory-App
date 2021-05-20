import React, { useContext, useEffect } from "react";
import CreateStaffForm from "./CreateStaffForm";
import DataGrid from "./TableGrid/DataGrid";
import { useDispatch, useSelector } from "react-redux";

import { UrlContext } from "../urlContext";

import { getAllUsers } from "./actions/loginActions";
import axiosInstance from "../api/axiosInstance";

function Users() {
  const usersContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const staff = useSelector(state => state.logovani.allUsers)

  const getAllStaff = () => {
    let url = usersContext.user;
    axiosInstance(url)
      .get("/users")
      .then((res) => {
        dispatch(getAllUsers(res.data));
        //console.log("Warehousi su: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  }

  useEffect(() => {
    console.log("Warehousi su: ", staff);
    getAllStaff();
  });

  return (
    <div style={{ height: "100vh" }}>
      <DataGrid
        data={{
          title: "Staff",
          addButtonText: "Add new staff member",
          columns: [
            {
              title: "Username",
              dataIndex: "username",
              key: "username",
            },
            {
              title: "First name",
              dataIndex: "first_name",
              key: "first_name",
            },
            {
              title: "Last name",
              dataIndex: "last_name",
              key: "last_name",
            },
            {
              title: "Address",
              dataIndex: "address",
              key: "address",
            },
            {
              title: "Phone number",
              dataIndex: "phone",
              key: "phone",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            }
          ],
          dataSource: staff,
          Form: <CreateStaffForm />,
          visible: false,
        }}
      ></DataGrid>
    </div>
  );
}

export default Users;
