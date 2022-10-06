import * as ActionTypes from "../ActionTypes";

const initval = {
    isLoading: false,
    products: [],
    error: ''
}

export const productsReducer = (state = initval, action) => {
    switch (action.type) {

        case ActionTypes.GET_PRODUCTS_DATA:
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                error: ''
            }

        case ActionTypes.PRODUCTS_ADD:
            return {
                ...state,
                isLoading: false,
                products: state.products.concat(action.payload),
                error: ''
            }

        case ActionTypes.PRODUCTS_DELETE:
            return {
                ...state,
                isLoading: false,
                products: state.products.filter((l) => l.id !== action.payload),
                error: ''
            }

        case ActionTypes.PRODUCTS_UPDATE:
            return {
                ...state,
                isLoading: false,
                products: state.products.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                }),
                error: ''
            }

        default:
            return state;
    }
}   