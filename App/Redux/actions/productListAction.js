

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { PRODUCT_LIST_ERROR, PRODUCT_LIST_LOADING, PRODUCT_LIST_SUCESS } from "../actionTypes";
import wooCommerceApi from "../../RestApi/ApiUrl";

export function productListAction (){
    return dispatch =>{
        dispatch({
            type: PRODUCT_LIST_LOADING
        });

       
        wooCommerceApi.get(`products`).
        then((response) => {
            console.log("All Product catag",response);
            if(response && response.length !== 0)
            {
                dispatch({
                    type: PRODUCT_LIST_SUCESS,
                    payload:response
                });
            }
            else{
                dispatch({
                    type: PRODUCT_LIST_ERROR,
                    payload:response
                });
            }
         
          })
          .catch((error) => {
            dispatch({
                type: PRODUCT_LIST_ERROR,
                payload:error
            });
          });

 
    }
}