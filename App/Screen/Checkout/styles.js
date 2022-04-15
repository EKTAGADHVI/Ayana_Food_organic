import { StyleSheet } from "react-native";
import { Gray, Light_Green, White } from "../../Utils/colors";
import { screen_height, screen_width } from "../../Utils/constant";

const styles = StyleSheet.create({
    mainLayout:{
        backgroundColor:White,
        height:screen_height, 
        paddingHorizontal:15,
        paddingVertical:15
    },
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:5
        
    },
    minusButton:{
        height:16,
        width:16,
        borderRadius:8,
        backgroundColor:Light_Green,
        justifyContent:'center',
        alignItems:'center'
    },
    normalText:{
        fontSize:14,
        paddingVertical:5,
        paddingHorizontal:5
    },
    containerStyle:{
        width:screen_width-30
    },
    attributesView:{
             
      alignItems:'center',
       marginVertical:5,
      
        borderColor:Gray
    }
    
})

export default styles;