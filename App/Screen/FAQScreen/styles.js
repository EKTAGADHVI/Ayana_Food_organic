import { StyleSheet } from "react-native";
import { Gray, Text_Gray, White } from "../../Utils/colors";
import { screen_height } from "../../Utils/constant";
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from "../../Utils/fonts";

const styles =StyleSheet.create({

    mainLayout:{
        height:screen_height,
      padding:10,
      backgroundColor:White
    },  
    rowView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
       paddingHorizontal:5,
       paddingVertical:10
    },
    container: {
        borderBottomColor: Gray,
        borderBottomWidth: 1,
    

    },
    smallText: {
        fontFamily: POPINS_REGULAR,
        fontSize: 12,
        color: Text_Gray,
        paddingHorizontal: 15,
        paddingVertical: 10,
        textAlign: 'justify'
    },
    iconStyle2:{
        height:12,
        width:12,
        resizeMode:'contain'
    },
    quentityText: {
        fontFamily: POPINS_SEMI_BOLD,
        fontSize: 13,

    },
})

export default styles;