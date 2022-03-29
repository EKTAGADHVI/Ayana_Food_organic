

import { CategoeryList_URL, GET_PRODUCT_BY_CATEGORY_ID_URL, Login_URL, Registration_URL } from './ApiUrl';
import instance from './index'
export default class Apis
{
    

    static  loginCall ( request )
    {
        console.log("Request",request)
        return instance.post( Login_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }
    static  registrationCall ( request )
    {
        return instance.post( Registration_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }
    static getCategoeryListCall ( request )
    {
        return instance.get( CategoeryList_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }  
    
    static getProductByCategoryId ( request )
    {
        console.log("Request data",request )
        return instance.post( GET_PRODUCT_BY_CATEGORY_ID_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }
    static getBestSellingProduct ( request )
    {
        console.log("Request data",request )
        return instance.post( GET_PRODUCT_BY_CATEGORY_ID_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }
    static getTopRatedProduct ( request )
    {
        console.log("Request data",request )
        return instance.post( GET_PRODUCT_BY_CATEGORY_ID_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }


}