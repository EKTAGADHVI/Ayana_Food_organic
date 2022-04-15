import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Alert, Image, ImageBackground, KeyboardAvoidingView, PermissionsAndroid, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import Input from '../../Components/Input';
import { screen_height, screen_width } from '../../Utils/constant';
import styles from './styles';
import { CommonActions } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { connect } from 'react-redux';
import { actions } from '../../Redux/actions';
import { Light_Green, White } from '../../Utils/colors';
import ProgressLoader from 'rn-progress-loader';
import { ToastMessage } from '../../Components/ToastMessage';
import Apis from '../../RestApi/Apis';
import { PINCODE_ERROR, PINCODE_SUCESS } from '../../Redux/actionTypes';
Geocoder.init( "AIzaSyCTz9fyFDqADXgLIutTMm80RQTt3h5Ns2g" );
class AddDeliveryLocation extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            deliveryCode: '',
            currentLocation: '',
            visible: false,
            localArea:""
        }
    }

    componentDidMount ()
    {
        if ( Platform.OS === 'android' )
        {
            this.requestLocationPermission()
        }
        else
        {
            Geolocation.requestAuthorization( 'always' );
            // Geolocation.setRNConfiguration({
            //     skipPermissionRequests: false,
            //    authorizationLevel: 'whenInUse',
            //  });
        }

    }
    requestLocationPermission = async () => 
    {
        try
        {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Ayana Food & Organic',
                    'message': 'access to your location '
                }
            )
            if ( granted === PermissionsAndroid.RESULTS.GRANTED )
            {
                console.log( "You can use the location" )
                //   alert("You can use the location");
            } else
            {
                console.log( "location permission denied" )
                //   alert("Location permission denied");
            }
        } catch ( err )
        {
            console.warn( err )
        }
    }

    onGetCurrentLocation = () =>
    {
        this.setState({visible:true})
        Geolocation.getCurrentPosition(
            ( position ) =>
            {
                console.log( position );
                Geocoder.from( position.coords.latitude,  position.coords.longitude )
                    .then( json =>
                    {
                      
                        var addressComponent = json.results[ 0 ].address_components
                        let PostalCode= addressComponent.filter((data)=>{
                                console.log("data",data)
                            if(data.types[0]=== 'postal_code'){
                               return data.long_name[0];
                            }
                        })
                        let AddreesCode= addressComponent.filter((data)=>{
                            console.log("data",data)
                        if(data.types[0]=== 'locality'){
                           return data.long_name[0];
                        }
                    })
                        this.setState({
                            visible:false,
                            deliveryCode:PostalCode[0].long_name,
                            localArea:AddreesCode[0].long_name
                         })
                        // console.log( addressComponent );
                        console.log( "posatl code",AddreesCode[0].long_name+','+PostalCode[0].long_name );
                    } )
                    .catch( error => console.warn( error ) );
            },
            ( error ) =>
            {
                // See error code charts below.
                console.log( error.code, error.message );
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    callAPI = () =>
    {
        let request = {
            "pincode": this.state.deliveryCode
        }
        this.setState( { visible: true } )
        Apis.pincode( request )
            .then( ( res ) =>
            {
                return JSON.stringify( res );
            } )
            .then( ( responce ) =>
            {

                if ( JSON.parse( responce ).data.status == true )
                {
                    console.log( "====== PINCODE_LOADING====== >  ", JSON.parse( responce ).data );
                    this.props.dispatch( {
                        type: PINCODE_SUCESS,
                        payload: JSON.parse( responce ).data
                    } );
                        let display=this.state.localArea.toString() +' , '+this.state.deliveryCode.toString();
                        AsyncStorage.setItem( 'PostalCode', JSON.stringify( {
                            code: this.state.deliveryCode,
                            disPlay:display,
                            isAdded: true
                        } ) )
                            .then( ( response ) =>
        {

                                this.setState( { visible: true } )
                                console.log( "Postal Code Added" )
                                this.props.navigation.dispatch(
                                    CommonActions.reset( {
                                        index: 1,
                                        routes: [
                                            { name: 'Home' },
                                        ],
                                    } )
                                );
                            } )
                            .catch( ( err ) =>
                            {
                                this.setState( { visible: false } )
                                console.log( "errr", err );
                            } )
                  

                }
                else
                {
                    console.log( "====== PINCODE_LOADING====== >  ", JSON.parse( responce ).data );
                    this.props.dispatch( {
                        type: PINCODE_ERROR,
                        payload: JSON.parse( responce ).data
                    } );
                }

            } )
            .catch( ( error ) =>
            {
                this.props.dispatch( {
                    type: PINCODE_ERROR,
                    payload: error
                } );
                console.log( "==== GET_RECENT_PRODUCT_ERROR===Error=== ", error )
            } )

    }
    onSubmit = () =>
    {
        if ( this.state.deliveryCode === "" || this.state.deliveryCode === null )
        {
            ToastMessage( 'error', 'Enter Pincode', 'Please Check' );
        }
        else
        {

            this.callAPI()
        }


    }
    render ()
    {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
        return (
            <ImageBackground
                style={ styles.mainLayout }
                source={ require( '../../../assets/background.png' ) } >
                <SafeAreaView>
                    <ProgressLoader
                        visible={ this.state.visible }
                        isModal={ true }
                        isHUD={ true }
                        hudColor={ White }
                        color={ Light_Green } />
                    <ScrollView showsVerticalScrollIndicator={ false } automaticallyAdjustContentInsets={ true } >

                        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={ keyboardVerticalOffset }>
                            <BasicHeader style={ { backgroundColor: 'transperent' } } OnBackPress={ () => { this.props.navigation.goBack() } } />

                            <View style={ { height: screen_height / 1.6, justifyContent: 'center' } }>
                                <Image
                                    source={ require( '../../../assets/locationImage.png' ) }
                                    style={ styles.bannerStyle } />
                                <View style={ { paddingVertical: 10, paddingHorizontal: 15 } }>
                                    <Text style={ styles.titleText }>Select Delivery Location</Text>
                                    <Text style={ styles.normalText }>Product has been shown based on the delivery location</Text>
                                </View>
                            </View>
                            <View >
                                <Input
                                   
                                    title={ "Add Your Delivery Location" }
                                    value={ this.state.deliveryCode }
                                    maxLength={6}
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState( {
                                            deliveryCode: text
                                        } )
                                    } }
                                    secureTextEntry={ false }
                                    placeholder={ "Enter Your Pincode" }
                                    textStyle={ styles.labelStyle }
                                />
                                <TouchableOpacity onPress={()=>{
                                    this.onGetCurrentLocation();
                                }}>
                                    <View style={ styles.rowView }>
                                        <Image
                                            style={ styles.iconStyle }
                                            source={ require( '../../../assets/current.png' ) } />
                                        <Text style={ styles.regularText }>Current Location Using GPS</Text>
                                    </View>
                                </TouchableOpacity>

                                <FilledButton
                                    onPress={ () => { this.onSubmit() } }
                                    title={ "Submit" } />
                            </View>


                        </KeyboardAvoidingView>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}
function mapStateToProps ( state, ownProps )
{
    console.log( " state.pincodeReducer.data", state.pincodeReducer.data )
    return {
        registerData: state.registerReducer.data,
        pincodeData: state.pincodeReducer.data
    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        pincodeRequest: ( request ) => dispatch( actions.pincodeAction( request ) ),
        dispatch
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( AddDeliveryLocation );