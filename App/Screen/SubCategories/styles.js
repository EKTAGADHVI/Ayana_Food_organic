import { StyleSheet } from "react-native";
import { Gray, Light_Green, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_REGULAR } from "../../Utils/fonts";

const styles = StyleSheet.create({
    mainLayout:{
        height:screen_height,
        backgroundColor:White,
        paddingHorizontal:15,
        paddingVertical:15
    },
    ItemView:{
        borderBottomWidth:0.5,
        borderBottomColor:Gray,
        paddingHorizontal:5,
        paddingVertical:5
    },
    iconStyle:{
        height:18,
        width:18,
        resizeMode:'contain',
        tintColor:Light_Green
    },
    rowView:{
        flexDirection:'row',
        alignItems:'center',
        padding:5
    },
    regularText:{
        fontFamily:POPINS_REGULAR,
        fontSize:14,
        paddingVertical:5,
        width:screen_width*0.8
    }
})
export default styles;