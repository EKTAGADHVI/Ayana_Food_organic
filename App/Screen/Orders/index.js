import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Component } from 'react';
import { FlatList, SafeAreaView, Image, TouchableOpacity, Text, View } from 'react-native';
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
            visible:false
        };
    }

    getOrders = () =>
    {
        this.setState({visible:true})
        console.log( "UserData", this.state.userData )
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
                            this.setState({visible:false})

                            let data = JSON.parse( response ).data
                            console.log( "ORDER", data )
                            this.setState( {
                                orders: data?.data
                            } )

                        } )
                        .catch( ( error ) =>
                        {
                            this.setState({visible:false})
                            console.log( "Error", error )
                        } )
                }

            } ).catch( ( error ) => { 
                this.setState({visible:false})
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
                <Text style={ [ styles.regularText, , { color: Light_Green, } ] }>Order ID : { item.id } </Text>
                <View style={ styles.rowView }>
                    <Text style={ [ styles.smallText, { color: Light_Green } ] }>Status :<Text style={ [ styles.smallText, { color: Text_Gray } ] }> { item.status }  |</Text></Text>
                    <Text style={ [ styles.smallText, { color: Text_Gray } ] }>{ item.date }</Text>
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
                        // this.props.navigation.navigate('CheckOut')
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
                            keyExtractor={ ( item, index ) => item.id }
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