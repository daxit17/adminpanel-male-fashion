import { getRequest, postRequest } from "../Request"

export const getProductsData = () => {
    return getRequest("products");
}

export const postProductsData = (data) => {
    return postRequest("products", data);
}