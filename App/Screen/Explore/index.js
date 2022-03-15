import React, { Component } from 'react';
import { FlatList, SafeAreaView, View ,Image,TouchableOpacity,Text} from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import SearchBox from '../../Components/SearchBox';
import styles from './styles';

class Explore extends Component
{
    constructor ( props )
    {
        super( props );
        this.state={
            searchValue:'',
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
              ],
        };
    }

    renderItem  = ( item, index ) =>
    {
        console.log( index )
        if ( index < 6 )
        {
            return (
                <TouchableOpacity style={ [ styles.categoeryView, { backgroundColor: index % 2 === 0 ? '#FEF1E4' : '#E5F3EA' } ] }  >
                    <Image source={ require( '../../../assets/grocery.png' ) }
                        resizeMode={ 'contain' }
                        style={styles.ImageStyle}>
                    </Image>
                    <Text style={styles.regularText}>{ item.name }</Text>
                </TouchableOpacity>
            );
        }

    }
    render ()
    {
        return (
            <SafeAreaView>
                <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Find Product" } />

                <View style={ styles.mainLayout }>
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
                        <FlatList
                        numColumns={2}
                        data={this.state.categoeries}
                        keyExtractor={(item,index)=>item.id}
                        renderItem={({item,index})=>this.renderItem(item,index)}/>
                </View>
            </SafeAreaView>
        );
    }
}

export default Explore;