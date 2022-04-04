import { initialState } from "../../Utils/constant";
import { GET_BEST_OFFERS_ERROR, GET_BEST_OFFERS_LOADING, GET_BEST_OFFERS_SUCESS,   } from "../actionTypes";

export function getBestOfferReducer (state = initialState,action){

    
    switch(action.type){
        case GET_BEST_OFFERS_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case GET_BEST_OFFERS_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case GET_BEST_OFFERS_ERROR:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:action.payload
            }
        default:
            return state;
    }
}