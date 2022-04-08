import { initialState } from "../../Utils/constant";
import { PRODUCT_BY_KEYWORD_ERROR, PRODUCT_BY_KEYWORD_LOADING, PRODUCT_BY_KEYWORD_SUCESS } from "../actionTypes";

export function getKeywordProductReducer (state = initialState,action){

    
    switch(action.type){
        case PRODUCT_BY_KEYWORD_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case PRODUCT_BY_KEYWORD_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case PRODUCT_BY_KEYWORD_ERROR:
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