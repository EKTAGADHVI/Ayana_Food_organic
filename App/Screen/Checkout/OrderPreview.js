import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Component } from 'react';
import { SafeAreaView, Text, View,TouchableOpacity,Image, ScrollView } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { Black, Gray, Light_Gray, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import { POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';

class OrderPreview extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            totalPrice: this.props.route.params.totalPrice,
            checkOutData: this.props.route.params.data,
            billing: this.props.route.params.billingData,
            paymentMethod:[{
                "id":"1",
                "name":"PayUMoney"
            },
            {
                "id":"2",
                "name":"Cash On Delivery"
            }],
            checked:0
        }
    }
    async componentDidMount ()
    {
        // await AsyncStorage.getItem('add')
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <ScrollView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Order Preview" } />
                    <View >

                    <View style={ { borderBottomWidth: 0.5, borderBottomColor: Gray, paddingVertical: 10 } }>
                        <View style={ [ styles.rowView, ] }>
                            <Text style={ [ styles.normalText, { fontSize: 15, fontFamily: POPINS_SEMI_BOLD, color: Light_Green } ] }>Your Order</Text>
                        </View>
                        <View style={ [ styles.rowView ] }>
                            <Text style={ [ styles.normalText, { fontFamily: POPINS_SEMI_BOLD } ] }>Product</Text>
                            <Text style={ [ styles.normalText, { fontFamily: POPINS_SEMI_BOLD } ] }>Price</Text>
                        </View>
                        {
                            this.state.checkOutData.map((data)=>{
                                console.log("Item",data)
                                return(
                                    <View style={ [ styles.rowView ] }>
                            <Text style={ [ styles.normalText, { fontSize: 12,width:"70%" } ] }>{data.post_title}</Text>
                            <Text style={ [ styles.normalText, { fontSize: 12 } ] }>Rs. {data.cartPrice}</Text>
                        </View>
                                )
                            })
                        }
                     
                        
                    </View>

                    <View>
                    <View style={ [ styles.rowView,{ borderBottomWidth: 0.5, borderBottomColor: Gray,} ] }>
                            <Text style={ [ styles.normalText, { fontSize:15 } ] }>Apply Coupon Code</Text>
                            <Text style={ [ styles.normalText, { fontSize:12,color:Light_Green } ] }>Add Coupon</Text>
                        </View>
                        <View style={ [ styles.rowView,{ borderBottomWidth: 0.5, borderBottomColor: Gray,} ] }>
                            <Text style={ [ styles.normalText, { fontSize:15 } ] }>Sub Total</Text>
                            <Text style={ [ styles.normalText, { fontSize:12,} ] }>Rs. {this.state.totalPrice}</Text>
                        </View>
                        <View style={ [ styles.rowView,{ borderBottomWidth: 0.5, borderBottomColor: Gray,} ] }>
                            <Text style={ [ styles.normalText, { fontSize:15 } ] }>Total</Text>
                            <Text style={ [ styles.normalText, { fontSize:12,} ] }>Rs. {this.state.totalPrice}</Text>
                        </View>

                    </View>
                    <View style={ [ styles.rowView,{ borderBottomWidth: 0.5, borderBottomColor: Gray,} ] }>
                            <Text style={ [ styles.normalText, { fontSize:15,color:Light_Green } ] }>Payment</Text>
                            <Text style={ [ styles.normalText, { fontSize:12,} ] }></Text>
                        </View>
                    {
                        this.state.paymentMethod.map((item,index)=>{
                            return(
                                <View key={ index }>
                                                    {this.state.checked === index ?
                                                        <TouchableOpacity
                                                           onPress={()=>{
                                                               this.setState({
                                                                checked:index
                                                               })
                                                           }}
                                                            style={ [ styles.attributesView, { flexDirection:'row' } ] }>
                                                            <Image style={ { height: 12, width: 12, resizeMode: 'contain', alignSelf: 'center' } } source={ require( "../../../assets/selected.png" ) } />
                                                            <Text style={ [ styles.normalText, { color: Black, fontSize: 14, paddingHorizontal: 3, paddingVertical: 3, textAlign: 'center' ,left:5} ] }>{ item.name }</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                        onPress={()=>{
                                                            this.setState({
                                                             checked:index
                                                            })
                                                        }}
                                                            style={ [ styles.attributesView, { flexDirection:'row'} ] }>
                                                            <Image style={ { height: 12, width: 12, resizeMode: 'contain', alignSelf: 'center' } } source={ require( "../../../assets/unselected.png" ) } />
                                                            <Text style={ [ styles.normalText, { color: Black, fontSize: 14, paddingHorizontal: 3, paddingVertical: 3, textAlign: 'center',left:5 } ] }>{ item.name }</Text>
                                                        </TouchableOpacity> }
                                                </View>
                            );
                        })
                    }
                    <View style={{height:200}}></View>
                       <View style={{paddingVertical:10}}>
                           <Text style={[styles.normalText,{fontSize:10,textAlign:'center',color:Text_Gray,}]}>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
</Text>
                       <FilledButton
                                    onPress={ () =>
                                    {
                                       
                                    } }
                                    title={ "Place Order " } />
                       </View>
                    </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

export default OrderPreview;