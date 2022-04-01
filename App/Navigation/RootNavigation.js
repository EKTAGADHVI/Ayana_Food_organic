import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screen/LoginScreen';
import Dashboard from '../Screen/Dashboard';
import { Black, Gray, Light_Green, Text_Gray, White } from '../Utils/colors';
import { POPINS_REGULAR } from '../Utils/fonts';
import { Image, TouchableOpacity } from 'react-native';
import ContactUs from '../Screen/ContactUs';
import AboutUs from '../Screen/AboutUs';
import AddDeliveryLocation from '../Screen/AddDeliveryLocation';
import RegistrationScreen from '../Screen/RegistrationScreen';
import ProductViewScreen from '../Screen/ProductViewScreen.js';
import ProductDetailScreen from '../Screen/ProductDetailScreen';
import Cart from '../Screen/Cart';
import Favourite from '../Screen/Favourite';
import OtpScreen from '../Screen/OtpScreen';
import HelpScreen from '../Screen/Help';
import SubCategories from '../Screen/SubCategories';
import Explore from '../Screen/Explore';
import Blog from '../Screen/Blog';
import BlogDetails from '../Screen/Blog/BlogDetails';
import Profile from '../Screen/Profile';
import MyDetails from '../Screen/Profile/MyDetails';
import Orders from '../Screen/Orders';
import OrderDetails from '../Screen/Orders/OrderDetails';
import CheckOut from '../Screen/Checkout';
import OrderPreview from '../Screen/Checkout/OrderPreview';
import SplashScreen from '../Screen/SplashScreen';
// import { createDrawerNavigator } from '@react-navigation/drawer';

const bottomTab = createBottomTabNavigator();
const mainStack = createNativeStackNavigator();
// const drawer = createDrawerNavigator();
const isTabBarVisible = ( navState ) =>
{
    console.log( "nav State", navState );
    if ( !navState )
    {
        return true;
    }
    let tabBarVisible = navState.routes[ navState.index ].params ? navState.routes[ navState.index ].params.showTabBar : true;
    return tabBarVisible;
}
const TabBarIcon = ( props ) =>
{
    // cons [isActive]
    return (

        <Image
            style={ { height: 25, width: 25, resizeMode: 'contain', tintColor: props.tintColor } }
            source={ props.source } />

    );
}


// const DrawerStack = createNativeStackNavigator();
// const DashboardStack = ()=>{
//     return(
//         <
//     );
// }
const RootNavigation = ( { navigation } ) =>
{
    return (
        <mainStack.Navigator>
            <mainStack.Screen
                name="SplashScreen"
                component={ SplashScreen }
                options={ {
                    headerShown: false
                } } />
              <mainStack.Screen
                name="LoginScreen"
                component={ LoginScreen }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="OtpScreen"
                component={ OtpScreen }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="RegistrationScreen"
                component={ RegistrationScreen }
                options={ {
                    headerShown: false
                } } />
                  <mainStack.Screen
                name="AddDeliveryLocation"
                component={ AddDeliveryLocation }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="Home"
                component={ BottomTab }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="ContactUs"
                component={ ContactUs }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="AboutUs"
                component={ AboutUs }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="Blog"
                component={ Blog }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="ProductViewScreen"
                component={ ProductViewScreen }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="ProductDetailScreen"
                component={ ProductDetailScreen }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="HelpScreen"
                component={ HelpScreen }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="SubCategories"
                component={ SubCategories }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="BlogDetails"
                component={ BlogDetails }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="MyDetails"
                component={ MyDetails }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="Orders"
                component={ Orders }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="OrderDetails"
                component={ OrderDetails }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="CheckOut"
                component={ CheckOut }
                options={ {
                    headerShown: false
                } } />
            <mainStack.Screen
                name="OrderPreview"
                component={ OrderPreview }
                options={ {
                    headerShown: false
                } } />


        </mainStack.Navigator>
    );
}

// const Drawer = () =>{
//     return(
//         <drawer.Navigator>
//         <drawer.Screen name="Shop" component={Dashboard} />
//         {/* <drawer.Screen name="Article" component={Article} /> */}
//       </drawer.Navigator>
//     );
// }


const BottomTab = ( { navigation } ) =>
{
    return (
        <bottomTab.Navigator screenOptions={ {
            headerShown: false,
            tabBarHideOnKeyboard: true,

            tabBarActiveTintColor: Light_Green,
            tabBarInactiveTintColor: Black,
            tabBarLabelStyle: {
                fontFamily: POPINS_REGULAR,
                fontSize: 12
            },

            tabBarStyle: {
                backgroundColor: White,
                borderTopEndRadius: 15,
                borderTopStartRadius: 15,
                shadowColor: Gray,
                paddingHorizontal: 5,
                paddingVertical: 5,
                opacity: 1,
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowRadius: 20,
                elevation: 5,

            },

        } }>
            <bottomTab.Screen
                name="Shop"
                component={ Dashboard }
                options={
                    {
                        tabBarIcon: ( { focused } ) => <TabBarIcon source={ require( '../../assets/store.png' ) } tintColor={ focused ? Light_Green : Black } />
                        ,
                    }
                } />
            <bottomTab.Screen
                options={
                    {
                        tabBarIcon: ( { focused } ) => <TabBarIcon source={ require( '../../assets/explore.png' ) } tintColor={ focused ? Light_Green : Black } />
                    } }
                name="Explore"
                component={ Explore } />
            <bottomTab.Screen
                options={
                    {
                        tabBarIcon: ( { focused } ) => <TabBarIcon source={ require( '../../assets/cart.png' ) } tintColor={ focused ? Light_Green : Black } />
                    } }
                name="Cart"
                component={ Cart } />
            <bottomTab.Screen
                options={
                    {
                        tabBarIcon: ( { focused } ) => <TabBarIcon source={ require( '../../assets/fav.png' ) } tintColor={ focused ? Light_Green : Black } />
                    } }
                name="Favourite"
                component={ Favourite } />
            <bottomTab.Screen
                options={
                    {
                        tabBarIcon: ( { focused } ) => <TabBarIcon source={ require( '../../assets/account.png' ) } tintColor={ focused ? Light_Green : Black } />
                    } }
                name="Account"
                component={ Profile } />
        </bottomTab.Navigator>
    );
}
export default RootNavigation;