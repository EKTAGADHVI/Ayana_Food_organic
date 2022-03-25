import Apis from "../../RestApi/Apis";
import { LOGIN_LOADING, LOGIN_SUCESS, REGISTER_EROOR, REGISTER_LOADING, REGISTER_SUCESS } from "../actionTypes";

export function registerAction (request){
    return dispatch =>{
        dispatch({
            type: REGISTER_LOADING
        });

      Apis.registrationCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        if(JSON.parse(responce).data.status == true){
            console.log("====== Registration Responce ====== >  ", responce);
        dispatch({
            type:REGISTER_SUCESS,
            payload:JSON.parse(responce).data
        });
        }
        else{
            dispatch({
                type:REGISTER_EROOR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        console.log("====Registration===Error=== ", error)
        dispatch({
            type:REGISTER_EROOR,
            payload:error
        });
    })   

 
    }
}