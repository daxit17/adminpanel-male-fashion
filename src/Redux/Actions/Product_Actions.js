import { getProductsData, postProductsData } from "../../common/Apis/Products_Api";
import * as ActionTypes from "../ActionTypes";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../FireBase";
import { async } from "@firebase/util";

export const GetProductsData = () => async (dispatch) => {

    try {
        const querySnapshot = await getDocs(collection(db, "products"));

        let data = []

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });

        dispatch({ type: ActionTypes.GET_PRODUCTS_DATA, payload: data })
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export const AddProductsData = (data) => async (dispatch) => {

    try {
        const proRef = await addDoc(collection(db, "products"), data);

        dispatch({ type: ActionTypes.PRODUCTS_ADD, payload: { id: proRef.id, ...data } })
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export const DeleteProductsData = (id) => async (dispatch) => {

    try {
        await deleteDoc(doc(db, "products", id));

        dispatch({ type: ActionTypes.PRODUCTS_DELETE, payload: id });
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    console.log(id);

}

export const UpdateProductsData = (data) => async (dispatch) => {

    try {
        const productsRef = doc(db, "products", data.id);

        await updateDoc(productsRef, {
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            warrenty: data.warrenty
        });

        dispatch({ type: ActionTypes.PRODUCTS_UPDATE, payload: data })

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const ErrorMedicine = () => {

}