import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Component } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground, TextInput, Platform } from 'react-native';
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
import Apis from '../../RestApi/Apis';
import ProgressLoader from 'rn-progress-loader';
import axios from 'axios';
// import PayuMoney,{HashGenerator} from 'react-native-payumoney';

class OrderPreview extends Component
{

    constructor ( props )
    {
        super( props );
        sellerDetail=[];
        this.state = {
            order_id: 0,
            totalPrice: this.props.route.params.totalPrice,
            checkOutData: this.props.route.params.data,
            billing: this.props.route.params.billingData,
            paymentMethod: [ {
                "id": "1",
                "name": "Razor-pay (Net Banking/ Credit Cart/UPI)"
            },
            {
                "id": "2",
                "name": "Cash On Delivery"
            } ],
            checked: 0,
            orderFail: false,
            orderSucess: false,
            // orderStatus:false,
            isCashOnDelivery: false,
            userData: [],
            visible: false,
            totalText: 0,
            subTotal: this.props.route.params.totalPrice,
            coupon_code: '',
            couponBtn: false,
            discount_amount:0,
            orderDate:"",
            shippingCharge:100,
            sellerCharge:[]
        }

    }
    RazaroPayment = () =>
    {
        console.log( "Billing  Data", this.state.billing )
        var options = {
            description: '',
            image: 'https://ayanafoodorganic.com/wp-content/uploads/2020/09/logo-1.png',
            currency: 'INR',
            key: 'rzp_live_lEWAwuqdDZ5UBz', // Your api key
            amount: this.state.totalPrice * 100,
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
            this.saveOrder()
            // this.OrderSucess()
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
    verifyCouponCode = () =>
    {

        let cat_id = [];
        let product_id = [];
        this.setState({visible:true})
        this.state?.checkOutData?.map( ( item, index ) =>
        {

            product_id.push( {
                "product_id" : item?.ID,
                "quantity" : item?.cartQuentity,
                "price":item?.sPrice
            } )
            item?.category?.map( ( data ) =>
            {
                cat_id.push( data?.category_id )
            } )
        } );

        let request = {
            "coupon_code": this.state.coupon_code,
            "sub_total": this.state.subTotal,
            "user_id":this.state.userData[ 0 ]?.ID,
            "category_id": cat_id,
            "product_detail": product_id
        }

        Apis.verifyCouponCall(request)
        .then((res)=>{
            return JSON.stringify(res)
        }).
        then((response)=>{
            console.log("Discount ========> ",response)
            if(JSON.parse(response).data.status == true){
               let data =JSON.parse(response)?.data?.data;
               this.setState({
                   visible:false,
                   discount_amount:data?.coupon_amount,
                   totalPrice:this.state.totalPrice - data?.coupon_amount
               })

            }
            else{
                let data =JSON.parse(response)?.data?.data;
                alert(JSON.parse(response)?.data?.message)
                this.setState({visible:false})
            }

        })
        .catch((error)=>{
            console.log("Erroir",error)
            alert("Please try again","Something went wrong !")
            this.setState({visible:false})
        })


    }
    async componentDidMount ()
    {
        this.getShipCharges()
        this.getTotalTextCharges()
        await AsyncStorage.getItem( 'UserData' )
            .then( ( res ) =>
            {

                let dd = JSON.parse( res ).data;
                console.log( "UserRes", dd[ 0 ].ID )
                if ( res !== null )
                {
                    this.setState( { userData: JSON.parse( res ).data } )
                    // this.profileAPICall(dd[ 0 ].ID)
                    // // this.props.profileCall( {
                    // //     "user_id":"122"
                    // // } )
                }
                else
                {
                    this.setState( { userData: [] } )
                }
            } ).catch( ( error ) => { } )

            // if(this.state.totalPrice<500){
            //         this.setState({totalPrice:this.state.totalPrice +100})
            // }



        // await AsyncStorage.getItem('add')
    }

    getTotalTextCharges = () =>
    {
        let totalCharge = 0;
        this.state.checkOutData?.map( ( item, index ) =>
        {
            if ( item?.tax_deatil?.length > 0 )
            {
                item?.tax_deatil?.map( ( data ) =>
                {
                    //Our number.
                    var number = item.regPrice;

                    //The percent that we want to get.
                    //i.e. We want to get 50% of 120.
                    var percentToGet = data.tax_rate;

                    //Calculate the percent.
                    var percent = ( percentToGet / 100 ) * number;

                    totalCharge = totalCharge + percent
                } )
            }

        } )

        this.setState( {
            totalText: totalCharge,
            totalPrice: this.state.totalPrice + totalCharge
        } )

    }

    getShipCharges =async()=>{
        this.setState( { visible: true } )
        let sellers=[];

        this.state.checkOutData.map((item,index)=>{
            sellers.push({
                "vendor_id":item.vendor_id,
                "seller_name":item.seller_name
            })
        });
        let final = sellers.filter((v,i,a)=>a.findIndex(v2=>(v2.vendor_id===v.vendor_id))===i)


        console.log("   ",final)
        final.map(async(seller_id,index)=>{
            Apis.getShippingCall({"vendor_id":seller_id.vendor_id})
            .then(async(res)=>{

                    console.log("Response",res.data)
                    // let response =JSON.parse(res)?.data?.data;
                   await res?.data?.data?.map(async(item)=>{
                            if(item.zone_name =="India"){
                                let newArray=[]
                                 await this.state?.checkOutData?.map(async(data,index)=>{
                                    if( data.vendor_id === item.vendor_id ){
                                        newArray.push(data)
                                    }
                                });
                                await console.log("Seprated Array",newArray)
                                let total = 0.0;
                                await newArray.map(async ( value ) =>
                                {
                                    await console.log( "cartPriceData", parseFloat( value.cartPrice ) )
                                    total = parseFloat( value.cartPrice ) + total;
                                } )
                                await console.log( "total", total )
                                let Charges=0;
                                let minAmount=0;
                                await item?.flat_rate?.map(async(charge_amount)=>{
                                        Charges=  await charge_amount.cost
                                });

                                await item?.free_shipping?.map(async(min)=>{
                                    minAmount= await min.min_amount
                                })

                                await console.log( "Min AMount", minAmount );
                                await console.log( "Charge", Charges );
                                if( await total <  await minAmount){
                                    await sellerDetail.push({
                                        "vendor_id":await seller_id.vendor_id,
                                        "seller_name":await seller_id.seller_name,
                                        "charge":await Charges,
                                        "min_amount":await minAmount
                                    })
                                    this.setState({totalPrice:parseFloat(this.state.totalPrice) + parseFloat(await Charges)})
                                }
                                // this.setState(prevState => ({
                                //     sellerCharge: [...prevState, sellerDetail],

                                //   }))
                              await  this.setState({ sellerCharge:await sellerDetail})
                                await console.log("Final Selller ",sellerDetail)
                                newArray=await[]


                            }

                        })

                        this.setState( { visible: false } )

            })
            .catch((error)=>{
                this.setState( { visible: false } )
                console.log("error",error)
            })
                // let newArray =this.state.checkOutData.filter((data,index)=>{
                //     return data.vendor_id == item.vendor_id
                // });
                // console.log("Seprated Array",newArray);
               await this.setState( { visible: false } )
        })
    //   await  this.setState({sellerCharge:sellerDetail})
    //    await console.log("Final Selller ",this.state.sellerCharge)

    }

    saveOrder = () =>
    {


        this.setState( { visible: true } )
        let itemArray = [];
        this.state.checkOutData.map( ( item, index ) =>
        {
            // console.log("Item")
            let add;
            if ( item.selectedVarinatID !== null )
            {
                add = {
                    "product_id": item.ID,
                    "quantity": item.cartQuentity,
                    "variation_id": item.selectedVarinatID

                }
                itemArray.push( add )
            }
            else
            {
                add = {
                    "product_id": item.ID,
                    "quantity": item.cartQuentity,

                }
                itemArray.push( add )
            }


        } )
        let request = {
            "payment_method": this.state.checked == 0 ? "onlinePayment" : "cod",
            "payment_method_title": this.state.checked == 0 ? "Razor Pay" : "Cash On Delivery",
            "status": "processing",
            "set_paid": this.state.checked == 0 ? true :false,
            "customer_id": this.state.userData[ 0 ]?.ID,
            "billing": [
                {
                    "first_name": this.state.billing.fName,
                    "last_name": this.state.billing.lName,
                    "address_1": this.state.billing.stretAddress,
                    "address_2": "",
                    "city": this.state.billing.city,
                    "state": this.state.billing.state_Value,
                    "postcode": this.state.billing.pinCode,
                    "country": "IN",
                    "email": this.state.billing.billingEmail,
                    "phone": this.state.billing.billingPhone,
                }
            ],
            "shipping": [
                {
                    "first_name": this.state.billing.fName,
                    "last_name": this.state.billing.lName,
                    "address_1": this.state.billing.stretAddress,
                    "address_2": "",
                    "city": this.state.billing.city,
                    "state": this.state.billing.state_Value,
                    "postcode": this.state.billing.pinCode,
                    "country": "IN"
                }
            ],
            "line_items": itemArray,
            "shipping_lines": [
                {
                    "method_id": "flat_rate",
                    "method_title": "Flat Rate",
                    "total": ""
                }
            ]
        }


        Apis.createOrderCall( request )
            .then( ( res ) =>
            {
                return JSON.stringify( res )
            } )
            .then( ( response ) =>
            {
                this.setState( {
                    visible: false,
                    order_id: JSON.parse(response).data?.data?.id,
                    orderDate:JSON.parse(response).data?.data?.date_created
                } )
                console.log( "Response", response )
                // this.ShipOrder()
                this.OrderSucess();
            } )
            .catch( ( error ) =>
            {
                console.log( "Eoororororororororo", error )
                this.setState( { visible: false } )
                this.OrderFailure();
            } )

    }


    OrderSucess = async () =>
    {


        let UpdatedArray = []
        this.setState( { orderSucess: true } )
        await AsyncStorage.setItem( 'AddToCart', JSON.stringify( UpdatedArray ) )
            .then( ( res ) =>
            {
                // this.saveOrder();
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
        let visibleBtn=false;
        if(this.state.coupon_code!== null && this.state.coupon_code!== '' && this.state.coupon_code.length>0 ){
            visibleBtn=true
        }
        else{
            visibleBtn=false
        }
        console.log("Final Selller ",sellerDetail)
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <ProgressLoader
                        visible={ this.state.visible }
                        isModal={ true }
                        isHUD={ true }
                        hudColor={ White }
                        color={ Light_Green } />
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Order Preview" } style={{paddingHorizontal:5}} />
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
                                        // console.log( "Item", data )
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
                                <View style={ [ { borderBottomWidth: 0.5, borderBottomColor: Gray, } ] }>
                                    <View style={ [ styles.rowView ] }>
                                        <Text style={ [ styles.normalText, { fontSize: 15 } ] }>Apply Coupon Code</Text>
                                        <TouchableOpacity onPress={()=>{
                                            this.setState({couponBtn:!this.state.couponBtn});
                                        }}>
                                            <Text style={ [ styles.normalText, { fontSize: 12, color: Light_Green } ] }>Add Coupon</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        this.state.couponBtn === true ?
                                            <View style={ [ styles.rowView, { alignItems: 'center' } ] }>
                                                <TextInput
                                                  placeholder={ "Enter Coupon Code" }
                                                    style={ styles.input }
                                                    value={this.state.coupon_code}
                                                    onChangeText={(text)=>{
                                                        this.setState({coupon_code:text});
                                                    }}
                                                />
                                                <TouchableOpacity
                                                disabled={visibleBtn === true ? false :true}
                                                style={ [styles.btnView,{opacity:visibleBtn === true ? 1 :0.5}] }
                                                onPress={()=>{
                                                    this.verifyCouponCode()
                                                    }}>
                                                    <Text style={ [ styles.normalText, { fontSize: 12, color: White } ] }>Apply</Text>
                                                </TouchableOpacity>
                                            </View>
                                            : null
                                    }
                                </View>


                                <View style={ [ styles.rowView, { borderBottomWidth: 0.5, borderBottomColor: Gray, } ] }>
                                    <Text style={ [ styles.normalText, { fontSize: 15 } ] }>Sub Total</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 12, } ] }>Rs. { this.state.subTotal }</Text>
                                </View>



                                <View style={ [ styles.rowView, { borderBottomWidth: 0.5, borderBottomColor: Gray, } ] }>
                                    <Text style={ [ styles.normalText, { fontSize: 15 } ] }>Total Tax</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 12, } ] }>Rs. { this.state.totalText }</Text>
                                </View>

                                <View style={ [ styles.rowView, { borderBottomWidth: 0.5, borderBottomColor: Gray, } ] }>
                                    <Text style={ [ styles.normalText, { fontSize: 15 } ] }>Discount</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 12, } ] }>Rs. { this.state.discount_amount }</Text>
                                </View>
                             <View>
                             <View style={ [ styles.rowView, { borderBottomWidth: 0, borderBottomColor: Gray, } ] }>
                                  <Text style={ [ styles.normalText, { fontSize: 15 } ] }>Shipping Charge</Text>
                                  {/* <Text style={ [ styles.normalText, { fontSize: 12, } ] }>Rs. 100</Text> */}
                              </View>
                              { console.log("SSSSS",sellerDetail)}
                                    {

                                       this.state.sellerCharge?.map((item)=>{
                                           console.log("Item",item)
                                            return(
                                                <View style={ [ styles.rowView, { borderBottomWidth: 0, borderBottomColor: Gray, } ] }>
                                                      <Text style={ [ styles.normalText, { fontSize: 12, } ] }>{ item?.seller_name}</Text>
                                                     <Text style={ [ styles.normalText, { fontSize: 12, } ] }>Rs. {item?.charge}</Text>
                                                </View>
                                            )
                                        })
                                    }
                             </View>


                                <View style={ [ styles.rowView, { borderBottomWidth: 0.5, borderBottomColor: Gray,borderTopColor:Gray,borderTopWidth:0.5 } ] }>
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
                                    console.log( "Index", index )
                                    return (
                                        <View  style={{paddingHorizontal:8}} key={ index }>
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
                            <View ></View>
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
                                            this.RazaroPayment() : this.saveOrder()
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
                                onPress={()=>{  this.setState( { orderFail: false } )}}
                                    style={ { width: screen_width / 1.5 } }
                                    title={ 'Please Try Again' } />
                                <Text
                                  onPress={ () => { this.props.navigation.navigate( 'Shop' ) }}
                                style={ [ styles.titleText, { fontSize: 14 } ] }>Back to home</Text>
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
                                        <Text style={ [ styles.titleText, { fontFamily: POPINS_REGULAR, fontSize: 20 } ] }>Your Order has been placed</Text>
                                        <Text style={ [ styles.normalText, { color: Light_Green, textAlign: 'center' } ] }>Order Number :{ this.state.order_id }</Text>
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
