import {
  USER_LOGGED,
  GET_ALL_WAREHOUSES,
  GET_ALL_USERS,
  GET_ALL_ORDERS,
  GET_ALL_CUSTOMERS,
  GET_ALL_SUPPLIERS,
  GET_USER_INFORMATION,
  ADD_NEW_WAREHOSE,
  GET_ALL_PRODUCTS_FOR_USER,
  GET_USER_IS_SUPPLIER,
  SHOW_NOTIFICATION_FOR_LOW_QUANTITY,
  GET_UNIQUE_PRODUCTS_FOR_USER,
  ADD_NEW_ORDER,
  DELETE_ORDER,
  DELETE_USER,
  GET_WEEKLY_STATS,
  GET_MONTHLY_STATS,
  GET_USER_ROLE,
  GET_CUSTOMER_BY_ORDER_ID,
  GET_SUPPLIER_BY_ORDER_ID,
  GET_ALL_CATEGORIES,
  ADD_NEW_PRODUCT,
  GET_ALL_ORDER_DETAILS,
  ADD_NEW_ORDER_DETAIL,
  GET_PAYMENT_TYPES,
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

export const getPaymentTypes = (paymentTypes) => {
  return {
    type: GET_PAYMENT_TYPES,
    payload: paymentTypes,
  };
};

export const getAllOrderDetails = (orderDetails) => {
  return {
    type: GET_ALL_ORDER_DETAILS,
    payload: orderDetails,
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

export const getAllCategories = (categories) => {
  return {
    type: GET_ALL_CATEGORIES,
    payload: categories,
  };
};

export const deleteOrder = () => {
  return {
    type: DELETE_ORDER,
    payload: [],
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER,
    payload: [],
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

export const addNewOrderDetail = () => {
  return {
    type: ADD_NEW_ORDER_DETAIL,
    payload: [],
  };
};

export const getAllProductsForUser = (products) => {
  return {
    type: GET_ALL_PRODUCTS_FOR_USER,
    payload: products,
  };
};

export const getUserIsSupplier = (supplier) => {
  return {
    type: GET_USER_IS_SUPPLIER,
    payload: supplier,
  };
};

export const setShowNotificationForLowQuantity = (truth) => {
  return {
    type: SHOW_NOTIFICATION_FOR_LOW_QUANTITY,
    payload: truth,
  };
};

export const getUniqueProductsForUser = (products) => {
  return {
    type: GET_UNIQUE_PRODUCTS_FOR_USER,
    payload: products,
  };
};

export const addNewOrder = () => {
  return {
    type: ADD_NEW_ORDER,
    payload: [],
  };
};

export const addNewProduct = () => {
  return {
    type: ADD_NEW_PRODUCT,
    payload: [],
  };
};

export const getWeeklyStats = (weeklyStats) => {
  return {
    type: GET_WEEKLY_STATS,
    payload: weeklyStats,
  };
};

export const getMonthlyStats = (monthlyStats) => {
  return {
    type: GET_MONTHLY_STATS,
    payload: monthlyStats,
  };
};

export const getUserRole = (role) => {
  return {
    type: GET_USER_ROLE,
    payload: role,
  };
};

export const getCustomerByOrder = (customer) => {
  return {
    type: GET_CUSTOMER_BY_ORDER_ID,
    payload: customer,
  };
};

export const getSupplierByOrder = (supplier) => {
  return {
    type: GET_SUPPLIER_BY_ORDER_ID,
    payload: supplier,
  };
};
