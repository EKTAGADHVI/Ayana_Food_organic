import { StyleSheet } from "react-native";
import { Light_Green, ORENGE } from "../../Utils/colors";
import { screen_width } from "../../Utils/constant";
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from "../../Utils/fonts";

const styles = StyleSheet.create({
    sliderItems: {
        marginLeft: 20,
        marginRight: 20,
        height: 200,
        width: screen_width - 32,
    },
    carouselContainer: {
        marginTop: 50
    },
    paginationDots: {
        height: 8,
        width: 8,
        borderRadius: 8 / 2,
        backgroundColor:Light_Green,
        marginLeft: 10,
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    categoeryView:{
        height:screen_width/6 -20,
        width:screen_width/6 -20,
        borderRadius:10,
        backgroundColor:ORENGE,
        marginHorizontal:10,
        justifyContent:'center'     
    },
    rowView:{
        flexDirection:'row',
        marginHorizontal:10
    },
    labelText:{
        fontSize:12,
        fontFamily:POPINS_SEMI_BOLD,
        paddingVertical:5
    },
    smallText:{
        fontFamily:POPINS_REGULAR,
        fontSize:12,
        paddingVertical:2,
        color:Light_Green
    },
    featureButton:{
        paddingRight:10,
        paddingVertical:3
    }
    

});
export default styles;