import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, Image, SafeAreaView, View, Text, TouchableOpacity, } from 'react-native';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import { Gray, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import styles from './styles';
import Modal from "react-native-modal";
import { CommonActions } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import FilledButton from '../../Components/Filledbuton';
let final = 0

class Cart extends Component
{
    constructor ( props )
    {
        super( props );

        this.state = {
            link: [
                {
                    "id": 0,
                    "url": require( '../../../assets/banner1.png' )
                },
                {
                    "id": 1,
                    "url": require( '../../../assets/banner2.png' )
                },
                {
                    "id": 2,
                    "url": require( '../../../assets/banner1.png' )
                }

            ],
            cartData: [],
            quentity: 1,
            checkOutPrice: 0.0,
            visible: true,
            variation: '',
            checkOutData: [],
            loginModal: false
        }

    }
    listener = EventRegister.addEventListener( 'Add-to-cart', async () =>
    {
        await AsyncStorage.getItem( 'AddToCart' )
            .then( ( res ) =>
            {
                console.log( 'CartItem', res );
                if ( res !== null )
                {
                    this.setState( {
                        cartData: JSON.parse( res ),
                        visible: false
                    } )
                    this.callFinalCheckOut();
                }
                else
                {
                    this.setState( {
                        cartData: [],
                        visible: false
                    } )
                }
            } )
            .catch( ( error ) =>
            {
                console.log( "Error", error )
                this.setState( { cartData: [] } )
            } )
    } )
    async componentDidMount ()
    {

        setTimeout( async () =>
        {
            this.setState( {
                visible: true
            } )
            await AsyncStorage.getItem( 'AddToCart' )
                .then( ( res ) =>
                {
                    console.log( 'CartItem', res );
                    if ( res !== null )
                    {
                        this.setState( {
                            cartData: JSON.parse( res ),
                            visible: false
                        } )
                        this.callFinalCheckOut();
                    }
                    else
                    {
                        this.setState( {
                            cartData: [],
                            visible: false
                        } )
                    }
                } )
                .catch( ( error ) =>
                {
                    console.log( "Error", error )
                    this.setState( { cartData: [] } )
                } )
        }, 1000 )


    }
    componentWillUnmount ()
    {

    }

    removeItem = async ( id, index2 ) =>
    {
        console.log( "Index", index2 )
        let remove = this.state.cartData.filter( ( data, index ) =>
        {
            return index !== index2
        } );
        await AsyncStorage.setItem( 'AddToCart', JSON.stringify( remove ) )
            .then( ( res ) =>
            {
                EventRegister.emit( 'Add-to-cart' )
                this.setState( { cartData: remove } )
            } )
            .catch( ( error ) =>
            {
                console.log( "Error", error )

            } )

    }
    callFinalCheckOut = () =>
    {
        let total = 0.0;
        this.state.cartData.map( ( item ) =>
        {
            console.log( "cartPriceData", parseFloat( item.cartPrice ) )
            total = parseFloat( item.cartPrice ) + total;
        } )
        console.log( "total", total )
        this.setState( { checkOutPrice: total } )

    }
    onDecrement = ( id, value, index2, item ) =>
    {
        console.log( 'item', item.ID );

        console.log( "Before update: ", this.state.cartData[ index2 ] );

        const UpdatedArray = this.state.cartData.map( ( item, index ) =>
        {


            if ( item.ID === id && index == index2 )
            {
                let onIncrement = value - 1;

                console.log( "value", item.variation?._price )
                let data = {
                    ...item,
                    cartPrice: item.sPrice * onIncrement,
                    cartRegularPrice: item.regPrice * onIncrement,
                    cartQuentity: parseInt( onIncrement )
                }
               
                //   this.setState({checkOutPrice:item.sPrice * onIncrement})
                return data;

            }
            else
            {
                return item
            }


        } );
        console.log( 'updatedAttya', UpdatedArray )
        this.setState( { cartData: UpdatedArray } )
        AsyncStorage.setItem( 'AddToCart', JSON.stringify( UpdatedArray ) )
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
    onIncrement = ( id, value, index2, item ) =>
    {

        console.log( "Before update: ", this.state.cartData[ index2 ] );

        const UpdatedArray = this.state.cartData.map( ( item, index ) =>
        {


            if ( item.ID === id && index == index2 )
            {
                let onIncrement = value + 1;
               
                console.log( "value", item.variation?._price )
                let data = {
                    ...item,
                    cartPrice: item.sPrice * onIncrement,
                    cartRegularPrice: item.regPrice * onIncrement,
                    cartQuentity:  onIncrement 
                }
                // EventRegister.emit( 'Add-to-cart' )
                //   this.setState({checkOutPrice:item.sPrice * onIncrement})
                return data;

            }
            else
            {
                return item
            }


        } );
        console.log( 'updatedAttya', UpdatedArray )
        this.setState( { cartData: UpdatedArray } )
        AsyncStorage.setItem( 'AddToCart', JSON.stringify( UpdatedArray ) )
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
    renderItem = ( item, index ) =>
    {

        return (
            <TouchableOpacity onPress={ () =>
            {
                this.props.navigation.navigate( 'ProductDetailScreen', {
                    data: item
                } )
            } } style={ styles.ItemView }>
                <View style={ { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', } }>
                    {
                        item?.img?.length > 0 ?
                            <Image
                                style={ styles.ImageStyle }
                                source={ { uri: item.img[ 0 ].img_path } } /> :
                            <Image
                                style={ styles.ImageStyle }
                                source={ require( '../../../assets/default.png' ) } />
                    }
                    <View style={ styles.middleContainer }>
                        <Text style={ styles.normalText }>{ item?.post_title?.slice( 0, 20 ) + ( item?.post_title?.length > 20 ? "..." : "" ) }</Text>
                        <Text style={ styles.smallText }>{ item.selectedVariation }</Text>
                        <View style={ styles.q_container }>
                            <TouchableOpacity
                                disabled={ item.cartQuentity <= 1 ? true : false }
                                style={ styles.btnStyle } onPress={ () =>
                                {
                                    this.onDecrement( item.ID, item.cartQuentity, index, item )
                                } }>
                                <Image
                                    style={ styles.iconStyle2 }
                                    source={ require( '../../../assets/minus.png' ) } />
                            </TouchableOpacity>
                            <View style={ styles.q_Container }>
                                <Text style={ styles.quentityText }>{ item.cartQuentity }</Text>
                            </View>
                            <TouchableOpacity style={ styles.btnStyle } onPress={ () =>
                            {
                                this.onIncrement( item.ID, item.cartQuentity, index, item );

                            } }>
                                <Image
                                    style={ [ styles.iconStyle2, { tintColor: Light_Green } ] }

                                    source={ require( '../../../assets/plus.png' ) } />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={ styles.endContainer }>
                    <TouchableOpacity style={ {
                        top: "10%",
                    } }
                        onPress={ () =>
                        {
                            this.removeItem( item.ID, index )
                        } }>
                        <Image
                            style={ [ styles.iconStyle2, { tintColor: Gray, } ] }
                            source={ require( '../../../assets/closed.png' ) } />
                    </TouchableOpacity>
                    <View style={ {
                        top: "30%", alignSelf: 'flex-end'
                    } }>
                        <Text style={ [ styles.smallText, { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } ] }>Rs. { item.regPrice }</Text>



                        <Text style={ [ styles.normalText ] }>Rs. { item.sPrice }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    onCheckOut = async () =>
    {
        AsyncStorage.getItem( 'UserData' )
            .then( ( res ) =>
            {
                if ( res != null )
                {
                    this.props.navigation.navigate( 'CheckOut', {
                        totalPrice: this.state.checkOutPrice,
                        checkoutData: this.state.cartData
                    } )
                }
                else
                {
                    this.setState( { loginModal: true } )
                }
            } )
            .catch( ( erorr ) => { } )

    }
    onLogin = () =>
    {
        this.setState( { loginModal: false } )
        setTimeout( () =>
        {
            this.props.navigation.dispatch(
                CommonActions.reset( {
                    index: 1,
                    routes: [
                        { name: 'LoginScreen' },
                    ],
                } )
            );
        }, 1000 )
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <Modal
                        isVisible={ this.state.loginModal }
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        transparent={ true }

                        style={ styles.modalStyle }
                        onRequestClose={ () =>
                        {
                            this.setState( { loginModal: false } )

                            // mooveRL();
                        } }>
                        <View style={ { flex: 1, padding: 15 } }>
                            {/* <TouchableOpacity onPress={ () =>
                            {
                                this.setState({loginModal:false})
                            } }>
                                <Image
                                    style={ { height: 18, width: 18, resizeMode: 'contain' } }
                                    source={ require( '../../../assets/closed.png' ) } />
                            </TouchableOpacity> */}

                            <View style={ { flex: 0.9, justifyContent: 'center', alignItems: "center", paddingTop: 15 } }>
                                <Image
                                    style={ { height: screen_height / 3.5, width: screen_height / 3.5, resizeMode: 'contain', alignSelf: 'center' } }
                                    source={ require( '../../../assets/emptyCart.png' ) } />

                                <Text style={ [ styles.titleText, { fontSize: 16, fontFamily: POPINS_REGULAR } ] }>Oops ! Please Login to Continue</Text>
                                <FilledButton
                                    onPress={ this.onLogin }
                                    style={ { width: screen_width / 1.5 } }
                                    title={ 'Click here to Login' } />

                            </View>

                        </View>



                    </Modal>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Cart' } />
                    <ProgressLoader
                        visible={ this.state.visible }
                        isModal={ true }
                        isHUD={ true }
                        hudColor={ White }
                        color={ Light_Green } />
                    {
                        this.state.cartData.length > 0 ?
                            <View style={ { height: screen_height / 1.2 - 30, } }>
                                <FlatList
                                    data={ this.state.cartData }
                                    scrollEnabled={ true }
                                    extraData={ this.state.cartData }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) => this.renderItem( item, index ) }
                                />
                                <TouchableOpacity
                                    onPress={ () => { this.onCheckOut() } }
                                    style={ styles.bottomView }>
                                    <Image
                                        style={ styles.iconStyle }
                                        source={ require( '../../../assets/basket.png' ) } />
                                    <Text style={ [ styles.normalText, { fontFamily: POPINS_REGULAR, fontSize: 16, color: White } ] }>Go to Checkout</Text>
                                    <Text style={ [ styles.normalText, { fontFamily: POPINS_REGULAR, fontSize: 14, color: White, backgroundColor: "#489E67" } ] }> Rs. { this.state.checkOutPrice } </Text>
                                </TouchableOpacity>

                            </View>
                            :
                            this.state.visible == false ?
                                <View style={ { justifyContent: 'center', alignItems: 'center', height: screen_height / 1.5 } }>
                                    <Image
                                        style={ styles.emptyCart }
                                        source={ require( '../../../assets/emptyCart.png' ) } />

                                    <Text style={ styles.titleText }>Oops</Text>
                                    <Text style={ [ styles.normalText, { fontSize: 18, fontFamily: POPINS_REGULAR, textAlign: 'center' } ] }>Your Cart is Empty</Text>
                                </View>
                                : null
                    }


                </SafeAreaView>

            </View>
        );
    }
}

export default Cart;