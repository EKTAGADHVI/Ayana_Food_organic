import React, { Component } from 'react';
import { ImageBackground, ScrollView, View, Text, Pressable, SafeAreaView, KeyboardAvoidingView, Linking } from 'react-native';
import { connect } from 'react-redux';
import FilledButton from '../../Components/Filledbuton';
import Input from '../../Components/Input';
import LogoView from '../../Components/LogoView';
import SocialMediadButton from '../../Components/SocialMediaButton';
import { Black, Dark_Blue, Light_Blue, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import styles from './styles';
import { CommonActions } from '@react-navigation/native';
import { actions } from '../../Redux/actions';
import ProgressLoader from 'rn-progress-loader';
import Toast from 'react-native-toast-message';
import { ToastMessage } from '../../Components/ToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apis from '../../RestApi/Apis';
import { LOGIN_EROOR, LOGIN_SUCESS } from '../../Redux/actionTypes';
import { Settings, LoginManager ,Profile,AccessToken,GraphRequest} from 'react-native-fbsdk-next'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { LOGIN_OTP_URL, LOGIn_OTP_VERIFY_URL } from '../../RestApi/ApiUrl';
  
  GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
    webClientId: '565933835520-7337294km3iarrrmdpcg86j4on30akru.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: '', // specifies a hosted domain restriction
    // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: '', // [Android] specifies an account name on the device that should be used
    // iosClientId: '', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });
  Settings.setAppID('280246270981141');
  Settings.initializeSDK();
  class LoginScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            email: '',
            password: '',
            showPassword: true,
            openKeyboard: false,
            visible: false,
            userDetail:null
        }
    }


    socialAuthentication=(request)=>{
      this.setState( { visible: true } )

        Apis.socialLoginCall(request)
        .then((res)=>{
          return JSON.stringify(res)
        })
        .then((responce)=>{
          if(JSON.parse(responce).data.status == true){
            let data = JSON.parse(responce).data;
            console.log("====== Login Responce ====== >  ", responce);
            AsyncStorage.setItem('UserData',JSON.stringify(data))
            .then(()=>{
              this.setState( { visible: false } )

              this.props.dispatch({
                    type:LOGIN_SUCESS,
                    payload:JSON.parse(responce).data
                });
                ToastMessage('success','Login Sucessfull',)

              this.next_navigation();
            })
            .catch((error)=>{
              this.setState( { visible: false } )

                console.log("====== Login ERR Responce ====== >  ", error);
                this.props.dispatch({
                    type:LOGIN_EROOR,
                    payload:error
                });
            })
      
        }
        else{
          this.setState( { visible: false } )

            console.log("====== Login ERR Responce ====== >  ", responce);
            ToastMessage('error',JSON.parse(responce).data.message,'Please Check');
            this.props.dispatch({
                type:LOGIN_EROOR,
                payload:JSON.parse(responce).data
            });
        }
        })
        .catch((error)=>{
          this.setState( { visible: false } )

          console.log("====Login===Error=== ", error)
         this.props.dispatch({
              type:LOGIN_EROOR,
              payload:error
          });
        })
    }

    onPressFB=async()=>{
        LoginManager.logInWithPermissions(["public_profile"]).then(
            (result)=> {
                // AsyncStorage.getItem('PostalCode')
                // .then((res)=>{
                //     if(res !== null && res !== ''){
                //         this.props.navigation.dispatch(
                //             CommonActions.reset({
                //               index: 1,
                //               routes: [
                //                 { name: 'Home' },
                //               ],
                //             })
                //           );
                //     }
                //     else{
                //         this.props.navigation.dispatch(
                //             CommonActions.reset({
                //               index: 1,
                //               routes: [
                //                 { name: 'AddDeliveryLocation' },
                //               ],
                //             })
                //           );  
                //     }
                // })
                // .catch((err)=>{})
              if (result.isCancelled) {
            
                console.log("Login cancelled");
              } else {
             
                console.log(
                  "Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
          
               Profile.getCurrentProfile().then(
                   (currentProfile)=> {

                      console.log("Current Profile",currentProfile)

                      if (currentProfile) {
                        console.log(" : " +
                          currentProfile.name
                          + ". His profile id is: " +
                          currentProfile.userID
                        );
                        let request= {
                          ...currentProfile,
                          "social_type":"facebook"
                        }
                        this.socialAuthentication(request);
                       
                      }
                    }
                  ).catch((error)=>{
                    this.setState( { visible: false } )
                    console.log("Error",error);
                  })
                 
              }
            },
            function(error) {
              console.log("Login fail with error: " + error);
            }
          );
            }
        
    
    onLoginPress = () =>
    {
        let reg = ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/ );
        console.log( "Entry", this.state.email, this.state.password )
        if ( this.state.email === "" || this.state.email === null )
        {
            ToastMessage('error','Enter  Email','Please Check')
        }
        else if ( reg.test( this.state.email ) === false )
        {
            //email is not correcct
            ToastMessage('error','Enter Valid Email','Please Check')
        }
        else if ( this.state.password === "" || this.state.password === null )
        {
            ToastMessage('error','Enter Password','Please Check')
        }
        else
        {
            console.log( "Else", this.state.email, this.state.password )
            let req = {
                "username": this.state.email,
                "password": this.state.password
            };
            // this.props.loginRequest( req );
            this.setState( { visible: true } )

           
            Apis.loginCall(req)
            .then((res)=>{
              return JSON.stringify(res);
          })
          .then((responce)=>{
           
              if(JSON.parse(responce).data.status == true){
                  let data = JSON.parse(responce).data;
                  console.log("====== Login Responce ====== >  ", responce);
                  AsyncStorage.setItem('UserData',JSON.stringify(data))
                  .then(()=>{
                    this.setState( { visible: false } )

                    this.props.dispatch({
                          type:LOGIN_SUCESS,
                          payload:JSON.parse(responce).data
                      });
                      ToastMessage('success','Login Sucessfull',)

                    this.next_navigation();
                  })
                  .catch((error)=>{
                    this.setState( { visible: false } )

                      console.log("====== Login ERR Responce ====== >  ", error);
                      this.props.dispatch({
                          type:LOGIN_EROOR,
                          payload:error
                      });
                  })
            
              }
              else{
                this.setState( { visible: false } )

                  console.log("====== Login ERR Responce ====== >  ", responce);
                  ToastMessage('error',JSON.parse(responce).data.message,'Please Check');
                  this.props.dispatch({
                      type:LOGIN_EROOR,
                      payload:JSON.parse(responce).data
                  });
              }
          })
          .catch((error)=>{
            this.setState( { visible: false } )

              console.log("====Login===Error=== ", error)
             this.props.dispatch({
                  type:LOGIN_EROOR,
                  payload:error
              });
          })   
      
       
           
        }

       

    }

    next_navigation = () =>{
        AsyncStorage.getItem('PostalCode')
        .then((res)=>{
            if(res !== null && res !== ''){
                this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'Home' },
                      ],
                    })
                  );
            }
            else{
                this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'AddDeliveryLocation' },
                      ],
                    })
                  );  
            }
        })
        .catch((err)=>{})
        // this.props.navigation.navigate( 'Home' );
    }
    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({ userDetail:userInfo });
          console.log("userDetails", userInfo)
          let request={
            ...userInfo,
            "social_type":"google"
          }
          this.socialAuthentication(request)
          // this.next_navigation()
        } catch (error) {
            console.log(error)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };
    componentDidMount(){
        // setTimeout( () =>
        // {
        //     setInterval(()=>{
        //         if ( this.props.loginData.status === true )
        //     {
        //         this.setState( { visible: false } )
        //         ToastMessage('success','Login Sucessfull',)
        //         this.props.navigation.navigate( 'Home' );
        //     }
        //     else
        //     {
        //         this.setState( { visible: false } )
        //     }
        //     },500)
        // }, 2000 )
    }
    componentWillUnmount(){
        clearInterval();
    }

    LoginWithOtp=()=>{
      this.setState( { visible: true } )
      if(this.state.email !== null && this.state.email!== "" && this.state.email.length==10){
        let request={
          "phone":this.state.email
      }
        Apis.loginWithOtpCall(request)
        .then((res)=>{
          return JSON.stringify(res)
        })
        .then((responce)=>{
          this.setState( { visible: false } )
          if(JSON.parse(responce).data.status == true){
            let data = JSON.parse(responce).data;
           
            this.props.navigation.navigate('OtpScreen',{
              detail:data?.data,
              request:{
                "phone":this.state.email
            },
            url:LOGIN_OTP_URL,
            type:"login",
            verifyUrl:LOGIn_OTP_VERIFY_URL
            });
           
      
        }
        else{
          this.setState( { visible: false } )
          let data = JSON.parse(responce).data;
         alert(data.message);
           
        }
        }).
        catch(()=>{})
      }
      else{
        this.setState( { visible: false } )
        alert("please check your phone number")
      }
   
    }
    render ()
    {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 150 : 0
        return (

            <ImageBackground
                source={ require( '../../../assets/background.png' ) }
                style={ styles.mainLayout }>
                <ScrollView showsVerticalScrollIndicator={ false }>
                    <SafeAreaView>
                    <Toast  ref={(ref) => Toast.setRef(ref)}/>
                        <ProgressLoader
                            visible={ this.state.visible }
                            isModal={ true }
                            isHUD={true}
                            hudColor={White}
                            color={ Light_Green } />
                        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={ keyboardVerticalOffset }>
                            <View >
                                <LogoView />

                            </View>
                            <View style={ { marginVertical: 10 } }>
                                <Text style={ styles.titleText } >Login</Text>
                                <Text style={ styles.regularText } >Enter Your Credentials to Continue</Text>
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


                                <Input
                                    title={ "Password" }
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
                                <FilledButton
                                    onPress={ () => { this.LoginWithOtp() } }
                                    title={ "Login with OTP" } />

                                <Pressable onPress={()=>{
                                  this.props.navigation.navigate('Forgotpassword')
                                }}>
                                    <Text style={ [ styles.regularText, { color: Black, textAlign: 'center' } ] }> Forgot Password ?</Text>
                                </Pressable>
                                <FilledButton
                                    onPress={ () =>
                                    {
                                        this.onLoginPress()
                                    } }
                                    title={ "Login " } />
                                <View style={ { flexDirection: 'row', justifyContent: 'center', marginVertical: 5 } }>
                                    <Text style={ [ styles.regularText, { color: Black, textAlign: 'center' } ] }> Don't have account ? </Text>
                                    <Pressable onPress={ () =>

                                    {  
                                        this.props.navigation.navigate( 'RegistrationScreen' )
                                    } }>
                                        <Text style={ [ styles.regularText, { color: Light_Green, textAlign: 'center' } ] }> Sign Up</Text>
                                    </Pressable>
                                </View>

                                <SocialMediadButton
                                    color={ Light_Blue }
                                    source={ require( '../../../assets/google.png' ) }
                                    title={ "Continue with Google " } 
                                    onPress={()=>{this.signIn()}}/>
                                <SocialMediadButton
                                    color={ Dark_Blue }
                                    onPress={()=>{this.onPressFB()}}
                                    source={ require( '../../../assets/facebook.png' ) }
                                    title={ "Continue with FaceBook  " } />
                                <Pressable style={ { paddingBottom: "20%" } } onPress={ () => {this.next_navigation() } }>
                                    <Text style={ [ styles.regularText, { color: Black, textAlign: 'center', textDecorationLine: 'underline' } ] }>Skip { ">" }</Text>
                                </Pressable>
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </ScrollView>
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
        isLoading:state.loginReducer.isLoading
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

export default connect( mapStateToProps, mapDispatchToProps )( LoginScreen );