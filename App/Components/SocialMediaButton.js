import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import { Light_Green, White } from '../Utils/colors';
import { POPINS_REGULAR } from '../Utils/fonts';

const SocialMediadButton = ( props ) =>
{

    return (
        <TouchableOpacity style={[styles.btnContainer,{ backgroundColor: props.color,}]}
        onPress={ props.onPress }>
            <Image
            style={styles.iconStyle}
            source={props.source}/>
            <View style={ styles.btnStyle }
               >
                <Text style={ styles.btnText }>{ props.title }</Text>
            </View>
        </TouchableOpacity>
    );
}

export default SocialMediadButton;
const styles = StyleSheet.create( {
    btnStyle: {
        borderRadius: 19,
        
    
      
    },
    btnText: {
        color: White,
        fontFamily: POPINS_REGULAR,
        textAlign: "center",
        paddingVertical: 10,
        fontSize: 18
    },
    btnContainer:{
        flexDirection:'row',    
        justifyContent:'center',
       
        borderRadius: 19,
        alignItems:'center',
        marginVertical: 10,
    },
    iconStyle:{
        height:20,
        width:20,
        resizeMode:'contain',
        tintColor:White,
        marginHorizontal:5
      
    }
} )