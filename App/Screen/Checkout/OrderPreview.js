import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Component } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { Black, Gray, Light_Gray, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';
import RazorpayCheckout from 'react-native-razorpay';
import Modal from "react-native-modal";
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import { EventRegister } from 'react-native-event-listeners';
// import PayuMoney,{HashGenerator} from 'react-native-payumoney';
class OrderPreview extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            totalPrice: this.props.route.params.totalPrice,
            checkOutData: this.props.route.params.data,
            billing: this.props.route.params.billingData,
            paymentMethod: [ {
                "id": "1",
                "name": "PayUMoney"
            },
            {
                "id": "2",
                "name": "Cash On Delivery"
            } ],
            checked: 0,
            orderFail: false,
            orderSucess: false,
            // orderStatus:false,
            isCashOnDelivery:false,
        }

    }
    RazaroPayment = () =>
    {
        console.log( "Billing  Data", this.state.billing )
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_f6l6m6k12uB9NY', // Your api key
            amount: '100',
            name: 'Ayana Food & Organic',
            prefill: {
                email: this.state.billing.billingEmail,
                contact: this.state.billing.billingPhone,
                name: this.state.billing.fName + " " + this.state.billing.lName
            },
            theme: { color: '#F37254' }
        }
        RazorpayCheckout.open( options ).then( ( data ) =>
        {
            // handle success
            this.OrderSucess()
            // alert( `Success: ${ data.razorpay_payment_id }` );
        } ).catch( ( error ) =>
        {
            this.OrderFailure()
            // handle failure
            // alert( `Error: ${ error.code } | ${ error.description }` );
        } );
    }

    initiatePayment = () =>
    {
        let code = HashGenerator( {
            key: '3TnMpV',
            amount: '1.0',
            email: 'himanshu@uniqdatasolution.com',
            txnId: '1594976828726',
            productName: 'ring',
            firstName: 'Himanshu',
            salt: 'g0nGFe03',
        } );

        console.log( "Code", code )
        const payData = {
            amount: '1.0',
            txnId: '1594976828726',
            productName: 'ring',
            firstName: 'Himanshu',
            email: 'himanshu@uniqdatasolution.com',
            phone: '7285004531',
            merchantId: '8552038',
            key: '3TnMpV',
            successUrl: 'https://www.payumoney.com/mobileapp/payumoney/success.php',
            failedUrl: 'https://www.payumoney.com/mobileapp/payumoney/failure.php',
            isDebug: false,
            hash: code,
        }

        PayuMoney( payData ).then( ( data ) =>
        {
            // Payment Success
            console.log( data )
        } ).catch( ( e ) =>
        {
            // Payment Failed
            console.log( e )
        } )

    }
    async componentDidMount ()
    {
        // await AsyncStorage.getItem('add')
    }

    OrderSucess = async () =>
    {
        let UpdatedArray = []
        this.setState( { orderSucess: true } )
        await AsyncStorage.setItem( 'AddToCart', JSON.stringify( UpdatedArray ) )
            .then( ( res ) =>
            {
                EventRegister.emit( 'Add-to-cart' )
                console.log( 'Successfully Updated' );
            } )
            .catch( ( error ) =>
            {
                console.log( "error", error )
            } );
    }
    OrderFailure = () =>
    {
        this.setState( { orderFail: true } )

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
                                    this.state.checkOutData.map( ( data ) =>
                                    {
                                        console.log( "Item", data )
                                        return (
                                            <View style={ [ styles.rowView ] }>
                                                <Text style={ [ styles.normalText, { fontSize: 12, width: "70%" } ] }>{ data.post_title }</Text>
                                                <Text style={ [ styles.normalText, { fontSize: 12 } ] }>Rs. { data.cartPrice }</Text>
                                            </View>
                                        )
                                    } )
                                }


                            </View>

                            <View>
                                <View style={ [ styles.rowView, { borderBottomWidth: 0.5, borderBottomColor: Gray, } ] }>
                                    <Text style={ [ styles.normalText, { fontSize: 15 } ] }>Apply Coupon Code</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 12, color: Light_Green } ] }>Add Coupon</Text>
                                </View>
                                <View style={ [ styles.rowView, { borderBottomWidth: 0.5, borderBottomColor: Gray, } ] }>
                                    <Text style={ [ styles.normalText, { fontSize: 15 } ] }>Sub Total</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 12, } ] }>Rs. { this.state.totalPrice }</Text>
                                </View>
                                <View style={ [ styles.rowView, { borderBottomWidth: 0.5, borderBottomColor: Gray, } ] }>
                                    <Text style={ [ styles.normalText, { fontSize: 15 } ] }>Total</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 12, } ] }>Rs. { this.state.totalPrice }</Text>
                                </View>

                            </View>
                            <View style={ [ styles.rowView, { borderBottomWidth: 0.5, borderBottomColor: Gray, } ] }>
                                <Text style={ [ styles.normalText, { fontSize: 15, color: Light_Green } ] }>Payment</Text>
                                <Text style={ [ styles.normalText, { fontSize: 12, } ] }></Text>
                            </View>
                            {
                                this.state.paymentMethod.map( ( item, index ) =>
                                {
                                    console.log("Index",index)
                                    return (
                                        <View key={ index }>
                                            {this.state.checked === index ?
                                                <TouchableOpacity
                                                    onPress={ () =>
                                                    {
                                                        this.setState( {
                                                            checked: index
                                                        } )
                                                    } }
                                                    style={ [ styles.attributesView, { flexDirection: 'row' } ] }>
                                                    <Image style={ { height: 12, width: 12, resizeMode: 'contain', alignSelf: 'center' } } source={ require( "../../../assets/selected.png" ) } />
                                                    <Text style={ [ styles.normalText, { color: Black, fontSize: 14, paddingHorizontal: 3, paddingVertical: 3, textAlign: 'center', left: 5 } ] }>{ item.name }</Text>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity
                                                    onPress={ () =>
                                                    {
                                                        this.setState( {
                                                            checked: index
                                                        } )
                                                    } }
                                                    style={ [ styles.attributesView, { flexDirection: 'row' } ] }>
                                                    <Image style={ { height: 12, width: 12, resizeMode: 'contain', alignSelf: 'center' } } source={ require( "../../../assets/unselected.png" ) } />
                                                    <Text style={ [ styles.normalText, { color: Black, fontSize: 14, paddingHorizontal: 3, paddingVertical: 3, textAlign: 'center', left: 5 } ] }>{ item.name }</Text>
                                                </TouchableOpacity> }
                                        </View>
                                    );
                                } )
                            }
                            <View style={ { height: 100 } }></View>
                            <View style={ { paddingVertical: 10 } }>
                                <Text style={ [ styles.normalText, { fontSize: 10, textAlign: 'center', color: Text_Gray, } ] }>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
