import { StyleSheet } from "react-native";
import { Black, Gray, Light_Green, Text_Gray, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_BOLD, POPINS_REGULAR, POPINS_SEMI_BOLD } from "../../Utils/fonts";

const styles = StyleSheet.create( {
    mainLayout: {
        height: screen_height,
        padding: 10,
        backgroundColor: White
    },
    ItemView:{
        flexDirection:'row',
        paddingHorizontal:5,
        paddingVertical:5,
        justifyContent:'space-between',
        borderBottomColor:Gray,
        borderBottomWidth:0.5
    },
    iconStyle2: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        alignSelf: 'center',
        
    },
    btnStyle: {
        padding: 8,
        borderColor: Gray,
        borderRadius: 8,
        height: 30,
        width: 30,
        justifyContent: "center",
        marginHorizontal: 10,
        borderWidth:1,
        alignItems:'center', 
            
    },
    quentityText:{
        textAlign:"center",
        fontFamily:POPINS_REGULAR,
    },
    q_container:{
         flexDirection: 'row',
         justifyContent: 'space-between', 
         paddingVertical: 8,
         alignItems:'center' ,
         right:10
    },
    normalText:{
        fontSize:14,
        fontFamily:POPINS_SEMI_BOLD,
        color:Black,
        paddingVertical:3
    },
    smallText:{
        fontSize:10,
        color:Text_Gray,
        fontFamily:POPINS_REGULAR
    },
    endContainer:{
     
    },
    middleContainer:{
        left:10
    },
    bottomLine:{
        borderBottomWidth:0.5,
        borderBottomColor:Text_Gray,
        bottom:8,
    
    },
    emptyCart:{
        height:screen_height/3.5,
        width:screen_width/1.5,
        resizeMode:'cover',
        alignSelf:'center'
    },
    titleText:{
        fontFamily:POPINS_BOLD,
        fontSize:25,
        textAlign:'center',
        marginVertical:5
    },
    bottomView:{
        padding:5,
        borderRadius:20,
        backgroundColor:Light_Green,
        marginHorizontal:'5%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:"5%"
    },
    ImageStyle :{
        height:screen_height/12,
        width:screen_width/4,
        // left:6
    }
} );

export default styles;