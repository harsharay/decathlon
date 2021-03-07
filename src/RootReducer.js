const initState = {
    items:[],
    loginDetails: "",
    userOrders: {}
}

export const RootReducer = (state=initState, action) => {
    if(action.type === "ADD_ITEM_TO_STORE"){
        return {
            ...state,
            items : [...state.items, action.payload]
        }
    } else if(action.type === "REPLACE_ALL_ITEM_IN_STORE") {
        return {
            ...state,
            items : action.payload
        }
    } else if(action.type === "LOGIN_USER") {
        return {
            ...state,
            loginDetails : action.payload
        }
    } else if(action.type === "ADDING_USER_ORDER") {
        return {
            ...state,
            userOrders : action.payload
        }
    }

    return state;
}