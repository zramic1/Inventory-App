import { USER_LOGGED } from "../actions/action-types/actionTypes"

const initState = {
    logged: false,
    currentlyLoggedUser: {
        username: "",
        password: ""
    }
}

export default function (state = initState, action) {
    if (action.type === USER_LOGGED) {
        return {
            ...state,
            logged: action.payload.logged,
            currentlyLoggedUser: {
                username: action.payload.user.username,
                password: action.payload.user.password
            }
        }
    }

    return state;
}