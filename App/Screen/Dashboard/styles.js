import { StyleSheet } from "react-native";
import { Black, Light_Green, ORENGE, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
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
        height:screen_width/4 -20,
        width:screen_width/4 -20,
        borderRadius:10,
        backgroundColor:ORENGE,
        marginHorizontal:10,
        justifyContent:'center'     
    },
    rowView:{
        flexDirection:'row',
        marginHorizontal:15
    },
    labelText:{
        fontSize:14,
        fontFamily:POPINS_SEMI_BOLD,
        paddingVertical:5
    },
    smallText:{
        fontFamily:POPINS_REGULAR,
        fontSize:13,
        paddingVertical:2,
        color:Light_Green
    },
    featureButton:{
        paddingRight:10,
        paddingVertical:3,
        justifyContent:'center',
        alignItems:'center'
    },
    offerBannerContainer:{
        flexDirection:'row',
        alignItems:'center',
        width:screen_width /1.5-20,
        padding:15,
        borderRadius:20, 
        marginHorizontal:5
        
    },
    regularText:{
        fontSize:14,
        fontFamily:POPINS_REGULAR,
        paddingVertical:5
    },
    bannerStyle:{
        height:screen_height/2,
        marginVertical:10
    },
    banerText:{
        fontSize:20,
        fontFamily:POPINS_REGULAR,
        paddingVertical:5,
        textAlign:'right',
        paddingHorizontal:15
    },
    normalText:{
        fontSize:14,
        fontFamily:POPINS_SEMI_BOLD,
        color:Black,
        paddingVertical:3
    },
    bottomView:{
        width:screen_width-40,
        padding:5,
        borderRadius:20,
        backgroundColor:Light_Green,
        marginHorizontal:'5%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:"5%",
        position:'absolute',
        bottom:10
    },
    modalStyles:{
        flex:1,
        backgroundColor:White,
        margin:-15
    }
    

});
export default styles;