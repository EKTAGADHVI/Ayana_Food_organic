import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, createRef } from 'react';
import { SafeAreaView, View, FlatList, ScrollView, Image, Text, TouchableOpacity, Linking, TextInput, KeyboardAvoidingView } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { actions } from '../../Redux/actions';
import Apis from '../../RestApi/Apis';
import Modal from "react-native-modal";
import { Black, Gray, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';
import ProgressLoader from 'rn-progress-loader';
import {clear} from "react-native/Libraries/LogBox/Data/LogBoxData";
let removeString = "<p></p>";
const startImage = require( '../../../assets/star.png' )
class ProductDetailScreen extends Component
{
    flatList = createRef();


    constructor ( props )
    {
        super( props );
        this.props.productById( {
            'product_id': this.props.route.params?.data.ID
        } );
        this.state = {
            currentIndex: 0,
            quentity: 1,
            isDiscription: false,
            isTerm: false,
            id: this.props.route.params?.data?.ID,
            data: this.props.route.params?.data,
            variation: this.props.route.params?.data?.variation,
            // variation: [],
            description: this.props.route.params?.data?.post_content,
            price: this.props.route.params?.data?.variation[ 0 ]?._price,
            regprice: this.props.route.params?.data?.variation[ 0 ]?._regular_price,
            // price: 50,
            images: this.props.route.params?.data?.img,
            raingCount: this.props.route.params?.data?.rating[ 0 ].meta_value,
            checked: 0,
            postalCode: '',
            isFav: false,
            selectedVarinat: this.props.route.params?.data?.variation[ 0 ]?.attribute_pa_weight,
            cartSellPrice: this.props.route.params?.data?.variation[ 0 ]?._sale_price,
            cartRegularPrice: this.props.route.params?.data?.variation[ 0 ]?._regular_price,
            instock: this.props.route.params?.data?.variation[ 0 ]?._stock_status,
            regPrice: this.props.route.params?.data?.variation[ 0 ]?._regular_price,
            sPrice: this.props.route.params?.data?.variation[ 0 ]?._sale_price,
            selectedVarinatID: "variation_id" in this.props.route.params?.data?.variation[ 0 ] === true ? this.props.route.params?.data?.variation[ 0 ].variation_id : null,
            review: [],
            reviewModal: false,
            selectedRating: 0,
            comment: "",
            userData: [],
            visible: false,
            loginModal: false
        }

        this.viewabilityConfig = {
            viewAreaCoveragePercentThreshold: 50,
            waitForInteraction: true,
        };
        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind( this );
        console.log( 'this.props.route.params.data', this.props.route.params.data )

        this.getReview()
    }


    getProductDetail = () =>
    {
        this.setState( { visible: true } )
        Apis.getProductByCategoryId( {
            "product_id": this.state.id
        } )
            .then( ( res ) =>
            {
                return JSON.stringify( res )
            } )
            .then( ( response ) =>
            {

                if ( JSON.parse( response ).data.status == true )
                {
                    console.log( "Product Detail", response )
                    let data = JSON.parse( response )?.data?.data

                    data[ 0 ]?.rating.map( ( item, index ) =>
                    {
                        if ( item.meta_key == '_wc_average_rating' )
                        {
                            this.setState( {
                                raingCount: item.meta_value,
                            } )
                        }
                    } )
                    this.setState( {
                        // raingCount: data[ 0 ]?.rating[ 0 ]?.meta_value,
                        visible: false
                    } )
                    this.getReview()


                }
                else
                {
                    this.setState( { visible: false } )
                    // alert( "Product can not re order" );
                }

            } )
            .catch( ( error ) =>
            {
                this.setState( { visible: false } )
                // alert( "Product can not re order" );
                console.log( "error", error )
            } )



    }
    getReview = () =>
    {
        let request = {
            "product_id": this.state.id
        };
        Apis.getProductReviewCall( request )
            .then( ( res ) =>
            {
                return JSON.stringify( res )
            } )
            .then( ( response ) =>
            {
                if ( JSON.parse( response ).data.status == true )
                {
                    let data = JSON.parse( response ).data;
                    this.setState( {
                        // visible: false,
                        review: data?.data
                    } )



                }
                else
                {
                    this.setState( { visible: false } )


                }
            } )
            .catch( ( error ) =>
            {
                this.setState( { visible: false } )
                console.log( "Erorr", error )
            } )
    }
    async componentDidMount ()
    {
        console.log("datas==",  JSON.stringify(this.props.route.params?.data,'',4));
        let ratings = this.props.route.params?.data?.rating;
        ratings.map( ( item ) =>
        {
            if ( item.meta_key === '_wc_average_rating' )
            {
                this.setState( { raingCount: item.meta_value } )
            }
        } );
        AsyncStorage.getItem( 'PostalCode' )
            .then( ( res ) =>
            {
                console.log( "postal", JSON.parse( res ).code )
                if ( res !== null )
                {
                    this.setState( { postalCode: JSON.parse( res ).code } );
                }
                else
                {
                    this.setState( { postalCode: '' } );
                }
            } )
            .catch( ( err ) => { } )

        if ( this.state.description.includes( "<p>" ) )
        {
            this.setState( {
                description: this.state.description.replace( "<p>", "" )
            } )
        }
        await AsyncStorage.getItem( 'UserData' )
            .then( ( res ) =>
            {

                let dd = JSON.parse( res ).data;
                console.log( "UserRes", dd[ 0 ] )
                if ( res !== null )
                {
                    this.setState( { userData: JSON.parse( res ).data } )
                    this.profileAPICall( dd[ 0 ].ID )
                    // // this.props.profileCall( {
                    // //     "user_id":"122"
                    // // } )
                }
                else
                {
                    this.setState( { userData: [] } )
                }
            } ).catch( ( error ) => { } )
        this.state.data?.rating.map( ( item, index ) =>
        {
            if ( item.meta_key == '_wc_average_rating' )
            {
                this.setState( {
                    raingCount: item.meta_value,
                } )
            }
        } )
        setTimeout( () =>
        {

            if ( this.state.description.includes( "</p>" ) )
            {
                this.setState( {
                    description: this.state.description.replace( "</p>", " " )
                } )
            }
        }, 500 )
    }
    handleViewableItemsChanged ( info )
    {
        let getIndex = info.changed[ 0 ].index;
        // console.log("getIndex", getIndex)
        // console.log("this.flatList.current.index", this.flatList.current.index)
        this.setState( {
            currentIndex: getIndex,

        } );

    }
    addToCart = async ( item ) =>
    {
        console.log( "Ship item", item )

        try
        {
            let added = false;
            let previousData = null;
            let alreadyAdded = false;
            clear();
            await AsyncStorage.getItem( 'AddToCart' )
                .then( async ( res ) =>
                {
                    console.log( "DashBoard Cart", res )
                    let cart = JSON.parse( res );
                    previousData = JSON.parse( res );
                    if ( await res !== null && await cart.length > 0 )
                    {

                        // this.setState( { cartItem: cart.length } )
                        alreadyAdded = await cart.filter( async ( data ) =>
                        {

                            if ( await data.ID == await item.ID )
                            {
                                if ( await data.selectedVariation == await this.state.selectedVarinat )
                                {
                                    added = true;
                                    // this.setState( { quentity: data.cartQuentity + 1 } )

                                }
                                else
                                {
                                    added = false
                                }
                                return true;
                            }
                            else;
                            {
                                added = false;
                                return false;
                            }
                        } );
                    }
                    else
                    {
                        added = false;
                        alreadyAdded = false;
                    }
                } )
                .catch( ( error ) =>
                {
                    console.log( "Error", error )
                    // this.setState( { cartData: [] } )
                } )

            console.log( "Alreday Added", added )
            if ( await added === false )
            {
                let cartData = [];

                // previousData=[];
                let finalItem = {
                    ...item,
                    selectedVariation: this.state.selectedVarinat,
                    cartPrice: this.state.price * this.state.quentity,
                    cartRegularPrice: this.state.cartRegularPrice,
                    cartQuentity: this.state.quentity,
                    regPrice: this.state.regPrice,
                    sPrice: this.state.sPrice,
                    selectedVarinatID: this.state.selectedVarinatID
                };
                if ( await previousData != null && await previousData.length > 0 )
                {
                    previousData.push( finalItem );
                } else
                {
                    previousData = [];
                    previousData.push( finalItem );
                }

                await AsyncStorage.setItem( 'AddToCart', JSON.stringify( previousData ) )
                    .then( ( res ) =>
                    {
                        EventRegister.emit( 'Add-to-cart' )
                        EventRegister.emit('count')
                        setTimeout( () =>
                        {
                            this.props.navigation.navigate( 'Cart' );
                        }, 1000 )
                        console.log( "Sucessfully Added" );
                    } )
                    .catch( ( error ) =>
                    {
                        console.log( "error", error );
                    } )
            }
            else
            {
                // let finalItem ={
                //     ...item,
                //     selectedVariation:this.state.selectedVarinat,
                //     cartPrice:this.state.price * this.state.quentity + 1,
                //     cartRegularPrice:this.state.cartRegularPrice,
                //     cartQuentity:this.state.quentity,
                //     regPrice:this.state.regPrice,
                //     sPrice:this.state.sPrice
                // };
                // previousData.push(finalItem );
                let UpdatedData = previousData.filter( ( data ) =>
                {
                    if ( data.ID === item.ID )
                    {
                        if ( data.selectedVariation !== this.state.selectedVarinat )
                        {
                            // let finalItem ={
                            //     ...data,
                            //     selectedVariation:this.state.selectedVarinat,
                            //     cartPrice:this.state.price * this.state.quentity + 1,
                            //     cartRegularPrice:this.state.cartRegularPrice,
                            //     cartQuentity:this.state.quentity,
                            //     regPrice:this.state.regPrice,
                            //     sPrice:this.state.sPrice
                            // };
                            return data
                        }
                    }
                } );
                let oldData = previousData.filter( ( data ) =>
                {
                    if ( data.ID !== item.ID )
                    {

                        return data
                    }
                    else
                    {
                        if ( data.ID == item.ID )
                        {
                            if ( data.selectedVariation != this.state.selectedVarinat )
                            {
                                // let finalItem ={
                                //     ...data,
                                //     selectedVariation:this.state.selectedVarinat,
                                //     cartPrice:this.state.price * this.state.quentity + 1,
                                //     cartRegularPrice:this.state.cartRegularPrice,
                                //     cartQuentity:this.state.quentity,
                                //     regPrice:this.state.regPrice,
                                //     sPrice:this.state.sPrice
                                // };
                                return data

                            }

                        }
                    }

                } );
                console.log( "DAATTATATTATA", UpdatedData )
                this.setState( { quentity: this.state.quentity + 1 } )
                if ( oldData !== null )
                {
                    oldData.push( {

                        ...item,
                        selectedVariation: this.state.selectedVarinat,
                        cartPrice: this.state.price * this.state.quentity,
                        cartRegularPrice: this.state.cartRegularPrice,
                        cartQuentity: this.state.quentity,
                        regPrice: this.state.regPrice,
                        sPrice: this.state.sPrice,
                        selectedVarinatID: this.state.selectedVarinatID

                    } )
                }
                else
                {
                    oldData = []
                }
                await AsyncStorage.setItem( 'AddToCart', JSON.stringify( oldData ) )
                    .then( ( res ) =>
                    {

                        EventRegister.emit( 'Add-to-cart' )
                        EventRegister.emit('count')
                        this.props.navigation.navigate( 'Cart' );
                        console.log( "Sucessfully Added" );
                    } )
                    .catch( ( error ) =>
                    {
                        console.log( "error", error );
                    } )
                // alert( "Item Already added" )
            }
        }
        catch ( error )
        {

        }
    }
    removeItem = async ( id ) =>
    {
        await AsyncStorage.getItem( 'addToFav' )
            .then( ( res ) =>
            {
                console.log( 'Fav DATA', res )

                if ( res !== null )
                {
                    let data = JSON.parse( res )
                    let remove = data.filter( ( data ) =>
                    {
                        return data.ID !== id
                    } );
                    AsyncStorage.setItem( 'addToFav', JSON.stringify( remove ) )
                        .then( ( res ) =>
                        {
                            EventRegister.emit( 'Add-to-fav' )
                            EventRegister.emit('count')
                            this.setState( { isFav: false } )
                            // this.setState( { favData: remove } )
                        } )
                        .catch( ( error ) =>
                        {
                            console.log( "Error", error )

                        } )

                }
                else
                {
                    EventRegister.emit( 'Add-to-fav' )
                    EventRegister.emit('count')
                    // this.setState( {
                    //     favData: [],
                    //     // visible: false
                    // } )
                }
            } )
            .catch( ( error ) =>
            {
                console.log( "Error", error )
                this.setState( { favData: [] } )
            } )


    }

    addToFav = async ( item ) =>
    {
        let alreadyAdded = false;
        let added = false;
        let previousData = []
        try
        {
            await AsyncStorage.getItem( 'addToFav' )
                .then( async ( res ) =>
                {
                    console.log( "DashBoard Cart", res )
                    let cart = JSON.parse( res );
                    if ( await res !== null && await cart.length > 0 )
                    {
                        this.setState( { cartItem: cart.length } )
                        previousData = JSON.parse( res );
                        alreadyAdded = await cart.filter( ( data ) =>
                        {

                            console.log( "DHDHDH", data );
                            if ( data.ID === item.ID )
                            {
                                added = true;
                                return true;
                            }
                            else
                            {
                                added = false
                                return false;
                            }
                        } );
                    }
                    else
                    {

                    }
                } )
                .catch( ( error ) =>
                {
                    console.log( "Error", error )
                    this.setState( { cartData: [] } )
                } )
            if ( await added === false )
            {
                let cartData = [];
                previousData.push( item );
                await AsyncStorage.setItem( 'addToFav', JSON.stringify( previousData ) )
                    .then( ( res ) =>
                    {
                        this.setState( { isFav: true } )
                        console.log( "Sucessfully Added" );
                        EventRegister.emit( 'Add-to-fav' )
                        EventRegister.emit('count')
                    } )
                    .catch( ( error ) =>
                    {
                        this.setState( { isFav: false } )
                        console.log( "error", error );
                        EventRegister.emit( 'Add-to-fav' )
                        EventRegister.emit('count')
                    } )
            }
            else
            {
                this.setState( { isFav: true } )
                alert( "Item Already added" )
            }
        }
        catch ( error )
        {

        }
    }

    removeTags = ( str ) =>
    {

        if ( ( str === null ) || ( str === '' ) || ( str === undefined )  )
            return '';
        else
            str = str.toString();

        // Regular expression to identify HTML tags in
        // the input string. Replacing the identified
        // HTML tag with a null string.

        let newstr = str.replace( /(<([^>]+)>)/ig, '' );
        return newstr.replace( /^\s+|\s+$/gm, '' );
    }
    renderImages = ( item, index ) =>
    {
        return (
            <View style={ styles.ItemContainer }>
                <Image
                    style={ styles.ImagStyle }
                    source={ { uri: item.img_path } }
                // source={item.url}
                />


            </View>
        );

    }


    // onTextLayout = (e) => {
    //     let {x, y, width, height} = e.nativeEvent.layout;
    //     height = Math.floor(height) + 40;
    //     if(height > startingHeight ){
    //         setFullHeight(height);
    //         setExpander(true);
    //     }
    // };

    onSendReview = () =>
    {

        if ( this.state.userData.length > 0 && this.state.userData !== null )
        {

            this.setState( { visible: true } )
            let request = {
                "product_id": this.state.id,
                "review": this.state.comment,
                "reviewer": this.state.userData[ 0 ]?.display_name,
                "reviewer_email": this.state.userData[ 0 ]?.user_email,
                "rating": this.state.selectedRating
            }
            console.log( "Requesty", request );
            Apis.createProductReviewCall( request )
                .then( ( res ) =>
                {
                    return JSON.stringify( res )
                } )
                .then( ( response ) =>
                {
                    console.log( "Review Response", response )
                    if ( JSON.parse( response ).data.status == true )
                    {
                        this.setState( { visible: false } )
                        this.setState( { reviewModal: false } )
                        this.getProductDetail();

                    }
                    else
                    {
                        this.setState( { visible: false } )
                        this.setState( { reviewModal: false } )
                    }
                } )
                .catch( ( err ) =>
                {
                    this.setState( { visible: false } )
                    this.setState( { reviewModal: false } )
                    console.log( "Error", err );
                } )
        }
        else
        {
            this.setState( { reviewModal: false } )
            this.setState( { visible: false } )
            this.setState( { loginModal: true } )
        }


    }
    render ()
    {
        let reviewButton = false;
        let rate = false;
        let remain = this.state.comment.length;

        if ( this.state.selectedRating > 0 )
        {
            rate = true
        }
        else
        {
            rate = false
        }
        if ( remain > 0 && remain <= 300 )
        {
            reviewButton = true;
        }
        if ( this.state.comment !== null && this.state.comment !== "" )
        {
            reviewButton = true;
        }
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
        return (
            <View style={ { backgroundColor: White, } }>
                <SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={ false }>

                        <ProgressLoader
                            visible={ this.state.visible }
                            isModal={ true }
                            isHUD={ true }
                            hudColor={ White }
                            color={ Light_Green } />
                        <View style={ { backgroundColor: White } }>
                            <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } }
                                style={ { backgroundColor: Gray } }
                                title={ "Product Detail" }
                                rightMenuIcon={ require( '../../../assets/search.png' ) }
                            />
                            <View style={ styles.ImageContainer }>

                                { this.state.images.length > 0 ?
                                    <FlatList
                                        data={ this.state.images }
                                        // contentContainerStyle={ { width: screen_width ,justifyContent:'center'} }
                                        horizontal={ true }
                                        pagingEnabled={ true }
                                        legacyImplementation={ false }
                                        onScroll={ () =>
                                        {
                                            // this.VideoPlayer.stop()
                                        } }
                                        showsHorizontalScrollIndicator={ false }
                                        showsVerticalScrollIndicator={ false }
                                        onViewableItemsChanged={ this.handleViewableItemsChanged }
                                        viewabilityConfig={ this.viewabilityConfig }
                                        keyExtractor={ ( item, index ) => index.toString() }
                                        renderItem={ ( { item, index } ) => this.renderImages( item, index ) }
                                        // renderItem={({ item }) => this._renderItem.bind(this)}
                                        ref={ this.flatList }
                                    //  ref={(list) => this.myFlatList = list}
                                    //   ref={(node) => (flatRef = node)}
                                    />
                                    : <View style={ styles.ItemContainer }>
                                        <Image
                                            style={ styles.ImagStyle }
                                            source={ require( '../../../assets/default.png' ) }
                                        // source={item.url}
                                        />


                                    </View>
                                }
                                <View style={ [ styles.paginationWrapper, {
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 0,
                                    paddingVertical: 5
                                } ] }>
                                    { Array.from( Array( this.state.data.images ? this.state.data.images.length : 0 ).keys() ).map( ( key, index ) => (
                                        <View
                                            style={ [ styles.paginationDots, { opacity: this.state.currentIndex === index ? 1 : 0.3, width: this.state.currentIndex === index ? 20 : 10 } ] }
                                            key={ index } />
                                    ) ) }
                                </View>
                                <View style={ styles.bottomContainer }>
                                    <Text style={ styles.titleText }>{ this.state.data.post_title }</Text>
                                    { this.state.isFav === false ?
                                        <TouchableOpacity onPress={ () =>
                                        {
                                            this.addToFav( this.state.data )
                                        } }>
                                            <Image
                                                style={ styles.iconStyle }
                                                source={ require( '../../../assets/fav.png' ) } />
                                        </TouchableOpacity> :
                                        <TouchableOpacity
                                            onPress={ () =>
                                            {
                                                this.removeItem( this.state.data.ID )
                                            } }>
                                            <Image
                                                style={ styles.iconStyle }
                                                source={ require( '../../../assets/fill_fav.png' ) } />
                                        </TouchableOpacity>
                                    }
                                </View>

                            </View>
                            <View style={ [ { backgroundColor: White } ] }>
                                <View style={ styles.priceContainer }>
                                    <View style={ { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, } }>
                                        <TouchableOpacity style={ styles.btnStyle } onPress={ () =>
                                        {
                                            if ( this.state.quentity > 1 )
                                            {
                                                this.setState( {
                                                    quentity: this.state.quentity - 1
                                                } )
                                            }
                                        } }>
                                            <Image
                                                style={ styles.iconStyle2 }
                                                source={ require( '../../../assets/minus.png' ) } />
                                        </TouchableOpacity>
                                        <View style={ styles.q_Container }>
                                            <Text style={ styles.quentityText }>{ this.state.quentity }</Text>
                                        </View>
                                        <TouchableOpacity style={ styles.btnStyle } onPress={ () =>
                                        {
                                            if ( this.state.quentity <= 24 )
                                            {
                                                this.setState( {
                                                    quentity: this.state.quentity + 1,

                                                } )
                                            }


                                        } }>
                                            <Image
                                                style={ [ styles.iconStyle2, { tintColor: Light_Green } ] }

                                                source={ require( '../../../assets/plus.png' ) } />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={ { padding: 8 } }>
                                        <View style={ { flexDirection: 'row', alignItems: "center" } }>
                                            <Text style={ [ styles.quentityText, { textAlign: 'right', paddingVertical: 2.5, color: Text_Gray, fontFamily: POPINS_REGULAR, textDecorationLine: 'line-through', fontSize: 12 } ] }>Rs. { this.state.regPrice * this.state.quentity }.00</Text>
                                            <Text style={ [ styles.quentityText, { textAlign: 'right', fontSize: 16, paddingHorizontal: 5 } ] }>Rs. { this.state.price * this.state.quentity }.00</Text>
                                        </View>
                                        <Text style={ [ styles.quentityText, { color: Light_Green, textAlign: 'right' } ] }>Avaibility : <Text style={ [ styles.quentityText, {
                                            color:
                                                Black, fontFamily: POPINS_REGULAR,
                                        } ] }> { this.state.instock }</Text></Text>
                                    </View>

                                </View>
                                <View style={ [ styles.container, { marginHorizontal: 15, padding: 8 } ] } >
                                    <Text style={ [ styles.quentityText ] }>Weight</Text>
                                    <View style={ { flexDirection: 'row', marginVertical: 5 } }>
                                    </View>
                                    <View style={ { flexDirection: 'row' } }>

                                        {
                                            // console.log("this.state.variation",this.state.variation)
                                            this.state.variation.filter( ( data ) =>
                                            {
                                                return data.attribute_pa_weight !== null ? data.attribute_pa_weight : null
                                            } ).map( ( item, index ) =>
                                            {
                                                let active = true;
                                                return (
                                                    <View key={ index }>
                                                        {this.state.checked === index ?
                                                            <TouchableOpacity
                                                                onPress={ () =>
                                                                {
                                                                    this.setState( {
                                                                        price: item._price,

                                                                        selectedVarinat: item.attribute_pa_weight,
                                                                        cartSellPrice: item._sale_price,
                                                                        cartRegularPrice: item._regular_price,
                                                                        instock: item._stock_status,
                                                                        regPrice: item._regular_price,
                                                                        sPrice: item._sale_price,
                                                                        selectedVarinatID: "variation_id" in item === true ? item.variation_id : null
                                                                    } )
                                                                } }
                                                                style={ [ styles.attributesView, { backgroundColor: "#E5F3EA" } ] }>
                                                                <Image style={ { height: 10, width: 10, resizeMode: 'contain', alignSelf: 'center' } } source={ require( "../../../assets/selected.png" ) } />
                                                                <Text style={ [ styles.smallText, { color: Black, fontSize: 9, paddingHorizontal: 3, paddingVertical: 3, textAlign: 'center' } ] }>{ item.attribute_pa_weight }</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            <TouchableOpacity
                                                                onPress={ () =>
                                                                {
                                                                    this.setState( {
                                                                        checked: index,
                                                                        price: item._price,

                                                                        selectedVarinat: item.attribute_pa_weight,
                                                                        cartSellPrice: item._sale_price,
                                                                        cartRegularPrice: item._regular_price,
                                                                        instock: item._stock_status,
                                                                        regPrice: item._regular_price,
                                                                        sPrice: item._sale_price,
                                                                        selectedVarinatID: "variation_id" in item === true ? item.variation_id : null
                                                                    } )
                                                                } }
                                                                style={ [ styles.attributesView, { backgroundColor: White } ] }>
                                                                <Image style={ { height: 10, width: 10, resizeMode: 'contain', alignSelf: 'center' } } source={ require( "../../../assets/unselected.png" ) } />
                                                                <Text style={ [ styles.smallText, { color: Black, fontSize: 9, paddingHorizontal: 3, paddingVertical: 3, textAlign: 'center' } ] }>{ item.attribute_pa_weight }</Text>
                                                            </TouchableOpacity> }
                                                    </View>
                                                )
                                            } )

                                        }
                                    </View>
                                </View>
                                <View style={ [ styles.container, {
                                    marginHorizontal: 10,
                                } ] }>

                                    <View style={ styles.rowView }>
                                        <Text style={ [ styles.quentityText, { paddingHorizontal: 8 } ] }>Description</Text>
                                        {
                                            this.state.isDiscription === true ?
                                                <TouchableOpacity onPress={ () =>
                                                {
                                                    this.setState( { isDiscription: !this.state.isDiscription } )
                                                } }>
                                                    <Image style={ styles.iconStyle2 } source={ require( '../../../assets/down.png' ) } />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity onPress={ () =>
                                                {
                                                    this.setState( { isDiscription: !this.state.isDiscription } )
                                                } }>
                                                    <Image style={ styles.iconStyle2 } source={ require( '../../../assets/right.png' ) } />
                                                </TouchableOpacity>
                                        }



                                    </View>

                                    {
                                        this.state.isDiscription === true ?
                                            <View style={ { marginVertical: 10 } }>
                                                <Text style={ styles.smallText }>{ this.removeTags( this.state.description ) }</Text>
                                            </View>
                                            : null
                                    }
                                </View>
                                <View style={ [ styles.container, { marginHorizontal: 15, } ] }>
                                    <Text style={ [ styles.quentityText, { paddingHorizontal: 8, paddingVertical: 10 } ] }>Pin Code : <Text style={ styles.smallText }> { this.state.postalCode }</Text></Text>
                                </View>

                                <View style={ [ styles.container, { marginHorizontal: 15, } ] }>

                                    <View style={ styles.rowView }>
                                        <Text style={ [ styles.quentityText, { paddingHorizontal: 3 } ] }>More Offers</Text>
                                        <TouchableOpacity onPress={ () =>
                                        {

                                        } }>{
                                                this.state.isTerm === true ? <Image style={ styles.iconStyle2 } source={ require( '../../../assets/down.png' ) } />
                                                    : <Image style={ styles.iconStyle2 } source={ require( '../../../assets/right.png' ) } />
                                            }

                                        </TouchableOpacity>


                                    </View>

                                </View>
                                <View style={ [ styles.container, { paddingHorizontal: 8, paddingVertical: 10, marginHorizontal: 16 } ] }>
                                    <View style={ [ styles.container, {
                                        flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,
                                    } ] }>
                                        <View>
                                            <Text style={ [ styles.quentityText, { marginVertical: 3, } ] }>Review</Text>
                                            <Rating
                                                type='star'
                                                ratingImage={ startImage }
                                                ratingColor='#3498db'
                                                ratingBackgroundColor='#c8c7c8'
                                                ratingCount={ 5 }
                                                imageSize={ 15 }
                                                readonly={ true }
                                                startingValue={ this.state.raingCount }

                                                style={ { backgroundColor: Gray } }
                                            />
                                        </View>
                                        <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                                            <TouchableOpacity onPress={ () =>
                                            {
                                                if ( this.state.userData.length > 0 && this.state.userData !== null )
                                                {
                                                    this.setState( { reviewModal: true } )
                                                }
                                                else
                                                {
                                                    this.setState( { loginModal: true } )
                                                }
                                            } }
                                                style={ { justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.8, borderRightColor: Text_Gray, } }>

                                                <Image
                                                    style={ [ styles.iconStyle2, {
                                                        tintColor: Light_Green, height: 25, right: "70%",
                                                        width: 25, alignSelf: "center"
                                                    } ] }
                                                    source={ require( '../../../assets/reviewEdit.png' ) }
                                                />
                                                {/* <Text  style={ [styles.smallText,{color:Light_Green,fontSize:10}] }>Add Review</Text> */ }
                                            </TouchableOpacity>
                                            <View >
                                                <Text style={ [ styles.quentityText, { textAlign: 'center' } ] }>{ this.state.raingCount } </Text>
                                                <Text style={ [ styles.smallText, { paddingVertical: 3, } ] }>Over all</Text>
                                            </View>
                                        </View>
                                    </View>

                                    { this.state.review.map( ( item, index ) =>
                                    {
                                        return (
                                            <View key={ index } style={ { alignItems: 'flex-start', marginVertical: 5, paddingVertical: 5, paddingHorizontal: 8, flexDirection: 'row', } }>
                                                <Image
                                                    source={ require( '../../../assets/profile.png' ) }
                                                    style={ { height: 25, width: 25, resizeMode: "contain", } } />
                                                <View style={ { left: 5, alignItems: 'flex-start' } }>

                                                    <Text style={ [ styles.quentityText, { textAlign: 'center', left: 5, fontFamily: POPINS_REGULAR } ] }>{ item.comment_author }</Text>

                                                    <Rating
                                                        type='star'
                                                        ratingImage={ startImage }
                                                        ratingColor='#3498db'
                                                        ratingBackgroundColor='#fff'
                                                        ratingCount={ 5 }
                                                        imageSize={ 13 }
                                                        readonly={ true }
                                                        // isDisabled={ true }
                                                        startingValue={ item.rating }
                                                        // onFinishRating={ this.ratingCompleted }
                                                        style={ { backgroundColor: White, paddingHorizontal: 5 } }
                                                    />


                                                    <Text style={ [ styles.smallText, { paddingHorizontal: 5, paddingVertical: 5 } ] }>{ item.comment_content }</Text>
                                                </View>

                                            </View>
                                        );
                                    } ) }

                                </View>
                                <View style={ [ styles.container, { marginHorizontal: 15, } ] }>

                                    <View style={ styles.rowView }>
                                        <Text style={ [ styles.quentityText, , { paddingHorizontal: 6 } ] }>Term & Condition</Text>
                                        <TouchableOpacity onPress={ () => {
                                            this.setState( { isTerm: !this.state.isTerm } )}}>
                                            {
                                                this.state.isTerm === true ? <Image style={ styles.iconStyle2 } source={ require( '../../../assets/down.png' ) } />
                                                    : <Image style={ styles.iconStyle2 } source={ require( '../../../assets/right.png' ) } />
                                            }

                                        </TouchableOpacity>


                                    </View>
                                    {
                                       ( this.state.isTerm === true && this.props?.product?.data?.[0]?.seller_terms?.refund_policy) ?
                                            <View style={ { padding: 10 } }>
                                                <Text>{ this.removeTags( this.props?.product?.data?.[0]?.seller_terms?.refund_policy ?? "") }</Text>
                                            </View> : null
                                    }


                                </View>
                                <View style={ [ styles.container, { marginHorizontal: 15, } ] }>

                                    <View style={ styles.rowView }>
                                        <Text style={ [ styles.quentityText, { paddingHorizontal: 8 } ] }>FAQ</Text>
                                        <TouchableOpacity onPress={ () =>
                                        {
                                            this.props.navigation.navigate( 'FAQScreen' );
                                        } }>

                                            <Image style={ styles.iconStyle2 } source={ require( '../../../assets/right.png' ) } />


                                        </TouchableOpacity>


                                    </View>


                                </View>
                                <View style={ [ styles.rowView, { justifyContent: 'space-evenly', } ] }>
                                    <FilledButton
                                        style={ { width: screen_width / 2 - 30 } }
                                        onPress={ () => { this.addToCart( this.state.data ) } }
                                        title={ "Add to Cart " } />
                                    <FilledButton
                                        style={ { width: screen_width / 2 - 30 } }
                                        onPress={ () =>
                                        {
                                            try
                                            {
                                                Linking.openURL( 'whatsapp://send?text=Hello Ayana Food Organic , I am interest' + this.state.data.post_name + 'and want to buy this product https://ayanafoodorganic.com/product/' + this.state.data.post_name + '/ Please Send me Details.&phone=+917388600191' )
                                            }
                                            catch ( error )
                                            {
                                                alert( "Failed to Open WhatsApp" )
                                            }
                                        } }
                                        title={ "WhatsApp " } />
                                </View>
                            </View>
                        </View>
                        <Modal
                            // avoidKeyboard={true}
                            isVisible={ this.state.reviewModal }
                            animationIn="slideInUp"
                            animationOut="slideOutDown"
                            transparent={ true }

                            // style={ styles.modalStyle }
                            onRequestClose={ () =>
                            {
                                this.setState( { reviewModal: false } )


                                // mooveRL();
                            } }
                        >
                            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={ keyboardVerticalOffset }>
                                <View style={ styles.modalStyle }>

                                    <ProgressLoader
                                        visible={ this.state.visible }
                                        isModal={ true }
                                        isHUD={ true }
                                        hudColor={ White }
                                        color={ Light_Green } />
                                    <TouchableOpacity onPress={ () =>
                                    {
                                        this.setState( { reviewModal: false } )
                                    } }>
                                        <Image
                                            style={ { height: 15, width: 15, resizeMode: 'contain', alignSelf: "flex-end" } }
                                            source={ require( '../../../assets/closed.png' ) } />
                                    </TouchableOpacity>

                                    <View style={ { alignItems: "flex-start", } }>
                                        <Text style={ [ styles.titleText, { paddingVertical: 8 } ] }>Feedback</Text>
                                        <View style={ { flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', } }>
                                            <Rating
                                                type='star'
                                                ratingImage={ startImage }
                                                ratingColor='#3498db'
                                                ratingBackgroundColor='#fff'
                                                ratingCount={ 5 }
                                                imageSize={ 25 }
                                                // isDisabled={ true }
                                                startingValue={ this.state.selectedRating }
                                                onFinishRating={ ( rate ) =>
                                                {
                                                    this.setState( { selectedRating: rate } )
                                                } }
                                                style={ { backgroundColor: White, alignSelf: 'flex-start' } }
                                            />
                                            <View style={ { justifyContent: "flex-end", flex: 1, alignItems: 'center' } }>
                                                <Text style={ [ styles.quentityText, { textAlign: 'right' } ] }>{ this.state.selectedRating } </Text>
                                                {/* <Text style={ [ styles.smallText, { paddingVertical: 3, textAlign: 'right' } ] }>Over all</Text> */ }
                                            </View>
                                        </View>

                                        <TextInput
                                            value={ this.state.comment }
                                            style={ [ styles.input, { height: screen_height / 6, width: "99%" } ] }
                                            multiline={ true }
                                            maxLength={ 300 }
                                            placeholder="Comment or Message"
                                            onChangeText={ ( text ) =>
                                            {
                                                this.setState( { comment: text } )
                                            } }
                                            placeholderTextColor={ Text_Gray } />


                                        <View style={ { flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: screen_width * 0.8 } }>
                                            <FilledButton title="Submit"
                                                disabled={ reviewButton == true && rate === true ? false : true }
                                                style={ { width: screen_width / 2.5, borderRadious: 20, marginVertical: "4%", opacity: reviewButton == true && rate === true ? 1 : 0.5 } }
                                                textStyle={ { fontSize: 14, paddingVertical: 8 } }
                                                onPress={ () =>
                                                {
                                                    this.onSendReview()
                                                } } />
                                            <Text style={ [ styles.smallText, { paddingVertical: 3, textAlign: 'right' } ] }>{ remain }/300</Text>


                                        </View>

                                    </View>

                                </View>
                            </KeyboardAvoidingView>
                        </Modal>
                        <Modal
                            isVisible={ this.state.loginModal }
                            animationIn="slideInUp"
                            animationOut="slideOutDown"
                            transparent={ true }

                            // style={ styles.modalStyle }
                            onRequestClose={ () =>
                            {
                                this.setState( { loginModal: false } )


                                // mooveRL();
                            } }
                        >
                            <View style={ styles.modalStyle }>
                                <TouchableOpacity onPress={ () =>
                                {
                                    this.setState( { loginModal: false } )
                                } }>
                                    <Image
                                        style={ { height: 18, width: 18, resizeMode: 'contain', alignSelf: "flex-end" } }
                                        source={ require( '../../../assets/closed.png' ) } />
                                </TouchableOpacity>

                                <View style={ { alignItems: "center", paddingTop: 15 } }>
                                    <Image
                                        style={ { height: screen_height / 3.5, width: screen_height / 3.5, resizeMode: 'contain', alignSelf: 'center' } }
                                        source={ require( '../../../assets/emptyCart.png' ) } />

                                    <Text style={ [ styles.titleText, { fontSize: 16, fontFamily: POPINS_REGULAR, textAlign: 'center' } ] }>Oops ! Please Login to Continue</Text>
                                    <FilledButton
                                        onPress={ this.onLogin }
                                        style={ { width: screen_width / 1.5 } }
                                        title={ 'Click here to Login' } />

                                </View>

                            </View>

                        </Modal>

                    </ScrollView>
                </SafeAreaView>


            </View>

        )
    }
}
function mapStateToProps ( state, ownProps )
{
    console.log( "state.getProductByIdReducer.data", state.getProductByIdReducer.data )
    return {
        // data : state.loginReducer.data
        // products: state.productListReducer.data,
        // getProductsListByCatId: state.getProductByCatIdReducer.data,
        // filteredProduct:state.productFilterReducer.data,
        product: state.getProductByIdReducer.data

    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productById: ( request ) => dispatch( actions.getProductByIdAction( request ) ),

        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( ProductDetailScreen );
