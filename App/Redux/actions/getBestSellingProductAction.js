import Apis from "../../RestApi/Apis";
import {  GET_BEST_SELLING_PRODUCT_ERROR, GET_BEST_SELLING_PRODUCT_LOADING, GET_BEST_SELLING_PRODUCT_SUCESS, PRODUCT_LIST_BY_CAT_ID_EROOR, PRODUCT_LIST_BY_CAT_ID_LOADING, PRODUCT_LIST_BY_CAT_ID_SUCESS,} from "../actionTypes";

export function getBestSellingProductAction (request){
    return dispatch =>{
        dispatch({
            type: GET_BEST_SELLING_PRODUCT_LOADING
        });

      Apis.getProductByCategoryId(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{

        if(JSON.parse(responce).data.status == true){
            // console.log("====== GET_BEST_SELLING_PRODUCT ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_BEST_SELLING_PRODUCT_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            // console.log("====== GET_BEST_SELLING_PRODUCT D ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_BEST_SELLING_PRODUCT_ERROR,
                payload:JSON.parse(responce).data
            });
        }

    })
    .catch((error)=>{
        dispatch({
            type:GET_BEST_SELLING_PRODUCT_ERROR,
            payload:error
        });
        // console.log("==== GET_BEST_SELLING_PRODUCT===Error=== ", error)
    })


    }
}
