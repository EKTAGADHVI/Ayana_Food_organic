import React from 'react';
import { Component } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { color } from 'react-native-reanimated';
import BasicHeader from '../../Components/BasicHeader';
import { Black, Light_Green, Text_Gray } from '../../Utils/colors';
import { screen_width } from '../../Utils/constant';
import { POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';

class OrderDetails extends Component
{
    constructor ( props )
    {
        super( props );
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <ScrollView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Order Details' } />
                    <View>
                        <View style={ styles.cardView }>

                            <View style={ { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 } }>
                                <View >
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" } ] }>Order Date</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left", } ] }>OrderID #</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" } ] }>Order total</Text>

                                </View>
                                <View >
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" } ] }>1-02-2022</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" } ] }>25002</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" } ] }>Rs. 750.00 (1 item) </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={ styles.downloadButton }>
                                <View style={ [ styles.rowView, { justifyContent: 'space-between', paddingHorizontal: "4%" } ] }>
                                    <Text style={ [ styles.normalText, { color: Light_Green, fontSize: 16 } ] }>Download</Text>
                                    <Image
                                        style={ { height: 12, width: 12, resizeMode: 'contain' } }
                                        source={ require( '../../../assets/right.png' ) } />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={ [ styles.regularText, { fontFamily: POPINS_SEMI_BOLD, paddingVertical: 8 } ] }>Shipping Details</Text>

                        <View style={ [ styles.cardView, { flexDirection: 'row', alignItems: 'flex-start', } ] } >
                            <Image
                                source={ require( '../../../assets/product.png' ) }
                                style={ styles.imageStyle } />
                            <View>
                                <Text style={ [ styles.regularText ] }>Product Name </Text>
                                <View style={ styles.rowView }>
                                    <Text style={ [ styles.smallText, { color: Light_Green } ] }>Status :<Text style={ [ styles.smallText, { color: Black } ] }> Delivered  |</Text></Text>
                                    <Text style={ [ styles.smallText, ] }>February 2022</Text>
                                </View>
                                <View style={ [ styles.rowView, { width: screen_width * 0.57, justifyContent: "space-between" } ] }>
                                    <Text style={ [ styles.smallText, { fontSize: 14, textAlign: 'left' } ] }>Rs. 750.00 </Text>
                                    <Text style={ [ styles.smallText, { fontSize: 14, textAlign: 'left' } ] }>Qty : 500 gm </Text>
                                </View>
                                <Text style={ [ styles.smallText, { color: Black, fontSize: 14 } ] }>Sold By : Ayana Food Organic  </Text>
                            </View>

                        </View>

                        <Text style={ [ styles.regularText, { fontFamily: POPINS_SEMI_BOLD, paddingVertical: 8 } ] }>Shipping Address</Text>
                        <Text style={ [ styles.regularText, { width: screen_width * 0.56, paddingVertical: 8, textAlign: 'justify' } ] }>Abigail Morris
                        35a Dalry Rd,	Midlothian
United Kingdom - 380015</Text>
                        <Text style={ [ styles.regularText, { fontFamily: POPINS_SEMI_BOLD, paddingVertical: 8 } ] }>Payment Details</Text>

                        <View style={[styles.cardView]}>
                        <Text style={ [ styles.regularText, { fontFamily: POPINS_SEMI_BOLD, paddingVertical: 5 } ] }>Cash On Delivery</Text>
                        <View style={ { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 ,paddingHorizontal:"5%"} }>
                                <View >
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left",fontFamily:POPINS_SEMI_BOLD } ] }>item</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left",fontFamily:POPINS_SEMI_BOLD  } ] }>Order Total</Text>
                                  

                                </View>
                                <View >
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" ,fontFamily:POPINS_SEMI_BOLD } ] }>1</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left",fontFamily:POPINS_SEMI_BOLD  } ] }>Rs. 705.00</Text>
                                   
                                </View>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

export default OrderDetails