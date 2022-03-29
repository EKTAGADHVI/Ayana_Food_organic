import { combineReducers } from "redux";

import { categoeryListReducer } from "./categoeryListReducer";
import { getBestSellingProductReducer } from "./getBestSellingProductReducer";
import { getProductByCatIdReducer } from "./getProductByCatIdReducer";
import { getRecentProductReducer } from "./getRecentProductReducer";
import { getTopRatedProductReducer } from "./getTopRatedProductReducer";
import { loginReducer } from "./loginReducer";
import { productListReducer } from "./productListReducer";
import { registerReducer } from "./registerReducer";


export default  combineReducers({
    // Add Your Reducer 
    loginReducer:loginReducer,
    registerReducer:registerReducer,
    productListReducer :productListReducer,
    categoeryListReducer:categoeryListReducer,
    getProductByCatIdReducer:getProductByCatIdReducer,
    getBestSellingProductReducer:getBestSellingProductReducer,
    getTopRatedProductReducer:getTopRatedProductReducer,
    getRecentProductReducer:getRecentProductReducer

  });