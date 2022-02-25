import React from 'react';
import { StyleSheet, View,Image, TextInput, Platform } from 'react-native';
import { Light_Gray, Text_Gray } from '../Utils/colors';
import { POPINS_REGULAR } from '../Utils/fonts';

const SearchBox = (props)=>{
    return(
        <View style={styles.container}>
            <Image
            style={styles.iconStyle}
            source={require('../../assets/search.png')}/>
            <TextInput
             placeholderTextColor={ Text_Gray }
             style={ styles.input }
             placeholder={ props.placeholder }
             value={ props.value }
             onChangeText={ props.onChangeText }
             secureTextEntry={ props.secureTextEntry } />
        </View>
    )
}

export default SearchBox; 
const styles = StyleSheet.create({
    container:{
    flexDirection:'row',
   paddingHorizontal:10,
   paddingVertical:5,
    alignItems:'center',
    backgroundColor:Light_Gray,
    marginHorizontal:10,
    borderRadius:10,
    marginVertical:5
    },
    iconStyle:{
        height:16,
        width:16,
        resizeMode:'contain',
       
    },
    input:{
        fontSize: 14,
        fontFamily: POPINS_REGULAR,
        height: Platform.OS === 'ios' ? 35 : 35,
        width: "90%",       
        left:10
    }
})