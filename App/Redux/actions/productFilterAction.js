import Apis from "../../RestApi/Apis";
import { PRODUCT_FILTER_ERROR, PRODUCT_FILTER_LOADING, PRODUCT_FILTER_SUCESS } from "../actionTypes";

export function productFilterAction(request){
    console.log("Request",request)
    return dispatch =>{        
        dispatch({
            type:PRODUCT_FILTER_LOADING
        });

      Apis.productFilterCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("======PRODUCT_FILTER_LOADING====== >  ", JSON.parse(responce).data);
            dispatch({
                type:PRODUCT_FILTER_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("======PRODUCT_FILTER_LOADING====== >  ", JSON.parse(responce).data);
            dispatch({
                type:PRODUCT_FILTER_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:PRODUCT_FILTER_ERROR,
            payload:error
        });
        console.log("==== PRODUCT_FILTER_LOADING===Error=== ", error)
    })   

 
    }
}