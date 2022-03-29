import Apis from "../../RestApi/Apis";
import { CATEGOERIES_LIST_BY_ID_EROOR, CATEGOERIES_LIST_BY_ID_LOADING, CATEGOERIES_LIST_BY_ID_SUCESS, CATEGOERIES_LIST_EROOR, PRODUCT_LIST_BY_CAT_ID_EROOR, PRODUCT_LIST_BY_CAT_ID_LOADING, PRODUCT_LIST_BY_CAT_ID_SUCESS,} from "../actionTypes";

export function getProductListByCatId (request){
    return dispatch =>{        
        dispatch({
            type: PRODUCT_LIST_BY_CAT_ID_LOADING
        });

      Apis.getProductByCategoryId(request)
      .then((res)=>{
        return JSON.stringify(res);
    })
    .then((responce)=>{
        
        if(JSON.parse(responce).data.status == true){
            console.log("====== Product List By Cat ID ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:PRODUCT_LIST_BY_CAT_ID_SUCESS,
                payload:JSON.parse(responce).data
            });
        }
        else{
            console.log("====== Product List By Cat ID ====== >  ", JSON.parse(responce).data);
            dispatch({
                type:PRODUCT_LIST_BY_CAT_ID_EROOR,
                payload:JSON.parse(responce).data
            });
        }
       
    })
    .catch((error)=>{
        dispatch({
            type:PRODUCT_LIST_BY_CAT_ID_EROOR,
            payload:error
        });
        console.log("==== Category List===Error=== ", error)
    })   

 
    }
}