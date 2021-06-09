import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataGrid from "./TableGrid/DataGrid";
import { Form } from "antd";
import CreateCustomerForm from "./CreateCustomerForm";
import { UrlContext } from '../urlContext';
import axiosInstance from "../api/axiosInstance";
import { getUserInformation } from "./actions/loginActions";

function Customers() {
    const [CreateForm] = Form.useForm();
    const [UpdateForm] = Form.useForm();
    const customeriKorisnika = useSelector(state => state.logovani.otherUserInformation.customers);
    const logovaniUser = useSelector(state => state.logovani.currentlyLoggedUser);
    const logovaniUserId = useSelector(state => state.logovani.otherUserInformation.id);
    const customerContext = useContext(UrlContext);
    const dispatch = useDispatch();

    const getUserCustomers = () => {
        let url = customerContext.user;
        axiosInstance(url).get(`/users/username/${logovaniUser.username}`).then((res1) => {
            dispatch(getUserInformation({
                id: res1.data.id,
                first_name: res1.data.first_name,
                last_name: res1.data.last_name,
                address: res1.data.address,
                phone: res1.data.phone,
                email: res1.data.email,
                customers: res1.data.customers
            }));
        })
    }

    const addCustomer = (val) => {
        const { first_name, last_name, address, phone, email } = val;
        let url = customerContext.user;
        axiosInstance(url)
            .post("/customer", {
                first_name: first_name,
                last_name: last_name,
                address: address,
                phone: phone,
                email: email,
                userID: {
                    id: logovaniUserId
                }
            })
            .then((res) => {
                getUserCustomers();
            })
            .catch((error) => {
                console.log("Status");
                console.log("Greska!");
                console.log(error);
            });
    }


    const updateCustomer = (val) => {
        const { id, first_name, last_name, address, phone, email } = val;
        let url = customerContext.user;
        axiosInstance(url)
            .put(`/updateCustomer/${id}`, {
                first_name: first_name,
                last_name: last_name,
                address: address,
                phone: phone,
                email: email,
            })
            .then((res) => {
                getUserCustomers();
            })
            .catch((error) => {
                console.log("Status");
                console.log("Greska!");
                console.log(error);
            });
    }

    const deleteCustomer = (rowData) => {
        console.log("rowData", rowData);
        const { id } = rowData;
        let url = customerContext.user;
        axiosInstance(url)
            .delete(`/deleteCustomer/${id}`)
            .then((res) => {
                getUserCustomers();
            })
            .catch((error) => {
                console.log("Status");
                console.log("Greska!");
                console.log(error);
            });
    }

    useEffect(() => {
        getUserCustomers();
    }, []);

    return <div style={{ height: "100vh" }}>
        <DataGrid
            data={{
                title: "Customers",
                addButtonText: "Add new customer",
                columns: [
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
                dataSource: customeriKorisnika,
                Form: <CreateCustomerForm form={CreateForm} />,
                onSubmit: addCustomer,
                visible: false,
                formInstance: CreateForm,
                onDelete: deleteCustomer,
                updateFormInstance: UpdateForm,
                UpdateForm: <CreateCustomerForm form={UpdateForm} />,
                updateOnSubmit: updateCustomer,
                rowData: {
                    firstName: "",
                    lastName: "",
                    address: "",
                    phone: "",
                    email: ""
                },
            }}
        ></DataGrid>
    </div>
}

export default Customers;