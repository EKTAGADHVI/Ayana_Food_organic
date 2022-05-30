import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { Component } from 'react';
import { ImageBackground, ScrollView, View, Text, Pressable, SafeAreaView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import Input from '../../Components/Input';
import LogoView from '../../Components/LogoView';
import SocialMediadButton from '../../Components/SocialMediaButton';
import { actions } from '../../Redux/actions';
import { LOGIN_EROOR, LOGIN_SUCESS, REGISTER_EROOR, REGISTER_SUCESS } from '../../Redux/actionTypes';
import Apis from '../../RestApi/Apis';
import { Black, Dark_Blue, Light_Blue, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import styles from './styles';
import { CommonActions } from '@react-navigation/native';
import instance from '../../RestApi';
function makeMeTwoDigits ( n )
{
    let minutes = Math.floor( n / 60 );
    let seconds = Math.ceil( n % 60 );
    return ( '0' + minutes ).slice( -2 ) + " : " + ( '0' + seconds ).slice( -2 );
}

let timerSatatus;
let ShowTimer;
class OtpScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            email: '',
            password: '',
            showPassword: true,
            code: '',
            visible: false,
            type: this.props.route.params?.type,
            detail: this.props.route.params?.detail,
            url: this.props.route.params?.url,
            verifyUrl: this.props.route.params?.verifyUrl,
            request: this.props.route.params?.request,
            reSendButton: false,
            timeHideShow: true,
            timer: 120,
            showRessendText: false,
            verifyOtp:this.props.route.params?.detail?.verifyotp ?this.props.route.params?.detail?.verifyotp:""

        }
    }
    async StartTimer ()
    {
        setTimeout( async () =>
        {
            this.setState( { reSendButton: true, timeHideShow: false }, () =>
            {
                this.clockCall = setInterval( () =>
                {
                    this.decrementClock();
                }, 1000 );
            } );
        }, 2000 );
    }
    decrementClock = () =>
    {
        this.setState( ( prevstate ) => ( { timer: prevstate.timer - 1 } ), () =>
        {
            // Check if we're at zero.
            if ( this.state.timer === 0 )
            {
                this.setState( { reSendButton: false, timeHideShow: true, timer: 30, showRessendText: true } );
                clearInterval( this.clockCall );
            }
        } );


    };

    componentDidMount ()
    {
        this.StartTimer()
    }

    verifyRegisterOTP = () =>
    {
        let request = {
            "firstname": this.state.request.firstname,
            "phone": this.state.request.phone,
            "username": this.state.request.username,
            "email": this.state.request.email,            
            "verifyotp": this.state.verifyOtp,
            "otp": this.state.code
        };

        instance.post( this.state.verifyUrl,request, {
            headers: { "content-type": "application/json" }
        } )
            .then( ( res ) =>
            {
                return JSON.stringify( res );
            } )
            .then( ( responce ) =>
            {

              
                    let data = JSON.parse( responce ).data;

                    if ( JSON.parse( responce ).data.status == true )
                    {
                        console.log( "====== Registration Responce ====== >  ", responce );
                        this.props.dispatch( {
                            type: REGISTER_SUCESS,
                            payload: JSON.parse( responce ).data
                        } );
                        this.setState( { visible: false } )
                        this.props.navigation.dispatch(
                            CommonActions.reset( {
                                index: 1,
                                routes: [
                                    { name: 'LoginScreen' },
                                ],
                            } )
                        );
                    }
                    else
                    {
                        this.setState( { visible: false } )
                        alert(JSON.parse( responce )?.data?.message);
                        // ToastMessage( 'error', JSON.parse( responce ).data.message, 'Please Check' )
                        this.props.dispatch( {
                            type: REGISTER_EROOR,
                            payload: JSON.parse( responce ).data
                        } );
                    }

              
            } )
            .catch( ( error ) =>
            {
                this.setState( { visible: false } )

                console.log( "====Login===Error=== ", error )

            } )
    }
    verifyLoginOTP = () =>
    {
        let request =
        {
            "user_id": this.props.route.params?.detail?.user_id,
            "otp": this.state.code.toString()
        }
        this.setState( { visible: true } )
        instance.post( this.state.verifyUrl, request, {
            headers: { "content-type": "application/json" }
        } )
            .then( ( res ) =>
            {
                return JSON.stringify( res );
            } )
            .then( ( responce ) =>
            {

                if ( JSON.parse( responce ).data.status == true )
                {
                    let data = JSON.parse( responce ).data;
                    console.log( "====== Login Responce ====== >  ", responce );
                    AsyncStorage.setItem( 'UserData', JSON.stringify( data ) )
                        .then( () =>
                        {
                            this.setState( { visible: false } )

                            this.props.dispatch( {
                                type: LOGIN_SUCESS,
                                payload: JSON.parse( responce ).data
                            } );
                            //   ToastMessage('success','Login Sucessfull',)

                            this.next_navigation();
                        } )
                        .catch( ( error ) =>
                        {
                            this.setState( { visible: false } )

                            console.log( "====== Login ERR Responce ====== >  ", error );
                            this.props.dispatch( {
                                type: LOGIN_EROOR,
                                payload: error
                            } );
                        } )

                }
                else
                {
                    this.setState( { visible: false } )
                    alert(JSON.parse(responce).data.message)
                    console.log( "====== Login ERR Responce ====== >  ", responce );
                    //   ToastMessage('error',JSON.parse(responce).data.message,'Please Check');
                    this.props.dispatch( {
                        type: LOGIN_EROOR,
                        payload: JSON.parse( responce ).data
                    } );
                }
            } )
            .catch( ( error ) =>
            {
                this.setState( { visible: false } )

                console.log( "====Login===Error=== ", error )
                this.props.dispatch( {
                    type: LOGIN_EROOR,
                    payload: error
                } );
            } )
    }


    resendLoginOtp = () =>
    {
        let request =
        {
            "user_id": this.props.route.params?.detail?.user_id,
            "phone": this.state?.request?.phone
        }
        this.setState( { visible: true } )
        instance.post( "https://ayanafoodorganic.com//api/login_otp.php?apicall=signin_resend_otp", request, {
            headers: { "content-type": "application/json" }
        } )
            .then( ( res ) =>
            {
                return JSON.stringify( res );
            } )
            .then( ( responce ) =>
            {

                if ( JSON.parse( responce ).data.status == true )
                {
                    let data = JSON.parse( responce ).data;
                    console.log( "====== Login Responce ====== >  ", responce );
                    this.StartTimer();
                    this.setState( {
                        visible: false,
                        showRessendText: false,
                        reSendButton: false
                    } )

                }
                else
                {
                    this.setState( { visible: false } )

                    console.log( "====== Login ERR Responce ====== >  ", responce );
                    //   ToastMessage('error',JSON.parse(responce).data.message,'Please Check');

                }
            } )
            .catch( ( error ) =>
            {
                this.setState( { visible: false } )

                console.log( "Error", error )
            } )
    }

    resendRegisterOtp = () =>
    {
        let request = {
            "firstname": this.state.request.firstname,
            "phone": this.state.request.phone,
            "username": this.state.request.username,
            "email": this.state.request.email,            
          
        };  
        this.setState( { visible: true } )
        instance.post( "https://ayanafoodorganic.com//api/login_otp.php?apicall=signup_resend_otp", request, {
            headers: { "content-type": "application/json" }
        } )
            .then( ( res ) =>
            {
                return JSON.stringify( res );
            } )
            .then( ( responce ) =>
            {

                if ( JSON.parse( responce ).data.status == true )
                {
                    let data = JSON.parse( responce ).data;
                    console.log( "====== Login Responce ====== >  ", responce );
                    this.StartTimer();
                    this.setState( {
                        visible: false,
                        showRessendText: false,
                        reSendButton: false,
                        verifyOtp:data?.data?.verifyotp

                    } )

                }
                else
                {
                    let data = JSON.parse( responce ).data;
                    this.setState( { visible: false } )
                    alert(data?.message)
                    console.log( "====== Login ERR Responce ====== >  ", responce );
                    //   ToastMessage('error',JSON.parse(responce).data.message,'Please Check');

                }
            } )
            .catch( ( error ) =>
            {
                this.setState( { visible: false } )

                console.log( "Error", error )
            } )
    }
    next_navigation = () =>
    {
        AsyncStorage.getItem( 'PostalCode' )
            .then( ( res ) =>
            {
                if ( res !== null && res !== '' )
                {
                    this.props.navigation.dispatch(
                        CommonActions.reset( {
                            index: 1,
                            routes: [
                                { name: 'Home' },
                            ],
                        } )
                    );
                }
                else
                {
                    this.props.navigation.dispatch(
                        CommonActions.reset( {
                            index: 1,
                            routes: [
                                { name: 'AddDeliveryLocation' },
                            ],
                        } )
                    );
                }
            } )
            .catch( ( err ) => { } )
        // this.props.navigation.navigate( 'Home' );
    }
    render ()
    {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 150 : 0
        return (

            <ImageBackground
                source={ require( '../../../assets/background.png' ) }
                style={ styles.mainLayout }>

                <SafeAreaView>
                    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={ keyboardVerticalOffset }>
                        <View  >
                            <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } style={ { backgroundColor: 'transperent', paddingHorizontal: 0 } } />

                        </View>
                        <View style={ { marginVertical: 10 } }>
                            <Text style={ styles.titleText } >Enter Your 4-Digit Code </Text>
                            <Text style={ styles.regularText } >Enter Your Credentials to Continue</Text>
                        </View>

                        <View style={ { marginVertical: 10 } }>
                            <OTPInputView


                                style={ { height: 35, width: 35, borderRadius: 10, } }
                                pinCount={ 4 }

                                code={ this.state.code } //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                onCodeChanged={ code => { this.setState( { code: code} ) } }
                                // autoFocusOnLoad
                                autoFocusOnLoad={false}
                                codeInputFieldStyle={ styles.underlineStyleBase }
                                codeInputHighlightStyle={ styles.underlineStyleHighLighted }
                                onCodeFilled={ ( code ) =>
                                {
                                    console.log( `Code is ${ code }, you are good to go!` )
                                    //  if ( code === this.state.yourPin )
                                    //  {
                                    //      // setTimeout(()=>{
                                    //      // this.setState({progress:false})
                                    //      this.props.navigation.dispatch(
                                    //          CommonActions.reset({
                                    //            index: 1,
                                    //            routes: [
                                    //              { name: 'Dashboard' },
                                    //            ],
                                    //          })
                                    //        );
                                    //      // },1000)
                                    //  }
                                    //  else
                                    //  {
                                    //      alert( "your Pin is Incorrect" );
                                    //  }
                                } }
                                secureTextEntry={ false }
                            />

                        </View>



                    </KeyboardAvoidingView>
                    <View style={ { flexDirection: 'row', padding: 8, alignSelf: "center", justifyContent: "space-between", alignItems: 'center', top: "5%" } }>
                        <View>
                            {
                                !this.state.timeHideShow ?
                                    <Text style={ {
                                        fontSize: 13,
                                        color: '#000',
                                        textAlign: 'center',

                                        right: 10
                                    } }>
                                        { makeMeTwoDigits( this.state.timer ) }
                                    </Text> : null
                            }
                        </View>
                        <View>
                            { this.state.showRessendText === true ?
                                <TouchableOpacity disabled={ this.state.reSendButton }

                                    onPress={ () =>
                                       this.state.type === 'login'? this.resendLoginOtp():this.resendRegisterOtp()
                                    }>
                                    <Text style={ {
                                        color: Light_Green,
                                        fontSize: 14,




                                    } }>Resend OTP ?</Text>
                                </TouchableOpacity>
                                :
                                null }
                        </View>
                    </View>
                    <View style={ styles.bottomStyle }>
                        <TouchableOpacity style={ styles.btnStyle } onPress={ () => { this.state.type === 'login' ? this.verifyLoginOTP() : this.verifyRegisterOTP() } }>
                            <Image
                                style={ styles.imageIcon }
                                source={ require( '../../../assets/right.png' ) } />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

            </ImageBackground>

        );
    }
}
function mapStateToProps ( state, ownProps )
{
    console.log( " state.loginReducer.data", state.loginReducer.data )
    return {
        // data : state.loginReducer.data

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

export default connect( mapStateToProps, mapDispatchToProps )( OtpScreen );
