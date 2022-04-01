import React, { Component } from 'react';
import { ImageBackground, ScrollView, View, Text, Pressable, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import FilledButton from '../../Components/Filledbuton';
import Input from '../../Components/Input';
import LogoView from '../../Components/LogoView';
import SocialMediadButton from '../../Components/SocialMediaButton';
import {config, ToastMessage} from '../../Components/ToastMessage';
import { actions } from '../../Redux/actions';
import { Black, Dark_Blue, Light_Blue, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import styles from './styles';
import { CommonActions } from '@react-navigation/native';
import Apis from '../../RestApi/Apis';
import { REGISTER_EROOR, REGISTER_SUCESS } from '../../Redux/actionTypes';

class RegistrationScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            firstName: '',
            username: "",
            phone: '',
            email: '',
            password: '',
            c_password:'',
            showPassword: true,
            showCPassword: true,
            visible:false
        }
    }
    showToast = () => {
        Toast.show({
          type: 'success',
          text1: 'Hello',
          text2: 'This is some something 👋'
        });
      }
    onSignup = () =>
    {
        let reg = ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/ );
        let pass = ( /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,20})/ )
       
        
        if(this.state.firstName === '' || this.state.firstName === null)
        {
            ToastMessage('error','Enter First Name','Please Check')
        }
       else if ( this.state.username === '' || this.state.username === null )
        { 
            ToastMessage('error','Enter User Name','Please Check')
        }
        else if ( this.state.email === '' || this.state.email === null )
        { 
            ToastMessage('error','Enter Email Address','Please Check')
        }
        else if ( reg.test( this.state.email ) === false )
        {
            //email is not correcct
            ToastMessage('error','Enter Valid Email','Please Check')
        }
        else if ( this.state.phone == "" || this.state.phone === null ) { 
            ToastMessage('error','Enter Phone Number','Please Check')
        }
        else if ( this.state.password == "" || this.state.password === null ) {
            ToastMessage('error','Enter  Password','Please Check')
         }
         else if ( pass.test(this.state.password)===false ) {
            ToastMessage('error','Enter  Valid Password','Please Check')
         }
         else if ( this.state.c_password == "" || this.state.c_password === null ) {
            ToastMessage('error','Enter  Confirm Password','Please Check')
         }
         else if ( pass.test(this.state.c_password)===false ) {
            ToastMessage('error','Enter  Valid Confirm Password','Please Check')
         }
         else if ( this.state.password !== this.state.c_password ) {
            ToastMessage('error','Password Not Matched','Please Check')
         }
        else
        {
            this.setState({visible:true})
            // let req = {
            //     "firstname": this.state.firstName,
            //     "username":this.state.username,
            //     "phone":this.state.phone,
            //     "email":this.state.email,
            //     "password":this.state.password
            // }
            // this.props.registerRequest( req );
            this.callApi();
            // setTimeout(()=>{

            // setInterval(()=>{
           
            //     if(this.props.registerData.status === true)
            //     { this.setState({visible:false})
            //     this.props.navigation.dispatch(
            //         CommonActions.reset({
            //           index: 1,
            //           routes: [
            //             { name: 'LoginScreen' },
            //           ],
            //         })
            //       );
            //     }
            //     else{
            //         this.setState({visible:false})
            //         ToastMessage('error',this.props.registerData.message,'Please Check')
            //     }
            // },800)
            // },2000)
        }

    }

    callApi = () =>{
        let req = {
            "firstname": this.state.firstName,
            "username":this.state.username,
            "phone":this.state.phone,
            "email":this.state.email,
            "password":this.state.password
        }
        Apis.registrationCall(req)
        .then((res)=>{
          return JSON.stringify(res);
      })
      .then((responce)=>{
          if(JSON.parse(responce).data.status == true){
              console.log("====== Registration Responce ====== >  ", responce);
          this.props.dispatch({
              type:REGISTER_SUCESS,
              payload:JSON.parse(responce).data
          });
          this.setState({visible:false})
                this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'LoginScreen' },
                      ],
                    })
                  );
          }
          else{
            this.setState({visible:false})
            ToastMessage('error',JSON.parse(responce).data.message,'Please Check')
             this.props.dispatch({
                  type:REGISTER_EROOR,
                  payload:JSON.parse(responce).data
              });
          }
         
      })
      .catch((error)=>{
          console.log("====Registration===Error=== ", error)
          this.props.dispatch({
              type:REGISTER_EROOR,
              payload:error
          });
      })   
  
    }

    render ()
    {
        return (
            <ImageBackground
                source={ require( '../../../assets/background.png' ) }
                style={ styles.mainLayout }>

                <SafeAreaView>

                <Toast  />
                <ProgressLoader
                visible={this.state.visible}
                isModal={true} 
                isHUD={true}
                hudColor={White}
                color={Light_Green} />
                    <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? "padding" : "height" } keyboardVerticalOffset={ 40 }>
                        <ScrollView automaticallyAdjustContentInsets={ true } showsVerticalScrollIndicator={ false }>
                            <View >
                                <LogoView />

                            </View>
                            <View style={ { marginVertical: 10 } }>
                         
                                <Text style={ styles.titleText } >Sign Up</Text>
                                <Text style={ styles.regularText } >Enter Your Credentials to Continue</Text>
                            </View>

                            <View style={ { marginVertical: 10 } }>
                                <Input
                                    title={ "First Name" }
                                    value={ this.state.firstName }
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState( {
                                            firstName: text
                                        } )
                                    } }
                                    secureTextEntry={ false }                                 
                                    placeholder={ "xyz" }
                                />
                                <Input

                                    title={ "Username" }
                                    value={ this.state.username }
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState( {
                                            username: text
                                        } )
                                    } }
                                    secureTextEntry={ false }

                                    iconPress={ () =>
                                    {
                                        this.setState( {
                                            showPassword: true
                                        } )
                                    } }
                                    placeholder={ "xyz" }
                                />

                                <Input

                                    title={ "Email" }
                                    value={ this.state.email }
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState( {
                                            email: text
                                        } )
                                    } }
                                    secureTextEntry={ false }
                                    keyboardType={ 'email-address' }
                                    iconPress={ () =>
                                    {
                                        this.setState( {
                                            showPassword: true
                                        } )
                                    } }
                                    placeholder={ "xyz@gmail.com" }
                                />

                                <Input
                                    keyboardType={ 'phone-pad' }
                                    title={ "Mobile Number" }
                                    value={ this.state.phone }
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState( {
                                            phone: text
                                        } )
                                    } }
                                    maxLength={10}
                                    secureTextEntry={ false }

                                    iconPress={ () =>
                                    {
                                        this.setState( {
                                            showPassword: true
                                        } )
                                    } }
                                    placeholder={ "+91 9056256525" }
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

