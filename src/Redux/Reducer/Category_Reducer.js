import * as ActionTypes from "../ActionTypes";

const initVal = {
    isLoading: false,
    category: [],
    error: ''
}

export const CategoryReducer = (state = initVal, action) => {

    switch (action.type) {

        case ActionTypes.GET_CATEGORY_DATA:
            return {
                ...state,
                isLoading: false,
                category: action.payload,
                error: ''
            }

        case ActionTypes.ADD_CATEGORY_DATA:
            return {
                ...state,
                isLoading: false,
                category: state.category.concat(action.payload),
                error: ''
            }

        case ActionTypes.DELETE_CATEGORY_DATA:
            return {
                ...state,
                isLoading: false,
                category: state.category.filter((l) => l.id !== action.payload),
                eerror: ''
            }

        case ActionTypes.UPDATE_CATEGORY_DATA:
            return {
                ...state,
                isLoading: false,
                category: state.category.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                })
            }

        default:
            return state;
    }

}       