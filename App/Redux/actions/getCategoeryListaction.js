import Apis from "../../RestApi/Apis";
import { CATEGOERIES_LIST_EROOR, CATEGOERIES_LIST_LOADING, CATEGOERIES_LIST_SUCESS } from "../actionTypes";

export function getCategoeryListAction (request){
    return dispatch =>{
        dispatch({
            type: CATEGOERIES_LIST_LOADING
        });

      Apis.getCategoeryListCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        if(JSON.parse(responce).data.status == true){
            // console.log("====== Category List Responce ====== >  ", JSON.parse(responce).data.status);
            dispatch({
                type:CATEGOERIES_LIST_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            dispatch({
                type:CATEGOERIES_LIST_EROOR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:CATEGOERIES_LIST_EROOR,
            payload:error
        });
        console.log("==== Category List===Error=== ", error)
    })   

 
    }
}