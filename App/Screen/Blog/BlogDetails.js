import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, TextInput,ScrollView, KeyboardAvoidingView } from 'react-native';

import BasicHeader from '../../Components/BasicHeader';
import FilledButton from '../../Components/Filledbuton';
import { Black, Gray, Light_Green, Text_Gray } from '../../Utils/colors';
import { screen_height, screen_width } from '../../Utils/constant';
import { POPINS_REGULAR, POPINS_SEMI_BOLD } from '../../Utils/fonts';
import styles from './styles';

class BlogDetails extends Component
{
    constructor ( props )
    {
        super( props )
        this.state = {
            comment: ''
        }
    }
    render ()
    {  const keyboardVerticalOffset = Platform.OS === 'ios' ? 150 : 0
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
                 <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ 'Blog Detail' } />
                    <View style={ { borderBottomColor: Gray, borderBottomWidth: 0.5, marginVertical: 5, justifyContent: 'center', alignItems: 'center' } }>
                        <Text style={ [ styles.normalText, { color: Light_Green, fontSize: 14, paddingVertical: 8 } ] }>Importance of Organic Food  in today’s Lifestyle</Text>
                    </View>
                    <View style={ styles.viewContainer }>
                        <Image
                            source={ require( '../../../assets/product.png' ) }
                            style={ { height: 200, width: 200, alignSelf: 'center', resizeMode: 'contain' } } />
                    </View>
                    <View style={ styles.viewContainer }>
                        <Text style={ [ styles.normalText, { fontFamily: POPINS_REGULAR, fontSize: 14, paddingVertical: 10 } ] }>Black salt rice is a very high quality rice variety. Due to the black husk, its name is black salt rice. Its importance can be gauged from the fact that this rice is believed to be directly associated with Lord Buddha and hence it is also called ‘Mahaprasad of Mahatma Buddha’.
 Click on the link to order or for more information</Text>

                    </View>
                    <View>
                        <Text style={ [ styles.normalText, { color: Black, fontSize: 14, paddingVertical: 8 } ] }>Comment</Text>
                        <Text style={ [ styles.smallText, { fontSize: 12, color: Light_Green, marginVertical: 10, fontFamily: POPINS_SEMI_BOLD } ] }>Paul Wacker</Text>
                        <Text style={ [ styles.smallText, { fontSize: 12, marginVertical: 10, } ] }>Good Product and Content</Text>
                       
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
                            onPress={ () => { this.props.navigation.navigate( 'BlogDetails' ) } } />

                    </View>
                    </KeyboardAvoidingView>
                    </ScrollView>
                </SafeAreaView>

            </View>
        )
    }
}

export default BlogDetails