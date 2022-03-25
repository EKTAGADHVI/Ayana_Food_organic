import { initialState } from "../../Utils/constant";
import { REGISTER_EROOR, REGISTER_LOADING, REGISTER_SUCESS } from "../actionTypes";


export function registerReducer (state = initialState,action){

    
    switch(action.type){
        case REGISTER_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case REGISTER_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case REGISTER_EROOR:
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