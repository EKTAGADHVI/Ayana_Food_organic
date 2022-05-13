

import { BANNERS_URL, BEST_OFFERS_URL, BLOGS_URL, CategoeryList_URL, CREATE_ORDER_URL, CREATE_PRODUCT_REVIEW_URL, GET_ORDER_URL, GET_PRODUCT_BY_CATEGORY_ID_URL, GET_PRODUCT_REVIEW_URL, GET_PROFILE_URL, HELp_URL, HOME_PAGE_API_URL, Login_URL, LOGOUT_URL, PINCODE_URL, PRODUCT_FILTER_URL, PRODUCT_SEARCH_URL, Registration_URL, SEARCH_BLOG_URL, SOCIAL_LOGIN_URL, UPDATE_PROFILE_URl, VIDEO_URL } from './ApiUrl';
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
    static homePageCall ( request )
    {
        console.log("Request data",request )
        return instance.post( HOME_PAGE_API_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }
    static pincode ( request )
    {
        return instance.post( PINCODE_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }  
    static productSearch ( request )
    {
        return instance.post( PRODUCT_SEARCH_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }  
    static logout ( request )
    {
        return instance.post( LOGOUT_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }  
    static getBestOfferCall ( request )
    {
        return instance.get( BEST_OFFERS_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }  

    static getBlogCall ( request )
    {
        return instance.get( BLOGS_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }  

    static productFilterCall ( request )
    {
        console.log("Request",request)
        return instance.get( PRODUCT_FILTER_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }  
    static bannersCall ( request )
    {
        console.log("Request",request)
        return instance.get( BANNERS_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }  
    static videosCall ( request )
    {
        console.log("Request",request)
        return instance.get( VIDEO_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }  
    static helpCall ( request )
    {
        console.log("Request",request)
        return instance.post( HELp_URL, request, {
            headers: { "content-type": "application/json" }
        } );


    }  


    static getProfileCall ( request )
    {
        console.log("Request",request)
        return instance.post( GET_PROFILE_URL, request, {
            headers: { "content-type": "application/json" }
        } );

    }   

    static searchBlogCall ( request )
    {
        console.log("Request",request)
        return instance.get(SEARCH_BLOG_URL, request, {
            headers: { "content-type": "application/json" }
        } );

    }   
    static updateProfileCall ( request )
    {
        console.log("Request",request)
        return instance.post(UPDATE_PROFILE_URl, request, {
            headers: { "content-type": "application/json" }
        } );

    }   
    static getOrderCall ( request )
    {
        console.log("Request",request)
        return instance.post(GET_ORDER_URL, request, {
            headers: { "content-type": "application/json" }
        } );

    }   
    static createOrderCall ( request )
    {
        console.log("Request",request)
        return instance.post(CREATE_ORDER_URL, request, {
            headers: { "content-type": "application/json" }
        } );

    }   
    static socialLoginCall ( request )
    {
        console.log("Request",request)
        return instance.post(SOCIAL_LOGIN_URL, request, {
            headers: { "content-type": "application/json" }
        } );

    }   
    static getProductReviewCall ( request )
    {
        console.log("Request",request)
        return instance.post(GET_PRODUCT_REVIEW_URL, request, {
            headers: { "content-type": "application/json" }
        } );

    }   
    static createProductReviewCall ( request )
    {
        console.log("Request",request)
        return instance.post(CREATE_PRODUCT_REVIEW_URL, request, {
            headers: { "content-type": "application/json" }
        } );

    }  
}