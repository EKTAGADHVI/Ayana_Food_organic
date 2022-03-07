import React, { Component, createRef } from 'react';
import { SafeAreaView, View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Rating } from 'react-native-ratings';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { Black, Gray, Light_Green, White } from '../../Utils/colors';
import { screen_width } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import styles from './styles';

class ProductDetailScreen extends Component
{
    flatList = createRef();

    constructor ( props )
    {
        super( props );
        this.state = {
            link: [
                {
                    "id": 0,
                    "url": require( '../../../assets/product.png' )
                },
                {
                    "id": 1,
                    "url": require( '../../../assets/product.png' )
                },
                {
                    "id": 2,
                    "url": require( '../../../assets/product.png' )
                }

            ],
            currentIndex: 0,
            quentity: 1,
            isDiscription: false,
            isTerm: false,

        }
        this.viewabilityConfig = {
            viewAreaCoveragePercentThreshold: 50,
            waitForInteraction: true,
        };
        this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind( this );
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
    renderImages = ( item, index ) =>
    {
        return (
            <View style={ styles.ItemContainer }>
                <Image
                    style={ styles.ImagStyle }
                    source={ item.url } />


            </View>
        );
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView style={ { backgroundColor: White } }>
                    <ScrollView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } }
                        style={ { backgroundColor: Gray } }
                        title={ "Product Detail" }
                        rightMenuIcon={ require( '../../../assets/search.png' ) }
                    />
                    <View style={ styles.ImageContainer }>


