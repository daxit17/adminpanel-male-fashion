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

        default:
            return state;
    }

}       