import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screen/LoginScreen';
import OtpScreen from '../Screen/OtpScreen';
import RegistrationScreen from '../Screen/RegistrationScreen';

const AuthNav = createNativeStackNavigator();
const AuthNavigation = () =>{
    return(
        <AuthNav.Navigator>
             <AuthNav.Screen
                name="LoginScreen"
                component={ LoginScreen }
                options={ {
                    headerShown: false
                } } />
            <AuthNav.Screen
                name="OtpScreen"
                component={ OtpScreen }
                options={ {
                    headerShown: false
                } } />
            <AuthNav.Screen
                name="RegistrationScreen"
                component={ RegistrationScreen }
                options={ {
                    headerShown: false
                } } />
        </AuthNav.Navigator>
    );
}
export default AuthNavigation