import { getBestSellingProductAction } from "./getBestSellingProductAction";
import { getCategoeryListAction } from "./getCategoeryListaction";
import {getProductListByCatId } from "./getProductListByCatId";
import { getRecentProductAction } from "./getRecentProductAction";
import { getTopRatedProductAction } from "./getTopRatedProductAction";
import { homePageAction } from "./homePageAction";
import { loginAction } from "./loginAction";
import { pincodeAction } from "./pincodeAction";
import { productListAction } from "./productListAction";
import { registerAction } from "./registrationAction";



export  const actions ={
loginAction:loginAction,
registerAction:registerAction,
getCategoeryListAction:getCategoeryListAction,
productListAction : productListAction,
getProductListByCatId:getProductListByCatId,
getBestSellingProductAction:getBestSellingProductAction,
getTopRatedProductAction:getTopRatedProductAction,
getRecentProductAction:getRecentProductAction,
homePageAction:homePageAction,
pincodeAction:pincodeAction
}