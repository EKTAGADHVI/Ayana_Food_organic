import { combineReducers } from "redux";

import { categoeryListReducer } from "./categoeryListReducer";
import { getBestOfferReducer } from "./getBestOfferReducer";
import { getBestSellingProductReducer } from "./getBestSellingProductReducer";
import { getBlogsReducer } from "./getBlogsReducer";
import { getFeaturedProductReducer } from "./getFeaturedProductReducer";
import { getKeywordProductReducer } from "./getKeywordProductReducer";
import { getOnSaleProductReducer } from "./getOnSaleProductReducer";
import { getOrganicWorldProductReducer } from "./getOrganicWorldProductReducer";
import { getProductByCatIdReducer } from "./getProductByCatIdReducer";
import { getProductByIdReducer } from "./getProductByIdReducer";
import { getRecentProductReducer } from "./getRecentProductReducer";
import { getTopRatedProductReducer } from "./getTopRatedProductReducer";
import { homePageReducer } from "./homePageReducer";
import { loginReducer } from "./loginReducer";
import { logoutReducer } from "./logoutReducer";
import { pincodeReducer } from "./pincodeReucer";
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
    getRecentProductReducer:getRecentProductReducer,
    getOnSaleProductReducer:getOnSaleProductReducer,
    homePageReducer:homePageReducer,
    getFeaturedProductReducer:getFeaturedProductReducer,
    pincodeReducer:pincodeReducer,
    getOrganicWorldProductReducer:getOrganicWorldProductReducer,
    logoutReducer:logoutReducer,
    getProductByIdReducer:getProductByIdReducer,
    getBestOfferReducer:getBestOfferReducer,
    getBlogsReducer:getBlogsReducer,
    getKeywordProductReducer:getKeywordProductReducer
    });