import Apis from "../../RestApi/Apis";
import { GET_ON_SALE_PRODUCT_ERROR, GET_ON_SALE_PRODUCT_LOADING, GET_ON_SALE_PRODUCT_SUCESS } from "../actionTypes";

export function getOnSaleProductAction (request){
    return dispatch =>{        
        dispatch({
            type: GET_ON_SALE_PRODUCT_LOADING
        });

      Apis.getProductByCategoryId(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("====== GET_ON_SALE_PRODUCT_LOADING ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_ON_SALE_PRODUCT_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("====== GET_ON_SALE_PRODUCT_LOADING ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_ON_SALE_PRODUCT_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:GET_ON_SALE_PRODUCT_ERROR,
            payload:error
        });
        console.log("==== GET_ON_SALE_PRODUCT_LOADING", error)
    })   

 
    }
}