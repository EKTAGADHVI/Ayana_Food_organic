import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, createRef } from 'react';
import { SafeAreaView, View, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { ScrollView } from 'react-native-gesture-handler';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { actions } from '../../Redux/actions';
import { Black, Gray, Light_Green, White } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import styles from './styles';
let removeString = "<p></p>";
const startImage = require('../../../assets/star.png')
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
            // id:this.props.route.params?.data?.ID,
            data: this.props.route.params?.data,
            // variation: this.props.route.params?.data?.variation,
            variation: [],
            description: this.props.route.params?.data?.post_content,
            // price: this.props.route.params?.data?.variation[ 0 ]?._price,
            price: 50,
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
            sPrice: this.props.route.params?.data?.variation[ 0 ]?._sale_price
        }

        this.viewabilityConfig = {
            viewAreaCoveragePercentThreshold: 50,
            waitForInteraction: true,
        };
        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind( this );
        console.log( 'this.props.route.params.data', this.props.route.params.data )
    }
    componentDidMount ()
    {
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
        let added = false;
        let previousData = null;
        let alreadyAdded = false;
        try
        {
            await AsyncStorage.getItem( 'AddToCart' )
                .then( ( res ) =>
                {
                    console.log( "DashBoard Cart", res )
                    let cart = JSON.parse( res );
                    previousData = JSON.parse( res );
                    if ( res !== null && cart.length > 0 )
                    {
                        // this.setState( { cartItem: cart.length } )
                        alreadyAdded = cart.filter( ( data ) =>
                        {

                            console.log( "DHDHDH", data );
                            if ( data.ID === item.ID )
                            {
                                if ( data.selectedVariation === this.state.selectedVarinat )
                                {
                                    added = true;
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
            if ( added === false )
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
                    sPrice: this.state.sPrice
                };
                if(previousData != null){
                    previousData.push( finalItem );
                }else{
                    previousData=[];
                    previousData.push( finalItem );
                }
               
                await AsyncStorage.setItem( 'AddToCart', JSON.stringify( previousData ) )
                    .then( ( res ) =>
                    {
                        EventRegister.emit( 'Add-to-cart' )

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
                console.log( "DAATTATATTATA", UpdatedData )
                this.setState( { quentity: this.state.quentity + 1 } )
              if (oldData !== null){
                oldData.push( {

                    ...item,
                    selectedVariation: this.state.selectedVarinat,
                    cartPrice: this.state.price * this.state.quentity,
                    cartRegularPrice: this.state.cartRegularPrice,
                    cartQuentity: this.state.quentity,
                    regPrice: this.state.regPrice,
                    sPrice: this.state.sPrice

                } )
              }
              else{
                  oldData =[]
              }
                await AsyncStorage.setItem( 'AddToCart', JSON.stringify( oldData ) )
                    .then( ( res ) =>
                    {

                        EventRegister.emit( 'Add-to-cart' )
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
        try
        {
            await AsyncStorage.getItem( 'addToFav' )
                .then( ( res ) =>
                {
                    console.log( "DashBoard Cart", res )
                    let cart = JSON.parse( res );
                    if ( res !== null && cart.length > 0 )
                    {
                        this.setState( { cartItem: cart.length } )
                        alreadyAdded = cart.filter( ( data ) =>
                        {

                            console.log( "DHDHDH", data );
                            if ( data.ID === item.ID )
                            {
                                return true;
                            }
                            else
                            {
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
            if ( alreadyAdded === false )
            {
                let cartData = [];
                cartData.push( item );
                await AsyncStorage.setItem( 'addToFav', JSON.stringify( cartData ) )
                    .then( ( res ) =>
                    {
                        this.setState( { isFav: true } )
                        console.log( "Sucessfully Added" );
                    } )
                    .catch( ( error ) =>
                    {
                        this.setState( { isFav: false } )
                        console.log( "error", error );
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

        if ( ( str === null ) || ( str === '' ) )
            return '';
        else
            str = str.toString();

        // Regular expression to identify HTML tags in 
        // the input string. Replacing the identified 
        // HTML tag with a null string.
        return str.replace( /(<([^>]+)>)/ig, '' );
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
    render ()
    {
        return (
            <View style={{backgroundColor:White}}>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={ { backgroundColor: White } }>
                        <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } }
                            style={ { backgroundColor: Gray } }
                            title={ "Product Detail" }
                            rightMenuIcon={ require( '../../../assets/search.png' ) }
                        />
                        <View style={ styles.ImageContainer }>

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
                                        this.setState( {
                                            quentity: this.state.quentity - 1
                                        } )
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
                                        this.setState( {
                                            quentity: this.state.quentity + 1,

                                        } )

                                    } }>
                                        <Image
                                            style={ [ styles.iconStyle2, { tintColor: Light_Green } ] }

                                            source={ require( '../../../assets/plus.png' ) } />
                                    </TouchableOpacity>
                                </View>

                                <View style={ { padding: 8 } }>
                                    <Text style={ [ styles.quentityText, { textAlign: 'right', fontSize: 16, paddingHorizontal: 5 } ] }>Rs. { this.state.price * this.state.quentity }.00</Text>
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
                                        this.state.variation.map( ( item, index ) =>
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
                                                                    sPrice: item._sale_price
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
                                                                    sPrice: item._sale_price
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
                                    <Text style={ [ styles.quentityText ] }>Description</Text>
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
                                    <Text style={ [ styles.quentityText ] }>More Offers</Text>
                                    <TouchableOpacity onPress={ () =>
                                    {

                                    } }>{
                                            this.state.isTerm === true ? <Image style={ styles.iconStyle2 } source={ require( '../../../assets/down.png' ) } />
                                                : <Image style={ styles.iconStyle2 } source={ require( '../../../assets/right.png' ) } />
                                        }

                                    </TouchableOpacity>


                                </View>

                            </View>
                            <View style={ [ styles.container, { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingVertical: 10, marginHorizontal: 16 } ] }>
                                <View>
                                    <Text style={ [ styles.quentityText, { marginVertical: 3, } ] }>Review</Text>
                                    <Rating
                                        type='star'
                                        ratingImage={ startImage }
                                        ratingColor='#3498db'
                                        ratingBackgroundColor='#c8c7c8'
                                        ratingCount={ 5 }
                                        imageSize={ 15 }
                                        startingValue={ this.state.raingCount }
                                        onFinishRating={ this.ratingCompleted }
                                        style={ { backgroundColor: Gray } }
                                    />
                                </View>
                                <View >
                                    <Text style={ [ styles.quentityText, { textAlign: 'center' } ] }>{ this.state.raingCount } </Text>
                                    <Text style={ [ styles.smallText, { paddingVertical: 3, } ] }>Over all</Text>
                                </View>
                            </View>
                            <View style={ [ styles.container, { marginHorizontal: 15, } ] }>

                                <View style={ styles.rowView }>
                                    <Text style={ [ styles.quentityText ] }>Term & Condition</Text>
                                    <TouchableOpacity onPress={ () =>
                                    {
                                        this.setState( { isTerm: !this.state.isTerm } )
                                    } }>{
                                            this.state.isTerm === true ? <Image style={ styles.iconStyle2 } source={ require( '../../../assets/down.png' ) } />
                                                : <Image style={ styles.iconStyle2 } source={ require( '../../../assets/right.png' ) } />
                                        }

                                    </TouchableOpacity>


                                </View>
                                {
                                    this.state.isTerm === true ?
                                        <View style={ { padding: 10 } }>
                                            <Text>{ this.removeTags( this.props.product.data[ 0 ].seller_terms.refund_policy ) }</Text>
                                        </View> : null
                                }


                            </View>
                            <View style={ [ styles.container, { marginHorizontal: 15, } ] }>

                                <View style={ styles.rowView }>
                                    <Text style={ [ styles.quentityText ] }>Ask For Question</Text>
                                    <TouchableOpacity onPress={ () =>
                                    {
                                        this.props.navigation.navigate( 'HelpScreen' );
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
