import Apis from "../../RestApi/Apis";
import { GET_RECENT_PRODUCT_ERROR, GET_RECENT_PRODUCT_LOADING, GET_RECENT_PRODUCT_SUCESS } from "../actionTypes";

export function getRecentProductAction (request){
    return dispatch =>{
        dispatch({
            type: GET_RECENT_PRODUCT_LOADING
        });

      Apis.getProductByCategoryId(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{

        if(JSON.parse(responce).data.status == true){
            // console.log("====== GET_RECENT_PRODUCT_LOADING ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_RECENT_PRODUCT_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("====== GET_BEST_SELLING_PRODUCT D ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_RECENT_PRODUCT_ERROR,
                payload:JSON.parse(responce).data
            });
        }

    })
    .catch((error)=>{
        dispatch({
            type:GET_RECENT_PRODUCT_ERROR,
            payload:error
        });
        console.log("==== GET_RECENT_PRODUCT_ERROR===Error=== ", error)
    })


    }
}
