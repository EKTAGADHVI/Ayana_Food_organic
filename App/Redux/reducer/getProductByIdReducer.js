import { initialState } from "../../Utils/constant";
import { PRODUCT_BY_ID_ERROR, PRODUCT_BY_ID_LOADING, PRODUCT_BY_ID_SUCESS } from "../actionTypes";

export function getProductByIdReducer (state = initialState,action){

    
    switch(action.type){
        case PRODUCT_BY_ID_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case PRODUCT_BY_ID_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case PRODUCT_BY_ID_ERROR:
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