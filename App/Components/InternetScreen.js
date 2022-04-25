import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Light_Green, Text_Gray, White } from '../Utils/colors';
import { screen_height } from '../Utils/constant';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../Utils/fonts';

const InternetScreen = (props) =>
{
    return (
        <SafeAreaView>
            <View style={ styles.mainLayout }>

                <Image
                    style={ { height: screen_height / 5, width: screen_height / 5, resizeMode: 'contain',} }
                    source={ require( '../../assets/wifi.png' ) } />
                <Text style={ styles.normalText }>no internet </Text>
                <Text style={ styles.smallText }>please check your internet connection </Text>
                <TouchableOpacity 
                onPress={props.onPress}
                    style={ styles.btnStyle }>
                    <Text style={ styles.textStyle }>try again</Text>
                </TouchableOpacity>
                <View style={{height:"10%"}}>

                </View>
            </View>
        </SafeAreaView>


    )
}
export default InternetScreen;
const styles = StyleSheet.create( {
    mainLayout: {
        height: screen_height,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    btnStyle: {
        justifyContent: "center",
        backgroundColor: Light_Green,
        padding: 5,
        paddingHorizontal:14,
        borderRadius: 10,
        marginVertical:5
    },
    textStyle: {
        color: White,
        fontFamily: POPINS_REGULAR,
        fontSize: 14
    },
    smallText: {
        color: Text_Gray,
        textAlign: 'center',
        paddingVertical:5
    },
    normalText: {
        fontFamily: POPINS_SEMI_BOLD,
        fontSize: 14
    }
} )