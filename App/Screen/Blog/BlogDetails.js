import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, TextInput,ScrollView, KeyboardAvoidingView } from 'react-native';
import ProgressLoader from 'rn-progress-loader';

import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import Apis from '../../RestApi/Apis';
import { Black, Gray, Light_Green, Text_Gray, White } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';

class BlogDetails extends Component
{
    constructor ( props )
    {
        super( props )
        this.state = {
            comment: '',
            data:this.props.route.params.data,
            visible:false,
            commentList:[]
        }   
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
        let newstr= str.replace( /(<([^>]+)>)/ig, '' );
        return  newstr.replace(/^\s+|\s+$/gm,'');
    }
    getComment=() =>{
        let request ={         
            "blog_id":this.state.data.ID                      
        }
        Apis.blogCommentListCall(request)
        .then((res)=>{
            return JSON.stringify(res)
        }).
        then((response)=>{
            if(JSON.parse(response)?.data?.status == true){
                let data=JSON.parse(response)?.data?.data
                this.setState({
                    commentList:data
                })
            }
            else{
                alert(JSON.parse(response)?.data?.message)
            }
        })
        .catch((error)=>{
            console.log("ERROR",error);
        })
    }
    componentDidMount(){
        this.getComment()
    }
postComment=async()=>{
    this.setState({visible:true})
    await AsyncStorage.getItem( 'UserData' )
    .then( ( res ) =>
    {

        let dd = JSON.parse( res ).data;
        console.log( "UserRes", dd[ 0 ].ID )
        if ( res !== null )
        {
            // this.setState( { userData: JSON.parse( res ).data } )
            // this.profileAPICall(dd[ 0 ].ID)
            // // this.props.profileCall( {
            // //     "user_id":"122"
            // // } ) 
            let request={
                "comment_post_ID":this.state.data.ID,
                "comment_author":dd[ 0 ].display_name,
                "comment_content":this.state.comment,
                "comment_author_email":dd[ 0 ].user_email,
                "comment_parent":"0",
                "user_id":dd[ 0 ].ID
            }
            
            Apis.blogCommentCall(request).
            then((res)=>{
                
                return JSON.stringify(res)
            })
            .then((response)=>{
                this.setState({visible:false})
                let dd= JSON.parse(response)?.data?.data
                if(JSON.parse(response)?.data?.status == true){
                    this.getComment()
                }
                else{
                    // alert(JSON.parse(response)?.data?.message)
                }
            }).catch((error)=>{
                this.setState({visible:false})
                console.log("ERROR",error)
            })
        }
        else
        {
            this.setState({visible:false})
            // this.setState( { userData: [] } )
        }
    } ).catch( ( error ) => {
        this.setState({visible:false})
     } )
  
}

    render ()
    {  const keyboardVerticalOffset = Platform.OS === 'ios' ? 150 : 0
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <ProgressLoader
                            visible={ this.state.visible }
                            isModal={ true }
                            isHUD={ true }
                            hudColor={ White }
                            color={ Light_Green } />
                    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
                 <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Blog Detail' } />
                    <View style={ { borderBottomColor: Gray, borderBottomWidth: 0.5, marginVertical: 5, justifyContent: 'center', alignItems: 'center' } }>
                        <Text style={ [ styles.normalText, { color: Light_Green, fontSize: 14, paddingVertical: 8 } ] }>Importance of Organic Food  in today’s Lifestyle</Text>
                    </View>
                    <View style={ styles.viewContainer }>
                    {
                       this.state.data.img.length>0?
                        <Image 
                        source={{uri:this.state.data.img[0].img_path}}
                        style={{ height: 200, width: 200, alignSelf: 'center', resizeMode: 'contain' }  } />:
                        <Image 
                        source={require('../../../assets/default.png')}
                        style={{ height: 200, width: 200, alignSelf: 'center', resizeMode: 'contain' }  } />
                    }
                        {/* <Image
                            source={ {uri:this.state.data.img[0].img_path} }
                            style={ { height: 200, width: 200, alignSelf: 'center', resizeMode: 'contain' } } /> */}
                    </View>
                    <View style={ styles.viewContainer }>
                        <Text style={ [ styles.normalText, { fontFamily: POPINS_REGULAR, fontSize: 14, paddingVertical: 10 } ] }>{this.removeTags(this.state.data.post_content)}</Text>

                    </View>
                    <View>
                        <Text style={ [ styles.normalText, { color: Black, fontSize: 14, paddingVertical: 8 } ] }>Comment</Text>
                        <Text style={ [ styles.smallText, { fontSize: 12, color: Light_Green, marginVertical: 10, fontFamily: POPINS_SEMI_BOLD } ] }>{this.state.commentList[0]?.comment_author}</Text>
                        <Text style={ [ styles.smallText, { fontSize: 12, marginVertical: 10, } ] }>{this.state.commentList[0]?.comment_content}</Text>
                       
                        <TextInput
                            value={ this.state.comment }
                            style={ [ styles.input, { height: screen_height / 6 } ] }
                            multiline={ true }
                            placeholder="Comment or Message"
                            onChangeText={ ( text ) =>
                            {
                                this.setState( { comment: text } )
                            } }
                            placeholderTextColor={ Text_Gray } />

                        <FilledButton title="Comment Post"
                            style={ { borderRadious: 20, paddingVertical: 5,width:screen_width/2.3 } }
                            textStyle={ { fontSize: 12, paddingVertical: 5, paddingHorizontal: 15 } }
                            onPress={ () => { this.postComment()} } />

                    </View>
                    </KeyboardAvoidingView>
                    </ScrollView>
                </SafeAreaView>

            </View>
        )
    }
}

export default BlogDetails;