</Text>
                                <FilledButton
                                    onPress={ () =>
                                    {
                                        // 
                                        // this.setState( { orderSucess: true } )

                                        // this.OrderFailure()
                                        // this.initiatePayment()
                                        this.state.checked == 0 ?
                                        this.RazaroPayment() : this.OrderSucess()
                                    } }
                                    title={ "Place Order " } />
                            </View>
                        </View>

                    </ScrollView>
                    <Modal
                        isVisible={ this.state.orderFail }
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        transparent={ true }

                        style={ styles.modalStyle }
                        onRequestClose={ () =>
                        {
                            this.setState( { orderFail: false } )

                            // mooveRL();
                        } }>
                        <View style={ { flex: 1, padding: 15 } }>
                            <TouchableOpacity onPress={ () =>
                            {
                                this.setState( { orderFail: false } )
                            } }>
                                <Image
                                    style={ { height: 18, width: 18, resizeMode: 'contain' } }
                                    source={ require( '../../../assets/closed.png' ) } />
                            </TouchableOpacity>

                            <View style={ { flex: 0.9, justifyContent: 'center', alignItems: "center", paddingTop: 15 } }>
                                <Image
                                    style={ { height: screen_height / 3.5, width: screen_height / 3.5, resizeMode: 'contain', alignSelf: 'center' } }
                                    source={ require( '../../../assets/orderFail.png' ) } />

                                <Text style={ styles.titleText }>Oops ! Order Failed</Text>
                                <FilledButton
                                    style={ { width: screen_width / 1.5 } }
                                    title={ 'Please Try Again' } />
                                <Text style={ [ styles.titleText, { fontSize: 14 } ] }>Back to home</Text>
                            </View>

                        </View>



                    </Modal>
                    <Modal
                        isVisible={ this.state.orderSucess }
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        transparent={ true }

                        style={ styles.modalStyle2 }
                        onRequestClose={ () =>
                        {
                            this.setState( { orderSucess: false } )

                            // mooveRL();
                        } }>
                        <View style={ { flex: 1, } }>
                            <ImageBackground
                                style={ { flex: 1, justifyContent: "center", alignItems: 'center' } }
                                source={ require( '../../../assets/background.png' ) }>
                                <View style={ { flex: 0.9, alignItems: 'center', justifyContent: 'center', paddingTop: 20 } }>
                                    <View style={ { flex: 0.9 } }>
                                        <Image
                                            style={ { height: screen_height / 3, width: screen_height / 3, resizeMode: "contain", alignSelf: 'center', right: 5 } }
                                            source={ require( '../../../assets/orderSucess.png' ) } />
                                        <Text style={ [ styles.titleText, { fontFamily: POPINS_REGULAR, fontSize: 20 } ] }>Your Order has been accepted</Text>
                                        <Text style={ [ styles.normalText, { color: Light_Green, textAlign: 'center' } ] }>Order Number :00101</Text>
                                        <Text style={ [ styles.normalText, { color: Light_Green, textAlign: 'center' } ] }>Order Date : { moment( new Date() ).format( 'DD/MM/YYYY' ) }</Text>
                                    </View>
                                    <Text style={ [ styles.normalText, { color: Text_Gray, textAlign: 'center' } ] }>Your items has been placcd and is on
it’s way to being processed</Text>
                                    <FilledButton
                                        onPress={ () =>
                                        {
                                            this.setState( { orderSucess: false } )
                                            this.props.navigation.dispatch(
                                                CommonActions.reset( {
                                                    index: 1,
                                                    routes: [
                                                        { name: 'Orders' },
                                                    ],
                                                } )
                                            );
                                            // this.props.navigation.navigate( 'Orders' );

                                        } }
                                        style={ { width: screen_width / 1.5, alignSelf: "center" } }
                                        title={ 'Track Order' } />
                                    <Text
                                        onPress={ () => { this.props.navigation.navigate( 'Shop' ) } }
                                        style={ [ styles.titleText, { fontSize: 14 } ] }>Back to home</Text>
                                </View>



                            </ImageBackground>



                        </View>



                    </Modal>
                </SafeAreaView>
            </View>
        );
    }
}

export default OrderPreview;