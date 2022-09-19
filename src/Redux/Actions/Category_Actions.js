import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../FireBase";
import * as ActionTypes from "../ActionTypes";

export const GetCategory = () => async (dispatch) => {

    try {
        const querySnapshot = await getDocs(collection(db, "category"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });

        dispatch({ type: ActionTypes.GET_CATEGORY_DATA, payload: data })
    } catch (e) {
        console.log(e);
    }

}

export const AddCategory = (data) => async (dispatch) => {

    try {
        const docRef = await addDoc(collection(db, "category"), data);

        dispatch({ type: ActionTypes.ADD_CATEGORY_DATA, payload: { id: docRef.id, ...data } })
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}