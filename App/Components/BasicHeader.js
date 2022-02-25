import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { White } from '../Utils/colors';
import { POPINS_SEMI_BOLD } from '../Utils/fonts';

const BasicHeader = ( props ) =>
{
    return (
        <View style={ [styles.headerContainer,props.style] }>
            <TouchableOpacity onPress={ props.OnBackPress }>
                <Image
                    style={ styles.iconStyle }
                    source={ require( '../../assets/back.png' ) } />
            </TouchableOpacity>
            <Text style={ styles.titleText }>{ props.title }</Text>
            <View>

            </View>
        </View>
    );
}

export default BasicHeader;

const styles = StyleSheet.create( {
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: White,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 16,
        fontFamily: POPINS_SEMI_BOLD,
        textAlign: 'center'
    }
} );