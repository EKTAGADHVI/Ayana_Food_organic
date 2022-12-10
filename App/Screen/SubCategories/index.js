import React, { Component } from 'react';
import { FlatList, Image, SafeAreaView, Text, View ,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import { actions } from '../../Redux/actions';
import { Light_Green, White } from '../../Utils/colors';
import { screen_height } from '../../Utils/constant';
import styles from './styles';

class SubCategories extends Component
{
    constructor ( props )
    {
        super( props );
        this.props.getCategoeryList();
        this.state = {
            subCategories:this.props.route.params.subCategoeries ?this.props.route.params.subCategoeries :[],
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
            ],
            visible:false
        }
    }
    onPreesSubCategoery= (data)=>{
        this.setState({visible:true})
        let subCategoeriesData =
        this.props?.cataegoery?.data.filter((item)=>{
            if(item.parent === data.category_id){
                return data;
            }
        });

     setTimeout(()=>{
        if(subCategoeriesData.length > 0){
            this.setState({
                subCategories:subCategoeriesData,
                visible:false
            })
            this.props.navigation.navigate("SubCategories",{
                subCategoeries:subCategoeriesData,
                title:data.name
            })
        }
        else{
            this.setState({visible:false})
            this.props.navigation.navigate("ProductViewScreen",{
               request:{
                "category_id":data.category_id
            },
                title:data.name
            })
        }
     },500)


    }
    renderSubCategories = ( item, index ) =>
    {
        return (
            <TouchableOpacity style={ styles.ItemView } onPress={()=>{this.onPreesSubCategoery(item)}}>
                <View style={ styles.rowView }>

                    <Text style={ styles.regularText }>{item.name}</Text>
                    <Image
                        source={ require( '../../../assets/right.png' ) }
                        style={ styles.iconStyle } />
                </View>
            </TouchableOpacity>
        );
    }
    componentDidMount(){
        this.setState({visible:true})
        setTimeout(()=>{
            this.setState({visible:false})
        },1000)
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>

                        <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ this.props.route.params.title} />
                        <ProgressLoader
                visible={this.state.visible}
                isModal={true}
                isHUD={true}
                hudColor={White}
                color={Light_Green} />
                       <View style={{height:screen_height* 0.86}}>
                       <FlatList
                       showsVerticalScrollIndicator={false}

                       data={this.state.subCategories}
                       keyExtractor={(item,index)=>item.category_id}
                       renderItem={({item,index})=>this.renderSubCategories(item,index)}/>
                       </View>

                </SafeAreaView>
             </View>

        );
    }
}

function mapStateToProps ( state, ownProps )
{
    // console.log( "state.categoeryListReducer.data ", state.categoeryListReducer.data)
    return {
        // data : state.loginReducer.data
        products: state.productListReducer.data,
        cataegoery:state.categoeryListReducer.data


    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
        productList: ( request ) => dispatch( actions.productListAction() ),
        getCategoeryList:(request)=>dispatch(actions.getCategoeryListAction()),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( SubCategories );
