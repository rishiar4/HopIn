import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, Platform, TouchableOpacity, StatusBar } from 'react-native'

import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { Button, ThemeProvider, Card, Icon } from 'react-native-elements';



const SCREEN_HEIGHT = Dimensions.get("window").height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
    background: require('../assets/grad2.jpg'), // Put your own image here
};

export default class payment extends Component {
    constructor(props) {
        super(props);

    }

    push = () => {
        this.props.navigation.navigate('Main');
    }

    static navigationOptions = {
        header: null
    };
    renderNavBar = () => (
        <View style={styles.navContainer}>
            <View style={styles.statusBar} />
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.iconLeft} onPress={() => { }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> Balance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconRight} onPress={() => { }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> ₹1000</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    renderContent() {
      
    }

    main = <View style={{ textAlign: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 30, fontWeight: '700' }}>Balance</Text>
        <Text style={{ color: 'white', fontSize: 20 }}>₹1000</Text>
    </View>




    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <Text>wow</Text>

                <ReactNativeParallaxHeader
                    headerMinHeight={HEADER_HEIGHT}
                    headerMaxHeight={150}
                    extraScrollHeight={20}
                    alwaysShowTitle={false}
                    alwaysShowNavBar={false}
                    navbarColor="#FA7F55"
                    title={this.main}
                    titleStyle={styles.titleStyle}
                    backgroundImage={images.background}
                    backgroundImageScale={1.2}
                    renderNavBar={this.renderNavBar}
                    renderContent={this.renderContent}
                    containerStyle={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    innerContainerStyle={styles.container}
                    scrollViewProps={{
                        onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
                        onScrollEndDrag: () => console.log('onScrollEndDrag'),

                    }}
                    navigation={this.props.navigation}
                />

<View style={{ flex: 1,marginTop:-350 }}>
                {/* <Card containerStyle={{borderRadius:10,justifyContent:'space-around'}}>
          <View style={{flex:1,backgroundColor:'red'}}>
                <Text>Hello</Text>
          </View>
          <View style={{flex:1}}>
          <Text>Hello</Text>
          </View>
      </Card> */}
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#bfbfbf', textAlign: 'center', marginTop: 10 }}>Your Trip</Text>
                <View style={{ height: 120, width: "96%", alignSelf: 'center', marginTop: 10, borderRadius: 20, elevation: 3, overflow: "hidden" }}>

                    <View style={{ flex: 3, padding: 10, backgroundColor: 'white' }}>
                        <View></View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text style={{ fontSize: 15, color: '#a6a6a6' }}>From</Text>
                            <Text style={{ fontSize: 15, color: '#a6a6a6' }}>To</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text style={{ fontSize: 20 }}>Your Location</Text>
                            <Text style={{ fontSize: 20 }}>Connaught Place</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderTopWidth: 1, borderColor: '#E9E9E9' }}>

                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 17, color: '#151824', fontWeight: 'bold' }}>₹123</Text>

                            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { this.props.navigation.navigate('Main'); }}>
                                <Text style={{ fontSize: 17, color: '#FA7F55', fontWeight: 'bold' }}>Pay Now  </Text>
                                <Icon

                                    name='arrow-right'
                                    type='feather'
                                    color='#DBDAE0'
                                    onPress={() => console.log('hello')} />
                            </TouchableOpacity>


                        </View>

                    </View>

                </View>



                <View style={{ height: 120, width: "96%", alignSelf: 'center', marginTop: 10, borderRadius: 20, elevation: 3, overflow: "hidden" }}>

                    <View style={{ flex: 3, padding: 10, backgroundColor: 'white' }}>
                        <View></View>
                        {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#bfbfbf' }}>Your Trip</Text> */}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text style={{ fontSize: 15, color: '#a6a6a6' }}>From</Text>
                            <Text style={{ fontSize: 15, color: '#a6a6a6' }}>To</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text style={{ fontSize: 20 }}>Gurgaon Sec-48</Text>
                            <Text style={{ fontSize: 20 }}>India Gate</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderTopWidth: 1, borderColor: '#E9E9E9' }}>

                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 17, color: '#151824', fontWeight: 'bold' }}>₹123</Text>

                            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { }}>
                                <Text style={{ fontSize: 17, color: '#47d147', fontWeight: 'bold' }}>Completed </Text>
                                <Icon

                                    name='arrow-right'
                                    type='feather'
                                    color='#DBDAE0'
                                    onPress={() => console.log('hello')} />
                            </TouchableOpacity>


                        </View>

                    </View>

                </View>
            </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    navContainer: {
        height: HEADER_HEIGHT,
        marginHorizontal: 10,
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
        backgroundColor: 'transparent',
    },
    navBar: {
        height: NAV_BAR_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
