import AsyncStorage from "@react-native-async-storage/async-storage";
import Apis from "../../RestApi/Apis";
import { initialState } from "../../Utils/constant";
import { LOG_OUT_ERROR, LOG_OUT_LOADING, LOG_OUT_SUCESS } from "../actionTypes";

export function logoutAction (request){
    return dispatch =>{
        dispatch({
            type: LOG_OUT_LOADING,
          
        });

      Apis.logout(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
     
        if(JSON.parse(responce).data.status == true){
          
            console.log("======LOG_OUT_SUCESS ====== >  ", responce);
         
                dispatch({
                    type:LOG_OUT_SUCESS,
                    payload:JSON.parse(responce).data
                });  
        
      
        }
        else{
            console.log("====== Login ERR Responce ====== >  ", responce);
            dispatch({
                type:LOGIN_EROOR,
                payload:JSON.parse(responce).data
            });
        }
    })
    .catch((error)=>{
        console.log("====Login===Error=== ", error)
        dispatch({
            type:LOGIN_EROOR,
            payload:error
        });
    })   

 
    }
}