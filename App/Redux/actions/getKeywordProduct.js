import Apis from "../../RestApi/Apis";
import { PRODUCT_BY_KEYWORD_ERROR, PRODUCT_BY_KEYWORD_LOADING, PRODUCT_BY_KEYWORD_SUCESS } from "../actionTypes";

export function getKeywordProduct (request){
    return dispatch =>{
        dispatch({
            type: PRODUCT_BY_KEYWORD_LOADING
        });

      Apis.getProductByCategoryId(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        if(JSON.parse(responce).data.status == true){
            // console.log("====== Category List Responce ====== >  ", JSON.parse(responce).data.status);
            dispatch({
                type:PRODUCT_BY_KEYWORD_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            dispatch({
                type:PRODUCT_BY_KEYWORD_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:PRODUCT_BY_KEYWORD_ERROR,
            payload:error
        });
        console.log("==== Category List===Error=== ", error)
    })   

 
    }
}