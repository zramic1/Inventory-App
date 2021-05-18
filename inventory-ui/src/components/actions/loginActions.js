import { USER_LOGGED, GET_ALL_WAREHOUSES } from "./action-types/actionTypes";

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