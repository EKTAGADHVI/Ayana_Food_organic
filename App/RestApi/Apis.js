

import { CategoeryList_URL, Login_URL, Registration_URL } from './ApiUrl';
import instance from './index'
export default class Apis
{
    

    static  loginCall ( request )
    {
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

}