import { StyleSheet } from "react-native";
import { Black, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_SEMI_BOLD } from "../../Utils/fonts";

const styles = StyleSheet.create({
    mainLayout:{
        height:screen_height,
      padding:15,
      backgroundColor:White
    },
    emptyCart:{
      height:screen_height/3.5,
      width:screen_width/1.5,
      resizeMode:'cover',
      alignSelf:'center'
  },
  normalText:{
    fontSize:14,
    fontFamily:POPINS_SEMI_BOLD,
    color:Black,
    paddingVertical:3
},
});

export default styles;