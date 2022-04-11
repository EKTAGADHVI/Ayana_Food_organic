import { initialState } from "../../Utils/constant";
import { PRODUCT_FILTER_LOADING, PRODUCT_FILTER_SUCESS } from "../actionTypes";

export function productFilterReducer (state = initialState,action){

    
    switch(action.type){
        case PRODUCT_FILTER_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case PRODUCT_FILTER_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case PRODUCT_FILTER_SUCESS:
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