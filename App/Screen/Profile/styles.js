import { BackHandler, StyleSheet } from "react-native";
import { Gray, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";
import { POPINS_REGULAR } from "../../Utils/fonts";

const styles = StyleSheet.create( {

    mainLayout: {
        height: screen_height,
        backgroundColor: White,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    profileContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomColor: Gray,
        borderBottomWidth: 0.52,
        alignItems: 'center',
        marginVertical: "5%",
        width:screen_width-30
    },
    imageStyle: {
        height: screen_width * 0.2,
        width: screen_width * 0.2,
        resizeMode: 'contain'
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    normalText: {
        fontFamily: POPINS_REGULAR,
        fontSize: 18,
      
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
    inpuStyle: {
        fontFamily: POPINS_REGULAR,
        fontSize: 14,
        paddingVertical: 5,
        paddingHorizontal: 8,
        width: screen_width * 0.8,
        flex: 1,

    }
} );

export default styles