                        <FlatList
                            data={ this.state.link }
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
                            marginVertical: 5
                        } ] }>
                            { Array.from( Array( this.state.link ? this.state.link.length : 0 ).keys() ).map( ( key, index ) => (
                                <View
                                    style={ [ styles.paginationDots, { opacity: this.state.currentIndex === index ? 1 : 0.3, width: this.state.currentIndex === index ? 20 : 10 } ] }
                                    key={ index } />
                            ) ) }
                        </View>
                        <View style={ styles.bottomContainer }>
                            <Text style={ styles.titleText }>Product Name</Text>
                            <Image
                                style={ styles.iconStyle }
                                source={ require( '../../../assets/fav.png' ) } />
                        </View>

                    </View>
                    <View style={ [ styles.mainContainer, { backgroundColor: White } ] }>
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
                                        quentity: this.state.quentity + 1
                                    } )
                                } }>
                                    <Image
                                        style={ [ styles.iconStyle2, { tintColor: Light_Green } ] }

                                        source={ require( '../../../assets/plus.png' ) } />
                                </TouchableOpacity>
                            </View>

                            <View style={ { padding: 8 } }>
                                <Text style={ [ styles.titleText, { textAlign: 'right' } ] }>Rs. 50.00</Text>
                                <Text style={ [ styles.quentityText, { color: Light_Green, textAlign: 'right' } ] }>Avaibility : <Text style={ [ styles.quentityText, {
                                    color:
                                        Black, fontFamily: POPINS_REGULAR,
                                } ] }> 20 in Stock</Text></Text>
                            </View>

                        </View>
                        <View style={ styles.container }>

                            <View style={ styles.rowView }>
                                <Text style={ [ styles.quentityText ] }>Description</Text>
                                <TouchableOpacity onPress={ () =>
                                {
                                    this.setState( { isDiscription: !this.state.isDiscription } )
                                } }>{
                                        this.state.isDiscription === true ? <Image style={ styles.iconStyle2 } source={ require( '../../../assets/down.png' ) } />
                                            : <Image style={ styles.iconStyle2 } source={ require( '../../../assets/right.png' ) } />
                                    }

                                </TouchableOpacity>


                            </View>

                            {
                                this.state.isDiscription === true ?
                                    <View>
                                        <Text style={ styles.smallText }>Crafted with handpicked potatoes, Parle’s wafers are delightfully crunchy and light.
                                        Available in exciting flavours: Cream n Onion, Masala Masti, Tangy Tomato, Classic Salted, Piri Piri, Aloo Chaat, Subtle Onion.
Parle presents their authentic and flavourful range of sweets and snacks that are made from high-quality ingredients that are delectable to the palate and will make you crave for more with every bite.</Text>
                                    </View>
                                    : null
                            }
                        </View>

                        <View style={ styles.container }>
                            <Text style={ [ styles.quentityText, { paddingHorizontal: 15, paddingVertical: 10 } ] }>Pin Code : <Text style={ styles.smallText }> 380060</Text></Text>
                        </View>

                        <View style={ styles.container }>

                            <View style={ styles.rowView }>
                                <Text style={ [ styles.quentityText ] }>More Offers</Text>
                                <TouchableOpacity onPress={ () =>
                                {
                                    this.setState( { isTerm: !this.state.isTerm } )
                                } }>{
                                        this.state.isTerm === true ? <Image style={ styles.iconStyle2 } source={ require( '../../../assets/down.png' ) } />
                                            : <Image style={ styles.iconStyle2 } source={ require( '../../../assets/right.png' ) } />
                                    }

                                </TouchableOpacity>


                            </View>

                            {/* {
   this.state.isDiscription === true ?
   <View>
   <Text style={styles.smallText}>Crafted with handpicked potatoes, Parle’s wafers are delightfully crunchy and light. 
Available in exciting flavours: Cream n Onion, Masala Masti, Tangy Tomato, Classic Salted, Piri Piri, Aloo Chaat, Subtle Onion.
Parle presents their authentic and flavourful range of sweets and snacks that are made from high-quality ingredients that are delectable to the palate and will make you crave for more with every bite.</Text>
</View>
:null
} */}
                        </View>
                        <View style={ [ styles.container, { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 } ] }>
                            <View>
                                <Text style={ [ styles.quentityText, { marginVertical: 3 } ] }>Review</Text>
                                <Rating
                                    type='star'
                                    ratingImage={ require( '../../../assets/star.png' ) }
                                    ratingColor='#3498db'
                                    ratingBackgroundColor='#c8c7c8'
                                    ratingCount={ 5 }
                                    imageSize={ 15 }
                                    startingValue={ 2 }
                                    onFinishRating={ this.ratingCompleted }
                                    style={ { backgroundColor: Gray } }
                                />
                            </View>
                            <View >
                                <Text style={ [ styles.quentityText, { textAlign: 'center' } ] }>4.0</Text>
                                <Text style={ [ styles.smallText, { paddingVertical: 3, paddingHorizontal: 3 } ] }>Over all</Text>
                            </View>
                        </View>
                        <View style={ styles.container }>

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

                            {/* {
                           this.state.isDiscription === true ?
                           <View>
                           <Text style={styles.smallText}>Crafted with handpicked potatoes, Parle’s wafers are delightfully crunchy and light. 
Available in exciting flavours: Cream n Onion, Masala Masti, Tangy Tomato, Classic Salted, Piri Piri, Aloo Chaat, Subtle Onion.
Parle presents their authentic and flavourful range of sweets and snacks that are made from high-quality ingredients that are delectable to the palate and will make you crave for more with every bite.</Text>
                       </View>
                       :null
                       } */}
                        </View>
                        <View style={ styles.container }>

                            <View style={ styles.rowView }>
                                <Text style={ [ styles.quentityText ] }>Ask For Question</Text>
                                <TouchableOpacity onPress={ () =>
                                {
                                    this.setState( { isTerm: !this.state.isTerm } )
                                } }>{
                                        this.state.isTerm === true ? <Image style={ styles.iconStyle2 } source={ require( '../../../assets/down.png' ) } />
                                            : <Image style={ styles.iconStyle2 } source={ require( '../../../assets/right.png' ) } />
                                    }

                                </TouchableOpacity>


                            </View>

                            {/* {
   this.state.isDiscription === true ?
   <View>
   <Text style={styles.smallText}>Crafted with handpicked potatoes, Parle’s wafers are delightfully crunchy and light. 
Available in exciting flavours: Cream n Onion, Masala Masti, Tangy Tomato, Classic Salted, Piri Piri, Aloo Chaat, Subtle Onion.
Parle presents their authentic and flavourful range of sweets and snacks that are made from high-quality ingredients that are delectable to the palate and will make you crave for more with every bite.</Text>
</View>
:null
} */}
                        </View>
                        <View style={ [ styles.rowView,{justifyContent:'space-evenly', paddingVertical:"10%"} ] }>
                            <FilledButton
                            style={{width:screen_width/2-30}}
                                onPress={ () => { } }
                                title={ "Add to Cart " } />
                            <FilledButton
                              style={{width:screen_width/2-30}}
                                onPress={ () => { } }
                                title={ "WhatsApp " } />
                        </View>
                    </View>
                    </ScrollView>
                </SafeAreaView>


            </View>
        )
    }
}

export default ProductDetailScreen;