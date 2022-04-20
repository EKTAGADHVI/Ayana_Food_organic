import React, { Component, createRef } from 'react';
import
{
    View,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Linking,
    Alert,
    Text, SafeAreaView, Pressable, ImageBackground
} from 'react-native';
import { color } from 'react-native-reanimated';
import VideoPlayer from 'react-native-video-player';
import { connect } from 'react-redux';
import Header from '../../Components/Header';
import ProductView from '../../Components/ProductView';
import SearchBox from '../../Components/SearchBox';
import { actions } from '../../Redux/actions';
import Toast from 'react-native-toast-message';
import { Black, Light_Green, ORENGE, Red, Text_Gray, White } from '../../Utils/colors';
import { initialState, screen_height, screen_width } from '../../Utils/constant';
import { POPINS_BOLD, POPINS_REGULAR, POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { EventRegister } from 'react-native-event-listeners';
import { PRODUCT_BY_KEYWORD_SUCESS } from '../../Redux/actionTypes';
let CurrentSlide = 0;
let IntervalTime = 4000;

class Dashboard extends Component
{
    flatList = createRef();
    videoFlatList = createRef();
    constructor ( props )
    {
        super( props );
    
        this.props.getCategoeryList()


        this.state = {
            searchValue: ''
        },

            this.state = {
                currentVideoIndex: 0,
                currentIndex: 0,
                isFeatured: true,
                onSale: false,
                topRate: false,
                productList: [],
                homeData: [],
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
                categoeries: [
                    {
                        "id": 0,
                        "name": "Grocery"
                    },
                    {
                        "id": 1,
                        "name": "Grocery"
                    },
                    {
                        "id": 2,
                        "name": "Grocery"
                    },
                    {
                        "id": 3,
                        "name": "Grocery"
                    },

                ],
                categoeryList: [],
                specialOffers: [],
                visible: false,
                cartItem: 0,
                cartViewVisible: false,
                modalVisible: false,
                keyword:''

            }
        this.viewabilityConfig = {
            viewAreaCoveragePercentThreshold: 50,
            waitForInteraction: true,
        };
        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind( this );

        ;
    } handleViewableItemsChanged ( info )
    {
        let getIndex = info.changed[ 0 ].index;
        // console.log("getIndex", getIndex)
        // console.log("this.flatList.current.index", this.flatList.current.index)
        this.setState( {
            currentIndex: getIndex,
            currentVideoIndex: getIndex
        } );

    }
    // TODO _goToNextPage()
    _goToNextPage = () =>
    {

        if ( this.state.link === undefined ) CurrentSlide = 0
        else if ( CurrentSlide > this.state.link.length - 1 ) CurrentSlide = 0;

        const finalIdx = CurrentSlide >= 3 - 1 ? CurrentSlide = 0 : ++CurrentSlide
        if ( this.flatList.current !== null )
        {
            this.flatList.current.scrollToIndex( {
                index: finalIdx,
                animated: true,
            } );
            this.setState( { currentIndex: finalIdx }, )


        }

        // CurrentSlide = CurrentSlide >= this.state.link.length-1 ? 0 : ++CurrentSlide
        // this.flatList.current.scrollToIndex({
        //     index: CurrentSlide,
        //     animated: true,
        // });
        // this.setState({
        //     currentIndex: CurrentSlide
        // })
        // if (CurrentSlide >= this.state.link.length - 1) CurrentSlide = 0;
    };

    _startAutoPlay = () =>
    {
        this._timerId = setInterval( this._goToNextPage, IntervalTime );
    };

    filterMainCategory = () =>
    {

    }

    discountInPercentage = ( data ) =>
    {

        let discountPrice = data._regular_price - data._sale_price;
        let price = ( discountPrice / data._regular_price ) * 100;
        return price.toFixed( 1 ) + "%";
    }
    async componentDidMount ()
    {
        this.setState( { visible: true } );

        console.log( "Did Mount Called'" )
        EventRegister.emit('total-cart-item')
        // this._stopAutoPlay();
        this._startAutoPlay();
        this.props.getCategoeryList()

        this.props.getTopRatedProduct( {
            "product_type": "toprated"
        } );
        this.props.getFeaturedProduct( {
            "product_type": "featured"
        } );
        this.props.getOnSaleProduct( {
            "product_type": "onsale"
        } );
        this.props.videosCall();
        this.props.bestOffersCall();
        this.props.getOrganicWorldProduct( {
            "product_type": "organic-world"
        } );
        this.props.getBestSellingProduct( {
            "product_type": "bestselling"
        } );
        this.props.getRecentProduct( {
            "product_type": "recent"
        } );

        // this.props.productList();
        await AsyncStorage.getItem( 'AddToCart' )
            .then( ( res ) =>
            {
                console.log( "DashBoard Cart", res )
                let cart = JSON.parse( res );
                if ( res !== null && cart.length > 0 )
                {
                    this.setState( {
                        cartViewVisible: true,
                        cartItem: cart.length
                    } )
                    // EventRegister.emit('total-cart-item',cart.length)
                   
                }
                else
                {
                    this.setState( {
                        cartViewVisible: false,
                        cartItem: 0
                    } )
                }
            } )
            .catch( ( error ) =>
            {
                console.log( "Error", error )
                this.setState( { cartData: [] } )
            } )
        setTimeout( () =>
        {
            this.setState( {
                visible: false,
                homeData: this.props.homePageData.data,
                specialOffers: this.props.featured?.data
            } );
        }, 2000 );



        //  setTimeout(()=>{
        //     this.setState( { 
        //         homeData:this.props.homePageData.data,
        //     specialOffers:this.props.homePageData?.data?.featured } );
        //   },4000)

    }
    // TODO _renderItem()
    renderItem = ( item ) =>
    {
        // console.log( "Itesm", item );
        /*return <Image source={{uri: item}} style={styles.sliderItems}/>;*/
        return (
            <TouchableOpacity

            >
                <Image source={ item.url }
                    resizeMode={ 'contain' }
                    style={ {
                        width: screen_width,
                        height: 200,
                        overflow: 'hidden',

                    } }>
                </Image>
            </TouchableOpacity>
        );
    }

    totalCartItems= EventRegister.addEventListener('total-cart-item', (data)=>{
        this.setState({
            cartItem:data
        })
    })

    addToCart = async ( item ) =>
    {
        let alreadyAdded = false;
        try
        {
            await AsyncStorage.getItem( 'AddToCart' )
                .then( ( res ) =>
                {
                    console.log( "DashBoard Cart", res )
                    let cart = JSON.parse( res );
                    if ( res !== null && cart.length > 0 )
                    {
                        this.setState( { cartItem: cart.length } )
                        EventRegister.emit('total-cart-item',cart.length)
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
                        // let Updated = cart.map((data)=>{
                        //     if(data.ID==item.id){
                        //         let qu=data.cartQuentity +1;
                        //        let updated= {
                        //             ...data,
                        //             selectedVariation: data.variation[ 0 ]?.attribute_pa_weight,
                        //             cartPrice: data.variation[ 0 ]?._price*qu,
                        //             cartRegularPrice: data.variation[ 0 ]?._regular_price*qu,
                        //             cartQuentity: qu,
                        //             regPrice:data.variation[ 0 ]?._regular_price,
                        //             sPrice:data.variation[ 0 ]?._price
                        //         }
                        //     }
                        // });
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
                let finalItem = {
                    ...item,
                    selectedVariation: item.variation[ 0 ]?.attribute_pa_weight,
                    cartPrice: item.variation[ 0 ]?._price,
                    cartRegularPrice: item.variation[ 0 ]?._regular_price,
                    cartQuentity: 1,
                    regPrice:item.variation[ 0 ]?._regular_price,
                    sPrice:item.variation[ 0 ]?._price
                };
                cartData.push( finalItem );
                // cartData.push(item);
                await AsyncStorage.setItem( 'AddToCart', JSON.stringify( cartData ) )
                    .then( ( res ) =>
                    {
                        EventRegister.emit('Add-to-cart')
                        console.log( "Sucessfully Added" );
                    } )
                    .catch( ( error ) =>
                    {
                        console.log( "error", error );
                    } )
            }
            else
            {
                
                // alert( "Item Already added" )
            }
        }
        catch ( error )
        {

        }
    }

    renderVideo = ( item, index ) =>
    {
        // this.setState({currentVideoIndex:index})
        return (
            <View style={ { width: screen_width } }>
                <VideoPlayer

                    resizeMode={ 'cover' }
                    video={ {uri:item.guid}}
                    videoWidth={ screen_width }
                    videoHeight={ 200 }
                    endThumbnail={ require( '../../../assets/videoBanner.png' ) }
                    thumbnail={ require( '../../../assets/videoBanner.png' ) }
                />
            </View>
        );
    }
    renderCategories = ( item, index ) =>
    {
        // console.log( item )
        if ( index < 4 )
        {
            return (
                <TouchableOpacity
                    onPress={ () =>
                    {
                        this.props.navigation.navigate( "ProductViewScreen", {
                            request: {
                                "category_id": item.category_id
                            },
                            title: item.name
                        } )
                    } }
                    style={ [ styles.categoeryView, { backgroundColor: index % 2 === 0 ? '#FEF1E4' : '#E5F3EA' } ] }  >

                    {
                        item.guid === null || item.guid === "" ?
                            <Image source={ require( '../../../assets/default.png' ) }
                                resizeMode={ 'contain' }
                                style={ { height: 40, width: 40, alignSelf: "center" } }>
                            </Image>
                            :
                            <Image source={ { uri: item.guid !== null || item.guid !== "" ? item.guid : "" } }
                                resizeMode={ 'contain' }
                                style={ { height: 40, width: 40, alignSelf: "center" } }>
                            </Image>
                    }
                    <Text style={ [ styles.smallText, { color: Black, textAlign: 'center', fontSize: 10, padding: 5, overflow: 'hidden' } ] }>{ item.name.slice( 0, 15 ) + ( item.name.slice.length > 10 ? "..." : "" ) }</Text>
                </TouchableOpacity>
            );
        }

    }
    onScroll = ( event ) =>
    {

        // console.log( event )
        const { navigation } = this.props;
        const currentOffset = event.nativeEvent.contentOffset.y;
        const dif = currentOffset - ( this.offset || 0 );

        if ( dif < 0 )
        {
            navigation.setParams( { tabBarVisibilityAnimationConfig: false } );
        } else
        {
            navigation.setParams( { showTabBar: false } );
        }
        //console.log('dif=',dif);

        this.offset = currentOffset;
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
    renderOffer = ( item, index ) =>
    {

        return (
            <View style={ [ styles.offerBannerContainer, { backgroundColor: index % 2 === 0 ? '#FEF1E4' : '#E5F3EA' } ] }>
                <Image
                    source={ {uri:item.img} }
                    resizeMode={ 'contain' }
                    style={ { height: 60, width: 60, alignSelf: "center" } } />
                <View style={ { left: 5, width: "80%" } }>
                    <Text style={ [ styles.regularText, { width: "80%" } ] }>{ this.removeTags( item.ad_text ) }</Text>
                    <Pressable>
                        <View style={ { flexDirection: 'row', padding: 5 } }>
                            <Text style={ [ styles.labelText, { fontFamily: POPINS_SEMI_BOLD } ] }>Shop Now</Text>
                            <Image
                                style={ { height: 15, width: 15, marginHorizontal: 5, alignSelf: 'center' } }
                                source={ require( '../../../assets/next.png' ) } />
                        </View>
                    </Pressable>
                </View>
            </View>
        );
    }

    renderCartView = () =>
    {


        return (
            <TouchableOpacity style={ styles.bottomView } onPress={ () =>
            {
                this.props.navigation.navigate( 'Cart' )
            } }>
                <Image
                    style={ styles.iconStyle }
                    source={ require( '../../../assets/basket.png' ) } />
                <Text style={ [ styles.normalText, { fontFamily: POPINS_REGULAR, fontSize: 16, color: White } ] }>Go to Cart</Text>
                <Text style={ [ styles.normalText, { fontFamily: POPINS_REGULAR, fontSize: 14, color: White, backgroundColor: "#489E67" } ] }>  item { this.state.cartItem }  </Text>
            </TouchableOpacity>
        );
    }

    displayPrice = ( data ) =>
    {
       
        let price = "";
        if ( data.length > 1 )
        {
           price=data.reduce(function(prev, curr) {
                return prev._sale_price < curr._sale_price ? prev : curr;
            });
            console.log("MIN",price)
            // price = data[ 0 ].meta_value + " - " + data[ data.length - 1 ].meta_value
        }
        else
        {
            price = data[ 0 ]._sale_price
        }
        return price._sale_price;
    }
    render ()
    {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 150 : 0
        return (
            <>
                <SafeAreaView >
                    <Header { ...this.props } />
                    <ProgressLoader
                        visible={ this.state.visible }
                        isModal={ true }
                        isHUD={ true }
                        hudColor={ White }
                        color={ Light_Green } />
                    <View style={ { backgroundColor: White, height: screen_height - 20 } }>
                       <TouchableOpacity onPress={()=>{
                          this.setState( { modalVisible: true } )
                       }}>
                       <SearchBox
                        editable={false}
                            onFocus={ () =>
                            {
                                this.setState( { modalVisible: true } )
                            } }
                            value={ this.state.searchValue }
                            onChangeText={ ( text ) =>
                            {
                                this.setState( {
                                    searchValue: text
                                } )
                            } }
                            secureTextEntry={ false }
                            placeholder={ "Search here" } />
                       </TouchableOpacity>
                        <ScrollView showsVerticalScrollIndicator={ false } >
                            <View style={ {
                                height: 200,
                                width: screen_width,

                            } }>

                                <FlatList style={ { backgroundColor: White } }
                                    data={ this.state.link }
                                    contentContainerStyle={ { width: `${ 100 * IntervalTime }%` } }
                                    horizontal={ true }
                                    pagingEnabled={ true }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    onViewableItemsChanged={ this.handleViewableItemsChanged }
                                    viewabilityConfig={ this.viewabilityConfig }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) => this.renderItem( item, index ) }
                                    // renderItem={({ item }) => this._renderItem.bind(this)}
                                    ref={ this.flatList }
                                //  ref={(list) => this.myFlatList = list}
                                //   ref={(node) => (flatRef = node)}
                                />

                                <View style={ [ styles.paginationWrapper, {
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    bottom: 30
                                } ] }>
                                    { Array.from( Array( this.state.link ? this.state.link.length : 0 ).keys() ).map( ( key, index ) => (
                                        <View
                                            style={ [ styles.paginationDots, { opacity: this.state.currentIndex === index ? 1 : 0.3, width: this.state.currentIndex === index ? 20 : 10 } ] }
                                            key={ index } />
                                    ) ) }
                                </View>
                            </View>
                            <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                                <Text style={ styles.labelText }>All Categories</Text>
                                <Pressable onPress={ () => { this.props.navigation.navigate( 'Explore' ) } }>
                                    <Text style={ styles.smallText }>see more</Text>
                                </Pressable>
                            </View>
                            <View style={ {
                                height: screen_width / 4 - 20,
                                width: screen_width,

                            } }>
                                <FlatList
                                    data={ this.props.cataegoery?.data }
                                    horizontal={ true }
                                    initialNumToRender={ 6 }
                                    scrollEnabled={ false }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) => this.renderCategories( item, index ) }
                                />
                            </View>
                            <Text style={ [ styles.labelText, { paddingVertical: 5, fontSize: 14, marginHorizontal: 15, marginVertical: 5 } ] }>Special Offers</Text>
                            <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                                <View style={ [ styles.rowView ] }>
                                    <TouchableOpacity onPress={ () =>
                                    {
                                        this.setState( {
                                            specialOffers: this.props.featured?.data,
                                            isFeatured: true,
                                            onSale: false,
                                            topRate: false,
                                        } )
                                    } } style={ [ styles.featureButton, {
                                        borderBottomWidth: this.state.isFeatured === true ? 1.5 : 0,
                                        borderBottomColor: this.state.isFeatured === true ? Light_Green : null
                                    } ] }>
                                        <Text style={ [ styles.smallText, { color: Text_Gray, textAlign: "center" } ] }>Featured</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () =>
                                    {
                                        this.setState( {
                                            specialOffers: this.props.onSale?.data,
                                            isFeatured: false,
                                            onSale: true,
                                            topRate: false,
                                        } )
                                    } } style={ [ styles.featureButton, {
                                        borderBottomWidth: this.state.onSale === true ? 1.5 : 0,
                                        borderBottomColor: this.state.onSale === true ? Light_Green : null
                                    } ] }>
                                        <Text style={ [ styles.smallText, { color: Text_Gray, textAlign: "center" } ] }>On Sale</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () =>
                                    {
                                        this.setState( {
                                            specialOffers: this.props.topRated?.data,
                                            isFeatured: false,
                                            onSale: false,
                                            topRate: true,
                                        } )
                                    } } style={ [ styles.featureButton, {
                                        borderBottomWidth: this.state.topRate === true ? 1.5 : 0,
                                        borderBottomColor: this.state.topRate === true ? Light_Green : null
                                    } ] }>
                                        <Text style={ [ styles.smallText, { color: Text_Gray, textAlign: "center" } ] }>Top Rated</Text>
                                    </TouchableOpacity>
                                </View>
                                <Pressable onPress={ () =>
                                {
                                    if ( this.state.isFeatured === true )
                                    {
                                        this.props.navigation.navigate( 'ProductViewScreen', {
                                            title: "Featured",
                                            request: {
                                                "product_type": "featured"
                                            }
                                        } )
                                    }
                                    else if ( this.state.onSale === true )
                                    {
                                        this.props.navigation.navigate( 'ProductViewScreen', {
                                            title: "On Sale",
                                            request: {
                                                "product_type": "onsale"
                                            }
                                        } )
                                    }
                                    else
                                    {
                                        this.props.navigation.navigate( 'ProductViewScreen', {
                                            title: "Top Rated",
                                            request: {
                                                "product_type": "toprated"
                                            }
                                        } )

                                    }

                                } }>
                                    <Text style={ styles.smallText }>see more</Text>
                                </Pressable>

                            </View>
                            <View style={ { padding: 10, } }>
                                <FlatList
                                    data={ this.state.specialOffers }
                                    horizontal={ true }
                                    extraData={ this.state.specialOffers }
                                    maxToRenderPerBatch={ 11 }
                                    legacyImplementation={ false }
                                    extraData={ this.state.specialOffers }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) =>
                                    {
                                        // console.log("Ite,")

                                        var count = 14;
                                        // let name= item.name;
                                        //    var title =item.name.slice(0,count) +(item.name.length > count ? "..." : "");
                                        if ( index <= 3 )
                                        {
                                            return <ProductView
                                                name={ item.post_title.slice( 0, count ) + ( item.post_title.length > count ? "..." : "" ) }
                                                image={ item.img[ 0 ].img_path }
                                                rating={ item.rating[ 0 ].meta_value }
                                                // price={ this.displayPrice( item.variation ) }
                                                price={ 50 }
                                                // discount={ this.discountInPercentage( item.variation[ 0 ] ) }
                                                storeName={ item.seller_name }
                                                onPress={ () =>
                                                {
                                                    this.props.navigation.navigate( 'ProductDetailScreen', {
                                                        data: item
                                                    } )
                                                } }
                                                onAdd={ () =>
                                                {
                                                    // this.addToCart( item );
                                                } } />
                                        }

                                    } } />
                            </View>

                            {/* <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                                <Text style={ styles.labelText }>Best Deals</Text>
                                <Pressable>
                                    <Text style={ styles.smallText }>see more</Text>
                                </Pressable>
                            </View>

                            <View style={ { padding: 10, justifyContent: "center", } }>
                                <FlatList
                                    data={ this.state.categoeries }
                                    horizontal={ true }
                                    scrollEnabled={ true }
                                    // maxToRenderPerBatch={ 2 }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) =>
                                    {
                                        if ( index <= 3 )
                                        {
                                            return <ProductView />
                                        }

                                    } } />
                            </View> */}
                            <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                                <Text style={ styles.labelText }>Premium Videos</Text>
                                <Pressable>
                                    <Text style={ styles.smallText }>see more</Text>
                                </Pressable>
                            </View>

                            <View style={ { justifyContent: "center", } }>

                                <FlatList style={ { backgroundColor: White } }
                                    data={ this.props.video.data }
                                    contentContainerStyle={ { width: `${ 100 * IntervalTime }%` } }
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
                                    renderItem={ ( { item, index } ) => this.renderVideo( item, index ) }
                                // renderItem={({ item }) => this._renderItem.bind(this)}
                                // ref={ this.videoFlatList }
                                //  ref={(list) => this.myFlatList = list}
                                //   ref={(node) => (flatRef = node)}
                                />
                                <View style={ [ styles.paginationWrapper, {
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    position: 'relative',
                                    bottom: 0,
                                    marginVertical: 5
                                } ] }>
                                    { Array.from( Array( this.state.link ? this.state.link.length : 0 ).keys() ).map( ( key, index ) => (
                                        <View
                                            style={ [ styles.paginationDots, { opacity: this.state.currentVideoIndex === index ? 1 : 0.3, width: this.state.currentVideoIndex === index ? 20 : 10 } ] }
                                            key={ index } />
                                    ) ) }
                                </View>
                            </View>

                            <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                                <Text style={ styles.labelText }>Organic World</Text>
                                <Pressable onPress={ () =>
                                {
                                    this.props.navigation.navigate( 'ProductViewScreen', {
                                        title: "Organic World",
                                        request: {
                                            "product_type": "organic-world"
                                        }
                                    } )
                                } }>
                                    <Text style={ styles.smallText }>see more</Text>
                                </Pressable>
                            </View>
                            <View style={ { padding: 10, justifyContent: "center", } }>
                                <FlatList
                                    data={ this.props.organicWorld?.data }
                                    horizontal={ true }
                                    scrollEnabled={ true }
                                    maxToRenderPerBatch={ 2 }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) =>
                                    {

                                        var count = 14;
                                        // let name= item.name;
                                        //    var title =item.name.slice(0,count) +(item.name.length > count ? "..." : "");
                                        if ( index <= 3 )
                                        {
                                            return <ProductView
                                                name={ item.post_title.slice( 0, count ) + ( item.post_title.length > count ? "..." : "" ) }
                                                image={ item.img[ 0 ].img_path }
                                                rating={ item.rating[ 0 ].meta_value }
                                                // price={ this.displayPrice( item.variation ) }
                                                price={ 50 }
                                                // discount={ this.discountInPercentage( item.variation[ 0 ] ) }
                                                storeName={ item.seller_name }
                                                onPress={ () =>
                                                {
                                                    this.props.navigation.navigate( 'ProductDetailScreen', {
                                                        data: item
                                                    } )
                                                } }
                                                onAdd={ () =>
                                                {
                                                    // this.addToCart( item );
                                                } } />
                                        }
                                    } } />
                            </View>

                            <View style={ [ styles.rowView, { justifyContent: 'space-between', marginVertical: 10 } ] }>
                                <Text style={ styles.labelText }>Best Offers</Text>
                                <Pressable>
                                    <Text style={ styles.smallText }>see more</Text>
                                </Pressable>
                            </View>
                            <View style={ { padding: 10, } }>
                                <FlatList
                                    data={ this.props.bestOffer?.data }
                                    horizontal={ true }
                                    maxToRenderPerBatch={ 11 }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) =>
                                    {
                                        if ( index <= 3 )
                                        {
                                            return this.renderOffer( item, index )
                                        }

                                    } } />
                            </View>


                            {/* <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                                <Text style={ styles.labelText }>Best Sellers</Text>
                                <Pressable>
                                    <Text style={ styles.smallText }>see more</Text>
                                </Pressable>
                            </View>

                            <View style={ { padding: 10, justifyContent: "center", } }>
                                <FlatList
                                    data={ this.state.categoeries }
                                    numColumns={ 2 }
                                    scrollEnabled={ false }
                                    maxToRenderPerBatch={ 2 }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) =>
                                    {
                                        if ( index <= 3 )
                                        {
                                            return <ProductView />
                                        }

                                    } } />
                            </View> */}
                            <ImageBackground style={ styles.bannerStyle }
                                source={ require( '../../../assets/bannerImage.png' ) }>
                                <Text style={ styles.banerText }>FOOD,HELTH,ORGANIC</Text>
                                <Pressable>
                                    <View style={ { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, alignSelf: 'flex-end' } }>
                                        <Text style={ [ styles.banerText, { color: Light_Green, fontSize: 18, fontFamily: POPINS_BOLD } ] }>Shop Now</Text>
                                        <Image
                                            style={ { height: 15, width: 15, marginHorizontal: 5, alignSelf: 'center' } }
                                            source={ require( '../../../assets/next.png' ) } />
                                    </View>
                                    <View style={ { flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, alignSelf: 'flex-end' } }>
                                        <Text style={ [ styles.banerText, { color: Light_Green, fontSize: 14, paddingHorizontal: 0, } ] }> Up to </Text>
                                        <Text style={ [ styles.banerText, { color: Red, fontSize: 18, fontFamily: POPINS_BOLD, paddingHorizontal: 5, bottom: "1%" } ] }>70% </Text>

                                    </View>
                                </Pressable>

                            </ImageBackground>
                            <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                                <Text style={ styles.labelText }>Top Selling Products</Text>
                                <Pressable onPress={ () =>
                                {
                                    this.props.navigation.navigate( "ProductViewScreen", {
                                        request: {
                                            "product_type": "bestselling"
                                        },
                                        title: "Top Selling Products"
                                    } )
                                } }>
                                    <Text style={ styles.smallText }>see more</Text>
                                </Pressable>
                            </View>

                            <View style={ { padding: 10, justifyContent: "center", } }>
                                <FlatList
                                    data={ this.props.bestSelling?.data }
                                    numColumns={ 2 }
                                    extraData={ this.props.bestSelling?.data }
                                    scrollEnabled={ false }
                                    maxToRenderPerBatch={ 2 }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) =>
                                    {
                                        if ( index <= 3 )
                                        {
                                            let count = 14
                                            return <ProductView
                                                name={ item.post_title.slice( 0, count ) + ( item.post_title.length > count ? "..." : "" ) }
                                                image={ item.img[ 0 ].img_path }
                                                rating={ item.rating[ 0 ].meta_value }
                                                // price={ this.displayPrice( item.variation ) }
                                                price={ 50 }
                                                // discount={ this.discountInPercentage( item.variation[ 0 ] ) }
                                                storeName={ item.seller_name }
                                                onPress={ () =>
                                                {
                                                    this.props.navigation.navigate( 'ProductDetailScreen', {
                                                        data: item
                                                    } )
                                                } }
                                                onAdd={ () =>
                                                {
                                                    // this.addToCart( item );
                                                } } />
                                        }

                                    } } />
                            </View>
                            <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                                <Text style={ styles.labelText }>Recent Product</Text>
                                <Pressable onPress={ () =>
                                {
                                    this.props.navigation.navigate( "ProductViewScreen", {
                                        request: {
                                            "product_type": "recent"
                                        },
                                        title: "Recent Product"
                                    } )
                                } }>
                                    <Text style={ styles.smallText }>see more</Text>
                                </Pressable>
                            </View>

                            <View style={ { padding: 10, justifyContent: "center", } }>
                                <FlatList
                                    data={ this.props.recentProduct?.data }
                                    numColumns={ 2 }
                                    scrollEnabled={ false }
                                    maxToRenderPerBatch={ 2 }
                                    extraData={ this.props.recentProduct?.data }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) =>
                                    {
                                        if ( index <= 3 )
                                        {
                                            let count = 14
                                            return <ProductView
                                                name={ item.post_title.slice( 0, count ) + ( item.post_title.length > count ? "..." : "" ) }
                                                image={ item.img[ 0 ].img_path }
                                                rating={ item.rating[ 0 ].meta_value }
                                                // price={ this.displayPrice( item.variation ) }
                                                  price={50  }
                                                // discount={ this.discountInPercentage( item.variation[ 0 ] ) }
                                                storeName={ item.seller_name }
                                                onPress={ () =>
                                                {
                                                    this.props.navigation.navigate( 'ProductDetailScreen', {
                                                        data: item
                                                    } )
                                                } }
                                                onAdd={ () =>
                                                {
                                                    // this.addToCart( item );
                                                } } />
                                        }

                                    } } />

                            </View>

                            <View style={ { height: 200 } }>

                            </View>
                            {/* <ProductView/> */ }
                        </ScrollView>

                    </View>
                    <Modal
                        isVisible={ this.state.modalVisible }
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        //    transparent={ true }

                        style={ { flex: 1, backgroundColor: White } }
                        onRequestClose={ () =>
                        {
                            this.setState( { modalVisible: false } )
                            this.setState({keyword:''})
                            this.props.dispatch(
                                {
                                    type:PRODUCT_BY_KEYWORD_SUCESS,
                                     payload:initialState
                                }
                            )
                            // mooveRL();
                        } }>
                        <View style={ styles.modalStyles }>
                            <View style={{marginTop:"10%"}}>
                                <View style={{flexDirection:'row'}}>
                             <TouchableOpacity style={{
                                 marginHorizontal:10,
                                 justifyContent:'center'
                             }}
                             onPress={()=>{
                                 this.setState({modalVisible:false})
                                 this.setState({keyword:''})
                                 this.props.dispatch(
                                    {
                                        type:PRODUCT_BY_KEYWORD_SUCESS,
                                         payload:initialState
                                    }
                                )
                             }}>
                             <Image
                                style={ {
                                    alignSelf:'center',
                                    left:"10%"
                                } }
                                source={ require( '../../../assets/back.png' ) } />
                             </TouchableOpacity>
                                 <SearchBox
                                    style={{width:"85%",alignSelf:"flex-end"}}
                                    autoFocus={true}
                                    value={ this.state.keyword}
                                    // onEndEditing={()=>{
                                    //     this.props.byKeyWord({
                                    //         "keyword": this.state.keyword
                                    //     });
                                    // }}
                                    onChangeText={ ( text ) =>
                                    {
                                        this.setState({keyword:text})
                                        this.props.byKeyWord({
                                            "keyword": text
                                        });
                                    } }
                                    secureTextEntry={ false }
                                    placeholder={ "Search here" } />
                                    </View>
                                        <FlatList
                                    data={ this.props.keyWordProduct?.data }
                                    numColumns={ 2 }
                                    scrollEnabled={ false }
                                    maxToRenderPerBatch={ 2 }
                                    extraData={ this.props.keyWordProduct?.data }
                                    legacyImplementation={ false }
                                    showsHorizontalScrollIndicator={ false }
                                    showsVerticalScrollIndicator={ false }
                                    keyExtractor={ ( item, index ) => index.toString() }
                                    renderItem={ ( { item, index } ) =>
                                    {
                                       
                                            let count = 14
                                            return <ProductView
                                                name={ item.post_title.slice( 0, count ) + ( item.post_title.length > count ? "..." : "" ) }
                                                image={ item.img[ 0 ].img_path }
                                                rating={ item.rating[ 0 ].meta_value }
                                                // price={ this.displayPrice( item.variation ) }
                                                price={50 }
                                                // discount={ this.discountInPercentage( item.variation[ 0 ] ) }
                                                storeName={ item.seller_name }
                                                onPress={ () =>
                                                {
                                                    this.props.navigation.navigate( 'ProductDetailScreen', {
                                                        data: item
                                                    } )
                                                } }
                                                onAdd={ () =>
                                                {
                                                    // this.addToCart( item );
                                                } } />
                                        

                                    } } />
                            </View>

                        </View>

                    </Modal>

                </SafeAreaView>
                {/* {this.state.cartItem > 0 && this.state.cartViewVisible === true ? this.renderCartView() : null } */}
            </>
        )
    }
}

