import Apis from "../../RestApi/Apis";
import { HOME_PAGE_DATA_ERROR, HOME_PAGE_DATA_LOADING, HOME_PAGE_DATA_SUCESS } from "../actionTypes";

export function homePageAction (request){
    return dispatch =>{        
        dispatch({
            type: HOME_PAGE_DATA_LOADING
        });

      Apis.homePageCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("====== HOME_PAGE_DATA_LOADING ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:HOME_PAGE_DATA_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("====== HOME_PAGE_DATA_LOADING ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:HOME_PAGE_DATA_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:HOME_PAGE_DATA_ERROR,
            payload:error
        });
        console.log("==== E_PAGE_DATA_LOADING", error)
    })   

 
    }
}