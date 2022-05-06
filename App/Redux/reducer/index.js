import { combineReducers } from "redux";

import { categoeryListReducer } from "./categoeryListReducer";
import { getBannersReducer } from "./getBannersReducer";
import { getBestOfferReducer } from "./getBestOfferReducer";
import { getBestSellingProductReducer } from "./getBestSellingProductReducer";
import { getBlogsReducer } from "./getBlogsReducer";
import { getFeaturedProductReducer } from "./getFeaturedProductReducer";
import { getKeywordProductReducer } from "./getKeywordProductReducer";
import { getOnSaleProductReducer } from "./getOnSaleProductReducer";
import { getOrganicWorldProductReducer } from "./getOrganicWorldProductReducer";
import { getProductByCatIdReducer } from "./getProductByCatIdReducer";
import { getProductByIdReducer } from "./getProductByIdReducer";
import { getProfileReducer } from "./getProfileReducer";
import { getRecentProductReducer } from "./getRecentProductReducer";
import { getTopRatedProductReducer } from "./getTopRatedProductReducer";
import { getTopSellingReducer } from "./getTopSellingReducer";
import { getVideosReducer } from "./getVideosReducer";
import { homePageReducer } from "./homePageReducer";
import { loginReducer } from "./loginReducer";
import { logoutReducer } from "./logoutReducer";
import { pincodeReducer } from "./pincodeReucer";
import { productFilterReducer } from "./productFilterReducer";
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
    getKeywordProductReducer:getKeywordProductReducer,
    productFilterReducer:productFilterReducer,
    getBannersReducer:getBannersReducer,
    getVideosReducer:getVideosReducer,
    getProfileReducer:getProfileReducer,
    getTopSellingReducer:getTopSellingReducer
    });