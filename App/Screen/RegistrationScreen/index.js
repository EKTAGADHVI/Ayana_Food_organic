import React, { Component } from 'react';
import { ImageBackground, ScrollView, View, Text, Pressable, SafeAreaView } from 'react-native';
import FilledButton from '../../Components/Filledbuton';
import Input from '../../Components/Input';
import LogoView from '../../Components/LogoView';
import SocialMediadButton from '../../Components/SocialMediaButton';
import { Black, Dark_Blue, Light_Blue, Light_Green, Text_Gray } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import styles from './styles';


class RegistrationScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            username: "",
            phone: '',
            email: '',
            password: '',
            showPassword: true,
        }
    }

    render ()
    {
        return (
            <ImageBackground
                source={ require( '../../../assets/background.png' ) }
                style={ styles.mainLayout }>
             
                    <ScrollView  style={{paddingTop:"5%",paddingBottom:"5%"}} showsVerticalScrollIndicator={false}>
                        <View >
                            <LogoView />

                        </View>
                        <View style={ { marginVertical: 10 } }>
                            <Text style={ styles.titleText } >Sign Up</Text>
                            <Text style={ styles.regularText } >Enter Your Credentials to Continue</Text>
                        </View>

                        <View style={ { marginVertical: 10 } }>
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

                                title={ "Mobile Number" }
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
                            <FilledButton
                                onPress={ () => { } }
                                title={ "Sign Up with OTP" } />

                            {/* <Pressable>
                                <Text style={ [ styles.regularText, { color: Black, textAlign: 'center' } ] }> Forgot Password ?</Text>
                            </Pressable> */}
                            <FilledButton
                                onPress={ () => { } }
                                title={ "Sign Up " } />
                            <View style={ { flexDirection: 'row', justifyContent: 'center', marginVertical: 5 } }>
                                <Text style={ [ styles.regularText, { color: Black, textAlign: 'center' } ] }> Already have an account ? </Text>
                                <Pressable onPress={()=>{
                                    this.props.navigation.navigate('LoginScreen')
                                }}>
                                    <Text style={ [ styles.regularText, { color: Light_Green, textAlign: 'center' } ] }> Sign In</Text>
                                </Pressable>
                            </View>

                           
                        </View>
                    </ScrollView>
            
            </ImageBackground>
        );
    }
}

export default RegistrationScreen;