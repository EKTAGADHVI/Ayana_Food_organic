import { StyleSheet } from "react-native";
import { Gray, Light_Green, Text_Gray, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from "../../Utils/fonts";

const styles = StyleSheet.create({
    mainLayout:{
        backgroundColor:White,
        height:screen_height,
        paddingVertical:10,
        paddingHorizontal:15
    },
    searchBox:{
        borderRadius:20,
        borderWidth:1,
        borderColor:Light_Green,
        backgroundColor:White
    },
    itemView:{
       
        borderColor:Light_Green,
        borderWidth:1,
        marginVertical:5,
        borderRadius:10,
         marginHorizontal:5,
         paddingHorizontal:8,
         paddingVertical:5
    },
    rowView:{
        flexDirection:'row',
        alignItems:'center',
       
    },
    imageStyle:{
        height:100,
        width:100,
        resizeMode:'contain'
    },
    normalText:{
        textAlign:'justify',
        paddingVertical:3,
        fontSize:12,
        fontFamily:POPINS_SEMI_BOLD,
        width:"auto",
       
      
    },
    smallText:{
        textAlign:'justify',
        paddingVertical:3,
        fontSize:10
    },
    btnStyle:{
        alignItems:'center'
    },
    iconStyle:{
        height:15,
        width:15,
        resizeMode:"contain",
        right:5, 
       
    },
    viewContainer:{
  marginVertical:10,
  borderBottomWidth:0.5,
  borderBottomColor:Gray

    },
    input: {
        fontSize: 14,
        fontFamily: POPINS_REGULAR,
        backgroundColor: Gray,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        borderColor:Light_Green,
        borderWidth:1,
        marginVertical: 10
    }
})

export default styles;