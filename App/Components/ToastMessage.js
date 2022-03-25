import React from 'react'
import { View,Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Light_Green, White } from '../Utils/colors';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../Utils/fonts';
export const ToastMessage = (type,title,message) => {
 
  
    Toast.show({
        type: type,
        text1: title,
        text2: message,
        topOffset:40,
        
      })
  
 
}

export const config ={
    sucess:(internalState)=>(
        <View style={{backgroundColor:'black',padding:10,borderColor:Light_Green,borderWidth:1,alignContent:'center'}}>
                <Text style={{fontSize:14,fontFamily:POPINS_SEMI_BOLD}}>{internalState.text1}</Text>
                <Text style={{fontSize:14,fontFamily:POPINS_REGULAR,color:Light_Green}}>{internalState.text2}</Text>
        </View>
    ),
    error:(internalState)=>(
      
     <View style={{backgroundColor:Light_Green,padding:10,borderColor:"red",borderWidth:1,alignContent:'center',}}>
                <Text style={{fontSize:14,fontFamily:POPINS_SEMI_BOLD,}}>{internalState.text1}</Text>
                <Text style={{fontSize:14,fontFamily:POPINS_REGULAR,color:"red"}}>{internalState.texte}</Text>
        </View>
      
    ),
 
};