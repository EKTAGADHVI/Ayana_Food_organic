

import React from 'react';
import { StyleSheet } from 'react-native';
import { screen_height } from '../../Utils/constant';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../../Utils/fonts';
import { Black, Gray, Light_Green, Text_Gray, White } from '../../Utils/colors';
const styles = StyleSheet.create( {
    mainLayout: {
        height: screen_height-20,
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingVertical: 15
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
    },
    underlineStyleBase: {
        width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,       
        borderBottomColor:Black,
        marginHorizontal:5,
        color:Black,
        fontSize:18
       
      },
    
      underlineStyleHighLighted: {  
        
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,

        borderRadius:10,
     
        borderColor:Black,
        color:Black
      },
      imageIcon:{
          height:16,
          width:16,
          resizeMode:'contain',
          tintColor:White,
          alignSelf:'center'
      },
      btnStyle:{
          height:36,
          width:36,
          borderRadius:18,
          backgroundColor:Light_Green,
          justifyContent:'center',
          alignSelf:'flex-end'
      },
      bottomStyle:{
          top:screen_height/1.6
      }
} )

export default styles;