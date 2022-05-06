import moment from 'moment';
import React from 'react';
import { Component } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View, Text, ScrollView, FlatList } from 'react-native';
import { color } from 'react-native-reanimated';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { Black, Light_Green, Text_Gray } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';

class OrderDetails extends Component
{
    constructor ( props )
    {
        super( props );
        this.state={
            data : this.props.route?.params?.data
        };
    }
    componentDidMount(){
        console.log("Order Data", this.state.data)
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <ScrollView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Order Details' } />
                    <View >
                        <View style={ styles.cardView }>

                            <View style={ { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 } }>
                                <View >
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" } ] }>Order Date</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left", } ] }>OrderID #</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" } ] }>Order total</Text>

                                </View>
                                <View >
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" } ] }>{moment(this.state.data?.date_created_gmt).format("DD/MM/YYYY")}</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" } ] }>{this.state.data.id}</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" } ] }>Rs. {this.state.data.total} </Text>
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

                      <FlatList
                      data={this.state.data?.line_items}
                      horizontal={true}
                     
                      
                      keyExtractor={(item)=>item.ID}
                      renderItem={({item,index})=>{
                          console.log("Oderssss",item)
                          return(
                            <View style={ [ styles.cardView, { flexDirection: 'row', alignItems: 'flex-start', } ] } >
                            <Image
                                source={ require('../../../assets/default.png')}
                                style={ styles.imageStyle } />
                            <View>
                                <Text style={ [ styles.regularText, ] }>{item.name.slice( 0, 25 ) + ( item.name.length > 25 ? "..." : "" )}</Text>
                                <View style={ styles.rowView }>
                                    <Text style={ [ styles.smallText, { color: Light_Green } ] }>Status :<Text style={ [ styles.smallText, { color: Black } ] }> Delivered  |</Text></Text>
                                    <Text style={ [ styles.smallText, ] }>{this.state.data.date}</Text>
                                </View>
                                <View style={ [ styles.rowView, { width: screen_width * 0.57, justifyContent: "space-between" } ] }>
                                    <Text style={ [ styles.smallText, { fontSize: 14, textAlign: 'left' } ] }>Rs. {item.total} </Text>
                                   {
                                       item.selectedVariation !== null? <Text style={ [ styles.smallText, { fontSize: 14, textAlign: 'left' } ] }>Qty : {item.quantity} </Text>:null
                                   }
                                </View>
                                <Text style={ [ styles.smallText, { color: Black, fontSize: 14 } ] }>Sold By : {item.meta_data.map((data,index)=>{
                                    if(data.display_key==="Seller"){
                                        return data.display_value
                                    }
                                    else{
                                        return ""
                                    }
                                })}  </Text>
                            </View>

                        </View>
                          )
                      }}/>

                        <Text style={ [ styles.regularText, { fontFamily: POPINS_SEMI_BOLD, paddingVertical: 8 } ] }>Shipping Address</Text>
                        <Text style={ [ styles.regularText, { width: screen_width * 0.56, paddingVertical: 8, } ] }>{this.state.data.billing.address_1 }</Text>
                        <Text style={ [ styles.regularText, { fontFamily: POPINS_SEMI_BOLD, paddingVertical: 8 } ] }>Payment Details</Text>

                        <View style={[styles.cardView]}>
                        <Text style={ [ styles.regularText, { fontFamily: POPINS_SEMI_BOLD, paddingVertical: 5 } ] }>{this.state.data?.payment_method_title}</Text>
                        <View style={ { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 ,paddingHorizontal:"5%"} }>
                                <View>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left",fontFamily:POPINS_SEMI_BOLD } ] }>item</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left",fontFamily:POPINS_SEMI_BOLD  } ] }>Order Total</Text>
                                  

                                </View>
                                <View >
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left" ,fontFamily:POPINS_SEMI_BOLD } ] }>1</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 14, textAlign: "left",fontFamily:POPINS_SEMI_BOLD  } ] }>{this.state.data.total}</Text>
                                   
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