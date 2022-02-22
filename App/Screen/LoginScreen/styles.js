import React from 'react';
import { StyleSheet } from 'react-native';
import { screen_height } from '../../Utils/constant';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../../Utils/fonts';
import { Text_Gray } from '../../Utils/colors';
const styles = StyleSheet.create( {
    mainLayout: {
        height: screen_height,
        paddingTop: 15,
        paddingHorizontal: 15
    },
    titleText: {
        fontSize: 25,
        fontFamily: POPINS_SEMI_BOLD,
        paddingVertical: 5
    },
    regularText:{
        fontSize:16,
        fontFamily:POPINS_REGULAR,
        paddingVertical:5,
        color:Text_Gray  
    }
} )

export default styles;