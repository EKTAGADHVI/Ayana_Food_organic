import React from 'react'
import { Component } from 'react';
import { FlatList, SafeAreaView, Text, View,Image ,TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { actions } from '../../Redux/actions';
import { Light_Green, White } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import styles from './styles';

class FAQScreen extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            visible: false,
            data:[],
            isDiscription:false,
            currentIndex:0
        }
    }
    componentDidMount(){
    this.props.faqCall()
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
    render ()
    {
        return (
           
            <View style={ styles.mainLayout }>

<SafeAreaView>
                        <ProgressLoader
                            visible={ this.props?.loading }
                            isModal={ true }
                            isHUD={ true }
                            hudColor={ White }
                            color={ Light_Green } />
                        <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } }
                            title={ "FAQ" }
                        />
                       
                            <FlatList
                              data={ this.props?.FAQ?.data }
                              extraData={ this.props?.FAQ?.data }
                              scrollEnabled={ true }
                              style={{height:screen_height*0.78}}
                              maxToRenderPerBatch={ 2 }
                              legacyImplementation={ false }
                              showsHorizontalScrollIndicator={ false }
                              showsVerticalScrollIndicator={ false }
                              keyExtractor={ ( item, index ) => index.toString() }
                              renderItem={({item,index})=>{
                                

                               
                                  return(
                                    <View style={ [ styles.container, {
                                        marginHorizontal: 10,
                                    } ] }>
                                       
                                        <View style={ styles.rowView }>
                                            <Text style={ [ styles.quentityText ] }>{item.post_title}</Text>
                                            {
                                              this.state.isDiscription === true  && index==this.state.currentIndex ?
                                                    <TouchableOpacity onPress={ () =>
                                                    {
                                                   this.setState({ isDiscription:!this.state.isDiscription ,
                                                    currentIndex:index
                                                })
                                                     
                                                    } }>
                                                        <Image style={ styles.iconStyle2 } source={ require( '../../../assets/down.png' ) } />
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity onPress={ () =>
                                                    {
                                                        this.setState({ isDiscription: !this.state.isDiscription ,
                                                            currentIndex:index
                                                        })
                                                    } }>
                                                        <Image style={ styles.iconStyle2 } source={ require( '../../../assets/right.png' ) } />
                                                    </TouchableOpacity>
                                            }
    
    
    
                                        </View>
    
                                        {
                                            this.state.isDiscription === true && index==this.state.currentIndex ?
                                                <View style={ { marginVertical: 10 } }>
                                                    <Text style={ styles.smallText }>{ this.removeTags( item.post_content) }</Text>
                                                </View>
                                                : null
                                        }
                                    </View>
                                  )
                              }}
                            />
                       
                       <FilledButton title="Need more help ?"
                       style={{width:screen_width/2,borderRadious:20,marginVertical:"6%",alignSelf:"flex-end"}}
                       textStyle={{fontSize:14, paddingVertical:8}}
                       onPress={()=>{
                           this.props.navigation.navigate('HelpScreen')
                       }}/>
                       </SafeAreaView>     

            </View>
            
        );
    }
}

function mapStateToProps ( state, ownProps )
{
    // console.log( "state.productFilterReducer.data", state.productFilterReducer.data )
    return {
        // data : state.loginReducer.data
         FAQ:state.getFAQReducer.data,
         loading:state.getFAQReducer.isLoading
    };

}

const mapDispatchToProps = dispatch =>
{
    return {
        //getPeople,
        // login: (request) => dispatch(actions.login.apiActionCreator(request)),
     
        faqCall: ( request ) => dispatch( actions.getFAQAction() ),
        dispatch,
    };
};
export default connect( mapStateToProps, mapDispatchToProps )( FAQScreen );