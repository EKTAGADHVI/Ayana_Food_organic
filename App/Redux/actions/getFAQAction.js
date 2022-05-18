import Apis from "../../RestApi/Apis";
import {  GET_FAQ_ERROR, GET_FAQ_LOADING, GET_FAQ_SUCESS } from "../actionTypes";

export function getFAQAtion (request){
    return dispatch =>{        
        dispatch({
            type: GET_FAQ_LOADING
        });

      Apis.getFAQCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("====== GET_FAQ_LOADING ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_FAQ_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("====== GET_FAQ_LOADING_SUCESS ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_FAQ_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:GET_FAQ_ERROR,
            payload:error
        });
        console.log("GET_FAQ_ERROR", error)
    })   

 
    }
}