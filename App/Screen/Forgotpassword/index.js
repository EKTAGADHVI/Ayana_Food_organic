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
import ProgressLoader from 'rn-progress-loader';

function makeMeTwoDigits ( n )
{
    let minutes = Math.floor( n / 60 );
    let seconds = Math.ceil( n % 60 );
    return ( '0' + minutes ).slice( -2 ) + " : " + ( '0' + seconds ).slice( -2 );
}

let timerSatatus;
let ShowTimer;
class Forgotpassword extends Component
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
            reSendButton: false,
            timeHideShow: true,
            timer: 120,
            showRessendText: false,
            isOtpSent: false,
            userId:'',
            passVisible:false,
            veryfi:false,
            c_password:"",
            showCPassword:true

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
        // this.StartTimer()
    }

    reSentOTP=()=>{
        let reg = ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/ );
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let request;
        isValid=false;
        if ((this.state.email !==null ||this.state.email !== "") && (this.state.email.match( phoneno )) )
        {
            request={
                "phone":this.state.email
            }
            isValid=true;
            // return true;
            // alert( "Phone" )
        }
       
        else if((this.state.email !==null ||this.state.email !== "")&& (reg.test( this.state.email ) === true)){
            request={
                "email":this.state.email
            }
            isValid=true;
        }
        else{
            alert( "Enter Valid Details" );
        }

        if(isValid == true){
            this.setState( { visible: true } )
            Apis.resendforgotCall(request)
            .then((res)=>{
                return JSON.stringify(res);
            }).then((response)=>{
                if ( JSON.parse( response ).data.status == true )
                {
                    let data = JSON.parse( response ).data;
                    console.log( "====== Login Responce ====== >  ", response );
                    this.StartTimer();
                    this.setState( {
                        visible: false,
                        showRessendText: false,
                        reSendButton: false,
                        userId:data?.data?.user_id,
                        isOtpSent:true

                    } )

                }
                else
                {
                    let data = JSON.parse( response ).data;
                    this.setState( { visible: false } )
                    alert(data?.message)
                    console.log( "====== Login ERR Responce ====== >  ", response );
                    //   ToastMessage('error',JSON.parse(responce).data.message,'Please Check');

                }
            }).catch((error)=>{
                this.setState( { visible: false } )
                console.log("Error",error)
            })
        }
        else{} 
    }
    sentOtp = () =>
    {
        let reg = ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/ );
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let request;
        isValid=false;
        if ((this.state.email !==null ||this.state.email !== "") && (this.state.email.match( phoneno )) )
        {
            request={
                "phone":this.state.email
            }
            isValid=true;
            // return true;
            // alert( "Phone" )
        }
       
        else if((this.state.email !==null ||this.state.email !== "")&& (reg.test( this.state.email ) === true)){
            request={
                "email":this.state.email
            }
            isValid=true;
        }
        else{
            alert( "Enter Valid Details" );
        }

        if(isValid == true){
            this.setState( { visible: true } )
            Apis.forgotOtpCall(request)
            .then((res)=>{
                return JSON.stringify(res);
            }).then((response)=>{
                if ( JSON.parse( response ).data.status == true )
                {
                    let data = JSON.parse( response ).data;
                    console.log( "====== Login Responce ====== >  ", response );
                    this.StartTimer();
                    this.setState( {
                        visible: false,
                        showRessendText: false,
                        reSendButton: false,
                        userId:data?.data?.user_id,
                        isOtpSent:true

                    } )

                }
                else
                {
                    let data = JSON.parse( response ).data;
                    this.setState( { visible: false } )
                    alert(data?.message)
                    console.log( "====== Login ERR Responce ====== >  ", response );
                    //   ToastMessage('error',JSON.parse(responce).data.message,'Please Check');

                }
            }).catch((error)=>{
                this.setState( { visible: false } )
                console.log("Error",error)
            })
        }
        else{}
    }


    verifyOtp = () =>{
       if(this.state.code !== null && this.state.code !== ""){
        let request= {
            "user_id":this.state.userId,
            "otp":this.state.code
        }
        this.setState( { visible: true } )
        Apis.forgotOtpVerifyCall(request)
        .then((res)=>{
            return JSON.stringify(res);
        }).then((response)=>{
            if ( JSON.parse( response ).data.status == true )
            {
                let data = JSON.parse( response ).data;
                console.log( "====== Login Responce ====== >  ", response );
                // this.StartTimer();
                this.setState( {
                    visible: false,
                    passVisible:true,
                    isOtpSent:false,
                    timeHideShow:true,
                    showRessendText:false,
                    veryfi:true
                } )

            }
            else
            {
                let data = JSON.parse( response ).data;
                this.setState( { visible: false } )
                alert(data?.message)
                console.log( "====== Login ERR Responce ====== >  ", response );
                //   ToastMessage('error',JSON.parse(responce).data.message,'Please Check');

            }
        }).catch((error)=>{
            this.setState( { visible: false } )
            console.log("Error",error)
        })

       }
    } 

    submitPassword = () =>{
        let pass = ( /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,20})/ )
        if ( this.state.password == "" || this.state.password === null ) {
            // ToastMessage('error','Enter  Password','Please Check')
            alert("Please Enter Password")
         }
         else if ( pass.test(this.state.password)===false ) {
             alert("Password not match","password must be 8 character and have special character and number")
            // ToastMessage('error','Enter  Valid Password','Please Check')
         }
         else if ( this.state.c_password == "" || this.state.c_password === null ) {
            alert("Please Re-Enter Password")
            // ToastMessage('error','Enter  Confirm Password','Please Check')
         }
         else if ( pass.test(this.state.c_password)===false ) {
            // ToastMessage('error','Enter  Valid Confirm Password','Please Check')
            alert('Enter  Valid Confirm Password')
         }
         else if ( this.state.password !== this.state.c_password ) {
            // ToastMessage('error','Password Not Matched','Please Check')
            alert('Password Not Matched')
         }else{
             let request={
                "user_id":this.state.userId,
                "new_pwd":this.state.password
             }
             this.setState( { visible: true } )
             Apis.forgotPassCall(request)
             .then((res)=>{
                 return JSON.stringify(res)
             })
             .then((response)=>{

                if ( JSON.parse( response ).data.status == true )
                {
                    let data = JSON.parse( response ).data;
                    console.log( "====== Login Responce ====== >  ", response );
                    // this.StartTimer();
                    this.setState( {
                        visible: false,
                        // passVisible:true,
                        // isOtpSent:false,
                        // timeHideShow:true,
                        // showRessendText:false,
                        // veryfi:true
                    } )
                    this.props.navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'LoginScreen' },
                          ],
                        })
                      );
    
                }
                else
                {
                    let data = JSON.parse( response ).data;
                    this.setState( { visible: false } )
                    alert(data?.message)
                    console.log( "====== Login ERR Responce ====== >  ", response );
                    //   ToastMessage('error',JSON.parse(responce).data.message,'Please Check');
    
                }
             }).catch((error)=>{
                this.setState( { visible: false } )
             })
         }
    }
    
    render ()
    {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 150 : 0
        return (

            <ImageBackground
                source={ require( '../../../assets/background.png' ) }
                style={ styles.mainLayout }>

                <SafeAreaView style={{height:"100%"}}>
                <ProgressLoader
                            visible={ this.state.visible }
                            isModal={ true }
                            isHUD={ true }
                            hudColor={ White }
                            color={ Light_Green } />
                    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={ keyboardVerticalOffset }>
                        <View  >
                            <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } style={ { backgroundColor: 'transperent', paddingHorizontal: 0 } } title={ "Forgot Password" } />

                        </View>
                        <View style={ { marginVertical: 10 } }>
                            {/* <Text style={ styles.titleText } >Enter Your Register Email/phone </Text> */ }
                            <Text style={ styles.titleText } >Enter Your Credentials to Continue</Text>
                        </View>

                        <View style={ { marginVertical: 10 } }>

                            <Input

                                title={ "Email/Phone" }
                                value={ this.state.email }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        email: text
                                    } )
                                } }
                                secureTextEntry={ false }


                                placeholder={ "xyz@gmail.com" }
                            />
                           

                            {
                                this.state.passVisible == true ?
                               <View>
                                    <Input
                                title={ "New Password" }
                                value={ this.state.password }
                                onChangeText={ ( text ) =>
                                {
                                    this.setState( {
                                        password: text
                                    } )
                                } }
                                secureTextEntry={ this.state.showPassword === true ? true : false }
                                source={ this.state.showPassword === true ? require( '../../../assets/eyeClosed.png' ) : require( '../../../assets/eyeOpen.png' ) }
                                iconPress={ () =>
                                {
                                    this.setState( {
                                        showPassword: !this.state.showPassword
                                    } )
                                } }
                                placeholder={ "**********" }
                            />
                            <Input
                            title={ "Re-Enter New Password" }
                            value={ this.state.c_password }
                            onChangeText={ ( text ) =>
                            {
                                this.setState( {
                                    c_password: text
                                } )
                            } }
                            secureTextEntry={ this.state.showCPassword === true ? true : false }
                            source={ this.state.showCPassword === true ? require( '../../../assets/eyeClosed.png' ) : require( '../../../assets/eyeOpen.png' ) }
                            iconPress={ () =>
                            {
                                this.setState( {
                                    showCPassword: !this.state.showCPassword
                                } )
                            } }
                            placeholder={ "**********" }
                        />
                               </View>: null
                            }
                            {
                                this.state.isOtpSent === true ?
                                    <View>
                                        <Text style={ [ styles.regularText, { color: Light_Green } ] } >Otp has been sent to your email/phone.</Text>
                                        <OTPInputView


                                            style={ { height: 20, width: 20, borderRadius: 10, } }
                                            pinCount={ 4 }

                                            code={ this.state.code } //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                            onCodeChanged={ code => { this.setState( { code } ) } }
                                            autoFocusOnLoad

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
                                    </View> :
                                    null
                            }

                        </View>



                   
                 {this.state.veryfi === false ?
                   <View>
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
                                       this.reSentOTP()
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
                    { this.state.isOtpSent === true ?
                        <TouchableOpacity style={ styles.btnStyle } 
                        onPress={()=>{
                            this.verifyOtp()
                        }}>
                            <Text style={ [ styles.regularText, { color: White, paddingVertical: 0 } ] }>Verify Otp</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={ styles.btnStyle }
                            onPress={ () =>
                            {
                                this.sentOtp()
                            } } >
                            <Text style={ [ styles.regularText, { color: White, paddingVertical: 0 } ] }>Send Otp</Text>
                        </TouchableOpacity> }
                   </View>:null}
                    {
                        this.state.passVisible == true ?
                      <View>
                            <TouchableOpacity style={ styles.btnStyle } 
                        onPress={()=>{
                            // this.verifyOtp()
                            this.submitPassword()
                        }}>
                            <Text style={ [ styles.regularText, { color: White, paddingVertical: 0 } ] }>Submit</Text>
                        </TouchableOpacity>
                      </View>
                        :null
                    }

                   
                      
</KeyboardAvoidingView>
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

export default connect( mapStateToProps, mapDispatchToProps )( Forgotpassword );
