import Apis from "../../RestApi/Apis";
import { GET_TOP_RATED_PRODUCT_ERROR, GET_TOP_RATED_PRODUCT_LOADING, GET_TOP_RATED_PRODUCT_SUCESS } from "../actionTypes";

export function getTopRatedProductAction (request){
    return dispatch =>{        
        dispatch({
            type: GET_TOP_RATED_PRODUCT_LOADING
        });

      Apis.getProductByCategoryId(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("====== GET_TOP_RATED_PRODUCT_LOADING ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_TOP_RATED_PRODUCT_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("====== GET_TOP_RATED_PRODUCT_LOADING ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_TOP_RATED_PRODUCT_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:GET_TOP_RATED_PRODUCT_ERROR,
            payload:error
        });
        console.log("==== GET_TOP_RATED_PRODUCT_LOADING", error)
    })   

 
    }
}