import { StyleSheet } from "react-native";
import { Black, Gray, ORENGE, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from "../../Utils/fonts";

const styles = StyleSheet.create( {
    mainLayout: {
        height: screen_height,
        backgroundColor: White, 
       
    },
    categoeryView: {
        height: screen_width / 2.5,
        width: screen_width / 2.5,
        borderRadius: 10,
        backgroundColor: ORENGE,
        marginHorizontal: 10,
        justifyContent: 'center',
        marginVertical: 8,
        shadowColor:Black,
        shadowOffset:{
            height:2,width:0
        },
        elevation:3,
        shadowOpacity: 0.5,
    },
    ImageStyle: {
        height: screen_width/3.5    , 
        width:screen_width/3.5,
         alignSelf: "center",
         resizeMode:'contain'
    },
    regularText:{
        fontSize:14,
        fontFamily:POPINS_REGULAR,
        paddingVertical:2,
        textAlign:'center'
    },
    labelText:{
        fontSize:16,
        fontFamily:POPINS_REGULAR,
        paddingVertical:15,
       
    },
    underLineView:{
        borderBottomColor:Gray,
        borderBottomWidth:1,
        marginHorizontal:'3%'
    },
    modalStyles:{
        flex:1,
        backgroundColor:White,
        margin:-15,
        alignItems:"center",
        justifyContent:"center"
    }
} );
export default styles;