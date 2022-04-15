import { initialState } from "../../Utils/constant";
import { BANNERS_ERROR, BANNERS_LOADING, BANNERS_SUCESS, VIDEOS_ERROR, VIDEOS_LOADING, VIDEOS_SUCESS } from "../actionTypes";

export function getVideosReducer (state = initialState,action){

    
    switch(action.type){
        case VIDEOS_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case VIDEOS_SUCESS :
            return {
                ...state,
                isLoading:false,
                data:action.payload,
                error:''
            }
        case VIDEOS_ERROR:
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