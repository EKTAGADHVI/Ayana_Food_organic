import { initialState } from "../../Utils/constant";
import { HOME_PAGE_DATA_ERROR, HOME_PAGE_DATA_LOADING, HOME_PAGE_DATA_SUCESS } from "../actionTypes";

export function homePageReducer (state = initialState,action){

    
    switch(action.type){
        case HOME_PAGE_DATA_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case HOME_PAGE_DATA_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case HOME_PAGE_DATA_ERROR:
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