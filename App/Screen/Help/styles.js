import React from 'react';
import { StyleSheet } from 'react-native';
import { Gray, White } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../../Utils/fonts';

const styles = StyleSheet.create( {
    mainLayout: {
        backgroundColor: White,
        paddingVertical: 10,
        paddingHorizontal: 15,
        height: screen_height
    },
    formContainer: {
        top: "10%",
        backgroundColor: Gray,
        shadowColor: Gray,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 5,
        shadowOffset: {
            width: 0, height: 2
        },
        borderColor: Gray,
        borderWidth: 1,
        borderRadius: 20
    },
    titleText: {
        fontFamily: POPINS_SEMI_BOLD,
        fontSize: 15,
        paddingVertical: 5
    },
    input: {
        fontSize: 14,
        fontFamily: POPINS_REGULAR,
        backgroundColor: White,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        marginVertical: 10
    }
} );

export default styles;