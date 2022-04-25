import React from 'react';
import { Component } from 'react';
import { FlatList, SafeAreaView,Image,TouchableOpacity,Text,View } from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import { Light_Green, Text_Gray } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import { POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';

class Orders extends Component{
    constructor(props){
        super(props);
      this.state={
        link: [
            {
                "id": 0,
                "url": require( '../../../assets/product.png' )
            },
            {
                "id": 1,
                "url": require( '../../../assets/product.png' )
            },
            {
                "id": 2,
                "url": require( '../../../assets/product.png' )
            }

        ],
      };
    }
    renderOrder = ( item,index ) =>
    {
        return (
            <View style={ styles.ItemView } >
                <Text style={[styles.regularText]}>Product Name </Text>
                <View style={ styles.rowView }>
                    <Text style={[styles.smallText,{color:Light_Green}]}>Status :<Text style={[styles.smallText,{color:Text_Gray}]}> Delivered  |</Text></Text> 
                    <Text style={[styles.smallText,{color:Text_Gray}]}>February 2022</Text> 
                </View>
                <Text style={[styles.smallText,{color:Light_Green,fontSize:12}]}>Order ID : #230002 </Text> 
         <View style={[styles.rowView,{marginVertical:5}]}>
         <TouchableOpacity style={styles.btnStyle} onPress={()=>{this.props.navigation.navigate('OrderDetails')}}>
                    <Text style={[styles.smallText,{color:Light_Green,fontSize:12}]}>View Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStyle} onPress={()=>{
                    this.props.navigation.navigate('CheckOut')
                }}>
                    <Text style={[styles.smallText,{color:Light_Green,fontSize:12}]}>Reorder</Text>
                </TouchableOpacity>
         </View>
         
            </View>
        );
    }
    render(){
        return(
            <View style={styles.mainLayout}>
                <SafeAreaView>
                <BasicHeader OnBackPress={ () => { this.props.navigation.navigate('Account') } } title={ 'Orders' } />
                <View style={{height:screen_height*0.85,}}>
                    <FlatList
                    data={this.state.link}
                    keyExtractor={(item,index)=>item.id}
                    renderItem={({item,index})=>
                        this.renderOrder(item,index)
                    }/>
                </View>
                </SafeAreaView>
            </View>
        );
    }
}

export default Orders;