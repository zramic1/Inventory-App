import { GET_ALL_WAREHOUSES, USER_LOGGED } from "../actions/action-types/actionTypes"

const initState = {
    logged: false,
    currentlyLoggedUser: {
        username: "",
        password: "",
        jwt: "",
    },
    warehouses: [{
        company_name: "",
        location: "",
        inventory_start_date: null
    }]
}

/*{
    company_name: "",
    location: "",
    inventory_start_date: null
}*/

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

    return state;
}