import { Platform, StyleSheet } from "react-native";
import { Black, Gray, Light_Green, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from "../../Utils/fonts";

const styles = StyleSheet.create({
    mainLayout:{
        backgroundColor:White,
        height:screen_height, 
        paddingHorizontal:15,
        paddingVertical:15
    },
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:5
        
    },
    minusButton:{
        height:16,
        width:16,
        borderRadius:8,
        backgroundColor:Light_Green,
        justifyContent:'center',
        alignItems:'center'
    },
    normalText:{
        fontSize:14,
        paddingVertical:5,
        paddingHorizontal:5
    },
    containerStyle:{
        width:screen_width-30
    },
    attributesView:{
             
      alignItems:'center',
       marginVertical:5,
      
        borderColor:Gray
    },
    modalStyle:{
         flex: 0.55, 
         backgroundColor: White ,
         top:"15%",
      
         borderRadius:20,
         shadowColor:Black,
         shadowOffset:{
             height:2,width:0
         },
         elevation:3,
         shadowOpacity: 0.5,
    },
    modalStyle2:{
        flex:1, 
        backgroundColor: White ,
         margin:0,
        borderRadius:20,
        shadowColor:Black,
        shadowOffset:{
            height:2,width:0
        },
        elevation:3,
        shadowOpacity: 0.5,
   },
    titleText:{
        fontSize:20 ,
        paddingVertical:8,
        paddingHorizontal:5,
        textAlign:'center',
        fontFamily:POPINS_SEMI_BOLD
    },
    btnView: {
        borderRadius:15,
        backgroundColor:Light_Green,
        marginVertical:5,
        paddingHorizontal:"5%",
        paddingVertical:"1%"
    },
    input: {
        fontSize: 12,
        fontFamily: POPINS_REGULAR,
        height: Platform.OS === 'ios' ? 33 : 45,
        width: "70%",
        left: 10,
        borderRadius:15,
        borderWidth:1,
        borderColor:Light_Green,
        backgroundColor:White,
        paddingHorizontal:10,
       
    }
})

export default styles;