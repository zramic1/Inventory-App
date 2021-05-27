import { GET_ALL_ORDERS, GET_ALL_PRODUCTS_FOR_USER, GET_ALL_USERS, GET_ALL_WAREHOUSES, GET_UNIQUE_PRODUCTS_FOR_USER, GET_USER_INFORMATION, GET_USER_IS_SUPPLIER, SHOW_NOTIFICATION_FOR_LOW_QUANTITY, USER_LOGGED } from "../actions/action-types/actionTypes"

const initState = {
    logged: false,
    currentlyLoggedUser: {
        id: "",
        username: "",
        password: "",
        jwt: "",
    },
    warehouses: [{
        id: null,
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
        id: null,
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
        email: "",
        customers: []
    },
    allProductsForUser: [],
    uniqueProductsForUser: [],
    userIsSupplier: [],
    showNotificationForLowQuantity: false
}

// stari hardkodirani produkti
/*
allProducts: [
        {
            id: 1,
            title: "Apple",
            description: "Product description",
            src: "data:image/jpeg;base64,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",
            quantity: 1
        },
        {
            id: 2,
            title: "Banana",
            description: "Product description",
            src: "https://img.emedihealth.com/wp-content/uploads/2020/09/banana-feat-1.jpg",
            quantity: 5
        },
        {
            id: 3,
            title: "Chair",
            description: "Product description",
            src: "https://cdn.connox.com/m/100030/219352/media/hay/Result-Chair/Hay-Result-Chair-schwarz-Eiche-matt-lackiert.jpg",
            quantity: 5
        },
        {
            id: 4,
            title: "Table",
            description: "Product description",
            src: "https://www.knoll.com/static_resources/images/products/catalog/eco/parts/642TR/642TR-KC_KC_FZ.jpg",
            quantity: 10
        }
    ]
*/

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
    else if (action.type === GET_ALL_USERS) {
        return {
            ...state,
            allUsers: action.payload
        }
    }
    else if (action.type === GET_ALL_ORDERS) {
        return {
            ...state,
            allOrders: action.payload
        }
    }
    else if (action.type === GET_USER_INFORMATION) {
        return {
            ...state,
            otherUserInformation: action.payload
        }
    }
    else if (action.type === GET_ALL_PRODUCTS_FOR_USER) {
        return {
            ...state,
            allProductsForUser: action.payload
        }
    }
    else if (action.type === GET_USER_IS_SUPPLIER) {
        return {
            ...state,
            userIsSupplier: action.payload
        }
    }
    else if (action.type === SHOW_NOTIFICATION_FOR_LOW_QUANTITY) {
        return {
            ...state,
            showNotificationForLowQuantity: action.payload
        }
    }
    else if (action.type === GET_UNIQUE_PRODUCTS_FOR_USER) {
        let sviProdukti = action.payload;
        let noviNiz = [];
        for (let i = 0; i < sviProdukti.length; i++) {
            let pr = sviProdukti[i];
            noviNiz.push({
                title: pr.title,
                description: pr.description,
                src: pr.src,
                quantity: pr.quantity
            });
        }
        // daj jedinstvene produkte po nazivu
        let jedinstveni = noviNiz.reduce((acc, x) => {
            if (acc.find(y => y.title === x.title)) return acc.concat([]);
            const totalQuantity = noviNiz.filter(y => y.title === x.title).map(y => y.quantity).reduce((a, b) => a + b, 0);
            return acc.concat([{
                ...x,
                quantity: totalQuantity
            }])
        }, []);
        console.log("Jedinstveni su: ", jedinstveni);
        return {
            ...state,
            uniqueProductsForUser: jedinstveni
        }
    };

    return state;
}