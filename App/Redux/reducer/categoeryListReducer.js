import { initialState } from "../../Utils/constant";
import { CATEGOERIES_LIST_EROOR, CATEGOERIES_LIST_LOADING, CATEGOERIES_LIST_SUCESS } from "../actionTypes";

export function categoeryListReducer (state = initialState,action){

    
    switch(action.type){
        case CATEGOERIES_LIST_LOADING:
            return {
                ...state,
                isLoading:true,
           
            }
        case CATEGOERIES_LIST_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case CATEGOERIES_LIST_EROOR:
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