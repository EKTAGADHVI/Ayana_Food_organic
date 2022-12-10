import { StyleSheet } from "react-native";
import { Black } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from "../../Utils/fonts";

const styles= StyleSheet.create({
    mainLayout:{
        height: screen_height,
        paddingTop: 15,
        paddingHorizontal: 15,
      
    },
    titleText:{
        fontFamily:POPINS_SEMI_BOLD,
        fontSize:18,
        paddingHorizontal:5,
        textAlign:'center'
       
    },
    normalText:{
        fontFamily:POPINS_REGULAR,
        fontSize:14,
        paddingHorizontal:5,
      textAlign:'center'
        
      
    },
    labelStyle:{
        fontFamily:POPINS_SEMI_BOLD,
        fontSize:14,
        color:Black
       
    },
    regularText:{
        fontFamily:POPINS_REGULAR,
        fontSize:14,
        paddingHorizontal:5,       
      
    },
    rowView:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:8
    },
    iconStyle:{
        height:20,
        width:20,
        resizeMode:'contain',
    },
    bannerStyle:{
        height:screen_height/4,
        width:screen_width -25,
        resizeMode:'contain',
        alignSelf:'center'
    }
})

export  default styles;
