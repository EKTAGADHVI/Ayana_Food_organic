import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, Text ,Image} from 'react-native';
import { screen_height, screen_width } from '../Utils/constant';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Black, Gray, Light_Green, Line_Gray, ORENGE, Text_Gray, White } from '../Utils/colors';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../Utils/fonts';

const startImage = require('../../assets/star.png')
const ProductView = ( props ) =>
{
    // var count = 13;
    // let name= props.name;
    // let title =name.slice(0,count) +(name.length > count ? "..." : "");
// console.log("props.item",props.item)
    return (
        <TouchableOpacity style={ [ styles.mainContainer, props.style ] } onPress={props.onPress}>
            <ImageBackground
            resizeMode='contain'
            style={{
            height:100,
            width:120,
            justifyContent:'center',
            marginHorizontal:"10%",
         
            
            }}
            source={{uri:props.image}}>
         {
                props.discount!=="NaN%" ?   <View style={styles.circleView}>
                    <Text style={styles.discountText} >{props.discount}</Text>
                </View>
                :null
         }
            </ImageBackground>
            <Text style={styles.regularText}>{props.name}</Text>
            <Rating
                type='star'                
                ratingImage={ startImage }
                ratingColor='#3498db'
                ratingBackgroundColor='#c8c7c8'
                ratingCount={ 5 }
                imageSize={ 10 }  
                readonly={true} 
                startingValue={props.rating}             
                onFinishRating={ this.ratingCompleted }
                style={ { alignSelf:'flex-start' } }
            />
            {/* {props.comment ?  <Text style={[styles.discountText,{color:Text_Gray,fontFamily:POPINS_REGULAR,}]}>{props.comment}</Text>:null} */}
             <Text style={[styles.discountText,{color:Text_Gray,fontFamily:POPINS_REGULAR,}]}>{props.storeName}</Text>
             <Text style={[styles.discountText,{color:Black,fontFamily:POPINS_REGULAR,paddingVertical:3}]}>{props.weight}</Text>
           <View
           style={{flexDirection:'row',alignItems:"center"}}>           
             <Text style={styles.regularText}>Rs. {props.price} /-</Text>
            <View style={{ borderLeftColor:Light_Green,borderLeftWidth:1.5, paddingLeft:5,padding:0,left:"30%",borderStyle:'solid'}}>
            <Text style={[styles.regularText,{color:Text_Gray,fontFamily:POPINS_REGULAR,textDecorationLine: 'line-through',paddingVertical:0,fontSize:12}]}>Rs. {props.regularPrice} /-</Text>
            </View>
           </View>
             <TouchableOpacity disabled={true} style={styles.btnView} onPress={props.onAdd}>
                 <Image
                 style={{height:10,width:10,alignSelf:'center'}}
                 source={require('../../assets/plus.png')}/>
             </TouchableOpacity>
        </TouchableOpacity>
    );
}
export default ProductView;

const styles = StyleSheet.create( {
    mainContainer: {
      
        width: screen_width / 2 - 30,
        borderRadius:10,
        shadowColor:'#E2E2E2',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity:1,
        elevation:5,
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:White,
        marginHorizontal:8,
        borderWidth:1,
        borderColor:'#E2E2E2',
        marginVertical:5
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
        fontFamily:POPINS_SEMI_BOLD,
       paddingVertical:5
    },
    regularText:{
        fontFamily:POPINS_SEMI_BOLD,
        fontSize:14,
        paddingVertical:5,    
       
    },
    btnView:{
        backgroundColor:Light_Green,
        borderRadius:8,
        height: 25,
        width:25,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'flex-end',    
        bottom:3,
     
    }
} )