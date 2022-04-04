import { initialState } from "../../Utils/constant";
import { LOG_OUT_ERROR, LOG_OUT_LOADING, LOG_OUT_SUCESS } from "../actionTypes";

export function logoutReducer (state = initialState,action){

    
    switch(action.type){
        case LOG_OUT_LOADING:
            return {
                ...state,
                isLoading:true,
            
            }
        case LOG_OUT_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case LOG_OUT_ERROR:
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