<Input
                                    title={ "Confirm Password" }
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
                                <FilledButton
                                    onPress={ () => { 
                                       this.showToast()
                                    } }
                                    title={ "Sign Up with OTP" } />

                                {/* <Pressable>
                                <Text style={ [ styles.regularText, { color: Black, textAlign: 'center' } ] }> Forgot Password ?</Text>
                            </Pressable> */}
                                <FilledButton
                                    onPress={ () => { this.onSignup() } }
                                    title={ "Sign Up " } />
                                <View style={ { flexDirection: 'row', justifyContent: 'center', marginVertical: 5 } }>
                                    <Text style={ [ styles.regularText, { color: Black, textAlign: 'center' } ] }> Already have an account ? </Text>
                                    <Pressable onPress={ () =>
                                    {
                                        this.props.navigation.navigate( 'LoginScreen' )
                                    } }>
                                        <Text style={ [ styles.regularText, { color: Light_Green, textAlign: 'center' } ] }> Sign In</Text>
                                    </Pressable>
                                </View>


                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

function mapStateToProps ( state, ownProps )
{
    console.log( " state.registerReducer.data", state.registerReducer.data )
    return {
        registerData: state.registerReducer.data

    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        registerRequest: ( request ) => dispatch( actions.registerAction( request ) ),
        dispatch
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( RegistrationScreen );
