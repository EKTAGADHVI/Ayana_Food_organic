import { PRODUCT_LIST_ERROR, PRODUCT_LIST_LOADING, PRODUCT_LIST_SUCESS } from "../actionTypes";
import {initialState} from  '../../Utils/constant'


export function productListReducer (state = initialState,action){

    
    switch(action.type){
        case PRODUCT_LIST_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case PRODUCT_LIST_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case PRODUCT_LIST_ERROR:
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