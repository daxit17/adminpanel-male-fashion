import { getProductsData, postProductsData } from "../../common/Apis/Products_Api";
import * as ActionTypes from "../ActionTypes";

export const GetProductsData = () => (dispatch) => {

    getProductsData()
        .then((data) => dispatch({ type: ActionTypes.GET_PRODUCTS_DATA, payload: data.data }))
        .catch((error) => dispatch(ErrorMedicine(error.message)));

}

export const AddProductsData = (data) => (dispatch) => {

    postProductsData(data)
        .then((data) => dispatch({ type: ActionTypes.PRODUCTS_ADD, payload: data.data }))
        .catch((error) => dispatch(ErrorMedicine(error.message)));
}

const ErrorMedicine = () => {

}