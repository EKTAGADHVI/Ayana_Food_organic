import { StyleSheet } from "react-native";
import { Black, Gray, Light_Green, Text_Gray, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_BOLD, POPINS_REGULAR, POPINS_SEMI_BOLD } from "../../Utils/fonts";

const styles = StyleSheet.create( {
    mainLayout: {
       
        borderWidth:2,
        backgroundColor:White
    },
    ImageContainer: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: Gray,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20
    },
    paginationDots: {
        height: 8,
        width: 8,
        borderRadius: 8 / 2,
        backgroundColor: Light_Green,
        marginLeft: 10,
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    ItemContainer: {
        height: screen_height / 3.8 - 20,
        width: screen_width,

        alignItems: 'center',
        justifyContent: 'center'
    },
    ImagStyle: {
        height: screen_height / 3.8 - 20,
        width: screen_width / 1.9,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    bottomContainer: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    titleText: {
        fontFamily: POPINS_BOLD,
        fontSize: 16,
        width: screen_width / 1.4 - 5
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
        marginHorizontal: 5

    },
    quentityText: {
        fontFamily: POPINS_SEMI_BOLD,
        fontSize: 14,

    },
    q_Container: {
        borderWidth: 1,
        borderColor: Gray,
        borderRadius: 10,
        padding: 5,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        borderBottomColor: Gray,
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        marginHorizontal: 15
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
    mainContainer:{
        height: screen_height / 1.5 - 20,
    },
    attributesView:{
        height:40,
        width:40,
        borderRadius:10,
        justifyContent:"center",
        borderWidth:0.5,
        marginHorizontal:5,
        borderColor:Gray
    },
    modalStyle:{
      
        backgroundColor: White ,
         
        borderRadius:20,
        shadowColor:Black,
        shadowOffset:{
            height:2,width:0
        },
        elevation:3,
        padding:15,
        shadowOpacity: 0.5,
   },
   input: {
    fontSize: 14,
    fontFamily: POPINS_REGULAR,
    backgroundColor: White,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor:Gray
}

} );

export default styles;