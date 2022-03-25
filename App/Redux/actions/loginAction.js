import Apis from "../../RestApi/Apis";
import { initialState } from "../../Utils/constant";
import { LOGIN_EROOR, LOGIN_LOADING, LOGIN_SUCESS } from "../actionTypes";

export function loginAction (request){
    return dispatch =>{
        dispatch({
            type: LOGIN_LOADING,
          
        });

      Apis.loginCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
       
        if(JSON.parse(responce).data.status == true){
            console.log("====== Login Responce ====== >  ", responce);
        dispatch({
            type:LOGIN_SUCESS,
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