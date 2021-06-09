import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataGrid from "./TableGrid/DataGrid";
import { Form } from "antd";
import CreateSupplierForm from "./CreateSupplierForm";
import { UrlContext } from '../urlContext';
import axiosInstance from "../api/axiosInstance";
import { getUserSuppliers } from "./actions/loginActions";

function Customers() {
    const [CreateForm] = Form.useForm();
    const [UpdateForm] = Form.useForm();
    const dispatch = useDispatch();
    const supplieriKorisnika = useSelector(state => state.logovani.userSuppliers);
    const supplierContext = useContext(UrlContext);

    const getSuppliers = () => {
        let url = supplierContext.product;
        axiosInstance(url)
            .get("/suppliers")
            .then((res) => {
                dispatch(getUserSuppliers(res.data));
            })
            .catch((error) => {
                console.log("Status");
                console.log("Greska!");
                console.log(error);
            });
    };

    const addSupplier = (val) => {
        const { name, address, email, fax, otherDetails, phone } = val;
        let url = supplierContext.product;
        axiosInstance(url)
            .post("/suppliers", {
                name: name,
                address: address,
                email: email,
                fax: fax,
                otherDetails: otherDetails,
                phone: phone
            })
            .then((res) => {
                getSuppliers();
            })
            .catch((error) => {
                console.log("Status");
                console.log("Greska!");
                console.log(error);
            });
    }


    const updateSupplier = (val) => {
        const { id, name, address, email, fax, otherDetails, phone } = val;
        let url = supplierContext.product;
        axiosInstance(url)
            .put(`/suppliers/${id}`, {
                name: name,
                address: address,
                email: email,
                fax: fax,
                otherDetails: otherDetails,
                phone: phone
            })
            .then((res) => {
                getSuppliers();
            })
            .catch((error) => {
                console.log("Status");
                console.log("Greska!");
                console.log(error);
            });
    }

    const deleteSupplier = (val) => {
        const { id } = val;
        let url = supplierContext.product;
        axiosInstance(url)
            .delete(`/suppliers/${id}`)
            .then((res) => {
                getSuppliers();
            })
            .catch((error) => {
                console.log("Status");
                console.log("Greska!");
                console.log(error);
            });
    }

    useEffect(() => {
        getSuppliers();
    }, []);

    return <div style={{ height: "100vh" }}>
        <DataGrid
            data={{
                title: "Suppliers",
                addButtonText: "Add new supplier",
                columns: [
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "Address",
                        dataIndex: "address",
                        key: "address",
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                        key: "email",
                    },
                    {
                        title: "Fax",
                        dataIndex: "fax",
                        key: "fax",
                    },
                    {
                        title: "Other details",
                        dataIndex: "otherDetails",
                        key: "otherDetails",
                    },
                    {
                        title: "Phone",
                        dataIndex: "phone",
                        key: "phone",
                    },
                ],
                dataSource: supplieriKorisnika,
                Form: <CreateSupplierForm form={CreateForm} />,
                onSubmit: addSupplier,
                visible: false,
                formInstance: CreateForm,
                onDelete: deleteSupplier,
                updateFormInstance: UpdateForm,
                UpdateForm: <CreateSupplierForm form={UpdateForm} />,
                updateOnSubmit: updateSupplier,
                rowData: {
                    name: "",
                    address: "",
                    email: "",
                    fax: "",
                    other_details: "",
                    phone: ""
                },
            }}
        ></DataGrid>
    </div>
}

export default Customers;