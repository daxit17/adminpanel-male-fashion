import { collection, addDoc, getDocs, updateDoc, deleteField, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../FireBase";
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

        let radomNum = Math.floor(Math.random() * 1000000).toString();

        const categoryRef = ref(storage, 'category/' + radomNum);

        uploadBytes(categoryRef, data.profile_img)
            .then((snapshot) => {
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const catRef = await addDoc(collection(db, "category"), {
                            ...data,
                            profile_img: url,
                            fileName: radomNum
                        });
                        dispatch({
                            type: ActionTypes.ADD_CATEGORY_DATA, payload: {
                                id: catRef.id,
                                ...data,
                                profile_img: url
                            }
                        })
                    })
            });

    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export const DeleteCategory = (data) => async (dispatch) => {

    try {

        const deleteRef = ref(storage, 'category/' + data.fileName);

        deleteObject(deleteRef)
            .then(async () => {
                await deleteDoc(doc(db, "category", data.id));
                dispatch({ type: ActionTypes.DELETE_CATEGORY_DATA, payload: data.id })
            }).catch((error) => {
                console.log(error);
            });


    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const UpdateCategory = (data) => async (dispatch) => {

    try {
        const categoryRef = doc(db, "category", data.id);

        await updateDoc(categoryRef, {
            name: data.name
        });

        dispatch({ type: ActionTypes.UPDATE_CATEGORY_DATA, payload: data })
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}