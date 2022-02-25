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
    Text, SafeAreaView, Pressable
} from 'react-native';
import { color } from 'react-native-reanimated';
import Header from '../../Components/Header';
import ProductView from '../../Components/ProductView';
import SearchBox from '../../Components/SearchBox';

import { Black, Light_Green, ORENGE, Text_Gray, White } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import styles from './styles';
let CurrentSlide = 0;
let IntervalTime = 4000;
class Dashboard extends Component
{
    flatList = createRef();
    constructor ( props )
    {
        super( props );
        this.state = {
            searchValue: ''
        },

            this.state = {

                currentIndex: 0,
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
        this.setState( { currentIndex: getIndex } );

    }
    // TODO _goToNextPage()
    _goToNextPage = () =>
    {

        if ( this.state.link === undefined ) CurrentSlide = 0
        else if ( CurrentSlide > this.state.link.length - 1 ) CurrentSlide = 0;

        const finalIdx = CurrentSlide >= this.state.link.length - 1 ? CurrentSlide = 0 : ++CurrentSlide
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
        // this._stopAutoPlay();
        this._startAutoPlay();
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


    render ()
    {
        return (
            <SafeAreaView >
                <Header { ...this.props } />
                <View style={ { backgroundColor: White, height: screen_height } }>
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
                        <Pressable>
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
                    <Text style={ [ styles.labelText, { paddingVertical: 5, fontSize: 14, marginHorizontal: 10, marginVertical: 5 } ] }>Special Offer</Text>
                    <View style={ [ styles.rowView, { justifyContent: 'space-between' } ] }>
                        <View style={ [ styles.rowView ] }>
                            <TouchableOpacity onPress={()=>{}} style={[styles.featureButton]}>
                                <Text style={  [styles.smallText,{color:Text_Gray}]  }>Featured</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{}} style={[styles.featureButton]}>
                                <Text style={  [styles.smallText,{color:Text_Gray}]  }>On Sale</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{}} style={[styles.featureButton]}>
                                <Text style={ [styles.smallText,{color:Text_Gray}] }>Top Rated</Text>
                            </TouchableOpacity>
                        </View>
                        <Pressable>
                            <Text style={ styles.smallText }>see more</Text>
                        </Pressable>
                     
                    </View>
                    <ProductView/>
                </View>

            </SafeAreaView>
        )
    }
}
export default Dashboard;