function mapStateToProps ( state, ownProps )
{
    console.log( "state.homePageReducer.data ",state.getKeywordProductReducer.data )
    return {
        // data : state.loginReducer.data
        products: state.productListReducer.data,
        cataegoery: state.categoeryListReducer.data,
        getProducts: state.getProductByCatIdReducer.data,
        bestSelling: state.getBestSellingProductReducer.data,
        topRated: state.getTopRatedProductReducer.data,
        featured: state.getFeaturedProductReducer.data,
        onSale: state.getOnSaleProductReducer.data,
        organicWorld: state.getOrganicWorldProductReducer.data,
        recentProduct: state.getRecentProductReducer.data,
        bestOffer: state.getBestOfferReducer.data,
        homePageData: state.homePageReducer.data,
        keyWordProduct:state.getKeywordProductReducer.data,
        video:state.getVideosReducer.data
    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productList: ( request ) => dispatch( actions.productListAction() ),
        getCategoeryList: ( request ) => dispatch( actions.getCategoeryListAction() ),
        getProduct: ( request ) => dispatch( actions.getProductListByCatId( request ) ),
        getBestSellingProduct: ( request ) => dispatch( actions.getBestSellingProductAction( request ) ),
        getTopRatedProduct: ( request ) => dispatch( actions.getTopRatedProductAction( request ) ),
        getFeaturedProduct: ( request ) => dispatch( actions.getFeaturedProductAction( request ) ),
        getOnSaleProduct: ( request ) => dispatch( actions.getOnSaleProductAction( request ) ),
        getOrganicWorldProduct: ( request ) => dispatch( actions.getOrganicWorldProductAction( request ) ),
        getRecentProduct: ( request ) => dispatch( actions.getRecentProductAction( request ) ),
        homePageCall: ( request ) => dispatch( actions.homePageAction( request ) ),
        bestOffersCall: ( request ) => dispatch( actions.getBestOfferAction( request ) ),
        byKeyWord:(request)=>dispatch(actions.getKeywordProduct(request)),
        videosCall:(request)=>dispatch(actions.getVideosAction(request)),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( Dashboard );