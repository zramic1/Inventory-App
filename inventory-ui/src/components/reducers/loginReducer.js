import {
  GET_ALL_CATEGORIES,
  GET_ALL_CUSTOMERS,
  GET_ALL_ORDERS,
  GET_ALL_PRODUCTS_FOR_USER,
  GET_ALL_SUPPLIERS,
  GET_ALL_USERS,
  GET_ALL_WAREHOUSES,
  GET_MONTHLY_STATS,
  GET_UNIQUE_PRODUCTS_FOR_USER,
  GET_USER_INFORMATION,
  GET_USER_IS_SUPPLIER,
  GET_WEEKLY_STATS,
  SHOW_NOTIFICATION_FOR_LOW_QUANTITY,
  USER_LOGGED,
  GET_CUSTOMER_BY_ORDER_ID,
  GET_SUPPLIER_BY_ORDER_ID,
  GET_USER_ROLE,
  GET_USER_SUPPLIERS,
  GET_PAYMENT_TYPES,
} from "../actions/action-types/actionTypes";

const initState = {
  logged: false,
  currentlyLoggedUser: {
    id: "",
    username: "",
    password: "",
    jwt: "",
  },
  role: {
    id: "",
    role_name: "",
    description: "",
  },
  /*warehouses: [],
  allUsers: [],
  allOrders: [],
  otherUserInformation: {
    id: "",
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    email: "",
  },
  allProducts: [],
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
    date_of_order: null,
    status: "",
    customer: "",
    supplier: ""
  }],*/
  allProducts: [],
  warehouses: [{}],
  allUsers: [{}],
  allOrders: [{}],
  allCategories: [{}],
  paymentTypes: [{}],
  allOrderDetails: [{}],
  otherUserInformation: {
    id: "",
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    email: "",
    customers: [],
  },
  allProductsForUser: [],
  uniqueProductsForUser: [],
  userIsSupplier: [],
  showNotificationForLowQuantity: false,
  allCustomers: [],
  allSuppliers: [],
  weeklyStats: {},
  monthlyStats: {},
  userSuppliers: [],
};

export default function (state = initState, action) {
  if (action.type === USER_LOGGED) {
    return {
      ...state,
      logged: action.payload.logged,
      currentlyLoggedUser: {
        username: action.payload.user.username,
        password: action.payload.user.password,
        jwt: action.payload.user.jwt,
      },
    };
  } else if (action.type === GET_USER_ROLE) {
    return {
      ...state,
      role: action.payload,
    };
  } else if (action.type === GET_ALL_WAREHOUSES) {
    return {
      ...state,
      warehouses: action.payload,
    };
  } else if (action.type === GET_ALL_USERS) {
    return {
      ...state,
      allUsers: action.payload,
    };
  } else if (action.type === GET_ALL_ORDERS) {
    let trenutniOrderi = [...state.allOrders];
    console.log("Trenutni orderi prije payload su: ", trenutniOrderi);
    console.log("PAAAAAAAAYLOAD je: ", action.payload);
    for (let i = 0; i < action.payload.length; i++) {
      trenutniOrderi[i] = {
        id: action.payload[i].id,
        date_of_order: action.payload[i].date_of_order,
        status: action.payload[i].status,
        order_details: action.payload[i].order_details
      }
      /*trenutniOrderi[i].id = action.payload[i].id;
      trenutniOrderi[i].date_of_order = action.payload[i].date_of_order;
      trenutniOrderi[i].status = action.payload[i].status;
      trenutniOrderi[i].order_details = action.payload[i].order_details;*/
    }
    console.log("Trenutni orderi su: ", trenutniOrderi);
    return {
      ...state,
      allOrders: trenutniOrderi,
    };
  } else if (action.type === GET_ALL_CATEGORIES) {
    return {
      ...state,
      allCategories: action.payload,
    };
  } else if (action.type === GET_ALL_CATEGORIES) {
    return {
      ...state,
      allCategories: action.payload,
    };
  } else if (action.type === GET_PAYMENT_TYPES) {
    return {
      ...state,
      paymentTypes: action.payload,
    };
  } else if (action.type === GET_USER_INFORMATION) {
    return {
      ...state,
      otherUserInformation: action.payload,
    };
  } else if (action.type === GET_ALL_PRODUCTS_FOR_USER) {
    return {
      ...state,
      allProductsForUser: action.payload,
    };
  } else if (action.type === GET_USER_IS_SUPPLIER) {
    return {
      ...state,
      userIsSupplier: action.payload,
    };
  } else if (action.type === SHOW_NOTIFICATION_FOR_LOW_QUANTITY) {
    return {
      ...state,
      showNotificationForLowQuantity: action.payload,
    };
  } else if (action.type === GET_UNIQUE_PRODUCTS_FOR_USER) {
    let sviProdukti = action.payload;
    let noviNiz = [];
    console.log("svi produkti", sviProdukti);
    for (let i = 0; i < sviProdukti.length; i++) {
      let pr = sviProdukti[i];
      noviNiz.push({
        id: pr.id,
        title: pr.title,
        description: pr.description,
        src: pr.src,
        quantity: pr.quantity,
        unit: pr.unit,
        price: pr.price,
        supplier: pr.supplier,
        category: pr.category,
        status: pr.status,
        warehouse: pr.warehouse,
      });
    }
    // daj jedinstvene produkte po nazivu
    let jedinstveni = noviNiz.reduce((acc, x) => {
      if (acc.find((y) => y.title === x.title)) return acc.concat([]);
      const totalQuantity = noviNiz
        .filter((y) => y.title === x.title)
        .map((y) => y.quantity)
        .reduce((a, b) => a + b, 0);
      return acc.concat([
        {
          ...x,
          quantity: totalQuantity,
        },
      ]);
    }, []);
    console.log("Jedinstveni su: ", jedinstveni);
    return {
      ...state,
      uniqueProductsForUser: jedinstveni,
    };
  } else if (action.type === GET_ALL_SUPPLIERS) {
    return {
      ...state,
      allSuppliers: action.payload,
    };
  } else if (action.type === GET_ALL_CUSTOMERS) {
    return {
      ...state,
      allCustomers: action.payload,
    };
  } else if (action.type === GET_WEEKLY_STATS) {
    return {
      ...state,
      weeklyStats: action.payload,
    };
  } else if (action.type === GET_MONTHLY_STATS) {
    return {
      ...state,
      monthlyStats: action.payload,
    };
  } else if (action.type === GET_CUSTOMER_BY_ORDER_ID) {
    let trenutniOrderi = [...state.allOrders];
    trenutniOrderi[
      action.payload.orderId
    ].customer = `${action.payload.first_name} ${action.payload.last_name}`;
    return {
      ...state,
      allOrders: trenutniOrderi,
    };
  } else if (action.type === GET_SUPPLIER_BY_ORDER_ID) {
    let trenutniOrderi = [...state.allOrders];
    trenutniOrderi[action.payload.orderId].supplier = action.payload.name;
    return {
      ...state,
      allOrders: trenutniOrderi,
    };
  }
  else if (action.type === GET_USER_SUPPLIERS) {
    return {
      ...state,
      userSuppliers: action.payload
    }
  }

  return state;
}
