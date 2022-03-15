import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Animated, Easing, SafeAreaView } from 'react-native';

import { Black, Light_Green, Line_Gray, Text_Gray, White } from '../Utils/colors';
import { screen_height, screen_width } from '../Utils/constant';
import { POPINS_REGULAR } from '../Utils/fonts';
import LogoView from './LogoView';
import Modal from "react-native-modal";
const leftPosition = new Animated.Value( 0 )
// function mooveRL ()
// {
//     Animated.timing(
//         leftPosition,
//         {
//             toValue: 0,
//             duration: 3000, // the duration of the animation
//             easing: Easing.linear,
//             useNativeDriver: false // the style of animation 
//         }
//     ).start() // starts this annimation once this method is called
// }

// function mooveLR ()
// {
//     Animated.timing(
//         leftPosition,
//         {
//             toValue: 10,
//             duration: 3000, // the duration of the animation
//             easing: Easing.linear,
//             useNativeDriver: false // the style of animation 
//         }
//     ).start() // starts this annimation once this method is called
// }

const MenuItems = ( props ) =>
{
    return (
        <TouchableOpacity onPress={ props.OnMenuPress }>
            <View style={ styles.menuContainer }>
                <Image
                    style={ styles.iconStyle }
                    source={ props.source } />
                <Text style={ styles.regularText2 }>{ props.menu }</Text>
            </View>
        </TouchableOpacity>
    )
}
const Header = ( props ) =>
{
    console.log( "Props", props );

    const [ visible, setVisible ] = useState( false )
    return (
        <View style={ styles.mainContainer }>
            <View style={ styles.leftContainer }>
                <TouchableOpacity onPress={ () =>
                {
                    setVisible( !visible )
                    // mooveLR();
                } }>
                    <Image
                        source={ require( '../../assets/menu.png' ) }
                        style={ styles.iconStyle } />
                </TouchableOpacity>
                <LogoView style={ styles.logoStyle } />
            </View>

            <View style={ styles.rightContainer }>
                <TouchableOpacity>
                    <Image
                        source={ require( '../../assets/Bell.png' ) }
                        style={ styles.iconStyle } />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={ styles.leftContainer }>
                        <Image
                            source={ require( '../../assets/Exclude.png' ) }
                            style={ styles.iconStyle } />
                        <Text style={ styles.regularText }>Ahemdabad, 380060</Text>
                    </View>
                </TouchableOpacity>


            </View>
            <Modal
                isVisible={ visible }
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                transparent={ true }

                style={ { flex: 1, right: "5%" } }
                onRequestClose={ () =>
                {
                    setVisible( false )
                    // mooveRL();
                } }>
                <View style={ [ styles.modalContainer, ] }>
                    <SafeAreaView>
                        <View style={ styles.rowView }>
                            <LogoView style={ styles.logoStyle2 } />
                            <TouchableOpacity
                                style={ { alignSelf: 'center' } }
                                onPress={ () =>
                                {
                                    setVisible( false )

                                } }>
                                <Image
                                    style={ { height: 18, width: 18, resizeMode: 'contain' } }
                                    source={ require( '../../assets/closed.png' ) }
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={ { marginVertical: "15%", } }>
                                <MenuItems source={ require( '../../assets/home.png' ) }
                                    menu={ "Home" } />
                                <MenuItems source={ require( '../../assets/info.png' ) }
                                    menu={ "About Us" }
                                    OnMenuPress={ () =>
                                    {
                                        setVisible( false )
                                        props.navigation.navigate( 'AboutUs' )
                                    } } />
                                <MenuItems source={ require( '../../assets/contact.png' ) }
                                    menu={ "Contact Us" }

                                    OnMenuPress={ () =>
                                    {
                                        setVisible( false )
                                        props.navigation.navigate( 'ContactUs' )
                                    } } />
                                <MenuItems source={ require( '../../assets/blog.png' ) }

                                    menu={ "Blog" }
                                    OnMenuPress={ () =>
                                    {
                                        setVisible( false )
                                        props.navigation.navigate( 'Blog' )
                                    } } />
                                <MenuItems source={ require( '../../assets/chat.png' ) }
                                    menu={ "Chat With Us" }
                                    OnMenuPress={ () => { alert( "Hiii" ) } } />
                                <MenuItems source={ require( '../../assets/help.png' ) }
                                    menu={ "Help" }
                                    OnMenuPress={ () => { 
                                        setVisible( false )
                                        props.navigation.navigate( 'HelpScreen' ) } } />
                            </View>
                            <View >
                                <Text style={ [ styles.regularText2, { color: Light_Green, paddingVertical: "65%", textAlign: "center" } ] }>v 1.0.1</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={ [ styles.menuContainer, { borderTopWidth: 0.5, borderBottomWidth: 0, borderTopColor: Line_Gray } ] }>
                                    <Image
                                        style={ styles.iconStyle }
                                        source={ require( '../../assets/logout.png' ) } />
                                    <Text style={ styles.regularText2 }>Logout</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>

            </Modal>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create( {
    logoStyle: {
        height: screen_height / 15,
        width: screen_width / 3.4,
        top: 0,
        resizeMode: 'contain',
        alignSelf: "flex-start"
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    iconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginHorizontal: 2
    },
    mainContainer: {
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
        justifyContent: 'space-between',
        backgroundColor: White
    },
    rightContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    regularText: {
        fontSize: 14,
        fontFamily: POPINS_REGULAR,
        paddingHorizontal: 2
    },
    modalContainer: {
        backgroundColor: White,
        width: screen_width / 1.6,
        height: screen_height,
        paddingHorizontal: 15

    },
    logoStyle2: {
        top: 0
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Line_Gray,
        borderBottomWidth: 0.5,
        paddingVertical: 10
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Line_Gray,
        borderBottomWidth: 0.5,
        paddingVertical: 5
    },
    regularText2: {
        fontSize: 16,
        fontFamily: POPINS_REGULAR,
        paddingVertical: 5,
        paddingHorizontal: 8,
        color: Black
    }
} )