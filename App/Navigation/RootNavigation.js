import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screen/LoginScreen';

const bottomTab = createBottomTabNavigator();
const mainStack = createNativeStackNavigator();
const RootNavigation = () =>{
    return(
        <mainStack.Navigator>
            <mainStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
                headerShown:false
            }}/>
        </mainStack.Navigator>
    );
}

export default RootNavigation;