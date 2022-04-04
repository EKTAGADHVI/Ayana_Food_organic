import Apis from "../../RestApi/Apis";
import { PRODUCT_BY_ID_ERROR, PRODUCT_BY_ID_LOADING, PRODUCT_BY_ID_SUCESS } from "../actionTypes";

export function getProductByIdAction (request){
    return dispatch =>{        
        dispatch({
            type: PRODUCT_BY_ID_LOADING
        });

      Apis.getProductByCategoryId(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("====== PRODUCT_BY_ID_ERROR ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:PRODUCT_BY_ID_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("====== PRODUCT_BY_ID_ERROR====== >  ", JSON.parse(responce).data);
            dispatch({
                type:PRODUCT_BY_ID_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:PRODUCT_BY_ID_ERROR,
            payload:error
        });
       
    })   

 
    }
}