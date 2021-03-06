const initState = {
    items:[],
    count: 12
}

export const RootReducer = (state=initState, action) => {
    if(action.type === "ADD_ITEM_TO_STORE"){
        return {
            items : [...state.items, action.payload]
        }
    } else if(action.type === "REPLACE_ALL_ITEM_IN_STORE") {
        return {
            items : action.payload
        }
    }

    return state;
}