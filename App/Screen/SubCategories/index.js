import React, { Component } from 'react';
import { FlatList, Image, SafeAreaView, Text, View ,TouchableOpacity} from 'react-native';
import BasicHeader from '../../Components/BasicHeader';
import styles from './styles';

class SubCategories extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            data: [
                {
                    "id":"1"
                },
                {
                    "id":"2"
                },
                {
                    "id":"3"
                },
                {
                    "id":"4"
                },
            ]
        }
    }
    renderSubCategories = ( item, index ) =>
    {
        return (
            <TouchableOpacity style={ styles.ItemView }>
                <View style={ styles.rowView }>
                    <Text style={ styles.regularText }>Categoery Name</Text>
                    <Image
                        source={ require( '../../../assets/right.png' ) }
                        style={ styles.iconStyle } />
                </View>
            </TouchableOpacity>
        );
    }
    render ()
    {
        return (
        
                <SafeAreaView>
                    <View style={ styles.mainLayout }>
                        <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "Organic" } />
                       <View style={{flex:1,marginVertical:"10%"}}>
                       <FlatList
                       data={this.state.data}
                       keyExtractor={(item,index)=>item.id}
                       renderItem={({item,index})=>this.renderSubCategories(item,index)}/>
                       </View>
                    </View>
                </SafeAreaView>
          
        );
    }
}
export default SubCategories;