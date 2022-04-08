import { getBestOfferAction } from "./getBestOfferAction";
import { getBestSellingProductAction } from "./getBestSellingProductAction";
import { getBlogsAction } from "./getBlogsAction";
import { getCategoeryListAction } from "./getCategoeryListaction";
import { getFeaturedProductAction } from "./getFeaturedProductAction";
import { getKeywordProduct } from "./getKeywordProduct";
import { getOnSaleProductAction } from "./getOnSaleProductAction";
import { getOrganicWorldProductAction } from "./getOrganicWorldProductAction";
import { getProductByIdAction } from "./getProductByIdAction";
import {getProductListByCatId } from "./getProductListByCatId";
import { getRecentProductAction } from "./getRecentProductAction";
import { getTopRatedProductAction } from "./getTopRatedProductAction";
import { homePageAction } from "./homePageAction";
import { loginAction } from "./loginAction";
import { logoutAction } from "./logoutAction";
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
getFeaturedProductAction:getFeaturedProductAction,
getOnSaleProductAction:getOnSaleProductAction,
homePageAction:homePageAction,
pincodeAction:pincodeAction,
getOrganicWorldProductAction:getOrganicWorldProductAction,
logoutAction:logoutAction,
getProductByIdAction:getProductByIdAction,
getBestOfferAction:getBestOfferAction,
getBlogsAction:getBlogsAction,
getKeywordProduct:getKeywordProduct,
}