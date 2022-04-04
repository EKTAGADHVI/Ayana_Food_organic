import { initialState } from "../../Utils/constant";
import { GET_ORGANIC_WORLD_PRODUCT_ERROR, GET_ORGANIC_WORLD_PRODUCT_LOADING, GET_ORGANIC_WORLD_PRODUCT_SUCESS } from "../actionTypes";

export function getOrganicWorldProductReducer (state = initialState,action){

    
    switch(action.type){
        case GET_ORGANIC_WORLD_PRODUCT_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case GET_ORGANIC_WORLD_PRODUCT_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case GET_ORGANIC_WORLD_PRODUCT_ERROR:
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