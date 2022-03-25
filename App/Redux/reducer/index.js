import { combineReducers } from "redux";
import { categoeryListReducer } from "./categoeryListReducer";
import { loginReducer } from "./loginReducer";
import { productListReducer } from "./productListReducer";
import { registerReducer } from "./registerReducer";


export default  combineReducers({
    // Add Your Reducer 
    loginReducer:loginReducer,
    registerReducer:registerReducer,
    productListReducer :productListReducer,
    categoeryListReducer:categoeryListReducer
  });