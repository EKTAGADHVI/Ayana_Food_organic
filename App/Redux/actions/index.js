import { getBannersAction } from "./getBannersAction";
import { getBestOfferAction } from "./getBestOfferAction";
import { getBestSellingProductAction } from "./getBestSellingProductAction";
import { getBlogsAction } from "./getBlogsAction";
import { getCategoeryListAction } from "./getCategoeryListaction";
import { getFAQAtion } from "./getFAQAction";
import { getFeaturedProductAction } from "./getFeaturedProductAction";
import { getKeywordProduct } from "./getKeywordProduct";
import { getOnSaleProductAction } from "./getOnSaleProductAction";
import { getOrganicWorldProductAction } from "./getOrganicWorldProductAction";
import { getProductByIdAction } from "./getProductByIdAction";
import {getProductListByCatId } from "./getProductListByCatId";
import { getProfileAction } from "./getProfileAction";
import { getRecentProductAction } from "./getRecentProductAction";
import { getTopRatedProductAction } from "./getTopRatedProductAction";
import { getTopSellingProductAction } from "./getTopSellingProduct";
import { getVideosAction } from "./getVideosAction";
import { homePageAction } from "./homePageAction";
import { loginAction } from "./loginAction";
import { logoutAction } from "./logoutAction";
import { pincodeAction } from "./pincodeAction";
import { productFilterAction } from "./productFilterAction";
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
productFilterAction:productFilterAction,
getBannersAction:getBannersAction,
getVideosAction:getVideosAction,
getProfileAction:getProfileAction,
getTopSellingProductActon:getTopSellingProductAction,
getFAQAction:getFAQAtion
}