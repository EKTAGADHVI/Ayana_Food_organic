import { initialState } from "../../Utils/constant";
import { GET_PROFILE_ERROR, GET_PROFILE_LOADING, GET_PROFILE_SUCESS } from "../actionTypes";

export function getProfileReducer (state = initialState,action){

    
    switch(action.type){
        case GET_PROFILE_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case GET_PROFILE_SUCESS :
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case GET_PROFILE_ERROR:
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