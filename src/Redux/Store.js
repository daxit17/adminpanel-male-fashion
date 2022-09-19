import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";
import { rootReducer } from './Reducer/Index';

export const configureStore = () => {

    const store = createStore(rootReducer, applyMiddleware(thunk));

    return store;

}
