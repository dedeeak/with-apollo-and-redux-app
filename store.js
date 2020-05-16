import { createStore, combineReducers } from 'redux'

const initialState = [];

const cart = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_TO_CART':
        return [...state, action.item];
    default:
        return state
    }
}

export const initializeStore = (preloadedState = initialState) => {
    const reducer = combineReducers({cart});
    return createStore(reducer, preloadedState);
}
