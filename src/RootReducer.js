const initState = {
    items:[],
    count: 12
}

export const RootReducer = (state=initState, action) => {
    if(action.type === "ADD_ITEM_TO_STORE"){
        return {
            items : [...state.items, action.payload]
        }
    }

    return state;
}