import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BasicHeader from '../../Components/BasicHeader';
import styles from './styles';


class AboutUs extends Component
{
    constructor ( props )
    {
        super( props );
        this.myRef = React.createRef();
    }
    render ()
    {
        return (
            <View style={ styles.mainLayout }>
                <SafeAreaView >
                   
                    <BasicHeader OnBackPress={ () => { this.props.navigation.goBack() } } title={ "About Us" } />
                    <ScrollView ref={this.myRef} showsVerticalScrollIndicator={ false }  decelerationRate='fast' >
                    <View style={ { paddingVertical:"2%", padding: 10 } }>

                        <Text style={styles.normalText}>Protection of Nature- Agriculture on about 51 percent of the total area of ​​India, pastures on 4 percent, forests on about 21 percent and 24 percent barren and unusable. That is, more than half of the area is cultivated, after the Green Revolution, chemical fertilizers were resorted to to get more production, the result of which is also better in the beginning, a lot of production increased, but by 1990, the production became stable. To get more production, now chemical fertilizers (Urea, DAP, Zinc, Sulfur etc.) are being used by farmers indiscriminately, as well as to protect crops from pests and diseases, to remove weeds, Various types of lethal chemicals began to be used extensively. The ill-effects of the cultivation of this poison are now in front of us, the fertility of the land is getting depleted, the beneficial micro-organisms of the land are being destroyed by this poison, which has created a threat of biodiversity crisis. The land has become hard due to which its water holding capacity is getting reduced, that is why there is a lot of need for irrigation in agriculture as compared to earlier, which is having a very bad effect on the ground water level, the ground water level is continuously going down. That is, if it is not stopped, then potable water will not be left for us in the near future.</Text>
                       
                    </View>
                    <View style={ {  padding: 10 ,paddingVertical:10} }>
                    <Text style={styles.titleText}>Our Vision</Text>
                        <Text style={styles.normalText}>किसानों की फसलों के लिए उचित बाजार व आम लोगों की रसायन मुक्त खाद्यान्नउपलब्ध कराना आवश्यक था तभी यह मिशन सफल होता। इसलिए हमने केमिकल फ्री फूड प्रोडक्शन की प्रोसेसिंग पैकेजिंग व मार्केटिंग करने के लिए, अयानाफूड एंड ऑर्गेनिक कर्म का गठन किया है जो सीता रसोई ब्रांड नाम से आम लोगों तक स्वदेशी जहर मुक्त शुद्ध खाद्य सामग्रियां उपलब्ध करा रही है। हमारी आप सभी लोगों से अपील है कि सभी लोग ऑर्गेनिक प्रोडक्ट अपनाएं ताकि हम अपने उद्देश्य में सफल हो सके</Text>
                    </View>
                    </ScrollView>
                </SafeAreaView>
            </View>

        );
    }
}

export default AboutUs;