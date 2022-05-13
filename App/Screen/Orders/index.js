import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { POPINS_SEMI_BOLD } from '../../Utils/fonts';
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
            visible: false
        };
    }


    reOrder = ( order ) =>
    {
        this.setState( { visible: true } )
        if ( order?.length > 0 )
        {
            let orderData = [];
            // let addFlag=false;
            order?.map(  ( item, index ) =>
            {console.log("map Called")
                Apis.getProductByCategoryId( {
                    "product_id": item._product_id
                } )
                    .then( ( res ) =>
                    {
                        return JSON.stringify( res )
                    } )
                    .then( ( response ) =>
                    {
                      
                        if ( JSON.parse( response ).data.status == true )
                        {  console.log("Response",response)
                            let data = JSON.parse( response )?.data?.data
                            let newItem = {
                                ...data[0],
                                selectedVariation: item?.pa_weight,
                                cartPrice: item?._line_total,
                                cartRegularPrice: item?._line_total,
                                cartQuentity: item?._qty,
                                regPrice: item?._line_total / item?._qty,
                                sPrice: item?._line_total / item?._qty,
                                selectedVarinatID: item?._vendor_id
                            }
                            orderData.push( newItem )
                            this.setState( { visible: true } )

                            this.addToCart(orderData)
                        }
                        else
                        {
                            this.setState( { visible: false } )
                            alert( "Product can not re order" );
                        }
                      
                    } )
                    .catch( ( error ) =>
                    {
                        this.setState( { visible: false } )
                        alert( "Product can not re order" );
                        console.log( "error", error )
                    } )
             
                 
                  
              

            } );

          
        }
    }
    addToCart=(orderData)=>{
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
        return (
            <View style={ styles.ItemView } >
                <Text style={ [ styles.regularText, , { color: Light_Green, } ] }>Order ID : { item.ID } </Text>
                <View style={ styles.rowView }>
                    <Text style={ [ styles.smallText, { color: Light_Green } ] }>Status :<Text style={ [ styles.smallText, { color: Text_Gray } ] }> { item?.billing_deatil?._order_status }  |</Text></Text>
                    <Text style={ [ styles.smallText, { color: Text_Gray } ] }>{ moment( item.post_date ).format( "DD/MM/YYYY" ) }</Text>
                </View>
                {/* <Text style={[styles.smallText,{color:Light_Green,fontSize:12}]}>Order ID : #230002 </Text>  */ }
                <View style={ [ styles.rowView, { marginVertical: 5 } ] }>
                    <TouchableOpacity style={ styles.btnStyle } onPress={ () =>
                    {
                        this.props.navigation.navigate( 'OrderDetails', {
                            data: item
                        } )
                    } }>
                        <Text style={ [ styles.smallText, { color: Light_Green, fontSize: 12 } ] }>View Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.btnStyle } onPress={ () =>
                    {
                        this.reOrder( item?.order_deatil )
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
                    <BasicHeader OnBackPress={ () => { this.props.navigation.navigate( 'Home' ) } } title={ 'Orders' } />
                    <View style={ { height: screen_height * 0.85, } }>
                        <FlatList
                            data={ this.state.orders }
                            keyExtractor={ ( item, index ) => item.ID }
                            renderItem={ ( { item, index } ) =>
                                this.renderOrder( item, index )
                            } />
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