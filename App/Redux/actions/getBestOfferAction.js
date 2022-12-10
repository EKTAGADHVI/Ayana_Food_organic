import Apis from "../../RestApi/Apis";
import { GET_BEST_OFFERS_ERROR, GET_BEST_OFFERS_LOADING, GET_BEST_OFFERS_SUCESS } from "../actionTypes";

export function getBestOfferAction (request){
    return dispatch =>{
        dispatch({
            type:GET_BEST_OFFERS_LOADING
        });

      Apis.getBestOfferCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{

        if(JSON.parse(responce).data.status == true){
            // console.log("====== GET_BEST_OFFERS_SUCESS ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_BEST_OFFERS_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            // console.log("======GET_BEST_OFFERS_SUCESS ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_BEST_OFFERS_ERROR,
                payload:JSON.parse(responce).data
            });
        }

    })
    .catch((error)=>{
        dispatch({
            type:GET_BEST_OFFERS_ERROR,
            payload:error
        });
        // console.log("==== GET_BEST_OFFERS_SUCESS", error)
    })


    }
}
