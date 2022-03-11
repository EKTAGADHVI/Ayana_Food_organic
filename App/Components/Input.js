import React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Black, Line_Gray, Text_Gray } from '../Utils/colors';
import { POPINS_REGULAR } from '../Utils/fonts';


const Input = ( props ) =>
{
    return (
        <View style={ styles.inputContainer }>
            <Text style={ [styles.RegularText ,props.textStyle]}>{ props.title }</Text>
            <View style={ styles.inputView }>
                <TextInput
                    placeholderTextColor={ Text_Gray }
                    style={ styles.input }
                    placeholder={ props.placeholder }
                    value={ props.value }
                    onChangeText={ props.onChangeText }
                    secureTextEntry={ props.secureTextEntry }

                />
                <TouchableOpacity onPress={ props.iconPress }>
                    <Image
                        style={ styles.iconStyle }
                        source={ props.source } />
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default Input;

const styles = StyleSheet.create( {
    inputContainer: {
        paddingVertical: 5,
        marginVertical: 5
    },
    input: {
        fontSize: 14,
        fontFamily: POPINS_REGULAR,
        height: Platform.OS === 'ios' ? 35 : null,
        width: "90%",
       
    },
    RegularText: {
        fontSize: 16,
        fontFamily: POPINS_REGULAR,
        color: Text_Gray,
        paddingVertical: 5
    },
    inputView: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: Line_Gray,
    },
    iconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Text_Gray
    }
} );