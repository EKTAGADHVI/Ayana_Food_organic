import React, { Component } from 'react';
import { ImageBackground, ScrollView, View, Text, Pressable, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import FilledButton from '../../Components/Filledbuton';
import Input from '../../Components/Input';
import LogoView from '../../Components/LogoView';
import SocialMediadButton from '../../Components/SocialMediaButton';
import { Black, Dark_Blue, Light_Blue, Light_Green, Text_Gray } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import styles from './styles';


class LoginScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            email: '',
            password: '',
            showPassword: true,
            openKeyboard:false
        }
    }

    render ()
    {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 150 : 0
        return (
        
            <ImageBackground
                source={ require( '../../../assets/background.png' ) }
                style={ styles.mainLayout }>
                       <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                  <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
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

                                iconPress={ () =>
                                {
                                    this.setState( {
                                        showPassword: true
                                    } )
                                } }
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
                                onPress={ () => {this.props.navigation.navigate('OtpScreen') } }
                                title={ "Login with OTP" } />

                            <Pressable>
                                <Text style={ [ styles.regularText, { color: Black, textAlign: 'center' } ] }> Forgot Password ?</Text>
                            </Pressable>
                            <FilledButton
                                onPress={ () => { } }
                                title={ "Login " } />
                            <View style={ { flexDirection: 'row', justifyContent: 'center' ,marginVertical:5} }>
                                <Text style={ [ styles.regularText, { color: Black, textAlign: 'center' } ] }> Don't have account ? </Text>
                                <Pressable onPress={()=>{
                                    this.props.navigation.navigate('RegistrationScreen')
                                }}>
                                    <Text style={ [ styles.regularText, { color: Light_Green, textAlign: 'center' } ] }> Sign Up</Text>
                                </Pressable>
                            </View>

                            <SocialMediadButton
                                color={ Light_Blue }
                                source={ require( '../../../assets/google.png' ) }
                                title={ "Continue with Google " } />
                            <SocialMediadButton
                                color={ Dark_Blue }
                                source={ require( '../../../assets/facebook.png' ) }
                                title={ "Continue with FaceBook  " } />
                            <Pressable style={{paddingBottom:"20%"}} onPress={()=>{this.props.navigation.navigate('Home')}}>
                                <Text style={ [ styles.regularText, { color: Black, textAlign: 'center', textDecorationLine: 'underline' } ] }>Skip ></Text>
                            </Pressable>
                        </View>
                        </KeyboardAvoidingView>
                </SafeAreaView>
                </ScrollView>
            </ImageBackground>
           
        );
    }
}

export default LoginScreen;