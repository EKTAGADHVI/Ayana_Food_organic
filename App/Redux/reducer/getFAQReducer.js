import { initialState } from "../../Utils/constant";
import { GET_FAQ_ERROR, GET_FAQ_LOADING, GET_FAQ_SUCESS } from "../actionTypes";

export function getFAQReducer (state = initialState,action){

    
    switch(action.type){
        case GET_FAQ_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case GET_FAQ_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case GET_FAQ_ERROR:
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