import { StyleSheet } from "react-native";
import { Light_Green, Line_Gray, Text_Gray, White } from "../../Utils/colors";
import { screen_width } from "../../Utils/constant";
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from "../../Utils/fonts";

const styles = StyleSheet.create({
    mainLayout:{
        backgroundColor:White,
        flex:1,
        paddingVertical:20
    },
    container:{
        borderBottomColor:Line_Gray,
        borderBottomWidth:0.5,
      paddingHorizontal:15,
      paddingVertical:10,
        flexDirection:"row",
     
    },
    innerContainer:{
        padding:5
    },
    iconStyle:{
        height:25,
        width:25,
        resizeMode:'contain',
        top:"3%"
    },
    titleText:{
        fontFamily:POPINS_REGULAR,
        fontSize:18,
        paddingHorizontal:5,
        paddingVertical:10,
        color:Light_Green
    },
    normalText:{
        fontFamily:POPINS_REGULAR,
        fontSize:14,
        paddingHorizontal:5,
      textAlign:'justify'
        
      
    },
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:"90%"
    }
});
export default styles;