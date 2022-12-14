import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { Component } from 'react';
import { FlatList, SafeAreaView, Image, TouchableOpacity, Text, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import { actions } from '../../Redux/actions';
import Apis from '../../RestApi/Apis';
import { Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';

class Orders extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            link: [
                {
                    "id": 0,
                    "url": require( '../../../assets/product.png' )
                },
                {
                    "id": 1,
                    "url": require( '../../../assets/product.png' )
                },
                {
                    "id": 2,
                    "url": require( '../../../assets/product.png' )
                }

            ],
            orders: [],
            userData: [],
            visible: false,
            shipToken:"",
        };
        let data = {
            "email": "sales@ayanafoodorganic.com",
            "password": "Ayana@1234"
        };
        axios.post( 'https://apiv2.shiprocket.in/v1/external/auth/login', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        } )
            .then( ( res ) =>
            {
                console.log( "Ship Authentication",res.data?.token)
                this.setState({shipToken:res?.data?.token})
            } )
            .catch( ( error ) =>
            {
                console.log( "Ship Authentication", error )
            } )
    }


    reOrder = async ( orderDeatil ) =>
    {
        // new code
        console.log( "Ship order", orderDeatil )
        let added = false;
        let previousData = null;
        let alreadyAdded = false;
        await AsyncStorage.getItem( 'AddToCart' )
            .then( async ( res ) => {
                let cart = JSON.parse(res);
                previousData = JSON.parse(res);

        if ( orderDeatil.length > 0 ){
            orderDeatil.map(async (item, index) => {
                let newItem = {
                    ...orderDeatil[ index ],
                    post_title:item?.item_name.split("-")[0],
                    selectedVariation: item?.pa_weight,
                    cartPrice: item?._line_total,
                    cartRegularPrice: item?._line_total,
                    cartQuentity: item?._qty,
                    regPrice: item?._line_total / item?._qty,
                    sPrice: item?._line_total / item?._qty,
                    selectedVarinatID: item?._vendor_id,
                    product_id: item?._product_id
                }
                previousData.push( newItem );
                console.log("previousData==",previousData);

            })
            if(previousData !== null){
                // this.props.navigation.navigate( 'Home' );
                await AsyncStorage.setItem( 'AddToCart', JSON.stringify( previousData ) )
                    .then( ( res ) =>
                    {
                        EventRegister.emit( 'Add-to-cart' )
                        EventRegister.emit('count')
                        setTimeout( () =>
                        {
                            this.props.navigation.navigate( 'Home',{ screen: 'Cart'} );
                        }, 1000 )
                        console.log( "Sucessfully Added" );
                    } )
                    .catch( ( error ) =>
                    {
                        console.log( "error", error );
                    } )

            }

        }
            });

                //new code
        // try
        // {
        //     let added = false;
        //     let previousData = null;
        //     let alreadyAdded = false;
        //     await AsyncStorage.getItem( 'AddToCart' )
        //         .then( async ( res ) =>
        //         {
        //             console.log( "DashBoard Cart", res )
        //             let cart = JSON.parse( res );
        //             previousData = JSON.parse( res );
        //             if ( await res !== null && await cart.length > 0 )
        //             {
        //
        //                 // this.setState( { cartItem: cart.length } )
        //                 alreadyAdded = await cart.filter( async ( data ) =>
        //                 {
        //
        //                     if ( await data.ID == await item.ID )
        //                     {
        //                         if ( await data.selectedVariation == await this.state.selectedVarinat )
        //                         {
        //                             added = true;
        //                             // this.setState( { quentity: data.cartQuentity + 1 } )
        //
        //                         }
        //                         else
        //                         {
        //                             added = false
        //                         }
        //                         return true;
        //                     }
        //                     else;
        //                     {
        //                         added = false;
        //                         return false;
        //                     }
        //                 } );
        //             }
        //             else
        //             {
        //                 added = false;
        //                 alreadyAdded = false;
        //             }
        //         } )
        //         .catch( ( error ) =>
        //         {
        //             console.log( "Error", error )
        //             // this.setState( { cartData: [] } )
        //         } )
        //
        //     console.log( "Alreday Added", added )
        //     if ( await added === false )
        //     {
        //         let cartData = [];
        //
        //         // previousData=[];
        //         let finalItem = {
        //             ...item,
        //             selectedVariation: this.state.selectedVarinat,
        //             cartPrice: this.state.price * this.state.quentity,
        //             cartRegularPrice: this.state.cartRegularPrice,
        //             cartQuentity: this.state.quentity,
        //             regPrice: this.state.regPrice,
        //             sPrice: this.state.sPrice,
        //             selectedVarinatID: this.state.selectedVarinatID
        //         };
        //         if ( await previousData != null && await previousData.length > 0 )
        //         {
        //             previousData.push( finalItem );
        //         } else
        //         {
        //             previousData = [];
        //             previousData.push( finalItem );
        //         }
        //
        //         await AsyncStorage.setItem( 'AddToCart', JSON.stringify( previousData ) )
        //             .then( ( res ) =>
        //             {
        //                 EventRegister.emit( 'Add-to-cart' )
        //                 EventRegister.emit('count')
        //                 setTimeout( () =>
        //                 {
        //                     this.props.navigation.navigate( 'Cart' );
        //                 }, 1000 )
        //                 console.log( "Sucessfully Added" );
        //             } )
        //             .catch( ( error ) =>
        //             {
        //                 console.log( "error", error );
        //             } )
        //     }
        //     else
        //     {
        //         // let finalItem ={
        //         //     ...item,
        //         //     selectedVariation:this.state.selectedVarinat,
        //         //     cartPrice:this.state.price * this.state.quentity + 1,
        //         //     cartRegularPrice:this.state.cartRegularPrice,
        //         //     cartQuentity:this.state.quentity,
        //         //     regPrice:this.state.regPrice,
        //         //     sPrice:this.state.sPrice
        //         // };
        //         // previousData.push(finalItem );
        //         let UpdatedData = previousData.filter( ( data ) =>
        //         {
        //             if ( data.ID === item.ID )
        //             {
        //                 if ( data.selectedVariation !== this.state.selectedVarinat )
        //                 {
        //                     // let finalItem ={
        //                     //     ...data,
        //                     //     selectedVariation:this.state.selectedVarinat,
        //                     //     cartPrice:this.state.price * this.state.quentity + 1,
        //                     //     cartRegularPrice:this.state.cartRegularPrice,
        //                     //     cartQuentity:this.state.quentity,
        //                     //     regPrice:this.state.regPrice,
        //                     //     sPrice:this.state.sPrice
        //                     // };
        //                     return data
        //                 }
        //             }
        //         } );
        //         let oldData = previousData.filter( ( data ) =>
        //         {
        //             if ( data.ID !== item.ID )
        //             {
        //
        //                 return data
        //             }
        //             else
        //             {
        //                 if ( data.ID == item.ID )
        //                 {
        //                     if ( data.selectedVariation != this.state.selectedVarinat )
        //                     {
        //                         // let finalItem ={
        //                         //     ...data,
        //                         //     selectedVariation:this.state.selectedVarinat,
        //                         //     cartPrice:this.state.price * this.state.quentity + 1,
        //                         //     cartRegularPrice:this.state.cartRegularPrice,
        //                         //     cartQuentity:this.state.quentity,
        //                         //     regPrice:this.state.regPrice,
        //                         //     sPrice:this.state.sPrice
        //                         // };
        //                         return data
        //
        //                     }
        //
        //                 }
        //             }
        //
        //         } );
        //         console.log( "DAATTATATTATA", UpdatedData )
        //         this.setState( { quentity: this.state.quentity + 1 } )
        //         if ( oldData !== null )
        //         {
        //             oldData.push( {
        //                 ...item,
        //                 selectedVariation: this.state.selectedVarinat,
        //                 cartPrice: this.state.price * this.state.quentity,
        //                 cartRegularPrice: this.state.cartRegularPrice,
        //                 cartQuentity: this.state.quentity,
        //                 regPrice: this.state.regPrice,
        //                 sPrice: this.state.sPrice,
        //                 selectedVarinatID: this.state.selectedVarinatID
        //
        //             } )
        //         }
        //         else
        //         {
        //             oldData = []
        //         }
        //         await AsyncStorage.setItem( 'AddToCart', JSON.stringify( oldData ) )
        //             .then( ( res ) =>
        //             {
        //
        //                 EventRegister.emit( 'Add-to-cart' )
        //                 EventRegister.emit('count')
        //                 this.props.navigation.navigate( 'Cart' );
        //                 console.log( "Sucessfully Added" );
        //             } )
        //             .catch( ( error ) =>
        //             {
        //                 console.log( "error", error );
        //             } )
        //         // alert( "Item Already added" )
        //     }
        // }
        // catch ( error )
        // {
        //
        // }

        // this.setState( { visible: true } )
        // let previousData = [];
        // let alreadyAdded = false;
        // let added = false;
        // await AsyncStorage.getItem( 'AddToCart' )
        //     .then( ( res ) =>
        //     {
        //         console.log( "DashBoard Cart", res )
        //         let cart = JSON.parse( res );
        //         previousData = JSON.parse( res );
        //         if ( order?.length > 0 )
        //         {
        //             let orderData = [];
        //
        //
        //             // let addFlag=false;
        //             order?.map( ( item, index ) =>
        //             {
        //                 Apis.getProductByCategoryId( {
        //                     "product_id": item._product_id
        //                 } )
        //                     .then( ( res ) =>
        //                     {
        //                         return JSON.stringify( res )
        //
        //                     } )
        //                     .then( ( response ) =>
        //                     {
        //                         console.log( "response", JSON.parse( response ))
        //
        //                         if ( JSON.parse( response ).data.status == true )
        //                         {
        //                             console.log( "Response", response )
        //                             let data = JSON.parse( response )?.data?.data
        //                             let newItem = {
        //                                 ...data[ 0 ],
        //                                 selectedVariation: item?.pa_weight,
        //                                 cartPrice: item?._line_total,
        //                                 cartRegularPrice: item?._line_total,
        //                                 cartQuentity: item?._qty,
        //                                 regPrice: item?._line_total / item?._qty,
        //                                 sPrice: item?._line_total / item?._qty,
        //                                 selectedVarinatID: item?._vendor_id
        //                             }
        //                             previousData.push( newItem )
        //                             this.setState( { visible: true } )
        //
        //                             this.addToCart( previousData )
        //                         }
        //                         else
        //                         {
        //                             this.setState( { visible: false } )
        //                             alert( "Product can not re order" );
        //                         }
        //
        //                     } )
        //                     .catch( ( error ) =>
        //                     {
        //                         this.setState( { visible: false } )
        //                         alert( "Product can not re order" );
        //                         console.log( "error", error )
        //                     } )
        //
        //             } );
        //         }
        //
        //     } )
        //     .catch( ( error ) =>
        //     {
        //         console.log( "Error", error )
        //         // this.setState( { cartData: [] } )
        //     } )
        //
        // if ( added === false )
        // {
        //
        // }


    }
    addToCart = ( orderData ) =>
    {
        AsyncStorage.setItem( 'AddToCart', JSON.stringify( orderData ) )
            .then( ( res ) =>
            {


                setTimeout( () =>
                {
                    this.setState( { visible: false } )
                    EventRegister.emit( 'Add-to-cart' )
                    this.props.navigation.navigate( 'Cart' );
                }, 1000 )
                console.log( "Sucessfully Added" );
            } )
            .catch( ( error ) =>
            {
                this.setState( { visible: false } )
                alert( "Product can not re order" );
                console.log( "error", error );
            } )
    }
    getOrders = () =>
    {
        this.setState( { visible: true } )
        // console.log( "UserData", this.state.userData )
        AsyncStorage.getItem( 'UserData' )
            .then( ( res ) =>
            {


                //   console.log( "UserRes", dd)
                if ( res !== null )
                {
                    let dd = JSON.parse( res ).data;
                    console.log( "UserRes", dd )
                    Apis.getOrderCall( {
                        "user_id": dd[ 0 ]?.ID
                    } ).then( ( res ) =>
                    {
                        return JSON.stringify( res )
                    } )
                        .then( ( response ) =>
                        {
                            this.setState( { visible: false } )

                            let data = JSON.parse( response ).data
                            console.log( "ORDER", data )
                            this.setState( {
                                orders: data?.data
                            } )

                        } )
                        .catch( ( error ) =>
                        {
                            this.setState( { visible: false } )
                            alert( "some thing went wront ! Please try Again" )
                            console.log( "Error", error )
                        } )
                }

            } ).catch( ( error ) =>
            {
                console.log( "Error", error )
                alert( "some thing went wront ! Please try Again" )
                this.setState( { visible: false } )
            } )
        //

    }
    componentDidMount ()
    {

        this.getOrders()
    }
    renderOrder = ( item, index ) =>
    {
      var  orderStatus
        const config = {
            headers: { Authorization: `Bearer ${this.state.shipToken}`,
         "Content-Type": "application/json"
            }
        };

        axios.get(`https://apiv2.shiprocket.in/v1/external/orders/show/212884016`,{ headers: {"Authorization" : `Bearer ${this.state.shipToken}`}}).
        then((res)=>{

                orderStatus = res?.data?.data?.status
                console.log("Shipping Details",orderStatus);
        }).
        catch((error)=>{
            orderStatus="not started"
            console.log("Shipping Error",error);
        })


        return (
            <View style={ styles.ItemView } >
                <Text style={ [ styles.regularText, , { color: Light_Green, } ] }>Order ID : { item.ID } </Text>
                <View style={ styles.rowView }>
                    <Text style={ [ styles.smallText, { color: Light_Green } ] }>Status :<Text style={ [ styles.smallText, { color: Text_Gray } ] }> { item?.billing_deatil?._order_status }  |</Text></Text>

                    <Text style={ [ styles.smallText, { color: Text_Gray } ] }>{ moment( item.post_date ).format( "DD/MM/YYYY" ) }</Text>
                </View>
                {/* <Text style={ [ styles.smallText, { color: Light_Green } ] }>Shipping Status :<Text style={ [ styles.smallText, { color: Text_Gray } ] }> { orderStatus }  |</Text></Text> */}
                {/* <Text style={[styles.smallText,{color:Light_Green,fontSize:12}]}>Order ID : #230002 </Text>  */ }
                <View style={ [ styles.rowView, { marginVertical: 5 } ] }>
                    <TouchableOpacity style={ styles.btnStyle } onPress={ () =>
                    {
                        console.log("item",item)
                        this.props.navigation.navigate( 'OrderDetails', {
                            data: item
                        } )
                    } }>
                        <Text style={ [ styles.smallText, { color: Light_Green, fontSize: 12 } ] }>View Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.btnStyle } onPress={ () =>
                    {
                        this.reOrder( item.order_deatil )
                        // this.props.navigation.navigate( 'cart', {
                        //     data: item?.order_deatil
                        // } )
                    } }>
                        <Text style={ [ styles.smallText, { color: Light_Green, fontSize: 12 } ] }>Reorder</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <ProgressLoader
                        visible={ this.state.visible }
                        isModal={ true }
                        isHUD={ true }
                        hudColor={ White }
                        color={ Light_Green } />
                    <BasicHeader OnBackPress={ () => { this.props.navigation.navigate( 'Home' ) } } title={ 'My Orders' } />
                    <View style={ { height: screen_height * 0.85, } }>
                       {
                           this.state.orders.length>0?
                           <FlatList
                           data={ this.state.orders }
                           keyExtractor={ ( item, index ) => item.ID }
                           renderItem={ ( { item, index } ) =>
                               this.renderOrder( item, index )
                           } />:
                           this.state.visible == false ?
                           <View style={ { justifyContent: 'center', alignItems: 'center', height: screen_height / 1.5 } }>
                               <Image
                                   style={ styles.emptyCart }
                                   source={ require( '../../../assets/emptyCart.png' ) } />

                               <Text style={ styles.titleText }>Oops</Text>
                               <Text style={ [ styles.normalText, { fontSize: 18, fontFamily: POPINS_REGULAR, textAlign: 'center' } ] }>You've no Orders</Text>
                           </View>
                           : null
                       }
                    </View>

                </SafeAreaView>
            </View>
        );
    }
}

function mapStateToProps ( state, ownProps )
{
    console.log( " state.loginReducer.data", state.loginReducer.data )
    return {


        loginData: state.loginReducer.data,
        isLoading: state.loginReducer.isLoading
    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        loginRequest: ( request ) => dispatch( actions.loginAction( request ) ),
        dispatch
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Orders );
