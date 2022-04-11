import { StyleSheet } from "react-native";
import { Black, Gray, Light_Green, Text_Gray, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from "../../Utils/fonts";

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
modalContainer: {
  backgroundColor: White,
  width: screen_width,
  height: screen_height,

 
},
TitleText:{
  fontSize:18,
  fontFamily:POPINS_REGULAR,
  color:Black,
  paddingVertical:3
},
modalSection:{
  backgroundColor:Gray,
  height:screen_height/1.19,
  width:screen_width-20,
  borderTopLeftRadius:20,
  borderTopRightRadius:20,
  padding:15
},
rowView:{
  flexDirection: 'row' ,
  marginVertical:5,
  alignItems:'center'
},
btnStyle:{
  backgroundColor:Light_Green,
  borderRadius:20,
  padding:5,
  width:screen_width/3.5,
  justifyContent:"center",
  alignItems:'center',
  alignSelf:"flex-end"
},
catText:{
  color: Black, 
  paddingHorizontal: 3, 
  paddingVertical: 3,
  left:5,
  fontSize:14,
  fontFamily:POPINS_REGULAR

}
});

export default styles;