import { combineReducers } from "redux";
import { CategoryReducer } from "./Category_Reducer";
import { productsReducer } from "./Products_Reducer";

export const rootReducer = combineReducers({
    products: productsReducer,
    category: CategoryReducer
})