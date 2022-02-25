import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, Text ,Image} from 'react-native';
import { screen_width } from '../Utils/constant';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Light_Green, Line_Gray, ORENGE, Text_Gray, White } from '../Utils/colors';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../Utils/fonts';

const startImage = require('../../assets/star.png')
const ProductView = ( props ) =>
{
    return (
        <TouchableOpacity style={ [ styles.mainContainer, props.style ] }>
            <ImageBackground
            resizeMode='contain'
            style={{
            height:100,
            width:120,
            justifyContent:'center',
            marginHorizontal:"10%",
         
            
            }}
            source={require('../../assets/product.png')}>
                <View style={styles.circleView}>
                    <Text style={styles.discountText} >20%</Text>
                </View>
            </ImageBackground>
            <Text style={styles.regularText}>Product Name</Text>
            <Rating
                type='star'
                ratingImage={ startImage }
                ratingColor='#3498db'
                ratingBackgroundColor='#c8c7c8'
                ratingCount={ 5 }
                imageSize={ 10 }
                defaultRating={3}
                onFinishRating={ this.ratingCompleted }
                style={ { alignSelf:'flex-start' } }
            />
             <Text style={[styles.discountText,{color:Text_Gray,fontFamily:POPINS_REGULAR,}]}>Store Name</Text>
             <Text style={styles.regularText}>Rs. 135/-</Text>
             <TouchableOpacity style={styles.btnView}>
                 <Image
                 style={{height:10,width:10}}
                 source={require('../../assets/plus.png')}/>
             </TouchableOpacity>
        </TouchableOpacity>
    );
}
export default ProductView;

const styles = StyleSheet.create( {
    mainContainer: {
        height: 200,
        width: screen_width / 2 - 35,
        borderRadius:10,
        shadowColor:'#E2E2E2',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity:1,
        elevation:5,
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:White
        // borderWidth:1
    },
    circleView:{
        height:30,
        width:30,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:ORENGE,
        bottom:"5%"
    },
    discountText:{
        color:White,
        fontSize:10,
        fontFamily:POPINS_SEMI_BOLD
    },
    regularText:{
        fontFamily:POPINS_SEMI_BOLD,
        fontSize:14,
        paddingVertical:5,    
       
    },
    btnView:{
        backgroundColor:Light_Green,
        borderRadius:10,
        height: 25,
        width:25,
        justifyContent:'center',
        alignContent:'center'
    }
} )