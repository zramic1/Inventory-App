import { GET_ALL_ORDERS, GET_ALL_USERS, GET_ALL_WAREHOUSES, GET_USER_INFORMATION, USER_LOGGED } from "../actions/action-types/actionTypes"

const initState = {
    logged: false,
    currentlyLoggedUser: {
        id: "",
        username: "",
        password: "",
        jwt: "",
    },
    warehouses: [{
        company_name: "",
        location: "",
        inventory_start_date: null
    }],
    allUsers: [{
        username: "",
        first_name: "",
        last_name: "",
        address: "",
        phone: "",
        email: ""
    }],
    allOrders: [{
        dateOfOrder: null,
        status: "",
        customer: "",
        supplier: ""
    }],
    otherUserInformation: {
        id: "",
        first_name: "",
        last_name: "",
        address: "",
        phone: "",
        email: ""
    }
}

export default function (state = initState, action) {
    if (action.type === USER_LOGGED) {
        return {
            ...state,
            logged: action.payload.logged,
            currentlyLoggedUser: {
                username: action.payload.user.username,
                password: action.payload.user.password,
                jwt: action.payload.user.jwt
            }
        }
    }
    else if (action.type === GET_ALL_WAREHOUSES) {
        return {
            ...state,
            warehouses: action.payload
        }
    }
    else if (action.type == GET_ALL_USERS) {
        return {
            ...state,
            allUsers: action.payload
        }
    }
    else if (action.type == GET_ALL_ORDERS) {
        return {
            ...state,
            allOrders: action.payload
        }
    }
    else if (action.type == GET_USER_INFORMATION) {
        return {
            ...state,
            otherUserInformation: action.payload
        }
    }

    return state;
}