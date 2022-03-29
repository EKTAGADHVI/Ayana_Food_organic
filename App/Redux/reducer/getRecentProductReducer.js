import { initialState } from "../../Utils/constant";
import { GET_RECENT_PRODUCT_ERROR, GET_RECENT_PRODUCT_LOADING, GET_RECENT_PRODUCT_SUCESS } from "../actionTypes";

export function getRecentProductReducer (state = initialState,action){

    
    switch(action.type){
        case GET_RECENT_PRODUCT_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case GET_RECENT_PRODUCT_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case GET_RECENT_PRODUCT_ERROR:
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