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

import { Black, Light_Green, ORENGE, Red, Text_Gray, White } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_BOLD, POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';
let CurrentSlide = 0;
let IntervalTime = 4000;

class Dashboard extends Component
{
    flatList = createRef();
    videoFlatList = createRef();
    constructor ( props )
    {
        super( props );
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
                {
                    "id": 4,
                    "name": "Grocery"
                },
                {
                    "id": 5,
                    "name": "Grocery"
                },
                {
                    "id": 6,
                    "name": "Grocery1"
                },
                {
                    "id": 7,
                    "name": "Grocery"
                },
                {
                    "id": 8,
                    "name": "Grocery1"
                },
                {
                    "id": 9,
                    "name": "Grocery"
                },
                {
                    "id": 10,
                    "name": "Grocery1"
                },
                {
                    "id": 11,
                    "name": "Grocery1"
                }

            ],


        }
        this.viewabilityConfig = {
            viewAreaCoveragePercentThreshold: 50,
            waitForInteraction: true,
        };
        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind( this );
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
    componentDidMount ()
    {
        console.log("Did Mount Called'")
        // this._stopAutoPlay();
        this._startAutoPlay();
        this.props.productList();
      
     
            productList: this.props.products
      
    }
    // TODO _renderItem()
    renderItem = ( item ) =>
    {
        console.log( "Itesm", item );
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
        console.log( index )
        if ( index < 6 )
        {
            return (
                <TouchableOpacity style={ [ styles.categoeryView, { backgroundColor: index % 2 === 0 ? '#FEF1E4' : '#E5F3EA' } ] }  >
                    <Image source={ require( '../../../assets/grocery.png' ) }
                        resizeMode={ 'contain' }
                        style={ { height: 20, width: 20, alignSelf: "center" } }>
                    </Image>
                    <Text style={ [ styles.smallText, { color: Black, textAlign: 'center', fontSize: 8 } ] }>{ item.name }</Text>
                </TouchableOpacity>
            );
        }

    }
    onScroll = ( event ) =>
    {

        console.log( event )
        const { navigation } = this.props;
        const currentOffset = event.nativeEvent.contentOffset.y;
        const dif = currentOffset - ( this.offset || 0 );

        if ( dif < 0 )
        {
            navigation.setParams( { showTabBar: true } );
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
                    <Text style={ styles.regularText }>Catch Big Discounton Organic Products</Text>
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

    render ()
    {
        return (
            <SafeAreaView >
                <Header { ...this.props } />
                <View style={ { backgroundColor: White, height: screen_height-20 } }>
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
                    <ScrollView showsVerticalScrollIndicator={ false } onScroll={ () =>
                    {

                    } }>
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
                            <Text style={ styles.labelText }>All Categoeries</Text>
                            <Pressable >
                                <Text style={ styles.smallText }>see more</Text>
                            </Pressable>
                        </View>
                        <View style={ {
                            height: 50,
                            width: screen_width,

                        } }>
                            <FlatList
                                data={ this.state.categoeries }
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
                        <Text style={ [ styles.labelText, { paddingVertical: 5, fontSize: 14, marginHorizontal: 15, marginVertical: 5 } ] }>Special Offer</Text>
                        <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                            <View style={ [ styles.rowView ] }>
                                <TouchableOpacity onPress={ () =>
                                {
                                    this.setState( {
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
                                this.props.navigation.navigate('ProductViewScreen',{
                                    title: "Special Offers",
                                    data:this.props.products
                                })
                            } }>
                                <Text style={ styles.smallText }>see more</Text>
                            </Pressable>

                        </View>
                        <View style={ { padding: 10, } }>
                            <FlatList
                                data={this.props.products.length >0? this.props.products :[]  }
                                horizontal={ true }

                                maxToRenderPerBatch={ 11 }
                                legacyImplementation={ false }
                                showsHorizontalScrollIndicator={ false }
                                showsVerticalScrollIndicator={ false }
                                keyExtractor={ ( item, index ) => index.toString() }
                                renderItem={ ( { item, index } ) =>
                                {
                                    console.log("item.Images",item.images)
                                    var count = 14;
                                    // let name= item.name;
                                   var title =item.name.slice(0,count) +(item.name.length > count ? "..." : "");
                                    if ( index <= 3 )
                                    {
                                        return <ProductView 
                                        name={ item.name.slice(0,count) +(item.name.length > count ? "..." : "") }
                                        image ={item.images[0]?.src} 
                                        rating={item.rating_count}
                                        price ={item.price}
                                        onPress={()=>{this.props.navigation.navigate('ProductDetailScreen',{
                                            data:item
                                        })}}/>
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
                        <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                            <Text style={ styles.labelText }>Recent Product</Text>
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
    console.log( " state.loginReducer.data", state.productListReducer.data )
    return {
        // data : state.loginReducer.data
        products: state.productListReducer.data,


    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productList: ( request ) => dispatch( actions.productListAction() ),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( Dashboard );