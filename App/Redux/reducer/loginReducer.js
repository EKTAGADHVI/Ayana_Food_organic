import { initialState } from "../../Utils/constant";
import { LOGIN_EROOR, LOGIN_LOADING, LOGIN_SUCESS } from "../actionTypes";

export function loginReducer (state = initialState,action){

    
    switch(action.type){
        case LOGIN_LOADING:
            return {
                ...state,
                isLoading:true,
                data:initialState
            }
        case LOGIN_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case LOGIN_EROOR:
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