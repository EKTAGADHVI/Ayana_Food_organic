import { initialState } from "../../Utils/constant";
import { PINCODE_ERROR, PINCODE_LOADING, PINCODE_SUCESS } from "../actionTypes";

export function pincodeReducer (state = initialState,action){

    
    switch(action.type){
        case PINCODE_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case PINCODE_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case PINCODE_ERROR:
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