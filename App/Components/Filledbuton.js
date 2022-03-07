import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Light_Green, White } from '../Utils/colors';
import { POPINS_REGULAR } from '../Utils/fonts';

const FilledButton = (props)=>{

    return(
        <TouchableOpacity style={[styles.btnStyle,props.style]}
        onPress={props.onPress}>
            <Text style={styles.btnText}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export default FilledButton;
const styles= StyleSheet.create({
    btnStyle:{
        borderRadius:19,
        backgroundColor:Light_Green,
        marginVertical:10
    },
    btnText:{
        color:White,
        fontFamily:POPINS_REGULAR,
        textAlign:"center",
        paddingVertical:10,
        fontSize:18
    }
})