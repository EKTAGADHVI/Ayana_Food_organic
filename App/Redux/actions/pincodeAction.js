import Apis from "../../RestApi/Apis";
import { PINCODE_ERROR, PINCODE_LOADING, PINCODE_SUCESS } from "../actionTypes";

export function pincodeAction (request){
    return dispatch =>{        
        dispatch({
            type: PINCODE_LOADING
        });

      Apis.pincode(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("====== PINCODE_LOADING====== >  ", JSON.parse(responce).data);
            dispatch({
                type:PINCODE_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("====== PINCODE_LOADING====== >  ", JSON.parse(responce).data);
            dispatch({
                type:PINCODE_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:PINCODE_ERROR,
            payload:error
        });
        console.log("==== GET_RECENT_PRODUCT_ERROR===Error=== ", error)
    })   

 
    }
}