import { USER_LOGGED } from "./action-types/actionTypes";

export const userLogged = (user) => {
    return {
        type: USER_LOGGED,
        payload: user
    }
}

