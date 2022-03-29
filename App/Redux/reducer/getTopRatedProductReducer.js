import { initialState } from "../../Utils/constant";
import { GET_TOP_RATED_PRODUCT_ERROR, GET_TOP_RATED_PRODUCT_LOADING, GET_TOP_RATED_PRODUCT_SUCESS } from "../actionTypes";

export function getTopRatedProductReducer (state = initialState,action){

    
    switch(action.type){
        case GET_TOP_RATED_PRODUCT_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case GET_TOP_RATED_PRODUCT_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case GET_TOP_RATED_PRODUCT_ERROR:
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