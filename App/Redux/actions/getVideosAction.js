import Apis from "../../RestApi/Apis";
import {  VIDEOS_ERROR, VIDEOS_LOADING, VIDEOS_SUCESS } from "../actionTypes";

export function getVideosAction (request){
    return dispatch =>{        
        dispatch({
            type:VIDEOS_LOADING
        });

      Apis.videosCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("======VIDEOS_LOADING===== >  ", JSON.parse(responce).data);
            dispatch({
                type:VIDEOS_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("======BANNERS_ERROR ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:VIDEOS_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:VIDEOS_ERROR,
            payload:error
        });
        console.log("==== BANNERS_ERROR ", error)
    })   

 
    }
}