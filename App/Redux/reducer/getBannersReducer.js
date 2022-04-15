import { initialState } from "../../Utils/constant";
import { BANNERS_ERROR, BANNERS_LOADING, BANNERS_SUCESS } from "../actionTypes";

export function getBannersReducer (state = initialState,action){

    
    switch(action.type){
        case BANNERS_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case BANNERS_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case BANNERS_ERROR:
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