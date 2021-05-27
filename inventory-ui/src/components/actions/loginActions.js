import {
  USER_LOGGED,
  GET_ALL_WAREHOUSES,
  GET_ALL_USERS,
  GET_ALL_ORDERS,
  GET_USER_INFORMATION,
  ADD_NEW_WAREHOSE,
  GET_ALL_PRODUCTS_FOR_USER,
  GET_USER_IS_SUPPLIER,
  SHOW_NOTIFICATION_FOR_LOW_QUANTITY,
  GET_UNIQUE_PRODUCTS_FOR_USER
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

export const getAllProductsForUser = (products) => {
  return {
    type: GET_ALL_PRODUCTS_FOR_USER,
    payload: products
  }
}

export const getUserIsSupplier = (supplier) => {
  return {
    type: GET_USER_IS_SUPPLIER,
    payload: supplier
  }
}

export const setShowNotificationForLowQuantity = (truth) => {
  return {
    type: SHOW_NOTIFICATION_FOR_LOW_QUANTITY,
    payload: truth
  }
}

export const getUniqueProductsForUser = (products) => {
  return {
    type: GET_UNIQUE_PRODUCTS_FOR_USER,
    payload: products
  }
}