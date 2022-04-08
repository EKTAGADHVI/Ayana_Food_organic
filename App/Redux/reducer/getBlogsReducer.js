import { initialState } from "../../Utils/constant";
import { GET_BLOG_LIST_ERROR, GET_BLOG_LIST_LOADING, GET_BLOG_LIST_SUCESS } from "../actionTypes";

export function getBlogsReducer (state = initialState,action){

    
    switch(action.type){
        case GET_BLOG_LIST_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case GET_BLOG_LIST_SUCESS:
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case GET_BLOG_LIST_ERROR:
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