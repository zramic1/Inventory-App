import React, { useContext, useEffect } from "react";
import CreateStaffForm from "./CreateStaffForm";
import DataGrid from "./TableGrid/DataGrid";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { UrlContext } from "../urlContext";

import { getAllUsers } from "./actions/loginActions";
import axiosInstance from "../api/axiosInstance";

function Users() {
  const [CreateForm] = Form.useForm();
  const [UpdateForm] = Form.useForm();
  const usersContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const staff = useSelector((state) => state.logovani.allUsers);

  const getAllStaff = () => {
    let url = usersContext.user;
    axiosInstance(url)
      .get("/users")
      .then((res) => {
        dispatch(getAllUsers(res.data));
        console.log("Useri su: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  };

  const deleteUser = (rowData) => {
    console.log("rowData", rowData);
    const { id } = rowData;
    let url = usersContext.user;
    axiosInstance(url)
      .delete(`/deleteUser/${id}`)
      .then((res) => {
        getAllStaff();
        dispatch(deleteUser());
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  };

  useEffect(() => {
    getAllStaff();
    console.log("Useri", staff);
  }, []);

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
            },
          ],
          dataSource: staff,
          Form: <CreateStaffForm form={CreateForm} />,
          UpdateForm: <CreateStaffForm form={UpdateForm} />,
          formInstance: CreateForm,
          updateFormInstance: UpdateForm,
          visible: false,
          rowData: {
            username: "",
            password: "",
            repeatPassword: "",
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
            email: "",
          },
          onDelete: deleteUser,
        }}
      ></DataGrid>
    </div>
  );
}

export default Users;
