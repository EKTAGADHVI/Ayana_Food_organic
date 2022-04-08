import Apis from "../../RestApi/Apis";
import { GET_BLOG_LIST_ERROR, GET_BLOG_LIST_LOADING, GET_BLOG_LIST_SUCESS } from "../actionTypes";

export function getBlogsAction (request){
    return dispatch =>{        
        dispatch({
            type: GET_BLOG_LIST_LOADING
        });

      Apis.getBlogCall(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("====== GET_BLOG_LIST_LOADING ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_BLOG_LIST_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("====== GET_BLOG_LIST_SUCESS ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:GET_BLOG_LIST_ERROR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:GET_BLOG_LIST_ERROR,
            payload:error
        });
        console.log("GET_BLOG_LIST_ERROR", error)
    })   

 
    }
}