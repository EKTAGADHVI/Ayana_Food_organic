import { StyleSheet } from "react-native";
import { Gray, Light_Green, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_REGULAR } from "../../Utils/fonts";

const styles= StyleSheet.create({
    mainLayout: {
        height: screen_height,
        backgroundColor: White,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    rowView: {
        flexDirection: 'row',     
        alignItems: 'center',
     
    },
    normalText: {
        fontFamily: POPINS_REGULAR,
        fontSize: 18,
        paddingVertical:3,
        paddingHorizontal:3

    },
    iconStyle: {
        height: 18,
        width: 18,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    ItemView: {

        borderBottomWidth: 0.5,
        borderBottomColor: Gray,
        paddingHorizontal: 8,
        paddingVertical: 8
    },
    regularText: {
        fontFamily: POPINS_REGULAR,
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 8,
        width: screen_width * 0.8
    },
    smallText: {
        fontFamily: POPINS_REGULAR,
        fontSize: 12,
        paddingVertical: 5,
        paddingHorizontal: 5,
        
       
    },
    btnStyle:{
        borderWidth:1,
        borderColor:Light_Green,
        width:screen_width*0.25, 
        marginHorizontal:5,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    },
    cardView:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderColor:Gray,
        borderWidth:1,
        borderRadius:10,
        marginVertical: 10,
        marginHorizontal:10
    },
    downloadButton:{
        borderTopColor:Gray,
        borderTopWidth:1,
        justifyContent:'center',
        paddingTop:5
      
    },
    imageStyle:{
        height:screen_width/5,
        width:screen_width/5,
        alignSelf:'center'
    },
    emptyCart:{
        height:screen_height/3.5,
        width:screen_width/1.5,
        resizeMode:'cover',
        alignSelf:'center'
    },
});

export default styles;