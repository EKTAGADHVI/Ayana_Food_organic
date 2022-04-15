import Apis from "../../RestApi/Apis";
import { GET_PROFILE_ERROR, GET_PROFILE_LOADING, GET_PROFILE_SUCESS } from "../actionTypes";

export function getProfileAction (request){
    return dispatch =>{        
        dispatch({
            type:GET_PROFILE_LOADING
        });

      Apis.getProfileCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("======GET_PROFILE_LOADING===== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_PROFILE_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("======GET_PROFILE_LOADING ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_PROFILE_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error
        });
        console.log("====GET_PROFILE_ERROR ", error)
    })   

 
    }
}