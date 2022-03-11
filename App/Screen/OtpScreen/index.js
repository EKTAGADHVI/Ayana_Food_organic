import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { Component } from 'react';
import { ImageBackground, ScrollView, View, Text, Pressable, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import Input from '../../Components/Input';
import LogoView from '../../Components/LogoView';
import SocialMediadButton from '../../Components/SocialMediaButton';
import { Black, Dark_Blue, Light_Blue, Light_Green, Text_Gray } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import styles from './styles';


class OtpScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            email: '',
            password: '',
            showPassword: true,
            code:''
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
                        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={ keyboardVerticalOffset }>
                            <View >
                               <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } style={{backgroundColor: 'transperent'}}/>

                            </View>
                            <View style={ { marginVertical: 10 } }>
                                <Text style={ styles.titleText } >Enter Your 4-Digit Code </Text>
                                <Text style={ styles.regularText } >Enter Your Credentials to Continue</Text>
                            </View>

                            <View style={ { marginVertical: 10 } }>
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
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </ScrollView>
            </ImageBackground>

        );
    }
}

export default OtpScreen;