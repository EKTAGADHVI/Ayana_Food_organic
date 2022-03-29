import { initialState } from "../../Utils/constant";
import { PRODUCT_LIST_BY_CAT_ID_EROOR, PRODUCT_LIST_BY_CAT_ID_LOADING, PRODUCT_LIST_BY_CAT_ID_SUCESS } from "../actionTypes";

export function getProductByCatIdReducer (state = initialState,action){

    
    switch(action.type){
        case PRODUCT_LIST_BY_CAT_ID_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case PRODUCT_LIST_BY_CAT_ID_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case PRODUCT_LIST_BY_CAT_ID_EROOR:
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