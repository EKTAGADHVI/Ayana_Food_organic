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
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_BOLD, POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

let CurrentSlide = 0;
let IntervalTime = 4000;

class Dashboard extends Component
{
    flatList = createRef();
    videoFlatList = createRef();
    constructor ( props )
    {
        super( props );
        AsyncStorage.getItem('PostalCode')
        .then((res)=>{
            console.log("postal",JSON.parse(res).code)
            if(res !== null ){
            //    this.setState({postalCode:JSON.parse(res).code});
            this.props.homePageCall({
                "pincode":JSON.parse(res).code
            })
            }
            else{
                this.setState({postalCode:''});
            }
        })
        .catch((err)=>{})
        
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
                homeData:[],
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
                specialOffers: this.props.homeData?.data?.featured,
                visible: false

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

    discountInPercentage=(data)=>{
        console.log("Prioce",data)
        let discountPrice = data._regular_price -data._sale_price;
        let price =(discountPrice/data._regular_price)*100;
        return price.toFixed(1) + "%";
    }
    componentDidMount ()
    {
        this.setState( { visible: true } );

        console.log( "Did Mount Called'" )

        // this._stopAutoPlay();
        this._startAutoPlay();
        this.props.getCategoeryList()
        this.props.getBestSellingProduct( {
            "product_type": "bestselling"
        } );
        this.props.getTopRatedProduct( {
            "product_type": "toprated"
        } );
        this.props.getRecentProduct({
            "product_type": "recent"
        });
        // this.props.productList();
        setTimeout( () =>
        {   
            this.setState( { visible: false,
            homeData:this.props.homePageData.data,
            specialOffers:this.props.homePageData?.data?.featured } );
        }, 2000 );



     setTimeout(()=>{
        this.setState( { 
            homeData:this.props.homePageData.data,
        specialOffers:this.props.homePageData?.data?.featured } );
      },4000)

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


    renderVideo = ( item, index ) =>
    {
        // this.setState({currentVideoIndex:index})
        return (
            <View style={ { width: screen_width } }>
                <VideoPlayer

                    resizeMode={ 'cover' }
                    video={ require( '../../../assets/videoplayback.mp4' ) }
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
                onPress={()=>{
                    this.props.navigation.navigate("ProductViewScreen",{
                        request:{
                         "category_id":item.category_id
                     },
                         title:item.name
                     }) 
                }}
                style={ [ styles.categoeryView, { backgroundColor: index % 2 === 0 ? '#FEF1E4' : '#E5F3EA' } ] }  >
                    <Image source={ require( '../../../assets/grocery.png' ) }
                        resizeMode={ 'contain' }
                        style={ { height: 40, width: 40, alignSelf: "center" } }>
                    </Image>
                    <Text style={ [ styles.smallText, { color: Black, textAlign: 'center', fontSize: 10 ,padding:5,overflow:'hidden'} ] }>{ item.name.slice( 0, 15 ) + ( item.name.slice.length > 10 ? "..." : "" ) }</Text>
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

    renderOffer = ( item, index ) =>
    {
        return (
            <View style={ [ styles.offerBannerContainer, { backgroundColor: index % 2 === 0 ? '#FEF1E4' : '#E5F3EA' } ] }>
                <Image
                    source={ require( '../../../assets/grocery.png' ) }
                    resizeMode={ 'contain' }
                    style={ { height: 60, width: 60, alignSelf: "center" } } />
                <View style={ { left: 5 } }>
                    <Text style={ styles.regularText }>Catch Big Discount on Organic Products</Text>
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

    displayPrice = (data) =>{
        let price ="";
        if(data.length >1){
            price = data[0].meta_value + " - " +data[data.length-1].meta_value
        }
        else{
            price = data[0].meta_value
        }
        return price;
    }
    render ()
    {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 150 : 0
        return (
            <SafeAreaView >
                <Header { ...this.props } />
                <ProgressLoader
                    visible={ this.state.visible }
                    isModal={ true }
                    isHUD={ true }
                    hudColor={ White }
                    color={ Light_Green } />
                <View style={ { backgroundColor: White, height: screen_height - 20 } }>
                    <SearchBox

                        value={ this.state.searchValue }
                        onChangeText={ ( text ) =>
                        {
                            this.setState( {
                                searchValue: text
                            } )
                        } }
                        secureTextEntry={ false }
                        placeholder={ "Search here" } />
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
                                        specialOffers: this.props.homePageData?.data?.featured,
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
                                        specialOffers: this.props.homePageData?.data?.toprated,
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
                                            "product_type": "bestselling"
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
                                 extraData={this.state.specialOffers}
                                maxToRenderPerBatch={ 11 }
                                legacyImplementation={ false }
                                extraData={this.state.specialOffers }
                                showsHorizontalScrollIndicator={ false }
                                showsVerticalScrollIndicator={ false }
                                keyExtractor={ ( item, index ) => index.toString() }
                                renderItem={ ( { item, index } ) =>
                                {
                                    console.log("item.Images",item.price)
                                    var count = 14;
                                    // let name= item.name;
                                    //    var title =item.name.slice(0,count) +(item.name.length > count ? "..." : "");
                                    if ( index <= 3 )
                                    {
                                        return <ProductView
                                            name={ item.post_title.slice( 0, count ) + ( item.post_title.length > count ? "..." : "" ) }
                                            image={ item.img[0].img_path }
                                            rating={ item.rating[0].meta_value }
                                            price={ this.displayPrice(item.price) }
                                            discount={this.discountInPercentage(item.variation[0])}
                                            storeName={item.seller_name}
                                            onPress={ () =>
                                            {
                                                this.props.navigation.navigate( 'ProductDetailScreen', {
                                                    data: item
                                                } )
                                            } } />
                                    }

                                } } />
                        </View>

                        <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
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
                        </View>
                        <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                            <Text style={ styles.labelText }>Premium Videos</Text>
                            <Pressable>
                                <Text style={ styles.smallText }>see more</Text>
                            </Pressable>
                        </View>

                        <View style={ { justifyContent: "center", } }>

                            <FlatList style={ { backgroundColor: White } }
                                data={ this.state.link }
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
                            <Pressable>
                                <Text style={ styles.smallText }>see more</Text>
                            </Pressable>
                        </View>
                        <View style={ { padding: 10, justifyContent: "center", } }>
                            <FlatList
                                data={ this.state.categoeries }
                                horizontal={ true }
                                scrollEnabled={ true }
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
                        </View>

                        <View style={ [ styles.rowView, { justifyContent: 'space-between', marginVertical: 10 } ] }>
                            <Text style={ styles.labelText }>Best Offers</Text>
                            <Pressable>
                                <Text style={ styles.smallText }>see more</Text>
                            </Pressable>
                        </View>
                        <View style={ { padding: 10, } }>
                            <FlatList
                                data={ this.state.categoeries }
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


                        <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                            <Text style={ styles.labelText }>Best Sallers</Text>
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
                        </View>
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
                                data={ this.props.homePageData?.data?.bestselling }
                                numColumns={ 2 }
                                extraData={this.props.homePageData?.data?.bestselling}
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
                                            image={ item.img[0].img_path }
                                            rating={ item.rating[0].meta_value }
                                            price={ this.displayPrice(item.price) }
                                            discount={this.discountInPercentage(item.variation[0])}
                                            storeName={item.seller_name}
                                            onPress={ () =>
                                            {
                                                this.props.navigation.navigate( 'ProductDetailScreen', {
                                                    data: item
                                                } )
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
                                data={ this.props.homePageData?.data?.recent}
                                numColumns={ 2 }
                                scrollEnabled={ false }
                                maxToRenderPerBatch={ 2 }
                                extraData={this.props.homePageData?.data?.recent}
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
                                        image={ item.img[0].img_path }
                                        rating={ item.rating[0].meta_value }
                                        price={ this.displayPrice(item.price)  }
                                        discount={this.discountInPercentage(item.variation[0])}
                                        storeName={item.seller_name} 
                                            onPress={ () =>
                                        {
                                            this.props.navigation.navigate( 'ProductDetailScreen', {
                                                data: item
                                            } )
                                        } }/>
                                    }

                                } } />
                        </View>
                        <View style={ { height: 200 } }>

                        </View>
                        {/* <ProductView/> */ }
                    </ScrollView>
                </View>

            </SafeAreaView>
        )
    }
}

function mapStateToProps ( state, ownProps )
{
    console.log( "state.homePageReducer.data ", state.homePageReducer.data )
    return {
        // data : state.loginReducer.data
        products: state.productListReducer.data,
        cataegoery: state.categoeryListReducer.data,
        getProducts: state.getProductByCatIdReducer.data,
        bestSelling: state.getBestSellingProductReducer.data,
        topRated: state.getTopRatedProductReducer.data,
        recentProduct:state.getRecentProductReducer.data,
        homePageData:state.homePageReducer.data
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
        getRecentProduct:(request)=>dispatch(actions.getRecentProductAction(request)),
        homePageCall:(request)=>dispatch(actions.homePageAction(request)),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( Dashboard );