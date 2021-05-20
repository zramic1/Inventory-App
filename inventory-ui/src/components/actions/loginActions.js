import { USER_LOGGED, GET_ALL_WAREHOUSES, GET_ALL_USERS, GET_ALL_ORDERS, GET_USER_INFORMATION } from "./action-types/actionTypes";

export const userLogged = (user) => {
    return {
        type: USER_LOGGED,
        payload: user
    }
}

export const getAllWarehouses = (warehouses) => {
    return {
        type: GET_ALL_WAREHOUSES,
        payload: warehouses
    }
}

export const getAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        payload: users
    }
}

export const getAllOrders = (orders) => {
    return {
        type: GET_ALL_ORDERS,
        payload: orders
    }
}

export const getUserInformation = (user) => {
    return {
        type: GET_USER_INFORMATION,
        payload: user
    }
}