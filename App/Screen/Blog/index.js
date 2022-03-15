import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text, View ,Image,TouchableOpacity} from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import SearchBox from '../../Components/SearchBox';
import { Black, Light_Green } from '../../Utils/colors';
import { screen_width } from '../../Utils/constant';
import { POPINS_REGULAR } from '../../Utils/fonts';
import styles from './styles';


class Blog extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            searchValue: '',
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
        }
    }

    renderItem = ( item, index ) =>
    {
        return (
            <View style={styles.itemView}>
                <View style={styles.rowView}>
                    <Image 
                    source={require('../../../assets/product.png')}
                    style={styles.imageStyle } />
                    <View style={{ left:5}}>
                        <Text style={[styles.normalText,{color:Light_Green, marginRight:"35%"}]}>Importance of Organic Food in today’s Lifestyle</Text>
                        <Text style={[[styles.normalText,{color:Black}]]}>Ayana Food Organic</Text>
                        <Text style={styles.smallText}>February 1, 2022</Text>
                    </View>

                </View>
                <Text style={[[styles.normalText,{color:Black,fontFamily:POPINS_REGULAR}]]}>Black salt rice is a very high quality rice variety. Due to the black husk, its name is black salt rice. Its importance can be gauged from the fact that</Text>
                <View style={[styles.rowView,{justifyContent:'space-between'}]}>
                    <FilledButton title="Read more"
                        style={ { borderRadious: 20,paddingVertical:0 } }
                        textStyle={ { fontSize: 10, paddingVertical: 5 , paddingHorizontal:15} }
                        onPress={ () => {this.props.navigation.navigate('BlogDetails') } } />

                        <TouchableOpacity style={styles.btnStyle}>
                            <View style={styles.rowView}>
                                <Image source={require('../../../assets/message.png')}
                                style={styles.iconStyle}/>
                                <Text style={[styles.smallText]}>Leave a comment</Text>
                            </View>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }

    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Blog' } />
                    <SearchBox
                        style={ styles.searchBox }
                        value={ this.state.searchValue }
                        onChangeText={ ( text ) =>
                        {
                            this.setState( {
                                searchValue: text
                            } )
                        } }
                        secureTextEntry={ false }
                        placeholder={ "Search here" } />
                    <View>
                        <FlatList
                            data={ this.state.link }
                            keyExtractor={ ( item, index ) => item.id }
                            renderItem={ ( { item, index } ) => this.renderItem( item, index ) } />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
export default Blog;