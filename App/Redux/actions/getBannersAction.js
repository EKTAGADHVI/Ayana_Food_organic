import Apis from "../../RestApi/Apis";
import { BANNERS_ERROR, BANNERS_LOADING, BANNERS_SUCESS } from "../actionTypes";

export function getBannersAction (request){
    return dispatch =>{        
        dispatch({
            type:BANNERS_LOADING
        });

      Apis.bannersCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("====== BANNERS_ERROR====== >  ", JSON.parse(responce).data);
            dispatch({
                type:BANNERS_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("======BANNERS_ERROR ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:BANNERS_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:BANNERS_ERROR,
            payload:error
        });
        console.log("==== BANNERS_ERROR ", error)
    })   

 
    }
}