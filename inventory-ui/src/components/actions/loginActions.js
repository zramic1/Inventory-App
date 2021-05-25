import {
  USER_LOGGED,
  GET_ALL_WAREHOUSES,
  GET_ALL_USERS,
  GET_ALL_ORDERS,
  GET_ALL_CUSTOMERS,
  GET_ALL_SUPPLIERS,
  GET_USER_INFORMATION,
  ADD_NEW_WAREHOSE,
  ADD_NEW_ORDER,
} from "./action-types/actionTypes";

export const userLogged = (user) => {
  return {
    type: USER_LOGGED,
    payload: user,
  };
};

export const getAllWarehouses = (warehouses) => {
  return {
    type: GET_ALL_WAREHOUSES,
    payload: warehouses,
  };
};

export const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    payload: users,
  };
};

export const getAllOrders = (orders) => {
  return {
    type: GET_ALL_ORDERS,
    payload: orders,
  };
};

export const getAllCustomers = (customers) => {
  return {
    type: GET_ALL_CUSTOMERS,
    payload: customers,
  };
};

export const getAllSuppliers = (suppliers) => {
  return {
    type: GET_ALL_SUPPLIERS,
    payload: suppliers,
  };
};

export const getUserInformation = (user) => {
  return {
    type: GET_USER_INFORMATION,
    payload: user,
  };
};

export const addNewWarehouse = () => {
  return {
    type: ADD_NEW_WAREHOSE,
    payload: [],
  };
};

export const addNewOrder = () => {
  return {
    type: ADD_NEW_ORDER,
    payload: [],
  };
};
